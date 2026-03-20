/*
 * TTS — ElevenLabs text-to-speech integration
 * Calls ElevenLabs API directly from the browser.
 * API key stored in localStorage (private app, single user).
 */

const TTS = (() => {
  const SETTINGS_KEY = 'spanish-tts-settings';
  let currentAudio = null;

  const defaults = {
    apiKey: '',
    voiceId: 'onwK4e9ZLuTAKqWW03F9', // Daniel — steady broadcaster
    modelId: 'eleven_multilingual_v2',
    enabled: false,
  };

  function getSettings() {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? { ...defaults, ...JSON.parse(stored) } : { ...defaults };
  }

  function saveSettings(s) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  }

  function isEnabled() {
    const s = getSettings();
    return s.enabled && s.apiKey;
  }

  async function speak(text) {
    const s = getSettings();
    if (!s.apiKey) {
      console.warn('TTS: No API key configured');
      return false;
    }

    // Stop any currently playing audio
    stop();

    try {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${s.voiceId}`, {
        method: 'POST',
        headers: {
          'xi-api-key': s.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          model_id: s.modelId,
        }),
      });

      if (!res.ok) {
        console.error('TTS API error:', res.status);
        return false;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      currentAudio = new Audio(url);

      return new Promise((resolve) => {
        currentAudio.onended = () => {
          URL.revokeObjectURL(url);
          currentAudio = null;
          resolve(true);
        };
        currentAudio.onerror = () => {
          URL.revokeObjectURL(url);
          currentAudio = null;
          resolve(false);
        };
        currentAudio.play();
      });
    } catch (err) {
      console.error('TTS error:', err);
      return false;
    }
  }

  function stop() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
  }

  function isPlaying() {
    return currentAudio && !currentAudio.paused;
  }

  // Render a TTS button for a Spanish text
  function renderButton(text, container) {
    if (!isEnabled()) return null;

    const btn = document.createElement('button');
    btn.className = 'tts-btn';
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M11 5L6 9H2v6h4l5 4V5z"/>
        <path d="M15.54 8.46a5 5 0 010 7.07"/>
        <path d="M19.07 4.93a10 10 0 010 14.14"/>
      </svg>
      Listen`;

    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (isPlaying()) {
        stop();
        btn.classList.remove('playing');
        return;
      }
      btn.classList.add('playing');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          <path d="M15.54 8.46a5 5 0 010 7.07"/>
        </svg>
        Playing...`;
      await speak(text);
      btn.classList.remove('playing');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          <path d="M15.54 8.46a5 5 0 010 7.07"/>
          <path d="M19.07 4.93a10 10 0 010 14.14"/>
        </svg>
        Listen`;
    });

    if (container) container.appendChild(btn);
    return btn;
  }

  return { getSettings, saveSettings, isEnabled, speak, stop, isPlaying, renderButton };
})();
