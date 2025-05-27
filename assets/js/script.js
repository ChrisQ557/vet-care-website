/* JavaScript for dynamic form display with tabs */
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const forms = document.querySelectorAll('.book-form');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-service');

            // Update tab buttons
            tabButtons.forEach(btn => btn.classList.remove('is-active'));
            button.classList.add('is-active');

            // Show the correct form
          forms.forEach(form => {
        if (form.id === `form-${target}`) {
          form.classList.remove('d-none');
        } else {
          form.classList.add('d-none');
        }
            });
        });
    });
});



