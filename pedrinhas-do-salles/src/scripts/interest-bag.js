import { products } from "../data/products.js";
import { createWhatsappLink } from "./brand-content.js";

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** Mantém uma seleção local de produtos; não representa um pedido ou checkout. */
export function initializeInterestBag() {
  const dialog = document.querySelector("[data-interest-bag]");
  const items = document.querySelector("[data-bag-items]");
  const empty = document.querySelector("[data-bag-empty]");
  const total = document.querySelector("[data-bag-total]");
  const send = document.querySelector("[data-bag-send]");
  const countElements = document.querySelectorAll("[data-bag-count]");
  const opener = document.querySelector("[data-bag-open]");
  const closeButton = dialog?.querySelector("[data-bag-close]");
  if (!dialog || !items || !empty || !total || !send || !opener || !closeButton) {
    return { add: () => false };
  }

  const productsById = new Map(products.map((product) => [String(product.id), product]));
  const selectedIds = new Set();
  let previousFocus = null;

  const selectedProducts = () => [...selectedIds].map((id) => productsById.get(id));
  const selectionMessage = () => {
    const selection = selectedProducts();
    const lines = selection.map((product) => `- ${product.nome}: ${currency.format(product.preco)}`);
    const price = selection.reduce((sum, product) => sum + product.preco, 0);
    return [
      "Olá! Conheci a Pedrinhas do Salles pelo site e tenho interesse nestas peças:",
      ...lines,
      `Total estimado: ${currency.format(price)}.`,
      "Gostaria de saber mais sobre elas.",
    ].join("\n");
  };
  const render = () => {
    const selection = selectedProducts();
    items.replaceChildren(...selection.map((product) => {
      const item = document.createElement("li");
      item.className = "interest-bag__item";
      const details = document.createElement("span");
      const name = document.createElement("strong");
      name.textContent = product.nome;
      const price = document.createElement("small");
      price.textContent = currency.format(product.preco);
      details.append(name, price);
      const remove = document.createElement("button");
      remove.type = "button";
      remove.dataset.bagRemove = product.id;
      remove.textContent = "Remover";
      item.append(details, remove);
      return item;
    }));
    const price = selection.reduce((sum, product) => sum + product.preco, 0);
    total.textContent = currency.format(price);
    empty.hidden = selection.length > 0;
    send.hidden = selection.length === 0;
    send.href = createWhatsappLink(selectionMessage());
    countElements.forEach((element) => { element.textContent = selectedIds.size; });
  };
  const add = (productId) => {
    const product = productsById.get(String(productId));
    if (!product || !product.disponivel) return false;
    selectedIds.add(String(product.id));
    render();
    return true;
  };
  const close = () => dialog.close();

  opener.addEventListener("click", () => {
    previousFocus = opener;
    dialog.showModal();
    closeButton.focus();
  });
  closeButton.addEventListener("click", close);
  dialog.addEventListener("click", (event) => { if (event.target === dialog) close(); });
  dialog.addEventListener("close", () => previousFocus?.focus());
  items.addEventListener("click", (event) => {
    const remove = event.target.closest("button[data-bag-remove]");
    if (!remove) return;
    selectedIds.delete(remove.dataset.bagRemove);
    render();
  });
  render();
  return { add };
}
