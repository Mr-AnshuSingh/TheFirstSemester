## Description
<!-- Provide a concise summary of the changes and the rationale behind them. -->

## Changes Checklist
- [ ] **Syllabus & Academic Data Integrity:**
  - [ ] No syllabus data deleted, truncated, or hallucinated from `src/data/**`.
  - [ ] `npm run check:data` passes with 100% assertions passing.
- [ ] **Design & Typography Guidelines:**
  - [ ] Inter font used for all body text, notes, topic cards, and dialogs.
  - [ ] Caveat (`font-hand`) restricted strictly to headings, brand, and step annotations.
  - [ ] Zero UI emojis used (all icons sourced from `lucide-react`).
  - [ ] Color palette conforms to warm paper notebook aesthetic (`bg-paper`, `bg-paper2`, `text-ink`, `text-accentRed`).
- [ ] **3D Engine Coordinates:**
  - [ ] Canvas 3D points stay within normalized space (`-7` to `+7`).
- [ ] **Accessibility (WCAG 2.1 AA):**
  - [ ] Contrast ratio >= 4.5:1 on body text and >= 3:1 on large text.
  - [ ] Modal dialogues utilize `useModalA11y` (focus trap + `Escape` key dismissal).
- [ ] **Tests & Quality Gates:**
  - [ ] `npm run typecheck` passes with zero errors.
  - [ ] `npm run lint` passes with zero warnings.
  - [ ] `npm run test:e2e` passes all 20 Playwright tests across desktop and mobile.
