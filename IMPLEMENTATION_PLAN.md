# IMPLEMENTATION PLAN

## Decision after audit

Old SKONGA lesson files are **not in DevPath**. Waiting forever is forbidden.  
Plan: ship Academy architecture + **NEW** authored core path (Foundations + HTML/CSS/JS + projects) on top of reused community UI.

## Phase now (this build)

1. Rename product identity (title, README, persist keys)
2. Optional auth (guest can Learn)
3. `src/data/curriculum` registry
4. Progress + Lab stores
5. Home, Learn, LessonPlayer, CodeLab
6. Wire nav
7. Connect Ask Community with lesson ids
8. Guided projects data + Projects page
9. Profile shows course bars from progress store

## Later phases (not this pass)

- Python runtime
- Full 138-lesson authorship
- Real backend progress
- Search index
- APK
- Syntax highlighting library
- Terminal/Git sandboxes

## Definition of done for this pass

A beginner can:

1. Open Home without login
2. Enter Web Development
3. Complete an HTML lesson with quiz
4. Open starter in Code Lab, edit, Run, see preview
5. Ask community with lesson metadata
6. See progress on Profile

## File ownership

New:

- `src/data/curriculum/**`
- `src/stores/useProgressStore.js`
- `src/stores/useLabStore.js`
- `src/pages/HomePage.jsx`
- `src/pages/LearnPage.jsx`
- `src/pages/LessonPage.jsx`
- `src/pages/CodeLabPage.jsx`
- `src/pages/ProjectsPage.jsx`
- `src/lib/curriculum.js`

Modified:

- `App.jsx` routes + guest access
- `BottomNav.jsx`
- `index.html` title
- `ProfilePage.jsx` course progress
- `useAppStore.js` persist name + lesson context on posts
- `FeedPage.jsx` compose context if present
