# Design System — Spanish A1-A2

## Product Context
- **What this is:** A spaced-repetition Spanish learning app with flashcards, conjugation drills, translation quizzes, cloze deletion, and grammar exercises
- **Who it's for:** One friend learning Spanish at A1-A2 level, using handwritten notebook content
- **Space/industry:** Language learning (Duolingo, Anki, Clozemaster, Drops)
- **Project type:** Static web app (GitHub Pages), mobile-first, no backend

## Aesthetic Direction
- **Direction:** Brutally Minimal
- **Decoration level:** Minimal — typography carries hierarchy, subtle card borders and surface elevation distinguish sections, no gradients or patterns
- **Mood:** A warm, focused study companion. Like a good reading lamp — inviting enough to sit with for 20 minutes, quiet enough to keep attention on the Spanish
- **Reference sites:** Drops (clean, calm), Clozemaster (dark, functional), Busuu (modern, minimal)

## Typography
- **Display/Hero:** Plus Jakarta Sans 700/800 — geometric warmth, excellent weight range, modern without being trendy
- **Body:** Plus Jakarta Sans 400/500 — same family for cohesion, excellent readability at small sizes
- **UI/Labels:** Plus Jakarta Sans 600, 10-11px uppercase with letter-spacing for section labels
- **User Input:** JetBrains Mono 400 — monospace makes typed Spanish feel deliberate, accent characters (a, e, n) are unmistakably clear
- **Code:** JetBrains Mono 400
- **Loading:** Google Fonts CDN `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap`
- **Scale:** 10px (labels) / 11px (tags) / 13px (captions) / 15px (body) / 18px (mono input) / 20px (subhead) / 22px (section title) / 24px (card display) / 28px (page title) / 32px (hero)

## Color
- **Approach:** Restrained — one warm accent + neutrals
- **Background:** #0f0f1a (deep ink, not pure black — easier on eyes for study sessions)
- **Surface/Cards:** #1a1a2e (lifted navy)
- **Surface Hover:** #222240
- **Border:** #2a2a45
- **Primary accent:** #e8a838 (Spanish amber/gold — warm, inviting, excellent contrast on dark)
- **Accent dim:** rgba(232, 168, 56, 0.15) (backgrounds behind accent elements)
- **Success:** #4ade80 (correct answers)
- **Success dim:** rgba(74, 222, 128, 0.15)
- **Error:** #f87171 (wrong answers)
- **Error dim:** rgba(248, 113, 113, 0.15)
- **Text primary:** #e8e6e3 (warm off-white)
- **Text secondary:** #8a8a9a (muted for labels and hints)
- **Text tertiary:** #5a5a6a (very muted for timestamps, metadata)
- **Light mode:** bg=#f5f3ef, surface=#ffffff, surface-hover=#f0ede8, border=#e0ddd6, text=#1a1a2e, text-secondary=#6a6a7a

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable — generous touch targets for mobile study sessions
- **Scale:** 2xs(2px) xs(4px) sm(8px) md(16px) lg(24px) xl(32px) 2xl(48px) 3xl(64px)
- **Minimum touch target:** 44px

## Layout
- **Approach:** Single-column, card-based
- **Grid:** Single column, max-width container
- **Max content width:** 480px mobile, 520px desktop
- **Border radius:** sm:6px, md:10px, lg:14px, full:9999px (pills/toggles)
- **Card pattern:** Surface background + 1px border + border-radius-lg

## Motion
- **Approach:** Minimal-functional
- **Easing:** enter(ease-out) exit(ease-in) move(ease-in-out)
- **Duration:** micro(100ms) short(150ms) medium(200ms) long(300ms)
- **Card flip:** 200ms ease-out
- **Feedback flash:** 150ms color transition
- **Hover lift:** translateY(-2px) + box-shadow
- **No:** bouncing, confetti, celebration animations, progress bar animations beyond fill

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-20 | Initial design system created | Created by /design-consultation based on competitive research of Duolingo, Anki, Clozemaster, Drops, Busuu |
| 2026-03-20 | Spanish amber (#e8a838) as primary accent | Differentiates from cool-toned language apps, evokes Spanish warmth |
| 2026-03-20 | JetBrains Mono for user input | Accent characters clearly distinct, makes typing feel deliberate |
| 2026-03-20 | No gamification chrome | Friend is motivated by learning, not streaks/XP — clean stats page instead |
