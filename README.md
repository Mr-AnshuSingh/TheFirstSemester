# Semester I, Unit by Unit, in 3D — LNJPIT Chapra (Next.js Full-Stack Refactor)

A modular Next.js 14 (App Router) + TypeScript + Tailwind CSS + Prisma (SQLite / Supabase) full-stack application refactored from `The First Semester.html`.

## Architecture Highlights

1. **Modular Strongly-Typed Data Layer (`/src/data/` & `/src/types/syllabus.ts`)**
   - `subjects.ts`: 100% of the 8 Semester I courses, 43 units, syllabus checklists, 2D notebook SVG diagrams (`dg`), and exam strategies (`ex`, `fm`, `hook`).
   - `scenes.ts`: All 43 interactive 3D scenes (`SC['math:0']` through `SC['pps:5']`) preserved 1:1.
   - `worked.ts`: Worked numericals and derivations with KaTeX rendering.
   - `schedule.ts`: Real LNJPIT Chapra Room 13 timetable (w.e.f. 28.09.26), 6-week countdown (`WEEKS`), and 10 exam-day rules (`RULES`).
   - `ppsExperiments.ts`: All 17 PPS Lab C/C++ experiments (`LE-1` to `LE-17`) with execution trace frames.

2. **Reusable 3D Rough-Sketch Canvas Engine (`/src/components/canvas/`)**
   - `Builder.ts`: Strongly-typed 3D primitive builder (`L`, `A`, `T`, `P`, `D`, `C`, `F`, `X`, `Y`, `W`, `dyn`).
   - `NotebookCanvas3D.tsx`: Encapsulates the 3D projection & hand-drawn double-pass stroke renderer with `requestAnimationFrame` cleanup, `ResizeObserver`, pointer/touch pinch-zoom gestures, and step navigation.

3. **Persistence & Offline-First Sync (`/prisma/schema.prisma`, `/src/lib/offlineStorage.ts`, `/src/app/api/progress/route.ts`)**
   - Prisma schema for `UserProgress`, `CustomNotes`, `FlashcardReview`, and `StudySession`.
   - Optimistic UI updates backed by IndexedDB for offline PWA support and background sync with `/api/progress`.

4. **Rich Math (KaTeX), C/C++ Lab Visualizer & Context-Aware AI Tutor (`/src/app/api/tutor/route.ts`)**
   - `KatexRenderer.tsx`: Upgrades syllabus formulas (`Rank`, `\Gamma(n)`, `\nabla \times \mathbf{F}`, Maxwell's equations) into textbook math.
   - `PpsCodeRunner.tsx`: Interactive C/C++ code runner and stack/variable visualizer for all 17 PPS Lab experiments.
   - `/api/tutor`: Injects the active `[subjectId, unitIndex, stepIndex]` syllabus context, key moves, and common exam traps to answer strictly according to university marking schemes.
