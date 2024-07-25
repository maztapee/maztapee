document.addEventListener('DOMContentLoaded', () => {
    const carousels = [
        { 
            container: document.querySelector('.events-section:nth-child(1) .event-list'),
            cards: document.querySelectorAll('.events-section:nth-child(1) .event-item'),
            prevBtn: document.getElementById('prevBtnUpcoming'),
            nextBtn: document.getElementById('nextBtnUpcoming')
        },
        { 
            container: document.querySelector('.events-section:nth-child(2) .event-list'),
            cards: document.querySelectorAll('.events-section:nth-child(2) .event-item'),
            prevBtn: document.getElementById('prevBtnOngoing'),
            nextBtn: document.getElementById('nextBtnOngoing')
        },
        { 
            container: document.querySelector('.events-section:nth-child(3) .event-list'),
            cards: document.querySelectorAll('.events-section:nth-child(3) .event-item'),
            prevBtn: document.getElementById('prevBtnPast'),
            nextBtn: document.getElementById('nextBtnPast')
        }
    ];

    carousels.forEach(carousel => {
        const { container, cards, prevBtn, nextBtn } = carousel;

        if (cards.length === 0) return;

        let currentIndex = 0;
        const itemsToShow = 3;
        const cardWidth = cards[0].offsetWidth + 10; // Adjust 10px if different margin

        function updateButtons() {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= cards.length - itemsToShow;
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex -= 1;
                container.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            }
            updateButtons();
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - itemsToShow) {
                currentIndex += 1;
                container.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            }
            updateButtons();
        });

        updateButtons();
    });
});
