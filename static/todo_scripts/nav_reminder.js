document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav#reminders a.general');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            console.log('Link clicked:', this); // Debugging statement
            event.preventDefault();

            navLinks.forEach(link => link.classList.remove('active')); // Remove active class from all links
            this.classList.add('active'); // Add active class to the clicked link
        });
    });
});
