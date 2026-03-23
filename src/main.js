import './style.css';

// Navbar Scroll Effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.add('scrolled');
    // It should be removed, but we want it a tiny bit transparent
    if(window.scrollY === 0) {
        header.classList.remove('scrolled');
    }
  }
});

// Intersection Observer for Scroll Animations
const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Check for count-up elements
        const countTargets = entry.target.querySelectorAll('.count-up');
        countTargets.forEach(el => {
          if (!el.classList.contains('counted')) {
            startCountUp(el);
            el.classList.add('counted');
          }
        });
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
  });
};

// CountUp Logic
const startCountUp = (el) => {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 2000; // 2 seconds
  const stepTime = Math.abs(Math.floor(duration / target)) || 10;
  let current = 0;
  
  // Custom increment matching speed
  const increment = target / (duration / 16); // 60fps
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.innerText = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.innerText = Math.floor(current).toLocaleString();
    }
  }, 16);
};

// FAQ Accordion Logic
const initFAQ = () => {
  const faqItems = document.querySelectorAll('.faq-question');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const parent = item.parentElement;
      const answer = parent.querySelector('.faq-answer');
      
      // Close others (optional)
      /*
      document.querySelectorAll('.faq-item').forEach(other => {
        if(other !== parent) {
          other.classList.remove('active');
          other.querySelector('.faq-answer').style.maxHeight = null;
        }
      });
      */

      parent.classList.toggle('active');
      if (parent.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  observeElements();
  initFAQ();
});
