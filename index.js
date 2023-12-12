document.addEventListener('DOMContentLoaded', () => {
    // Function to calculate translation based on scroll position
    function calculateTranslation(initialTranslateY, scrollPos, rate) {
        return initialTranslateY + scrollPos * rate;
    }

    // Function to calculate scale based on scroll position
    function calculateScale(initialScale, scrollPos, rate, maxScale) {
        const scale = initialScale + scrollPos * rate;
        return Math.min(scale, maxScale);
    }

    // Scroll event listener
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Custom settings for each image (initial scale, scale rate, max scale, initial translateY, translateY rate)
        const imageSettings = [
            // Sunset
            { initialScale: 1, scaleRate: 0.0005, maxScale: 1, initialTranslateY: 0, translateYRate: 0.2 },
            // Sun
            { initialScale: 0.5, scaleRate: 0.001, maxScale: 1.3, initialTranslateY: -10, translateYRate: 0.5 },
            // Water/reflection
            { initialScale: 1, scaleRate: 0.001, maxScale: 1, initialTranslateY: -100, translateYRate: 0.5 },
            // Yoga
            { initialScale: 0.4, scaleRate: 0.1, maxScale: 6, initialTranslateY: 0, translateYRate: 0.5 },
            // Beach
            { initialScale: 1, scaleRate: 0, maxScale: 1, initialTranslateY: 80, translateYRate: 2 }
        ];

        // Apply scale and translation to each image
        imageSettings.forEach((settings, index) => {
            const imgScale = calculateScale(settings.initialScale, scrollPos, settings.scaleRate, settings.maxScale);
            const imgTranslate = calculateTranslation(settings.initialTranslateY, scrollPos, settings.translateYRate);
            document.getElementById(`img${index + 1}`).style.transform = `scale(${imgScale}) translateY(${imgTranslate}px)`;
        });
    });
});
