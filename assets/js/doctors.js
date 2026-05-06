document.addEventListener("DOMContentLoaded", () => {

//  Doctor data 
const available = [
  { id: 1, initials: 'JS', name: 'Dr. Janak Shah',    specialty: 'Cardiologist',  exp: 12, rating: 4.9, tags: ['Heart Disease', 'Hypertension'], price: 60 },
  { id: 2, initials: 'SR', name: 'Dr. Sarah Rashid',  specialty: 'Neurologist',   exp: 9,  rating: 4.7, tags: ['Migraine'],                       price: 95 },
  { id: 3, initials: 'AJ', name: 'Dr. Arjun Kumar',   specialty: 'Dermatologist', exp: 9,  rating: 4.8, tags: ['Psoriasis', 'Eczema'],             price: 65 },
  { id: 4, initials: 'RN', name: 'Dr. Riya Nair',     specialty: 'Dentist',       exp: 4,  rating: 4.8, tags: ['General dental'],                  price: 50 },
  { id: 8, initials: 'AP', name: 'Dr. Anita Pandey',  specialty: 'Pediatrician',  exp: 6,  rating: 4.8, tags: ['Child nutrition', 'Immunization'],  price: 70 },
];

const top = [
  { id: 1, initials: 'JS', name: 'Dr. Janak Shah',    specialty: 'Cardiologist',  exp: 12, rating: 4.9, tags: ['Heart Disease', 'Hypertension'],   price: 60 },
  { id: 5, initials: 'AK', name: 'Apurva K.C',        specialty: 'Pediatrician',  exp: 5,  rating: 4.9, tags: ['Vaccines', 'Nutrition'],            price: 75 },
  { id: 6, initials: 'RT', name: 'Dr. Rohan Thapa',   specialty: 'Cardiologist',  exp: 3,  rating: 5,   tags: ['Heart failure', 'Arrhythmia'],      price: 50 },
  { id: 7, initials: 'KM', name: 'Dr. Khushi Magar',  specialty: 'Orthopedist',   exp: 8,  rating: 5,   tags: ['Arthritis', 'Osteoporosis'],        price: 80 },
];

// All unique doctors (deduplicated by id) for filtered view
const allDoctors = [...available];
top.forEach(doc => {
  if (!allDoctors.find(d => d.id === doc.id)) allDoctors.push(doc);
});

//  State 
let filters    = { specialty: 'all', maxPrice: 100, minExp: 0 };
let searchQuery = '';

function isFiltered() {
  return filters.specialty !== 'all'
      || filters.maxPrice < 100
      || filters.minExp > 0
      || searchQuery.trim() !== '';
}

//  Build card 
function buildCard(doc) {
  const card = document.createElement('div');
  card.className = 'doc-card';
  card.innerHTML = `
    <div class="doc-top">
      <div class="doc-avatar">${doc.initials}</div>
      <div class="doc-info">
        <h3>${doc.name}</h3>
        <p class="doc-spec">${doc.specialty}</p>
        <p class="doc-exp">${doc.exp} yrs exp</p>
      </div>
      <div class="doc-rating">&#9733;${doc.rating}</div>
    </div>
    <div class="doc-tags">
      ${doc.tags.map(t => `<span class="doc-tag">${t}</span>`).join('')}
    </div>
    <div class="doc-bottom">
      <p class="doc-price">$${doc.price} <span>/ session</span></p>
      <a href="detail.html" class="book-btn">Book Now</a>
    </div>
  `;
  return card;
}

//  Match filter + search 
function matches(doc) {
  if (filters.specialty !== 'all' && doc.specialty !== filters.specialty) return false;
  if (doc.price > filters.maxPrice) return false;
  if (doc.exp < filters.minExp) return false;
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    const inName = doc.name.toLowerCase().includes(q);
    const inSpec = doc.specialty.toLowerCase().includes(q);
    const inTags = doc.tags.some(t => t.toLowerCase().includes(q));
    if (!inName && !inSpec && !inTags) return false;
  }
  return true;
}

const defaultView  = document.getElementById('defaultView');
const filteredView = document.getElementById('filteredView');
const filteredGrid = document.getElementById('filteredGrid');
const filteredEmpty= document.getElementById('filteredEmpty');
const availGrid    = document.getElementById('availableGrid');
const topGrid      = document.getElementById('topGrid');

function render() {
  if (isFiltered()) {
    // Switch to merged filtered view
    defaultView.style.display  = 'none';
    filteredView.style.display = 'block';
    filteredGrid.innerHTML = '';

    const results = allDoctors.filter(matches);
    results.forEach(doc => filteredGrid.appendChild(buildCard(doc)));
    filteredEmpty.style.display = results.length === 0 ? 'block' : 'none';
  } else {
    // Back to default two-section view
    defaultView.style.display  = 'block';
    filteredView.style.display = 'none';
    availGrid.innerHTML = '';
    topGrid.innerHTML   = '';
    available.forEach(doc => availGrid.appendChild(buildCard(doc)));
    top.forEach(doc      => topGrid.appendChild(buildCard(doc)));
  }
}

//  Search input 
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value;
  render();
});

//  Filter panel toggle 
const filterBtn   = document.getElementById('filterBtn');
const filterPanel = document.getElementById('filterPanel');

filterBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  filterPanel.classList.toggle('open');
});
document.addEventListener('click', (e) => {
  if (!filterPanel.contains(e.target) && e.target !== filterBtn) {
    filterPanel.classList.remove('open');
  }
});

//  Specialty chips 
document.querySelectorAll('.chip[data-filter="specialty"]').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip[data-filter="specialty"]')
      .forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    filters.specialty = chip.dataset.value;
    render();
  });
});

//  Price slider 
const priceRange = document.getElementById('priceRange');
const priceVal   = document.getElementById('priceVal');
priceRange.addEventListener('input', () => {
  filters.maxPrice = parseInt(priceRange.value);
  priceVal.textContent = `$${priceRange.value}`;
  render();
});

//  Experience slider 
const expRange = document.getElementById('expRange');
const expVal   = document.getElementById('expVal');
expRange.addEventListener('input', () => {
  filters.minExp = parseInt(expRange.value);
  expVal.textContent = `${expRange.value} yrs`;
  render();
});

//  Clear all 
document.getElementById('clearFilters').addEventListener('click', () => {
  filters      = { specialty: 'all', maxPrice: 100, minExp: 0 };
  searchQuery  = '';
  searchInput.value    = '';
  priceRange.value     = 100;
  expRange.value       = 0;
  priceVal.textContent = '$100';
  expVal.textContent   = '0 yrs';
  document.querySelectorAll('.chip[data-filter="specialty"]')
    .forEach(c => c.classList.remove('active'));
  document.querySelector('.chip[data-value="all"]').classList.add('active');
  render();
});

//  Nav 
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    if (item.dataset.page) window.location.href = item.dataset.page;
  });
});

//  Profile menu 
const profilePic  = document.getElementById('profilePic');
const profileMenu = document.getElementById('profileMenu');

profilePic.addEventListener('click', (e) => {
  e.stopPropagation();
  profileMenu.classList.toggle('open');
});
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
document.getElementById('btnEditCard').addEventListener('click', () => {
  profileMenu.classList.remove('open');
});

//  Initial render 
render();

}); // end DOMContentLoaded
