window.onload = function () {
  document.addEventListener("DOMContentLoaded", lazy_setup());
};

function lazy_setup() {
  const imgs = document.querySelectorAll("[data-src]");

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        entry.target.classList.remove("lazy");
        observer.unobserve(entry.target);
      }
    });
  }, intersectionObserverOptions);
  imgs.forEach((img) => {
    observer.observe(img);
  });
}

if ("IntersectionObserver" in window) {
  var intersectionObserverOptions = {
    root: null,
    threshold: 0,
  };
} else {
  $(document).scroll(function () {
    processScroll();
  });
}

function processScroll() {
  $("[data-src]").each(function (index) {
    var actual_image = $(this);
    if (elementInViewport(actual_image) && actual_image.hasClass("lazy")) {
      actual_image.target.src = actual_image.target.dataset.src;
      actual_image.target.classList.remove("lazy");
    }
  });
}

function elementInViewport(el) {
  var elementTop = el.offset().top;
  var elementBottom = elementTop + el.outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
}
