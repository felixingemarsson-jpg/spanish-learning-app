/*
 * Conjugation Drill — Interleaved tense practice
 * Shows infinitive + subject + tense → user types conjugated form
 */

const Conjugation = (() => {
  let drillQueue = [];
  let currentIndex = 0;
  let answered = false;

  function generateQueue(count = 15) {
    const queue = [];
    for (let i = 0; i < count; i++) {
      const verb = DATA.getRandomVerb();
      const tense = DATA.getRandomTense();
      const pronoun = DATA.getRandomPronoun();
      const answer = verb.tenses[tense][pronoun];
      if (answer) {
        queue.push({ verb, tense, pronoun, answer });
      }
    }
    return queue;
  }

  function render(container) {
    drillQueue = generateQueue(15);
    currentIndex = 0;
    showDrill(container);
  }

  function showDrill(container) {
    if (currentIndex >= drillQueue.length) {
      const stats = SRSEngine.getTodayStats();
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">&#10004;</div>
          <div class="empty-state-text">Drill complete!</div>
          <p style="color:var(--text-tertiary);font-size:13px;margin-top:8px;">
            ${drillQueue.length} conjugations practiced.
          </p>
          <div style="display:flex;gap:8px;justify-content:center;margin-top:16px;">
            <button class="btn btn-sm btn-secondary" onclick="Conjugation.render(document.getElementById('main'))">Again</button>
            <button class="btn btn-sm" onclick="App.navigate('practice')">Back</button>
          </div>
        </div>`;
      return;
    }

    answered = false;
    const item = drillQueue[currentIndex];
    const cardId = `verb-${item.verb.infinitive}-${item.tense}-${item.pronoun}`;

    container.innerHTML = `
      <div class="session-counter">${currentIndex + 1} / ${drillQueue.length}</div>

      <div class="card">
        <div style="display:flex;gap:8px;margin-bottom:16px;">
          <span class="badge">${item.verb.infinitive}</span>
          <span class="badge badge-tense">${DATA.tenseDisplay[item.tense]}</span>
        </div>
        <div style="font-size:20px;font-weight:700;margin-bottom:4px;">
          ${item.verb.infinitive} — ${item.verb.english}
        </div>
        <div style="font-size:15px;color:var(--text-secondary);">
          ${DATA.pronounDisplay[item.pronoun]}
        </div>
        <div id="tts-container" style="margin-top:8px;"></div>
      </div>

      <div class="input-row">
        <input class="input" type="text" id="conj-input" placeholder="Type conjugation..."
               autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
        <button class="btn" id="conj-submit">Check</button>
      </div>

      <div id="conj-feedback" style="margin-top:12px;"></div>`;

    const input = document.getElementById('conj-input');
    const submitBtn = document.getElementById('conj-submit');

    input.focus();

    const submit = () => {
      if (answered) return;
      const userAnswer = input.value.trim().toLowerCase();
      if (!userAnswer) return;
      answered = true;
      showFeedback(container, item, userAnswer, cardId);
    };

    submitBtn.addEventListener('click', submit);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submit();
    });
  }

  function showFeedback(container, item, userAnswer, cardId) {
    const correct = normalize(userAnswer) === normalize(item.answer);
    const rating = correct ? FSRS.Rating.Good : FSRS.Rating.Again;
    SRSEngine.reviewCard(cardId, rating);

    const feedbackEl = document.getElementById('conj-feedback');

    if (correct) {
      feedbackEl.innerHTML = `
        <div class="feedback correct">
          <div class="feedback-label">Correct</div>
          <div class="feedback-answer">${item.answer}</div>
        </div>`;
    } else {
      // Build explanation of the pattern
      const explanation = getPatternExplanation(item);
      feedbackEl.innerHTML = `
        <div class="feedback wrong">
          <div class="feedback-label">Incorrect</div>
          <div class="feedback-answer">
            <span style="text-decoration:line-through;color:var(--error);">${userAnswer}</span>
            &rarr; <span style="color:var(--success);">${item.answer}</span>
          </div>
          <div class="feedback-explanation">${explanation}</div>
        </div>`;
    }

    // TTS for the correct answer
    const ttsContainer = document.createElement('div');
    ttsContainer.style.marginTop = '8px';
    feedbackEl.appendChild(ttsContainer);
    TTS.renderButton(`${DATA.pronounDisplay[item.pronoun]} ${item.answer}`, ttsContainer);

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-secondary';
    nextBtn.style.marginTop = '12px';
    nextBtn.textContent = 'Next';
    nextBtn.addEventListener('click', () => {
      currentIndex++;
      showDrill(container);
    });
    feedbackEl.appendChild(nextBtn);

    // Also allow Enter to proceed
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Enter') {
        document.removeEventListener('keydown', handler);
        currentIndex++;
        showDrill(container);
      }
    });
  }

  function getPatternExplanation(item) {
    const v = item.verb;
    if (v.type === 'regular-ar' && item.tense === 'present') {
      return `Regular -AR present: drop -ar, add ending. yo=-o, tu=-as, el=-a, nosotros=-amos, vosotros=-ais, ellos=-an`;
    }
    if (v.type === 'regular-er' && item.tense === 'present') {
      return `Regular -ER present: drop -er, add ending. yo=-o, tu=-es, el=-e, nosotros=-emos, vosotros=-eis, ellos=-en`;
    }
    if (v.type === 'regular-ir' && item.tense === 'present') {
      return `Regular -IR present: drop -ir, add ending. yo=-o, tu=-es, el=-e, nosotros=-imos, vosotros=-is, ellos=-en`;
    }
    if (item.tense === 'preterite') {
      if (v.type.startsWith('regular-ar')) return `Regular -AR preterite: yo=-e, tu=-aste, el=-o, nosotros=-amos, vosotros=-asteis, ellos=-aron`;
      if (v.type.startsWith('regular-er') || v.type.startsWith('regular-ir')) return `Regular -ER/-IR preterite: yo=-i, tu=-iste, el=-io, nosotros=-imos, vosotros=-isteis, ellos=-ieron`;
      return `${v.infinitive} is irregular in the preterite. The correct form is: ${item.answer}`;
    }
    if (item.tense === 'imperfect') {
      if (v.type.startsWith('regular-ar')) return `Regular -AR imperfect: yo=-aba, tu=-abas, el=-aba, nosotros=-abamos, vosotros=-abais, ellos=-aban`;
      return `Regular -ER/-IR imperfect: yo=-ia, tu=-ias, el=-ia, nosotros=-iamos, vosotros=-iais, ellos=-ian`;
    }
    return `${v.infinitive} is irregular. The correct form for ${DATA.pronounDisplay[item.pronoun]} (${DATA.tenseDisplay[item.tense]}) is: ${item.answer}`;
  }

  function normalize(str) {
    // Strip accents for comparison (accept minor accent omissions)
    return str.toLowerCase().trim()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z]/g, '');
  }

  return { render };
})();
