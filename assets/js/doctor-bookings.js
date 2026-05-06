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

const tabUpcoming = document.getElementById('tabUpcoming');
const tabCompleted = document.getElementById('tabCompleted');
const upcomingView = document.getElementById('upcomingView');
const completedView = document.getElementById('completedView');

tabUpcoming?.addEventListener('click', () => {
  tabUpcoming.classList.add('active');
  tabCompleted?.classList.remove('active');
  if (upcomingView) upcomingView.style.display = 'block';
  if (completedView) completedView.style.display = 'none';
});

tabCompleted?.addEventListener('click', () => {
  tabCompleted.classList.add('active');
  tabUpcoming?.classList.remove('active');
  if (completedView) completedView.style.display = 'block';
  if (upcomingView) upcomingView.style.display = 'none';
});

document.querySelectorAll('.bc-btn').forEach((button) => {
  button.addEventListener('click', function () {
    this.style.transform = 'scale(0.97)';
    setTimeout(() => {
      this.style.transform = '';
    }, 150);
  });
});
