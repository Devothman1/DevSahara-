// ====== MOBILE MENU TOGGLE ======
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.navbar ul');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });
}

// ====== SMOOTH SCROLLING ======
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ====== SCROLL ANIMATION (fade-in) ======
const fadeElements = document.querySelectorAll('.fade-in');

function checkFadeIn() {
  const triggerBottom = window.innerHeight * 0.85;

  fadeElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('show');
    } else {
      el.classList.remove('show');
    }
  });
}

window.addEventListener('scroll', checkFadeIn);
window.addEventListener('load', checkFadeIn);

// ====== ACTIVE NAV ITEM HIGHLIGHT ======
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar ul li a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ====== BUTTON CLICK FEEDBACK ======
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('mousedown', () => {
    btn.style.transform = 'scale(0.95)';
  });
  btn.addEventListener('mouseup', () => {
    btn.style.transform = 'scale(1)';
  });
});
