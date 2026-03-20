/*
 * Translation — EN→ES sentence production with fuzzy matching
 */

const Translation = (() => {
  let queue = [];
  let currentIndex = 0;
  let answered = false;

  function render(container) {
    const vocab = DATA.getAllVocab();
    // Shuffle
    queue = vocab.slice().sort(() => Math.random() - 0.5).slice(0, 15);
    currentIndex = 0;
    showItem(container);
  }

  function showItem(container) {
    if (currentIndex >= queue.length) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">&#10004;</div>
          <div class="empty-state-text">Translation session complete!</div>
          <div style="display:flex;gap:8px;justify-content:center;margin-top:16px;">
            <button class="btn btn-sm btn-secondary" onclick="Translation.render(document.getElementById('main'))">Again</button>
            <button class="btn btn-sm" onclick="App.navigate('practice')">Back</button>
          </div>
        </div>`;
      return;
    }

    answered = false;
    const item = queue[currentIndex];

    container.innerHTML = `
      <div class="session-counter">${currentIndex + 1} / ${queue.length}</div>

      <div class="card">
        <div class="section-label">Translate to Spanish</div>
        <div style="font-size:20px;font-weight:700;margin-bottom:8px;">${item.english}</div>
        <div style="font-size:13px;color:var(--text-secondary);">
          <span class="badge">${item.theme}</span>
          <span style="margin-left:8px;">${item.context || ''}</span>
        </div>
      </div>

      <div class="input-row">
        <input class="input" type="text" id="trans-input" placeholder="Type in Spanish..."
               autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
        <button class="btn" id="trans-submit">Check</button>
      </div>

      <div id="trans-feedback" style="margin-top:12px;"></div>`;

    const input = document.getElementById('trans-input');
    const submitBtn = document.getElementById('trans-submit');
    input.focus();

    const submit = () => {
      if (answered) return;
      const userAnswer = input.value.trim();
      if (!userAnswer) return;
      answered = true;
      checkAnswer(container, item, userAnswer);
    };

    submitBtn.addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
  }

  function checkAnswer(container, item, userAnswer) {
    const similarity = fuzzyMatch(userAnswer, item.spanish);
    const isCorrect = similarity >= 0.85;
    const rating = isCorrect ? FSRS.Rating.Good : FSRS.Rating.Again;
    SRSEngine.reviewCard(item.id, rating);

    const feedbackEl = document.getElementById('trans-feedback');

    if (isCorrect && similarity === 1) {
      feedbackEl.innerHTML = `
        <div class="feedback correct">
          <div class="feedback-label">Perfect!</div>
          <div class="feedback-answer">${item.spanish}</div>
        </div>`;
    } else if (isCorrect) {
      feedbackEl.innerHTML = `
        <div class="feedback correct">
          <div class="feedback-label">Close enough!</div>
          <div class="feedback-answer">${item.spanish}</div>
          <div class="feedback-explanation">Your answer: "${userAnswer}" — minor differences accepted.</div>
        </div>`;
    } else {
      const diff = highlightDiff(userAnswer, item.spanish);
      feedbackEl.innerHTML = `
        <div class="feedback wrong">
          <div class="feedback-label">Not quite</div>
          <div class="feedback-answer">${diff}</div>
          <div class="feedback-explanation">${item.grammar_notes || ''}</div>
        </div>`;
    }

    // TTS
    const ttsContainer = document.createElement('div');
    ttsContainer.style.marginTop = '8px';
    feedbackEl.appendChild(ttsContainer);
    TTS.renderButton(item.spanish, ttsContainer);

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-secondary';
    nextBtn.style.marginTop = '12px';
    nextBtn.textContent = 'Next';
    nextBtn.addEventListener('click', () => {
      currentIndex++;
      showItem(container);
    });
    feedbackEl.appendChild(nextBtn);

    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Enter') {
        document.removeEventListener('keydown', handler);
        currentIndex++;
        showItem(container);
      }
    });
  }

  function normalize(str) {
    return str.toLowerCase().trim()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ');
  }

  function fuzzyMatch(userAnswer, correct) {
    const a = normalize(userAnswer);
    const b = normalize(correct);
    if (a === b) return 1;

    // Levenshtein distance
    const matrix = [];
    for (let i = 0; i <= a.length; i++) {
      matrix[i] = [i];
      for (let j = 1; j <= b.length; j++) {
        if (i === 0) { matrix[i][j] = j; continue; }
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
      }
    }

    const dist = matrix[a.length][b.length];
    return 1 - dist / Math.max(a.length, b.length);
  }

  function highlightDiff(userAnswer, correct) {
    return `<span style="text-decoration:line-through;color:var(--error);">${userAnswer}</span>
            &rarr; <span style="color:var(--success);">${correct}</span>`;
  }

  return { render };
})();
