// styling JAVAScript Like my french girlfriend

const imageSlider = document.querySelector('.image-slider');
const images = imageSlider.querySelectorAll('img');
let currentIndex = 0;

function showSlide(index) {
    images.forEach((image, i) => {
        if (i === index) {
            image.style.transform = 'scale(1)';
        } else {
            image.style.transform = 'scale(0)';
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    showSlide(currentIndex);
}

setInterval(nextSlide, 3000); 


showSlide(currentIndex);
