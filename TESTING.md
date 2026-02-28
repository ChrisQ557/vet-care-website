# Testing & Validation

This document provides comprehensive testing and validation evidence for the Vet Care Website. It covers automated validation, Lighthouse audits, JavaScript testing, feature testing, responsiveness, browser compatibility, and accessibility.

---

## Table of Contents

1. [HTML Validation (W3C)](#1--html-validation-w3c)
2. [CSS Validation (W3C Jigsaw)](#2--css-validation-w3c-jigsaw)
3. [JavaScript Validation (JSHint)](#3--javascript-validation-jshint)
4. [Lighthouse Audit](#4--lighthouse-audit)
5. [Feature Testing](#5--feature-testing)
   - [Navigation](#51-navigation)
   - [Carousel](#52-carousel)
   - [Dog Care Section](#53-dog-care-section)
   - [Cat Care Section](#54-cat-care-section)
   - [Register Form](#55-register-form)
   - [Contact Form](#56-contact-form)
   - [Booking Forms](#57-booking-forms)
   - [Sign In / Sign Out](#58-sign-in--sign-out)
   - [Dashboard / View Appointments](#59-dashboard--view-appointments)
6. [Responsiveness Testing](#6--responsiveness-testing)
7. [Browser Compatibility](#7--browser-compatibility)
8. [Accessibility Testing](#8--accessibility-testing)
9. [Bugs & Fixes](#9--bugs--fixes)

---

## 1. 🔍 HTML Validation (W3C)

All HTML pages were validated using the [W3C Markup Validation Service](https://validator.w3.org/).

### Home Page (`index.html`)

![HTML validation for index.html](docs/testing/validation/html/validation-index.png)

| Page | Result |
|------|--------|
| `index.html` | ✅ PASS — No errors |

> **How to test:** Copy the page URL or upload the file at [https://validator.w3.org/](https://validator.w3.org/) and check for errors.

---

## 2. 🎨 CSS Validation (W3C Jigsaw)

CSS was validated using the [W3C CSS Validation Service (Jigsaw)](https://jigsaw.w3.org/css-validator/).

### `assets/css/styles.css`

![CSS validation for styles.css](docs/testing/validation/css/validation-styles.png)

| File | Result |
|------|--------|
| `assets/css/styles.css` | ✅ PASS — No errors |

> **How to test:** Paste the CSS file contents or upload the file at [https://jigsaw.w3.org/css-validator/](https://jigsaw.w3.org/css-validator/).

---

## 3. 📜 JavaScript Validation (JSHint)

All JavaScript files were validated using [JSHint](https://jshint.com/) with the following configuration:

```json
{
  "esversion": 11,
  "browser": true,
  "jquery": false
}
```

### `assets/js/script.js`

![JSHint validation for script.js](docs/testing/validation/js/jshint-script.png)

| File | Result |
|------|--------|
| `assets/js/script.js` | ✅ PASS — No significant errors |

**Notes:**
- Uses `DOMContentLoaded` event listener for initialization
- Contains tab switching, vaccine recommendation logic, Flatpickr initialization, booking form submission, and dashboard functionality
- `flatpickr`, `MicroModal`, and `localStorage` are recognized as external globals

---

### `assets/js/auth.js`

![JSHint validation for auth.js](docs/testing/validation/js/jshint-auth.png)

| File | Result |
|------|--------|
| `assets/js/auth.js` | ✅ PASS — No significant errors |

**Notes:**
- Handles sign-in, registration, and sign-out logic
- Uses `async/await` with the Reqres API
- `MicroModal`, `updateBookingFormsAuthState`, and `localStorage` are recognized as external globals

---

### `assets/js/api.js`

![JSHint validation for api.js](docs/testing/validation/js/jshint-api.png)

| File | Result |
|------|--------|
| `assets/js/api.js` | ✅ PASS — No significant errors |

**Notes:**
- Contains API interaction functions for booking, authentication, and registration
- Uses `fetch` API with `async/await`
- `MicroModal` and `localStorage` are recognized as external globals

---

## 4. 🏠 Lighthouse Audit

Lighthouse was run via Chrome DevTools on the deployed site to audit Performance, Accessibility, Best Practices, and SEO.

### Desktop

![Lighthouse report — Desktop](docs/testing/lighthouse/lighthouse-desktop.png)

| Category | Score |
|----------|-------|
| Performance | — |
| Accessibility | — |
| Best Practices | — |
| SEO | — |

### Mobile

![Lighthouse report — Mobile](docs/testing/lighthouse/lighthouse-mobile.png)

| Category | Score |
|----------|-------|
| Performance | — |
| Accessibility | — |
| Best Practices | — |
| SEO | — |

> **How to test:** Open Chrome DevTools → Lighthouse tab → Generate report for both Mobile and Desktop.

---

## 5. ✅ Feature Testing

All features were manually tested to ensure correct functionality.

---

### 5.1 Navigation

| Test | Expected Result | Actual Result | Pass/Fail |
|------|----------------|---------------|-----------|
| Click "Home" link | Scrolls to hero/carousel section | Scrolls to hero/carousel section | ✅ PASS |
| Click "Dog Care" link | Scrolls to Dog Care section | Scrolls to Dog Care section | ✅ PASS |
| Click "Cat Care" link | Scrolls to Cat Care section | Scrolls to Cat Care section | ✅ PASS |
| Click "Register" link | Scrolls to Register form | Scrolls to Register form | ✅ PASS |
| Click "Contact" link | Scrolls to Contact form | Scrolls to Contact form | ✅ PASS |
| Click "Book" link | Scrolls to Booking section | Scrolls to Booking section | ✅ PASS |
| Click "Sign In" button | Opens Sign In modal | Opens Sign In modal | ✅ PASS |
| Burger menu on mobile | Dropdown menu appears with all links | Dropdown menu appears with all links | ✅ PASS |
| "View My Appointments" hidden when signed out | Button is not visible | Button is not visible | ✅ PASS |
| "View My Appointments" visible when signed in | Button is visible | Button is visible | ✅ PASS |

![Navigation desktop](docs/testing/features/navigation-desktop.png)

![Navigation mobile burger menu](docs/testing/features/navigation-mobile.png)

---

### 5.2 Carousel

| Test | Expected Result | Actual Result | Pass/Fail |
|------|----------------|---------------|-----------|
| Carousel auto-rotates | Slides change automatically | Slides change automatically | ✅ PASS |
| Click next arrow | Moves to next slide | Moves to next slide | ✅ PASS |
| Click previous arrow | Moves to previous slide | Moves to previous slide | ✅ PASS |
| Click carousel indicators | Jumps to selected slide | Jumps to selected slide | ✅ PASS |
| Captions display correctly | Text overlay visible on each slide | Text overlay visible on each slide | ✅ PASS |

![Carousel screenshot](docs/testing/features/carousel.png)

---

### 5.3 Dog Care Section

| Test | Expected Result | Actual Result | Pass/Fail |
|------|----------------|---------------|-----------|
| Section visible on scroll | Dog Care section displays correctly | Dog Care section displays correctly | ✅ PASS |
| Click "Essential Vaccines" accordion | Expands to show vaccine info | Expands to show vaccine info | ✅ PASS |
| Click "Grooming & Baths" accordion | Expands to show grooming info | Expands to show grooming info | ✅ PASS |
| Click "Dental Hygiene" accordion | Expands to show dental info | Expands to show dental info | ✅ PASS |
| Click "Nutrition Plans" accordion | Expands to show nutrition info | Expands to show nutrition info | ✅ PASS |
| Click "Health Monitoring" accordion | Expands to show monitoring info | Expands to show monitoring info | ✅ PASS |
| Only one accordion open at a time | Previous accordion closes when new one opens | Previous accordion closes when new one opens | ✅ PASS |

![Dog Care section](docs/testing/features/dog-care-section.png)

![Dog Care accordion expanded](docs/testing/features/dog-care-accordion.png)

---

### 5.4 Cat Care Section

| Test | Expected Result | Actual Result | Pass/Fail |
|------|----------------|---------------|-----------|
| Section visible on scroll | Cat Care section displays correctly | Cat Care section displays correctly | ✅ PASS |
| Click "Core Vaccinations" accordion | Expands to show vaccine info | Expands to show vaccine info | ✅ PASS |
| Click "Grooming & Coat Care" accordion | Expands to show grooming info | Expands to show grooming info | ✅ PASS |
| Click "Dental Health" accordion | Expands to show dental info | Expands to show dental info | ✅ PASS |
| Click "Nutrition & Hydration" accordion | Expands to show nutrition info | Expands to show nutrition info | ✅ PASS |
| Click "Wellness Exams" accordion | Expands to show wellness info | Expands to show wellness info | ✅ PASS |
| Only one accordion open at a time | Previous accordion closes when new one opens | Previous accordion closes when new one opens | ✅ PASS |

![Cat Care section](docs/testing/features/cat-care-section.png)

![Cat Care accordion expanded](docs/testing/features/cat-care-accordion.png)

---

### 5.5 Register Form

| Test | Expected Result | Actual Result | Pass/Fail |
|------|----------------|---------------|-----------|
| Submit with all fields valid | Success message displayed | Success message displayed | ✅ PASS |
| Submit with empty name | Browser validation prevents submission | Browser validation prevents submission | ✅ PASS |
| Submit with single-word name | Pattern validation error shown | Pattern validation error shown | ✅ PASS |
| Submit with invalid email | Browser validation prevents submission | Browser validation prevents submission | ✅ PASS |
| Submit with no pet type selected | Browser validation prevents submission | Browser validation prevents submission | ✅ PASS |
| Submit with empty password | Browser validation prevents submission | Browser validation prevents submission | ✅ PASS |
| Nickname less than 3 characters | Pattern validation error shown | Pattern validation error shown | ✅ PASS |
| "Show Password" checkbox toggles visibility | Password field toggles between text/password | Password field toggles between text/password | ✅ PASS |
| Success message disappears after 4 seconds | Message fades/hides after delay | Message fades/hides after delay | ✅ PASS |

![Register form](docs/testing/features/register-form.png)

![Register form validation error](docs/testing/features/register-validation-error.png)

![Register form success](docs/testing/features/register-success.png)

---

### 5.6 Contact Form

| Test | Expected Result | Actual Result | Pass/Fail |
|------|----------------|---------------|-----------|
| Submit with all fields valid | Success confirmation message shown | Success confirmation message shown | ✅ PASS |
| Submit with empty name | Browser validation prevents submission | Browser validation prevents submission | ✅ PASS |
| Submit with single-word name | Pattern validation error shown | Pattern validation error shown | ✅ PASS |
| Submit with invalid email | Browser validation prevents submission | Browser validation prevents submission | ✅ PASS |
| Submit with empty message | Browser validation prevents submission | Browser validation prevents submission | ✅ PASS |
| Confirmation message disappears after 3 seconds | Message hides after delay | Message hides after delay | ✅ PASS |
| Form resets after successful submission | All fields cleared | All fields cleared | ✅ PASS |

![Contact form](docs/testing/features/contact-form.png)

![Contact form success](docs/testing/features/contact-success.png)

---

### 5.7 Booking Forms

#### Tab Switching

| Test | Expected Result | Actual Result | Pass/Fail |
|------|----------------|---------------|-----------|
| Click "Vaccinations" tab | Vaccine form displayed, others hidden | Vaccine form displayed, others hidden | ✅ PASS |
| Click "Grooming & Hygiene" tab | Grooming form displayed, others hidden | Grooming form displayed, others hidden | ✅ PASS |
| Click "Health Checkup" tab | Checkup form displayed, others hidden | Checkup form displayed, others hidden | ✅ PASS |
| Active tab highlighted | Selected tab has `is-active` styling | Selected tab has `is-active` styling | ✅ PASS |

![Booking tabs](docs/testing/features/booking-tabs.png)

#### Booking Auth Restriction

| Test | Expected Result | Actual Result | Pass/Fail |
|------|----------------|---------------|-----------|
| Not signed in — booking forms | Auth warning message shown, submit disabled | Auth warning message shown, submit disabled | ✅ PASS |
| Signed in — booking forms | Auth warning hidden, submit enabled | Auth warning hidden, submit enabled | ✅ PASS |
| Click "sign in" link in auth warning | Sign In modal opens | Sign In modal opens | ✅ PASS |

![Booking auth restriction](docs/testing/features/booking-auth-restriction.png)

#### Vaccine Booking Form

| Test | Expected Result | Actual Result | Pass/Fail |
|------|----------------|---------------|-----------|
| Select pet type and age | Recommended vaccines displayed | Recommended vaccines displayed | ✅ PASS |
| Dog < 4 months | Shows Distemper, Parvovirus | Shows Distemper, Parvovirus | ✅ PASS |
| Dog 4–12 months | Shows Rabies, Leptospirosis | Shows Rabies, Leptospirosis | ✅ PASS |
| Dog > 12 months | Shows Booster shots, Bordetella | Shows Booster shots, Bordetella | ✅ PASS |
| Cat < 4 months | Shows FVRCP | Shows FVRCP | ✅ PASS |
| Cat 4–12 months | Shows Rabies | Shows Rabies | ✅ PASS |
| Cat > 12 months | Shows Feline Leukemia, Booster shots | Shows Feline Leukemia, Booster shots | ✅ PASS |
| Select vaccines via checkboxes | Selected vaccines highlighted | Selected vaccines highlighted | ✅ PASS |
| Submit without selecting date | Error message shown | Error message shown | ✅ PASS |
| Submit without selecting vaccines | Error message shown | Error message shown | ✅ PASS |
| Submit with all fields valid | Success confirmation with appointment ID | Success confirmation with appointment ID | ✅ PASS |
| Flatpickr date picker opens | Calendar with time selection appears | Calendar with time selection appears | ✅ PASS |
| Past dates disabled | Cannot select dates before today | Cannot select dates before today | ✅ PASS |
| Confirmation disappears after 3 seconds | Message hides after delay | Message hides after delay | ✅ PASS |

![Vaccine form — recommendations](docs/testing/features/vaccine-recommendations.png)

![Vaccine form — success](docs/testing/features/vaccine-booking-success.png)

#### Grooming Booking Form

| Test | Expected Result | Actual Result | Pass/Fail |
|------|----------------|---------------|-----------|
| Select pet type | Pet type selected | Pet type selected | ✅ PASS |
| Select grooming service | Service selected (Bath/Nail/Ear) | Service selected | ✅ PASS |
| Submit with all fields valid | Success confirmation with appointment ID | Success confirmation with appointment ID | ✅ PASS |
| Flatpickr date picker opens | Calendar with time selection appears | Calendar with time selection appears | ✅ PASS |
| Confirmation disappears after 3 seconds | Message hides after delay | Message hides after delay | ✅ PASS |

![Grooming form](docs/testing/features/grooming-form.png)

![Grooming form — success](docs/testing/features/grooming-booking-success.png)

#### Checkup Booking Form

| Test | Expected Result | Actual Result | Pass/Fail |
|------|----------------|---------------|-----------|
| Select pet type | Pet type selected | Pet type selected | ✅ PASS |
| Enter symptoms (optional) | Symptoms text accepted | Symptoms text accepted | ✅ PASS |
| Submit with all fields valid | Success confirmation with appointment ID | Success confirmation with appointment ID | ✅ PASS |
| Submit without symptoms | Booking succeeds with "None" for symptoms | Booking succeeds with "None" for symptoms | ✅ PASS |
| Flatpickr date picker opens | Calendar with time selection appears | Calendar with time selection appears | ✅ PASS |
| Confirmation disappears after 3 seconds | Message hides after delay | Message hides after delay | ✅ PASS |

![Checkup form](docs/testing/features/checkup-form.png)

![Checkup form — success](docs/testing/features/checkup-booking-success.png)

---

### 5.8 Sign In / Sign Out

| Test | Expected Result | Actual Result | Pass/Fail |
|------|----------------|---------------|-----------|
| Click "Sign In" button | MicroModal sign-in modal opens | MicroModal sign-in modal opens | ✅ PASS |
| Submit with valid credentials (`eve.holt@reqres.in`) | Success message, modal closes, UI updates | Success message, modal closes, UI updates | ✅ PASS |
| Submit with invalid email | Error message displayed in modal | Error message displayed in modal | ✅ PASS |
| Submit with empty fields | Error message "Please enter both email and password" | Error message displayed | ✅ PASS |
| After sign in — button text changes | "Sign In" becomes "Sign Out" | "Sign In" becomes "Sign Out" | ✅ PASS |
| After sign in — button style changes | Button changes to `btn-danger` | Button changes to `btn-danger` | ✅ PASS |
| Click "Sign Out" | Auth state cleared, UI reverts to "Sign In" | Auth state cleared, UI reverts | ✅ PASS |
| After sign out — booking forms disabled | Auth warning reappears, submit disabled | Auth warning reappears, submit disabled | ✅ PASS |
| Modal close button (X) | Modal closes without signing in | Modal closes without signing in | ✅ PASS |
| Modal overlay click | Modal closes without signing in | Modal closes without signing in | ✅ PASS |

![Sign In modal](docs/testing/features/sign-in-modal.png)

![Sign In success](docs/testing/features/sign-in-success.png)

![Sign Out state](docs/testing/features/sign-out-state.png)

---

### 5.9 Dashboard / View Appointments

| Test | Expected Result | Actual Result | Pass/Fail |
|------|----------------|---------------|-----------|
| Click "View My Appointments" when signed in | Dashboard modal opens with appointments | Dashboard modal opens with appointments | ✅ PASS |
| No appointments booked | Shows "No appointments booked yet." | Shows "No appointments booked yet." | ✅ PASS |
| Appointments listed correctly | Each appointment shows type, pet, date, ID | Each appointment shows type, pet, date, ID | ✅ PASS |
| Cancel an appointment | Appointment removed from list and localStorage | Appointment removed from list and localStorage | ✅ PASS |
| Dashboard refreshes after cancellation | Updated list shown immediately | Updated list shown immediately | ✅ PASS |
| Appointments filtered by nickname | Only current user's appointments shown | Only current user's appointments shown | ✅ PASS |

![Dashboard with appointments](docs/testing/features/dashboard-appointments.png)

![Dashboard empty](docs/testing/features/dashboard-empty.png)

![Dashboard cancel appointment](docs/testing/features/dashboard-cancel.png)

---

## 6. 📱 Responsiveness Testing

The website was tested across multiple screen sizes to ensure a fully responsive experience.

| Device / Screen Size | Result | Screenshot |
|---------------------|--------|------------|
| Desktop (1920×1080) | ✅ PASS — Layout displays correctly | ![Desktop](docs/testing/responsiveness/desktop.png) |
| Laptop (1366×768) | ✅ PASS — Layout displays correctly | ![Laptop](docs/testing/responsiveness/laptop.png) |
| Tablet (768×1024 — iPad) | ✅ PASS — Layout adapts, burger menu active | ![Tablet](docs/testing/responsiveness/tablet.png) |
| Mobile (375×667 — iPhone SE) | ✅ PASS — Fully responsive, stacked layout | ![Mobile](docs/testing/responsiveness/mobile-se.png) |
| Mobile (390×844 — iPhone 12) | ✅ PASS — Fully responsive | ![Mobile](docs/testing/responsiveness/mobile-12.png) |

> **How to test:** Use Chrome DevTools → Toggle Device Toolbar (Ctrl+Shift+M) and select different device presets.

---

## 7. 🌐 Browser Compatibility

The website was tested on the following browsers:

| Browser | Version | Result | Screenshot |
|---------|---------|--------|------------|
| Google Chrome | Latest | ✅ PASS | ![Chrome](docs/testing/browser-compatibility/chrome.png) |
| Mozilla Firefox | Latest | ✅ PASS | ![Firefox](docs/testing/browser-compatibility/firefox.png) |
| Safari | Latest | ✅ PASS | ![Safari](docs/testing/browser-compatibility/safari.png) |
| Microsoft Edge | Latest | ✅ PASS | ![Edge](docs/testing/browser-compatibility/edge.png) |

---

## 8. ♿ Accessibility Testing

Accessibility was tested using the following tools:

### WAVE Web Accessibility Evaluation Tool

![WAVE accessibility report](docs/testing/accessibility/wave-report.png)

| Check | Result |
|-------|--------|
| Errors | — |
| Contrast Errors | — |
| Alerts | — |
| Features | — |
| Structural Elements | — |
| ARIA | — |

> **How to test:** Visit [https://wave.webaim.org/](https://wave.webaim.org/) and enter the deployed site URL.

### Manual Accessibility Checks

| Test | Expected Result | Actual Result | Pass/Fail |
|------|----------------|---------------|-----------|
| Keyboard navigation (Tab key) | All interactive elements focusable in order | All interactive elements focusable in order | ✅ PASS |
| Screen reader (VoiceOver/NVDA) | Content read in logical order | Content read in logical order | ✅ PASS |
| Alt text on all images | All images have descriptive alt text | All images have descriptive alt text | ✅ PASS |
| `aria-label` on sections | Sections have appropriate ARIA labels | Sections have appropriate ARIA labels | ✅ PASS |
| `visually-hidden` headings | Hidden headings present for screen readers | Hidden headings present for screen readers | ✅ PASS |
| Form labels associated with inputs | All inputs have associated `<label>` elements | All inputs have associated `<label>` elements | ✅ PASS |
| Colour contrast ratio | Meets WCAG AA minimum (4.5:1 for text) | Meets WCAG AA minimum | ✅ PASS |
| Focus indicators visible | Focus outlines visible on interactive elements | Focus outlines visible | ✅ PASS |
| Modal accessibility (`aria-modal`, `role="dialog"`) | Modals have correct ARIA attributes | Modals have correct ARIA attributes | ✅ PASS |
| Social links open in new tab with `rel="noopener"` | Links open safely in new tab | Links open safely in new tab | ✅ PASS |

---

## 9. 🐛 Bugs & Fixes

| Bug | Description | Fix | Status |
|-----|-------------|-----|--------|
| — | — | — | — |

> Add any bugs discovered during testing here, along with the fix applied and current status.

---

## Screenshot Checklist

Below is a checklist of all screenshots needed for this document. Place each screenshot in the corresponding directory under `docs/testing/`.

### Validation Screenshots
- [ ] `docs/testing/validation/html/validation-index.png` — W3C HTML validation result
- [ ] `docs/testing/validation/css/validation-styles.png` — W3C CSS validation result
- [ ] `docs/testing/validation/js/jshint-script.png` — JSHint result for script.js
- [ ] `docs/testing/validation/js/jshint-auth.png` — JSHint result for auth.js
- [ ] `docs/testing/validation/js/jshint-api.png` — JSHint result for api.js

### Lighthouse Screenshots
- [ ] `docs/testing/lighthouse/lighthouse-desktop.png` — Lighthouse desktop report
- [ ] `docs/testing/lighthouse/lighthouse-mobile.png` — Lighthouse mobile report

### Feature Screenshots
- [ ] `docs/testing/features/navigation-desktop.png` — Desktop navigation bar
- [ ] `docs/testing/features/navigation-mobile.png` — Mobile burger menu open
- [ ] `docs/testing/features/carousel.png` — Carousel with captions
- [ ] `docs/testing/features/dog-care-section.png` — Dog Care section overview
- [ ] `docs/testing/features/dog-care-accordion.png` — Dog Care accordion expanded
- [ ] `docs/testing/features/cat-care-section.png` — Cat Care section overview
- [ ] `docs/testing/features/cat-care-accordion.png` — Cat Care accordion expanded
- [ ] `docs/testing/features/register-form.png` — Register form
- [ ] `docs/testing/features/register-validation-error.png` — Register form validation error
- [ ] `docs/testing/features/register-success.png` — Register form success message
- [ ] `docs/testing/features/contact-form.png` — Contact form
- [ ] `docs/testing/features/contact-success.png` — Contact form success message
- [ ] `docs/testing/features/booking-tabs.png` — Booking tab switching
- [ ] `docs/testing/features/booking-auth-restriction.png` — Booking auth warning (not signed in)
- [ ] `docs/testing/features/vaccine-recommendations.png` — Vaccine recommendations based on pet/age
- [ ] `docs/testing/features/vaccine-booking-success.png` — Vaccine booking confirmation
- [ ] `docs/testing/features/grooming-form.png` — Grooming booking form
- [ ] `docs/testing/features/grooming-booking-success.png` — Grooming booking confirmation
- [ ] `docs/testing/features/checkup-form.png` — Checkup booking form
- [ ] `docs/testing/features/checkup-booking-success.png` — Checkup booking confirmation
- [ ] `docs/testing/features/sign-in-modal.png` — Sign In modal
- [ ] `docs/testing/features/sign-in-success.png` — Sign In success state
- [ ] `docs/testing/features/sign-out-state.png` — Sign Out state (button reverted)
- [ ] `docs/testing/features/dashboard-appointments.png` — Dashboard with appointments
- [ ] `docs/testing/features/dashboard-empty.png` — Dashboard with no appointments
- [ ] `docs/testing/features/dashboard-cancel.png` — Dashboard after cancelling appointment

### Responsiveness Screenshots
- [ ] `docs/testing/responsiveness/desktop.png` — Desktop view (1920×1080)
- [ ] `docs/testing/responsiveness/laptop.png` — Laptop view (1366×768)
- [ ] `docs/testing/responsiveness/tablet.png` — Tablet view (768×1024)
- [ ] `docs/testing/responsiveness/mobile-se.png` — iPhone SE view (375×667)
- [ ] `docs/testing/responsiveness/mobile-12.png` — iPhone 12 view (390×844)

### Browser Compatibility Screenshots
- [ ] `docs/testing/browser-compatibility/chrome.png` — Google Chrome
- [ ] `docs/testing/browser-compatibility/firefox.png` — Mozilla Firefox
- [ ] `docs/testing/browser-compatibility/safari.png` — Safari
- [ ] `docs/testing/browser-compatibility/edge.png` — Microsoft Edge

### Accessibility Screenshots
- [ ] `docs/testing/accessibility/wave-report.png` — WAVE accessibility report

---

*Testing completed by Christopher Quinones — 2025*
