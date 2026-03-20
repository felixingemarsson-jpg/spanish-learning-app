/*
 * FSRS-5 (Free Spaced Repetition Scheduler) — Minimal JS implementation
 * Based on: https://github.com/open-spaced-repetition/ts-fsrs
 * Simplified for this app — no npm, no build step.
 */

const FSRS = (() => {
  // Default parameters (FSRS-5)
  const DEFAULTS = {
    w: [0.4072, 1.1829, 3.1262, 15.4722, 7.2102, 0.5316, 1.0651, 0.0589,
        1.5330, 0.1647, 1.0621, 1.9744, 0.0946, 0.3597, 2.2053, 0.2040,
        2.9466, 0.5034, 0.6567],
    requestRetention: 0.9,
    maximumInterval: 36500,
  };

  const State = { New: 0, Learning: 1, Review: 2, Relearning: 3 };
  const Rating = { Again: 1, Hard: 2, Good: 3, Easy: 4 };

  function createCard() {
    return {
      due: new Date(),
      stability: 0,
      difficulty: 0,
      elapsed_days: 0,
      scheduled_days: 0,
      reps: 0,
      lapses: 0,
      state: State.New,
      last_review: null,
    };
  }

  function cloneCard(card) {
    return { ...card, due: new Date(card.due), last_review: card.last_review ? new Date(card.last_review) : null };
  }

  class Scheduler {
    constructor(params = {}) {
      this.p = { ...DEFAULTS, ...params };
      this.w = this.p.w;
    }

    repeat(card, now = new Date()) {
      card = cloneCard(card);
      if (card.state === State.New) {
        card.elapsed_days = 0;
      } else {
        card.elapsed_days = (now - card.last_review) / 86400000;
      }

      const results = {};
      for (const rating of [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy]) {
        results[rating] = this._processRating(cloneCard(card), rating, now);
      }
      return results;
    }

    _processRating(card, rating, now) {
      let scheduledDays, nextState;

      if (card.state === State.New) {
        card.difficulty = this._initDifficulty(rating);
        card.stability = this._initStability(rating);

        if (rating === Rating.Again) {
          scheduledDays = 0;
          nextState = State.Learning;
        } else if (rating === Rating.Hard) {
          scheduledDays = 0;
          nextState = State.Learning;
        } else if (rating === Rating.Good) {
          scheduledDays = this._nextInterval(card.stability);
          nextState = State.Review;
        } else {
          scheduledDays = this._nextInterval(card.stability);
          nextState = State.Review;
        }
      } else if (card.state === State.Learning || card.state === State.Relearning) {
        if (rating === Rating.Again) {
          card.difficulty = this._nextDifficulty(card.difficulty, rating);
          card.stability = this._shortTermStability(card.stability, rating);
          scheduledDays = 0;
          nextState = card.state;
        } else if (rating === Rating.Hard) {
          card.difficulty = this._nextDifficulty(card.difficulty, rating);
          card.stability = this._shortTermStability(card.stability, rating);
          scheduledDays = 0;
          nextState = card.state;
        } else if (rating === Rating.Good) {
          card.difficulty = this._nextDifficulty(card.difficulty, rating);
          card.stability = this._shortTermStability(card.stability, rating);
          scheduledDays = this._nextInterval(card.stability);
          nextState = State.Review;
        } else {
          card.difficulty = this._nextDifficulty(card.difficulty, rating);
          card.stability = this._shortTermStability(card.stability, rating);
          scheduledDays = this._nextInterval(card.stability);
          nextState = State.Review;
        }
      } else {
        // Review state
        const elapsed = card.elapsed_days;
        const retrievability = Math.pow(1 + elapsed / (9 * card.stability), -1);

        card.difficulty = this._nextDifficulty(card.difficulty, rating);

        if (rating === Rating.Again) {
          card.lapses += 1;
          card.stability = this._nextForgetStability(card.difficulty, card.stability, retrievability);
          scheduledDays = 0;
          nextState = State.Relearning;
        } else if (rating === Rating.Hard) {
          card.stability = this._nextRecallStability(card.difficulty, card.stability, retrievability, rating);
          scheduledDays = this._nextInterval(card.stability);
          nextState = State.Review;
        } else if (rating === Rating.Good) {
          card.stability = this._nextRecallStability(card.difficulty, card.stability, retrievability, rating);
          scheduledDays = this._nextInterval(card.stability);
          nextState = State.Review;
        } else {
          card.stability = this._nextRecallStability(card.difficulty, card.stability, retrievability, rating);
          scheduledDays = this._nextInterval(card.stability);
          nextState = State.Review;
        }
      }

      card.scheduled_days = scheduledDays;
      card.state = nextState;
      card.reps += 1;
      card.last_review = now;
      card.due = new Date(now.getTime() + scheduledDays * 86400000);

      return { card, scheduledDays };
    }

    _initDifficulty(rating) {
      return this._clampDifficulty(this.w[4] - Math.exp(this.w[5] * (rating - 1)) + 1);
    }

    _initStability(rating) {
      return Math.max(this.w[rating - 1], 0.1);
    }

    _nextDifficulty(d, rating) {
      const newD = d - this.w[6] * (rating - 3);
      return this._clampDifficulty(this._meanReversion(this.w[4], newD));
    }

    _clampDifficulty(d) {
      return Math.min(Math.max(d, 1), 10);
    }

    _meanReversion(init, current) {
      return this.w[7] * init + (1 - this.w[7]) * current;
    }

    _shortTermStability(s, rating) {
      return s * Math.exp(this.w[17] * (rating - 3 + this.w[18]));
    }

    _nextRecallStability(d, s, r, rating) {
      const hardPenalty = rating === Rating.Hard ? this.w[15] : 1;
      const easyBonus = rating === Rating.Easy ? this.w[16] : 1;
      return s * (1 + Math.exp(this.w[8]) *
        (11 - d) *
        Math.pow(s, -this.w[9]) *
        (Math.exp((1 - r) * this.w[10]) - 1) *
        hardPenalty *
        easyBonus);
    }

    _nextForgetStability(d, s, r) {
      return this.w[11] *
        Math.pow(d, -this.w[12]) *
        (Math.pow(s + 1, this.w[13]) - 1) *
        Math.exp((1 - r) * this.w[14]);
    }

    _nextInterval(s) {
      const interval = (s / 9) * (Math.pow(1 / this.p.requestRetention, 1) - 1);
      return Math.min(Math.max(Math.round(interval), 1), this.p.maximumInterval);
    }
  }

  // Format interval for display
  function formatInterval(days) {
    if (days < 1) return '<1m';
    if (days < 1) return `${Math.round(days * 24)}h`;
    if (days === 1) return '1d';
    if (days < 30) return `${days}d`;
    if (days < 365) return `${Math.round(days / 30)}mo`;
    return `${(days / 365).toFixed(1)}y`;
  }

  return { Scheduler, State, Rating, createCard, cloneCard, formatInterval, DEFAULTS };
})();
