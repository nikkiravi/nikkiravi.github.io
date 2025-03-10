// animations.js - JavaScript for animations and transitions on Nikita Ravi's portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate skill bars in #skills
                if (entry.target.id === 'skills') {
                    setTimeout(() => {
                        document.querySelectorAll('.skill-item').forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate');
                            }, index * 100);
                        });
                    }, 300);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in, .slide-in').forEach(section => {
        animateOnScroll.observe(section);
    });
    
    // Hover animations for skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('highlight');
        });
        item.addEventListener('mouseleave', function() {
            this.classList.remove('highlight');
        });
    });
    
    // Animate project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-info').classList.add('active');
        });
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-info').classList.remove('active');
        });
    });
    
    // Animate timeline items
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.transitionDelay = `${index * 0.1}s`;
            
            const itemObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                        itemObserver.unobserve(item);
                    }
                });
            }, { threshold: 0.1 });
            
            itemObserver.observe(item);
        });
    }
    
    if (document.querySelector('.timeline')) {
        animateTimeline();
    }
    
    // Type writer effect for the tagline
    function typeWriter(element, text, speed, delay = 0) {
        let i = 0;
        element.textContent = '';
        setTimeout(() => {
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, speed);
        }, delay);
    }
    
    const tagline = document.querySelector('.profile-info h2');
    if (tagline) {
        const taglineText = tagline.textContent;
        typeWriter(tagline, taglineText, 50, 500);
    }
    
    // Animate the header on scroll
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
    
    // Parallax effect on profile section
    const profileSection = document.querySelector('.profile-section');
    window.addEventListener('scroll', function() {
        if (profileSection) {
            const scrollValue = window.scrollY;
            if (scrollValue < 500) {
                profileSection.style.transform = `translateY(${scrollValue * 0.1}px)`;
                profileSection.querySelector('.profile-image').style.transform = `translateY(${scrollValue * -0.05}px)`;
            }
        }
    });
    
    // Smooth reveal for certification logos
    const certificationLogos = document.querySelectorAll('.certification-logo i');
    certificationLogos.forEach(logo => {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.5)';
        logo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    const certificationsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const logos = entry.target.querySelectorAll('.certification-logo i');
                logos.forEach((logo, index) => {
                    setTimeout(() => {
                        logo.style.opacity = '1';
                        logo.style.transform = 'scale(1)';
                    }, index * 200);
                });
                certificationsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (document.querySelector('#certifications')) {
        certificationsObserver.observe(document.querySelector('#certifications'));
    }
  });
  