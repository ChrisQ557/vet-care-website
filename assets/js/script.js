/**
 * Vet Care Website Main JS
 * - Tab switching
 * - Form validation
 * - Vaccine recommendation
 * - Flatpickr
 * - Sign-in modal logic
 * - Booking restriction based on authentication
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
      // Hide all forms
      Object.values(forms).forEach(form => {
        if (form) form.classList.add('d-none');
      });
      // Show the selected form
      if (forms[service]) {
        forms[service].classList.remove('d-none');
        // Remove is-active from all tab-buttons in the shown form
        const localTabs = forms[service].querySelectorAll('.tab-button');
        localTabs.forEach(btn => btn.classList.remove('is-active'));
        // Add is-active to the correct tab in the shown form
        const activeTab = forms[service].querySelector('.tab-button[data-service="' + service + '"]');
        if (activeTab) activeTab.classList.add('is-active');
      }
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
  const appointmentInput = document.getElementById('appointment-vaccine');
  const confirmation = document.getElementById('confirmationMessage');
  const vaccineForm = document.getElementById('form-vaccine');

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
    if (confirmation) confirmation.classList.add('d-none');
  }

  if (petTypeSelect) petTypeSelect.addEventListener('change', updateVaccineList);
  if (petAgeInput) petAgeInput.addEventListener('input', updateVaccineList);
  if (ageUnitSelect) ageUnitSelect.addEventListener('change', updateVaccineList);

  if (vaccineForm) {
    vaccineForm.addEventListener('submit', e => {
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
      vaccineForm.reset();
      if (recommendedList) recommendedList.innerHTML = '<li class="list-group-item">Select pet type and age to see recommendations.</li>';
      if (vaccineOptionsWrapper) vaccineOptionsWrapper.classList.add('d-none');
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

  // --- SIGN IN MODAL LOGIC ---
  const signInForm = document.getElementById('form-signin');
  const signInEmail = document.getElementById('signinEmail');
  const signInPassword = document.getElementById('signinPassword');
  const signInMessage = document.getElementById('signinMessage');
  const signInModalEl = document.getElementById('signInModal');
  // Micromodal is used for modal logic. No Bootstrap modal logic here.

  if (signInForm) {
    signInForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (signInMessage) signInMessage.classList.add('d-none');
      const email = signInEmail.value.trim();
      const password = signInPassword.value;

      // Simple validation
      if (!email || !validateEmail(email)) {
        showSignInMessage('Please enter a valid email address.', 'danger');
        return;
      }
      if (!password) {
        showSignInMessage('Please enter your password.', 'danger');
        return;
      }

      // For demo: accept any email/password (replace with real backend check)
      showSignInMessage('✅ Sign in successful!', 'success');
      // Set authentication state
      localStorage.setItem('isAuthenticated', 'true');
      // Update booking forms' auth state
      if (typeof updateBookingFormsAuthState === 'function') {
        updateBookingFormsAuthState();
      }
      // Hide modal and reset form (Micromodal)
      if (window.MicroModal) MicroModal.close('signInModal');
      signInForm.reset();
      if (signInMessage) signInMessage.classList.add('d-none');
    });
  }

  function showSignInMessage(msg, type) {
    if (signInMessage) {
      signInMessage.textContent = msg;
      signInMessage.className = `alert alert-${type} mt-3`;
      signInMessage.classList.remove('d-none');
    }
  }

  function validateEmail(email) {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // --- Booking Auth State ---
  function updateBookingFormsAuthState() {
    document.querySelectorAll('.book-form').forEach(form => {
      const authMsg = form.querySelector('.bookingAuthMessage');
      const submitBtn = form.querySelector('button[type="submit"]');
      if (!authMsg || !submitBtn) return;

      if (!isUserAuthenticated()) {
        authMsg.classList.remove('d-none');
        submitBtn.disabled = true;
      } else {
        authMsg.classList.add('d-none');
        submitBtn.disabled = false;
      }
    });
    updateAuthButtons();
  }
  window.updateBookingFormsAuthState = updateBookingFormsAuthState;
  updateBookingFormsAuthState();

  // --- Auth Button Logic ---
  function updateAuthButtons() {
    document.querySelectorAll('.authButton').forEach(btn => {
      if (isUserAuthenticated()) {
        btn.textContent = 'Sign Out';
        btn.classList.remove('btn-outline-secondary');
        btn.classList.add('btn-danger');
        btn.removeAttribute('data-bs-toggle');
        btn.removeAttribute('data-bs-target');
        btn.onclick = function (e) {
          e.preventDefault();
          signOutUser();
        };
      } else {
        btn.textContent = 'Sign In';
        btn.classList.remove('btn-danger');
        btn.classList.add('btn-outline-secondary');
        // btn.setAttribute('data-bs-toggle', 'modal'); // Removed for Micromodal compatibility
        // btn.setAttribute('data-bs-target', '#signInModal'); // Removed for Micromodal compatibility
        btn.onclick = function (e) {
          if (btn.textContent.trim() === 'Sign In') {
            e.preventDefault();
            if (window.MicroModal) MicroModal.show('signInModal');
          }
        };
      }
    });
  }

  // --- Sign Out Logic ---
  function signOutUser() {
    // Remove authentication state
    localStorage.removeItem('isAuthenticated');
    // Hide modal if open
    if (window.MicroModal) MicroModal.close('signInModal');
    // Update UI
    updateBookingFormsAuthState();
    // Optionally, show a message or reload
    window.dispatchEvent(new Event('userSignedOut'));
  }

  // Listen for custom sign out event
  window.addEventListener('userSignedOut', updateBookingFormsAuthState);

  // --- Sign In Modal from Booking Message ---
  document.querySelectorAll('.openSignIn').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.MicroModal) {
        MicroModal.show('signInModal');
      }
    });
  });

});