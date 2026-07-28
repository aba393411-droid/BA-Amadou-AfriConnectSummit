document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. MENU MOBILE (BURGER)
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('toggle');
    });
  }

  // ==========================================
  // 2. MODE SOMBRE / MODE CLAIR (DARK/LIGHT MODE)
  // ==========================================
  // Note: Si votre CSS utilise [data-theme="dark"], 
  // assurez-vous d'adapter la manipulation ci-dessous ou d'utiliser document.documentElement
  const themeToggleBtn = document.querySelector('#theme-toggle');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      let theme = 'light';
      if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        theme = 'dark';
      }
      localStorage.setItem('theme', theme);
    });
  }

  // ==========================================
  // 3. ANNÉE DYNAMIQUE (FOOTER)
  // ==========================================
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ==========================================
  // 4. BOUTON RETOUR EN HAUT (SCROLL-TOP)
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
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 5. ONGLETS DYNAMIQUES (PAGE PROGRAMME)
  // ==========================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-content'); // Correspond à .tab-content dans votre CSS

  if (tabButtons.length > 0 && tabPanes.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons et contenus
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Activer le bouton cliqué
        button.classList.add('active');

        // Récupérer la cible et afficher le contenu correspondant
        const targetId = button.getAttribute('data-target');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }
});

/**
 * AfriConnect Summit - Script Principal (Vanilla JavaScript)
 * Description : Gestion de l'interactivité, du DOM, du stockage local et des animations.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. GESTION DU DARK / LIGHT MODE
  // ==========================================
  const themeToggleBtn = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'Activer le mode clair');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      
      if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.setAttribute('aria-label', 'Activer le mode sombre');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.setAttribute('aria-label', 'Activer le mode clair');
      }
    });
  }

  // ==========================================
  // 2. NAVBAR DYNAMIQUE & MENU HAMBURGER
  // ==========================================
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

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
  // 3. ANIMATIONS AU SCROLL (IntersectionObserver)
  // ==========================================
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .zoom-in');

  if ('IntersectionObserver' in window && animatedElements.length > 0) {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    animatedElements.forEach(el => observer.observe(el));
  } else {
    animatedElements.forEach(el => el.classList.add('visible'));
  }

  // ==========================================
  // 4. ONGLETS DU PROGRAMME (programme.html)
  // ==========================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

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
  // 5. FILTRAGE DES INTERVENANTS (intervenants.html)
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
  // 6. VALIDATION DU FORMULAIRE (contact.html)
  // ==========================================
  const contactForm = document.getElementById('registration-form');

  if (contactForm) {
    const fullNameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const successMessageContainer = document.getElementById('form-success-message');

    const setError = (input, message) => {
      const formControl = input.parentElement;
      formControl.className = 'form-control error';
      const small = formControl.querySelector('small');
      if (small) small.textContent = message;
    };

    const setSuccess = (input) => {
      const formControl = input.parentElement;
      formControl.className = 'form-control success';
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      if (fullNameInput.value.trim() === '') {
        setError(fullNameInput, 'Le nom complet est obligatoire.');
        isValid = false;
      } else {
        setSuccess(fullNameInput);
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        setError(emailInput, 'Veuillez entrer une adresse email valide.');
        isValid = false;
      } else {
        setSuccess(emailInput);
      }

      const phoneClean = phoneInput.value.replace(/\D/g, '');
      if (phoneClean.length < 8) {
        setError(phoneInput, 'Le numéro de téléphone doit comporter au moins 8 chiffres.');
        isValid = false;
      } else {
        setSuccess(phoneInput);
      }

      if (messageInput.value.trim().length < 20) {
        setError(messageInput, 'Le message ou la motivation doit contenir au moins 20 caractères.');
        isValid = false;
      } else {
        setSuccess(messageInput);
      }

      if (isValid) {
        if (successMessageContainer) {
          successMessageContainer.textContent = 'Inscription envoyée avec succès ! Merci de participer à l’AfriConnect Summit.';
          successMessageContainer.style.display = 'block';
        }
        contactForm.reset();
        document.querySelectorAll('.form-control').forEach(control => {
          control.classList.remove('success');
        });

        setTimeout(() => {
          if (successMessageContainer) {
            successMessageContainer.style.display = 'none';
          }
        }, 5000);
      }
    });
  }

  // ==========================================
  // 7. BOUTON RETOUR EN HAUT
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
  // 8. ANNÉE DYNAMIQUE DANS LE FOOTER
  // ==========================================
  const yearSpans = document.querySelectorAll('#current-year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = currentYear;
  });

});

/**
 * AfriConnect Summit - Fonctionnalités Avancées (Commit 9)
 * Description : Gestion des filtres de recherche en temps réel et des interactions dynamiques.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. RECHERCHE EN TEMPS RÉEL (Intervenants ou Sessions)
  // ==========================================
  const searchInput = document.getElementById('search-input');
  const searchItems = document.querySelectorAll('.searchable-item');

  if (searchInput && searchItems.length > 0) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();

      searchItems.forEach(item => {
        const textContent = item.textContent.toLowerCase();
        
        if (textContent.includes(searchTerm)) {
          item.style.display = 'block';
          item.style.opacity = '1';
        } else {
          item.style.opacity = '0';
          setTimeout(() => {
            if (item.style.opacity === '0') {
              item.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  }

  // ==========================================
  // 2. GESTION DES FAVORIS (LocalStorage)
  // ==========================================
  const bookmarkButtons = document.querySelectorAll('.btn-bookmark');

  if (bookmarkButtons.length > 0) {
    bookmarkButtons.forEach(button => {
      const itemId = button.getAttribute('data-id');
      const savedBookmarks = JSON.parse(localStorage.getItem('afri_bookmarks')) || [];

      // Restaurer l'état initial des favoris
      if (savedBookmarks.includes(itemId)) {
        button.classList.add('bookmarked');
        button.textContent = '★ Enregistré';
      }

      button.addEventListener('click', () => {
        let currentBookmarks = JSON.parse(localStorage.getItem('afri_bookmarks')) || [];
        
        if (currentBookmarks.includes(itemId)) {
          // Supprimer des favoris
          currentBookmarks = currentBookmarks.filter(id => id !== itemId);
          button.classList.remove('bookmarked');
          button.textContent = '☆ Favori';
        } else {
          // Ajouter aux favoris
          currentBookmarks.push(itemId);
          button.classList.add('bookmarked');
          button.textContent = '★ Enregistré';
        }

        localStorage.setItem('afri_bookmarks', JSON.stringify(currentBookmarks));
      });
    });
  }

  // ==========================================
  // 3. COMPTEUR DE CARACTÈRES (Formulaire de contact)
  // ==========================================
  const messageTextarea = document.getElementById('message');
  const charCountDisplay = document.getElementById('char-count');

  if (messageTextarea && charCountDisplay) {
    const maxLength = messageTextarea.getAttribute('maxlength') || 300;

    messageTextarea.addEventListener('input', () => {
      const currentLength = messageTextarea.value.length;
      charCountDisplay.textContent = `${currentLength} / ${maxLength} caractères`;

      if (currentLength >= maxLength) {
        charCountDisplay.style.color = 'var(--error-color, #e74c3c)';
      } else {
        charCountDisplay.style.color = 'inherit';
      }
    });
  }

});