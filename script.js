// ========================================
// BOOKING FORM INTERACTIVITY
// ========================================

// Tab switching
const tabButtons = document.querySelectorAll('.tab-button');
tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Here you could switch different booking forms in a real app
        console.log('Selected tab:', this.dataset.tab);
    });
});

// Set minimum date to today
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;
dateInput.value = today;

// Set default time
const timeInput = document.getElementById('time');
const now = new Date();
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
timeInput.value = `${hours}:${minutes}`;

// Schedule toggle functionality
const scheduleToggle = document.getElementById('schedule-toggle');
scheduleToggle.addEventListener('change', function() {
    if (this.checked) {
        dateInput.disabled = false;
        timeInput.disabled = false;
        console.log('Scheduled mode enabled');
    } else {
        console.log('Immediate booking enabled');
    }
});

// Form submission
const bookingForm = document.querySelector('.booking-form');
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        pickup: document.getElementById('pickup').value,
        drop: document.getElementById('drop').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        carType: document.getElementById('car-type').value,
        vehicleCategory: document.getElementById('vehicle-category').value,
        scheduled: document.getElementById('schedule-toggle').checked
    };
    
    // Validate form
    if (!formData.pickup || !formData.drop || !formData.carType || !formData.vehicleCategory) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Show success message
    showBookingSuccess(formData);
    
    // Log booking details
    console.log('Booking Request:', formData);
});

// Success notification
function showBookingSuccess(data) {
    const originalText = document.querySelector('.btn-request').textContent;
    const btn = document.querySelector('.btn-request');
    
    btn.textContent = '✓ Booking Requested!';
    btn.style.backgroundColor = '#22c55e';
    
    setTimeout(() => {
        btn.textContent = originalText;
    }, 3000);
    
    // Optional: Show a toast notification
    showToast(`Your ride from ${data.pickup} to ${data.drop} has been requested!`);
}

// Toast notification function
function showToast(message) {
    const toastId = 'toast-' + Date.now();
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #22c55e;
        color: #000;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        font-weight: 500;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// INPUT VALIDATION & AUTO-COMPLETE HINTS
// ========================================

const pickupInput = document.getElementById('pickup');
const dropInput = document.getElementById('drop');

// Mock list of popular locations
const popularLocations = [
    'Downtown Station',
    'Airport Terminal 1',
    'Hospital Complex',
    'City Center Mall',
    'Central Station',
    'Business District',
    'Park Avenue',
    'Tech Hub',
    'Market Square',
    'University Campus'
];

// Add input validation styling
[pickupInput, dropInput].forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            this.style.borderColor = '#22c55e';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#22c55e';
    });
});

// ========================================
// DROPDOWN HOVER EFFECTS
// ========================================

const navDropdowns = document.querySelectorAll('.nav-dropdown');
navDropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseenter', function() {
        const menu = this.querySelector('.dropdown-menu');
        if (menu) {
            // Trigger reflow to ensure animation works
            menu.style.opacity = '1';
        }
    });
});

