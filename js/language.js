/*
 * Language Manager — Handles multi-language support
 * Namespaces localStorage, manages language switching, TTS voice config.
 */

const Language = (() => {
  const LANG_KEY = 'app-language';

  const languages = {
    spanish: {
      code: 'spanish',
      name: 'Spanish',
      flag: '🇪🇸',
      dataScript: 'js/data-spanish.js',
      ttsVoiceId: 'onwK4e9ZLuTAKqWW03F9',
      ttsVoiceName: 'Daniel',
      seedNotebook: true, // A1+A2 are from notebooks (already studied)
      seedLevels: ['A1', 'A2'],
    },
    russian: {
      code: 'russian',
      name: 'Russian',
      flag: '🇷🇺',
      dataScript: 'js/data-russian.js',
      ttsVoiceId: 'cjVigY5qzO86Huf0OWal',
      ttsVoiceName: 'Eric',
      seedNotebook: false, // all content is new for this learner
      seedLevels: [],
    },
  };

  function getCurrent() {
    return localStorage.getItem(LANG_KEY) || 'spanish';
  }

  function setCurrent(langCode) {
    localStorage.setItem(LANG_KEY, langCode);
  }

  function getConfig(langCode) {
    return languages[langCode || getCurrent()];
  }

  function getAllLanguages() {
    return Object.values(languages);
  }

  // Namespace localStorage keys per language
  function storageKey(baseKey) {
    return `${getCurrent()}-${baseKey}`;
  }

  // Switch TTS voice when language changes
  function syncTTSVoice() {
    const config = getConfig();
    const ttsSettings = TTS.getSettings();
    ttsSettings.voiceId = config.ttsVoiceId;
    TTS.saveSettings(ttsSettings);
  }

  return { getCurrent, setCurrent, getConfig, getAllLanguages, storageKey, syncTTSVoice, languages };
})();
