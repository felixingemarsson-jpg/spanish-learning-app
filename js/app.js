/*
 * App — Router, main shell, dashboard
 */

const App = (() => {
  let currentRoute = 'dashboard';

  function init() {
    // Nav handlers
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => navigate(btn.dataset.route));
    });

    // Load theme preference
    if (localStorage.getItem('spanish-theme') === 'light') {
      document.body.classList.add('light');
    }

    // On first load per language, seed notebook cards as already-known
    const langConfig = Language.getConfig();
    const seedKey = Language.storageKey('seeded');
    if (!localStorage.getItem(seedKey) && langConfig.seedNotebook) {
      const idsToSeed = [];
      for (const level of langConfig.seedLevels) {
        const levelVocab = DATA.getVocabByLevel(level);
        idsToSeed.push(...levelVocab.map(v => v.id));
      }
      const seeded = SRSEngine.seedKnownCards(idsToSeed);
      if (seeded > 0) {
        localStorage.setItem(seedKey, 'true');
        console.log(`Seeded ${seeded} notebook cards as already-known for ${langConfig.name}`);
      }
    }

    navigate('dashboard');
  }

  function navigate(route) {
    currentRoute = route;
    const main = document.getElementById('main');

    // Update nav
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.route === route);
    });

    switch (route) {
      case 'dashboard': renderDashboard(main); break;
      case 'flashcards': Flashcards.render(main); break;
      case 'practice': renderPracticeMenu(main); break;
      case 'progress': Progress.render(main); break;
      case 'settings': renderSettings(main); break;
      case 'conjugation': Conjugation.render(main); break;
      case 'translation': Translation.render(main); break;
      case 'cloze': Cloze.render(main); break;
      case 'grammar': GrammarQuiz.render(main); break;
      default: renderDashboard(main);
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }

  function switchLanguage(langCode) {
    Language.setCurrent(langCode);
    Language.syncTTSVoice();
    window.location.reload(); // reload to pick up new data file
  }

  function renderDashboard(container) {
    const allIds = DATA.getAllVocabIds();
    const study = SRSEngine.getStudyQueue(allIds);
    const streak = SRSEngine.getStreak();
    const accuracy = SRSEngine.getAccuracy();
    const todayStats = SRSEngine.getTodayStats();
    const currentLang = Language.getConfig();
    const allLangs = Language.getAllLanguages();

    container.innerHTML = `
      <div style="display:flex;justify-content:center;gap:8px;margin-top:16px;margin-bottom:8px;">
        ${allLangs.map(l => `
          <button class="btn btn-sm ${l.code === currentLang.code ? '' : 'btn-ghost'}"
                  onclick="App.switchLanguage('${l.code}')"
                  style="min-width:120px;">
            ${l.flag} ${l.name}
          </button>
        `).join('')}
      </div>
      <h1 class="page-title" style="text-align:center;font-size:28px;font-weight:800;margin-top:8px;">${currentLang.name}</h1>

      ${streak > 0 ? `<div class="streak-display"><span class="streak-fire">${streak}</span> day streak</div>` : ''}

      <div class="stat-row">
        <div class="stat-box">
          <div class="stat-number">${study.total}</div>
          <div class="stat-label">Due today</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${todayStats.reviews}</div>
          <div class="stat-label">Reviewed</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${accuracy || '—'}${accuracy ? '%' : ''}</div>
          <div class="stat-label">Accuracy</div>
        </div>
      </div>

      <button class="btn" onclick="App.navigate('flashcards')" ${study.total === 0 ? 'disabled' : ''}>
        ${study.total > 0 ? `Start Review (${study.total} cards)` : 'All caught up!'}
      </button>
      <button class="btn btn-secondary" style="margin-top:8px;" onclick="App.navigate('practice')">
        Practice
      </button>

      ${GitHubSync.isEnabled() ? `
        <button class="btn btn-ghost" style="margin-top:8px;" id="sync-btn">Sync Progress</button>
      ` : ''}

      <div class="section-label" style="margin-top:24px;">Quick Practice</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        ${DATA.verbs && DATA.verbs.length > 0 ? `
        <div class="practice-option" onclick="App.navigate('conjugation')">
          <div class="practice-option-title">Verbs</div>
          <div class="practice-option-desc">${DATA.verbs.length} verbs</div>
        </div>` : ''}
        ${DATA.grammarRules && DATA.grammarRules.length > 0 ? `
        <div class="practice-option" onclick="App.navigate('grammar')">
          <div class="practice-option-title">Grammar</div>
          <div class="practice-option-desc">${DATA.grammarRules.length} rules</div>
        </div>` : ''}
        <div class="practice-option" onclick="App.navigate('translation')">
          <div class="practice-option-title">Translate</div>
          <div class="practice-option-desc">EN → ${currentLang.code === 'russian' ? 'RU' : 'ES'}</div>
        </div>
        <div class="practice-option" onclick="App.navigate('cloze')">
          <div class="practice-option-title">Fill-in</div>
          <div class="practice-option-desc">Cloze</div>
        </div>
      </div>`;

    // Sync handler
    const syncBtn = document.getElementById('sync-btn');
    if (syncBtn) {
      syncBtn.addEventListener('click', async () => {
        syncBtn.textContent = 'Syncing...';
        syncBtn.disabled = true;
        try {
          await GitHubSync.sync();
          syncBtn.textContent = 'Synced!';
          setTimeout(() => { syncBtn.textContent = 'Sync Progress'; syncBtn.disabled = false; }, 2000);
        } catch (err) {
          syncBtn.textContent = 'Sync failed';
          console.error('Sync error:', err);
          setTimeout(() => { syncBtn.textContent = 'Sync Progress'; syncBtn.disabled = false; }, 2000);
        }
      });
    }
  }

  function renderPracticeMenu(container) {
    container.innerHTML = `
      <h1 class="page-title">Practice</h1>

      <div class="practice-option" onclick="App.navigate('conjugation')">
        <div class="practice-option-title">Conjugation Drill</div>
        <div class="practice-option-desc">Type verb conjugations with interleaved tenses. ${DATA.verbs.length} verbs across 3 tenses.</div>
      </div>

      <div class="practice-option" onclick="App.navigate('translation')">
        <div class="practice-option-title">Sentence Translation</div>
        <div class="practice-option-desc">Translate English sentences to Spanish. Fuzzy matching accepts minor errors.</div>
      </div>

      <div class="practice-option" onclick="App.navigate('cloze')">
        <div class="practice-option-title">Fill-in-the-Blank</div>
        <div class="practice-option-desc">Complete Spanish sentences with the missing word. Hints available.</div>
      </div>

      <div class="practice-option" onclick="App.navigate('grammar')">
        <div class="practice-option-title">Grammar Quiz</div>
        <div class="practice-option-desc">Multiple choice on grammar rules: ser/estar, por/para, preterite/imperfect, and more.</div>
      </div>

      <div class="practice-option" onclick="App.navigate('flashcards')">
        <div class="practice-option-title">Flashcards</div>
        <div class="practice-option-desc">FSRS-scheduled vocabulary review. Cards come back at optimal intervals.</div>
      </div>`;
  }

  function renderSettings(container) {
    const srsSettings = SRSEngine.getSettings();
    const ttsSettings = TTS.getSettings();
    const ghSettings = GitHubSync.getSettings();
    const isLight = document.body.classList.contains('light');

    container.innerHTML = `
      <h1 class="page-title">Settings</h1>

      <div class="section-label">Study</div>
      <div class="card">
        <div class="setting-row">
          <span class="setting-label">New cards / day</span>
          <div class="stepper">
            <button class="stepper-btn" id="cards-minus">-</button>
            <span class="setting-value" id="cards-value">${srsSettings.newCardsPerDay}</span>
            <button class="stepper-btn" id="cards-plus">+</button>
          </div>
        </div>
        <div class="setting-row">
          <span class="setting-label">Desired retention</span>
          <span class="setting-value">${Math.round(srsSettings.requestRetention * 100)}%</span>
        </div>
      </div>

      <div class="section-label" style="margin-top:24px;">Appearance</div>
      <div class="card">
        <div class="setting-row">
          <span class="setting-label">Dark mode</span>
          <button class="toggle ${isLight ? '' : 'on'}" id="theme-toggle">
            <div class="toggle-thumb"></div>
          </button>
        </div>
      </div>

      <div class="section-label" style="margin-top:24px;">Text-to-Speech (ElevenLabs)</div>
      <div class="card">
        <div class="setting-row">
          <span class="setting-label">Enabled</span>
          <button class="toggle ${ttsSettings.enabled ? 'on' : ''}" id="tts-toggle">
            <div class="toggle-thumb"></div>
          </button>
        </div>
        <div class="setting-row">
          <span class="setting-label">API Key</span>
          <input class="input" type="password" id="tts-api-key" value="${ttsSettings.apiKey}"
                 placeholder="xi-..." style="max-width:180px;font-size:12px;padding:8px;">
        </div>
        <div class="setting-row">
          <span class="setting-label">Voice ID</span>
          <input class="input" type="text" id="tts-voice-id" value="${ttsSettings.voiceId}"
                 placeholder="Voice ID" style="max-width:180px;font-size:12px;padding:8px;">
        </div>
        ${ttsSettings.apiKey ? `
        <div class="setting-row">
          <span class="setting-label">Test</span>
          <button class="btn btn-sm btn-ghost" id="tts-test">Play "Hola, como estas?"</button>
        </div>` : ''}
      </div>

      <div class="section-label" style="margin-top:24px;">GitHub Sync</div>
      <div class="card">
        <div class="setting-row">
          <span class="setting-label">Enabled</span>
          <button class="toggle ${ghSettings.enabled ? 'on' : ''}" id="gh-toggle">
            <div class="toggle-thumb"></div>
          </button>
        </div>
        <div class="setting-row">
          <span class="setting-label">Repo</span>
          <input class="input" type="text" id="gh-repo" value="${ghSettings.repo}"
                 placeholder="user/repo" style="max-width:180px;font-size:12px;padding:8px;">
        </div>
        <div class="setting-row">
          <span class="setting-label">Token</span>
          <input class="input" type="password" id="gh-token" value="${ghSettings.token}"
                 placeholder="ghp_..." style="max-width:180px;font-size:12px;padding:8px;">
        </div>
        <div class="setting-row">
          <span class="setting-label">Username</span>
          <input class="input" type="text" id="gh-username" value="${ghSettings.username}"
                 placeholder="learner" style="max-width:180px;font-size:12px;padding:8px;">
        </div>
      </div>

      <div class="section-label" style="margin-top:24px;">Data</div>
      <div class="card">
        <div class="setting-row">
          <span class="setting-label">Export progress</span>
          <button class="btn btn-sm btn-ghost" id="export-btn">Download JSON</button>
        </div>
        <div class="setting-row">
          <span class="setting-label">Import progress</span>
          <button class="btn btn-sm btn-ghost" id="import-btn">Upload JSON</button>
          <input type="file" id="import-file" accept=".json" style="display:none;">
        </div>
        <div class="setting-row">
          <span class="setting-label">Reset all data</span>
          <button class="btn btn-sm" id="reset-btn" style="background:var(--error);color:white;">Reset</button>
        </div>
      </div>

      <div style="text-align:center;margin-top:32px;font-size:11px;color:var(--text-tertiary);">
        Language Learning &middot; FSRS-5
      </div>`;

    // ── Event handlers ──

    // New cards stepper
    document.getElementById('cards-minus').addEventListener('click', () => {
      const s = SRSEngine.getSettings();
      s.newCardsPerDay = Math.max(1, s.newCardsPerDay - 1);
      SRSEngine.saveSettings(s);
      document.getElementById('cards-value').textContent = s.newCardsPerDay;
    });
    document.getElementById('cards-plus').addEventListener('click', () => {
      const s = SRSEngine.getSettings();
      s.newCardsPerDay = Math.min(50, s.newCardsPerDay + 1);
      SRSEngine.saveSettings(s);
      document.getElementById('cards-value').textContent = s.newCardsPerDay;
    });

    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', function () {
      document.body.classList.toggle('light');
      this.classList.toggle('on');
      localStorage.setItem('spanish-theme', document.body.classList.contains('light') ? 'light' : 'dark');
    });

    // TTS toggle + settings
    document.getElementById('tts-toggle').addEventListener('click', function () {
      const s = TTS.getSettings();
      s.enabled = !s.enabled;
      TTS.saveSettings(s);
      this.classList.toggle('on');
    });

    const saveTTSDebounced = debounce(() => {
      const s = TTS.getSettings();
      s.apiKey = document.getElementById('tts-api-key').value.trim();
      s.voiceId = document.getElementById('tts-voice-id').value.trim() || s.voiceId;
      TTS.saveSettings(s);
    }, 500);

    document.getElementById('tts-api-key').addEventListener('input', saveTTSDebounced);
    document.getElementById('tts-voice-id').addEventListener('input', saveTTSDebounced);

    const ttsTestBtn = document.getElementById('tts-test');
    if (ttsTestBtn) {
      ttsTestBtn.addEventListener('click', () => {
        saveTTSDebounced.flush?.();
        TTS.speak('Hola, como estas?');
      });
    }

    // GitHub toggle + settings
    document.getElementById('gh-toggle').addEventListener('click', function () {
      const s = GitHubSync.getSettings();
      s.enabled = !s.enabled;
      GitHubSync.saveSettings(s);
      this.classList.toggle('on');
    });

    const saveGHDebounced = debounce(() => {
      const s = GitHubSync.getSettings();
      s.repo = document.getElementById('gh-repo').value.trim();
      s.token = document.getElementById('gh-token').value.trim();
      s.username = document.getElementById('gh-username').value.trim() || 'learner';
      GitHubSync.saveSettings(s);
    }, 500);

    ['gh-repo', 'gh-token', 'gh-username'].forEach(id => {
      document.getElementById(id).addEventListener('input', saveGHDebounced);
    });

    // Export
    document.getElementById('export-btn').addEventListener('click', () => {
      const data = SRSEngine.exportProgress();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${Language.getCurrent()}-progress-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    // Import
    document.getElementById('import-btn').addEventListener('click', () => {
      document.getElementById('import-file').click();
    });
    document.getElementById('import-file').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          SRSEngine.importProgress(data);
          renderSettings(container);
        } catch (err) {
          console.error('Import error:', err);
        }
      };
      reader.readAsText(file);
    });

    // Reset
    document.getElementById('reset-btn').addEventListener('click', () => {
      if (confirm('This will delete ALL progress. Are you sure?')) {
        localStorage.removeItem(Language.storageKey('srs-cards'));
        localStorage.removeItem(Language.storageKey('srs-stats'));
        renderSettings(container);
      }
    });
  }

  // Utility
  function debounce(fn, ms) {
    let timer;
    const debounced = (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
    debounced.flush = () => { clearTimeout(timer); fn(); };
    return debounced;
  }

  // Boot — init immediately since app.js is loaded dynamically after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { navigate, switchLanguage };
})();
