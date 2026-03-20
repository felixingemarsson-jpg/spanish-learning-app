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

  function getSpeedForCard(cardId) {
    if (!cardId) return 1.0;
    const cards = typeof SRSEngine !== 'undefined' ? SRSEngine.loadCards() : {};
    const card = cards[cardId];
    if (!card) return 0.85; // new card — slow
    if (card.stability > 15) return 1.15; // mature — fast
    if (card.state === FSRS.State.Review) return 1.0; // normal review
    return 0.85; // learning — slow
  }

  async function speak(text, options = {}) {
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
        if (res.status === 401) return { error: 'Invalid API key' };
        if (res.status === 429) return { error: 'Quota reached' };
        return { error: 'TTS unavailable' };
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      currentAudio = new Audio(url);

      // Apply playback speed
      const speed = options.speed || 1.0;
      if (speed !== 1.0) {
        currentAudio.playbackRate = speed;
      }

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
      return { error: 'Network error' };
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

  function speakerIcon(waves) {
    const base = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/>';
    const w1 = '<path d="M15.54 8.46a5 5 0 010 7.07"/>';
    const w2 = '<path d="M19.07 4.93a10 10 0 010 14.14"/>';
    return base + (waves >= 1 ? w1 : '') + (waves >= 2 ? w2 : '') + '</svg>';
  }

  // Render a TTS button for a Spanish text
  function renderButton(text, container) {
    if (!isEnabled()) return null;

    const btn = document.createElement('button');
    btn.className = 'tts-btn';
    btn.innerHTML = speakerIcon(2) + ' Listen';

    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (isPlaying()) {
        stop();
        btn.classList.remove('playing');
        return;
      }
      btn.classList.add('playing');
      btn.innerHTML = speakerIcon(1) + ' Playing...';
      const result = await speak(text);
      btn.classList.remove('playing');
      if (result && result.error) {
        btn.innerHTML = speakerIcon(0) + ` ${result.error}`;
        btn.style.color = 'var(--error)';
        btn.style.borderColor = 'var(--error)';
        setTimeout(() => {
          btn.innerHTML = speakerIcon(2) + ' Listen';
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2500);
      } else {
        btn.innerHTML = speakerIcon(2) + ' Listen';
      }
    });

    if (container) container.appendChild(btn);
    return btn;
  }

  return { getSettings, saveSettings, isEnabled, speak, stop, isPlaying, renderButton, getSpeedForCard };
})();
