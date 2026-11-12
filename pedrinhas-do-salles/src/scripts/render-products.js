import { products } from "../data/products.js";

const categories = ["Todos", "Colares", "Pingentes", "Conjuntos", "Outros"];
const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function createImage(source, alt, className) {
  const image = document.createElement("img");
  image.className = className;
  image.src = source;
  image.alt = alt;
  image.width = 1200;
  image.height = 1440;
  image.loading = "lazy";
  return image;
}

function createProductCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";
  article.dataset.category = product.categoria;

  const button = document.createElement("button");
  button.className = "product-card__button";
  button.type = "button";
  button.dataset.productId = product.id;
  button.setAttribute("aria-label", `Ver detalhes de ${product.nome}`);
  button.append(createImage(product.imagens[0], `Fotografia demonstrativa de ${product.nome}`, "product-card__image"));

  const content = document.createElement("span");
  content.className = "product-card__content";
  const heading = document.createElement("span");
  heading.className = "product-card__heading";
  const name = document.createElement("span");
  name.className = "product-card__name";
  name.textContent = product.nome;
  const price = document.createElement("span");
  price.className = "product-card__price";
  price.textContent = currency.format(product.preco);
  heading.append(name, price);
  const description = document.createElement("span");
  description.className = "product-card__description";
  description.textContent = product.descricao;
  content.append(heading, description);
  if (!product.disponivel) {
    const unavailable = document.createElement("span");
    unavailable.className = "product-card__availability";
    unavailable.textContent = "Indisponível";
    content.append(unavailable);
  }
  const detail = document.createElement("span");
  detail.className = "text-link";
  detail.textContent = "Ver detalhes →";
  content.append(detail);
  button.append(content);
  article.append(button);
  return article;
}

/** Cria o catálogo uma vez e atualiza somente a visibilidade ao filtrar. */
export function initializeProductCatalog() {
  const container = document.querySelector("[data-catalog-products]");
  const filterContainer = document.querySelector("[data-catalog-filters]");
  const status = document.querySelector("[data-catalog-status]");
  const modal = document.querySelector("[data-product-modal]");
  if (!container || !filterContainer || !status || !modal) return;

  const productsById = new Map(products.map((product) => [String(product.id), product]));
  const fragment = document.createDocumentFragment();
  products.forEach((product) => fragment.append(createProductCard(product)));
  container.append(fragment);
  categories.forEach((category) => {
    const filter = document.createElement("button");
    filter.className = "catalog-filter";
    filter.type = "button";
    filter.dataset.category = category;
    filter.setAttribute("aria-pressed", String(category === "Todos"));
    filter.textContent = category;
    filterContainer.append(filter);
  });

  const cardElements = [...container.children];
  const updateFilter = (category) => {
    let visibleCount = 0;
    cardElements.forEach((card) => {
      const isVisible = category === "Todos" || card.dataset.category === category;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });
    filterContainer.querySelectorAll("button").forEach((filter) => {
      filter.setAttribute("aria-pressed", String(filter.dataset.category === category));
    });
    status.textContent = `${visibleCount} ${visibleCount === 1 ? "produto encontrado" : "produtos encontrados"}${category === "Todos" ? "" : ` em ${category}`}.`;
  };
  updateFilter("Todos");
  filterContainer.addEventListener("click", (event) => {
    const filter = event.target.closest("button[data-category]");
    if (filter) updateFilter(filter.dataset.category);
  });

  const closeButton = modal.querySelector("[data-modal-close]");
  let trigger = null;
  const setText = (selector, value) => { modal.querySelector(selector).textContent = value; };
  const openModal = (product, opener) => {
    trigger = opener;
    setText("[data-modal-category]", product.categoria);
    setText("[data-modal-name]", product.nome);
    setText("[data-modal-price]", currency.format(product.preco));
    setText("[data-modal-description]", product.descricao);
    setText("[data-modal-materials]", product.materiais.join(", "));
    setText("[data-modal-dimensions]", product.dimensoes);
    setText("[data-modal-availability]", product.disponivel ? "Disponível para consulta" : "Indisponível no momento");
    const gallery = modal.querySelector("[data-modal-gallery]");
    gallery.replaceChildren(...product.imagens.map((image, index) => createImage(image, `Fotografia demonstrativa ${index + 1} de ${product.nome}`, "product-modal__image")));
    modal.showModal();
    closeButton.focus();
  };
  container.addEventListener("click", (event) => {
    const opener = event.target.closest("button[data-product-id]");
    const product = opener && productsById.get(opener.dataset.productId);
    if (product) openModal(product, opener);
  });
  closeButton.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (event) => { if (event.target === modal) modal.close(); });
  modal.addEventListener("close", () => trigger?.focus());
}
