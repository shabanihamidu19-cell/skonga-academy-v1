# CURRICULUM MIGRATION MAP

**Evidence rule:** DevPath has **no old course/lesson IDs**. Nothing below is RECOVERED content.

Classification used here:

| Label | Meaning |
|---|---|
| VERIFIED | Observed in DevPath source (app code, mock UI strings) |
| INFERRED | Topic names deduced from those mock strings — not lesson bodies |
| MISSING | Claimed historical files not present in the audited repo |
| NEW | Authored for SKONGA Academy v1 in `src/data/curriculum` |
| PROPOSED | Target structure / default start path |

## A. Historical outline (owner description) → PROPOSED courses

These names came from product conversation, **not** from files in DevPath. Destination courses are NEW shells/content.

| Described area (UNVERIFIED in repo) | PROPOSED course id | Notes |
|---|---|---|
| Web Development | `web` | NEW modules HTML/CSS/JS |
| Programming / Python | `programming` | NEW |
| Developer Tools | `tools` | NEW |
| Backend | `backend` | NEW |
| App Development | `app` | NEW |
| AI | `ai` | NEW |
| Project Lab | `projects` | NEW |
| Capstone | `proj-capstone` inside projects | NEW; no separate recovered capstone file |

`skonga-academy-tech.html` and 35/138 corpora: **MISSING** from DevPath.

## B. DevPath mock labels (VERIFIED strings) → NEW lesson IDs

The left column exists as **UI mock text** in `useAppStore.js`.  
The right column is **NEW Academy IDs created after audit**. They are not historical IDs found in DevPath.

| VERIFIED DevPath string | INFERRED topic | NEW Academy id (authored) |
|---|---|---|
| Challenge day labels: Variables, Functions, Arrays, Objects, DOM, Events | JS topics | `js-02` … `js-11` |
| Challenge name: CSS Layouts — 7 Days | CSS layout topics | subset of `css-05` … `css-10` |
| Challenge name: Python Basics — 14 Days | Python intro | `py-01` … `py-10` |
| Project mocks: Calculator, Weather, Quiz | project ideas | `proj-calculator`, `proj-weather`, `proj-quiz` |
| Profile journey: HTML & CSS basics | web start | `web-02`, `css-01` |

Do not treat the right column as recovered IDs.

## C. Status policy

| Evidence | Status |
|---|---|
| Lesson body found in a verified source file | RECOVERED (none today) |
| Title only in DevPath mocks | INFERRED topic; body remains NEW or MISSING |
| Needed for UI path, authored now | NEW |
| Target IA not yet filled | PROPOSED / TODO |

## D. Ordering (PROPOSED)

Academy Learn order is Foundations → Programming → Web → Tools → Backend → App → AI → Projects.

DevPath’s active mock challenge was “30 Days of JavaScript”. That remains a **Community/Challenges** track, not proof that JS was the first course.
