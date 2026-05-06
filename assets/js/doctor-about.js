document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', () => {
      if (item.dataset.page) {
        window.location.href = item.dataset.page;
      }
    });
  });

  const profilePic = document.getElementById('profilePic');
  const profileMenu = document.getElementById('profileMenu');

  profilePic?.addEventListener('click', (event) => {
    event.stopPropagation();
    profileMenu?.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    profileMenu?.classList.remove('open');
  });

  profileMenu?.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  document.getElementById('btnAvailability')?.addEventListener('click', () => {
    alert('Availability controls can be connected here.');
  });

  document.getElementById('btnMessages')?.addEventListener('click', () => {
    alert('Patient messages can be surfaced here.');
  });

  document.getElementById('btnLogout')?.addEventListener('click', () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = 'index.html';
  });

  const statNums = document.querySelectorAll('.stat-num, .ssb-num, .ss-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statNums.forEach((element) => observer.observe(element));
});
