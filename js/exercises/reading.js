/*
 * Reading Comprehension — Read a passage, answer fill-in-the-blank questions
 */

const Reading = (() => {
  let currentPassage = null;
  let questionIndex = 0;
  let answered = false;

  function render(container) {
    if (!DATA.readings || DATA.readings.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">&#128214;</div>
          <div class="empty-state-text">No reading passages available yet</div>
        </div>`;
      return;
    }

    // Filter passages to learner's level based on SRS card presence
    const passages = filterByLevel(DATA.readings);

    if (passages.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">&#128214;</div>
          <div class="empty-state-text">No passages match your current level</div>
        </div>`;
      return;
    }

    // Pick a random passage
    currentPassage = passages[Math.floor(Math.random() * passages.length)];
    questionIndex = 0;

    showPassage(container);
  }

  function filterByLevel(passages) {
    // Determine which levels the learner has cards for
    const vocab = DATA.getAllVocab();
    const levels = new Set();
    for (const card of vocab) {
      if (card.level) levels.add(card.level);
    }

    if (levels.size === 0) return passages; // no level info, show all

    return passages.filter(p => levels.has(p.level));
  }

  function showPassage(container) {
    const p = currentPassage;

    container.innerHTML = `
      <div class="session-counter">Reading</div>

      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <span class="badge">${p.level || 'reading'}</span>
          <div id="tts-container"></div>
        </div>
        <div style="font-size:17px;line-height:1.8;margin-bottom:16px;" id="passage-text">${p.text}</div>
        <div style="font-size:13px;color:var(--text-tertiary);font-style:italic;">${p.english}</div>
      </div>

      <div style="text-align:center;margin:16px 0;">
        <button class="btn" id="start-questions">Answer Questions</button>
      </div>

      <div id="reading-questions"></div>`;

    // TTS for full passage
    TTS.renderButton(p.text, document.getElementById('tts-container'));

    document.getElementById('start-questions').addEventListener('click', () => {
      document.getElementById('start-questions').style.display = 'none';
      showQuestion(container);
    });
  }

  function showQuestion(container) {
    const p = currentPassage;

    if (!p.questions || questionIndex >= p.questions.length) {
      const questionsEl = document.getElementById('reading-questions');
      questionsEl.innerHTML = `
        <div class="empty-state" style="padding:24px;">
          <div class="empty-state-icon">&#10004;</div>
          <div class="empty-state-text">Passage complete!</div>
          <div style="display:flex;gap:8px;justify-content:center;margin-top:16px;">
            <button class="btn btn-sm btn-secondary" onclick="Reading.render(document.getElementById('main'))">Next Passage</button>
            <button class="btn btn-sm" onclick="App.navigate('practice')">Back</button>
          </div>
        </div>`;
      return;
    }

    answered = false;
    const q = p.questions[questionIndex];

    const questionsEl = document.getElementById('reading-questions');
    questionsEl.innerHTML = `
      <div class="session-counter">Question ${questionIndex + 1} / ${p.questions.length}</div>

      <div class="card">
        <div class="section-label">Fill in the blank</div>
        <div style="font-size:17px;line-height:1.6;margin-bottom:8px;">${q.sentence_with_blank}</div>
        ${q.hint ? `<div style="font-size:12px;color:var(--text-tertiary);">Hint: ${q.hint}</div>` : ''}
      </div>

      <div class="input-row">
        <input class="input" type="text" id="reading-input" placeholder="Your answer..."
               autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
        <button class="btn" id="reading-submit">Check</button>
      </div>

      <div id="reading-feedback" style="margin-top:12px;"></div>`;

    const input = document.getElementById('reading-input');
    input.focus();

    const submit = () => {
      if (answered) return;
      const userAnswer = input.value.trim();
      if (!userAnswer) return;
      answered = true;
      checkQuestion(container, q, userAnswer);
    };

    document.getElementById('reading-submit').addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
  }

  function checkQuestion(container, q, userAnswer) {
    const grade = SRSEngine.gradeAnswer(userAnswer, q.answer);

    // Review the passage card if it has an id
    if (currentPassage.id) {
      SRSEngine.reviewCard(currentPassage.id, grade.rating);
    }

    const questionsEl = document.getElementById('reading-questions');
    const inputRow = questionsEl.querySelector('.input-row');
    if (inputRow) inputRow.remove();

    const feedbackEl = document.getElementById('reading-feedback');
    const isCorrect = grade.match === 'exact' || grade.match === 'close' || grade.match === 'accent';

    if (isCorrect) {
      feedbackEl.innerHTML = `
        <div class="feedback correct">
          <div class="feedback-label">${grade.match === 'exact' ? 'Correct!' : 'Close enough!'}</div>
          <div class="feedback-answer">${q.answer}</div>
          ${grade.details ? `<div class="feedback-explanation">${grade.details}</div>` : ''}
        </div>`;
    } else {
      feedbackEl.innerHTML = `
        <div class="feedback wrong">
          <div class="feedback-label">Incorrect</div>
          <div class="feedback-answer">
            <span style="text-decoration:line-through;color:var(--error);">${userAnswer}</span>
            &rarr; <span style="color:var(--success);">${q.answer}</span>
          </div>
        </div>`;
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-secondary';
    nextBtn.style.marginTop = '12px';
    nextBtn.textContent = questionIndex + 1 < currentPassage.questions.length ? 'Next Question' : 'Finish';
    const advance = () => { questionIndex++; showQuestion(container); };
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
