(function () {
  const now = new Date();
  const timeOfDay = now.getHours() < 12 ? 'morning' : now.getHours() < 17 ? 'afternoon' : 'evening';
  const timeLabel = document.getElementById('timeOfDay');
  const dateLabel = document.getElementById('topbarDate');

  if (timeLabel) {
    timeLabel.textContent = timeOfDay;
  }

  if (dateLabel) {
    dateLabel.textContent = now.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
})();

document.querySelectorAll('.nav-item').forEach((item) => {
  item.addEventListener('click', () => {
    const page = item.dataset.page;
    if (page) {
      window.location.href = page;
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
