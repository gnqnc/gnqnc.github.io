// AOS Initialization
AOS.init({
    duration: 200,
    once: true,
    offset: 100
});

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-banner');
    const rate = scrolled * -0.8;
    hero.style.transform = `translateY(${rate}px)`;
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cta-form');
    const thankYou = document.getElementById('thank-you-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' } // This line prevents redirect
        })
        .then(response => {
            if (response.ok) {
                form.style.display = 'none';
                thankYou.classList.remove('d-none');
            } else {
                alert('Error—try again or email directly.');
            }
        })
        .catch(() => alert('Network error—check connection.'));
    });
});