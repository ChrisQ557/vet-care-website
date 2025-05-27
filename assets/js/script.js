/* Javascript added to test book form layout */
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const forms = document.querySelectorAll('.book-form');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-service');

            // Update tab buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show the correct form
            forms.forEach(form => {
                if (form.id === `form-${target}`) {
                    form.classList.add('active');
                    form.classList.remove('d-none');
                } else {
                    form.classList.remove('active');
                    form.classList.add('d-none');
                }
            });
        });
    });
});

// Scroll to top button
const scrollBtn = document.getElementById("scrollTopBtn");
window.onscroll = () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
};
scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

