import { lesson, q, labHtml } from './lessonFactory'

/**
 * LEVEL 5 — App Development. Provenance: NEW.
 * Web-first. Capacitor is a shell, not the product. No APK build in these lessons.
 */

const NO_NATIVE =
  'SKONGA v1 does not build an APK or talk to native plugins in Code Lab. You will learn the web-first model and practise a mobile-width layout in the browser. Packaging comes after the web school works.'

function paper(partial) {
  return lesson({
    status: 'NEW-complete',
    difficulty: 'beginner',
    estimatedMinutes: 18,
    runtime: 'none',
    runtimeNote: NO_NATIVE,
    lab: null,
    completion: { requireQuiz: true, requireLab: false },
    ...partial,
  })
}

function labL(partial) {
  return lesson({
    status: 'NEW-complete',
    difficulty: 'beginner',
    estimatedMinutes: 24,
    runtime: 'html-css-js',
    runtimeNote: 'Browser preview only. This is not an installed app.',
    completion: { requireQuiz: true, requireLab: true },
    ...partial,
  })
}

const app01 = paper({
  id: 'app-01',
  title: 'Web first, then a shell',
  order: 1,
  prerequisites: ['be-09'],
  goal: 'You can explain why SKONGA ships a website before an APK, and what a native shell does.',
  why: 'Packaging a weak web app produces a weak app with extra install friction.',
  concept:
    'Capacitor (and similar tools) wrap a web build in a native container so it can be installed. The learning product is still HTML, CSS, and JavaScript.',
  analogy: 'Print a book after the chapters exist. A hard cover does not write chapter one.',
  explanation:
    'capacitor.config.json in this repo is a placeholder for later packaging. It is not a substitute for lessons, Code Lab, or progress.\n\nWeb-first means: one codebase learners can open in a phone browser today. A store listing is a distribution choice, not a curriculum milestone.',
  example: 'Two layers.',
  code: `Web app   = HTML + CSS + JS (the school)
Native shell = optional container (later)
Store      = distribution, not the lesson`,
  lineByLine: [
    { line: 'Web app', text: 'What you are building now.' },
    { line: 'Shell', text: 'Window that loads your dist/ files.' },
    { line: 'Store', text: 'How some people install that window.' },
  ],
  predict: {
    prompt: 'If the web quiz is broken, will wrapping it in Capacitor fix the quiz logic?',
    answer: 'No. The shell does not repair JavaScript.',
  },
  practice: {
    copy: 'Write web / shell / store in one sentence each.',
    modify: 'Add this rule to your tools runbook: “No APK until the web path works.”',
    create: 'A poster: Learn in the browser first.',
  },
  mistake: 'Measuring school quality by whether an APK exists.',
  debug: {
    broken: 'Starting the week with cap add android instead of a lesson.',
    hint: 'Finish a web artefact first. Packaging is Phase later.',
  },
  guidedChallenge: 'Name one thing an installable shell does not teach you.',
  independentChallenge: 'Why a URL is a valid way to attend this school.',
  quiz: [
    q('Current SKONGA priority is…', ['Excellent web Academy', 'APK first', 'App Store ads'], 0, 'Web-first decision.'),
    q('A native shell…', ['Hosts your web build', 'Replaces HTML', 'Runs Python in v1 Lab'], 0, 'Container.'),
    q('Broken JS in the web app…', ['Stays broken inside the shell', 'Auto-heals on Play Store', 'Becomes Git'], 0, 'Same code.'),
  ],
  takeaways: ['Write the school first.', 'Shell is optional wrapping.', 'Stores are distribution.'],
  cheatSheet: 'web app → later shell → later store',
  youCanNow: 'Defend web-first without dismissing mobile.',
  nextId: 'app-02',
})

