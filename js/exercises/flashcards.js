/*
 * Flashcards — FSRS-scheduled, PRODUCTION-FIRST
 * Shows English → user TYPES the target language → accent-aware grading
 * Lapsed cards (Again) get a quick review mode: shows target → English
 */

const Flashcards = (() => {
  let queue = [];
  let currentIndex = 0;
  let answered = false;
  let currentCard = null;

  function render(container) {
    const allIds = DATA.getAllVocabIds();
    const study = SRSEngine.getStudyQueue(allIds);
    queue = [...study.due, ...study.new];

    if (queue.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">&#9898;</div>
          <div class="empty-state-text">No cards due right now</div>
          <p style="color:var(--text-tertiary);font-size:13px;margin-top:8px;">Come back later or add new cards from the dashboard.</p>
        </div>`;
      return;
    }

    currentIndex = 0;
    showCard(container);
  }

  function showCard(container) {
    if (currentIndex >= queue.length) {
      const stats = SRSEngine.getTodayStats();
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">&#10004;</div>
          <div class="empty-state-text">Session complete!</div>
          <p style="color:var(--text-tertiary);font-size:13px;margin-top:8px;">
            ${stats.reviews} cards reviewed today.
          </p>
          <button class="btn btn-sm" style="margin:16px auto;display:inline-block;" onclick="App.navigate('dashboard')">Back to Dashboard</button>
        </div>`;
      return;
    }

    answered = false;
    const cardId = queue[currentIndex];
    currentCard = DATA.getVocabCard(cardId);

    if (!currentCard) {
      currentIndex++;
      showCard(container);
      return;
    }

    SRSEngine.getOrCreateCard(cardId);

    // Check if this is a lapsed card — show review mode (target → English) briefly
    const srsCard = SRSEngine.loadCards()[cardId];
    const isLapsed = srsCard && srsCard.lapses > 0 && srsCard.reps <= srsCard.lapses + 1;

    if (isLapsed) {
      showReviewMode(container, cardId);
    } else {
      showProductionMode(container, cardId);
    }
  }

  // Production mode: English → type target language
  function showProductionMode(container, cardId) {
    container.innerHTML = `
      <div class="session-counter">${currentIndex + 1} / ${queue.length}</div>

      <div class="card" style="text-align:center;padding:32px 24px;">
        <div class="badge" style="margin-bottom:16px;">${currentCard.theme}</div>
        <div style="font-size:20px;font-weight:700;margin-bottom:8px;">${currentCard.english}</div>
        <div style="font-size:13px;color:var(--text-secondary);">${currentCard.grammar_notes || ''}</div>
      </div>

      <div class="input-row">
        <input class="input" type="text" id="flash-input" placeholder="Type the translation..."
               autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
        <button class="btn" id="flash-submit">Check</button>
      </div>

      <div id="flash-feedback" style="margin-top:12px;"></div>`;

    const input = document.getElementById('flash-input');
    input.focus();

    const submit = () => {
      if (answered) return;
      const userAnswer = input.value.trim();
      if (!userAnswer) return;
      answered = true;
      showFeedback(container, cardId, userAnswer);
    };

    document.getElementById('flash-submit').addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
  }

  // Review mode for lapsed cards: shows target → English for re-exposure
  function showReviewMode(container, cardId) {
    const options = SRSEngine.getSchedulingOptions(cardId);

    container.innerHTML = `
      <div class="session-counter">${currentIndex + 1} / ${queue.length}</div>

      <div class="card" style="text-align:center;padding:32px 24px;">
        <div style="font-size:10px;font-weight:600;color:var(--error);text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Review (lapsed)</div>
        <div class="badge" style="margin-bottom:16px;">${currentCard.theme}</div>
        <div style="font-size:24px;font-weight:700;margin-bottom:12px;">${currentCard.spanish}</div>
        <div style="font-size:18px;color:var(--accent);">${currentCard.english}</div>
        <div id="tts-container" style="margin-top:12px;"></div>
      </div>

      <div class="fsrs-buttons">
        <button class="fsrs-btn again" data-rating="1">Again<span class="time">${options[1].interval}</span></button>
        <button class="fsrs-btn" data-rating="2">Hard<span class="time">${options[2].interval}</span></button>
        <button class="fsrs-btn good" data-rating="3">Good<span class="time">${options[3].interval}</span></button>
        <button class="fsrs-btn" data-rating="4">Easy<span class="time">${options[4].interval}</span></button>
      </div>`;

    TTS.renderButton(currentCard.spanish, document.getElementById('tts-container'));

    document.querySelectorAll('.fsrs-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        SRSEngine.reviewCard(cardId, parseInt(btn.dataset.rating));
        currentIndex++;
        showCard(container);
      });
    });
  }

  function showFeedback(container, cardId, userAnswer) {
    const grade = SRSEngine.gradeAnswer(userAnswer, currentCard.spanish);
    SRSEngine.reviewCard(cardId, grade.rating);

    // Track error patterns
    if (grade.match === 'accent') {
      SRSEngine.recordErrorPattern('accent_errors', false);
    } else if (grade.match === 'wrong') {
      SRSEngine.recordErrorPattern('spelling_errors', false);
    } else {
      SRSEngine.recordErrorPattern('spelling_errors', true);
    }
    SRSEngine.recordThemeAccuracy(currentCard.theme, grade.match !== 'wrong');

    // Remove input
    const inputRow = container.querySelector('.input-row');
    if (inputRow) inputRow.remove();

    const feedbackEl = document.getElementById('flash-feedback');

    if (grade.match === 'exact') {
      feedbackEl.innerHTML = `
        <div class="feedback correct">
          <div class="feedback-label">Correct!</div>
          <div class="feedback-answer">${currentCard.spanish}</div>
        </div>`;
    } else if (grade.match === 'accent' || grade.match === 'close') {
      feedbackEl.innerHTML = `
        <div class="feedback almost">
          <div class="feedback-label">Almost!</div>
          <div class="feedback-answer">${currentCard.spanish}</div>
          <div class="feedback-explanation">${grade.details}</div>
        </div>`;
    } else {
      feedbackEl.innerHTML = `
        <div class="feedback wrong">
          <div class="feedback-label">Incorrect</div>
          <div class="feedback-answer">
            <span style="text-decoration:line-through;color:var(--error);">${userAnswer}</span>
            &rarr; <span style="color:var(--success);">${currentCard.spanish}</span>
          </div>
        </div>`;
    }

    // TTS + pronunciation mic
    const extras = document.createElement('div');
    extras.style.marginTop = '8px';
    extras.style.display = 'flex';
    extras.style.gap = '8px';
    extras.style.justifyContent = 'center';
    feedbackEl.appendChild(extras);
    TTS.renderButton(currentCard.spanish, extras);
    if (typeof Pronunciation !== 'undefined') {
      Pronunciation.renderMicButton(currentCard.spanish, extras);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-secondary';
    nextBtn.style.marginTop = '12px';
    nextBtn.textContent = 'Next';
    const advance = () => { currentIndex++; showCard(container); };
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
