/*
 * Smart Session — Adaptive mixed-exercise study mode
 */

const SmartSession = (() => {
  let queue = [];
  let currentIndex = 0;
  let sessionStats = { reviewed: 0, correct: 0, types: {} };

  function render(container) {
    const settings = SRSEngine.getSettings();
    const sessionLength = settings.sessionLength || 15;
    const allIds = DATA.getAllVocabIds();
    const studyQueue = SRSEngine.getStudyQueue(allIds);
    const cardIds = [...studyQueue.due, ...studyQueue.new].slice(0, sessionLength);

    if (cardIds.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">&#10024;</div>
          <div class="empty-state-text">No cards due for review!</div>
          <div style="margin-top:8px;font-size:13px;color:var(--text-secondary);">Come back later or add more vocabulary.</div>
        </div>`;
      return;
    }

    // Build queue with exercise type assignments
    const weights = getWeights();
    queue = cardIds.map(id => ({
      cardId: id,
      card: DATA.getVocabCard(id),
      exerciseType: pickExerciseType(weights),
    }));

    currentIndex = 0;
    sessionStats = { reviewed: 0, correct: 0, types: {} };

    showCard(container);
  }

  function getWeights() {
    const weakCategories = SRSEngine.getWeakCategories();
    const weakNames = weakCategories.map(w => w.category);
    const ttsEnabled = TTS.isEnabled();
    const hasReadings = DATA.readings && DATA.readings.length > 0;

    let weights;

    if (weakNames.includes('accent_errors')) {
      weights = {
        dictation: 30,
        translation: 15,
        cloze: 20,
        wordOrder: 15,
        flashcard: 20,
      };
    } else if (weakNames.includes('word_order_errors')) {
      weights = {
        dictation: 15,
        translation: 15,
        cloze: 20,
        wordOrder: 30,
        flashcard: 20,
      };
    } else {
      weights = {
        dictation: 10,
        translation: 20,
        cloze: 20,
        wordOrder: 15,
        flashcard: 25,
        reading: 10,
      };
    }

    // Remove unavailable types
    if (!ttsEnabled) {
      delete weights.dictation;
    }
    if (!hasReadings) {
      delete weights.reading;
    }

    return weights;
  }

  function pickExerciseType(weights) {
    const entries = Object.entries(weights);
    const total = entries.reduce((s, [, w]) => s + w, 0);
    let r = Math.random() * total;
    for (const [type, weight] of entries) {
      r -= weight;
      if (r <= 0) return type;
    }
    return entries[0][0]; // fallback
  }

  function getTypeBadge(type) {
    const labels = {
      flashcard: 'Flashcard',
      cloze: 'Cloze',
      translation: 'Translation',
      dictation: 'Dictation',
      wordOrder: 'Word Order',
      reading: 'Reading',
    };
    return labels[type] || type;
  }

  function showCard(container) {
    if (currentIndex >= queue.length) {
      showSummary(container);
      return;
    }

    const item = queue[currentIndex];
    if (!item.card) {
      // Skip missing cards
      currentIndex++;
      showCard(container);
      return;
    }

    const typeBadge = getTypeBadge(item.exerciseType);

    container.innerHTML = `
      <div class="session-counter">
        ${currentIndex + 1} / ${queue.length}
        <span class="badge" style="margin-left:8px;">${typeBadge}</span>
      </div>
      <div id="smart-exercise"></div>`;

    const exerciseContainer = document.getElementById('smart-exercise');

    switch (item.exerciseType) {
      case 'flashcard':
        renderFlashcard(exerciseContainer, item);
        break;
      case 'cloze':
        renderCloze(exerciseContainer, item);
        break;
      case 'translation':
        renderTranslation(exerciseContainer, item);
        break;
      case 'dictation':
        renderDictation(exerciseContainer, item);
        break;
      case 'wordOrder':
        renderWordOrder(exerciseContainer, item);
        break;
      case 'reading':
        // For reading, advance immediately (reading handles its own flow)
        renderReading(exerciseContainer, item);
        break;
    }
  }

  function recordResult(isCorrect, type) {
    sessionStats.reviewed++;
    if (isCorrect) sessionStats.correct++;
    sessionStats.types[type] = (sessionStats.types[type] || 0) + 1;
  }

  // ── Exercise renderers ──

  function renderFlashcard(container, item) {
    const card = item.card;
    let answered = false;

    // Production-first: show English → type target language
    container.innerHTML = `
      <div class="card" style="text-align:center;padding:24px;">
        <div><span class="badge">${card.theme}</span></div>
        <div style="font-size:20px;font-weight:700;margin-top:12px;">${card.english}</div>
      </div>
      <div class="input-row" style="margin-top:12px;">
        <input class="input" type="text" id="smart-flash-input" placeholder="Type the translation..."
               autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
        <button class="btn" id="smart-flash-submit">Check</button>
      </div>
      <div id="smart-flash-feedback" style="margin-top:12px;"></div>`;

    const input = document.getElementById('smart-flash-input');
    input.focus();

    const mainEl = container.parentElement || document.getElementById('main');
    const submit = () => {
      if (answered) return;
      const userAnswer = input.value.trim();
      if (!userAnswer) return;
      answered = true;

      const grade = SRSEngine.gradeAnswer(userAnswer, card.spanish);
      SRSEngine.reviewCard(card.id, grade.rating);
      recordResult(grade.match !== 'wrong', 'flashcard');

      if (grade.match === 'accent') SRSEngine.recordErrorPattern('accent_errors', false);
      else if (grade.match === 'wrong') SRSEngine.recordErrorPattern('spelling_errors', false);
      else SRSEngine.recordErrorPattern('spelling_errors', true);

      const inputRow = container.querySelector('.input-row');
      if (inputRow) inputRow.remove();

      const fb = document.getElementById('smart-flash-feedback');
      if (grade.match === 'exact') {
        fb.innerHTML = `<div class="feedback correct"><div class="feedback-label">Correct!</div><div class="feedback-answer">${card.spanish}</div></div>`;
      } else if (grade.match === 'accent' || grade.match === 'close') {
        fb.innerHTML = `<div class="feedback almost"><div class="feedback-label">Almost!</div><div class="feedback-answer">${card.spanish}</div><div class="feedback-explanation">${grade.details}</div></div>`;
      } else {
        fb.innerHTML = `<div class="feedback wrong"><div class="feedback-label">Incorrect</div><div class="feedback-answer"><span style="text-decoration:line-through;color:var(--error);">${userAnswer}</span> &rarr; <span style="color:var(--success);">${card.spanish}</span></div></div>`;
      }

      const extras = document.createElement('div');
      extras.style.cssText = 'margin-top:8px;display:flex;gap:8px;justify-content:center;';
      fb.appendChild(extras);
      TTS.renderButton(card.spanish, extras);
      if (typeof Pronunciation !== 'undefined') Pronunciation.renderMicButton(card.spanish, extras);

      const nextBtn = document.createElement('button');
      nextBtn.className = 'btn btn-secondary';
      nextBtn.style.marginTop = '12px';
      nextBtn.textContent = 'Next';
      const advance = () => { currentIndex++; showCard(mainEl); };
      nextBtn.addEventListener('click', advance);
      fb.appendChild(nextBtn);
      setTimeout(() => nextBtn.focus(), 150);

      let canAdvance = false;
      setTimeout(() => { canAdvance = true; }, 100);
      document.addEventListener('keydown', function handler(e) {
        if (e.key === 'Enter' && canAdvance) {
          document.removeEventListener('keydown', handler);
          advance();
        }
      });
    };

    document.getElementById('smart-flash-submit').addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
  }

  function renderTranslation(container, item) {
    const card = item.card;
    container.innerHTML = `
      <div class="card">
        <div class="section-label">Translate</div>
        <div style="font-size:20px;font-weight:700;margin-bottom:8px;">${card.english}</div>
        <div><span class="badge">${card.theme}</span></div>
      </div>
      <div class="input-row">
        <input class="input" type="text" id="smart-trans-input" placeholder="Type the translation..."
               autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
        <button class="btn" id="smart-trans-submit">Check</button>
      </div>
      <div id="smart-trans-feedback" style="margin-top:12px;"></div>`;

    const input = document.getElementById('smart-trans-input');
    input.focus();
    let submitted = false;

    const submit = () => {
      if (submitted) return;
      const userAnswer = input.value.trim();
      if (!userAnswer) return;
      submitted = true;

      const grade = SRSEngine.gradeAnswer(userAnswer, card.spanish);
      SRSEngine.reviewCard(card.id, grade.rating);
      const isCorrect = grade.match !== 'wrong';
      recordResult(isCorrect, 'translation');

      container.querySelector('.input-row').remove();
      const feedbackEl = document.getElementById('smart-trans-feedback');
      showGradeFeedback(feedbackEl, grade, userAnswer, card.spanish, card.grammar_notes);
      addNextButton(feedbackEl, container);
    };

    document.getElementById('smart-trans-submit').addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
  }

  function renderCloze(container, item) {
    const card = item.card;

    // Try to pick a blank from chunks, fallback to first word
    let blank, before, after;
    if (card.chunks && card.chunks.length > 0) {
      const blankChunk = card.chunks[Math.floor(Math.random() * card.chunks.length)];
      const idx = card.spanish.toLowerCase().indexOf(blankChunk.toLowerCase());
      if (idx !== -1) {
        blank = card.spanish.substring(idx, idx + blankChunk.length);
        before = card.spanish.substring(0, idx);
        after = card.spanish.substring(idx + blankChunk.length);
      }
    }

    if (!blank) {
      // Fallback: blank the first word
      const words = card.spanish.split(/\s+/);
      blank = words[0];
      before = '';
      after = ' ' + words.slice(1).join(' ');
    }

    container.innerHTML = `
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <span class="badge">${card.theme}</span>
          <span style="font-size:12px;color:var(--text-tertiary);">${card.english}</span>
        </div>
        <div class="cloze-sentence">
          ${before}<span class="cloze-blank" id="smart-cloze-display">___</span>${after}
        </div>
      </div>
      <div class="input-row">
        <input class="input" type="text" id="smart-cloze-input" placeholder="Fill in the blank..."
               autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
        <button class="btn" id="smart-cloze-submit">Check</button>
      </div>
      <div id="smart-cloze-feedback" style="margin-top:12px;"></div>`;

    const input = document.getElementById('smart-cloze-input');
    input.focus();
    let submitted = false;

    const submit = () => {
      if (submitted) return;
      const userAnswer = input.value.trim();
      if (!userAnswer) return;
      submitted = true;

      const grade = SRSEngine.gradeAnswer(userAnswer, blank);
      SRSEngine.reviewCard(card.id, grade.rating);
      const isCorrect = grade.match !== 'wrong';
      recordResult(isCorrect, 'cloze');

      const display = document.getElementById('smart-cloze-display');
      if (display) {
        display.textContent = blank;
        display.style.color = isCorrect ? 'var(--success)' : 'var(--error)';
      }

      container.querySelector('.input-row').remove();
      const feedbackEl = document.getElementById('smart-cloze-feedback');
      showGradeFeedback(feedbackEl, grade, userAnswer, blank, card.grammar_notes);
      addNextButton(feedbackEl, container);
    };

    document.getElementById('smart-cloze-submit').addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
  }

  function renderDictation(container, item) {
    const card = item.card;

    container.innerHTML = `
      <div class="card">
        <div class="section-label">Listen &amp; Type</div>
        <div style="text-align:center;margin-bottom:16px;">
          <div id="smart-dict-tts"></div>
        </div>
        <div><span class="badge">${card.theme}</span></div>
      </div>
      <div class="input-row">
        <input class="input" type="text" id="smart-dict-input" placeholder="Type what you hear..."
               autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
        <button class="btn" id="smart-dict-submit">Check</button>
      </div>
      <div id="smart-dict-feedback" style="margin-top:12px;"></div>`;

    TTS.renderButton(card.spanish, document.getElementById('smart-dict-tts'));
    TTS.speak(card.spanish);

    const input = document.getElementById('smart-dict-input');
    input.focus();
    let submitted = false;

    const submit = () => {
      if (submitted) return;
      const userAnswer = input.value.trim();
      if (!userAnswer) return;
      submitted = true;

      const grade = SRSEngine.gradeAnswer(userAnswer, card.spanish);
      SRSEngine.reviewCard(card.id, grade.rating);

      if (grade.match === 'accent') {
        SRSEngine.recordErrorPattern('accent_errors', false);
      } else {
        SRSEngine.recordErrorPattern('accent_errors', grade.match !== 'wrong');
      }

      const isCorrect = grade.match !== 'wrong';
      recordResult(isCorrect, 'dictation');

      container.querySelector('.input-row').remove();
      const feedbackEl = document.getElementById('smart-dict-feedback');
      showGradeFeedback(feedbackEl, grade, userAnswer, card.spanish);
      addNextButton(feedbackEl, container);
    };

    document.getElementById('smart-dict-submit').addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
  }

  function renderWordOrder(container, item) {
    const card = item.card;
    const words = card.spanish.trim().split(/\s+/);

    if (words.length < 3) {
      // Fall back to translation for short phrases
      renderTranslation(container, item);
      return;
    }

    let available = words.map((w, i) => ({ text: w, origIndex: i }));
    // Shuffle
    for (let i = available.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [available[i], available[j]] = [available[j], available[i]];
    }
    let selected = [];

    container.innerHTML = `
      <div class="card">
        <div class="section-label">Arrange in order</div>
        <div style="font-size:18px;font-weight:700;margin-bottom:8px;">${card.english}</div>
        <div><span class="badge">${card.theme}</span></div>
      </div>
      <div class="card" style="min-height:56px;">
        <div class="section-label">Your sentence</div>
        <div id="smart-wo-selected" style="display:flex;flex-wrap:wrap;gap:6px;min-height:36px;"></div>
      </div>
      <div class="card">
        <div id="smart-wo-available" style="display:flex;flex-wrap:wrap;gap:6px;"></div>
      </div>
      <button class="btn" id="smart-wo-check" disabled>Check</button>
      <div id="smart-wo-feedback" style="margin-top:12px;"></div>`;

    function renderWoChips() {
      const availEl = document.getElementById('smart-wo-available');
      const selEl = document.getElementById('smart-wo-selected');
      const checkBtn = document.getElementById('smart-wo-check');
      availEl.innerHTML = '';
      selEl.innerHTML = '';

      for (let i = 0; i < available.length; i++) {
        const chip = document.createElement('button');
        chip.className = 'theme-chip';
        chip.textContent = available[i].text;
        chip.style.fontSize = '15px';
        chip.style.padding = '8px 14px';
        chip.style.cursor = 'pointer';
        chip.addEventListener('click', () => {
          selected.push(available.splice(i, 1)[0]);
          renderWoChips();
        });
        availEl.appendChild(chip);
      }

      for (let i = 0; i < selected.length; i++) {
        const chip = document.createElement('button');
        chip.className = 'theme-chip active';
        chip.textContent = selected[i].text;
        chip.style.fontSize = '15px';
        chip.style.padding = '8px 14px';
        chip.style.cursor = 'pointer';
        chip.addEventListener('click', () => {
          available.push(selected.splice(i, 1)[0]);
          renderWoChips();
        });
        selEl.appendChild(chip);
      }

      if (checkBtn) checkBtn.disabled = selected.length === 0;
    }

    renderWoChips();

    document.getElementById('smart-wo-check').addEventListener('click', () => {
      const userSentence = selected.map(w => w.text).join(' ');
      const grade = SRSEngine.gradeAnswer(userSentence, card.spanish);
      SRSEngine.reviewCard(card.id, grade.rating);
      SRSEngine.recordErrorPattern('word_order_errors', grade.match !== 'wrong');
      const isCorrect = grade.match !== 'wrong';
      recordResult(isCorrect, 'wordOrder');

      document.getElementById('smart-wo-check').remove();
      const feedbackEl = document.getElementById('smart-wo-feedback');
      showGradeFeedback(feedbackEl, grade, userSentence, card.spanish);
      addNextButton(feedbackEl, container);
    });
  }

  function renderReading(container, item) {
    // For reading in a smart session, show a single comprehension question
    if (!DATA.readings || DATA.readings.length === 0) {
      renderTranslation(container, item);
      return;
    }

    const passage = DATA.readings[Math.floor(Math.random() * DATA.readings.length)];
    if (!passage.questions || passage.questions.length === 0) {
      renderTranslation(container, item);
      return;
    }

    const q = passage.questions[Math.floor(Math.random() * passage.questions.length)];

    container.innerHTML = `
      <div class="card">
        <div style="font-size:15px;line-height:1.7;margin-bottom:12px;">${passage.text}</div>
        <div id="smart-read-tts" style="margin-bottom:8px;"></div>
      </div>
      <div class="card">
        <div class="section-label">Fill in the blank</div>
        <div style="font-size:16px;line-height:1.6;margin-bottom:8px;">${q.sentence_with_blank}</div>
        ${q.hint ? `<div style="font-size:12px;color:var(--text-tertiary);">Hint: ${q.hint}</div>` : ''}
      </div>
      <div class="input-row">
        <input class="input" type="text" id="smart-read-input" placeholder="Your answer..."
               autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
        <button class="btn" id="smart-read-submit">Check</button>
      </div>
      <div id="smart-read-feedback" style="margin-top:12px;"></div>`;

    TTS.renderButton(passage.text, document.getElementById('smart-read-tts'));

    const input = document.getElementById('smart-read-input');
    input.focus();
    let submitted = false;

    const submit = () => {
      if (submitted) return;
      const userAnswer = input.value.trim();
      if (!userAnswer) return;
      submitted = true;

      const grade = SRSEngine.gradeAnswer(userAnswer, q.answer);
      if (passage.id) SRSEngine.reviewCard(passage.id, grade.rating);
      const isCorrect = grade.match !== 'wrong';
      recordResult(isCorrect, 'reading');

      container.querySelector('.input-row').remove();
      const feedbackEl = document.getElementById('smart-read-feedback');
      showGradeFeedback(feedbackEl, grade, userAnswer, q.answer);
      addNextButton(feedbackEl, container);
    };

    document.getElementById('smart-read-submit').addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
  }

  // ── Shared helpers ──

  function showGradeFeedback(el, grade, userAnswer, correct, notes) {
    const isCorrect = grade.match !== 'wrong';

    if (grade.match === 'exact') {
      el.innerHTML = `
        <div class="feedback correct">
          <div class="feedback-label">Correct!</div>
          <div class="feedback-answer">${correct}</div>
        </div>`;
    } else if (isCorrect) {
      el.innerHTML = `
        <div class="feedback correct">
          <div class="feedback-label">Close enough!</div>
          <div class="feedback-answer">${correct}</div>
          <div class="feedback-explanation">${grade.details || ''}</div>
        </div>`;
    } else {
      el.innerHTML = `
        <div class="feedback wrong">
          <div class="feedback-label">Incorrect</div>
          <div class="feedback-answer">
            <span style="text-decoration:line-through;color:var(--error);">${userAnswer}</span>
            &rarr; <span style="color:var(--success);">${correct}</span>
          </div>
          ${notes ? `<div class="feedback-explanation">${notes}</div>` : ''}
        </div>`;
    }

    // TTS
    const ttsContainer = document.createElement('div');
    ttsContainer.style.marginTop = '8px';
    el.appendChild(ttsContainer);
    TTS.renderButton(correct, ttsContainer);
  }

  function addNextButton(feedbackEl, exerciseContainer) {
    const mainContainer = exerciseContainer.closest('#smart-exercise')
      ? exerciseContainer.closest('#smart-exercise').parentElement
      : document.getElementById('main');

    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-secondary';
    nextBtn.style.marginTop = '12px';
    nextBtn.textContent = currentIndex + 1 >= queue.length ? 'Finish' : 'Next';
    const advance = () => { currentIndex++; showCard(mainContainer); };
    nextBtn.addEventListener('click', advance);
    feedbackEl.appendChild(nextBtn);
    setTimeout(() => nextBtn.focus(), 150);

    let canAdvance = false;
    setTimeout(() => { canAdvance = true; }, 100);
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Enter' && canAdvance) {
        document.removeEventListener('keydown', handler);
        advance();
      }
    });
  }

  function showSummary(container) {
    const accuracy = sessionStats.reviewed > 0
      ? Math.round((sessionStats.correct / sessionStats.reviewed) * 100) : 0;

    const weakCategories = SRSEngine.getWeakCategories();
    const weakHtml = weakCategories.length > 0
      ? `<div style="margin-top:16px;">
          <div class="section-label">Areas to improve</div>
          ${weakCategories.map(w => `
            <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:13px;">
              <span>${w.category.replace(/_/g, ' ')}</span>
              <span style="color:var(--error);">${w.accuracy}% accuracy</span>
            </div>`).join('')}
        </div>`
      : '';

    const typeBreakdown = Object.entries(sessionStats.types).map(([type, count]) =>
      `<span class="badge" style="margin:2px;">${getTypeBadge(type)} x${count}</span>`
    ).join('');

    container.innerHTML = `
      <div class="card" style="text-align:center;padding:32px 24px;">
        <div style="font-size:48px;margin-bottom:16px;">&#10024;</div>
        <div class="page-title">Session Complete</div>

        <div class="stat-row" style="margin-top:16px;">
          <div class="stat-box">
            <div class="stat-number">${sessionStats.reviewed}</div>
            <div class="stat-label">Reviewed</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">${accuracy}%</div>
            <div class="stat-label">Accuracy</div>
          </div>
        </div>

        <div style="margin-top:12px;">${typeBreakdown}</div>

        ${weakHtml}

        <div style="display:flex;gap:8px;justify-content:center;margin-top:24px;">
          <button class="btn btn-sm btn-secondary" onclick="SmartSession.render(document.getElementById('main'))">New Session</button>
          <button class="btn btn-sm" onclick="App.navigate('home')">Home</button>
        </div>
      </div>`;
  }

  return { render };
})();
