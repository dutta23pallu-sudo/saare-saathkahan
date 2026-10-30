document.querySelectorAll(".current-year").forEach(el => el.textContent = new Date().getFullYear());
SS.initGeneralWhatsApp();
const menuToggle = document.querySelector(".menu-toggle");
if (menuToggle) menuToggle.addEventListener("click", () => {
  const nav = document.querySelector(".nav-links"); const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});