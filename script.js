/* ============================================ */
/* PORTAFOLIO PROFESIONAL - FUNCIONALIDADES JS  */
/* Tema: Dark Modern Developer                  */
/* Autor: Tu Nombre                             */
/* ============================================ */

(function() {
    'use strict';

    // ============================================
    // UTILIDADES
    // ============================================

    /**
     * Selecciona un elemento del DOM
     * @param {string} selector - Selector CSS
     * @returns {Element|null}
     */
    const $ = (selector) => document.querySelector(selector);

    /**
     * Selecciona múltiples elementos del DOM
     * @param {string} selector - Selector CSS
     * @returns {NodeList}
     */
    const $$ = (selector) => document.querySelectorAll(selector);

    /**
     * Verifica si un elemento está en el viewport
     * @param {Element} element - Elemento a verificar
     * @param {number} offset - Offset opcional
     * @returns {boolean}
     */
    const isInViewport = (element, offset = 0) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= offset
        );
    };

    // ============================================
    // NAVBAR - Navegación fija y scroll suave
    // ============================================

    const navbar = $('#navbar');
    const navToggle = $('#navToggle');
    const navMenu = $('#navMenu');
    const navLinks = $$('.nav-link');

    /**
     * Efecto de navbar al hacer scroll
     * Agrega clase 'scrolled' cuando el usuario baja más de 50px
     */
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    /**
     * Toggle del menú móvil
     * Abre/cierra el menú de navegación en dispositivos móviles
     */
    const toggleMobileMenu = () => {
        navMenu.classList.toggle('active');

        // Animación del icono hamburger
        const lines = navToggle.querySelectorAll('.hamburger-line');
        if (navMenu.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    };

    /**
     * Cierra el menú móvil al hacer clic en un enlace
     */
    const closeMobileMenu = () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const lines = navToggle.querySelectorAll('.hamburger-line');
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    };

    /**
     * Actualiza el enlace activo según la sección visible
     * Resalta el enlace del navbar correspondiente a la sección actual
     */
    const updateActiveNavLink = () => {
        const sections = $$('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    // Event listeners del navbar
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
    });

    navToggle.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            closeMobileMenu();
            // Scroll suave nativo
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = $(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Altura del navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // EFECTO DE ESCRITURA (Typing Effect)
    // ============================================

    const typingElement = $('#typing-text');
    const phrases = [
        'Desarrollador Web Full-Stack',
        'Diseñador de Base de datos',
        'Facilitador de Capacitación',
        'Estudiante de Ingeniería de Sistemas'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    /**
     * Efecto de máquina de escribir para el hero
     * Escribe y borra frases de forma cíclica
     */
    const typeEffect = () => {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pausa al finalizar
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pausa antes de escribir
        }

        setTimeout(typeEffect, typingSpeed);
    };

    // Iniciar efecto de escritura
    if (typingElement) {
        setTimeout(typeEffect, 1000);
    }

    // ============================================
    // PARTÍCULAS ANIMADAS EN EL HERO
    // ============================================

    const particlesContainer = $('#particles');

    /**
     * Crea partículas flotantes en la sección hero
     * Genera elementos div con animación CSS aleatoria
     */
    const createParticles = () => {
        if (!particlesContainer) return;

        const particleCount = 25;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Posición aleatoria
            const x = Math.random() * 100;
            const y = Math.random() * 100;

            // Tamaño aleatorio
            const size = Math.random() * 4 + 2;

            // Duración de animación aleatoria
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;

            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.opacity = Math.random() * 0.5 + 0.1;

            particlesContainer.appendChild(particle);
        }
    };

    createParticles();

    // ============================================
    // CONTADOR DE ESTADÍSTICAS ANIMADO
    // ============================================

    const statNumbers = $$('.stat-number');
    let statsAnimated = false;

    /**
     * Anima los números de estadísticas contando desde 0
     * @param {Element} element - Elemento del número
     * @param {number} target - Valor final
     * @param {number} duration - Duración en ms
     */
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * (target - start) + start);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(updateCounter);
    };

    /**
     * Inicia la animación de estadísticas cuando son visibles
     */
    const handleStatsAnimation = () => {
        if (statsAnimated) return;

        const heroSection = $('#hero');
        if (heroSection && isInViewport(heroSection, 200)) {
            statsAnimated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
        }
    };

    // ============================================
    // ANIMACIONES AL HACER SCROLL (Fade In)
    // ============================================

    const fadeElements = $$('.section-header, .about-grid, .summary-card, .project-card, .timeline-item, .academic-card, .certificate-card, .recommendation-card, .affiliation-card, .achievement-item, .contact-item, .gallery-item');

    /**
     * Agrega clase 'visible' a elementos cuando entran al viewport
     * para activar animaciones CSS
     */
    const handleScrollAnimations = () => {
        fadeElements.forEach(element => {
            if (isInViewport(element, 100)) {
                element.classList.add('fade-in', 'visible');
            }
        });
    };

    // ============================================
    // BARRAS DE COMPETENCIAS ANIMADAS
    // ============================================

    const competencyFills = $$('.competency-fill');
    let competenciesAnimated = false;

    /**
     * Anima el llenado de las barras de competencias
     */
    const animateCompetencies = () => {
        if (competenciesAnimated) return;

        const cvSection = $('#cv');
        if (cvSection && isInViewport(cvSection, 200)) {
            competenciesAnimated = true;
            competencyFills.forEach((fill, index) => {
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, index * 150);
            });
        }
    };

    // ============================================
    // BOTÓN VOLVER ARRIBA
    // ============================================

    const backToTop = $('#backToTop');

    /**
     * Muestra/oculta el botón de volver arriba
     */
    const handleBackToTop = () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // FORMULARIO DE CONTACTO
    // ============================================

    const contactForm = $('#contactForm');

    /**
     * Maneja el envío del formulario de contacto
     * Valida campos y muestra feedback (demo)
     */
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const name = $('#name').value.trim();
        const email = $('#email').value.trim();
        const subject = $('#subject').value;
        const message = $('#message').value.trim();

        // Validación básica
        if (!name || !email || !subject || !message) {
            showNotification('Por favor completa todos los campos', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Por favor ingresa un email válido', 'error');
            return;
        }

        // Simulación de envío exitoso
        showNotification('¡Mensaje enviado correctamente! (Demo)', 'success');
        contactForm.reset();
    };

    /**
     * Valida formato de email
     * @param {string} email - Email a validar
     * @returns {boolean}
     */
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    /**
     * Muestra notificación temporal
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo: 'success' o 'error'
     */
    const showNotification = (message, type = 'success') => {
        // Eliminar notificación anterior si existe
        const existingNotification = $('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        // Estilos inline para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? 'rgba(16, 185, 129, 0.95)' : 'rgba(239, 68, 68, 0.95)'};
            color: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
            z-index: 9999;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    };

    // Agregar keyframes para notificaciones
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(notificationStyles);

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // ============================================
    // PARALLAX SUAVE EN HERO
    // ============================================

    const heroContent = $('.hero-content');

    /**
     * Efecto parallax suave en la sección hero
     */
    const handleParallax = () => {
        if (window.innerWidth > 768 && heroContent) {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
            }
        }
    };

    // ============================================
    // EFECTO HOVER EN TARJETAS DE PROYECTOS
    // ============================================

    const projectCards = $$('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            projectCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.6';
                    c.style.transform = 'scale(0.98)';
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            projectCards.forEach(c => {
                c.style.opacity = '1';
                c.style.transform = '';
            });
        });
    });

    // ============================================
    // EFECTO DE BRILLO EN CERTIFICADOS
    // ============================================

    const certificateCards = $$('.certificate-card');

    certificateCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(6, 182, 212, 0.15) 0%,
                    rgba(30, 41, 59, 0.6) 50%
                )
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

    // ============================================
    // OBSERVADOR DE INTERSECCIÓN (Performance)
    // ============================================

    /**
     * Configura el IntersectionObserver para animaciones
     * Más eficiente que verificar en cada evento de scroll
     */
    const setupIntersectionObserver = () => {
        if (!('IntersectionObserver' in window)) {
            // Fallback para navegadores antiguos
            window.addEventListener('scroll', () => {
                handleScrollAnimations();
                handleStatsAnimation();
                animateCompetencies();
            });
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in', 'visible');

                    // Animar estadísticas si es el hero
                    if (entry.target.id === 'hero' && !statsAnimated) {
                        handleStatsAnimation();
                    }

                    // Animar competencias si es el CV
                    if (entry.target.id === 'cv' && !competenciesAnimated) {
                        animateCompetencies();
                    }
                }
            });
        }, observerOptions);

        // Observar todas las secciones
        $$('section').forEach(section => observer.observe(section));

        // Observar elementos individuales
        fadeElements.forEach(el => observer.observe(el));
    };

    // ============================================
    // INICIALIZACIÓN
    // ============================================

    /**
     * Inicializa todas las funcionalidades cuando el DOM está listo
     */
    const init = () => {
        // Ejecutar handlers iniciales
        handleNavbarScroll();
        updateActiveNavLink();
        handleScrollAnimations();
        handleStatsAnimation();

        // Configurar observer
        setupIntersectionObserver();

        // Event listener combinado para scroll
        window.addEventListener('scroll', () => {
            handleNavbarScroll();
            handleBackToTop();
            handleParallax();
        });

        // Manejar resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });

        // Precargar animaciones iniciales
        document.body.classList.add('loaded');
    };

    // Iniciar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================
    // CONSOLA - Mensaje para desarrolladores
    // ============================================

    console.log('%c👋 ¡Hola! ', 'font-size: 24px; font-weight: bold; color: #06b6d4;');
    console.log('%cEste portafolio fue construido con HTML5, CSS3 y JavaScript puro.', 'font-size: 14px; color: #94a3b8;');
    console.log('%c¿Interesado en colaborar? Contáctame a través de la sección de contacto.', 'font-size: 14px; color: #94a3b8;');

})();
