
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const forms = {
    vaccine: document.getElementById('form-vaccine'),
    grooming: document.getElementById('form-grooming'),
    checkup: document.getElementById('form-checkup')
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const service = button.getAttribute('data-service');

      // Hide all forms
      Object.values(forms).forEach(form => form.classList.add('d-none'));

      // Remove active class from all tab buttons
      tabButtons.forEach(btn => btn.classList.remove('is-active'));

      // Show selected form and activate tab
      forms[service].classList.remove('d-none');
      button.classList.add('is-active');
    });
  });
});



// DOM References
const petTypeSelect = document.getElementById('vaccinePet');
const petAgeInput = document.getElementById('petAge');
const ageUnitSelect = document.getElementById('ageUnit');
const recommendedList = document.getElementById('recommendedVaccines');

/**
 * Get a list of recommended vaccines based on the pet type and age in months.
 *
 * @param {string} type - Pet type: "dog" or "cat".
 * @param {number} ageInMonths - Pet's age in months.
 * @returns {string[]} - Recommended vaccine names.
 */
function getRecommendedVaccines(type, ageInMonths) {
  if (type === 'dog') {
    if (ageInMonths < 4) return ['Distemper', 'Parvovirus'];
    if (ageInMonths < 12) return ['Rabies', 'Leptospirosis'];
    return ['Booster shots', 'Bordetella'];
  } else if (type === 'cat') {
    if (ageInMonths < 4) return ['FVRCP'];
    if (ageInMonths < 12) return ['Rabies'];
    return ['Feline Leukemia', 'Booster shots'];
  }
  return [];
}

/**
 * Converts pet age based on selected unit (months or years),
 * and updates the vaccine recommendation list.
 */
function updateVaccineList() {
  const type = petTypeSelect.value;
  const ageValue = parseFloat(petAgeInput.value);
  const unit = ageUnitSelect.value;

  if (!type || isNaN(ageValue)) {
    recommendedList.innerHTML = '<li class="list-group-item">Select pet type and age to see recommendations.</li>';
    return;
  }

  // Convert age to months if unit is years
  const ageInMonths = unit === 'years' ? ageValue * 12 : ageValue;

  const vaccines = getRecommendedVaccines(type, ageInMonths);
  recommendedList.innerHTML = vaccines
    .map(v => `<li class="list-group-item">${v}</li>`)
    .join('');
}

// Event Listeners
petTypeSelect.addEventListener('change', updateVaccineList);
petAgeInput.addEventListener('input', updateVaccineList);
ageUnitSelect.addEventListener('change', updateVaccineList);

// Flatpickr for appointment field (if present)
flatpickr("#appointment-vaccine", {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  minDate: "today",
  time_24hr: true
});
flatpickr("#appointment-grooming", {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  minDate: "today",
  time_24hr: true
});
flatpickr("#appointment-checkup", {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  minDate: "today",
  time_24hr: true
});


