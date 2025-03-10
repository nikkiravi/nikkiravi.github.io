// main.js - Main JavaScript functionality for Nikita Ravi's portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile navigation when a link is clicked
    const navLinkItems = document.querySelectorAll('#nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                mobileNavToggle.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current section in navigation
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let currentSection = '';
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();
    
    // Form submission handling (if a contact form is added later)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            console.log('Form data:', formObject);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thanks for your message! I\'ll get back to you soon.';
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        });
    }
    
    // Add responsive styles for mobile devices
    function handleResponsiveLayout() {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
            mobileNavToggle.style.display = 'flex';
        } else {
            navLinks.style.display = 'flex';
            mobileNavToggle.style.display = 'none';
            navLinks.classList.remove('active');
        }
    }
    
    handleResponsiveLayout();
    window.addEventListener('resize', handleResponsiveLayout);
    
    // Dynamically update copyright year
    const footerP = document.querySelector('footer p');
    if (footerP) {
        const currentYear = new Date().getFullYear();
        footerP.innerHTML = footerP.innerHTML.replace(/\d{4}/, currentYear);
    }
  });
  