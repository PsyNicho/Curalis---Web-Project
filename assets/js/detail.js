document.addEventListener("DOMContentLoaded", () => {

  //Nav 
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => { if (item.dataset.page) window.location.href = item.dataset.page; });
  });

  //Profile menu 
  const profilePic  = document.getElementById('profilePic');
  const profileMenu = document.getElementById('profileMenu');
  profilePic.addEventListener('click', (e) => { e.stopPropagation(); profileMenu.classList.toggle('open'); });
  document.addEventListener('click', () => profileMenu.classList.remove('open'));
  profileMenu.addEventListener('click', e => e.stopPropagation());
  document.getElementById('btnLogout').addEventListener('click', () => { sessionStorage.clear(); localStorage.clear(); window.location.href = 'index.html'; });
  document.getElementById('btnLanguages').addEventListener('click', () => { profileMenu.classList.remove('open'); alert('Language selection coming soon.'); });
  document.getElementById('btnEditCard').addEventListener('click', () => profileMenu.classList.remove('open'));

  //Modal
  const overlay    = document.getElementById('modalOverlay');
  const step1el    = document.getElementById('step1');
  const step2el    = document.getElementById('step2');
  const step3el    = document.getElementById('step3');
  const confirmScr = document.getElementById('confirmScreen');

  //Step indicators
  const s1ind  = document.getElementById('step1ind');
  const s2ind  = document.getElementById('step2ind');
  const s3ind  = document.getElementById('step3ind');
  const line1  = document.getElementById('line1');
  const line2  = document.getElementById('line2');

  //State
  let selectedType    = null;
  let selectedTypeSub = null;
  let selectedDate    = null;
  let selectedSlot    = null;

  //Step indicator helper 
  function setStep(n) {
    [s1ind, s2ind, s3ind].forEach((s, i) => {
      s.classList.remove('active', 'done');
      if (i + 1 < n)  s.classList.add('done');
      if (i + 1 === n) s.classList.add('active');
    });
    line1.classList.toggle('done', n > 1);
    line2.classList.toggle('done', n > 2);

    step1el.style.display    = n === 1 ? 'flex' : 'none';
    step2el.style.display    = n === 2 ? 'flex' : 'none';
    step3el.style.display    = n === 3 ? 'flex' : 'none';
    confirmScr.style.display = 'none';

    if (n === 1) { step1el.style.flexDirection = 'column'; step1el.style.gap = '16px'; }
    if (n === 2) { step2el.style.flexDirection = 'column'; step2el.style.gap = '12px'; }
    if (n === 3) { step3el.style.flexDirection = 'column'; step3el.style.gap = '16px'; }
  }

  //Open / close 
  function openModal() {
    selectedType = null; selectedTypeSub = null;
    selectedDate = null; selectedSlot    = null;

    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('selected'));
    document.getElementById('typeSummary').style.display = 'none';
    document.getElementById('toStep2Btn').disabled = true;

    overlay.classList.add('open');
    setStep(1);
  }

  function closeModal() { overlay.classList.remove('open'); }

  document.getElementById('openBooking').addEventListener('click', openModal);
  document.getElementById('cancelBtn').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  //Step 1:
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedType    = btn.dataset.type;
      selectedTypeSub = btn.dataset.sub;

      //summary 
      const summary = document.getElementById('typeSummary');
      document.getElementById('ssType').textContent = selectedType;
      document.getElementById('ssSub').textContent  = selectedTypeSub;
      summary.style.display = 'flex';

      document.getElementById('toStep2Btn').disabled = false;
    });
  });

  document.getElementById('toStep2Btn').addEventListener('click', () => {
    buildDateRow();
    setStep(2);
  });

  //Step 2:
  const slotsByDay = {
    0: ['9:00 AM','11:30 AM','3:45 PM'],
    1: ['6:00 AM','9:00 AM','11:30 AM','1:30 PM','3:45 PM','7:00 PM'],
    2: ['6:00 AM','9:00 AM','11:30 AM','1:30 PM','3:45 PM','7:00 PM'],
    3: ['9:00 AM','1:30 PM','7:00 PM'],
    4: ['6:00 AM','11:30 AM','3:45 PM','7:00 PM'],
    5: ['9:00 AM','11:30 AM','1:30 PM'],
    6: ['9:00 AM','3:45 PM'],
  };

  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  function buildDateRow() {
    const dateRow = document.getElementById('dateRow');
    dateRow.innerHTML = '';
    selectedDate = null; selectedSlot = null;

    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const btn = document.createElement('button');
      btn.className = 'date-btn';
      btn.dataset.date = d.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
      btn.dataset.day  = d.getDay();
      btn.innerHTML = `<span class="date-day">${days[d.getDay()]}</span><span class="date-num">${d.getDate()}</span>`;
      btn.addEventListener('click', () => selectDate(btn));
      dateRow.appendChild(btn);
    }

    document.getElementById('slotsPlaceholder').style.display = 'block';
    document.getElementById('slotsGrid').style.display = 'none';
    document.getElementById('toStep3Btn').disabled = true;
  }

  function selectDate(btn) {
    document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedDate = btn.dataset.date;
    selectedSlot = null;

    const slots = slotsByDay[parseInt(btn.dataset.day)] || ['9:00 AM','2:00 PM'];
    const grid  = document.getElementById('slotsGrid');
    grid.innerHTML = '';
    slots.forEach(slot => {
      const s = document.createElement('button');
      s.className   = 'slot-btn';
      s.textContent = slot;
      s.addEventListener('click', () => selectSlot(s, slot));
      grid.appendChild(s);
    });

    document.getElementById('slotsPlaceholder').style.display = 'none';
    grid.style.display = 'grid';
    document.getElementById('toStep3Btn').disabled = true;
  }

  function selectSlot(btn, slot) {
    document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedSlot = slot;
    document.getElementById('toStep3Btn').disabled = false;
  }

  document.getElementById('backToStep1Btn').addEventListener('click', () => setStep(1));

  document.getElementById('toStep3Btn').addEventListener('click', () => {
    document.getElementById('cfType').textContent = selectedType;
    document.getElementById('cfDate').textContent = selectedDate;
    document.getElementById('cfTime').textContent = selectedSlot;
    setStep(3);
  });

  //Step 3:
  document.getElementById('backToStep2Btn').addEventListener('click', () => setStep(2));

  document.getElementById('confirmBtn').addEventListener('click', () => {
    document.getElementById('cfDoctorFinal').textContent = 'Apurva K.C';
    document.getElementById('cfTypeFinal').textContent   = selectedType;
    document.getElementById('cfDateFinal').textContent   = selectedDate;
    document.getElementById('cfTimeFinal').textContent   = selectedSlot;

    // Show all steps as done
    [s1ind, s2ind, s3ind].forEach(s => { s.classList.remove('active'); s.classList.add('done'); });
    line1.classList.add('done'); line2.classList.add('done');

    step3el.style.display    = 'none';
    confirmScr.style.display = 'flex';
    confirmScr.style.flexDirection = 'column';
    confirmScr.style.gap = '20px';
  });

  //  Confirmed actions 
  document.getElementById('doneBtn').addEventListener('click', closeModal);
  document.getElementById('viewBookingBtn').addEventListener('click', () => { window.location.href = 'bookings.html'; });

});