/*
 * Progress — Dashboard stats, accuracy by theme, verb mastery
 */

const Progress = (() => {

  function render(container) {
    const stats = SRSEngine.getStats();
    const todayStats = SRSEngine.getTodayStats();
    const streak = SRSEngine.getStreak();
    const accuracy = SRSEngine.getAccuracy();
    const cardCounts = SRSEngine.getCardCounts();
    const cards = SRSEngine.loadCards();

    const weakCategories = SRSEngine.getWeakCategories();

    // Theme accuracy
    const themes = DATA.getAllThemes();
    const themeStats = {};
    for (const theme of themes) {
      const themeVocab = DATA.getVocabByTheme(theme);
      let reviewed = 0, mature = 0;
      for (const v of themeVocab) {
        if (cards[v.id] && cards[v.id].reps > 0) {
          reviewed++;
          if (cards[v.id].state === FSRS.State.Review && cards[v.id].stability > 10) {
            mature++;
          }
        }
      }
      themeStats[theme] = {
        total: themeVocab.length,
        reviewed,
        mature,
        pct: themeVocab.length > 0 ? Math.round((reviewed / themeVocab.length) * 100) : 0,
      };
    }

    // Verb mastery
    const verbStats = {};
    for (const verb of DATA.verbs) {
      let total = 0, mastered = 0;
      for (const tense in verb.tenses) {
        for (const pronoun in verb.tenses[tense]) {
          total++;
          const cardId = `verb-${verb.infinitive}-${tense}-${pronoun}`;
          if (cards[cardId] && cards[cardId].state === FSRS.State.Review) {
            mastered++;
          }
        }
      }
      verbStats[verb.infinitive] = { total, mastered, pct: Math.round((mastered / total) * 100) };
    }

    // Recent activity (last 7 days)
    const last7 = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const key = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en', { weekday: 'short' });
      const day = stats.daily[key] || { reviews: 0, correct: 0 };
      last7.push({ day: dayName, reviews: day.reviews, correct: day.correct });
    }

    container.innerHTML = `
      <h1 class="page-title">Progress</h1>

      <div class="stat-row">
        <div class="stat-box">
          <div class="stat-number">${cardCounts.total}</div>
          <div class="stat-label">Cards seen</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${accuracy}%</div>
          <div class="stat-label">Accuracy</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${streak}</div>
          <div class="stat-label">Day streak</div>
        </div>
      </div>

      <div class="section-label" style="margin-top:24px;">Last 7 Days</div>
      <div class="card" style="padding:16px;">
        <div style="display:flex;justify-content:space-between;gap:4px;">
          ${last7.map(d => `
            <div style="flex:1;text-align:center;">
              <div style="height:60px;display:flex;align-items:flex-end;justify-content:center;margin-bottom:4px;">
                <div style="width:100%;max-width:24px;height:${Math.max(d.reviews * 2, 2)}px;background:${d.reviews > 0 ? 'var(--accent)' : 'var(--border)'};border-radius:3px;"></div>
              </div>
              <div style="font-size:10px;color:var(--text-tertiary);">${d.day}</div>
              <div style="font-size:11px;font-family:var(--mono);color:var(--text-secondary);">${d.reviews}</div>
            </div>
          `).join('')}
        </div>
      </div>

      ${weakCategories.length > 0 ? `
      <div class="section-label" style="margin-top:24px;">Weak Spots</div>
      ${weakCategories.map(w => `
        <div class="progress-row">
          <div class="progress-label" style="color:var(--error);">${w.category.replace(/_/g, ' ')}</div>
          <div class="progress-track">
            <div class="progress-fill" style="width:${w.accuracy}%;background:var(--error);"></div>
          </div>
          <div class="progress-pct" style="color:var(--error);">${w.accuracy}%</div>
        </div>
      `).join('')}
      ` : ''}

      <div class="section-label" style="margin-top:24px;">Vocabulary by Theme</div>
      ${themes.map(theme => `
        <div class="progress-row">
          <div class="progress-label">${theme}</div>
          <div class="progress-track">
            <div class="progress-fill" style="width:${themeStats[theme].pct}%"></div>
          </div>
          <div class="progress-pct">${themeStats[theme].reviewed}/${themeStats[theme].total}</div>
        </div>
      `).join('')}

      <div class="section-label" style="margin-top:24px;">Verb Mastery</div>
      ${DATA.verbs.slice(0, 10).map(v => `
        <div class="progress-row">
          <div class="progress-label">${v.infinitive}</div>
          <div class="progress-track">
            <div class="progress-fill" style="width:${verbStats[v.infinitive].pct}%"></div>
          </div>
          <div class="progress-pct">${verbStats[v.infinitive].pct}%</div>
        </div>
      `).join('')}

      <div class="section-label" style="margin-top:24px;">Today</div>
      <div class="card">
        <div style="display:flex;justify-content:space-between;font-size:14px;">
          <span>Reviews</span><span style="font-family:var(--mono);color:var(--accent);">${todayStats.reviews}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:14px;margin-top:8px;">
          <span>Correct</span><span style="font-family:var(--mono);color:var(--success);">${todayStats.correct}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:14px;margin-top:8px;">
          <span>Again</span><span style="font-family:var(--mono);color:var(--error);">${todayStats.again}</span>
        </div>
      </div>`;
  }

  return { render };
})();
