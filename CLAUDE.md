# CLAUDE.md — LNJPIT Semester I 3D Project Guide

## Project Overview
Next.js 14.2.16 App Router full-stack web application for B.Tech Semester I (Mathematics & Computing, Group A) at Lok Nayak Jai Prakash Institute of Technology (LNJPIT), Chapra.
A visual, interactive study companion presenting all 8 subjects and 43 syllabus units in hand-drawn 3D and 2D notebook paper aesthetics.

## True Academic Curriculum Facts
- **Total Subjects (8):**
  1. **BEEE** (Basics of Electrical & Electronics Engineering): 6 units · 61 topics · 4 credits
  2. **Physics** (Engineering Physics): 6 units · 57 topics · 4 credits
  3. **Math-I** (Engineering Mathematics-I): 5 units · 40 topics · 3 credits
  4. **AI** (Introduction to AI): 5 units · 39 topics · 3 credits
  5. **CFET** (Computer Fundamentals & Emerging Technologies): 5 units · 42 topics · 3 credits
  6. **UHV** (Universal Human Values): 5 units · 18 topics · 2 credits
  7. **PPS Lab** (Programming for Problem Solving Lab): 6 units · 17 topics · 1 credit · 17 C/C++ experiments
  8. **EIC** (Essence of Indian Constitution): 5 units · 17 topics · 0 credits (Mandatory Audit Course)
- **Worked Problems Status:** `WORKED` provides complete, 100% coverage across all 43 units (all 8 subjects populated with step-by-step derivations and numericals in Phase 5).
- **Accessibility & Tests (Phase 6):** Standardized WCAG AA dialog focus trap & `Escape` key handling across all 8 modal dialogues via `useModalA11y`, skip-to-study link, and 8 comprehensive Playwright E2E suites (20 tests passing across desktop and 390px mobile).

## Core Architecture & Guidelines

### 1. 3D Scene Coordinate Space
- The custom canvas 3D engine in `src/components/canvas/` projects points in coordinate space:
  - Coordinate range: **Roughly `-7` to `+7`** (normalized around origin `(0, 0, 0)`), NOT `-100` to `+100`.
  - Vectors `Vec3 = [x, y, z]` where $x$ is horizontal, $y$ is vertical, and $z$ is depth.

### 2. Design System & Typography
- **Hand-drawn paper notebook aesthetic:** Warm off-white `#fdfcf7` (`bg-paper`) and `#f7f4ea` (`bg-paper2`), `#2b2a28` (`text-ink`), `#c85a32` (`text-accentRed`).
- **Strict Rule:** No neon colors, no frosted glass, no gradients.
- **Font Stack:**
  - **Body font:** Inter (weights 400, 500, 600, 700) for all continuous reading, notes, explanations, and metadata.
  - **Display font:** Caveat (weights 500, 700 via `font-hand`) reserved exclusively for brand titles, section headings, step titles, tab labels, numbers, and diagram annotations.
  - Reading text is never italic and never below 14 px.

### 3. PWA & Asset Paths
- PWA manifest icons reside at `/icons/icon-192.png` and `/icons/icon-512.png` (or root `/icon-192.png`).
- Offline service worker registered at `/sw.js`.

### 4. AI Tutor Models & Offline Grounding
- Route `/api/tutor` uses Gemini models via `x-goog-api-key` header with resilient dual fallback:
  1. Primary: `gemini-2.5-flash` (or flash model)
  2. Fallback: `gemini-2.5-flash-lite`
- Server-side total timeout budget: ~25s.
- Zero env var support: If `GEMINI_API_KEY` is not configured, tutor automatically falls back to offline syllabus-grounded template answers.
- Image attachments: client-side compressed to max 1600 px (JPEG quality 0.8), enforced by zod <= 1.5 MB limit.

### 5. Known Limitations
- Progress synchronization (`/api/progress`) requires Supabase Auth and PostgreSQL. Without them, app runs 100% local-first via browser IndexedDB.
- Worked numerical solutions are completely populated across all 43 units in `src/data/worked.ts`.
- 3D scene rotations are rendered on CPU 2D canvas via custom trigonometric projection matrices.

## Development Commands
- `npm run dev`: Start Next.js local development server (`http://localhost:3000`)
- `npm run build`: Prisma generate + Next.js optimized production build
- `npm run start`: Serve production build
- `npm run typecheck`: Run `tsc --noEmit`
- `npm run lint`: Run `next lint`
- `npm run check:data`: Verify syllabus integrity, SVG schema, and data completeness (63 assertions)
- `npm run test:e2e`: Run Playwright end-to-end tests
