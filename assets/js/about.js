document.addEventListener("DOMContentLoaded", () => {

  // Nav 
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (item.dataset.page) window.location.href = item.dataset.page;
    });
  });

  // Profile menu 
  const profilePic  = document.getElementById('profilePic');
  const profileMenu = document.getElementById('profileMenu');
  profilePic.addEventListener('click', (e) => { e.stopPropagation(); profileMenu.classList.toggle('open'); });
  document.addEventListener('click', () => profileMenu.classList.remove('open'));
  profileMenu.addEventListener('click', e => e.stopPropagation());
  document.getElementById('btnLogout').addEventListener('click', () => {
    sessionStorage.clear(); localStorage.clear();
    window.location.href = 'index.html';
  });
  document.getElementById('btnLanguages').addEventListener('click', () => {
    profileMenu.classList.remove('open');
    alert('Language selection coming soon.');
  });
  document.getElementById('btnEditCard').addEventListener('click', () => profileMenu.classList.remove('open'));

  // Animate stats on scroll into view 
  const statNums = document.querySelectorAll('.stat-num, .ssb-num, .ss-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statNums.forEach(el => observer.observe(el));

  // Value card hover lift (JS reinforcement) 
  document.querySelectorAll('.value-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
    });
  });

  // Mission item hover 
  document.querySelectorAll('.mission-item').forEach(item => {
    item.addEventListener('click', () => {
      item.style.transform = 'scale(0.98)';
      setTimeout(() => { item.style.transform = ''; }, 150);
    });
  });

});
