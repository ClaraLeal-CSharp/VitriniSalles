import { brand } from "../data/brand.js";
import { contact } from "../data/contact.js";

export const generalWhatsappMessage =
  "Olá! Conheci a Pedrinhas do Salles pelo site e gostaria de saber mais sobre os produtos.";

/** Gera links wa.me com a mensagem preservada para WhatsApp Web e mobile. */
export function createWhatsappLink(message) {
  if (!contact.whatsappNumber) return "";
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function setExternalLink(element, url) {
  if (!url) {
    element.removeAttribute("href");
    element.setAttribute("aria-disabled", "true");
    element.classList.add("is-unavailable");
    return;
  }

  element.href = url;
  element.target = "_blank";
  element.rel = "noopener noreferrer";
}

/** Aplica os dados institucionais nos pontos declarados do HTML. */
export function applyBrandContent() {
  document.documentElement.lang = brand.locale;
  document.title = brand.pageTitle;

  document.querySelectorAll("[data-brand-name]").forEach((element) => {
    element.textContent = brand.name;
  });

  document.querySelectorAll("[data-brand-description]").forEach((element) => {
    element.textContent = brand.description;
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  document.querySelectorAll('[data-contact-label="whatsapp"]').forEach((element) => {
    element.textContent = contact.whatsappNumber ? "Fale pelo WhatsApp" : "Canal em configuração";
  });
  document.querySelectorAll('[data-contact-link="whatsapp"]').forEach((element) => {
    setExternalLink(element, createWhatsappLink(generalWhatsappMessage));
  });
  document.querySelectorAll('[data-contact-label="instagram"]').forEach((element) => {
    element.textContent = contact.instagramLabel;
  });
  document.querySelectorAll('[data-contact-link="instagram"]').forEach((element) => {
    setExternalLink(element, contact.instagramUrl);
  });
}
