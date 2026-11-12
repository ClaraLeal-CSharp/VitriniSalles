import { brand } from "../data/brand.js";

/** Aplica os dados institucionais nos pontos declarados do HTML. */
export function applyBrandContent() {
  document.documentElement.lang = brand.locale;
  document.title = brand.name;

  document.querySelectorAll("[data-brand-name]").forEach((element) => {
    element.textContent = brand.name;
  });

  document.querySelectorAll("[data-brand-description]").forEach((element) => {
    element.textContent = brand.description;
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  Object.entries(brand.contact).forEach(([channel, contact]) => {
    document
      .querySelectorAll(`[data-contact-label="${channel}"]`)
      .forEach((element) => {
        element.textContent = contact.label;
      });

    document
      .querySelectorAll(`[data-contact-link="${channel}"]`)
      .forEach((element) => {
        element.href = contact.href;
      });
  });
}