const app02 = paper({
  id: 'app-02',
  title: 'What changes on a phone',
  order: 2,
  prerequisites: ['app-01', 'css-10'],
  goal: 'You can list phone constraints that affect a learning app: width, touch, keyboard, offline gaps.',
  why: 'A layout that only works on a laptop is unfinished for SKONGA’s learners.',
  concept:
    'Phones are narrow, touch-first, often on slow networks, and may lose the tab. UI must have large targets, readable type, and honest offline behaviour.',
  analogy: 'A classroom desk versus a crowded daladala seat — same book, less space.',
  explanation:
    'Targets: buttons should be easy to tap (think thumb, not a precise mouse).\nType: 16px+ body text reduces pinch-zoom.\nWidth: one column by default; grids collapse (you already practised media queries).\nNetwork: do not require a live API to read a shipped lesson.\nKeyboard: forms must not hide behind the on-screen keyboard forever — keep fields simple.',
  example: 'Constraints checklist.',
  code: `narrow width
touch targets
readable type
less precision
network may drop
no hover`,
  lineByLine: [
    { line: 'no hover', text: 'Do not hide important actions only on mouse-over.' },
    { line: 'network may drop', text: 'Curriculum files should work without a custom API.' },
  ],
  predict: {
    prompt: 'Is a 12px “Submit” link a good phone control?',
    answer: 'No — too small to tap reliably.',
  },
  practice: {
    copy: 'Write the six constraints in your notes.',
    modify: 'Audit the Code Lab Run button mentally: is it tappable?',
    create: 'A phone checklist you will use on the next project.',
  },
  mistake: 'Designing hover-only menus for a school that runs on phones.',
  debug: {
    broken: 'Two-column grid of tiny buttons with no media query.',
    hint: 'Stack on small screens; enlarge hit areas.',
  },
  guidedChallenge: 'Name one SKONGA screen that must stay one column.',
  independentChallenge: 'Why shipped lessons beat a weather API for class time.',
  quiz: [
    q('Hover-only actions on phones are…', ['A problem', 'Required', 'A Git feature'], 0, 'No hover.'),
    q('Body text near 16–18px is…', ['A readability choice', 'Only for print', 'An HTTP method'], 0, 'Type size.'),
    q('A learning app should…', ['Work for reading lessons without a custom live API', 'Require 5G always', 'Hide buttons until hover'], 0, 'Offline-friendly content.'),
  ],
  takeaways: ['Phones are the default device.', 'Touch + width + type.', 'Network is optional for shipped lessons.'],
  cheatSheet: 'narrow · tap · type · no hover · flaky net',
  youCanNow: 'Audit a screen for phone use.',
  nextId: 'app-03',
})

