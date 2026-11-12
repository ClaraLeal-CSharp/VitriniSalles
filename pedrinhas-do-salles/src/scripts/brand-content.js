import { brand } from "../data/brand.js";
import { contact } from "../data/contact.js";

export const generalWhatsappMessage =
  "Olá! Conheci a Pedrinhas do Salles pelo site e gostaria de saber mais sobre os produtos.";

/** Gera links wa.me com a mensagem preservada para WhatsApp Web e mobile. */
export function createWhatsappLink(message) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

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

  document.querySelectorAll('[data-contact-label="whatsapp"]').forEach((element) => {
    element.textContent = "Fale pelo WhatsApp";
  });
  document.querySelectorAll('[data-contact-link="whatsapp"]').forEach((element) => {
    element.href = createWhatsappLink(generalWhatsappMessage);
  });
  document.querySelectorAll('[data-contact-label="instagram"]').forEach((element) => {
    element.textContent = contact.instagramLabel;
  });
  document.querySelectorAll('[data-contact-link="instagram"]').forEach((element) => {
    element.href = contact.instagramUrl;
  });
}
