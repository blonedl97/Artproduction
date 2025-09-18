// js/faq.js
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const icon = item.querySelector(".faq-icon i");

    item.addEventListener("click", () => {
      // ferme les autres
      faqItems.forEach(el => {
        if (el !== item) {
          el.classList.remove("active");
          el.querySelector(".faq-icon i").classList.replace("fa-minus", "fa-plus");
        }
      });

      // toggle celui cliqué
      item.classList.toggle("active");

      if (item.classList.contains("active")) {
        icon.classList.replace("fa-plus", "fa-minus");
      } else {
        icon.classList.replace("fa-minus", "fa-plus");
      }
    });
  });
});
