document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Intersection Observer for scroll animations
  const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: stop observing once revealed
        // observer.unobserve(entry.target);
      }
    });
  };

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Hero image special clip-path animation
  const heroImage = document.querySelector('.hero-img-container');
  if (heroImage) {
    setTimeout(() => {
      heroImage.classList.add('start-clip');
    }, 500); // delay before starting the shape change
  }

  // Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const service = document.getElementById('service').value;
      const formMessage = document.getElementById('form-message');
      
      let isValid = true;
      let errorMsg = '';

      if (name.length < 2) {
        isValid = false;
        errorMsg = 'Please enter a valid name.';
      } else if (!/^[0-9\-\+\s\(\)]{7,15}$/.test(phone)) {
        isValid = false;
        errorMsg = 'Please enter a valid phone number.';
      } else if (service === '') {
        isValid = false;
        errorMsg = 'Please select a service.';
      }

      if (!isValid) {
        formMessage.textContent = errorMsg;
        formMessage.className = 'text-red-500 font-medium text-sm mt-2';
      } else {
        // Success
        formMessage.textContent = 'Thanks ' + name + '! We will contact you soon.';
        formMessage.className = 'text-green-600 font-medium text-sm mt-2';
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
           formMessage.textContent = '';
        }, 5000);
      }
    });
  }
});
