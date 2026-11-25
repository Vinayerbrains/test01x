/* ================================================================
   Recovera Wellness — cinematic interactive homepage
   ================================================================ */

// ─── Smooth scroll for anchor links ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── Header transparency on scroll ───────────────────────────────
const header = document.getElementById('site-header');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 80) {
    header.classList.add('bg-recovera-dark/90', 'backdrop-blur-xl', 'shadow-lg', 'shadow-black/20');
    header.classList.remove('bg-transparent');
  } else {
    header.classList.remove('bg-recovera-dark/90', 'backdrop-blur-xl', 'shadow-lg', 'shadow-black/20');
    header.classList.add('bg-transparent');
  }
  lastScrollY = scrollY;
});

// ─── Mobile menu toggle ──────────────────────────────────────────
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileBtn.setAttribute('aria-expanded', isOpen);
    // hamburger → X
    mobileBtn.innerHTML = isOpen
      ? '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
      : '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileBtn.innerHTML = '<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
      mobileBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// ─── Counter animation (IntersectionObserver) ────────────────────
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 20);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}
animateCounters();

// ─── Testimonial carousel ────────────────────────────────────────
(function initTestimonialCarousel() {
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dotsContainer = document.getElementById('testimonial-dots');
  if (!track || !prevBtn || !nextBtn) return;

  const cards = Array.from(track.children);
  // Clone first and last for infinite feel
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, cards[0]);

  const allSlides = Array.from(track.children);
  const slideWidth = 100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
  let currentIndex = 1; // start at real first card
  let isAnimating = false;

  track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

  // Dots
  const realCount = cards.length;
  if (dotsContainer) {
    for (let i = 0; i < realCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'w-2 h-2 rounded-full bg-white/20 hover:bg-recovera-gold/60 transition';
      dot.dataset.index = i;
      dot.addEventListener('click', () => goTo(i + 1));
      dotsContainer.appendChild(dot);
    }
    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.children;
    const realIdx = ((currentIndex - 1) % realCount + realCount) % realCount;
    Array.from(dots).forEach((dot, i) => {
      dot.className = i === realIdx
        ? 'w-3 h-3 rounded-full bg-recovera-gold transition'
        : 'w-2 h-2 rounded-full bg-white/20 hover:bg-recovera-gold/60 transition';
    });
  }

  function goTo(index) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = index;
    track.style.transition = 'transform 0.5s ease-out';
    track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    updateDots();
    // Handle infinite loop
    if (currentIndex === 0) {
      setTimeout(() => {
        track.style.transition = 'none';
        currentIndex = realCount;
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        isAnimating = false;
      }, 500);
    } else if (currentIndex === realCount + 1) {
      setTimeout(() => {
        track.style.transition = 'none';
        currentIndex = 1;
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        isAnimating = false;
      }, 500);
    } else {
      setTimeout(() => { isAnimating = false; }, 500);
    }
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  // Auto-play every 5 seconds
  let autoplay = setInterval(() => goTo(currentIndex + 1), 5000);
  track.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goTo(currentIndex + 1), 5000);
  });

  // Recalculate slide width on resize
  window.addEventListener('resize', () => {
    const newSlideWidth = 100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    // We'd need to re-set, but for simplicity just update
  });
})();

// ─── FAQ accordion ───────────────────────────────────────────────
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  const icon = btn.querySelector('svg');

  // Start hidden
  answer.style.display = 'none';

  btn.addEventListener('click', () => {
    const isOpen = answer.style.display === 'block';
    // Close all others
    document.querySelectorAll('.faq-item .faq-answer').forEach(a => a.style.display = 'none');
    document.querySelectorAll('.faq-item .faq-question svg').forEach(svg => svg.style.transform = 'rotate(0deg)');
    if (!isOpen) {
      answer.style.display = 'block';
      icon.style.transform = 'rotate(180deg)';
    }
  });
});

// ─── Product detail modal ────────────────────────────────────────
const modal = document.getElementById('product-modal');
const modalContent = document.getElementById('modal-content');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalCloseBtn = document.getElementById('modal-close');

const productData = {
  'pulse-pro': {
    name: 'Pulse Pro Massage Gun',
    price: '$189',
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80',
    specs: [
      '6 speed levels (1200–3200 rpm)',
      '4 ergonomic attachment heads',
      '< 40 dB whisper-quiet brushless motor',
      '5-hour battery, USB-C fast charge',
      'Includes travel case & charging cable',
      '1-year warranty + 30-day trial'
    ]
  },
  'solara': {
    name: 'Solara Light Therapy Panel',
    price: '$349',
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    specs: [
      '630nm Red + 830nm NIR + 460nm Blue',
      '2000 mW/cm² irradiance',
      '10 / 15 / 20 / 30 min auto-cycle',
      'Adjustable stand & travel case',
      'Eye-safe auto shutoff sensor',
      '2-year warranty + 30-day trial'
    ]
  }
};

document.querySelectorAll('.product-detail-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.product;
    const data = productData[key];
    if (!data) return;
    modalContent.innerHTML = `
      <img src="${data.image}" alt="${data.name}" class="w-full h-48 object-cover rounded-xl mb-6">
      <span class="px-3 py-1 bg-recovera-gold text-recovera-dark text-xs font-bold uppercase rounded-full">${data.tag}</span>
      <h3 class="text-2xl font-bold mt-4 mb-1">${data.name}</h3>
      <p class="text-3xl font-bold text-recovera-gold mb-4">${data.price}</p>
      <ul class="space-y-2 text-sm text-gray-300 mb-6">
        ${data.specs.map(s => `<li class="flex items-start"><span class="text-recovera-gold mr-2 mt-1">✓</span> ${s}</li>`).join('')}
      </ul>
      <button class="btn-gold w-full text-center">Add to Cart — ${data.price}</button>
    `;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ─── Loading spinner ─────────────────────────────────────────────
window.addEventListener('load', () => {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.style.opacity = '0';
    spinner.style.transition = 'opacity 0.6s ease-out';
    setTimeout(() => spinner.classList.add('hidden'), 600);
  }
});
