// ============================================
// Welcome Message on Page Load
// ============================================

window.addEventListener('DOMContentLoaded', function() {
    // Get user name using prompt
    let userName = prompt('Please enter your name:');
    
    // Use default name if user cancels or enters empty string
    if (!userName || userName.trim() === '') {
        userName = 'Guest';
    }
    
    // Insert name into welcome message
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = userName.trim();
    }
});

// ============================================
// Mobile Menu Toggle
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu when hamburger is clicked
hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Form Validation and Submission
// ============================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous error messages
    clearErrors();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation flags
    let isValid = true;
    
    // Validate name
    if (!validateName(name)) {
        isValid = false;
    }
    
    // Validate email
    if (!validateEmail(email)) {
        isValid = false;
    }
    
    // Validate phone
    if (!validatePhone(phone)) {
        isValid = false;
    }
    
    // Validate message
    if (!validateMessage(message)) {
        isValid = false;
    }
    
    // If all validations pass, display results
    if (isValid) {
        displayResults(name, email, phone, message);
    }
});

// ============================================
// Validation Functions
// ============================================

function validateName(name) {
    const nameError = document.getElementById('nameError');
    
    if (name === '') {
        nameError.textContent = 'Name is required';
        return false;
    }
    
    if (name.length < 3) {
        nameError.textContent = 'Name must be at least 3 characters long';
        return false;
    }
    
    // Check if name contains only letters and spaces
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
        nameError.textContent = 'Name can only contain letters and spaces';
        return false;
    }
    
    return true;
}

function validateEmail(email) {
    const emailError = document.getElementById('emailError');
    
    if (email === '') {
        emailError.textContent = 'Email is required';
        return false;
    }
    
    // Check if email contains @ symbol
    if (!email.includes('@')) {
        emailError.textContent = 'Email must contain @ symbol';
        return false;
    }
    
    // Check if email contains . after @
    const atIndex = email.indexOf('@');
    const dotAfterAt = email.indexOf('.', atIndex);
    
    if (dotAfterAt === -1) {
        emailError.textContent = 'Email must contain a dot (.) after @ symbol';
        return false;
    }
    
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        return false;
    }
    
    return true;
}

function validatePhone(phone) {
    const phoneError = document.getElementById('phoneError');
    
    if (phone === '') {
        phoneError.textContent = 'Phone number is required';
        return false;
    }
    
    // Remove any spaces or dashes
    const cleanPhone = phone.replace(/[\s-]/g, '');
    
    // Check if phone contains only numbers
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(cleanPhone)) {
        phoneError.textContent = 'Phone number can only contain numbers';
        return false;
    }
    
    // Check minimum length
    if (cleanPhone.length < 10) {
        phoneError.textContent = 'Phone number must be at least 10 digits';
        return false;
    }
    
    // Check maximum length
    if (cleanPhone.length > 15) {
        phoneError.textContent = 'Phone number cannot exceed 15 digits';
        return false;
    }
    
    return true;
}

function validateMessage(message) {
    const messageError = document.getElementById('messageError');
    
    if (message === '') {
        messageError.textContent = 'Message is required';
        return false;
    }
    
    if (message.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters long';
        return false;
    }
    
    return true;
}

// ============================================
// Clear Error Messages
// ============================================

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
    });
}

// ============================================
// Display Form Results
// ============================================

function displayResults(name, email, phone, message) {
    // Get current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    });
    
    // Display results in the result section
    document.getElementById('resultDate').textContent = formattedDate;
    document.getElementById('resultName').textContent = name;
    document.getElementById('resultEmail').textContent = email;
    document.getElementById('resultPhone').textContent = phone;
    document.getElementById('resultMessage').textContent = message;
    
    // Show the result section
    const resultSection = document.getElementById('result');
    resultSection.classList.add('show');
    resultSection.style.display = 'block';
    
    // Scroll to result section smoothly
    resultSection.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
    
    // Optional: Clear the form after successful submission
    // contactForm.reset();
}

// ============================================
// Add Real-time Validation (Optional Enhancement)
// ============================================

// Clear error message when user starts typing
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');

nameInput.addEventListener('input', function() {
    document.getElementById('nameError').textContent = '';
});

emailInput.addEventListener('input', function() {
    document.getElementById('emailError').textContent = '';
});

phoneInput.addEventListener('input', function() {
    document.getElementById('phoneError').textContent = '';
});

messageInput.addEventListener('input', function() {
    document.getElementById('messageError').textContent = '';
});
