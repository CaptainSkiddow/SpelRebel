document.addEventListener('DOMContentLoaded', () => {
    // Function to calculate dynamic height based on scroll position
    function calculateHeight(initialHeight, scrollPos, maxScroll, maxHeight) {
        if (scrollPos >= maxScroll) return maxHeight;
        const heightRange = maxHeight - initialHeight;
        const heightProgress = scrollPos / maxScroll;
        return initialHeight + (heightRange * heightProgress);
    }
    
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
        const windowHeight = window.innerHeight;

        // Custom settings for the sunset background
        const initialHeight = 380; // Example initial height, adjust as needed
        const maxHeight = windowHeight; // Full viewport height

        // Calculate and set the height of the sunset background
        const backgroundHeight = calculateHeight(initialHeight, scrollPos, 10, maxHeight);
        document.getElementById('img1').style.height = `${backgroundHeight}px`;

        // Custom settings for each image (initial scale, scale rate, max scale, initial translateY, translateY rate)
        const imageSettings = [
            // Sunset
            { initialScale: 1, scaleRate: 0, maxScale: 1, initialTranslateY: 0, translateYRate: 0 },
            // Sun
            { initialScale: 0.5, scaleRate: 0.05, maxScale: 5, initialTranslateY: -10, translateYRate: 0.5 },
            // Water/reflection
            { initialScale: 1, scaleRate: 0, maxScale: 1, initialTranslateY: -100, translateYRate: 12 },
            // Yoga
            { initialScale: 0.4, scaleRate: 0.07, maxScale: 6, initialTranslateY: 0, translateYRate: 0.5 },
            // Beach
            { initialScale: 1, scaleRate: 0, maxScale: 1, initialTranslateY: 80, translateYRate: 24 }
        ];

        // Apply scale and translation to each image
        imageSettings.forEach((settings, index) => {
            const imgScale = calculateScale(settings.initialScale, scrollPos, settings.scaleRate, settings.maxScale);
            const imgTranslate = calculateTranslation(settings.initialTranslateY, scrollPos, settings.translateYRate);
            document.getElementById(`img${index + 1}`).style.transform = `scale(${imgScale}) translateY(${imgTranslate}px)`;
        });
    });
});