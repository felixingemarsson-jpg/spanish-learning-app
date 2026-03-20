/*
 * Grammar Quiz — TYPED PRODUCTION (not multiple choice)
 * Shows sentence with blank → user types the correct form → rule explanation
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
          <div class="empty-state-icon">&#9997;</div>
          <div class="empty-state-text">No grammar quizzes available</div>
        </div>`;
      return;
    }

    showQuestion(container);
  }

  function showQuestion(container) {
    if (currentIndex >= queue.length) {
      const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
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

    // Format sentence with visible blank
    const sentenceHtml = item.sentence.replace(/_+/g,
      '<span style="display:inline-block;border-bottom:2px solid var(--accent);min-width:60px;text-align:center;font-family:var(--mono);">______</span>'
    );

    container.innerHTML = `
      <div class="session-counter">${currentIndex + 1} / ${queue.length}</div>

      <div class="card">
        <div class="badge" style="margin-bottom:12px;">${item.ruleTitle}</div>
        <div style="font-size:18px;font-weight:500;line-height:1.6;margin-bottom:16px;">
          ${sentenceHtml}
        </div>
      </div>

      <div class="input-row">
        <input class="input" type="text" id="grammar-input" placeholder="Type the correct form..."
               autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
        <button class="btn" id="grammar-submit">Check</button>
      </div>

      <div id="grammar-feedback" style="margin-top:12px;"></div>`;

    const input = document.getElementById('grammar-input');
    input.focus();

    const submit = () => {
      if (answered) return;
      const userAnswer = input.value.trim();
      if (!userAnswer) return;
      answered = true;
      checkAnswer(container, item, userAnswer);
    };

    document.getElementById('grammar-submit').addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
  }

  function checkAnswer(container, item, userAnswer) {
    score.total++;
    const grade = SRSEngine.gradeAnswer(userAnswer, item.answer);
    const isCorrect = grade.match !== 'wrong';
    if (isCorrect) score.correct++;

    SRSEngine.reviewCard(`grammar-${item.ruleId}`, grade.rating);

    const inputRow = container.querySelector('.input-row');
    if (inputRow) inputRow.remove();

    const feedbackEl = document.getElementById('grammar-feedback');

    if (grade.match === 'exact') {
      feedbackEl.innerHTML = `
        <div class="feedback correct">
          <div class="feedback-label">Correct!</div>
          <div class="feedback-answer">${item.answer}</div>
          <div class="feedback-explanation">${item.explanation}</div>
        </div>`;
    } else if (grade.match === 'accent' || grade.match === 'close') {
      feedbackEl.innerHTML = `
        <div class="feedback almost">
          <div class="feedback-label">Almost!</div>
          <div class="feedback-answer">${item.answer}</div>
          <div class="feedback-explanation">${grade.details}<br>${item.explanation}</div>
        </div>`;
    } else {
      feedbackEl.innerHTML = `
        <div class="feedback wrong">
          <div class="feedback-label">Incorrect</div>
          <div class="feedback-answer">
            <span style="text-decoration:line-through;color:var(--error);">${userAnswer}</span>
            &rarr; <span style="color:var(--success);">${item.answer}</span>
          </div>
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