const app03 = labL({
  id: 'app-03',
  title: 'A mobile-width frame',
  order: 3,
  prerequisites: ['app-02', 'css-08'],
  goal: 'You can build a simple phone-shaped layout: top bar, scrolling content, bottom actions.',
  why: 'SKONGA’s own shell uses this pattern. You should be able to reproduce a tiny version.',
  concept: 'A column: header (fixed idea), main (scroll), footer actions. max-width keeps it phone-like on desktop too.',
  analogy: 'A noticeboard with a title strip, the notices, and a pin tray at the bottom.',
  explanation:
    'Use a column flex layout. Give the main region room to scroll conceptually (in this lab a tall stack is enough).\nKeep one primary button. Do not copy the whole Academy UI — copy the idea.',
  example: 'Tiny shell.',
  code: `.app { max-width: 390px; min-height: 100vh; display: flex; flex-direction: column; }
main { flex: 1; padding: 16px; }
footer { padding: 12px 16px; }`,
  lineByLine: [
    { line: 'max-width: 390px', text: 'Phone column even on a laptop preview.' },
    { line: 'flex-direction: column', text: 'Header / main / footer stack.' },
    { line: 'flex: 1', text: 'Main eats leftover height.' },
  ],
  predict: {
    prompt: 'If max-width is 390px and the preview is 900px wide, how wide is the app column?',
    answer: 'About 390px (plus any centering).',
  },
  practice: {
    copy: 'Run the lab. Notice the column.',
    modify: 'Change the title and the button label to your club name.',
    create: 'Add a second content card without breaking the footer.',
  },
  mistake: 'Three competing primary buttons in the footer.',
  debug: {
    broken: 'Footer overlapping text because nothing is a column.',
    hint: 'flex-direction: column on the shell; padding on main.',
  },
  guidedChallenge: 'Centre the column on the page (margin: 0 auto).',
  independentChallenge: 'Use only one accent colour.',
  quiz: [
    q('A phone shell is mostly…', ['A column of regions', 'A SQL table', 'A Git rebase'], 0, 'Layout regions.'),
    q('max-width ~390px…', ['Mimics a phone column', 'Starts a server', 'Deletes CSS'], 0, 'Width cap.'),
    q('This lab installs on Play Store?', ['No', 'Yes automatically', 'Only after rm'], 0, 'Preview only.'),
  ],
  takeaways: ['Column shell.', 'One primary action.', 'Still just HTML/CSS.'],
  cheatSheet: 'max-width column · header · main · footer',
  youCanNow: 'Sketch SKONGA-like regions in Code Lab.',
  nextId: 'app-04',
  lab: labHtml(
    `<div class="app">
  <header>Club</header>
  <main>
    <h1>Friday practice</h1>
    <p>Bring your notebook. We will trace a program together.</p>
    <article class="card">Topic: variables</article>
  </main>
  <footer><button type="button">Join</button></footer>
</div>`,
    `body{margin:0;font-family:system-ui,sans-serif;background:#e7e5e4}
.app{max-width:390px;min-height:100vh;margin:0 auto;background:#fff;display:flex;flex-direction:column}
header{padding:12px 16px;font-weight:700;border-bottom:1px solid #e5e5e5}
main{flex:1;padding:16px}
.card{border:1px solid #ddd;border-radius:12px;padding:12px}
footer{padding:12px 16px;border-top:1px solid #e5e5e5}
button{width:100%;padding:12px;border:0;border-radius:10px;background:#6d28d9;color:#fff;font-weight:600}`,
    `console.log('mobile-width frame (web only)')`
  ),
})

const app04 = paper({
  id: 'app-04',
  title: 'Storage and install myths',
  order: 4,
  prerequisites: ['app-03', 'be-08'],
  goal: 'You can separate “installed app”, “browser tab”, and “account data”.',
  why: 'Learners ask “if I install it, are my marks safe?” The honest answer depends on where data lives.',
  concept:
    'Installing a PWA or APK copies the client. It does not automatically create a cloud account. Progress still lives where you designed it to live.',
  analogy:
    'Putting a textbook in your bag (install) versus the school writing your name in the register (account + server).',
  explanation:
    'Browser tab: files from the network or cache, state in RAM/localStorage.\nInstalled shell: same web files, maybe an icon.\nAccount data: only if a backend + login writes it.\n\nSKONGA v1: Learn works without install and without login. That is professional, not unfinished, as long as we say it.',
  example: 'Three promises you must not mix.',
  code: `install  ≠  account
icon    ≠  database
offline cache ≠ school register`,
  lineByLine: [
    { line: 'install ≠ account', text: 'A home-screen icon is not identity.' },
    { line: 'cache ≠ register', text: 'Cached lessons are not multi-device marks.' },
  ],
  predict: {
    prompt: 'A learner installs the app, never logs in, switches phones. Do marks follow?',
    answer: 'Not unless a server + identity stored them. An icon does not carry the other phone’s localStorage.',
  },
  practice: {
    copy: 'Write the three promises and what each actually guarantees.',
    modify: 'Add one honest sentence to a future app store listing (draft).',
    create: 'A FAQ answer for “Will install save my progress?”',
  },
  mistake: 'Advertising “in the cloud” because Capacitor exists in package.json.',
  debug: {
    broken: 'Store screenshot promises synced marks with no API.',
    hint: 'Change the promise or build the API. Do not blur them.',
  },
  guidedChallenge: 'Which SKONGA features should require an account?',
  independentChallenge: 'Write a one-line data policy a Form 2 student can understand.',
  quiz: [
    q('An app icon guarantees…', ['A way to open the client', 'A school database', 'Git history'], 0, 'Launcher only.'),
    q('Marks on two phones need…', ['Identity + backend store', 'Only Capacitor config', 'A purple button'], 0, 'Shared register.'),
    q('Learn without install is…', ['Valid', 'Cheating', 'Impossible'], 0, 'Web-first.'),
  ],
  takeaways: ['Install is distribution.', 'Data needs a designed home.', 'Say the promise that is true.'],
  cheatSheet: 'icon ≠ account ≠ database',
  youCanNow: 'Talk about mobile without lying about storage.',
  nextId: 'app-project',
})

