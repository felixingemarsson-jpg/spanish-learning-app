/*
 * Word Order — Tap words in the correct order to build a sentence
 */

const WordOrder = (() => {
  let queue = [];
  let currentIndex = 0;
  let selectedWords = [];
  let availableWords = [];
  let answered = false;

  function generateQueue(count = 10) {
    const vocab = DATA.getAllVocab();
    // Only use cards with multi-word spanish text
    const multiWord = vocab.filter(c => c.spanish && c.spanish.trim().split(/\s+/).length >= 3);
    return multiWord.sort(() => Math.random() - 0.5).slice(0, count);
  }

  function render(container) {
    queue = generateQueue(10);
    currentIndex = 0;

    if (queue.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">&#128260;</div>
          <div class="empty-state-text">No sentences available for word order exercises</div>
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
          <div class="empty-state-text">Word order session complete!</div>
          <div style="display:flex;gap:8px;justify-content:center;margin-top:16px;">
            <button class="btn btn-sm btn-secondary" onclick="WordOrder.render(document.getElementById('main'))">Again</button>
            <button class="btn btn-sm" onclick="App.navigate('practice')">Back</button>
          </div>
        </div>`;
      return;
    }

    answered = false;
    const item = queue[currentIndex];
    const words = item.spanish.trim().split(/\s+/);

    // Shuffle words (Fisher-Yates)
    availableWords = words.map((w, i) => ({ text: w, origIndex: i }));
    for (let i = availableWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableWords[i], availableWords[j]] = [availableWords[j], availableWords[i]];
    }
    selectedWords = [];

    container.innerHTML = `
      <div class="session-counter">${currentIndex + 1} / ${queue.length}</div>

      <div class="card">
        <div class="section-label">Arrange in order</div>
        <div style="font-size:18px;font-weight:700;margin-bottom:12px;">${item.english}</div>
        <div style="font-size:13px;color:var(--text-secondary);">
          <span class="badge">${item.theme}</span>
        </div>
      </div>

      <div class="card" style="min-height:56px;">
        <div class="section-label">Your sentence</div>
        <div id="wo-selected" style="display:flex;flex-wrap:wrap;gap:6px;min-height:36px;"></div>
      </div>

      <div class="card">
        <div id="wo-available" style="display:flex;flex-wrap:wrap;gap:6px;"></div>
      </div>

      <button class="btn" id="wo-check" disabled>Check</button>

      <div id="wo-feedback" style="margin-top:12px;"></div>`;

    renderChips();

    document.getElementById('wo-check').addEventListener('click', () => {
      if (answered) return;
      if (selectedWords.length === 0) return;
      answered = true;
      checkAnswer(container, item);
    });
  }

  function renderChips() {
    const availEl = document.getElementById('wo-available');
    const selEl = document.getElementById('wo-selected');
    const checkBtn = document.getElementById('wo-check');

    availEl.innerHTML = '';
    selEl.innerHTML = '';

    for (let i = 0; i < availableWords.length; i++) {
      const chip = createChip(availableWords[i].text, () => {
        selectedWords.push(availableWords.splice(i, 1)[0]);
        renderChips();
      });
      availEl.appendChild(chip);
    }

    for (let i = 0; i < selectedWords.length; i++) {
      const chip = createChip(selectedWords[i].text, () => {
        availableWords.push(selectedWords.splice(i, 1)[0]);
        renderChips();
      }, true);
      selEl.appendChild(chip);
    }

    if (checkBtn) checkBtn.disabled = selectedWords.length === 0;
  }

  function createChip(text, onClick, isSelected) {
    const chip = document.createElement('button');
    chip.className = 'theme-chip' + (isSelected ? ' active' : '');
    chip.textContent = text;
    chip.style.fontSize = '15px';
    chip.style.padding = '8px 14px';
    chip.style.cursor = 'pointer';
    chip.addEventListener('click', onClick);
    return chip;
  }

  function checkAnswer(container, item) {
    const userSentence = selectedWords.map(w => w.text).join(' ');
    const grade = SRSEngine.gradeAnswer(userSentence, item.spanish);
    SRSEngine.reviewCard(item.id, grade.rating);
    SRSEngine.recordErrorPattern('word_order_errors', grade.match !== 'wrong');

    // Remove check button
    const checkBtn = document.getElementById('wo-check');
    if (checkBtn) checkBtn.remove();

    const feedbackEl = document.getElementById('wo-feedback');
    const isCorrect = grade.match === 'exact' || grade.match === 'close' || grade.match === 'accent';

    if (isCorrect) {
      feedbackEl.innerHTML = `
        <div class="feedback correct">
          <div class="feedback-label">${grade.match === 'exact' ? 'Correct!' : 'Close!'}</div>
          <div class="feedback-answer">${item.spanish}</div>
          ${grade.details ? `<div class="feedback-explanation">${grade.details}</div>` : ''}
        </div>`;
    } else {
      feedbackEl.innerHTML = `
        <div class="feedback wrong">
          <div class="feedback-label">Incorrect</div>
          <div class="feedback-answer">
            <span style="text-decoration:line-through;color:var(--error);">${userSentence}</span>
            &rarr; <span style="color:var(--success);">${item.spanish}</span>
          </div>
        </div>`;
    }

    // TTS
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
