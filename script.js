// VisionX landing page – enhanced interactivity
// 1. Smooth scroll for internal links
// 2. Product image carousel with zoom
// 3. Demo video modal
// 4. Loading spinner on page load

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Simple image carousel for product gallery
const galleryImages = [
  'https://picsum.photos/id/1011/800/600',
  'https://picsum.photos/id/1012/800/600',
  'https://picsum.photos/id/1013/800/600'
];
let currentIndex = 0;
const galleryImgEl = document.getElementById('product-gallery-img');
const prevBtn = document.getElementById('gallery-prev');
const nextBtn = document.getElementById('gallery-next');

function updateGallery() {
  galleryImgEl.src = galleryImages[currentIndex];
}
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  updateGallery();
});
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  updateGallery();
});
updateGallery();

// Demo video modal
const demoBtn = document.getElementById('demo-btn');
const modal = document.getElementById('demo-modal');
const modalClose = document.getElementById('modal-close');

demoBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});
modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Loading spinner
window.addEventListener('load', () => {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) spinner.classList.add('hidden');
});