// ========================================
// SMOOTH SCROLL NAVIGATION
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add subtle shadow on scroll
    if (currentScroll > 10) {
        navbar.style.borderBottomColor = 'rgba(51, 65, 85, 0.5)';
    } else {
        navbar.style.borderBottomColor = 'rgba(51, 65, 85, 0.2)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// SECTION ANIMATIONS (Intersection Observer)
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe steps and about section for fade-in animations
document.querySelectorAll('.step, .about-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// FORM INPUT ENHANCEMENTS
// ========================================

// Date input formatting
dateInput.addEventListener('change', function() {
    if (this.value) {
        const date = new Date(this.value);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        console.log('Selected date:', date.toLocaleDateString('en-US', options));
    }
});

// Time input validation
timeInput.addEventListener('change', function() {
    if (this.value) {
        console.log('Selected time:', this.value);
    }
});

// Car type and vehicle category change handlers
document.getElementById('car-type').addEventListener('change', function() {
    if (this.value) {
        console.log('Car type selected:', this.value);
    }
});

document.getElementById('vehicle-category').addEventListener('change', function() {
    if (this.value) {
        console.log('Vehicle category selected:', this.value);
    }
});

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Add keyboard navigation for tabs
tabButtons.forEach((button, index) => {
    button.addEventListener('keydown', (e) => {
        let nextButton = null;
        
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextButton = tabButtons[index + 1] || tabButtons[0];
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            nextButton = tabButtons[index - 1] || tabButtons[tabButtons.length - 1];
        }
        
        if (nextButton) {
            nextButton.click();
            nextButton.focus();
        }
    });
});

// ========================================
// VEHICLE MARKER ANIMATION
// ========================================

// Add subtle animation to vehicle markers (already in CSS with @keyframes float)
// This script just ensures the animation is properly applied

const vehicleMarkers = document.querySelectorAll('.vehicle-marker');
let activeMarkerIndex = 0;

function rotateActiveMarker() {
    vehicleMarkers.forEach(marker => marker.classList.remove('active'));
    activeMarkerIndex = (activeMarkerIndex + 1) % vehicleMarkers.length;
    vehicleMarkers[activeMarkerIndex].classList.add('active');
}

// Rotate active marker every 4 seconds
setInterval(rotateActiveMarker, 4000);

// ========================================
// RESPONSIVE BEHAVIOR
// ========================================

// Handle mobile menu interactions
const navMenu = document.querySelector('.navbar-menu');

// Ensure dropdowns work on mobile with click
if (window.innerWidth <= 768) {
    navDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            const menu = this.querySelector('.dropdown-menu');
            if (menu) {
                menu.style.opacity = menu.style.opacity === '1' ? '0' : '1';
                menu.style.visibility = menu.style.visibility === 'visible' ? 'hidden' : 'visible';
            }
        });
    });
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Use debounced scroll handler if needed
window.addEventListener('scroll', debounce(() => {
    // Add performance-critical scroll logic here if needed
}, 100));

// ========================================
// PAGE LOAD OPTIMIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize any necessary elements on page load
    console.log('DriveOn booking system initialized');
    
    // Ensure date is set to today
    if (dateInput && !dateInput.value) {
        dateInput.value = today;
    }
});

// ========================================
// FORM STATE MANAGEMENT
// ========================================

class BookingFormState {
    constructor() {
        this.state = {
            pickup: '',
            drop: '',
            date: today,
            time: `${hours}:${minutes}`,
            carType: '',
            vehicleCategory: '',
            scheduled: false
        };
    }
    
    update(field, value) {
        this.state[field] = value;
        localStorage.setItem('bookingFormState', JSON.stringify(this.state));
    }
    
    restore() {
        const saved = localStorage.getItem('bookingFormState');
        if (saved) {
            this.state = JSON.parse(saved);
            return true;
        }
        return false;
    }
    
    clear() {
        this.state = {
            pickup: '',
            drop: '',
            date: today,
            time: `${hours}:${minutes}`,
            carType: '',
            vehicleCategory: '',
            scheduled: false
        };
        localStorage.removeItem('bookingFormState');
    }
}

const formState = new BookingFormState();

// Save form state on input
pickupInput.addEventListener('change', (e) => formState.update('pickup', e.target.value));
dropInput.addEventListener('change', (e) => formState.update('drop', e.target.value));
dateInput.addEventListener('change', (e) => formState.update('date', e.target.value));
timeInput.addEventListener('change', (e) => formState.update('time', e.target.value));
document.getElementById('car-type').addEventListener('change', (e) => formState.update('carType', e.target.value));
document.getElementById('vehicle-category').addEventListener('change', (e) => formState.update('vehicleCategory', e.target.value));
scheduleToggle.addEventListener('change', (e) => formState.update('scheduled', e.target.checked));
