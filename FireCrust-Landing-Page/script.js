// particles

const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');

let W = canvas.width  = window.innerWidth;
let H = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
// particle motion
    this.x     = Math.random() * W;
    this.y     = H + 10;
    this.size  = Math.random() * 2.5 + 0.8;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.speedY = -(Math.random() * 1.8 + 0.6);
    this.life   = 1;
    this.decay  = Math.random() * 0.008 + 0.004;
    // Warm fire palette
    const palette = [
      [255, 100,   0],
      [255, 150,   0],
      [255, 200,  40],
      [255,  60,   0],
      [255, 220,  80],
    ];
    this.color = palette[Math.floor(Math.random() * palette.length)];
  }

  update() {
    this.x    += this.speedX;
    this.y    += this.speedY;
    this.life -= this.decay;
    if (this.life <= 0 || this.y < -10) this.reset();
  }

  draw() {
    const [r, g, b] = this.color;
    ctx.save();
    ctx.globalAlpha = this.life * 0.6;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.shadowBlur  = 10;
    ctx.shadowColor = `rgba(${r},${g},${b},0.8)`;
    ctx.fill();
    ctx.restore();
  }
}

// 60 particles 
const particles = Array.from({ length: 60 }, () => new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();


// reveal

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0px)';
      }
    });
  },
  { threshold: 0.12 }
);

const hiddenEls = document.querySelectorAll(
  '.offer-card, .process-card, .why-card, .review-card'
);

hiddenEls.forEach((el) => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(50px)';
  el.style.transition = 'opacity 0.75s ease, transform 0.75s ease';
  observer.observe(el);
});


// parallax

const pizza = document.querySelector('.hero-pizza');

window.addEventListener('scroll', () => {
  if (pizza) {
    pizza.style.transform = `translateY(${window.scrollY * 0.04}px)`;
  }
});


// navbar

const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach((link) => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? '#ff9800'
      : '';
  });
});
