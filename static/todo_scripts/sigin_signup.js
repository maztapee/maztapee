
document.getElementById('sign-up-button').addEventListener('click', function() {
    var signIn = document.getElementById('sign-in');
    var signUp = document.getElementById('sign-up');
    var options = document.getElementById('login-options');
    
    // Animate sign-in form hiding
    signIn.style.opacity = '0';
    options.style.opacity = '0';
    signIn.style.transform = 'scale(0.9)';
    options.style.transform = 'scale(0.9)';
    
    setTimeout(function() {
        signIn.style.display = 'none';
        options.style.display = 'none';
        signUp.style.display = 'block';
        setTimeout(function() {
            signUp.style.opacity = '1';
            signUp.style.transform = 'scale(1)';
        }, 20);
    }, 500); // Wait for the opacity and transform animation to finish
});

document.getElementById('cancel-button').addEventListener('click', function() {
    var signIn = document.getElementById('sign-in');
    var signUp = document.getElementById('sign-up');
    var options = document.getElementById('login-options');
    
    // Animate sign-up form hiding
    signUp.style.opacity = '0';
    signUp.style.transform = 'scale(0.9)';
    
    setTimeout(function() {
        signUp.style.display = 'none';
        signIn.style.display = 'block';
        options.style.display = 'flex';
        setTimeout(function() {
            signIn.style.opacity = '1';
            options.style.opacity = '1';
            signIn.style.transform = 'scale(1)';
            options.style.transform = 'scale(1)';
            options.classList.add('login-options');
        }, 20);
    }, 500); // Wait for the opacity and transform animation to finish
});

document.querySelectorAll('.login-options img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerText = this.alt;
        document.body.appendChild(tooltip);

        const rect = this.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight}px`;

        // Trigger the transition
        requestAnimationFrame(() => {
            tooltip.classList.add('show');
        });
    });

    img.addEventListener('mouseleave', function() {
        const tooltip = document.querySelector('.tooltip');
        tooltip.classList.remove('show');
        // Remove the tooltip after the transition ends
        tooltip.addEventListener('transitionend', () => tooltip.remove());
    });
});