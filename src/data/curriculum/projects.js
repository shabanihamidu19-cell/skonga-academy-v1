import { lesson, q, labHtml } from './lessonFactory'

/**
 * LEVEL 7 — Project Lab. Provenance: NEW.
 * Each guided project has completion criteria. Live third-party APIs are optional, not required.
 */

const base =
  'body{font-family:system-ui,sans-serif;padding:24px;line-height:1.5;max-width:28rem;margin:0 auto;color:#111}'

function P(partial) {
  return lesson({
    status: 'NEW-complete',
    difficulty: 'beginner',
    estimatedMinutes: 40,
    runtime: 'html-css-js',
    completion: { requireQuiz: true, requireLab: true },
    ...partial,
  })
}

function paper(partial) {
  return lesson({
    status: 'NEW-complete',
    difficulty: 'beginner',
    estimatedMinutes: 35,
    runtime: 'none',
    runtimeNote:
      'This project is a plan and checklist. Code Lab is optional; no live vendor API is required.',
    lab: null,
    completion: { requireQuiz: true, requireLab: false },
    ...partial,
  })
}

const calc = P({
  id: 'proj-calculator',
  title: 'Calculator',
  order: 1,
  prerequisites: ['js-05', 'js-11'],
  goal: 'You can add two numbers from button taps and show the result.',
  why: 'State + events + DOM in one artefact.',
  concept: 'Remember the first number, remember +, read the second, write the sum.',
  analogy: 'A shop counter that only adds — on purpose.',
  explanation:
    'Requirements:\n1) A display\n2) Digit buttons 0–9 (starter may use a subset — extend it)\n3) + and =\n4) Display updates on tap\n5) One debug: break it, read the console, fix it\n\nDo not start with every operator. Addition that works beats a broken scientific panel.',
  example: 'Starter adds.',
  code: `acc = Number(cur)
// later
display.textContent = String(acc + Number(cur))`,
  practice: {
    copy: 'Run. Press 7, +, 8, = and expect 15.',
    modify: 'Add a Clear button that resets display to 0.',
    create: 'Support one more digit button that was missing, or add a minus if addition is solid.',
  },
  mistake: 'String glue: "7" + "8" = "78" instead of 15.',
  debug: {
    broken: 'display.textContent = acc + cur  // string concat',
    hint: 'Number(cur) before adding.',
  },
  guidedChallenge: 'Log acc, cur, and op on every tap.',
  independentChallenge: 'Write a 4-line reflection: what state you stored.',
  quiz: [
    q('The display must change because…', ['JS writes textContent', 'CSS invented numbers', 'Git committed'], 0, 'DOM write.'),
    q('"7"+"8" without Number is…', ['"78"', '15', '404'], 0, 'Concat.'),
    q('This project needs a backend?', ['No', 'Yes, Postgres', 'Only RAG'], 0, 'Pure client.'),
  ],
  takeaways: ['State in variables.', 'Convert then compute.', 'Small scope ships.'],
  cheatSheet: 'digits → acc → op → second → Number → display',
  youCanNow: 'Ship a one-operation calculator.',
  nextId: 'proj-weather',
  lab: labHtml(
    `<div class="calc">
  <div id="display">0</div>
  <button type="button" data-n="7">7</button>
  <button type="button" data-n="8">8</button>
  <button type="button" data-n="9">9</button>
  <button type="button" data-n="4">4</button>
  <button type="button" data-n="5">5</button>
  <button type="button" data-n="6">6</button>
  <button type="button" data-n="1">1</button>
  <button type="button" data-n="2">2</button>
  <button type="button" data-n="3">3</button>
  <button type="button" data-n="0">0</button>
  <button type="button" id="add">+</button>
  <button type="button" id="eq">=</button>
</div>`,
    base +
      `.calc{display:grid;grid-template-columns:repeat(3,72px);gap:8px}
#display{grid-column:1/4;padding:12px;background:#111;color:#fff;border-radius:8px}
button{padding:12px}`,
    `let acc = 0, cur = '', op = null
const display = document.querySelector('#display')
document.querySelectorAll('[data-n]').forEach((b) => {
  b.addEventListener('click', () => {
    cur += b.dataset.n
    display.textContent = cur
  })
})
document.querySelector('#add').addEventListener('click', () => {
  acc = Number(cur || acc)
  cur = ''
  op = '+'
})
document.querySelector('#eq').addEventListener('click', () => {
  if (op === '+') display.textContent = String(acc + Number(cur || 0))
})`
  ),
})

