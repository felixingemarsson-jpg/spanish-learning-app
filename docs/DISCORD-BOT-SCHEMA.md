# Discord Bot Interop — Schema Reference

The web app and Discord bots share progress through a GitHub repo. This doc defines the JSON formats so any bot can read/write progress.

## Repo Structure

```
language-learning-data/        <- shared private repo
├── progress/
│   ├── spanish/
│   │   └── <username>.json    <- SRS state for Spanish learner
│   └── russian/
│       └── <username>.json    <- SRS state for Russian learner
└── SCHEMA.md                  <- this file
```

## Progress File Format

Each `<username>.json` contains:

```json
{
  "cards": {
    "a1-hotel-001": {
      "id": "a1-hotel-001",
      "due": "2026-03-21T10:00:00.000Z",
      "stability": 3.12,
      "difficulty": 5.31,
      "elapsed_days": 1,
      "scheduled_days": 1,
      "reps": 3,
      "lapses": 0,
      "state": 2,
      "last_review": "2026-03-20T10:00:00.000Z"
    }
  },
  "stats": {
    "daily": {
      "2026-03-20": {
        "reviews": 24,
        "correct": 20,
        "again": 4,
        "hard": 2,
        "good": 15,
        "easy": 3
      }
    },
    "streak": 7,
    "longestStreak": 14,
    "lastReviewDate": "2026-03-20"
  },
  "settings": {
    "newCardsPerDay": 10,
    "maxReviewsPerDay": 100,
    "requestRetention": 0.9
  },
  "exportedAt": "2026-03-20T10:30:00.000Z"
}
```

## Card States (FSRS)

| State | Value | Meaning |
|-------|-------|---------|
| New | 0 | Never reviewed |
| Learning | 1 | Currently learning |
| Review | 2 | In review rotation |
| Relearning | 3 | Lapsed, relearning |

## Card ID Patterns

### Vocabulary
- `a1-{theme}-{number}` (e.g., `a1-hotel-001`)
- `a2-{theme}-{number}`
- `b1-{theme}-{number}`
- `b2-{theme}-{number}`

### Verbs (Spanish only)
- `verb-{infinitive}-{tense}-{pronoun}` (e.g., `verb-hablar-present-yo`)

### Grammar
- `grammar-{rule-id}` (e.g., `grammar-ser-vs-estar`)

## FSRS Rating Values

| Rating | Value | When to use |
|--------|-------|------------|
| Again | 1 | Wrong answer |
| Hard | 2 | Correct but struggled |
| Good | 3 | Correct, normal effort |
| Easy | 4 | Correct, no effort |

## How Discord Bots Should Use This

### Reading progress
1. Fetch `progress/{language}/{username}.json` from the repo
2. Parse the cards object to find what the user knows/struggles with
3. Use `stability` and `difficulty` to choose appropriate drill difficulty
4. Cards with `lapses > 0` are weak points — drill these more

### Writing progress after a quiz
1. Pull latest progress file
2. For each card quizzed, update using FSRS algorithm:
   - Increment `reps`
   - Update `stability`, `difficulty`, `due`, `last_review`
   - Set `state` appropriately
3. Update `stats.daily` for today
4. Commit updated file back to repo

### Session structure (recommended)
1. **Warm-up (2-3 min)**: 5 items from cards where `due <= now`, sorted by most overdue
2. **New material (5-10 min)**: Pick from cards with `state: 0` (New)
3. **Production drill (5 min)**: Translation/cloze from weak cards (`lapses > 0`)
4. **Wrap-up**: Report errors, update progress file
