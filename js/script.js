(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  function updateScrollState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  if (toggle && header && nav) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("[data-campaign-image]").forEach(function (image) {
    var media = image.closest("[data-campaign-media]");
    var placeholder = media ? media.querySelector("[data-campaign-placeholder]") : null;

    function revealCampaignImage() {
      image.hidden = false;
      if (placeholder) placeholder.hidden = true;
    }

    if (image.complete && image.naturalWidth > 0) {
      revealCampaignImage();
    } else {
      image.addEventListener("load", revealCampaignImage, { once: true });
    }
  });
})();
