/*
 * Flashcards — FSRS-scheduled vocabulary review
 * Shows Spanish → think English → flip to reveal (and reverse)
 */

const Flashcards = (() => {
  let queue = [];
  let currentIndex = 0;
  let flipped = false;
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
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">&#10004;</div>
          <div class="empty-state-text">Session complete!</div>
          <p style="color:var(--text-tertiary);font-size:13px;margin-top:8px;">
            ${SRSEngine.getTodayStats().reviews} cards reviewed today.
          </p>
          <button class="btn btn-sm" style="margin:16px auto;display:inline-block;" onclick="App.navigate('dashboard')">Back to Dashboard</button>
        </div>`;
      return;
    }

    flipped = false;
    const cardId = queue[currentIndex];
    currentCard = DATA.getVocabCard(cardId);

    if (!currentCard) {
      currentIndex++;
      showCard(container);
      return;
    }

    // Ensure card exists in SRS
    SRSEngine.getOrCreateCard(cardId);
    const options = SRSEngine.getSchedulingOptions(cardId);

    container.innerHTML = `
      <div class="session-counter">${currentIndex + 1} / ${queue.length}</div>

      <div class="flashcard" id="flashcard" role="button" tabindex="0" aria-label="Tap to flip card">
        <div class="badge theme-badge">${currentCard.theme}</div>
        <div class="flashcard-text" id="flashcard-front">${currentCard.spanish}</div>
        <div class="flashcard-subtext" id="flashcard-grammar">${currentCard.grammar_notes || ''}</div>
        <div id="flashcard-back" style="display:none;">
          <div class="flashcard-text" style="color:var(--accent);">${currentCard.english}</div>
          <div class="flashcard-context">${currentCard.context || ''}</div>
        </div>
        <div class="flashcard-hint" id="flashcard-hint">Tap to reveal</div>
        <div id="tts-container" style="margin-top:12px;"></div>
      </div>

      <div class="fsrs-buttons" id="fsrs-buttons" style="display:none;">
        <button class="fsrs-btn again" data-rating="1">Again<span class="time">${options[1].interval}</span></button>
        <button class="fsrs-btn" data-rating="2">Hard<span class="time">${options[2].interval}</span></button>
        <button class="fsrs-btn good" data-rating="3">Good<span class="time">${options[3].interval}</span></button>
        <button class="fsrs-btn" data-rating="4">Easy<span class="time">${options[4].interval}</span></button>
      </div>`;

    // TTS button
    TTS.renderButton(currentCard.spanish, document.getElementById('tts-container'));

    // Flip handler
    document.getElementById('flashcard').addEventListener('click', () => flip(container));
    document.getElementById('flashcard').addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') flip(container);
    });

    // Rating handlers
    document.querySelectorAll('#fsrs-buttons .fsrs-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const rating = parseInt(btn.dataset.rating);
        SRSEngine.reviewCard(cardId, rating);
        currentIndex++;
        showCard(container);
      });
    });
  }

  function flip(container) {
    if (flipped) return;
    flipped = true;
    document.getElementById('flashcard-back').style.display = 'block';
    document.getElementById('flashcard-hint').style.display = 'none';
    document.getElementById('fsrs-buttons').style.display = 'flex';
  }

  return { render };
})();
