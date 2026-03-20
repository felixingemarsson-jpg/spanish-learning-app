/*
 * Pronunciation — Mic button for speech recognition comparison
 * Not a standalone exercise. Exports renderMicButton(expectedText, container).
 */

const Pronunciation = (() => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  function isAvailable() {
    return !!SpeechRecognition;
  }

  function renderMicButton(expectedText, container) {
    if (!isAvailable()) return null;

    const btn = document.createElement('button');
    btn.className = 'tts-btn mic-btn';
    btn.innerHTML = micIcon() + ' Pronounce';

    let recognition = null;
    let silenceTimer = null;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      if (recognition) {
        recognition.stop();
        recognition = null;
        clearTimeout(silenceTimer);
        btn.innerHTML = micIcon() + ' Pronounce';
        btn.classList.remove('playing');
        return;
      }

      recognition = new SpeechRecognition();
      recognition.lang = detectLang(expectedText);
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;

      btn.classList.add('playing');
      btn.innerHTML = micIcon() + ' Listening...';

      // Auto-stop after 5 seconds of silence
      silenceTimer = setTimeout(() => {
        if (recognition) {
          recognition.stop();
        }
      }, 5000);

      recognition.onresult = (event) => {
        clearTimeout(silenceTimer);
        recognition = null;
        btn.classList.remove('playing');

        // Check all alternatives for best match
        let bestMatch = '';
        let bestScore = 0;

        for (let i = 0; i < event.results[0].length; i++) {
          const transcript = event.results[0][i].transcript;
          const score = similarity(normalize(transcript), normalize(expectedText));
          if (score > bestScore) {
            bestScore = score;
            bestMatch = transcript;
          }
        }

        showResult(btn, container, bestMatch, bestScore);
      };

      recognition.onerror = (event) => {
        clearTimeout(silenceTimer);
        recognition = null;
        btn.classList.remove('playing');
        btn.innerHTML = micIcon() + ' Try again';
        setTimeout(() => {
          btn.innerHTML = micIcon() + ' Pronounce';
        }, 2000);
      };

      recognition.onend = () => {
        clearTimeout(silenceTimer);
        if (recognition) {
          recognition = null;
          btn.classList.remove('playing');
          btn.innerHTML = micIcon() + ' Pronounce';
        }
      };

      recognition.start();
    });

    if (container) container.appendChild(btn);
    return btn;
  }

  function showResult(btn, container, transcript, score) {
    // Remove any previous result
    const prev = container.querySelector('.mic-result');
    if (prev) prev.remove();

    const resultEl = document.createElement('div');
    resultEl.className = 'mic-result';
    resultEl.style.marginTop = '6px';
    resultEl.style.fontSize = '13px';
    resultEl.style.fontFamily = 'var(--mono)';

    if (score >= 0.9) {
      resultEl.style.color = 'var(--success)';
      resultEl.textContent = `"${transcript}" — Great!`;
    } else if (score >= 0.6) {
      resultEl.style.color = 'var(--accent)';
      resultEl.textContent = `"${transcript}" — Close`;
    } else {
      resultEl.style.color = 'var(--error)';
      resultEl.textContent = `"${transcript}" — Try again`;
    }

    container.appendChild(resultEl);
    btn.innerHTML = micIcon() + ' Pronounce';
  }

  function normalize(str) {
    return str.toLowerCase().trim()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ');
  }

  function similarity(a, b) {
    if (a === b) return 1;
    const m = [];
    for (let i = 0; i <= a.length; i++) {
      m[i] = [i];
      for (let j = 1; j <= b.length; j++) {
        if (i === 0) { m[i][j] = j; continue; }
        m[i][j] = Math.min(
          m[i - 1][j] + 1,
          m[i][j - 1] + 1,
          m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
      }
    }
    const dist = m[a.length][b.length];
    return 1 - dist / Math.max(a.length, b.length, 1);
  }

  function detectLang(text) {
    // Simple heuristic: if text has Spanish characters, use Spanish
    if (/[ñáéíóúü¿¡]/i.test(text)) return 'es-ES';
    if (/[а-яА-ЯёЁ]/.test(text)) return 'ru-RU';
    return 'es-ES'; // default
  }

  function micIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>';
  }

  return { renderMicButton, isAvailable };
})();
