/* JavaScript for dynamic form display with tabs */
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const forms = document.querySelectorAll('.book-form');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-service');

            // Update tab buttons
            tabButtons.forEach(btn => btn.classList.remove('is-active'));
            button.classList.add('is-active');

            // Show the correct form
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

const petTypeSelect = document.getElementById('vaccinePet');
const petAgeInput = document.getElementById('petAge');
const recommendedList = document.getElementById('recommendedVaccines');

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

function updateVaccineList() {
  const type = petTypeSelect.value;
  const age = parseInt(petAgeInput.value, 10);

  if (!type || isNaN(age)) {
    recommendedList.innerHTML = '<li class="list-group-item">Select pet type and age to see recommendations.</li>';
    return;
  }

  const vaccines = getRecommendedVaccines(type, age);
  recommendedList.innerHTML = vaccines
    .map(v => `<li class="list-group-item">${v}</li>`)
    .join('');
}

petTypeSelect.addEventListener('change', updateVaccineList);
petAgeInput.addEventListener('input', updateVaccineList);





