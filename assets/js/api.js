const API_URL = "https://reqres.in/api";
const API_KEY = "reqres-free-v1";

// Attach booking form event listeners
['form-vaccine', 'form-grooming', 'form-checkup'].forEach(formId => {
  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener('submit', function(e) {
      bookAppointment(e, formId);
    });
  }
});

// Attach sign-in form event listener
const signInForm = document.getElementById('form-signin');
if (signInForm) {
  signInForm.addEventListener('submit', function(e) {
    authenticateUser(e);
  });
}

// Book an appointment (simulate with Reqres 'users' endpoint)
async function bookAppointment(e, formId) {
    e.preventDefault();
    const formElem = document.getElementById(formId);
    if (!formElem) return;
    // For demo, use pet name as 'name' and service as 'job'
    let name = '';
    let job = '';
    if (formId === 'form-vaccine') {
      name = formElem.querySelector('#vaccinePet')?.value || 'Pet';
      job = 'Vaccine';
    } else if (formId === 'form-grooming') {
      name = formElem.querySelector('#groomPetType')?.value || 'Pet';
      job = formElem.querySelector('#groomService')?.value || 'Grooming';
    } else if (formId === 'form-checkup') {
      name = formElem.querySelector('#checkupPet')?.value || 'Pet';
      job = 'Checkup';
    }
    const payload = { name, job };
    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (response.ok) {
        displayAppointmentResult(data);
    } else {
        displayException(data);
        throw new Error(data.error);
    }
}

// Authenticate user (login)
async function authenticateUser(e) {
    e.preventDefault();
    const formElem = document.getElementById('form-signin');
    if (!formElem) return;
    const email = formElem.querySelector('#signinEmail')?.value;
    const password = formElem.querySelector('#signinPassword')?.value;
    const payload = { email, password };
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (response.ok) {
        displayAuthResult(data);
    } else {
        displayException(data);
        throw new Error(data.error);
    }
}

// Registration (register)
async function registerUser(email, password) {
    const payload = { email, password };
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        body: JSON.stringify(payload),
    });
    return response.json();
}

// Display appointment result
function displayAppointmentResult(data) {
    let heading = `Appointment Confirmation`;
    let results = `<div>Appointment booked for: <strong>${data.name}</strong></div>`;
    results += `<div>Service: <strong>${data.job}</strong></div>`;
    results += `<div>Appointment ID: <strong>${data.id}</strong></div>`;
    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    MicroModal.show('results-modal');
    // Store appointment in localStorage for dashboard
    let appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(data);
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

// Display authentication result
function displayAuthResult(data) {
    let heading = `Login Successful`;
    let results = `<div>Token: <strong>${data.token}</strong></div>`;
    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    MicroModal.show('results-modal');
}

// Display API exceptions
function displayException(data) {
    let heading = `An exception Occurred`;
    let results = `<div>Error: <strong>${data.error || 'Unknown error'}</strong></div>`;
    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    MicroModal.show('results-modal');
}
