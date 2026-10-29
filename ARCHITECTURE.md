# Arquitetura modular

- `styles/`: identidade visual e animações CSS.
- `scripts/`: comportamento do site no navegador.
- `api/`: código executado no servidor.
- `assets/`: destino futuro para imagens, ícones e recursos estáticos.
- `pages/` e `products/`: reservados para separar páginas e fichas de produtos quando isso for feito sem duplicar ou perder conteúdo.
- `docs/`: destino para base de conhecimento e documentação do projeto.

A reorganização foi feita por etapas: CSS e JavaScript foram externalizados, preservando o HTML e as imagens embutidas para reduzir risco de regressões.
