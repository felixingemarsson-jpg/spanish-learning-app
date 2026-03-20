/*
 * Interactive Video Scenario — negotiation of meaning via branching dialogue
 * Plays video clips (or falls back to text), pauses for learner input,
 * checks keywords, and navigates a node graph.
 *
 * UI: video stays visible as a frozen last-frame. Input slides up below it
 * so it feels like you're still in the scene, responding to the person.
 */

const Scenario = (() => {
  let currentScenario = null;
  let currentNode = null;
  let attempts = 0;
  let lastVideoSrc = null; // keep reference to freeze last frame
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
    lastVideoSrc = null;
    renderScenarioShell(container);
    const firstNode = findNode(scenario.nodes[0].id);
    currentNode = firstNode;
    playNode(firstNode, container);
  }

  function findNode(id) {
    return currentScenario.nodes.find(n => n.id === id);
  }

  // Persistent shell: header + video area + input area
  function renderScenarioShell(container) {
    container.innerHTML = `
      <div class="scenario-header">
        <span class="badge">${currentScenario.level}</span>
        <span style="font-size:13px;color:var(--text-secondary);">${currentScenario.title}</span>
      </div>
      <div class="card scenario-video-card" id="scenario-stage">
        <div class="scenario-text-fallback" id="scenario-visual">
          <div class="scenario-avatar">&#128100;</div>
        </div>
        <div class="scenario-subtitle" id="scenario-subtitle"></div>
      </div>
      <div id="scenario-input-area"></div>`;
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
      showInputOverlay(node, container);
    }
  }

  function playVideoNode(node, container) {
    const visual = document.getElementById('scenario-visual');
    const subtitle = document.getElementById('scenario-subtitle');
    const inputArea = document.getElementById('scenario-input-area');

    // Clear input area while video plays
    if (inputArea) inputArea.innerHTML = '';

    // Update subtitle
    if (subtitle) {
      subtitle.innerHTML = `
        <div class="scenario-subtitle-target">${node.subtitle || ''}</div>
        ${node.subtitle_en ? `<div class="scenario-subtitle-en">${node.subtitle_en}</div>` : ''}`;
      subtitle.classList.add('scenario-fade-in');
      setTimeout(() => subtitle.classList.remove('scenario-fade-in'), 300);
    }

    // Try to play video
    if (node.video && visual) {
      const stage = document.getElementById('scenario-stage');
      // Replace visual area with video
      const videoEl = document.createElement('video');
      videoEl.className = 'scenario-video';
      videoEl.id = 'scenario-video';
      videoEl.setAttribute('playsinline', '');
      videoEl.innerHTML = `<source src="${node.video}" type="video/mp4">`;

      // Swap in the video element
      const oldVisual = document.getElementById('scenario-visual');
      if (oldVisual) {
        stage.replaceChild(videoEl, oldVisual);
      } else {
        const existingVideo = document.getElementById('scenario-video');
        if (existingVideo) {
          stage.replaceChild(videoEl, existingVideo);
        } else {
          stage.insertBefore(videoEl, subtitle);
        }
      }

      // Give it an ID so we can freeze it later
      videoEl.id = 'scenario-video';
      lastVideoSrc = node.video;

      videoEl.addEventListener('error', () => {
        // Video failed — show text fallback, use TTS
        showFallbackVisual(stage, subtitle);
        if (node.subtitle && TTS.isEnabled()) TTS.speak(node.subtitle);
        setTimeout(() => advanceFromVideo(node, container), 3000);
      });

      videoEl.addEventListener('ended', () => {
        // Video finished — freeze on last frame (video stays visible paused)
        advanceFromVideo(node, container);
      });

      videoEl.play().catch(() => {
        // Autoplay blocked — add tap-to-play overlay
        const playOverlay = document.createElement('div');
        playOverlay.className = 'scenario-play-overlay';
        playOverlay.innerHTML = '<div class="scenario-play-btn">&#9654;</div>';
        stage.appendChild(playOverlay);
        playOverlay.addEventListener('click', () => {
          videoEl.play();
          playOverlay.remove();
        });
      });
    } else {
      // No video — text-only with TTS
      if (node.subtitle && TTS.isEnabled()) TTS.speak(node.subtitle);
      setTimeout(() => advanceFromVideo(node, container), 3000);
    }
  }

  function showFallbackVisual(stage, subtitle) {
    const existing = document.getElementById('scenario-video');
    if (existing) {
      const fallback = document.createElement('div');
      fallback.className = 'scenario-text-fallback';
      fallback.id = 'scenario-visual';
      fallback.innerHTML = '<div class="scenario-avatar">&#128100;</div>';
      stage.replaceChild(fallback, existing);
    }
  }

  function advanceFromVideo(node, container) {
    if (node.next) {
      navigateToNode(node.next, container);
    } else {
      showCompletion(container);
    }
  }

  function showInputOverlay(node, container) {
    attempts = 0;
    renderInputUI(node, container);
  }

  function renderInputUI(node, container) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const hasMic = !!SpeechRecognition;
    const inputArea = document.getElementById('scenario-input-area');
    if (!inputArea) return;

    // Slide up the input below the frozen video
    inputArea.innerHTML = `
      <div class="scenario-response-bar">
        ${node.prompt ? `<div class="scenario-prompt">${node.prompt}</div>` : ''}
        ${attempts > 0 && node.hint ? `<div class="scenario-hint">Hint: ${node.hint}</div>` : ''}
        <div class="input-row">
          <input class="input" type="text" id="scenario-input" placeholder="Type your response..."
                 autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
          <button class="btn" id="scenario-submit" style="width:auto;padding:14px 20px;">&#10148;</button>
          ${hasMic ? `<button class="btn btn-ghost scenario-mic-btn" id="scenario-mic" style="width:auto;padding:14px 16px;">&#127908;</button>` : ''}
        </div>
        <div id="scenario-feedback"></div>
      </div>`;

    inputArea.classList.add('scenario-input-slide-in');
    setTimeout(() => inputArea.classList.remove('scenario-input-slide-in'), 300);

    const input = document.getElementById('scenario-input');
    input.focus();

    const submit = () => {
      const text = input.value.trim();
      if (!text) return;
      checkInput(node, text, container);
    };

    document.getElementById('scenario-submit').addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });

    // Mic button
    const micBtn = document.getElementById('scenario-mic');
    if (micBtn && hasMic) {
      micBtn.addEventListener('click', () => {
        const recognition = new SpeechRecognition();
        recognition.lang = Language.getCurrent() === 'russian' ? 'ru-RU' : 'es-ES';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        micBtn.classList.add('scenario-mic-active');
        micBtn.textContent = '...';

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          input.value = transcript;
          micBtn.innerHTML = '&#127908;';
          micBtn.classList.remove('scenario-mic-active');
        };

        recognition.onerror = () => {
          micBtn.innerHTML = '&#127908;';
          micBtn.classList.remove('scenario-mic-active');
        };

        recognition.onend = () => {
          micBtn.innerHTML = '&#127908;';
          micBtn.classList.remove('scenario-mic-active');
        };

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
      const found = alternatives.some(kw => normalizedInput.includes(kw.toLowerCase()));
      if (!found) {
        allRequired = false;
        break;
      }
    }

    if (allRequired) {
      navigateToNode(node.success_next, container);
    } else {
      attempts++;
      if (attempts >= MAX_ATTEMPTS) {
        // Show model answer and advance
        const fb = document.getElementById('scenario-feedback');
        if (fb) {
          fb.innerHTML = `
            <div class="feedback wrong" style="margin-top:8px;">
              <div class="feedback-label">Model answer</div>
              <div class="feedback-answer">${node.hint || 'See the hint above'}</div>
            </div>`;
        }

        setTimeout(() => {
          navigateToNode(node.success_next, container);
        }, 2500);
      } else {
        // Navigate to confusion/fail node
        if (node.fail_next) {
          navigateToNode(node.fail_next, container);
        } else {
          // No fail node — re-show input with hint
          renderInputUI(node, container);
        }
      }
    }
  }

  function showCompletion(container) {
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
