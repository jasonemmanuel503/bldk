document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.mySwiper', {
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
          invert: false,
      },
      grabCursor: true,
      on: {
          mouseenter: function () {
              this.autoplay.stop(); // Stop autoplay on mouse enter
          },
          mouseleave: function () {
              this.autoplay.start(); // Start autoplay on mouse leave
          }
      },
  });
});