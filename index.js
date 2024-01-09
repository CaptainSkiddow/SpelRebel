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

    // Function to convert vh to pixels
    function vhToPixels(vh) {
        return vh * document.documentElement.clientHeight / 100;
    }

    // Function to calculate height based on scroll position
    function calculateHeight(initialHeightVh, scrollPos, rate, maxHeightVh) {
        const initialHeightPx = vhToPixels(initialHeightVh);
        const maxHeightPx = vhToPixels(maxHeightVh);
        const height = initialHeightPx + scrollPos * rate;
        return Math.min(height, maxHeightPx);
    }

    // New function to apply transformations
    function applyTransformations() {
        const scrollPos = window.scrollY;

        // Custom settings for each image
        const imageSettings = [
            // Sunset
            { initialScale: 1, scaleRate: 0, maxScale: 1, initialTranslateY: 0, translateYRate: 0, customTransform: '' },
            // Sun
            { initialScale: 0.8, scaleRate: 0.2, maxScale: 12, initialTranslateY: 0, translateYRate: 0.5, customTransform: '' },
            // Water/reflection
            { initialScale: 1, scaleRate: 0, maxScale: 1, initialTranslateY: 0, translateYRate: 10, customTransform: '' },
            // Yoga+Beach
            { initialScale: 1, scaleRate: 0.5, maxScale: 35, initialTranslateY: 0, translateYRate: 0, customTransform: 'translate(0%, 27%)' },
        ];

        // Additional settings for img1 height change
        const img1HeightSettings = {
            initialHeight: 54,
            heightRate: 10,
            maxHeight: 100
        };

        // Flag to check if all images are fully scaled
        let allImagesFullyScaled = true;

        // Apply scale, translation, custom transform, and height change to each image
        imageSettings.forEach((settings, index) => {
            const imgScale = calculateScale(settings.initialScale, scrollPos, settings.scaleRate, settings.maxScale);
            const imgTranslate = calculateTranslation(settings.initialTranslateY, scrollPos, settings.translateYRate);
            const img = document.getElementById(`img${index + 1}`);

            // Check if the image is not fully scaled
            if (imgScale < settings.maxScale) {
                allImagesFullyScaled = false;
            }

            // Combine new transformations with custom ones
            let transformStyles = `scale(${imgScale})`;
            if (settings.translateYRate !== 0) {
                transformStyles += ` translateY(${imgTranslate}px)`;
            }
            transformStyles += ' ' + settings.customTransform;
            img.style.transform = transformStyles;

            // Apply height change to img1
            if (index === 0) {
                const imgHeight = calculateHeight(img1HeightSettings.initialHeight, scrollPos, img1HeightSettings.heightRate, img1HeightSettings.maxHeight);
                img.style.height = `${imgHeight}px`;
            }

            // Set opacity to 0 if all images are fully scaled
            if (allImagesFullyScaled) {
                imageSettings.forEach((_, index) => {
                    const img = document.getElementById(`img${index + 1}`);
                    img.style.opacity = '0';
                });
            } else {
                // Reset opacity if not all images are fully scaled
                imageSettings.forEach((_, index) => {
                    const img = document.getElementById(`img${index + 1}`);
                    img.style.opacity = '';
                    
                    // Specific code for fading out the third image
                    if (index === 2) { // img3 is the third image (index 2)
                        const img = document.getElementById(`img${index + 1}`);
                        img.style.opacity = imgScale >= settings.maxScale ? '0' : '';
                    }
                });
            }
        });

        // Change the color of the <a> tags in the menu
        const menuItems = document.querySelectorAll('#header .menu ul .item a');
        const logo = document.querySelector('#header .logo h1');
        if (allImagesFullyScaled) {
            menuItems.forEach(item => {
                item.style.color = '#000'; // Replace 'newColor' with your desired color when zoom is complete
            });
            logo.style.top = '0px';
            logo.style.color = '#000';
        } else {
            menuItems.forEach(item => {
                item.style.color = '#fff'; // Replace 'originalColor' with the original color
            });
            logo.style.top = '80px';
            logo.style.color = '#fff';
        }
    }

    // Call the function immediately to apply transformations on page load
    applyTransformations();

    // Scroll event listener
    window.addEventListener('scroll', applyTransformations);

    // Open overlay
    document.querySelectorAll('.open-overlay').forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            var targetId = event.currentTarget.getAttribute('data-target');
            document.getElementById(targetId).style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling on the main body
        });
    });

    // Close overlay
    document.querySelectorAll('.close-overlay').forEach(button => {
        button.addEventListener('click', function() {
            this.parentElement.parentElement.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling on the main body
        });
    });

});
