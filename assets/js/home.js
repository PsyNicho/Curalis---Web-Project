s//  Date & greeting 
(function () {
  const now   = new Date();
  const hour  = now.getHours();
  const times = ['morning', 'afternoon', 'evening'];
  const greet = hour < 12 ? times[0] : hour < 17 ? times[1] : times[2];

  document.getElementById('timeOfDay').textContent = greet;

  const dateEl = document.getElementById('topbarDate');
  if (dateEl) {
    dateEl.textContent = now.toLocaleDateString('en-US', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    });
  }
})();

//  Nav click — navigate to page 
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    const page = item.dataset.page;
    if (page) window.location.href = page;
  });
});

//  Profile menu (popup above profile pic) 
const profilePic  = document.getElementById('profilePic');
const profileMenu = document.getElementById('profileMenu');

profilePic.addEventListener('click', (e) => {
  e.stopPropagation();
  profileMenu.classList.toggle('open');
});

// Close menu when clicking anywhere else
document.addEventListener('click', () => {
  profileMenu.classList.remove('open');
});

profileMenu.addEventListener('click', (e) => e.stopPropagation());

// Logout → go to index
document.getElementById('btnLogout').addEventListener('click', () => {
  // Clear any session indicators on client side
  sessionStorage.clear();
  localStorage.clear();
  window.location.href = 'index.html';
});

// Edit health card → open modal
document.getElementById('btnEditCard').addEventListener('click', () => {
  profileMenu.classList.remove('open');
  openModal();
});

// Languages (placeholder)
document.getElementById('btnLanguages').addEventListener('click', () => {
  profileMenu.classList.remove('open');
  alert('Language selection coming soon.');
});

//  Health Card Modal 
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');

function openModal()  { modalOverlay.classList.add('open'); }
function closeModal() { modalOverlay.classList.remove('open'); }

modalClose.addEventListener('click', closeModal);

// Close on overlay click (outside modal)
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

//  Health Tips carousel (circular) 
const tips = [
  {
    title: 'Drink 8 glasses of water daily',
    body:  'Staying hydrated improves energy, focus, and helps flush out toxins.'
  },
  {
    title: 'Take a 10-minute walk after meals',
    body:  'Light movement after eating aids digestion and helps regulate blood sugar.'
  },
  {
    title: 'Sleep 7–9 hours every night',
    body:  'Quality sleep boosts immunity, mood, and helps the heart recover.'
  },
  {
    title: 'Eat a rainbow of vegetables',
    body:  'Different colors mean different nutrients; variety is key to a balanced diet.'
  },
  {
    title: 'Practice deep breathing for 5 minutes',
    body:  'Reduces cortisol levels, lowers blood pressure, and calms the nervous system.'
  }
];

let currentTip = 0;

const tipTitle   = document.getElementById('tipTitle');
const tipBody    = document.getElementById('tipBody');
const tipContent = document.getElementById('tipContent');
const tipDots    = document.getElementById('tipDots');

// Build dots
tips.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'tip-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goToTip(i));
  tipDots.appendChild(dot);
});

function updateDots() {
  document.querySelectorAll('.tip-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentTip);
  });
}

function showTip(index) {
  // Circular wrap
  currentTip = ((index % tips.length) + tips.length) % tips.length;

  tipContent.classList.add('fading');
  setTimeout(() => {
    tipTitle.textContent = tips[currentTip].title;
    tipBody.textContent  = tips[currentTip].body;
    tipContent.classList.remove('fading');
    updateDots();
  }, 300);
}

function goToTip(index) { showTip(index); }

document.getElementById('tipNext').addEventListener('click', () => showTip(currentTip + 1));
document.getElementById('tipPrev').addEventListener('click', () => showTip(currentTip - 1));

// Auto-advance every 6 seconds (circular)
let autoPlay = setInterval(() => showTip(currentTip + 1), 6000);

// Reset timer on manual nav
['tipNext', 'tipPrev'].forEach(id => {
  document.getElementById(id).addEventListener('click', () => {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => showTip(currentTip + 1), 6000);
  });
});

// Initial render
showTip(0);

//  Hover/click ripple on spec items 
document.querySelectorAll('.spec-item').forEach(item => {
  item.addEventListener('click', () => {
    const icon = item.querySelector('.spec-icon');
    icon.style.transform = 'scale(0.9)';
    setTimeout(() => { icon.style.transform = ''; }, 150);
  });
});

//  Appointment button click effects 
document.querySelectorAll('.appt-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => { this.style.transform = ''; }, 150);
  });
});