const weather = P({
  id: 'proj-weather',
  title: 'Weather dashboard (mock)',
  order: 2,
  prerequisites: ['be-05', 'js-10'],
  goal: 'You can render weather fields from a JSON mock and label it as mock data.',
  why: 'Fetch to a live API fails in class. A dashboard that works offline is professional.',
  concept: 'Treat JSON as the response body of GET /weather. Render city, temp, summary.',
  analogy: 'A noticeboard filled from a printed bulletin, not from shouting at the sky.',
  explanation:
    'Requirements:\n1) JSON object with city, tempC, summary\n2) Three fields on the page\n3) Visible “mock data” label\n4) Change the JSON and see the page update\n\nLive fetch is extra credit on your own network — not completion.',
  example: 'Mock body.',
  code: `const weather = { city: "Dar es Salaam", tempC: 31, summary: "Hot" }`,
  practice: {
    copy: 'Run. Read Dar / 31 / Hot.',
    modify: 'Change city to yours and tempC to a number you pick.',
    create: 'Add humidity and render it.',
  },
  mistake: 'Calling this “live weather” in the heading.',
  debug: {
    broken: 'JSON.parse with single quotes',
    hint: 'Valid JSON or a JS object literal — stay consistent.',
  },
  guidedChallenge: 'Show tempF as well using a formula you write.',
  independentChallenge: 'Two cities in an array; render both.',
  quiz: [
    q('This dashboard’s data source in v1 is…', ['A mock object/JSON', 'A guaranteed live satellite', 'Git'], 0, 'Mock.'),
    q('Rendering means…', ['Writing fields into the DOM', 'Deploying Capacitor', 'Deleting CSS'], 0, 'DOM.'),
    q('Live fetch is required to pass?', ['No', 'Yes', 'Only on 5G'], 0, 'Optional extra.'),
  ],
  takeaways: ['Mock is honest.', 'Same render path as a real GET.', 'Label the source.'],
  cheatSheet: 'mock JSON → fields → DOM',
  youCanNow: 'Build a dashboard without a vendor key.',
  nextId: 'proj-quiz',
  lab: labHtml(
    `<p class="tag">mock data</p>
<h1 id="city"></h1>
<p id="temp"></p>
<p id="summary"></p>`,
    base + '.tag{color:#5b21b6;font-size:12px;text-transform:uppercase}',
    `const weather = { city: 'Dar es Salaam', tempC: 31, summary: 'Hot' }
document.getElementById('city').textContent = weather.city
document.getElementById('temp').textContent = weather.tempC + ' °C'
document.getElementById('summary').textContent = weather.summary
console.log(weather)`
  ),
})

const quizGame = P({
  id: 'proj-quiz',
  title: 'Quiz game',
  order: 3,
  prerequisites: ['web-project', 'js-08'],
  goal: 'You can score two questions stored in an array and show the total.',
  why: 'The LEVEL 2 one-question page grows up: data-driven questions.',
  concept: 'An array of { q, choices, answer }. Track index and score. Render the current item.',
  analogy: 'A stack of exam cards you flip one by one.',
  explanation:
    'Requirements:\n1) At least two questions in an array\n2) Clicking an option records a choice\n3) Next or Check moves forward\n4) Final score on screen\n5) Questions about SKONGA lessons you already took',
  example: 'Shape.',
  code: `const items = [
  { q: 'GET is for…', choices: ['read', 'delete'], answer: 0 }
]`,
  practice: {
    copy: 'Run the starter two-question quiz.',
    modify: 'Replace both questions with ones from CSS or HTTP.',
    create: 'Add a third question and keep the score honest.',
  },
  mistake: 'Hard-coding question two in HTML only, then forgetting the array.',
  debug: {
    broken: 'score++ on every click including wrong answers',
    hint: 'Increment only when choice === item.answer.',
  },
  guidedChallenge: 'Disable options after a pick.',
  independentChallenge: 'Show “2 / 3” during the quiz.',
  quiz: [
    q('Questions should live in…', ['An array of objects', 'Only the page title', 'package-lock'], 0, 'Data-driven.'),
    q('Score increases when…', ['The chosen index matches answer', 'Any click happens', 'CSS loads'], 0, 'Compare.'),
    q('This needs a server?', ['No', 'Yes', 'Only RAG'], 0, 'Client state.'),
  ],
  takeaways: ['Data first.', 'Index + score.', 'Reuse lesson facts.'],
  cheatSheet: 'items[] · index · score · render',
  youCanNow: 'Ship a multi-question quiz.',
  nextId: 'proj-chatbot',
  lab: labHtml(
    `<h1>Quiz</h1>
<p id="q"></p>
<div id="choices"></div>
<p id="score"></p>`,
    base + 'button{display:block;margin:8px 0;padding:8px}',
    `const items = [
  { q: 'GET is mainly for…', choices: ['reading a resource', 'deleting a resource'], answer: 0 },
  { q: 'padding is space…', choices: ['outside the border', 'inside the border'], answer: 1 },
]
let i = 0, score = 0
const qEl = document.getElementById('q')
const box = document.getElementById('choices')
const scoreEl = document.getElementById('score')
function render() {
  box.innerHTML = ''
  if (i >= items.length) {
    qEl.textContent = 'Done'
    scoreEl.textContent = 'Score ' + score + ' / ' + items.length
    return
  }
  const item = items[i]
  qEl.textContent = item.q
  item.choices.forEach((label, idx) => {
    const b = document.createElement('button')
    b.type = 'button'
    b.textContent = label
    b.addEventListener('click', () => {
      if (idx === item.answer) score += 1
      i += 1
      render()
    })
    box.appendChild(b)
  })
}
render()`
  ),
})

