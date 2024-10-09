window.addEventListener('load', function() {
  var footer = document.querySelector('.footer-container');
  var footerHeight = footer.offsetHeight;
  var windowHeight = window.innerHeight;
  var bodyHeight = document.body.offsetHeight;

  if (windowHeight >= bodyHeight) {
    footer.classList.add('sticky-footer');
  } else {
    footer.classList.remove('sticky-footer');
  }
});

window.addEventListener('scroll', function() {
  var footer = document.querySelector('.footer-container');
  var footerHeight = footer.offsetHeight;
  var windowHeight = window.innerHeight;
  var bodyHeight = document.body.offsetHeight;
  var scrollPosition = window.scrollY;

  if (windowHeight + scrollPosition >= bodyHeight) {
    footer.classList.add('sticky-footer');
  } else {
    footer.classList.remove('sticky-footer');
  }
});