# Pedrinhas do Salles

Site institucional com catálogo de produtos, sacola de interesses e encaminhamento de consultas pelo WhatsApp. O código do site está em [`pedrinhas-do-salles`](./pedrinhas-do-salles).

## Tecnologias

- HTML, CSS e JavaScript sem frameworks
- [Vite](https://vite.dev/) para desenvolvimento e build estático

## Executar localmente

```bash
cd pedrinhas-do-salles
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

O resultado fica em `pedrinhas-do-salles/dist`.

## Conteúdo e imagens

- Cadastre ou edite os produtos em [`src/data/products.js`](./pedrinhas-do-salles/src/data/products.js). Cada item aceita nome, categoria, preço, descrição, materiais, dimensões, disponibilidade e uma ou mais imagens.
- Altere o WhatsApp e Instagram em [`src/data/contact.js`](./pedrinhas-do-salles/src/data/contact.js). O WhatsApp deve conter somente país e número, sem `+`, espaços ou pontuação. Enquanto os campos estiverem vazios, os links ficam desativados para evitar encaminhamento a dados provisórios.
- Ajuste nome, título e descrição institucional em [`src/data/brand.js`](./pedrinhas-do-salles/src/data/brand.js).
- Substitua as URLs demonstrativas de `imagens` em `src/data/products.js` por imagens próprias. As pastas [`public/images/produtos`](./pedrinhas-do-salles/public/images/produtos) e [`public/images/banners`](./pedrinhas-do-salles/public/images/banners) estão reservadas para arquivos locais; ao usar uma imagem nelas, informe o caminho como `/images/produtos/nome-do-arquivo.webp`.
- Atualize também os textos provisórios no bloco “Sobre” de [`index.html`](./pedrinhas-do-salles/index.html) antes de publicar.

## Vercel

O projeto já inclui [`vercel.json`](./pedrinhas-do-salles/vercel.json). Na criação do projeto na Vercel, selecione `pedrinhas-do-salles` como **Root Directory**. A Vercel executará `npm run build` e publicará a pasta `dist`.

## Antes de publicar

O código está preparado para publicação, mas os produtos, imagens, canais de contato e o texto institucional atuais são demonstrativos ou ainda não foram fornecidos. Cadastre os dados oficiais acima antes de colocar o site no ar.
