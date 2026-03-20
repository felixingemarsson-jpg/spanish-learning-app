/*
 * Dictation — Listen and type what you hear
 */

const Dictation = (() => {
  let queue = [];
  let currentIndex = 0;
  let answered = false;

  function generateQueue(count = 10) {
    const vocab = DATA.getAllVocab();
    return vocab.slice().sort(() => Math.random() - 0.5).slice(0, count);
  }

  function render(container) {
    if (!TTS.isEnabled()) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">&#128266;</div>
          <div class="empty-state-text">Enable TTS in Settings for dictation exercises</div>
          <div style="margin-top:16px;">
            <button class="btn btn-sm" onclick="App.navigate('settings')">Settings</button>
          </div>
        </div>`;
      return;
    }

    queue = generateQueue(10);
    currentIndex = 0;

    if (queue.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">&#128266;</div>
          <div class="empty-state-text">No vocabulary available for dictation</div>
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
          <div class="empty-state-text">Dictation session complete!</div>
          <div style="display:flex;gap:8px;justify-content:center;margin-top:16px;">
            <button class="btn btn-sm btn-secondary" onclick="Dictation.render(document.getElementById('main'))">Again</button>
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
        <div class="section-label">Listen &amp; Type</div>
        <div style="text-align:center;margin-bottom:16px;">
          <div id="tts-container"></div>
        </div>
        <div style="font-size:13px;color:var(--text-secondary);text-align:center;">
          <span class="badge">${item.theme}</span>
        </div>
      </div>

      <div class="input-row">
        <input class="input" type="text" id="dict-input" placeholder="Type what you hear..."
               autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
        <button class="btn" id="dict-submit">Check</button>
      </div>

      <div id="dict-feedback" style="margin-top:12px;"></div>`;

    // Render replay button
    TTS.renderButton(item.spanish, document.getElementById('tts-container'));

    // Auto-play on show
    TTS.speak(item.spanish);

    const input = document.getElementById('dict-input');
    input.focus();

    const submit = () => {
      if (answered) return;
      const userAnswer = input.value.trim();
      if (!userAnswer) return;
      answered = true;
      checkAnswer(container, item, userAnswer);
    };

    document.getElementById('dict-submit').addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
  }

  function checkAnswer(container, item, userAnswer) {
    const grade = SRSEngine.gradeAnswer(userAnswer, item.spanish);
    SRSEngine.reviewCard(item.id, grade.rating);

    // Record accent errors specifically
    if (grade.match === 'accent') {
      SRSEngine.recordErrorPattern('accent_errors', false);
    } else {
      SRSEngine.recordErrorPattern('accent_errors', grade.match !== 'wrong');
    }

    const inputRow = container.querySelector('.input-row');
    if (inputRow) inputRow.remove();

    const feedbackEl = document.getElementById('dict-feedback');
    const isCorrect = grade.match === 'exact';
    const isClose = grade.match === 'accent' || grade.match === 'close';

    if (isCorrect) {
      feedbackEl.innerHTML = `
        <div class="feedback correct">
          <div class="feedback-label">Perfect!</div>
          <div class="feedback-answer">${item.spanish}</div>
        </div>`;
    } else if (isClose) {
      feedbackEl.innerHTML = `
        <div class="feedback correct">
          <div class="feedback-label">Close!</div>
          <div class="feedback-answer">${item.spanish}</div>
          <div class="feedback-explanation">${grade.details}</div>
          <div class="feedback-explanation">Your answer: "${userAnswer}"</div>
        </div>`;
    } else {
      feedbackEl.innerHTML = `
        <div class="feedback wrong">
          <div class="feedback-label">Incorrect</div>
          <div class="feedback-answer">
            <span style="text-decoration:line-through;color:var(--error);">${userAnswer}</span>
            &rarr; <span style="color:var(--success);">${item.spanish}</span>
          </div>
          <div class="feedback-explanation">${item.english}</div>
        </div>`;
    }

    // TTS replay in feedback
    const ttsContainer = document.createElement('div');
    ttsContainer.style.marginTop = '8px';
    feedbackEl.appendChild(ttsContainer);
    TTS.renderButton(item.spanish, ttsContainer);

    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-secondary';
    nextBtn.style.marginTop = '12px';
    nextBtn.textContent = 'Next';
    const advance = () => { currentIndex++; showItem(container); };
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

  return { render };
})();
