/*
 * Interactive Video Scenario — full-screen immersive dialogue
 * Video fills the screen. Subtitles overlay on video.
 * Chat-style input bar at bottom with mic button (like ChatGPT/Claude).
 */

const Scenario = (() => {
  let currentScenario = null;
  let currentNode = null;
  let attempts = 0;
  const MAX_ATTEMPTS = 3;

  function getScenarios() {
    const lang = Language.getCurrent();
    if (lang === 'spanish' && typeof DATA_SCENARIOS_SPANISH !== 'undefined') return DATA_SCENARIOS_SPANISH;
    if (lang === 'russian' && typeof DATA_SCENARIOS_RUSSIAN !== 'undefined') return DATA_SCENARIOS_RUSSIAN;
    return [];
  }

  function renderList(container) {
    const scenarios = getScenarios();

    if (scenarios.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">&#127916;</div>
          <div class="empty-state-text">No scenarios available for this language yet.</div>
        </div>`;
      return;
    }

    container.innerHTML = `
      <h1 class="page-title">Scenarios</h1>
      ${scenarios.map(s => `
        <div class="practice-option" data-scenario-id="${s.id}">
          <div class="practice-option-title">${s.title}</div>
          <div class="practice-option-desc">${s.setting} &middot; ${s.level}</div>
        </div>
      `).join('')}
      <button class="btn btn-ghost" style="margin-top:12px;" onclick="App.navigate('practice')">Back</button>`;

    scenarios.forEach(s => {
      container.querySelector(`[data-scenario-id="${s.id}"]`).addEventListener('click', () => {
        startScenario(s, container);
      });
    });
  }

  function startScenario(scenario, container) {
    currentScenario = scenario;
    attempts = 0;

    // Hide nav, go full-screen immersive
    document.getElementById('nav').style.display = 'none';
    container.classList.add('scenario-fullscreen');

    container.innerHTML = `
      <div class="scenario-screen" id="scenario-screen">
        <div class="scenario-close" id="scenario-close">&times;</div>
        <video class="scenario-fs-video" id="scenario-video" playsinline></video>
        <div class="scenario-fs-fallback" id="scenario-fallback">
          <div class="scenario-avatar">&#128100;</div>
        </div>
        <div class="scenario-fs-subtitle" id="scenario-subtitle"></div>
        <div class="scenario-fs-chatbar" id="scenario-chatbar"></div>
      </div>`;

    document.getElementById('scenario-close').addEventListener('click', () => {
      exitScenario(container);
    });

    currentNode = findNode(scenario.nodes[0].id);
    playNode(currentNode, container);
  }

  function exitScenario(container) {
    document.getElementById('nav').style.display = '';
    container.classList.remove('scenario-fullscreen');
    renderList(container);
  }

  function findNode(id) {
    return currentScenario.nodes.find(n => n.id === id);
  }

  function navigateToNode(nodeId, container) {
    if (!nodeId) {
      showCompletion(container);
      return;
    }
    const node = findNode(nodeId);
    if (!node) {
      showCompletion(container);
      return;
    }
    currentNode = node;
    playNode(node, container);
  }

  function playNode(node, container) {
    if (node.type === 'video') {
      playVideoNode(node, container);
    } else if (node.type === 'input') {
      showChatInput(node, container);
    }
  }

  function playVideoNode(node, container) {
    const video = document.getElementById('scenario-video');
    const fallback = document.getElementById('scenario-fallback');
    const subtitle = document.getElementById('scenario-subtitle');
    const chatbar = document.getElementById('scenario-chatbar');

    // Hide chat bar during video
    if (chatbar) chatbar.innerHTML = '';

    // Update subtitle
    if (subtitle) {
      subtitle.innerHTML = `
        <div class="scenario-sub-target">${node.subtitle || ''}</div>
        ${node.subtitle_en ? `<div class="scenario-sub-en">${node.subtitle_en}</div>` : ''}`;
    }

    if (node.video && video) {
      // Show video, hide fallback
      video.style.display = 'block';
      if (fallback) fallback.style.display = 'none';

      video.src = node.video;
      video.load();

      video.onended = () => {
        // Freeze on last frame — video stays visible
        advanceFromVideo(node, container);
      };

      video.onerror = () => {
        video.style.display = 'none';
        if (fallback) fallback.style.display = 'flex';
        if (node.subtitle && TTS.isEnabled()) TTS.speak(node.subtitle);
        setTimeout(() => advanceFromVideo(node, container), 3000);
      };

      video.play().catch(() => {
        // Autoplay blocked — show tap overlay
        const chatbar = document.getElementById('scenario-chatbar');
        if (chatbar) {
          chatbar.innerHTML = `
            <button class="scenario-tap-play" id="scenario-tap-play">Tap to play</button>`;
          document.getElementById('scenario-tap-play').addEventListener('click', () => {
            video.play();
            chatbar.innerHTML = '';
          });
        }
      });
    } else {
      // No video file — text-only with avatar
      video.style.display = 'none';
      if (fallback) fallback.style.display = 'flex';
      if (node.subtitle && TTS.isEnabled()) TTS.speak(node.subtitle);
      setTimeout(() => advanceFromVideo(node, container), 3000);
    }
  }

  function advanceFromVideo(node, container) {
    if (node.next) {
      navigateToNode(node.next, container);
    } else {
      showCompletion(container);
    }
  }

  function showChatInput(node, container) {
    attempts = 0;
    renderChatBar(node, container);
  }

  function renderChatBar(node, container) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const hasMic = !!SpeechRecognition;
    const chatbar = document.getElementById('scenario-chatbar');
    if (!chatbar) return;

    chatbar.innerHTML = `
      ${node.prompt ? `<div class="scenario-chat-prompt">${node.prompt}</div>` : ''}
      ${attempts > 0 && node.hint ? `<div class="scenario-chat-hint">${node.hint}</div>` : ''}
      <div class="scenario-chat-row">
        <input class="scenario-chat-input" type="text" id="scenario-input" placeholder="Type your response..."
               autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
        <button class="scenario-send-btn" id="scenario-submit">&#10148;</button>
        ${hasMic ? `<button class="scenario-mic-btn" id="scenario-mic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg></button>` : ''}
      </div>
      <div id="scenario-feedback"></div>`;

    chatbar.classList.add('scenario-chatbar-in');
    setTimeout(() => chatbar.classList.remove('scenario-chatbar-in'), 300);

    const input = document.getElementById('scenario-input');
    input.focus();

    const submit = () => {
      const text = input.value.trim();
      if (!text) return;
      checkInput(node, text, container);
    };

    document.getElementById('scenario-submit').addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });

    // Mic
    const micBtn = document.getElementById('scenario-mic');
    if (micBtn && hasMic) {
      micBtn.addEventListener('click', () => {
        const recognition = new SpeechRecognition();
        recognition.lang = Language.getCurrent() === 'russian' ? 'ru-RU' : 'es-ES';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        micBtn.classList.add('recording');

        recognition.onresult = (event) => {
          input.value = event.results[0][0].transcript;
          micBtn.classList.remove('recording');
        };
        recognition.onerror = () => micBtn.classList.remove('recording');
        recognition.onend = () => micBtn.classList.remove('recording');
        recognition.start();
      });
    }
  }

  function checkInput(node, text, container) {
    const normalizedInput = text.toLowerCase().trim();
    const requiredGroups = node.required_keywords || [];
    let allRequired = true;

    for (const group of requiredGroups) {
      const alternatives = group.split('|');
      if (!alternatives.some(kw => normalizedInput.includes(kw.toLowerCase()))) {
        allRequired = false;
        break;
      }
    }

    if (allRequired) {
      navigateToNode(node.success_next, container);
    } else {
      attempts++;
      if (attempts >= MAX_ATTEMPTS) {
        const fb = document.getElementById('scenario-feedback');
        if (fb) {
          fb.innerHTML = `<div class="scenario-model-answer">${node.hint || ''}</div>`;
        }
        setTimeout(() => navigateToNode(node.success_next, container), 2500);
      } else if (node.fail_next) {
        navigateToNode(node.fail_next, container);
      } else {
        renderChatBar(node, container);
      }
    }
  }

  function showCompletion(container) {
    document.getElementById('nav').style.display = '';
    container.classList.remove('scenario-fullscreen');

    container.innerHTML = `
      <div class="card" style="text-align:center;padding:32px 24px;">
        <div style="font-size:48px;margin-bottom:16px;">&#127881;</div>
        <div class="page-title">Scenario Complete!</div>
        <div style="font-size:15px;color:var(--text-secondary);margin-bottom:24px;">
          ${currentScenario.title}
        </div>
        <div style="display:flex;gap:8px;justify-content:center;">
          <button class="btn btn-sm btn-secondary" onclick="Scenario.renderList(document.getElementById('main'))">More Scenarios</button>
          <button class="btn btn-sm" onclick="App.navigate('practice')">Practice</button>
        </div>
      </div>`;
  }

  return { renderList, getScenarios };
})();
