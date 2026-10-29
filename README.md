# T.T.E — J.A.R.V.I.S.

Site do projeto escolar T.T.E (Technology Transform Education), com interface de assistente chamada J.A.R.V.I.S.

## Estrutura

- `index.html`: conteúdo e estrutura principal; imagens históricas permanecem incorporadas para evitar links quebrados.
- `styles/main.css`: identidade visual, layout, responsividade e animações.
- `scripts/main.js`: navegação, carregamento, interface do chat e exibição progressiva das respostas.
- `api/chat.js`: endpoint serverless que consulta a API Gemini sem expor a chave ao navegador.
- `tests/check-project.js`: verificação básica dos arquivos, referências, IDs e exposição acidental de chave.

## Publicação recomendada: GitHub + Vercel

**O GitHub armazena o código; a Vercel executa o endpoint `/api/chat`.** GitHub Pages sozinho hospeda arquivos estáticos e não executa esta API serverless.

1. Extraia o ZIP e envie todos os arquivos e pastas ao repositório GitHub, preservando a estrutura.
2. Na Vercel, importe esse repositório e use as configurações padrão para um projeto Vercel com `index.html` na raiz.
3. Em **Settings → Environment Variables**, adicione `GEMINI_API_KEY` com a sua chave real, habilitada para Production (e Preview, se quiser testar previews).
4. Faça um novo deploy depois de adicionar ou alterar a variável.
5. Teste o domínio HTTPS: navegação entre abas, layout no celular, abertura/fechamento do J.A.R.V.I.S. e envio de uma pergunta.

Não publique a chave no HTML, no JavaScript do navegador, no README ou no GitHub. O arquivo `.env.example` é apenas ilustrativo e não contém segredo.

## Verificações locais

Requer Node.js 18 ou superior para os comandos de verificação:

```bash
npm test
```

Isso verifica a estrutura, as referências locais, IDs importantes e sintaxe JavaScript. Não testa uma chamada real à Gemini nem substitui um teste de deploy na Vercel.

## Limitações conhecidas

- Abrir `index.html` diretamente pelo explorador (`file://`) permite ver o conteúdo, mas o chat não funcionará: `/api/chat` precisa do runtime da Vercel ou de um servidor local compatível.
- GitHub Pages, isoladamente, não executa `api/chat.js`.
- A exibição progressiva do texto é uma animação no navegador depois que a resposta completa chega; não é streaming real da Gemini.
- O conteúdo do projeto descreve a T.T.E como fictícia e a ideia T.T.E × 360 Tech como conceitual, não como parceria comercial confirmada.
