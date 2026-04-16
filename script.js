document.addEventListener('DOMContentLoaded', () => {
    
    /* ==============================================
       Navigation & Mobile Menu
       ============================================== */
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    // Scroll Effect on Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle FontAwesome Icon
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close Mobile Menu when link clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    /* ==============================================
       Active Link Highlighting on Scroll
       ============================================== */
    const sections = document.querySelectorAll('section, header');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - parseInt(getComputedStyle(navbar).height) - 10;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* ==============================================
       Reveal Elements on Scroll
       ============================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealFunction = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealFunction);
    revealFunction(); // Trigger once on load

    /* ==============================================
       Particles Effect in Hero Section
       ============================================== */
    const particlesContainer = document.getElementById('particles-js');
    
    if (particlesContainer) {
        // Simple Vanilla JS Particles implementation
        const createParticles = () => {
            const particleCount = 50;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random properties
                const size = Math.random() * 5 + 2;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * 5;
                const opacity = Math.random() * 0.5 + 0.1;

                // Apply styles directly
                particle.style.position = 'absolute';
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.backgroundColor = i % 2 === 0 ? 'var(--primary-color)' : 'var(--secondary-color)';
                particle.style.borderRadius = '50%';
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.opacity = opacity;
                particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;

                particlesContainer.appendChild(particle);
            }
        };

        // Inject the animation CSS dynamically
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes floatParticle {
                0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
                10% { opacity: 0.5; }
                90% { opacity: 0.5; }
                100% { transform: translateY(-1000px) translateX(200px) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        createParticles();
    }

    /* ==============================================
       Countdown Timer
       ============================================== */
    const countDownDate = new Date("Apr 29, 2026 09:00:00").getTime();

    const countdownTimer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(countdownTimer);
            const countdownEl = document.getElementById("countdown");
            if (countdownEl) {
                countdownEl.innerHTML = "<div class='time-box' style='width: 100%;'><span>حان وقت التغيير والتصويت!</span></div>";
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
        if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }, 1000);

    /* ==============================================
       Share Button Logic
       ============================================== */
    const shareButton = document.getElementById('shareButton');
    if (shareButton) {
        shareButton.addEventListener('click', async () => {
            const shareData = {
                title: 'البرنامج الانتخابي | حلف الاتحاد والتغيير',
                text: 'أدعوكم لقراءة برنامجي الانتخابي لتمثيل قسم علم الحاسوب وأمن المعلومات. صوتك يصنع التغيير!',
                url: window.location.href,
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    await navigator.clipboard.writeText(shareData.text + " " + shareData.url);
                    alert("تم نسخ رابط الموقع بنجاح! يمكنك الآن لصقه ومشاركته مع زملائك.");
                }
            } catch (err) {
                console.error('Error sharing:', err);
            }
        });
    }

});
