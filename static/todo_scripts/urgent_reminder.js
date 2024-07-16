document.addEventListener("DOMContentLoaded", () => {
    const text = "Work in PROGRESS";
    const animatedTextContainer = document.getElementById("animated-text");
    
    text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        animatedTextContainer.appendChild(span);
    });
});