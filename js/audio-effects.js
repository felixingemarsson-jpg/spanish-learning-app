/*
 * AudioEffects — Background noise mixing for dictation exercises
 * Uses Web Audio API to layer ambient noise behind TTS speech.
 */

const AudioEffects = (() => {
  const SETTINGS_KEY = 'realistic-listening';
  let audioCtx = null;
  let noiseSource = null;
  let noiseGain = null;
  let noiseBuffer = null;

  const NOISE_FILES = [
    'assets/audio/cafe.mp3',
    'assets/audio/street.mp3',
    'assets/audio/crowd.mp3',
  ];

  function isEnabled() {
    return localStorage.getItem(SETTINGS_KEY) === 'true';
  }

  function setEnabled(val) {
    localStorage.setItem(SETTINGS_KEY, val ? 'true' : 'false');
  }

  function getContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  async function loadRandomNoise() {
    const file = NOISE_FILES[Math.floor(Math.random() * NOISE_FILES.length)];
    try {
      const ctx = getContext();
      const res = await fetch(file);
      if (!res.ok) return null;
      const arrayBuffer = await res.arrayBuffer();
      noiseBuffer = await ctx.decodeAudioData(arrayBuffer);
      return noiseBuffer;
    } catch (e) {
      console.warn('AudioEffects: Could not load noise file', e);
      return null;
    }
  }

  async function startNoise(volume = 0.25) {
    if (!isEnabled()) return;

    const ctx = getContext();
    if (ctx.state === 'suspended') await ctx.resume();

    if (!noiseBuffer) {
      await loadRandomNoise();
    }
    if (!noiseBuffer) return;

    stopNoise();

    noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    noiseGain = ctx.createGain();
    noiseGain.gain.value = volume;

    noiseSource.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseSource.start();
  }

  function stopNoise() {
    if (noiseSource) {
      try { noiseSource.stop(); } catch (e) { /* already stopped */ }
      noiseSource.disconnect();
      noiseSource = null;
    }
    if (noiseGain) {
      noiseGain.disconnect();
      noiseGain = null;
    }
  }

  return { isEnabled, setEnabled, startNoise, stopNoise, loadRandomNoise };
})();
