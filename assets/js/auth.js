/**
 * auth.js
 * Handles authentication state for Vet Care website.
 * Uses localStorage
 */

// Check if user is authenticated
function isUserAuthenticated() {
  return localStorage.getItem('isAuthenticated') === 'true';
}

// Set user as authenticated (call after successful register/sign-in)
function setUserAuthenticated() {
  localStorage.setItem('isAuthenticated', 'true');
}

// Sign out user
function signOutUser() {
  localStorage.removeItem('isAuthenticated');
}

// Listen for registration form submit
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  setUserAuthenticated();
  // Optionally, show a message or redirect
  document.getElementById('registerMessage').innerHTML = `
    <div class="alert alert-success" role="alert">
      Registration successful! You can now book appointments.
    </div>
  `;
  setTimeout(() => {
    document.getElementById('registerMessage').innerHTML = '';
  }, 4000);
  this.reset();
  // Update booking forms (if any)
  if (typeof updateBookingFormsAuthState === 'function') updateBookingFormsAuthState();
});

// Listen for sign-in form submit
document.getElementById('form-signin')?.addEventListener('submit', function (e) {
  e.preventDefault();
  setUserAuthenticated();
  // Optionally, show a message or close modal
  const signinMessage = document.getElementById('signinMessage');
  if (signinMessage) {
    signinMessage.className = 'alert alert-success mt-3';
    signinMessage.textContent = 'Sign in successful! You can now book appointments.';
    setTimeout(() => {
      signinMessage.className = 'alert d-none mt-3';
      signinMessage.textContent = '';
    }, 3000);
  }
  // Close modal (Bootstrap 5)
  const signInModal = bootstrap.Modal.getInstance(document.getElementById('signInModal'));
  if (signInModal) signInModal.hide();
  this.reset();
  // Update booking forms (if any)
  if (typeof updateBookingFormsAuthState === 'function') updateBookingFormsAuthState();
});

// Expose functions globally for other scripts
window.isUserAuthenticated = isUserAuthenticated;
window.setUserAuthenticated = setUserAuthenticated;
window.signOutUser = signOutUser;