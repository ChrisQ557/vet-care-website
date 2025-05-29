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

      Object.values(forms).forEach(form => form.classList.add('d-none'));
      tabButtons.forEach(btn => btn.classList.remove('is-active'));

      forms[service].classList.remove('d-none');
      button.classList.add('is-active');
    // Grooming form validation
  const groomingForm = document.getElementById('form-grooming');
  const groomingPetType = document.getElementById('groomPetType');
  const groomingService = document.getElementById('groomService');
  const groomingAppointment = document.getElementById('appointment-grooming');
  const groomingConfirmation = document.getElementById('groomingConfirmation');

  groomingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    groomingConfirmation.classList.add('d-none');

    const petType = groomingPetType.value;
    const service = groomingService.value;
    const appointmentValue = groomingAppointment.value;
    const appointmentDate = new Date(appointmentValue);
    const now = new Date();

    // Validation
    if (!petType) {
      groomingConfirmation.textContent = "❗ Please select a pet type.";
      groomingConfirmation.className = "alert alert-danger mt-3";
      groomingConfirmation.classList.remove('d-none');
      return;
    }
    if (!service) {
      groomingConfirmation.textContent = "❗ Please select a grooming service.";
      groomingConfirmation.className = "alert alert-danger mt-3";
      groomingConfirmation.classList.remove('d-none');
      return;
    }
    if (!appointmentValue || appointmentDate <= now) {
      groomingConfirmation.textContent = "❗ Please choose a future appointment time.";
      groomingConfirmation.className = "alert alert-danger mt-3";
      groomingConfirmation.classList.remove('d-none');
      return;
    }

    // All good – show confirmation
    groomingConfirmation.innerHTML = `
      ✅ <strong>Appointment booked!</strong><br>
      Pet: ${petType}<br>
      Service: ${service}<br>
      Appointment: ${appointmentDate.toLocaleString()}
    `;
    groomingConfirmation.className = "alert alert-success mt-3";
    groomingConfirmation.classList.remove('d-none');

    groomingForm.reset();
  });

});
  });

  // Vaccine form logic
  const petTypeSelect = document.getElementById('vaccinePet');
  const petAgeInput = document.getElementById('petAge');
  const ageUnitSelect = document.getElementById('ageUnit');
  const recommendedList = document.getElementById('recommendedVaccines');
  const vaccineOptionsWrapper = document.getElementById('vaccineOptionsWrapper');
  const vaccineOptions = document.getElementById('vaccineOptions');
  const appointmentWrapper = document.getElementById('appointmentWrapper');
  const appointmentInput = document.getElementById('appointment-vaccine');
  const confirmation = document.getElementById('confirmationMessage');
  const form = document.getElementById('form-vaccine');

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

  function updateVaccineList() {
    const type = petTypeSelect.value;
    const ageValue = parseFloat(petAgeInput.value);
    const unit = ageUnitSelect.value;

    if (!type || isNaN(ageValue)) {
      recommendedList.innerHTML = '<li class="list-group-item">Select pet type and age to see recommendations.</li>';
      vaccineOptionsWrapper.classList.add('d-none');
      appointmentWrapper.classList.add('d-none');
      return;
    }

    const ageInMonths = unit === 'years' ? ageValue * 12 : ageValue;
    const vaccines = getRecommendedVaccines(type, ageInMonths);

    recommendedList.innerHTML = vaccines
      .map(v => `<li class="list-group-item">${v}</li>`)
      .join('');

    vaccineOptions.innerHTML = vaccines.map(v => `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="vaccines" value="${v}" id="vaccine-${v}">
        <label class="form-check-label" for="vaccine-${v}">${v}</label>
      </div>
    `).join('');

    vaccineOptionsWrapper.classList.remove('d-none');
    appointmentWrapper.classList.remove('d-none');
    confirmation.classList.add('d-none');
  }

  petTypeSelect.addEventListener('change', updateVaccineList);
  petAgeInput.addEventListener('input', updateVaccineList);
  ageUnitSelect.addEventListener('change', updateVaccineList);

  form.addEventListener('submit', e => {
    e.preventDefault();
    confirmation.classList.add('d-none');

    const selectedPet = petTypeSelect.value;
    const age = parseFloat(petAgeInput.value);
    const ageUnit = ageUnitSelect.value;
    const selectedTime = new Date(appointmentInput.value);
    const now = new Date();

    const selectedVaccines = Array.from(
      document.querySelectorAll('input[name="vaccines"]:checked')
    ).map(cb => cb.value);

    // Validation
    if (!selectedPet || isNaN(age)) {
      confirmation.textContent = "❗ Please fill out pet type and age.";
      confirmation.className = "alert alert-danger mt-3";
      confirmation.classList.remove('d-none');
      return;
    }

    if (selectedVaccines.length === 0) {
      confirmation.textContent = "❗ Please select at least one vaccine.";
      confirmation.className = "alert alert-warning mt-3";
      confirmation.classList.remove('d-none');
      return;
    }

    if (!appointmentInput.value || selectedTime <= now) {
      confirmation.textContent = "❗ Please choose a future appointment time.";
      confirmation.className = "alert alert-danger mt-3";
      confirmation.classList.remove('d-none');
      return;
    }

    // All good – show confirmation
    confirmation.innerHTML = `
      ✅ <strong>Appointment booked!</strong><br>
      Pet: ${selectedPet}<br>
      Age: ${age} ${ageUnit}<br>
      Vaccines: ${selectedVaccines.join(', ')}<br>
      Appointment: ${selectedTime.toLocaleString()}
    `;
    confirmation.className = "alert alert-success mt-3";
    confirmation.classList.remove('d-none');

    // Reset form
    form.reset();
    recommendedList.innerHTML = '<li class="list-group-item">Select pet type and age to see recommendations.</li>';
    vaccineOptionsWrapper.classList.add('d-none');
    appointmentWrapper.classList.add('d-none');
  });

  // Flatpickr for all services
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
});

