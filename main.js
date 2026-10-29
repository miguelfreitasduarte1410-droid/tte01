const PAGE_NAMES = ['inicio', 'empresa', 'produtos', 'ajuda'];

function showPage(name) {
  if (!PAGE_NAMES.includes(name)) return;
  PAGE_NAMES.forEach((page) => {
    const section = document.getElementById(`page-${page}`);
    if (section) section.classList.toggle('active', page === name);
  });
  document.querySelectorAll('[data-page]').forEach((element) => {
    const isActive = element.dataset.page === name;
    element.classList.toggle('active', isActive && element.tagName === 'BUTTON');
  });
  document.getElementById('nav')?.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-page]').forEach((element) => {
  element.addEventListener('click', (event) => {
    if (element.tagName === 'A') event.preventDefault();
    showPage(element.dataset.page);
  });
});

document.getElementById('menuBtn')?.addEventListener('click', () => {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const open = nav.classList.toggle('open');
  document.getElementById('menuBtn')?.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('[data-expand]').forEach((button) => {
  button.addEventListener('click', () => {
    const panel = document.getElementById(`more-${button.dataset.expand}`);
    if (!panel) return;
    const open = panel.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'Mostrar menos ↑' : 'Ver mais detalhes ↓';
  });
});

// Loader da T.T.E: mantém a duração visual em 2,5 segundos.
(() => {
  const loader = document.getElementById('tte-loader');
  if (!loader) {
    document.body.classList.remove('loading');
    return;
  }
  const startedAt = Date.now();
  const finish = () => {
    const remaining = Math.max(0, 2500 - (Date.now() - startedAt));
    window.setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
      window.setTimeout(() => loader.remove(), 700);
    }, remaining);
  };
  if (document.readyState === 'complete') finish();
  else window.addEventListener('load', finish, { once: true });
})();

// Interface J.A.R.V.I.S. O segredo da API permanece exclusivamente no servidor.
(() => {
  const launcher = document.getElementById('tte-ai-launcher');
  const panel = document.getElementById('tte-ai-panel');
  const closeButton = document.getElementById('tte-ai-close');
  const form = document.getElementById('tte-ai-form');
  const input = document.getElementById('tte-ai-input');
  const messages = document.getElementById('tte-ai-messages');
  const sendButton = document.getElementById('tte-ai-send');
  if (!launcher || !panel || !closeButton || !form || !input || !messages || !sendButton) return;

  const togglePanel = (open) => {
    panel.classList.toggle('open', open);
    launcher.setAttribute('aria-expanded', String(open));
    if (open) window.setTimeout(() => input.focus(), 60);
    else launcher.focus();
  };
  launcher.addEventListener('click', () => togglePanel(!panel.classList.contains('open')));
  closeButton.addEventListener('click', () => togglePanel(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && panel.classList.contains('open')) togglePanel(false);
  });

  function addMessage(text, role) {
    const element = document.createElement('div');
    element.className = `tte-ai-msg ${role}`;
    element.textContent = text;
    messages.appendChild(element);
    messages.scrollTop = messages.scrollHeight;
    return element;
  }

  async function revealText(element, text) {
    element.textContent = '';
    const chunkSize = 4;
    for (let index = 0; index < text.length; index += chunkSize) {
      element.textContent += text.slice(index, index + chunkSize);
      messages.scrollTop = messages.scrollHeight;
      await new Promise((resolve) => window.setTimeout(resolve, 12));
    }
  }

  async function ask(question) {
    const value = String(question || '').trim();
    if (!value || sendButton.disabled) return;
    if (window.location.protocol === 'file:') {
      addMessage('Para usar J.A.R.V.I.S., publique o projeto na Vercel ou execute-o por um servidor local. Abrir o HTML diretamente não disponibiliza a API /api/chat.', 'bot');
      return;
    }
    addMessage(value, 'user');
    input.value = '';
    input.style.height = 'auto';
    sendButton.disabled = true;
    input.disabled = true;
    const responseMessage = addMessage('J.A.R.V.I.S. está analisando…', 'bot');
    responseMessage.classList.add('jarvis-thinking');
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: value })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || `Erro do servidor (${response.status}).`);
      const answer = typeof data.answer === 'string' && data.answer.trim()
        ? data.answer.trim()
        : 'Não encontrei uma resposta para essa pergunta no conteúdo do projeto.';
      responseMessage.classList.remove('jarvis-thinking');
      await revealText(responseMessage, answer);
    } catch (error) {
      responseMessage.classList.remove('jarvis-thinking');
      responseMessage.textContent = `Não consegui conectar ao servidor da IA. ${error.message || 'Tente novamente em instantes.'}`;
    } finally {
      sendButton.disabled = false;
      input.disabled = false;
      messages.scrollTop = messages.scrollHeight;
      input.focus();
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    ask(input.value);
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 100)}px`;
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });
  document.querySelectorAll('.tte-ai-suggest').forEach((button) => {
    button.addEventListener('click', () => ask(button.textContent));
  });
})();
