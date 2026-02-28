# 🐾 Vet Care Website

Welcome to the Vet Care Website — a modern, responsive platform for pet owners to manage their pets’ health, book appointments, and access reliable care information. This project is designed for cat and dog owners who want to keep their pets healthy and happy.

---

## 🌟 Overview

The Vet Care Website is your digital companion for pet care. Users can:

- Access species-specific care information (vaccines, appointments, general care)
- Book veterinary appointments online
- Track upcoming vaccinations and appointments
- Receive reminders
- Enjoy a fully responsive, mobile-friendly experience

---

## 🎯 Intended Users

- **New Pet Owners** — Need guidance on basic care, vaccines, and appointments
- **Experienced Owners** — Want tools to manage recurring care for multiple pets
- **Busy Professionals** — Appreciate quick, mobile-friendly access and easy booking
- **Families** — Need to manage care for several pets in one place
- **Users with Accessibility Needs** — Rely on accessible, easy-to-navigate design

---

## 📖 User Stories

### Visitors

The main demographic for the site is pet owners looking for reliable veterinary care information, services, and appointment booking for their cats and dogs.

1. As a visitor, I would like to see what the vet clinic offers so I can decide if it's right for my pet.

2. As a visitor, I would like to browse dog-specific care information (vaccines, grooming, dental, nutrition, health monitoring) so I can understand how to keep my dog healthy.

3. As a visitor, I would like to browse cat-specific care information (vaccines, grooming, dental, nutrition, wellness exams) so I can understand how to keep my cat healthy.

4. As a visitor, I would like to easily navigate between sections so I can find the information I need quickly.

5. As a visitor, I would like to view the clinic's services (vaccinations, grooming, nutrition, health checkups) so I can see what is available.

6. As a visitor, I would like to send a message via a contact form so I can ask questions or provide feedback.

7. As a visitor, I would like the site to be responsive so I can browse comfortably on my phone, tablet, or desktop.

8. As a visitor, I would like to access the clinic's social media links so I can follow them on Facebook, Instagram, or Twitter.

9. As a visitor, I would like to see a visually appealing carousel of images so I can get a feel for the clinic's environment and services.

10. As a visitor, I would like to register an account so I can access booking features and manage my pet's appointments.

### Registered Users / Pet Owners

1. As a registered user, I would like to sign in to my account so I can access the booking system.

2. As a registered user, I would like to book a vaccination appointment for my pet so I can keep their immunisations up to date.

3. As a registered user, I would like to see recommended vaccines based on my pet's type and age so I can make informed decisions.

4. As a registered user, I would like to book a grooming appointment (bath, nail trim, ear cleaning) so I can keep my pet clean and healthy.

5. As a registered user, I would like to book a health checkup and optionally describe symptoms so the vet can prepare for the visit.

6. As a registered user, I would like to select a preferred date and time for my appointment so it fits my schedule.

7. As a registered user, I would like to view all my booked appointments in a dashboard so I can keep track of upcoming visits.

8. As a registered user, I would like to cancel an appointment from the dashboard so I can manage my schedule if plans change.

9. As a registered user, I would like to sign out of my account so my information stays secure on shared devices.

10. As a registered user, I would like to receive a confirmation message after booking so I know my appointment was successfully created.

### Admin / Clinic Staff

1. As an admin, I would like to collect visitor names and emails through the contact form so I can respond to enquiries.

2. As an admin, I would like to collect registration details (name, nickname, email, pet type, password) so I can manage user accounts.

3. As an admin, I would like to collect booking details (pet type, service, date/time, vaccines selected, symptoms) so I can manage appointment reservations.

4. As an admin, I would like the site to present the clinic professionally so it attracts new clients and builds trust.

5. As an admin, I would like booking to be restricted to signed-in users so I can ensure only registered pet owners make appointments.

---

## 🧱 Features

- 🎨 Custom responsive design with Bootstrap 5
- 🐶 Species-specific care info for cats, dogs.
- 📅 Appointment booking with date/time selection
- 💉 Vaccination tracker 
- 📱 Mobile-friendly navigation and layout
- 🧭 Clear, accessible navigation and forms
- 📂 Clean project structure for easy updates

---

## 📁 Folder Structure

```
vet-care-website/
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── script.js
│   │   └── auth.js
│   └── images/
│       └── [all image files]
├── index.html
├── README.md
```

---

## 💡 Pages Breakdown

### `index.html`

- **Navigation Bar:** Responsive, mobile-friendly, with quick links
- **Hero Section:** Welcome message and quick access to booking
- **Pet Care Sections:** Info for dogs and cats
- **Appointment Booking:** Book vet visits online
- **Contact Form:** Reach out for support or questions
- **Footer:** Contact info and social links

---

## 🧰 Technologies Used

- HTML5
- CSS3 (with Bootstrap 5)
- JavaScript (vanilla)
- [MicroModal](https://micromodal.vercel.app/) for accessible modals
- Responsive design principles
- Google Fonts: 'Lora', serif; 'Nunito', sans-serif.

---

## 🌐 How to Use

1. **Clone or download the project:**
   ```sh
   git clone https://github.com/ChrisQ557/vet-care-website
   ```
2. Open `index.html` in your browser. No build step or dependencies needed — it's pure HTML/CSS/JS with Bootstrap CDN.

---

## 📝 Sign in Instructions

- **Sign in using the email:** `eve.holt@reqres.in`
- **A nickname is required** when signing in or registering. This is because the Reqres API does not check passwords, so appointments are stored locally and filtered by nickname for demo purposes.

---

## 🎨 Customization

- Update text in `.html` files for your own content
- Add or change images in `assets/images/`
- Adjust layout/colors in `assets/css/styles.css`
- Extend features by editing or adding JS in `assets/js/`

---

## 🧪 Testing & Validation

For full testing documentation including HTML/CSS/JS validation, Lighthouse audits, feature testing, responsiveness, browser compatibility, and accessibility — see the dedicated **[TESTING.md](TESTING.md)** file.

---

## 🚦 Known Issues & Limitations

- All users must use the same email to register/sign in (Reqres API limitation)
- User-specific appointments are filtered by a frontend-only “nickname” field
- Anyone with the shared email and any password accepted by Reqres can sign in
- Nickname-based filtering is for demo purposes only and not secure

---

## 📬 Contact

Built with care by Christopher Quinones.

For suggestions, feature requests, or bug reports, open an issue or contact:  
517996@waes.ac.uk

---

## 🙌 Acknowledgements

- Bootstrap 5
- favicon.io
- pexels.com and unsplash.com for demo images
- [MicroModal](https://micromodal.vercel.app/) for accessible modals
