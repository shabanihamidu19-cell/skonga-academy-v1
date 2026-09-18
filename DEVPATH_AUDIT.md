# DEVPATH AUDIT

**Repository:** https://github.com/shabanihamidu19-cell/devpath  
**Commit inspected:** `df3247412ae1e3c11bd9353226fa25b87fd95850` (main zip)  
**Date:** 2026-09-17  
**Product decision:** DevPath is the technical foundation. Final identity is **SKONGA ACADEMY**.

## 1. What this repo actually is

DevPath is a **community-oriented MVP**, not a school.

README positioning: “Social network kwa programming learners Afrika Mashariki.”

It has:

- Feed of learning-shaped posts
- Explore (buddies + project showcase)
- Challenge tracks (UI + mock day dots)
- Notifications
- Profile journey / projects / badges
- Optional Supabase auth

It does **not** have:

- courses, modules, lessons
- quizzes or assessments
- Code Lab / browser preview
- curriculum JSON/MD/HTML
- lesson ↔ community linking
- course progress

## 2. Tech stack

| Layer | Technology | Keep? |
|---|---|---|
| UI | React 18 + Vite 5 | Yes |
| Routing | React Router v6 | Yes, extend |
| State | One Zustand store + persist | Split by domain |
| Auth | Supabase JS (`src/lib/auth.js`) | Keep modular, do not block Learn |
| Mobile | Capacitor 6 | Keep config, **not a current build target** |
| i18n | Custom SW/EN keys | Keep, extend |
| Styling | CSS modules + `global.css` tokens | Reuse |

## 3. Routes today

| Path | Page | Role |
|---|---|---|
| `/auth` | AuthPage | Required gate today |
| `/` | FeedPage | Community home |
| `/explore` | ExplorePage | Buddies + projects |
| `/challenges` | ChallengesPage | Track cards |
| `/notifications` | NotificationsPage | Alerts |
| `/profile` | ProfilePage | Social/learning hybrid profile |

**Problem:** `App.jsx` redirects every unauthenticated user to `/auth`. A school must allow Learn + Code Lab without an account.

## 4. File map (complete)

```
src/
  App.jsx
  main.jsx
  components/ BottomNav, Icons, PostCard
  pages/ Auth, Challenges, Explore, Feed, Notifications, Profile
  stores/ useAppStore.js   ← ALL mock data lives here
  lib/ auth.js, posts.js, supabase.js
  i18n/ translations.js, useTranslation.js
  styles/ global.css
```

No `src/data/`. No curriculum folder. No editor.

## 5. State architecture today

`useAppStore` mixes:

- posts, challenges, buddies, projects, notifications, profile
- language
- like / connect / addPost / rank feed

Mock data is the product content. Persist key: `devpath-storage`.

**Must change:** educational content cannot live in this store. User progress and Code Lab state must be separate domains.

## 6. Community system (reuse)

Post types already match SKONGA:

`learn | bug | project | question | challenge | progress`

Feed ranking already boosts bugs/questions. Keep this.

Missing metadata: `courseId`, `moduleId`, `lessonId`, `topic`.

## 7. Challenges today

Three mock tracks:

- 30 Days of JavaScript (active, day 4)
- Python Basics — 14 Days
- CSS Layouts — 7 Days

UI only. “Anza Lesson ya Leo” does not open a lesson. Topics are short labels, not curriculum objects.

## 8. Profile today

Learning-shaped but not wired to courses:

- streak, journey list, projects, badges
- stats are hardcoded numbers

Need course bars, completed lessons, Code Lab artifacts.

## 9. What to reuse / extend / replace

### Reuse

- Vite + React + Router
- Design tokens, cards, tags, avatars, bottom nav pattern
- PostCard + post types
- Explore buddies + project cards
- Challenge card chrome
- Icons
- i18n hook
- Supabase client as optional persistence later
- Capacitor config (dormant)

### Extend

- Routes: Home, Learn, Lesson, Code Lab, Projects, Community
- Bottom nav: Home / Learn / Lab / Community / Profile
- Post schema with lesson context
- Challenges linked to lesson IDs
- Profile journey driven by progress store

### Replace / stop doing

- Auth hard-gate on all routes
- Product name DevPath in title / persist key / README identity
- Single Zustand dump for the whole academy
- Challenge “lessons” that are only day labels
- APK workflow as current priority (`.github/workflows/build-apk.yml` stays unused)

## 10. Curriculum recovery from this repo

**Result: zero educational lesson bodies in this repository.**

No HTML academy file, no JSON courses, no quizzes.

Previous SKONGA versions (7/35 and 15/138) are **not in this GitHub tree**. They cannot be marked RECOVERED from DevPath.

See `CURRICULUM_INVENTORY.md`.
