# CURRICULUM INVENTORY

**Source searched:** DevPath repository (all files listed in DEVPATH_AUDIT.md)  
**Also searched:** no `skonga-academy-tech.html` in this repo; no curriculum JSON/MD.

## Recovery verdict

| Claimed historical corpus | Found in DevPath? | Status |
|---|---|---|
| ~7 modules / 35 lessons | No | MISSING (not in this repo) |
| ~15 modules / 138 lessons | No | MISSING (not in this repo) |
| `skonga-academy-tech.html` | No | MISSING from this repo |

Nothing in DevPath may be labelled **RECOVERED** as a lesson body.

What *was* found is **community mock text**, not curriculum:

- JS `let` / `const` / `var` anecdote in a feed post
- Challenge topic labels: Variables, Functions, Arrays, Objects, DOM, Events
- Profile journey titles: HTML & CSS basics, JS fundamentals, Calculator
- Project names: Calculator, Todo, Weather, Quiz

Those titles inform the **NEW** curriculum outline. They are not lesson content.

## Inventory table (Academy v1 authored for this transformation)

Status legend used in this inventory: **NEW** (all rows below).
Wider provenance vocabulary: VERIFIED | INFERRED | MISSING | NEW | PROPOSED.

IDs (`web-02`, `js-02`, `py-01`, …) are **NEW registry IDs**. They are not recovered historical IDs.

### Level 0 — Foundations (`foundations`)

| ID | Lesson | Quiz | Challenge | Project | Status |
|---|---|---|---|---|---|
| `found-01` | How computers & the web fit together | yes | yes | — | NEW |
| `found-02` | Files, folders, and paths | yes | yes | — | NEW |
| `found-03` | What a developer actually does | yes | yes | — | NEW |

### Level 1 — Programming (`programming`)

| ID | Lesson | Quiz | Challenge | Project | Status |
|---|---|---|---|---|---|
| `py-01` | print / output | yes | yes | — | NEW |
| `py-02` | Variables | yes | yes | — | NEW |
| `py-03` | Data types | yes | yes | — | NEW |
| `py-04` | input | yes | yes | — | NEW |
| `py-05` | Operators | yes | yes | — | NEW |
| `py-06` | Conditions | yes | yes | — | NEW |
| `py-07` | Loops | yes | yes | — | NEW |
| `py-08` | Functions | yes | yes | — | NEW |
| `py-09` | Lists | yes | yes | — | NEW |
| `py-10` | Dictionaries | yes | yes | — | NEW |
| `prog-project` | Student Grade Calculator | — | — | yes | NEW |

Python lessons are conceptually complete in data, but **runtime is not in Code Lab v1** (HTML/CSS/JS only). Marked NEW, practice is read/predict/modify-on-paper until a Python runtime exists.

### Level 2 — Web (`web`)

| ID | Lesson | Quiz | Lab starter | Status |
|---|---|---|---|---|
| `web-01` | How the Web Works | yes | no | NEW |
| `web-02` | HTML Document | yes | yes | NEW |
| `web-03` | Text & Headings | yes | yes | NEW |
| `web-04` | Links | yes | yes | NEW |
| `web-05` | Images | yes | yes | NEW |
| `web-06` | Lists | yes | yes | NEW |
| `web-07` | Tables | yes | yes | NEW |
| `web-08` | Forms | yes | yes | NEW |
| `web-09` | Semantic HTML | yes | yes | NEW |
| `html-project` | Personal bio page | — | yes | NEW |
| `css-01` | CSS Foundations | yes | yes | NEW |
| `css-02` | Selectors | yes | yes | NEW |
| `css-03` | Colors | yes | yes | NEW |
| `css-04` | Typography | yes | yes | NEW |
| `css-05` | Box Model | yes | yes | NEW |
| `css-06` | Display | yes | yes | NEW |
| `css-07` | Position | yes | yes | NEW |
| `css-08` | Flexbox | yes | yes | NEW |
| `css-09` | Grid | yes | yes | NEW |
| `css-10` | Responsive Design | yes | yes | NEW |
| `css-project` | Profile card layout | — | yes | NEW |
| `js-01` | JS Foundations | yes | yes | NEW |
| `js-02` | Variables | yes | yes | NEW |
| `js-03` | Data Types | yes | yes | NEW |
| `js-04` | Operators | yes | yes | NEW |
| `js-05` | Conditions | yes | yes | NEW |
| `js-06` | Loops | yes | yes | NEW |
| `js-07` | Functions | yes | yes | NEW |
| `js-08` | Arrays | yes | yes | NEW |
| `js-09` | Objects | yes | yes | NEW |
| `js-10` | DOM | yes | yes | NEW |
| `js-11` | Events | yes | yes | NEW |
| `web-project` | Interactive quiz page | — | yes | NEW |

### Level 3 — Tools (`tools`)

Terminal + Git lesson outlines: NEW (command curriculum, no sandbox yet).

### Level 4–6 — Backend / App / AI

Module shells + first lesson each: NEW outlines. Full 20-section bodies incrementally authored; first lesson of each track is complete NEW.

### Level 7–8 — Project Lab / Capstone

| ID | Project | Status |
|---|---|---|
| `proj-calculator` | Calculator | NEW |
| `proj-weather` | Weather Dashboard | NEW |
| `proj-quiz` | Quiz Game | NEW |
| `proj-chatbot` | AI Chatbot | NEW |
| `proj-portfolio` | Portfolio | NEW |
| `proj-capstone` | Learner-chosen full app | NEW |

## Honest missing list

If the original HTML academy file is provided later, rows above stay NEW until a migration map can mark specific IDs RECOVERED.

Do not back-date NEW lessons as RECOVERED.
