# AfriConnect Summit 2026 - Site Vitrine Panafricain

Bienvenue sur le dépôt officiel du site web de l'**AfriConnect Summit 2026**, un événement technologique de premier plan réunissant les acteurs majeurs de la tech, de l'innovation et de l'entrepreneuriat sur le continent africain.

---

## 👤 Informations sur le projet
* **Événement :** AfriConnect Summit 2026
* **Lieu :** Dakar, Sénégal (CICAD - Diamniadio)
* **Encadrant / Cours :** Robert DIASSÉ

---

## 🚀 À propos du projet
Ce projet a été réalisé dans le cadre de l'examen final de Technologie Web. Il s'agit d'un site vitrine complet, responsive, fluide et interactif, développé en **HTML5 sémantique, CSS3 (Flexbox/Grid) et JavaScript Vanilla**, sans aucun framework externe.

---

## 🛠️ Technologies & Outils
* **HTML5 :** Utilisation rigoureuse des balises sémantiques (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) et respect des normes d'accessibilité (`alt`, `aria-label`).
* **CSS3 :** Variables CSS, design system personnalisé avec gestion dynamique du mode sombre (`[data-theme="dark"]`), mise en page via **Flexbox** et **CSS Grid**, et media queries pour une adaptation parfaite sur mobile, tablette et desktop.
* **JavaScript (Vanilla) :** Manipulation avancée du DOM, gestion d'événements, persistance de l'état (mode sombre et favoris) via `localStorage`, observation du viewport avec `IntersectionObserver`, filtrage de listes et validation rigoureuse des formulaires par expressions régulières (Regex).
* **Bibliothèques & Icônes :** Google Fonts (**Outfit** & **Inter**) et Bootstrap Icons (CDN).
* **Versioning & Hébergement :** Git, GitHub et GitHub Pages.

---

## 📱 Fonctionnalités JavaScript Implémentées
1. **Mode Sombre / Clair persistant :** Bouton de basculement dans la navbar avec sauvegarde automatique de la préférence dans le `localStorage`.
2. **Navbar dynamique & Menu Mobile :** Effet de transparence/fond au scroll et ouverture fluide du menu burger tactile.
3. **Animations au défilement :** Apparition progressive des sections gérée par l'API `IntersectionObserver`.
4. **Onglets interactifs (Programme) :** Bascule instantanée entre les plannings des 3 jours de l'événement sans recharger la page.
5. **Filtrage des intervenants :** Tri en temps réel des profils d'experts selon leurs domaines (IA, Business, Design, Data).
6. **Validation intelligente de formulaire :** Vérification en direct des champs du formulaire d'inscription (nom, email avec regex, téléphone, longueur minimale du message) avec retours visuels (succès/erreurs) et message de confirmation.
7. **Bouton « Retour en haut » :** Apparition conditionnelle au défilement pour une meilleure navigation (smooth scroll).
8. **Année dynamique :** Mise à jour automatique de l'année dans le pied de page via l'objet `Date`.

---

## 📂 Structure du Dépôt
```text
├── index.html          # Page d'accueil
├── programme.html      # Planning et thématiques du sommet
├── intervenants.html   # Liste et filtres des conférenciers
├── contact.html        # Formulaire d'inscription, infos pratiques et FAQ
├── css/
│   └── style.css       # Feuille de style globale et responsive
└── js/
    └── main.js         # Script principal d'interactivité