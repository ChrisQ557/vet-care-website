// assets/js/auth.js

/**
 * Authentication logic for sign in/out, registration, and modal control using Micromodal.
 * Bootstrap modal handling has been removed.
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
  // Attach auth button listeners (Sign In/Sign Out)
  attachAuthButtonListeners();
});

/**
 * Handles sign-in form submission.
 * @param {Event} e
 */
async function handleSignInSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('signinEmail').value.trim();
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
        messageDiv.textContent = data.error || "Login failed. Please try again.";
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

  // Basic validation (expand as needed)
  if (name && email && petType && password) {
    // Use Reqres API for registration
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
        // Set registered state
        localStorage.setItem('isRegistered', 'true');
        // Show success message
        messageDiv.classList.remove('d-none', 'alert-danger');
        messageDiv.classList.add('alert', 'alert-success');
        messageDiv.innerHTML = `
          Registration successful! You can now <a href="#book" class="alert-link">book an appointment</a> using the form below.
        `;
        // Reset form
        e.target.reset();
        // Optionally update booking forms or UI
        if (typeof updateBookingFormsAuthState === 'function') updateBookingFormsAuthState();
        // Hide message after a delay (optional)
        setTimeout(() => {
          messageDiv.classList.add('d-none');
          messageDiv.textContent = "";
        }, 4000);
      } else {
        // Show error message from API
        messageDiv.classList.remove('d-none', 'alert-success');
        messageDiv.classList.add('alert', 'alert-danger');
        messageDiv.textContent = data.error || "Registration failed. Please try again.";
      }
    } catch (err) {
      messageDiv.classList.remove('d-none', 'alert-success');
      messageDiv.classList.add('alert', 'alert-danger');
      messageDiv.textContent = "Registration failed. Please try again.";
    }
  } else {
    // Show error message
    messageDiv.classList.remove('d-none', 'alert-success');
    messageDiv.classList.add('alert', 'alert-danger');
    messageDiv.textContent = "Please fill in all fields.";
  }
}

/**
 * Handles sign out logic.
 */
function signOutUser() {
  // Clear auth state (implement as needed)
  localStorage.removeItem('isAuthenticated');
  updateAuthUI(false);
  // Optionally close modal if open and Micromodal is initialized
  const modal = document.getElementById('signInModal');
  if (modal && modal.classList.contains('is-open') && window.MicroModal && typeof MicroModal.close === 'function') {
    try {
      MicroModal.close('signInModal');
    } catch (e) {
      // Modal might not be open or Micromodal not initialized; ignore
    }
  }
  // Optionally update booking forms or UI
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
    // Remove previous click listeners to avoid stacking
    btn.replaceWith(btn.cloneNode(true));
  });
  // Re-attach event listeners after replacing nodes
  attachAuthButtonListeners();
}

/**
 * Attaches event listeners to all auth buttons.
 */
function attachAuthButtonListeners() {
  document.querySelectorAll('.authButton').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (btn.textContent === "Sign Out") {
        signOutUser();
      } else {
        // Only allow sign in if registered
        if (localStorage.getItem('isRegistered') === 'true') {
          MicroModal.show('signInModal');
        } else {
          // Show message in registration form
          const messageDiv = document.getElementById('registerMessage');
          if (messageDiv) {
            messageDiv.classList.remove('d-none', 'alert-success');
            messageDiv.classList.add('alert', 'alert-danger');
            messageDiv.textContent = 'Please register before signing in.';
            // Optionally scroll to registration form
            const regForm = document.getElementById('registerForm');
            if (regForm) regForm.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });
}

/**
 * Checks if the user is authenticated.
 * @returns {boolean}
 */
function isUserAuthenticated() {
  return localStorage.getItem('isAuthenticated') === 'true';
}

// Optionally, expose signOutUser and isUserAuthenticated globally if needed elsewhere
window.signOutUser = signOutUser;
window.isUserAuthenticated = isUserAuthenticated;