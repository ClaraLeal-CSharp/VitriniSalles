/** Controla somente a abertura visual do menu em telas pequenas. */
export function initializeNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");

  if (!toggle || !navigation) return;

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("site-nav--open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("site-nav--open", !isOpen);
  });

  navigation
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));
}
