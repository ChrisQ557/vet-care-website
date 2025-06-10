const API_KEY = "IItgcNvdHik5TC5Nn--lJ95k-CE";
const API_URL = "https://chrisq557.github.io/vet-care-website/"; 

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


function processOptions(form) {
    let optArray = [];
    for (let entry of form.entries()) {
        if (entry[0] === "options") {
            optArray.push(entry[1]);
        }
    }
    form.delete("options");
    form.append("options", optArray.join());
    return form;
}

// Book an appointment (POST)
async function bookAppointment(e, formId) {
    e.preventDefault();
    const formElem = document.getElementById(formId);
    if (!formElem) return;
    const form = processOptions(new FormData(formElem));
    const response = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
    });
    const data = await response.json();
    if (response.ok) {
        displayAppointmentResult(data);
    } else {
        displayException(data);
        throw new Error(data.error);
    }
}

// Authenticate user (POST)
async function authenticateUser(e) {
    e.preventDefault();
    const formElem = document.getElementById('form-signin');
    if (!formElem) return;
    const form = new FormData(formElem);
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
    });
    const data = await response.json();
    if (response.ok) {
        displayAuthResult(data);
    } else {
        displayException(data);
        throw new Error(data.error);
    }
}

// Display appointment result
function displayAppointmentResult(data) {
    let heading = `Appointment Confirmation`;
    let results = `<div>Appointment booked for: <strong>${data.date} at ${data.time}</strong></div>`;
    results += `<div>Pet: <strong>${data.pet_name}</strong></div>`;
    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    MicroModal.show('results-modal');
}

// Display authentication result
function displayAuthResult(data) {
    let heading = `Login Successful`;
    let results = `<div>Welcome, <strong>${data.username}</strong>!</div>`;
    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    MicroModal.show('results-modal');
}

// Display API exceptions
function displayException(data) {
    let heading = `An exception Occurred`;
    let results = `<div>The API returned status code ${data.status_code}</div>`;
    results += `<div>Error number: <strong>${data.error_no}</strong></div>`;
    results += `<div>Error text: <strong>${data.error}</strong></div>`;
    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    MicroModal.show('results-modal');
}
