# Checklist de publicação

- [ ] Repositório contém `index.html`, `styles/`, `scripts/`, `api/`, `vercel.json`, `package.json` e `tests/`.
- [ ] `npm test` passa.
- [ ] `GEMINI_API_KEY` foi adicionada somente nas variáveis de ambiente da Vercel.
- [ ] Novo deploy concluído na Vercel.
- [ ] Página inicial, abas, menu responsivo e animações testados.
- [ ] J.A.R.V.I.S. testado com pergunta válida e com variável ausente/erro de API.
- [ ] Nenhuma chave secreta ou arquivo `.env` foi enviado ao GitHub.

GitHub Pages sozinho não executa a função `api/chat.js`; use a integração GitHub + Vercel para manter o chat.
