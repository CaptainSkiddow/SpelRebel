gsap.registerPlugin(ScrollTrigger);


let sections = gsap.utils.toArray(".panel");


gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: ".container",
        pin: true,
        scrub: 0.1,
        end: () => "+=" + document.querySelector(".container").offsetWidth
    }
});

$(function () {
    $(".outer").mousemove(function (e) {
        // This function is triggered when the mouse moves over an element with the class "outer"

        // Cache references to relevant elements
        var outer = $(this);
        var cursor = outer.find(".cursor");
        var inner = outer.find(".inner");

        // Calculate the position of the cursor relative to the "outer" element
        var left = e.pageX - outer.offset().left - cursor.outerWidth() / 2;
        var top = e.pageY - outer.offset().top - cursor.outerHeight() / 2;

        // Ensure the cursor stays within the bounds of the "outer" element
        if (left < 0) {
            left = 0;
        }
        if (top < 0) {
            top = 0;
        }
        if (left + cursor.outerWidth() > outer.outerWidth()) {
            left = outer.outerWidth() - cursor.outerWidth();
        }
        if (top + cursor.outerHeight() > outer.outerHeight()) {
            top = outer.outerHeight() - cursor.outerHeight();
        }

        // Set the position of the cursor and adjust the position of the "inner" element
        cursor.show().css({ left: left, top: top });
        inner.css({ left: -left, top: -top });
    }).mouseleave(function () {
        // This function is triggered when the mouse leaves the "outer" element
        $(this).find(".cursor").hide();
    });
});



