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
function handleSignInSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('signinEmail').value.trim();
  const password = document.getElementById('signinPassword').value.trim();
  const messageDiv = document.getElementById('signinMessage');

  // Dummy authentication logic (replace with real AJAX/auth)
  if (email && password) {
    // Show success message
    messageDiv.classList.remove('d-none', 'alert-danger');
    messageDiv.classList.add('alert-success');
    messageDiv.textContent = "Sign in successful!";

    // Set authentication state
    localStorage.setItem('isAuthenticated', 'true');

    setTimeout(() => {
      // Close modal (Micromodal)
      if (document.getElementById('signInModal')) {
        MicroModal.close('signInModal');
      }
      // Reset form
      e.target.reset();
      // Optionally update booking forms or UI
      if (typeof updateBookingFormsAuthState === 'function') updateBookingFormsAuthState();
      // Update auth UI
      updateAuthUI(true);
      // Hide message after a short delay
      setTimeout(() => {
        messageDiv.classList.add('d-none');
        messageDiv.textContent = "";
      }, 1000);
    }, 800);
  } else {
    // Show error message
    messageDiv.classList.remove('d-none', 'alert-success');
    messageDiv.classList.add('alert-danger');
    messageDiv.textContent = "Please enter both email and password.";
  }
}

/**
 * Handles register form submission.
 * @param {Event} e
 */
function handleRegisterSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const petType = document.getElementById('petType').value;
  const password = document.getElementById('password').value.trim();
  const messageDiv = document.getElementById('registerMessage');

  // Basic validation (expand as needed)
  if (name && email && petType && password) {
    // Simulate registration logic (replace with API call later)
    // Optionally, store user info in localStorage for demo purposes
    // localStorage.setItem('user', JSON.stringify({ name, email, petType }));

    // Optionally, auto-sign-in after registration
    localStorage.setItem('isAuthenticated', 'true');

    // Show success message
    messageDiv.classList.remove('d-none', 'alert-danger');
    messageDiv.classList.add('alert', 'alert-success');
    messageDiv.innerHTML = `
      Registration successful! You can now <a href="#book" class="alert-link">book an appointment</a> using the form below.
    `;

    // Reset form
    e.target.reset();

    // Update auth UI
    updateAuthUI(true);

    // Optionally update booking forms or UI
    if (typeof updateBookingFormsAuthState === 'function') updateBookingFormsAuthState();

    // Hide message after a delay (optional)
    setTimeout(() => {
      messageDiv.classList.add('d-none');
      messageDiv.textContent = "";
    }, 4000);
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
        MicroModal.show('signInModal');
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