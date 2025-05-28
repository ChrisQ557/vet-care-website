/*  JavaScript for dynamic form display with tabs */
document.addEventListener('DOMContentLoaded', () => {
  // Get all tab buttons and form sections
  const tabButtons = document.querySelectorAll('.tab-button');
  const forms = document.querySelectorAll('.book-form');

  // Add click event listener to each tab button
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-service'); // Identify which tab was clicked

      // Remove active class from all buttons and add it to the clicked one
      tabButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      // Show the correct form and hide others
      forms.forEach(form => {
        if (form.id === `form-${target}`) {
          form.classList.remove('d-none');
        } else {
          form.classList.add('d-none');
        }
      });
    });
  });
});

/* Vaccines Recommendation Logic */

// Get form elements
const petTypeSelect = document.getElementById('vaccinePet');
const petAgeInput = document.getElementById('petAge');
const recommendedList = document.getElementById('recommendedVaccines');

/**
 * Get a list of recommended vaccines based on the pet type and age.
 *
 * @param {string} type - Type of pet ('dog' or 'cat').
 * @param {number} age - Age of the pet in months.
 * @returns {string[]} - Array of recommended vaccines.
 */
function getRecommendedVaccines(type, age) {
  if (type === 'dog') {
    if (age < 4) return ['Distemper', 'Parvovirus'];
    if (age < 12) return ['Rabies', 'Leptospirosis'];
    return ['Booster shots', 'Bordetella'];
  } else if (type === 'cat') {
    if (age < 4) return ['FVRCP'];
    if (age < 12) return ['Rabies'];
    return ['Feline Leukemia', 'Booster shots'];
  }
  return [];
}

/**
 * Update the list of recommended vaccines in the DOM
 * based on the currently selected pet type and age.
 */
function updateVaccineList() {
  const type = petTypeSelect.value;
  const age = parseInt(petAgeInput.value, 10);

  // If no type or invalid age, prompt the user
  if (!type || isNaN(age)) {
    recommendedList.innerHTML = '<li class="list-group-item">Select pet type and age to see recommendations.</li>';
    return;
  }

  // Get vaccine recommendations and update the DOM
  const vaccines = getRecommendedVaccines(type, age);
  recommendedList.innerHTML = vaccines
    .map(v => `<li class="list-group-item">${v}</li>`)
    .join('');
}

// Attach event listeners to form inputs
petTypeSelect.addEventListener('change', updateVaccineList);
petAgeInput.addEventListener('input', updateVaccineList);
