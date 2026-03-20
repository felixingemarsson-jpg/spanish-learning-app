/*
 * SRS Engine — Card management + localStorage persistence
 * Wraps FSRS scheduler with card state tracking.
 */

const SRSEngine = (() => {
  // Keys are namespaced per language via Language.storageKey()
  function STORAGE_KEY() { return Language.storageKey('srs-cards'); }
  function SETTINGS_KEY() { return Language.storageKey('srs-settings'); }
  function STATS_KEY() { return Language.storageKey('srs-stats'); }

  const scheduler = new FSRS.Scheduler();

  const defaultSettings = {
    newCardsPerDay: 10,
    maxReviewsPerDay: 100, // cap reviews so staggered notebook cards don't overwhelm
    requestRetention: 0.9,
  };

  function getSettings() {
    const stored = localStorage.getItem(SETTINGS_KEY());
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : { ...defaultSettings };
  }

  function saveSettings(s) {
    localStorage.setItem(SETTINGS_KEY(), JSON.stringify(s));
  }

  function loadCards() {
    const stored = localStorage.getItem(STORAGE_KEY());
    if (!stored) return {};
    const cards = JSON.parse(stored);
    // Revive dates
    for (const id in cards) {
      cards[id].due = new Date(cards[id].due);
      if (cards[id].last_review) cards[id].last_review = new Date(cards[id].last_review);
    }
    return cards;
  }

  function saveCards(cards) {
    localStorage.setItem(STORAGE_KEY(), JSON.stringify(cards));
  }

  function getOrCreateCard(cardId) {
    const cards = loadCards();
    if (!cards[cardId]) {
      cards[cardId] = { ...FSRS.createCard(), id: cardId };
      saveCards(cards);
    }
    return cards[cardId];
  }

  function reviewCard(cardId, rating) {
    const cards = loadCards();
    const card = cards[cardId] || { ...FSRS.createCard(), id: cardId };
    const now = new Date();
    const results = scheduler.repeat(card, now);
    const updated = results[rating].card;
    updated.id = cardId;
    cards[cardId] = updated;
    saveCards(cards);

    // Track stats
    recordReview(cardId, rating, now);

    return updated;
  }

  function getSchedulingOptions(cardId) {
    const cards = loadCards();
    const card = cards[cardId] || FSRS.createCard();
    const now = new Date();
    const results = scheduler.repeat(card, now);

    return {
      [FSRS.Rating.Again]: {
        label: 'Again',
        interval: FSRS.formatInterval(results[FSRS.Rating.Again].scheduledDays),
      },
      [FSRS.Rating.Hard]: {
        label: 'Hard',
        interval: FSRS.formatInterval(results[FSRS.Rating.Hard].scheduledDays),
      },
      [FSRS.Rating.Good]: {
        label: 'Good',
        interval: FSRS.formatInterval(results[FSRS.Rating.Good].scheduledDays),
      },
      [FSRS.Rating.Easy]: {
        label: 'Easy',
        interval: FSRS.formatInterval(results[FSRS.Rating.Easy].scheduledDays),
      },
    };
  }

  function getDueCards(cardType = null) {
    const cards = loadCards();
    const now = new Date();
    const due = [];

    for (const id in cards) {
      const card = cards[id];
      if (card.due <= now && card.state !== FSRS.State.New) {
        if (!cardType || id.startsWith(cardType)) {
          due.push(card);
        }
      }
    }

    // Sort by most overdue first
    due.sort((a, b) => a.due - b.due);
    // Cap at daily review limit
    const settings = getSettings();
    return due.slice(0, settings.maxReviewsPerDay);
  }

  function getNewCards(allCardIds, cardType = null) {
    const cards = loadCards();
    const settings = getSettings();
    const today = new Date().toDateString();

    // Count new cards introduced today
    let newToday = 0;
    for (const id in cards) {
      const card = cards[id];
      if (card.reps === 1 && card.last_review && card.last_review.toDateString() === today) {
        if (!cardType || id.startsWith(cardType)) {
          newToday++;
        }
      }
    }

    const remaining = settings.newCardsPerDay - newToday;
    if (remaining <= 0) return [];

    // Find card IDs that haven't been introduced yet
    const unseen = allCardIds.filter(id => {
      if (cardType && !id.startsWith(cardType)) return false;
      return !cards[id] || cards[id].state === FSRS.State.New;
    });

    return unseen.slice(0, remaining);
  }

  function getStudyQueue(allCardIds, cardType = null) {
    const due = getDueCards(cardType);
    const newCards = getNewCards(allCardIds, cardType);

    // Due cards first, then new cards
    return {
      due: due.map(c => c.id),
      new: newCards,
      total: due.length + newCards.length,
    };
  }

  // Stats tracking
  function recordReview(cardId, rating, date) {
    const stats = getStats();
    const day = date.toISOString().split('T')[0];

    if (!stats.daily[day]) {
      stats.daily[day] = { reviews: 0, correct: 0, again: 0, hard: 0, good: 0, easy: 0 };
    }

    stats.daily[day].reviews++;
    if (rating === FSRS.Rating.Again) stats.daily[day].again++;
    else if (rating === FSRS.Rating.Hard) stats.daily[day].hard++;
    else if (rating === FSRS.Rating.Good) { stats.daily[day].good++; stats.daily[day].correct++; }
    else if (rating === FSRS.Rating.Easy) { stats.daily[day].easy++; stats.daily[day].correct++; }

    // Update streak
    stats.lastReviewDate = day;
    updateStreak(stats);

    localStorage.setItem(STATS_KEY(), JSON.stringify(stats));
  }

  function getStats() {
    const stored = localStorage.getItem(STATS_KEY());
    if (!stored) return { daily: {}, streak: 0, longestStreak: 0, lastReviewDate: null };
    return JSON.parse(stored);
  }

  function updateStreak(stats) {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (stats.lastReviewDate === today) {
      if (!stats._streakCounted) {
        // Check if yesterday had reviews too
        if (stats.daily[yesterday]) {
          stats.streak = (stats.streak || 0) + 1;
        } else {
          stats.streak = 1;
        }
        stats._streakCounted = today;
      }
    }

    if (stats.streak > (stats.longestStreak || 0)) {
      stats.longestStreak = stats.streak;
    }
  }

  function getStreak() {
    const stats = getStats();
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // If last review was before yesterday, streak is broken
    if (stats.lastReviewDate && stats.lastReviewDate !== today && stats.lastReviewDate !== yesterday) {
      return 0;
    }
    return stats.streak || 0;
  }

  function getTodayStats() {
    const stats = getStats();
    const today = new Date().toISOString().split('T')[0];
    return stats.daily[today] || { reviews: 0, correct: 0, again: 0, hard: 0, good: 0, easy: 0 };
  }

  function getAccuracy() {
    const stats = getStats();
    let total = 0, correct = 0;
    for (const day in stats.daily) {
      total += stats.daily[day].reviews;
      correct += stats.daily[day].correct;
    }
    if (total === 0) return 0;
    return Math.round((correct / total) * 100);
  }

  function getCardCounts() {
    const cards = loadCards();
    const counts = { new: 0, learning: 0, review: 0, total: 0 };
    for (const id in cards) {
      counts.total++;
      const state = cards[id].state;
      if (state === FSRS.State.New) counts.new++;
      else if (state === FSRS.State.Learning || state === FSRS.State.Relearning) counts.learning++;
      else counts.review++;
    }
    return counts;
  }

  // Seed notebook cards as "studied but untested"
  // These are phrases the learner wrote in notebooks — they've seen them but
  // never done retrieval practice. We set them as Review state with LOW stability
  // so they come up for a real retrieval test soon, but stagger due dates over
  // 14 days so he's not hit with 1000+ reviews on day 1.
  //
  // Science rationale:
  // - Retrieval practice effect: first typed recall IS learning, not just review
  // - FSRS self-calibrates: Easy→long interval, Again→relearn. One test reveals truth.
  // - Staggering prevents review pile-up and cognitive overload
  // - Low stability (2-4) means cards come back quickly if he struggles
  function seedKnownCards(cardIds) {
    const cards = loadCards();
    let seeded = 0;
    const now = new Date();
    const STAGGER_DAYS = 14; // spread reviews over 2 weeks
    const DAILY_BATCH = Math.ceil(cardIds.length / STAGGER_DAYS);

    for (let i = 0; i < cardIds.length; i++) {
      const id = cardIds[i];
      if (cards[id]) continue; // already exists, don't overwrite

      // Stagger: batch i gets due on day floor(i/DAILY_BATCH)
      const dayOffset = Math.floor(i / DAILY_BATCH);
      // Add slight randomness within each day (0-12 hours) to avoid clumping
      const hourJitter = Math.random() * 12 * 3600000;

      cards[id] = {
        id,
        due: new Date(now.getTime() + dayOffset * 86400000 + hourJitter),
        stability: 2.5,    // low — first retrieval test will calibrate
        difficulty: 5.0,    // neutral — FSRS will adjust after first review
        elapsed_days: 0,
        scheduled_days: dayOffset || 1,
        reps: 1,            // treated as seen-once, not brand-new
        lapses: 0,
        state: FSRS.State.Review,
        last_review: new Date(now.getTime() - 86400000), // "reviewed yesterday"
      };
      seeded++;
    }
    if (seeded > 0) saveCards(cards);
    return seeded;
  }

  // ── Accent-Aware Grading ──
  // Returns: { match: 'exact'|'accent'|'wrong', rating: FSRS.Rating, details: string }
  function gradeAnswer(userAnswer, correctAnswer) {
    const userTrimmed = userAnswer.trim();
    const correctTrimmed = correctAnswer.trim();

    // Exact match (case-insensitive)
    if (userTrimmed.toLowerCase() === correctTrimmed.toLowerCase()) {
      return { match: 'exact', rating: FSRS.Rating.Good, details: '' };
    }

    // Normalize: strip accents for comparison
    const stripAccents = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const userNorm = stripAccents(userTrimmed);
    const correctNorm = stripAccents(correctTrimmed);

    if (userNorm === correctNorm) {
      // Same word, wrong accents
      return {
        match: 'accent',
        rating: FSRS.Rating.Hard,
        details: `Watch the accent: ${correctTrimmed}`,
      };
    }

    // Fuzzy match for close answers (Levenshtein)
    const dist = levenshtein(userNorm, correctNorm);
    const similarity = 1 - dist / Math.max(userNorm.length, correctNorm.length);

    if (similarity >= 0.85) {
      return {
        match: 'close',
        rating: FSRS.Rating.Hard,
        details: `Close! Expected: ${correctTrimmed}`,
      };
    }

    return { match: 'wrong', rating: FSRS.Rating.Again, details: '' };
  }

  function levenshtein(a, b) {
    const m = [];
    for (let i = 0; i <= a.length; i++) {
      m[i] = [i];
      for (let j = 1; j <= b.length; j++) {
        if (i === 0) { m[i][j] = j; continue; }
        m[i][j] = Math.min(
          m[i - 1][j] + 1,
          m[i][j - 1] + 1,
          m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
      }
    }
    return m[a.length][b.length];
  }

  // ── Error Pattern Tracking ──
  const ERROR_KEY = () => Language.storageKey('error-patterns');

  function getErrorPatterns() {
    const stored = localStorage.getItem(ERROR_KEY());
    return stored ? JSON.parse(stored) : {
      accent_errors: { total: 0, count: 0 },
      tense_confusion: { total: 0, count: 0 },
      word_order_errors: { total: 0, count: 0 },
      spelling_errors: { total: 0, count: 0 },
      by_theme: {},
    };
  }

  function recordErrorPattern(category, correct) {
    const patterns = getErrorPatterns();
    if (!patterns[category]) patterns[category] = { total: 0, count: 0 };
    patterns[category].total++;
    if (!correct) patterns[category].count++;
    localStorage.setItem(ERROR_KEY(), JSON.stringify(patterns));
  }

  function recordThemeAccuracy(theme, correct) {
    const patterns = getErrorPatterns();
    if (!patterns.by_theme[theme]) patterns.by_theme[theme] = { total: 0, correct: 0 };
    patterns.by_theme[theme].total++;
    if (correct) patterns.by_theme[theme].correct++;
    localStorage.setItem(ERROR_KEY(), JSON.stringify(patterns));
  }

  function getWeakCategories() {
    const patterns = getErrorPatterns();
    const weak = [];
    for (const cat of ['accent_errors', 'tense_confusion', 'word_order_errors', 'spelling_errors']) {
      const p = patterns[cat];
      if (p && p.total >= 5) {
        const accuracy = Math.round(((p.total - p.count) / p.total) * 100);
        if (accuracy < 80) {
          weak.push({ category: cat, accuracy, total: p.total, errors: p.count });
        }
      }
    }
    return weak.sort((a, b) => a.accuracy - b.accuracy);
  }

  // Export for GitHub sync
  function exportProgress() {
    return {
      cards: loadCards(),
      stats: getStats(),
      settings: getSettings(),
      errorPatterns: getErrorPatterns(),
      exportedAt: new Date().toISOString(),
    };
  }

  function importProgress(data) {
    if (data.cards) {
      // Revive dates
      for (const id in data.cards) {
        data.cards[id].due = new Date(data.cards[id].due);
        if (data.cards[id].last_review) data.cards[id].last_review = new Date(data.cards[id].last_review);
      }
      saveCards(data.cards);
    }
    if (data.stats) localStorage.setItem(STATS_KEY(), JSON.stringify(data.stats));
    if (data.settings) saveSettings(data.settings);
  }

  return {
    getSettings, saveSettings,
    getOrCreateCard, reviewCard, seedKnownCards,
    getSchedulingOptions, getDueCards, getNewCards, getStudyQueue,
    getStats, getTodayStats, getStreak, getAccuracy, getCardCounts,
    gradeAnswer, recordErrorPattern, recordThemeAccuracy, getErrorPatterns, getWeakCategories,
    exportProgress, importProgress,
    loadCards, saveCards,
  };
})();
