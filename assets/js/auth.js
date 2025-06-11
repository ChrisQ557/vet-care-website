// assets/js/auth.js

/**
 * Authentication logic for sign in/out, registration, and modal control using Micromodal.
 */

document.addEventListener('DOMContentLoaded', function () {
  // Attach sign-in form handler
  const signInForm = document.getElementById('form-signin');
  if (signInForm) {
    signInForm.addEventListener('submit', handleSignInSubmit);
  }
  // Attach register form handler
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegisterSubmit);
  }
  // Attach global event delegation for auth buttons
  document.addEventListener('click', authButtonHandler);
  // Set initial UI state
  updateAuthUI(isUserAuthenticated());
});

/**
 * Handles sign-in form submission.
 * @param {Event} e
 */
async function handleSignInSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('signinEmail').value.trim();
  const nickname = document.getElementById('signinNickname').value.trim();
  const password = document.getElementById('signinPassword').value.trim();
  const messageDiv = document.getElementById('signinMessage');

  if (email && password) {
    try {
      const payload = { email, password };
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'reqres-free-v1'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        messageDiv.classList.remove('d-none', 'alert-danger');
        messageDiv.classList.add('alert-success');
        messageDiv.textContent = "Sign in successful!";
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('nickname', nickname);
        setTimeout(() => {
          if (document.getElementById('signInModal')) MicroModal.close('signInModal');
          e.target.reset();
          if (typeof updateBookingFormsAuthState === 'function') updateBookingFormsAuthState();
          updateAuthUI(true);
          setTimeout(() => {
            messageDiv.classList.add('d-none');
            messageDiv.textContent = "";
          }, 1000);
        }, 800);
      } else {
        messageDiv.classList.remove('d-none', 'alert-success');
        messageDiv.classList.add('alert-danger');
        if (data.error && data.error.toLowerCase().includes('user not found')) {
          messageDiv.textContent = "No account found with this email. Please register.";
        } else if (data.error && data.error.toLowerCase().includes('password')) {
          messageDiv.textContent = "Incorrect password. Please try again or reset your password.";
        } else {
          messageDiv.textContent = data.error || "Login failed. Please try again.";
        }
      }
    } catch (err) {
      messageDiv.classList.remove('d-none', 'alert-success');
      messageDiv.classList.add('alert-danger');
      messageDiv.textContent = "Login failed. Please try again.";
    }
  } else {
    messageDiv.classList.remove('d-none', 'alert-success');
    messageDiv.classList.add('alert-danger');
    messageDiv.textContent = "Please enter both email and password.";
  }
}

/**
 * Handles register form submission.
 * @param {Event} e
 */
async function handleRegisterSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('email').value.trim();
  const petType = document.getElementById('petType').value;
  const password = document.getElementById('password').value.trim();
  const messageDiv = document.getElementById('registerMessage');

  // Basic validation
  if (name && email && petType && password) {
    try {
      const payload = { email, password };
      const response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'reqres-free-v1'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('isRegistered', 'true');
        messageDiv.classList.remove('d-none', 'alert-danger');
        messageDiv.classList.add('alert', 'alert-success');
        messageDiv.innerHTML =
          `Registration successful! You can now <a href=\"#book\" class=\"alert-link\">book an appointment</a> using the form below.`;
        e.target.reset();
        if (typeof updateBookingFormsAuthState === 'function') updateBookingFormsAuthState();
        setTimeout(() => {
          messageDiv.classList.add('d-none');
          messageDiv.textContent = "";
        }, 4000);
      } else {
        messageDiv.classList.remove('d-none', 'alert-success');
        messageDiv.classList.add('alert', 'alert-danger');
        if (data.error && data.error.toLowerCase().includes('already')) {
          messageDiv.textContent = "Account already exists. Please sign in.";
        } else {
          messageDiv.textContent = data.error || "Registration failed. Please try again.";
        }
      }
    } catch (err) {
      messageDiv.classList.remove('d-none', 'alert-success');
      messageDiv.classList.add('alert', 'alert-danger');
      messageDiv.textContent = "Registration failed. Please try again.";
    }
  } else {
    messageDiv.classList.remove('d-none', 'alert-success');
    messageDiv.classList.add('alert', 'alert-danger');
    messageDiv.textContent = "Please fill in all fields.";
  }
}

/**
 * Handles sign out logic.
 */
function signOutUser() {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('nickname');
  updateAuthUI(false);
  // Close modal if open
  if (window.MicroModal && typeof MicroModal.close === 'function') {
    try {
      MicroModal.close('signInModal');
    } catch (e) {}
  }
  if (typeof updateBookingFormsAuthState === 'function') updateBookingFormsAuthState();
}

/**
 * Updates the UI for authentication state.
 * @param {boolean} isSignedIn
 */
function updateAuthUI(isSignedIn) {
  document.querySelectorAll('.authButton').forEach(btn => {
    btn.textContent = isSignedIn ? "Sign Out" : "Sign In";
    btn.classList.toggle('btn-outline-secondary', !isSignedIn);
    btn.classList.toggle('btn-danger', isSignedIn);
  });
  // Show/hide View Appointments buttons
  const viewBtn = document.getElementById('viewAppointmentsBtn');
  const viewBtnMobile = document.getElementById('viewAppointmentsBtnMobile');
  if (viewBtn) viewBtn.style.display = isSignedIn ? '' : 'none';
  if (viewBtnMobile) viewBtnMobile.style.display = isSignedIn ? '' : 'none';
}

/**
 * Handles all .authButton clicks via event delegation.
 */
function authButtonHandler(e) {
  const btn = e.target.closest('.authButton');
  if (!btn) return;
  e.preventDefault();
  if (btn.textContent.trim() === "Sign In") {
    if (window.MicroModal && typeof MicroModal.show === 'function') {
      MicroModal.show('signInModal');
    }
  } else if (btn.textContent.trim() === "Sign Out") {
    signOutUser();
  }
}

/**
 * Checks if the user is authenticated.
 * @returns {boolean}
 */
function isUserAuthenticated() {
  return localStorage.getItem('isAuthenticated') === 'true';
}

window.signOutUser = signOutUser;
window.isUserAuthenticated = isUserAuthenticated;