const bot = P({
  id: 'proj-chatbot',
  title: 'Tutor chat shell',
  order: 4,
  prerequisites: ['ai-05'],
  goal: 'You can ship a labelled mock tutor with history and an empty-submit guard.',
  why: 'LEVEL 6 UI becomes a project you can show.',
  concept: 'Same mock pattern, slightly more product polish.',
  analogy: 'A booth with a sign: “Actor rehearsing.”',
  explanation:
    'Requirements:\n1) History log\n2) Input + send\n3) mock label visible\n4) ignore empty send\n5) one canned extra reply if the text includes “variable”',
  example: 'Keyword branch.',
  code: `if (/variable/i.test(text)) return 'Mock: a variable is a labelled box.'`,
  practice: {
    copy: 'Send hello; read mock.',
    modify: 'Change the variable canned line.',
    create: 'Add a second keyword from a lesson you liked.',
  },
  mistake: 'Claiming the bot “uses GPT” in the heading.',
  debug: {
    broken: 'innerHTML with unescaped user text in a real product is risky — keep inputs short here.',
    hint: 'Class project: short text. Later, use textContent.',
  },
  guidedChallenge: 'Switch the log to textContent-style nodes if you can.',
  independentChallenge: 'Write the future swap: mockReply → fetch.',
  quiz: [
    q('The reply function in v1 is…', ['A mock', 'A hosted LLM', 'Git'], 0, 'Mock.'),
    q('Empty submit should…', ['Do nothing', 'Crash', 'Push to origin'], 0, 'Guard.'),
    q('Keyword branch proves…', ['You can special-case before an API exists', 'RAG is deployed', 'Auth is done'], 0, 'Product thinking.'),
  ],
  takeaways: ['Polish the shell.', 'Stay labelled.', 'Keywords are not a model.'],
  cheatSheet: 'history · guard · mock · optional keyword',
  youCanNow: 'Show a tutor booth without a vendor bill.',
  nextId: 'proj-portfolio',
  lab: labHtml(
    `<h1>Tutor booth <small>(mock)</small></h1>
<div id="log"></div>
<input id="q" placeholder="Ask…" />
<button type="button" id="send">Send</button>`,
    base + '#log{border:1px solid #ddd;min-height:7rem;padding:8px;margin:8px 0}input,button{padding:8px}',
    `function mockReply(text) {
  if (/variable/i.test(text)) return 'Mock: a variable is a labelled box. Check py-02 or js-02.'
  return 'Mock tutor: received "' + text + '". No model is running.'
}
document.getElementById('send').addEventListener('click', () => {
  const box = document.getElementById('q')
  const text = box.value.trim()
  if (!text) return
  const log = document.getElementById('log')
  const u = document.createElement('p')
  u.textContent = 'You: ' + text
  const m = document.createElement('p')
  m.textContent = mockReply(text)
  log.appendChild(u)
  log.appendChild(m)
  box.value = ''
})`
  ),
})

