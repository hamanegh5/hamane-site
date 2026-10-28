const bouton = document.querySelector(".menu-bouton");
const menu = document.querySelector("#menu");

function fermerMenu() {
  bouton.setAttribute("aria-expanded", "false");
  bouton.setAttribute("aria-label", "Ouvrir le menu");
  menu.classList.remove("ouvert");
}

function definirMenu(ouvert) {
  bouton.setAttribute("aria-expanded", String(ouvert));
  bouton.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
  menu.classList.toggle("ouvert", ouvert);
}

bouton.addEventListener("click", () => {
  const ouvert = bouton.getAttribute("aria-expanded") === "true";
  definirMenu(!ouvert);
});

menu.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    fermerMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && bouton.getAttribute("aria-expanded") === "true") {
    fermerMenu();
    bouton.focus();
  }
});

document.addEventListener("click", (event) => {
  if (bouton.getAttribute("aria-expanded") === "true"
    && !menu.contains(event.target)
    && !bouton.contains(event.target)) {
    fermerMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    fermerMenu();
  }
});

const year = document.querySelector("#current-year");
year.textContent = String(new Date().getFullYear());

const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Merci. Ce formulaire n’est pas encore connecté à un service d’envoi ; votre message n’a pas été transmis.";
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".site-nav a");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${entry.target.id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}