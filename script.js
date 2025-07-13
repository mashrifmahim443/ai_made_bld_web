// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function switchModal(fromModalId, toModalId) {
    closeModal(fromModalId);
    openModal(toModalId);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            if (validateLoginForm(email, password)) {
                // Simulate login process
                showNotification('Login successful!', 'success');
                closeModal('loginModal');
                this.reset();
            }
        });
    }

    // Registration form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const formDataObj = {};
            
            // Collect form data
            this.querySelectorAll('input, select').forEach(input => {
                if (input.type !== 'checkbox') {
                    formDataObj[input.name || input.placeholder] = input.value;
                } else {
                    formDataObj[input.id] = input.checked;
                }
            });
            
            if (validateRegistrationForm(formDataObj)) {
                // Simulate registration process
                showNotification('Registration successful! Welcome to our community!', 'success');
                closeModal('registerModal');
                this.reset();
            }
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (validateContactForm(name, email, message)) {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                this.reset();
            }
        });
    }
});

// Form validation functions
function validateLoginForm(email, password) {
    if (!email || !password) {
        showNotification('Please fill in all fields.', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters long.', 'error');
        return false;
    }
    
    return true;
}

function validateRegistrationForm(data) {
    const requiredFields = ['Full Name', 'Email', 'Phone Number', 'Password', 'Confirm Password'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification(`Please fill in the ${field} field.`, 'error');
            return false;
        }
    }
    
    if (!isValidEmail(data['Email'])) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!isValidPhone(data['Phone Number'])) {
        showNotification('Please enter a valid phone number.', 'error');
        return false;
    }
    
    if (data['Password'] !== data['Confirm Password']) {
        showNotification('Passwords do not match.', 'error');
        return false;
    }
    
    if (data['Password'].length < 6) {
        showNotification('Password must be at least 6 characters long.', 'error');
        return false;
    }
    
    if (!data['terms']) {
        showNotification('Please agree to the terms and conditions.', 'error');
        return false;
    }
    
    return true;
}

function validateContactForm(name, email, message) {
    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (message.length < 10) {
        showNotification('Message must be at least 10 characters long.', 'error');
        return false;
    }
    
    return true;
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .step, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Blood type color coding for registration form
document.addEventListener('DOMContentLoaded', () => {
    const bloodTypeSelect = document.querySelector('select');
    if (bloodTypeSelect) {
        bloodTypeSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            if (selectedOption.value) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#e1e5e9';
            }
        });
    }
});

// Password strength indicator
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.querySelector('input[type="password"]');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            if (password.length >= 6) strength++;
            if (password.match(/[a-z]/)) strength++;
            if (password.match(/[A-Z]/)) strength++;
            if (password.match(/[0-9]/)) strength++;
            if (password.match(/[^a-zA-Z0-9]/)) strength++;
            
            // Remove existing strength indicator
            const existingIndicator = this.parentNode.querySelector('.password-strength');
            if (existingIndicator) {
                existingIndicator.remove();
            }
            
            if (password.length > 0) {
                const indicator = document.createElement('div');
                indicator.className = 'password-strength';
                const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
                const strengthColor = ['#e74c3c', '#f39c12', '#f1c40f', '#27ae60', '#2ecc71'];
                
                indicator.innerHTML = `
                    <div class="strength-bar">
                        <div class="strength-fill" style="width: ${(strength / 5) * 100}%; background: ${strengthColor[strength - 1] || '#e1e5e9'}"></div>
                    </div>
                    <span style="color: ${strengthColor[strength - 1] || '#999'}">${strengthText[strength - 1] || 'Very Weak'}</span>
                `;
                
                indicator.style.cssText = `
                    margin-top: 0.5rem;
                    font-size: 0.8rem;
                `;
                
                const strengthBar = indicator.querySelector('.strength-bar');
                strengthBar.style.cssText = `
                    width: 100%;
                    height: 4px;
                    background: #e1e5e9;
                    border-radius: 2px;
                    margin-bottom: 0.25rem;
                `;
                
                const strengthFill = indicator.querySelector('.strength-fill');
                strengthFill.style.cssText = `
                    height: 100%;
                    border-radius: 2px;
                    transition: width 0.3s ease, background 0.3s ease;
                `;
                
                this.parentNode.appendChild(indicator);
            }
        });
    }
}); 