const appProject = labL({
  id: 'app-project',
  title: 'App project — Club notice “app”',
  order: 5,
  estimatedMinutes: 30,
  prerequisites: ['app-03'],
  goal: 'You can ship a phone-column notice screen with a title, two facts, and one action button.',
  why: 'This is the LEVEL 5 artefact: a small product surface, not a store listing.',
  concept: 'One job, one column, one action. Content is real (your club or class).',
  analogy: 'A printed notice on the classroom door — now on a screen.',
  explanation:
    'Requirements:\n1) max-width phone column\n2) header + main + footer\n3) real text, no leftover “Club” if you have a name\n4) one primary button that changes a status line via JS\n5) readable contrast\n\nStill not an APK.',
  example: 'Starter shell — personalise it.',
  code: `button.addEventListener('click', () => {
  status.textContent = 'You are on the list'
})`,
  practice: {
    copy: 'Run the starter.',
    modify: 'Replace all placeholder names.',
    create: 'Meet the five requirements. Button must change the page.',
  },
  mistake: 'Five pages of navigation for a single notice.',
  debug: {
    broken: 'Button does nothing.',
    hint: 'addEventListener on the button; write to a status element.',
  },
  guidedChallenge: 'Disable the button after the first join.',
  independentChallenge: 'Share a screenshot description in Community with courseId app.',
  quiz: [
    q('LEVEL 5 project proves…', ['A mobile-width web product surface', 'Play Store approval', 'A Python server'], 0, 'Web surface.'),
    q('The action should…', ['Change the DOM', 'Only exist in CSS comments', 'Run git push'], 0, 'Behaviour.'),
    q('APK is required to complete this?', ['No', 'Yes', 'Only on iOS'], 0, 'Web-first.'),
  ],
  takeaways: ['One job.', 'Phone column.', 'Still the web.'],
  cheatSheet: 'column + real copy + one action',
  youCanNow: 'Hand a tiny mobile web screen to the AI module.',
  nextId: 'ai-01',
  lab: labHtml(
    `<div class="app">
  <header>Science Club</header>
  <main>
    <h1>Lab day</h1>
    <p>Tuesday · Room 12</p>
    <p id="status">Open spots</p>
  </main>
  <footer><button type="button" id="join">Join list</button></footer>
</div>`,
    `body{margin:0;font-family:system-ui,sans-serif;background:#ece7f5}
.app{max-width:390px;min-height:100vh;margin:0 auto;background:#fff;display:flex;flex-direction:column}
header{padding:12px 16px;font-weight:700;border-bottom:1px solid #eee}
main{flex:1;padding:16px}
footer{padding:12px 16px}
button{width:100%;padding:12px;border:0;border-radius:10px;background:#5b21b6;color:#fff;font-weight:600}
#status{color:#444}`,
    `const btn = document.getElementById('join')
const status = document.getElementById('status')
btn.addEventListener('click', () => {
  status.textContent = 'You are on the list'
  btn.disabled = true
  btn.textContent = 'Joined'
})`
  ),
})

export const app = {
  id: 'app',
  level: 5,
  title: 'App Development',
  blurb: 'Web-first mobile surfaces. Capacitor stays a future shell — not this week’s goal.',
  status: 'NEW',
  modules: [
    {
      id: 'mobile-ideas',
      title: 'Mobile concepts',
      goal: 'Know what a phone changes — and what a shell does not fix.',
      lessons: [app01, app02, app03, app04, appProject],
    },
  ],
}
