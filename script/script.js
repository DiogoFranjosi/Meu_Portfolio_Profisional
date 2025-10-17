// ===== LOADER =====
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// ===== ACTIVE NAV LINK =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== SMOOTH SCROLL FOR NAV LINKS =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// ===== AOS ANIMATION INITIALIZATION =====
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
}

// ===== DOWNLOAD CV BUTTON ANIMATION =====
const downloadBtn = document.querySelector('.hero-actions .btn-primary');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        const icon = this.querySelector('i');
        if (icon) {
            icon.style.animation = 'downloadArrow 0.6s ease-in-out';
            setTimeout(() => {
                icon.style.animation = '';
            }, 600);
        }
    });
}

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const nome = contactForm.querySelector('input[name="nome"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const assunto = contactForm.querySelector('input[name="assunto"]').value.trim();
        const mensagem = contactForm.querySelector('textarea[name="mensagem"]').value.trim();
        
        // Validate fields
        if (!nome || !email || !assunto || !mensagem) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos obrigatórios',
                text: 'Por favor, preencha todos os campos antes de enviar.',
                confirmButtonColor: '#00D9FF',
                background: '#1A1A1A',
                color: '#E8E8E8'
            });
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'E-mail inválido',
                text: 'Por favor, insira um e-mail válido.',
                confirmButtonColor: '#00D9FF',
                background: '#1A1A1A',
                color: '#E8E8E8'
            });
            return;
        }
        
        // Create WhatsApp message
        const texto = `Olá, meu nome é ${nome}!\n` +
                      `Email: ${email}\n` +
                      `Assunto: ${assunto}\n` +
                      `Mensagem: ${mensagem}`;
        
        const numeroWhatsApp = '5511977218265';
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
        
        // Show confirmation and redirect
        Swal.fire({
            icon: 'success',
            title: 'Redirecionando para o WhatsApp...',
            text: 'Clique em "OK" para enviar a mensagem.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#00D9FF',
            background: '#1A1A1A',
            color: '#E8E8E8'
        }).then(() => {
            window.open(url, '_blank');
            contactForm.reset();
        });
    });
}

// ===== SCROLL REVEAL ANIMATION =====
function revealOnScroll() {
    const reveals = document.querySelectorAll('[data-aos]');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('aos-animate');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// ===== TYPING EFFECT FOR HERO SUBTITLE (OPTIONAL) =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// const heroSubtitle = document.querySelector('.hero-subtitle');
// if (heroSubtitle) {
//     const originalText = heroSubtitle.textContent;
//     typeWriter(heroSubtitle, originalText, 100);
// }

// ===== PARALLAX EFFECT FOR HERO BACKGROUND =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroOverlay = document.querySelector('.hero-bg-overlay');
    
    if (heroOverlay) {
        heroOverlay.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== CURSOR TRAIL EFFECT (OPTIONAL) =====
// Uncomment to enable cursor trail effect
/*
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

circles.forEach(function (circle) {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener('mousemove', function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + 'px';
        circle.style.top = y - 12 + 'px';
        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();
*/

// ===== PORTFOLIO FILTER (IF NEEDED IN FUTURE) =====
// This can be expanded if you want to add filtering functionality to projects
const portfolioCards = document.querySelectorAll('.portfolio-card');

function filterPortfolio(category) {
    portfolioCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    updateActiveNavLink();
    revealOnScroll();
}));

// ===== CONSOLE MESSAGE =====
console.log('%c🚀 Portfólio desenvolvido por Diogo Franjosi', 'color: #00D9FF; font-size: 16px; font-weight: bold;');
console.log('%c💼 Full-Stack Developer', 'color: #7B2FF7; font-size: 14px;');
console.log('%c📧 Contato: https://wa.me/5511977218265', 'color: #E8E8E8; font-size: 12px;');

