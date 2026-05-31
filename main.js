/* =============================================
   EDUPRIME ACADEMY — MAIN JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------
     1. NAVBAR — Scroll shadow + hamburger menu
  ----------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Add shadow on scroll
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // Hamburger toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  }


  /* -----------------------------------------
     2. COURSE FILTER PILLS (services.html)
  ----------------------------------------- */
  const filterPills = document.getElementById('filterPills');
  const coursesGrid = document.getElementById('coursesGrid');

  if (filterPills && coursesGrid) {
    const pills = filterPills.querySelectorAll('.pill');
    const cards = coursesGrid.querySelectorAll('.course-card');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        // Update active pill
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.getAttribute('data-filter');

        cards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeInUp 0.4s ease forwards';
          } else {
            card.classList.add('hidden');
            card.style.animation = '';
          }
        });
      });
    });
  }


  /* -----------------------------------------
     3. CONTACT FORM VALIDATION (contact.html)
  ----------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Clear previous errors
      contactForm.querySelectorAll('.form-error').forEach(el => el.textContent = '');

      // Validate first name
      const firstName = document.getElementById('firstName');
      if (!firstName.value.trim()) {
        document.getElementById('firstNameError').textContent = 'El nombre es obligatorio';
        isValid = false;
      }

      // Validate last name
      const lastName = document.getElementById('lastName');
      if (!lastName.value.trim()) {
        document.getElementById('lastNameError').textContent = 'El apellido es obligatorio';
        isValid = false;
      }

      // Validate email
      const email = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim()) {
        document.getElementById('emailError').textContent = 'El correo es obligatorio';
        isValid = false;
      } else if (!emailRegex.test(email.value)) {
        document.getElementById('emailError').textContent = 'Introduce un correo válido';
        isValid = false;
      }

      // Validate phone
      const phone = document.getElementById('phone');
      if (!phone.value.trim()) {
        document.getElementById('phoneError').textContent = 'El teléfono es obligatorio';
        isValid = false;
      }

      // Validate course selection
      const course = document.getElementById('course');
      if (!course.value) {
        document.getElementById('courseError').textContent = 'Selecciona un programa';
        isValid = false;
      }

      // Validate privacy checkbox
      const privacy = document.getElementById('privacy');
      if (!privacy.checked) {
        document.getElementById('privacyError').textContent = 'Debes aceptar la política de privacidad';
        isValid = false;
      }

      if (isValid) {
        // Show loading state
        const btnText = contactForm.querySelector('.btn-text');
        const btnLoading = contactForm.querySelector('.btn-loading');
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline';

        // Simulate sending (replace with real endpoint)
        setTimeout(() => {
          contactForm.style.display = 'none';
          if (formSuccess) formSuccess.style.display = 'block';
        }, 1500);
      }
    });
  }


  /* -----------------------------------------
     4. FAQ ACCORDION (contact.html)
  ----------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all
        faqItems.forEach(i => i.classList.remove('open'));

        // Open clicked (toggle)
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });


  /* -----------------------------------------
     5. SCROLL REVEAL ANIMATIONS
  ----------------------------------------- */
  const revealElements = document.querySelectorAll(
    '.feature-card, .testimonial-card, .mvv-card, .stat-item, .team-card, .course-card, .included-item, .trust-item'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Staggered animation
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: just show everything
    revealElements.forEach(el => el.classList.add('visible'));
  }

});


/* Fade-in-up keyframe for filtered cards */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
