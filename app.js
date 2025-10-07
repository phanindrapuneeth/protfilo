// Portfolio JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Toggle hamburger icon
        const icon = navToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking on a link
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navToggle.contains(event.target) || navLinks.contains(event.target);
        
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Smooth scrolling for navigation links
    navLinkItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.education-item, .skill-category, .project-card, .hackathon-card, .achievement-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background based on scroll position
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Add scrolled class styles
    const style = document.createElement('style');
    style.textContent = `
        .navbar {
            transition: all 0.3s ease;
        }
        
        .navbar.scrolled {
            background-color: rgba(var(--color-surface-rgb, 255, 255, 253), 0.95);
            backdrop-filter: blur(15px);
            box-shadow: var(--shadow-md);
        }
        
        @media (prefers-color-scheme: dark) {
            .navbar.scrolled {
                background-color: rgba(38, 40, 40, 0.95);
            }
        }
        
        [data-color-scheme="dark"] .navbar.scrolled {
            background-color: rgba(38, 40, 40, 0.95);
        }
    `;
    document.head.appendChild(style);

    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    
    function typeWriter(text, element, speed = 100) {
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Intersection observer for hero section to trigger typing effect
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start typing effect when hero comes into view
                setTimeout(() => {
                    typeWriter(originalText, heroTitle, 80);
                }, 500);
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('.hero');
    heroObserver.observe(heroSection);

    // Skill tag hover effects
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            // Add a subtle bounce effect
            this.style.transform = 'scale(1.1) translateY(-2px)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Project card tilt effect on mouse move
    const projectCards = document.querySelectorAll('.project-card, .hackathon-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-8px)';
        });
    });

    // Contact form animation (if contact form is added later)
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple effect styles
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        .contact-link {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            left: 50%;
            top: 50%;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyles);

    // Active section highlighting in navigation
    const sections = document.querySelectorAll('section');
    const navLinksArray = Array.from(navLinkItems);

    function highlightActiveSection() {
        let current = '';
        const scrollPosition = window.scrollY + 200; // Offset for navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Add active link styles
    const activeLinkStyles = document.createElement('style');
    activeLinkStyles.textContent = `
        .nav-links a.active {
            color: var(--color-primary);
        }
        
        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(activeLinkStyles);

    // Listen for scroll to highlight active section
    window.addEventListener('scroll', highlightActiveSection);
    
    // Initial call to highlight active section
    highlightActiveSection();

    // Preloader (optional)
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add loaded class styles
        const loadedStyles = document.createElement('style');
        loadedStyles.textContent = `
            body {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            body.loaded {
                opacity: 1;
            }
        `;
        document.head.appendChild(loadedStyles);
    });

    // Console message for developers
    console.log(`
    🚀 Portfolio loaded successfully!
    
    Built with ❤️ by Kandarpa Phanindra Puneeth
    
    Technologies used:
    - HTML5
    - CSS3 with CSS Variables
    - Vanilla JavaScript
    - Font Awesome Icons
    
    Feel free to explore the code and connect with me!
    `);
});