// function preventHorizontalScroll() {
//     const body = document.body;
//     if (body.scrollWidth > window.innerWidth) {
//         body.style.overflowX = 'hidden';
//     } else {
//         body.style.overflowX = 'auto';
//     }
// }


// document.querySelectorAll('*').forEach(el => {
//     console.log(el.tagName, el.scrollWidth, el.clientWidth);
// });

// // Check on load and resize
// window.addEventListener('load', preventHorizontalScroll);
// window.addEventListener('resize', preventHorizontalScroll);



document.addEventListener('DOMContentLoaded', function() {
    const ham = document.getElementById('menu-btn');
    const menu = document.querySelector('.nav-links');

    ham.addEventListener('click', function() {
        // Check the current display style and toggle it
        if (menu.style.display === 'flex') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'flex';
        }
    });

    // Close the menu when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && event.target !== ham) {
            menu.style.display = 'none';
        }
    });

    // Close the menu when the window is resized
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menu.style.display = 'none';
        }
    });

    // STICKY SCROLLING
    const navContainer = document.querySelector('.navigation');

    window.addEventListener('scroll', function() {
        const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        if (scrollPercentage > 0.01) {
            navContainer.style.backgroundColor = 'white';
            navContainer.style.borderBottom = '1px solid #ccc';
            navContainer.style.transition = 'background ease-in-out 200ms';
        } else {
            navContainer.style.backgroundColor = 'transparent';
            navContainer.style.borderBottom = 'none';
        }
    });
});


 /****************** HERO SLIDER JS *************/
 document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 8000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        mousewheel: {
            invert: false, // Change to true if you want to invert the scroll direction
        },
        grabCursor: true, // Enable grab cursor on hover
        on: {
            mouseenter: function () {
                this.autoplay.stop();
            },
            mouseleave: function () {
                this.autoplay.start();
            },
            slideChange: function () {
                const blockquote = this.slides[this.activeIndex].querySelector('blockquote');
                if (blockquote) {
                    blockquote.style.animation = 'none'; // Reset animation
                    blockquote.offsetHeight; // Trigger reflow
                    blockquote.style.animation = ''; // Reapply animation
                }
            },
        },
    });
});

// TYPED JS CODE //
// var typed = new Typed('#element', {
//     strings: ['<i>Mix</i> &amp;', ' Mastering'],
//     typeSpeed: 50,
//   });