const portfolio = P({
  id: 'proj-portfolio',
  title: 'Portfolio page',
  order: 5,
  prerequisites: ['html-project', 'css-project', 'app-03'],
  goal: 'You can publish one page: who you are, three skills, two project links as text, phone-readable.',
  why: 'Proof of the path in one URL-shaped artefact (even if only in Lab).',
  concept: 'Semantic layout + CSS column + real content about you.',
  analogy: 'A notice on the classroom door with your name at the top.',
  explanation:
    'Requirements:\n1) header with your name\n2) about paragraph\n3) three skills in a list\n4) two projects named (Calculator, Quiz…)\n5) max-width readable column\n\nLinks may be # anchors if you have no public host.',
  example: 'Outline.',
  code: `header name
main about + skills + projects
footer year`,
  practice: {
    copy: 'Run the scaffold.',
    modify: 'Replace every placeholder with you.',
    create: 'Meet all five requirements. No “Your Name” left.',
  },
  mistake: 'Lorem ipsum on a portfolio you claim is finished.',
  debug: {
    broken: 'Unreadable contrast, 11px type.',
    hint: 'Dark text, 16px+, padding.',
  },
  guidedChallenge: 'Add one line “I study at SKONGA Academy”.',
  independentChallenge: 'Describe this page in Community as type project.',
  quiz: [
    q('A portfolio is complete when…', ['It is about you and readable', 'It uses ten frameworks', 'It has Lorem only'], 0, 'Real content.'),
    q('Skills belong in…', ['A list', 'The <title> only', 'rm'], 0, 'ul/li.'),
    q('Public hosting is required in Lab?', ['No', 'Yes', 'Only Vercel'], 0, 'Lab is enough to learn.'),
  ],
  takeaways: ['Real name.', 'Few projects, well named.', 'Readable column.'],
  cheatSheet: 'name · about · skills · projects',
  youCanNow: 'Point at one page that represents you.',
  nextId: 'proj-capstone',
  lab: labHtml(
    `<header>
  <h1>Your Name</h1>
  <p>Learner · SKONGA Academy</p>
</header>
<main>
  <h2>About</h2>
  <p>Two honest sentences.</p>
  <h2>Skills</h2>
  <ul><li>HTML</li><li>CSS</li><li>JavaScript</li></ul>
  <h2>Projects</h2>
  <ul><li>Calculator</li><li>Quiz game</li></ul>
</main>
<footer>© You</footer>`,
    base + 'header,footer{padding:8px 0}h1{margin-bottom:0}',
    `console.log('portfolio scaffold — replace placeholders')`
  ),
})

const capstone = paper({
  id: 'proj-capstone',
  title: 'Capstone brief',
  order: 6,
  prerequisites: ['proj-portfolio'],
  goal: 'You can write a one-page brief for a small app that helps a real person near you.',
  why: 'Capstone is a problem + constraints + milestones — not a new framework.',
  concept: 'Who, problem, artefact, milestones, out-of-scope, honest runtime.',
  analogy: 'A science-fair plan before the experiment.',
  explanation:
    'Write:\n1) Who (one person or class)\n2) Problem in two sentences\n3) Artefact (page or small flow)\n4) Four milestones\n5) Out of scope (no “AI magic”, no APK unless you truly package)\n6) How you will demo in 3 minutes\n\nYou may later build it in Lab using skills you already have.',
  example: 'Tiny brief.',
  code: `Who: Form 1 science club secretary
Problem: notices get lost
Artefact: phone-column notice page
Out of scope: push notifications, APK`,
  practice: {
    copy: 'Copy the six headings.',
    modify: 'Fill them for a real club or family need.',
    create: 'A brief with no empty heading and no live-model claim.',
  },
  mistake: '“Uber for schools with AI and blockchain” as milestone one.',
  debug: {
    broken: 'Brief lists ten platforms and zero users.',
    hint: 'One user. One artefact. Four steps.',
  },
  guidedChallenge: 'Cut the scope until a weekend could finish milestone 2.',
  independentChallenge: 'Share the brief in Community as type project.',
  quiz: [
    q('A capstone starts with…', ['A user and a problem', 'A new language only', 'Force-push'], 0, 'Problem first.'),
    q('Out of scope exists to…', ['Protect the demo', 'Hide CSS', 'Avoid HTML'], 0, 'Boundaries.'),
    q('Must the capstone include a live LLM?', ['No', 'Yes', 'Only with a key in Git'], 0, 'Optional / usually no.'),
  ],
  takeaways: ['Brief before build.', 'Small demo.', 'Skills you already have.'],
  cheatSheet: 'who · problem · artefact · milestones · out-of-scope · demo',
  youCanNow: 'Propose work like a professional beginner.',
  nextId: null,
})

export const projects = {
  id: 'projects',
  level: 7,
  title: 'Project Lab',
  blurb: 'Calculator, mock weather, quiz, tutor shell, portfolio, capstone brief.',
  status: 'NEW',
  modules: [
    {
      id: 'guided',
      title: 'Guided builds',
      goal: 'Leave with artefacts and a brief, not empty certificates.',
      lessons: [calc, weather, quizGame, bot, portfolio, capstone],
    },
  ],
}
