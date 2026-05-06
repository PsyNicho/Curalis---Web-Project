document.addEventListener("DOMContentLoaded", () => {

  //  Nav 
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (item.dataset.page) window.location.href = item.dataset.page;
    });
  });

  //  Profile menu 
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

  //  Tab toggle: Upcoming / Completed 
  const tabUpcoming  = document.getElementById('tabUpcoming');
  const tabCompleted = document.getElementById('tabCompleted');
  const upcomingView  = document.getElementById('upcomingView');
  const completedView = document.getElementById('completedView');

  tabUpcoming.addEventListener('click', () => {
    tabUpcoming.classList.add('active');
    tabCompleted.classList.remove('active');
    upcomingView.style.display  = 'block';
    completedView.style.display = 'none';
  });

  tabCompleted.addEventListener('click', () => {
    tabCompleted.classList.add('active');
    tabUpcoming.classList.remove('active');
    completedView.style.display = 'block';
    upcomingView.style.display  = 'none';
  });

  //  Booking card button effects 
  document.querySelectorAll('.bc-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => { this.style.transform = ''; }, 150);
    });
  });

  //  Emoji rating selection 
  document.querySelectorAll('.emoji-row').forEach(row => {
    row.querySelectorAll('.emoji-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Deselect all in this row, select clicked
        row.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  });

  //  Cancel booking confirmation 
  document.querySelectorAll('.bc-btn.cancel').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Are you sure you want to cancel this booking?')) {
        const card = btn.closest('.booking-card');
        card.style.opacity = '0';
        card.style.transform = 'scale(0.97)';
        card.style.transition = 'opacity .3s, transform .3s';
        setTimeout(() => { card.remove(); }, 300);
      }
    });
  });

  //  Reschedule (placeholder) 
  document.querySelectorAll('.bc-btn.outline').forEach(btn => {
    if (btn.textContent.trim() === 'Reschedule') {
      btn.addEventListener('click', () => {
        alert('Rescheduling coming soon.');
      });
    }
  });

});
