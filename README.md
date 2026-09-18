# SKONGA Academy

**Learn. Code. Build. Connect.**

Web-first programming school for beginner secondary-school learners, with an integrated Code Lab and a learning-focused community.

## What this is

SKONGA Academy is **not** only a social feed and **not** only static notes.

It combines:

1. **Learn** — structured curriculum (Levels 0–7)
2. **Code Lab** — HTML / CSS / JavaScript editor + browser preview
3. **Projects** — guided builds
4. **Community** — questions, bugs, progress, projects (DevPath foundation, learning-context fields)

Learning loop:

`Learn → Understand → Practice → Code → Run → Modify → Debug → Build → Share → Ask`

## Curriculum (NEW — not recovered from DevPath)

All lessons in `src/data/curriculum/*` are **NEW** (Academy v1). DevPath had no verified lesson corpus.

| Level | Track | Status (approx.) |
|---|---|---|
| 0 | Foundations + pair + notional machine | NEW-complete |
| 1 | Blocks bridge → Python → Strings → Algorithms → Misconceptions | NEW-complete |
| 2 | HTML → CSS → JavaScript | NEW-complete + Code Lab |
| 3 | Developer Tools (terminal, git, debug concepts) | NEW-complete (honest: no terminal runtime in Lab) |
| 4 | Backend (HTTP, REST, JSON, auth ideas) | NEW-complete (mocks only) |
| 5 | App (web-first mobile surfaces) | NEW-complete |
| 6 | AI (prompt, RAG idea, mock tutor UI) | NEW-complete (no live model) |
| 7 | Project Lab | NEW-complete |

Pedagogy baked in: Predict, Investigate, Parsons (interactive), paper **test cases**, Copy / Modify / Create, labelled subgoals, honest `runtime: 'none'` where Code Lab cannot run Python/servers.

## Tech stack

- React 18 + Vite
- React Router
- Zustand (community + progress + lab stores)
- Optional Supabase auth — **Learn and Code Lab work without login**
- Capacitor config kept for later packaging — **web-first now**

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Product routes

| Route | Purpose |
|---|---|
| `/` | Home |
| `/learn` | Curriculum |
| `/learn/:courseId/:moduleId/:lessonId` | Lesson player |
| `/lab` | Code Lab |
| `/projects` | Projects |
| `/community` | Feed |
| `/challenges` | Challenges |
| `/profile` | Learning profile |

## Provenance docs

- `DEVPATH_AUDIT.md`
- `CURRICULUM_INVENTORY.md`
- `CURRICULUM_MIGRATION_MAP.md`
- `SKONGA_ACADEMY_ARCHITECTURE.md`
- `CODELAB_ARCHITECTURE.md`
- `IMPLEMENTATION_PLAN.md`

## License

MIT
