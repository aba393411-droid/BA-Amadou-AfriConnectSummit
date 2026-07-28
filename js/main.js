/**
 * AfriConnect Summit - Script Principal
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. GESTION DU DARK / LIGHT MODE
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggleBtn) {
      const icon = themeToggleBtn.querySelector('i');
      if (icon) icon.className = 'bi bi-sun-fill';
      themeToggleBtn.setAttribute('aria-label', 'Activer le mode clair');
    }
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeToggleBtn) {
      const icon = themeToggleBtn.querySelector('i');
      if (icon) icon.className = 'bi bi-moon-fill';
      themeToggleBtn.setAttribute('aria-label', 'Activer le mode sombre');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const icon = themeToggleBtn.querySelector('i');
      
      if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if (icon) icon.className = 'bi bi-moon-fill';
        themeToggleBtn.setAttribute('aria-label', 'Activer le mode sombre');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (icon) icon.className = 'bi bi-sun-fill';
        themeToggleBtn.setAttribute('aria-label', 'Activer le mode clair');
      }
    });
  }

  // ==========================================
  // 2. MENU MOBILE (HAMBURGER)
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      const isExpanded = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================
  // 3. ANIMATION DES STATISTIQUES (Counters)
  // ==========================================
  const statCounters = document.querySelectorAll('.counter');
  
  if (statCounters.length > 0) {
    const runCounter = (counter) => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = target / 50; 

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.textContent = Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          counter.textContent = target;
        }
      };
      updateCount();
    };

    if ('IntersectionObserver' in window) {
      const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      statCounters.forEach(counter => statsObserver.observe(counter));
    } else {
      statCounters.forEach(counter => runCounter(counter));
    }
  }

  // ==========================================
  // 4. ONGLETS DU PROGRAMME (si présents)
  // ==========================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-content');

  if (tabButtons.length > 0 && tabPanes.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        button.classList.add('active');
        const targetId = button.getAttribute('data-target');
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');
      });
    });
  }

  // ==========================================
  // 5. FILTRAGE DES INTERVENANTS
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const speakerCards = document.querySelectorAll('.speaker-card');

  if (filterButtons.length > 0 && speakerCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        speakerCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 50);
          } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });
  }

  // ==========================================
  // 6. VALIDATION DU FORMULAIRE DE CONTACT
  // ==========================================
  const contactForm = document.getElementById('registration-form');

  if (contactForm) {
    const fullNameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('Phone');
    const ticketInput = document.getElementById('ticket-type');
    const countryInput = document.getElementById('country');
    const messageInput = document.getElementById('motivation');
    const successBanner = document.getElementById('success-banner');

    const setError = (input, message) => {
      if (!input) return;
      const formGroup = input.closest('.form-group') || input.parentElement;
      formGroup.classList.add('error');
      formGroup.classList.remove('success');
      const errorSpan = formGroup.querySelector('.error-message');
      if (errorSpan) errorSpan.textContent = message;
    };

    const setSuccess = (input) => {
      if (!input) return;
      const formGroup = input.closest('.form-group') || input.parentElement;
      formGroup.classList.remove('error');
      formGroup.classList.add('success');
      const errorSpan = formGroup.querySelector('.error-message');
      if (errorSpan) errorSpan.textContent = '';
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      if (fullNameInput && fullNameInput.value.trim() === '') {
        setError(fullNameInput, 'Le nom complet est obligatoire.');
        isValid = false;
      } else if (fullNameInput) {
        setSuccess(fullNameInput);
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput && !emailRegex.test(emailInput.value.trim())) {
        setError(emailInput, 'Veuillez entrer une adresse email valide.');
        isValid = false;
      } else if (emailInput) {
        setSuccess(emailInput);
      }

      if (phoneInput) {
        const phoneClean = phoneInput.value.replace(/\D/g, '');
        if (phoneClean.length < 8) {
          setError(phoneInput, 'Le numéro de téléphone doit comporter au moins 8 chiffres.');
          isValid = false;
        } else {
          setSuccess(phoneInput);
        }
      }

      if (ticketInput && ticketInput.value === '') {
        setError(ticketInput, 'Veuillez choisir un type de participation.');
        isValid = false;
      } else if (ticketInput) {
        setSuccess(ticketInput);
      }

      if (countryInput && countryInput.value === '') {
        setError(countryInput, 'Veuillez choisir un pays d\'origine.');
        isValid = false;
      } else if (countryInput) {
        setSuccess(countryInput);
      }

      if (messageInput) {
        if (messageInput.value.trim().length < 20) {
          setError(messageInput, 'La motivation doit contenir au moins 20 caractères.');
          isValid = false;
        } else {
          setSuccess(messageInput);
        }
      }

      if (isValid) {
        if (successBanner) {
          successBanner.style.display = 'block';
        }
        contactForm.reset();
        document.querySelectorAll('.form-group').forEach(group => {
          group.classList.remove('success');
        });

        setTimeout(() => {
          if (successBanner) {
            successBanner.style.display = 'none';
          }
        }, 5000);
      }
    });
  }

  // ==========================================
  // 7. COMPTE À REBOURS DE L'ÉVÉNEMENT
  // ==========================================
  const countdownBox = document.getElementById('countdown');
  
  if (countdownBox) {
    const eventDate = new Date('October 15, 2026 09:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeLeft = eventDate - now;

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesElem = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesElem) minutesElem.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
      }
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();
  }

  // ==========================================
  // 8. BOUTON RETOUR EN HAUT
  // ==========================================
  const scrollTopBtn = document.querySelector('.scroll-top');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 9. ANNÉE DYNAMIQUE DANS LE FOOTER
  // ==========================================
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});