/**
 * Fonte única para os dados institucionais da marca.
 * Novos textos e canais oficiais devem ser centralizados neste objeto.
 */
export const brand = Object.freeze({
  name: "Pedrinhas do Salles",
  tagline: "Acessórios artesanais",
  description: "Acessórios artesanais com pedras, feitos com delicadeza.",
  locale: "pt-BR",
  contact: {
    // Atualize os endereços ao definir os canais oficiais da marca.
    whatsapp: { label: "Fale pelo WhatsApp", href: "#contato" },
    instagram: { label: "@pedrinhasdosalles", href: "#contato" },
  },
});
