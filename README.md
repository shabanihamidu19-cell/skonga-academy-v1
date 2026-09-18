# SKONGA Academy

**Learn. Code. Build. Connect.**

Web-first programming school for beginners (secondary-school friendly), with an integrated Code Lab and a learning-focused community.

## What this is

SKONGA Academy is **not** only a social feed and **not** only static notes.

It combines:

1. **Learn** — structured curriculum (Levels 0–8)
2. **Code Lab** — HTML / CSS / JavaScript editor + browser preview
3. **Projects** — guided builds
4. **Community** — questions, bugs, progress, projects (from the DevPath foundation)

Learning loop:

`Learn → Practice → Code → Run → Modify → Debug → Build → Share → Ask`

## Curriculum status (honest)

| Track | Status |
|---|---|
| Foundations (Level 0) | **NEW-complete** (3 lessons) |
| HTML path (Level 2) | **NEW-complete** (10 lessons + project) |
| CSS / JS modules | **NEW-draft** (lab starters; teaching text to deepen) |
| Python (Level 1) | **NEW-draft** (no browser Python runtime in v1) |
| Tools / Backend / App / AI | Thin / TODO depth |

All lesson content in `src/data/curriculum/*` is **NEW** (authored for Academy v1). It is **not** recovered from DevPath. DevPath had no verified lesson corpus.

## Tech stack

- React 18 + Vite
- React Router
- Zustand (community + progress + lab stores separated)
- Optional Supabase auth (Learn/Lab work without login)
- Capacitor config kept for later packaging — **web-first now**

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Product routes

- `/` Home
- `/learn` Curriculum
- `/learn/:courseId/:moduleId/:lessonId` Lesson player
- `/lab` Code Lab
- `/projects` Projects
- `/community` Feed
- `/challenges` Challenges
- `/profile` Learning profile

## Provenance docs

- `DEVPATH_AUDIT.md`
- `CURRICULUM_INVENTORY.md`
- `CURRICULUM_MIGRATION_MAP.md`
- `SKONGA_ACADEMY_ARCHITECTURE.md`
- `CODELAB_ARCHITECTURE.md`
- `IMPLEMENTATION_PLAN.md`

## License

MIT
