/**
 * Main JS for Pet Services Website
 * - Tab switching
 * - Grooming form validation
 * - Health checkup form validation
 * - Vaccine recommendation and booking
 * - Flatpickr initialization
 * 
 * Refactored for robustness and maintainability.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Tab Switching ---
  const tabButtons = document.querySelectorAll('.tab-button');
  const forms = {
    vaccine: document.getElementById('form-vaccine'),
    grooming: document.getElementById('form-grooming'),
    checkup: document.getElementById('form-checkup')
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const service = button.getAttribute('data-service');
      Object.values(forms).forEach(form => {
        if (form) form.classList.add('d-none');
      });
      tabButtons.forEach(btn => btn.classList.remove('is-active'));
      if (forms[service]) forms[service].classList.remove('d-none');
      button.classList.add('is-active');
    });
  });

  // --- Grooming Form Validation ---
  const groomingForm = document.getElementById('form-grooming');
  if (groomingForm) {
    const groomingPetType = document.getElementById('groomPetType');
    const groomingService = document.getElementById('groomService');
    const groomingAppointment = document.getElementById('appointment-grooming');
    const groomingConfirmation = document.getElementById('groomingConfirmation');

    groomingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (groomingConfirmation) groomingConfirmation.classList.add('d-none');

      const petType = groomingPetType ? groomingPetType.value : "";
      const service = groomingService ? groomingService.value : "";
      const appointmentValue = groomingAppointment ? groomingAppointment.value : "";
      const appointmentDate = new Date(appointmentValue);
      const now = new Date();

      // Validation
      if (!petType || petType === "Select") {
        if (groomingConfirmation) {
          groomingConfirmation.textContent = "❗ Please select a pet type.";
          groomingConfirmation.className = "alert alert-danger mt-3";
          groomingConfirmation.classList.remove('d-none');
        }
        return;
      }
      if (!service) {
        if (groomingConfirmation) {
          groomingConfirmation.textContent = "❗ Please select a grooming service.";
          groomingConfirmation.className = "alert alert-danger mt-3";
          groomingConfirmation.classList.remove('d-none');
        }
        return;
      }
      if (!appointmentValue || appointmentDate <= now) {
        if (groomingConfirmation) {
          groomingConfirmation.textContent = "❗ Please choose a future appointment time.";
          groomingConfirmation.className = "alert alert-danger mt-3";
          groomingConfirmation.classList.remove('d-none');
        }
        return;
      }

      // All good – show confirmation
      if (groomingConfirmation) {
        groomingConfirmation.innerHTML = `
          ✅ <strong>Appointment booked!</strong><br>
          Pet: ${petType}<br>
          Service: ${service}<br>
          Appointment: ${appointmentDate.toLocaleString()}
        `;
        groomingConfirmation.className = "alert alert-success mt-3";
        groomingConfirmation.classList.remove('d-none');
      }

      groomingForm.reset();
    });
  }

  // --- Health Checkup Form Validation ---
  const checkupForm = document.getElementById('form-checkup');
  if (checkupForm) {
    const checkupPetType = document.getElementById('checkupPet');
    const checkupAppointment = document.getElementById('appointment-checkup');
    const checkupSymptoms = document.getElementById('symptoms');
    const checkupConfirmation = document.getElementById('checkupConfirmation');

    checkupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (checkupConfirmation) checkupConfirmation.classList.add('d-none');

      const petType = checkupPetType ? checkupPetType.value : "";
      const appointmentValue = checkupAppointment ? checkupAppointment.value : "";
      const appointmentDate = new Date(appointmentValue);
      const now = new Date();
      const symptoms = checkupSymptoms ? checkupSymptoms.value.trim() : "";

      // Validation
      if (!petType || petType === "Select") {
        if (checkupConfirmation) {
          checkupConfirmation.textContent = "❗ Please select a pet type.";
          checkupConfirmation.className = "alert alert-danger mt-3";
          checkupConfirmation.classList.remove('d-none');
        }
        return;
      }
      if (!appointmentValue || appointmentDate <= now) {
        if (checkupConfirmation) {
          checkupConfirmation.textContent = "❗ Please choose a future appointment time.";
          checkupConfirmation.className = "alert alert-danger mt-3";
          checkupConfirmation.classList.remove('d-none');
        }
        return;
      }

      // All good – show confirmation
      if (checkupConfirmation) {
        checkupConfirmation.innerHTML = `
          ✅ <strong>Appointment booked!</strong><br>
          Pet: ${petType}<br>
          ${symptoms ? `Symptoms: ${symptoms}<br>` : ''}
          Appointment: ${appointmentDate.toLocaleString()}
        `;
        checkupConfirmation.className = "alert alert-success mt-3";
        checkupConfirmation.classList.remove('d-none');
      }

      checkupForm.reset();
    });
  }

  // --- Vaccine Form Logic ---
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
    const type = petTypeSelect ? petTypeSelect.value : "";
    const ageValue = petAgeInput ? parseFloat(petAgeInput.value) : NaN;
    const unit = ageUnitSelect ? ageUnitSelect.value : "months";

    if (!type || isNaN(ageValue)) {
      if (recommendedList) recommendedList.innerHTML = '<li class="list-group-item">Select pet type and age to see recommendations.</li>';
      if (vaccineOptionsWrapper) vaccineOptionsWrapper.classList.add('d-none');
      if (appointmentWrapper) appointmentWrapper.classList.add('d-none');
      return;
    }

    const ageInMonths = unit === 'years' ? ageValue * 12 : ageValue;
    const vaccines = getRecommendedVaccines(type, ageInMonths);

    if (recommendedList) {
      recommendedList.innerHTML = vaccines
        .map(v => `<li class="list-group-item">${v}</li>`)
        .join('');
    }

    if (vaccineOptions) {
      vaccineOptions.innerHTML = vaccines.map(v => `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" name="vaccines" value="${v}" id="vaccine-${v}">
          <label class="form-check-label" for="vaccine-${v}">${v}</label>
        </div>
      `).join('');
    }

    if (vaccineOptionsWrapper) vaccineOptionsWrapper.classList.remove('d-none');
    if (appointmentWrapper) appointmentWrapper.classList.remove('d-none');
    if (confirmation) confirmation.classList.add('d-none');
  }

  if (petTypeSelect) petTypeSelect.addEventListener('change', updateVaccineList);
  if (petAgeInput) petAgeInput.addEventListener('input', updateVaccineList);
  if (ageUnitSelect) ageUnitSelect.addEventListener('change', updateVaccineList);

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (confirmation) confirmation.classList.add('d-none');

      const selectedPet = petTypeSelect ? petTypeSelect.value : "";
      const age = petAgeInput ? parseFloat(petAgeInput.value) : NaN;
      const ageUnit = ageUnitSelect ? ageUnitSelect.value : "months";
      const selectedTime = appointmentInput ? new Date(appointmentInput.value) : null;
      const now = new Date();

      const selectedVaccines = Array.from(
        document.querySelectorAll('input[name="vaccines"]:checked')
      ).map(cb => cb.value);

      // Validation
      if (!selectedPet || isNaN(age)) {
        if (confirmation) {
          confirmation.textContent = "❗ Please fill out pet type and age.";
          confirmation.className = "alert alert-danger mt-3";
          confirmation.classList.remove('d-none');
        }
        return;
      }

      if (selectedVaccines.length === 0) {
        if (confirmation) {
          confirmation.textContent = "❗ Please select at least one vaccine.";
          confirmation.className = "alert alert-warning mt-3";
          confirmation.classList.remove('d-none');
        }
        return;
      }

      if (!appointmentInput || !appointmentInput.value || !selectedTime || selectedTime <= now) {
        if (confirmation) {
          confirmation.textContent = "❗ Please choose a future appointment time.";
          confirmation.className = "alert alert-danger mt-3";
          confirmation.classList.remove('d-none');
        }
        return;
      }

      // All good – show confirmation
      if (confirmation) {
        confirmation.innerHTML = `
          ✅ <strong>Appointment booked!</strong><br>
          Pet: ${selectedPet}<br>
          Age: ${age} ${ageUnit}<br>
          Vaccines: ${selectedVaccines.join(', ')}<br>
          Appointment: ${selectedTime.toLocaleString()}
        `;
        confirmation.className = "alert alert-success mt-3";
        confirmation.classList.remove('d-none');
      }

      // Reset form
      form.reset();
      if (recommendedList) recommendedList.innerHTML = '<li class="list-group-item">Select pet type and age to see recommendations.</li>';
      if (vaccineOptionsWrapper) vaccineOptionsWrapper.classList.add('d-none');
      if (appointmentWrapper) appointmentWrapper.classList.add('d-none');
    });
  }

  // --- Flatpickr for all services ---
  if (window.flatpickr) {
    if (document.getElementById('appointment-vaccine')) {
      flatpickr("#appointment-vaccine", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: "today",
        time_24hr: true
      });
    }
    if (document.getElementById('appointment-grooming')) {
      flatpickr("#appointment-grooming", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: "today",
        time_24hr: true
      });
    }
    if (document.getElementById('appointment-checkup')) {
      flatpickr("#appointment-checkup", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: "today",
        time_24hr: true
      });
    }
  }
});