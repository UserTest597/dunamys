// Radio Player Logic
const audio = document.getElementById('radio-audio');
const playBtn = document.getElementById('play-pause');
const volumeSlider = document.getElementById('volume');
const radioCard = document.querySelector('.radio-card');

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().catch(e => console.error("Error playing audio:", e));
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        radioCard.classList.add('playing');
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        radioCard.classList.remove('playing');
    }
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Calculator Logic
const calcDisplay = document.getElementById('calc-display');

function appendCalc(value) {
    if (calcDisplay.value === 'Error') calcDisplay.value = '';
    calcDisplay.value += value;
}

function clearCalc() {
    calcDisplay.value = '';
}

function deleteCalc() {
    calcDisplay.value = calcDisplay.value.slice(0, -1);
}

function calculate() {
    try {
        // We use a safe-ish way to evaluate or just simple eval for this demo
        // For a portfolio, eval is okay if only the user is using it locally
        calcDisplay.value = eval(calcDisplay.value);
    } catch (e) {
        calcDisplay.value = 'Error';
    }
}

// Unit Converter Logic
function convertUnits() {
    const input = document.getElementById('unit-input').value;
    const result = document.getElementById('unit-result');
    if (input) {
        result.textContent = (parseFloat(input) * 1000).toLocaleString();
    } else {
        result.textContent = '0';
    }
}

// Global Clock Logic
function updateClock() {
    const timeDisplay = document.getElementById('time');
    const dateDisplay = document.getElementById('date');
    const now = new Date();

    const timeStr = now.toLocaleTimeString('es-ES', { hour12: false });
    const dateStr = now.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    if (timeDisplay) timeDisplay.textContent = timeStr;
    if (dateDisplay) dateDisplay.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
}

setInterval(updateClock, 1000);
updateClock();

// Carousel Logic
const track = document.getElementById('carouselTrack');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let startX = 0;
let isDragging = false;

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * (100 / 3)}%)`;
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % 3;
    updateCarousel();
}

// Auto-play every 5 seconds
let autoPlay = setInterval(nextSlide, 5000);

// Touch/Swipe Support
track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    clearInterval(autoPlay);
});

track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            currentIndex = (currentIndex + 1) % 3;
        } else {
            currentIndex = (currentIndex - 1 + 3) % 3;
        }
        updateCarousel();
        isDragging = false;
        autoPlay = setInterval(nextSlide, 5000);
    }
});

track.addEventListener('touchend', () => {
    isDragging = false;
});

// Click dots to change slide
dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
        currentIndex = idx;
        updateCarousel();
        clearInterval(autoPlay);
        autoPlay = setInterval(nextSlide, 5000);
    });
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact Form Simple Feedback
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = '¡Enviado con éxito!';
        btn.style.background = '#22c55e';
        contactForm.reset();

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 3000);
    });
}
