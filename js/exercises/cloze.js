/*
 * Cloze Deletion — Fill-in-the-blank in sentence context
 */

const Cloze = (() => {
  let queue = [];
  let currentIndex = 0;
  let answered = false;
  let hintLevel = 0;

  function generateQueue(count = 12) {
    const vocab = DATA.getAllVocab();
    const items = [];

    for (const card of vocab) {
      // Pick a chunk to blank out
      if (card.chunks && card.chunks.length > 0) {
        const blankChunk = card.chunks[Math.floor(Math.random() * card.chunks.length)];
        const sentence = card.spanish;
        // Check that the chunk actually appears in the sentence
        const idx = sentence.toLowerCase().indexOf(blankChunk.toLowerCase());
        if (idx !== -1) {
          items.push({
            id: card.id,
            sentence: sentence,
            blank: sentence.substring(idx, idx + blankChunk.length),
            theme: card.theme,
            english: card.english,
            grammar_notes: card.grammar_notes,
          });
        }
      }
    }

    // Shuffle and take count
    return items.sort(() => Math.random() - 0.5).slice(0, count);
  }

  function render(container) {
    queue = generateQueue(12);
    currentIndex = 0;

    if (queue.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">&#9997;</div>
          <div class="empty-state-text">No cloze exercises available</div>
        </div>`;
      return;
    }

    showItem(container);
  }

  function showItem(container) {
    if (currentIndex >= queue.length) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">&#10004;</div>
          <div class="empty-state-text">Cloze session complete!</div>
          <div style="display:flex;gap:8px;justify-content:center;margin-top:16px;">
            <button class="btn btn-sm btn-secondary" onclick="Cloze.render(document.getElementById('main'))">Again</button>
            <button class="btn btn-sm" onclick="App.navigate('practice')">Back</button>
          </div>
        </div>`;
      return;
    }

    answered = false;
    hintLevel = 0;
    const item = queue[currentIndex];

    // Build sentence with blank
    const blankStart = item.sentence.toLowerCase().indexOf(item.blank.toLowerCase());
    const before = item.sentence.substring(0, blankStart);
    const after = item.sentence.substring(blankStart + item.blank.length);

    container.innerHTML = `
      <div class="session-counter">${currentIndex + 1} / ${queue.length}</div>

      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <span class="badge">${item.theme}</span>
          <span style="font-size:12px;color:var(--text-tertiary);">${item.english}</span>
        </div>
        <div class="cloze-sentence">
          ${before}<span class="cloze-blank" id="cloze-display">___</span>${after}
        </div>
        <div class="cloze-hint" id="cloze-hint-area">
          <button class="cloze-hint-btn" id="hint-btn">Show hint</button>
        </div>
        <div id="tts-container" style="text-align:center;"></div>
      </div>

      <div class="input-row">
        <input class="input" type="text" id="cloze-input" placeholder="Fill in the blank..."
               autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
        <button class="btn" id="cloze-submit">Check</button>
      </div>

      <div id="cloze-feedback" style="margin-top:12px;"></div>`;

    // TTS for full sentence
    TTS.renderButton(item.sentence, document.getElementById('tts-container'));

    const input = document.getElementById('cloze-input');
    input.focus();

    // Hint button
    document.getElementById('hint-btn').addEventListener('click', () => {
      hintLevel++;
      showHint(item.blank, hintLevel);
    });

    const submit = () => {
      if (answered) return;
      const userAnswer = input.value.trim();
      if (!userAnswer) return;
      answered = true;
      checkAnswer(container, item, userAnswer);
    };

    document.getElementById('cloze-submit').addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
  }

  function showHint(blank, level) {
    const hintArea = document.getElementById('cloze-hint-area');
    if (level === 1) {
      // Show first letter + length
      hintArea.innerHTML = `<span style="font-size:12px;color:var(--text-tertiary);font-family:var(--mono);">${blank[0]} ${'_ '.repeat(blank.length - 1).trim()} (${blank.length} letters)</span>`;
    } else if (level >= 2) {
      // Show first and last letter
      hintArea.innerHTML = `<span style="font-size:12px;color:var(--text-tertiary);font-family:var(--mono);">${blank[0]} ${'_ '.repeat(blank.length - 2).trim()} ${blank[blank.length - 1]} (${blank.length} letters)</span>`;
    }
  }

  function checkAnswer(container, item, userAnswer) {
    const normalizedUser = normalize(userAnswer);
    const normalizedCorrect = normalize(item.blank);
    const isCorrect = normalizedUser === normalizedCorrect;

    const rating = isCorrect
      ? (hintLevel === 0 ? FSRS.Rating.Good : FSRS.Rating.Hard)
      : FSRS.Rating.Again;
    SRSEngine.reviewCard(item.id, rating);

    // Update the blank display
    const display = document.getElementById('cloze-display');
    if (display) {
      display.textContent = item.blank;
      display.style.color = isCorrect ? 'var(--success)' : 'var(--error)';
    }

    const feedbackEl = document.getElementById('cloze-feedback');

    if (isCorrect) {
      feedbackEl.innerHTML = `
        <div class="feedback correct">
          <div class="feedback-label">${hintLevel > 0 ? 'Correct (with hint)' : 'Correct!'}</div>
          <div class="feedback-answer">${item.blank}</div>
        </div>`;
    } else {
      feedbackEl.innerHTML = `
        <div class="feedback wrong">
          <div class="feedback-label">Incorrect</div>
          <div class="feedback-answer">
            <span style="text-decoration:line-through;color:var(--error);">${userAnswer}</span>
            &rarr; <span style="color:var(--success);">${item.blank}</span>
          </div>
          <div class="feedback-explanation">${item.grammar_notes || ''}</div>
        </div>`;
    }

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
      .replace(/[^a-z0-9]/g, '');
  }

  return { render };
})();
