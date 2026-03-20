/*
 * GitHub Sync — Push/pull progress via GitHub API
 * Uses a personal access token stored in localStorage.
 */

const GitHubSync = (() => {
  function SETTINGS_KEY() { return Language.storageKey('github-settings'); }

  const defaults = {
    repo: '', // e.g. 'felixingemarsson/spanish-learning-data'
    token: '',
    username: 'learner',
    enabled: false,
  };

  function getSettings() {
    const stored = localStorage.getItem(SETTINGS_KEY());
    return stored ? { ...defaults, ...JSON.parse(stored) } : { ...defaults };
  }

  function saveSettings(s) {
    localStorage.setItem(SETTINGS_KEY(), JSON.stringify(s));
  }

  function isEnabled() {
    const s = getSettings();
    return s.enabled && s.repo && s.token;
  }

  async function pushProgress() {
    const s = getSettings();
    if (!s.repo || !s.token) throw new Error('GitHub sync not configured');

    const progress = SRSEngine.exportProgress();
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(progress, null, 2))));
    const lang = Language.getCurrent();
    const path = `progress/${lang}/${s.username}.json`;

    // Check if file exists (to get sha for update)
    let sha = null;
    try {
      const existing = await fetch(`https://api.github.com/repos/${s.repo}/contents/${path}`, {
        headers: { Authorization: `Bearer ${s.token}` },
      });
      if (existing.ok) {
        const data = await existing.json();
        sha = data.sha;
      }
    } catch (e) { /* file doesn't exist yet */ }

    const body = {
      message: `Update progress for ${s.username} — ${new Date().toISOString()}`,
      content,
    };
    if (sha) body.sha = sha;

    const res = await fetch(`https://api.github.com/repos/${s.repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${s.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Push failed');
    }

    return true;
  }

  async function pullProgress() {
    const s = getSettings();
    if (!s.repo || !s.token) throw new Error('GitHub sync not configured');

    const lang = Language.getCurrent();
    const path = `progress/${lang}/${s.username}.json`;
    const res = await fetch(`https://api.github.com/repos/${s.repo}/contents/${path}`, {
      headers: { Authorization: `Bearer ${s.token}` },
    });

    if (!res.ok) {
      if (res.status === 404) return null; // No progress file yet
      throw new Error('Pull failed');
    }

    const data = await res.json();
    const content = JSON.parse(decodeURIComponent(escape(atob(data.content))));
    SRSEngine.importProgress(content);
    return content;
  }

  async function sync() {
    // Pull first (to get any Discord bot updates), then push local state
    await pullProgress();
    await pushProgress();
  }

  return { getSettings, saveSettings, isEnabled, pushProgress, pullProgress, sync };
})();
