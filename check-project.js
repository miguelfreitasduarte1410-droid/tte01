const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const required = [
  'index.html', 'styles/main.css', 'scripts/main.js', 'api/chat.js',
  'vercel.json', 'package.json', 'README.md'
];
const errors = [];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Arquivo obrigatório ausente: ${file}`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const ref of ['styles/main.css', 'scripts/main.js']) {
  if (!html.includes(ref)) errors.push(`index.html não referencia ${ref}`);
}
for (const id of ['tte-loader','page-inicio','page-empresa','page-produtos','page-ajuda','nav','menuBtn','tte-ai-launcher','tte-ai-panel','tte-ai-close','tte-ai-form','tte-ai-input','tte-ai-messages','tte-ai-send']) {
  const count = (html.match(new RegExp(`id=["']${id}["']`, 'g')) || []).length;
  if (count !== 1) errors.push(`ID esperado uma vez (${id}), encontrado ${count}`);
}
if (!html.includes('J.A.R.V.I.S.')) errors.push('Nome J.A.R.V.I.S. não encontrado no HTML');
const api = fs.readFileSync(path.join(root, 'api/chat.js'), 'utf8');
if (!api.includes('process.env.GEMINI_API_KEY')) errors.push('A API não lê GEMINI_API_KEY do ambiente');
if (html.includes('AIzaSy') || /GEMINI_API_KEY\s*[:=]\s*["'][^"']+/.test(html)) errors.push('Possível chave de API exposta no HTML');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Verificação estrutural concluída: arquivos, referências, IDs e proteção básica da chave OK.');
