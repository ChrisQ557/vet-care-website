/**
 * Vet Care Website Main JS
 * - Tab switching
 * - Vaccine recommendation
 * - Flatpickr
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
      // Removed duplicate .authButton event handler (handled in auth.js)
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

  // --- Vaccine Form Logic ---
  const petTypeSelect = document.getElementById('vaccinePet');
  const petAgeInput = document.getElementById('petAge');
  const ageUnitSelect = document.getElementById('ageUnit');
  const recommendedList = document.getElementById('recommendedVaccines');
  const vaccineOptionsWrapper = document.getElementById('vaccineOptionsWrapper');
  const vaccineOptions = document.getElementById('vaccineOptions');
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
          <input class="form-check-input vaccine-checkbox" type="checkbox" name="vaccines" value="${v}" id="vaccine-${v}">
          <label class="form-check-label" for="vaccine-${v}">${v}</label>
        </div>
      `).join('');
      // Add event listeners to highlight selected options
      vaccineOptions.querySelectorAll('.vaccine-checkbox').forEach(cb => {
        cb.addEventListener('change', function() {
          const parent = cb.closest('.form-check');
          if (cb.checked) {
            parent.classList.add('selected-vaccine');
          } else {
            parent.classList.remove('selected-vaccine');
          }
        });
        // Set initial highlight if already checked
        const parent = cb.closest('.form-check');
        if (cb.checked) {
          parent.classList.add('selected-vaccine');
        } else {
          parent.classList.remove('selected-vaccine');
        }
      });
    }

    if (vaccineOptionsWrapper) vaccineOptionsWrapper.classList.remove('d-none');
    if (confirmation) confirmation.classList.add('d-none');
  }

  if (petTypeSelect) petTypeSelect.addEventListener('change', updateVaccineList);
  if (petAgeInput) petAgeInput.addEventListener('input', updateVaccineList);
  if (ageUnitSelect) ageUnitSelect.addEventListener('change', updateVaccineList);

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
  }
  window.updateBookingFormsAuthState = updateBookingFormsAuthState;
  updateBookingFormsAuthState();

  // --- Sign In Modal from Booking Message ---
  document.querySelectorAll('.openSignIn').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.MicroModal) {
        if (!window.justSignedOut) {
          console.log("MicroModal.show('signInModal') called from script.js .openSignIn click");
          MicroModal.show('signInModal');
        } else {
          window.justSignedOut = false;
        }
      }
    });
  });

  // --- Auth State Helper ---
  function isUserAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  // --- Dashboard: View My Appointments ---
  function showDashboard() {
    if (!isUserAuthenticated()) return;
    const nickname = localStorage.getItem('nickname');
    let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments = appointments.filter(a => a.nickname === nickname);
    let results = appointments.length
      ? appointments.map(a => {
          let cancelBtn = `<button class=\"btn btn-danger btn-sm cancel-appointment\" data-id=\"${a.id}\">Cancel</button>`;
          if (a.type === 'Vaccine') {
            return `<div data-appointment-id=\"${a.id}\"><strong>Vaccine</strong> for ${a.petType} (${a.petAge})<br>Vaccines: ${a.vaccines && a.vaccines.length ? a.vaccines.join(', ') : 'None'}<br>Date: ${a.date}<br>ID: ${a.id}<br>${cancelBtn}</div><hr>`;
          } else if (a.type === 'Grooming') {
            return `<div data-appointment-id=\"${a.id}\"><strong>Grooming</strong> for ${a.petType}<br>Service: ${a.service}<br>Date: ${a.date}<br>ID: ${a.id}<br>${cancelBtn}</div><hr>`;
          } else if (a.type === 'Checkup') {
            return `<div data-appointment-id=\"${a.id}\"><strong>Checkup</strong> for ${a.petType}<br>Symptoms: ${a.symptoms || 'None'}<br>Date: ${a.date}<br>ID: ${a.id}<br>${cancelBtn}</div><hr>`;
          } else {
            return `<div data-appointment-id=\"${a.id}\">Unknown appointment type (ID: ${a.id})<br>${cancelBtn}</div><hr>`;
          }
        }).join('')
      : '<div>No appointments booked yet.</div>';
    document.getElementById('resultsModalTitle').innerText = 'Your Appointments';
    document.getElementById('results-content').innerHTML = results;
    if (window.MicroModal) MicroModal.show('results-modal');
  }

  // Event delegation for cancel buttons in dashboard
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cancel-appointment')) {
      const id = e.target.getAttribute('data-id');
      let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      appointments = appointments.filter(a => a.id !== id);
      localStorage.setItem('appointments', JSON.stringify(appointments));
      showDashboard(); // Refresh the modal
    }
  });

  // Attach event listener to the dashboard button
  const viewAppointmentsBtn = document.getElementById('viewAppointmentsBtn');
  if (viewAppointmentsBtn) {
    viewAppointmentsBtn.addEventListener('click', showDashboard);
  }
  const viewAppointmentsBtnMobile = document.getElementById('viewAppointmentsBtnMobile');
  if (viewAppointmentsBtnMobile) {
    viewAppointmentsBtnMobile.addEventListener('click', showDashboard);
  }

  // --- Booking Form Submission Logic ---
  function generateId() {
    return 'A' + Math.random().toString(36).substr(2, 9);
  }

  // Only use the modal for dashboard viewing, not for booking confirmations

  // Vaccine Booking
  if (vaccineForm) {
    vaccineForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!isUserAuthenticated()) return;
      const petType = petTypeSelect.value;
      const petAge = petAgeInput.value;
      const ageUnit = ageUnitSelect.value;
      const vaccines = Array.from(vaccineOptions.querySelectorAll('input[name="vaccines"]:checked')).map(cb => cb.value);
      const appointmentDate = document.getElementById('appointment-vaccine').value;
      const appointment = {
        id: generateId(),
        type: 'Vaccine',
        petType,
        petAge: petAge + ' ' + ageUnit,
        vaccines,
        date: appointmentDate,
        nickname: localStorage.getItem('nickname') || ''
      };
      let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      appointments.push(appointment);
      localStorage.setItem('appointments', JSON.stringify(appointments));
      // Show confirmation in the form
      if (confirmation) {
        confirmation.className = 'alert alert-success mt-3';
        confirmation.innerHTML =
          `✅ Vaccine appointment booked for a <strong>${petType}</strong> (${petAge} ${ageUnit})<br>` +
          `Vaccines: <strong>${vaccines.join(', ') || 'None selected'}</strong><br>` +
          `Date: <strong>${appointmentDate}</strong><br>` +
          `Appointment ID: <strong>${appointment.id}</strong>`;
        confirmation.classList.remove('d-none');
        setTimeout(() => {
          confirmation.classList.add('d-none');
        }, 3000);
      }
      e.target.reset();
      updateVaccineList();
    });
  }

  // Grooming Booking
  const groomingForm = document.getElementById('form-grooming');
  if (groomingForm) {
    groomingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!isUserAuthenticated()) return;
      const petType = document.getElementById('groomPetType').value;
      const service = document.getElementById('groomService').value;
      const appointmentDate = document.getElementById('appointment-grooming').value;
      const appointment = {
        id: generateId(),
        type: 'Grooming',
        petType,
        service,
        date: appointmentDate,
        userPassword: localStorage.getItem('userPassword') || ''
      };
      let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      appointments.push(appointment);
      localStorage.setItem('appointments', JSON.stringify(appointments));
      // Show confirmation in the form
      const groomingConfirmation = document.getElementById('groomingConfirmation');
      if (groomingConfirmation) {
        groomingConfirmation.className = 'alert alert-success mt-3';
        groomingConfirmation.innerHTML =
          `✅ Grooming appointment booked for a <strong>${petType}</strong><br>` +
          `Service: <strong>${service}</strong><br>` +
          `Date: <strong>${appointmentDate}</strong><br>` +
          `Appointment ID: <strong>${appointment.id}</strong>`;
        groomingConfirmation.classList.remove('d-none');
        setTimeout(() => {
          groomingConfirmation.classList.add('d-none');
        }, 3000);
      }
      e.target.reset();
    });
  }

  // Checkup Booking
  const checkupForm = document.getElementById('form-checkup');
  if (checkupForm) {
    checkupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!isUserAuthenticated()) return;
      const petType = document.getElementById('checkupPet').value;
      const symptoms = document.getElementById('symptoms').value;
      const appointmentDate = document.getElementById('appointment-checkup').value;
      const appointment = {
        id: generateId(),
        type: 'Checkup',
        petType,
        symptoms,
        date: appointmentDate,
        userPassword: localStorage.getItem('userPassword') || ''
      };
      let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      appointments.push(appointment);
      localStorage.setItem('appointments', JSON.stringify(appointments));
      // Show confirmation in the form
      const checkupConfirmation = document.getElementById('checkupConfirmation');
      if (checkupConfirmation) {
        checkupConfirmation.className = 'alert alert-success mt-3';
        checkupConfirmation.innerHTML =
          `✅ Checkup appointment booked for a <strong>${petType}</strong><br>` +
          `Symptoms: <strong>${symptoms || 'None'}</strong><br>` +
          `Date: <strong>${appointmentDate}</strong><br>` +
          `Appointment ID: <strong>${appointment.id}</strong>`;
        checkupConfirmation.classList.remove('d-none');
        setTimeout(() => {
          checkupConfirmation.classList.add('d-none');
        }, 3000);
      }
      e.target.reset();
    });
  }
});
