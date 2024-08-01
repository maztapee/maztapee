const activeReminder = document.getElementById('active_reminder');
let slideIndex = {
    carousel1: 0,
    carousel2: 0,
    carousel3: 0
};

document.addEventListener('DOMContentLoaded', function() {
    // Your code here
    console.log(activeReminder);
    activeReminder.style.display = 'none';

});

function showSlide(carouselId) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll('.card');
    const totalSlides = slides.length;

    slides.forEach((slide, index) => {
        if (index >= slideIndex[carouselId] && index < slideIndex[carouselId] + 3) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
}

function moveSlide(step, carouselId) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll('.card');
    const totalSlides = slides.length;

    slideIndex[carouselId] += step;

    if (slideIndex[carouselId] < 0) {
        slideIndex[carouselId] = totalSlides - 3;
    } else if (slideIndex[carouselId] >= totalSlides - 2) {
        slideIndex[carouselId] = 0;
    }

    showSlide(carouselId);
}

// Initialize the carousels
showSlide('carousel1');
showSlide('carousel2');
showSlide('carousel3');