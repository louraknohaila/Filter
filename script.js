let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let HueRotate = document.getElementById('hue-rotate');
let upload = document.getElementById('upload');
let download = document.getElementById('download');
let img = document.getElementById('img');
let reset = document.querySelector('span');
let imgbox = document.querySelector('.img-box');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resetValue() {
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blur.value = '0';
    HueRotate.value = '0';
}

window.onload = function() {
    download.style.display = 'none';
    reset.style.display = 'none';
    imgbox.style.display = 'none';
}

upload.onchange = function() {
    resetValue();
    download.style.display = 'block';
    reset.style.display = 'block';
    imgbox.style.display = 'block';
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function() {
       img.style.display = 'none'; // Supprimer l'image originale
        img.src = file.result;
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            applyFilters();
        };
    };
};

function applyFilters() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value}%)
        blur(${blur.value}px)
        hue-rotate(${HueRotate.value}deg)
    `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.filter = 'none';
}

let filters = document.querySelectorAll("ul li input");
filters.forEach(filter => {
    filter.addEventListener('input', applyFilters);
});

download.onclick = function() {
    let canvasDataUrl = canvas.toDataURL("image/png");
    download.href = canvasDataUrl;
};
