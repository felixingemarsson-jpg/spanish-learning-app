/*
 * Grammar Quiz — Multiple choice + rule explanation
 */

const GrammarQuiz = (() => {
  let queue = [];
  let currentIndex = 0;
  let answered = false;
  let score = { correct: 0, total: 0 };

  function generateQueue() {
    const items = [];
    for (const rule of DATA.grammarRules) {
      if (rule.quiz_items) {
        for (const qi of rule.quiz_items) {
          items.push({ ...qi, ruleId: rule.id, ruleTitle: rule.title, fullRule: rule.rule });
        }
      }
    }
    return items.sort(() => Math.random() - 0.5);
  }

  function render(container) {
    queue = generateQueue();
    currentIndex = 0;
    score = { correct: 0, total: 0 };

    if (queue.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">&#128218;</div>
          <div class="empty-state-text">No grammar quizzes available</div>
        </div>`;
      return;
    }

    showQuestion(container);
  }

  function showQuestion(container) {
    if (currentIndex >= queue.length) {
      const pct = Math.round((score.correct / score.total) * 100);
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">&#10004;</div>
          <div class="empty-state-text">Grammar quiz complete!</div>
          <p style="color:var(--text-secondary);font-size:15px;margin-top:8px;">
            Score: ${score.correct}/${score.total} (${pct}%)
          </p>
          <div style="display:flex;gap:8px;justify-content:center;margin-top:16px;">
            <button class="btn btn-sm btn-secondary" onclick="GrammarQuiz.render(document.getElementById('main'))">Again</button>
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
        <div class="badge" style="margin-bottom:12px;">${item.ruleTitle}</div>
        <div style="font-size:18px;font-weight:600;line-height:1.5;margin-bottom:16px;">
          ${formatSentence(item.sentence)}
        </div>

        <div class="quiz-options" id="quiz-options">
          ${item.options.map((opt, i) => `
            <button class="quiz-option" data-answer="${opt}" data-index="${i}">${opt}</button>
          `).join('')}
        </div>
      </div>

      <div id="grammar-feedback" style="margin-top:12px;"></div>`;

    // Add click handlers
    document.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const selected = btn.dataset.answer;
        checkAnswer(container, item, selected, btn);
      });
    });
  }

  function formatSentence(sentence) {
    // Highlight the blank
    return sentence.replace(/_+/g, '<span style="color:var(--accent);font-family:var(--mono);font-weight:700;">______</span>');
  }

  function checkAnswer(container, item, selected, selectedBtn) {
    score.total++;
    const isCorrect = selected === item.answer;
    if (isCorrect) score.correct++;

    const rating = isCorrect ? FSRS.Rating.Good : FSRS.Rating.Again;
    SRSEngine.reviewCard(`grammar-${item.ruleId}`, rating);

    // Highlight options
    document.querySelectorAll('.quiz-option').forEach(btn => {
      btn.style.pointerEvents = 'none';
      if (btn.dataset.answer === item.answer) {
        btn.classList.add('correct-answer');
      } else if (btn === selectedBtn && !isCorrect) {
        btn.classList.add('wrong-answer');
      }
    });

    const feedbackEl = document.getElementById('grammar-feedback');

    if (isCorrect) {
      feedbackEl.innerHTML = `
        <div class="feedback correct">
          <div class="feedback-label">Correct!</div>
          <div class="feedback-explanation">${item.explanation}</div>
        </div>`;
    } else {
      feedbackEl.innerHTML = `
        <div class="feedback wrong">
          <div class="feedback-label">Incorrect</div>
          <div class="feedback-answer">Correct answer: <span style="color:var(--success);">${item.answer}</span></div>
          <div class="feedback-explanation">${item.explanation}</div>
          <div class="feedback-explanation" style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border);">
            <strong>Rule:</strong> ${item.fullRule}
          </div>
        </div>`;
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-secondary';
    nextBtn.style.marginTop = '12px';
    nextBtn.textContent = currentIndex + 1 >= queue.length ? 'Finish' : 'Next';
    const advance = () => { currentIndex++; showQuestion(container); };
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
