# SKONGA ACADEMY ARCHITECTURE

## Identity

**SKONGA ACADEMY** — web-first programming school + Code Lab + learning community.

Loop: Learn → Practice → Code → Run → Modify → Break → Debug → Build → Share → Ask → Help → Learn again.

## Information architecture

```
/                 Home (what next)
/learn            Course catalog
/learn/:courseId
/learn/:courseId/:moduleId
/learn/:courseId/:moduleId/:lessonId
/lab              Code Lab
/lab/:exerciseId  Lab with starter from a lesson
/community        Feed (existing)
/explore          Buddies + showcase (existing)
/challenges       Tracks
/projects         Guided + showcase
/notifications
/profile
/auth             Optional
```

Primary nav (mobile bottom / desktop side):

Home · Learn · Lab · Community · Profile

Challenges and Projects reachable from Home and Learn.

## Two systems

**Learning** reads static curriculum modules from `src/data/curriculum`.  
**Community** keeps Zustand posts.  
Bridge: posts may carry `{ courseId, moduleId, lessonId, topic }`.  
Lesson page: “Ask community” pre-fills that metadata.

## Data domains

| Domain | Store / module | Persistence |
|---|---|---|
| Curriculum | `src/data/curriculum/*` | static |
| User progress | `useProgressStore` | localStorage `skonga-progress` |
| Community | `useAppStore` (existing) | localStorage `skonga-community` |
| Code Lab | `useLabStore` | session + optional saved drafts |
| Auth | `src/lib/auth.js` | Supabase if configured |

Auth is **optional**. Learn and Lab work offline as a guest.

## Lesson record (data, not JSX)

```js
{
  id, title, order, level,
  goal, prerequisites, why,
  concept, explanation, analogy,
  example, code, lineByLine,
  predict, tryIt, modify, experiment,
  mistake, debug,
  guidedChallenge, independentChallenge,
  quiz: [{ q, choices, answer, why }],
  assessment: [{ q, type }],
  takeaways, cheatSheet, youCanNow, nextId,
  lab: { html, css, js } | null,
  completion: { requireQuiz: true, requireLab: boolean }
}
```

Completion requires quiz pass (and lab check when a lab exists). Opening the page is not completion.

## UI composition

- `AppShell` — nav + outlet
- `LearnIndex` — levels
- `LessonPlayer` — sections 1–24, practice levels, quiz
- `CodeLab` — 3 files + iframe srcdoc preview + console hook
- Existing Feed/Explore/Challenges/Profile remain, retitled

## Guest profile

Progress store creates a local learner. Supabase profile merges later without rewriting Learn.
