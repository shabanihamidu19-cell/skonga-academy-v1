import { lesson, q, labHtml } from './lessonFactory'

/**
 * LEVEL 4 — Backend Development.
 * Provenance: NEW (not recovered).
 * No Node/Python server runtime in SKONGA v1.
 * Labs only mock HTTP/JSON in the browser.
 */

const NO_SERVER =
  'SKONGA Code Lab v1 cannot start a real server, database, or auth system. You will design requests on paper and, where a lab exists, simulate JSON in the browser. Running Express/Django/Supabase is optional later on your own machine — not required to complete these lessons.'

function paper(partial) {
  return lesson({
    status: 'NEW-complete',
    difficulty: 'beginner',
    estimatedMinutes: 20,
    runtime: 'none',
    runtimeNote: NO_SERVER,
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
    runtimeNote:
      'This lab runs in the browser only. It mocks a backend with JavaScript data. That is not a real server.',
    completion: { requireQuiz: true, requireLab: true },
    ...partial,
  })
}

const be01 = paper({
  id: 'be-01',
  title: 'What is a server?',
  order: 1,
  prerequisites: ['web-01', 'tools-project'],
  goal: 'You can explain a server as a program that waits for requests and sends responses.',
  why: 'A page alone cannot safely store every learner’s marks or hide secret keys.',
  concept:
    'A server is software listening on a computer (often on a port). A client (usually the browser) sends a request. The server answers with a response.',
  analogy:
    'A school office window. Students request a letter. Clerks look up records and hand a paper back.',
  explanation:
    'Your Code Lab preview is local and private to you. A backend can remember data for many users, check passwords without putting them in frontend source, and share lessons with every device.\n\n“The cloud” is still someone else’s computer running a server.',
  example: 'Two roles.',
  code: `Client (browser):  "GET /api/lessons please"
Server (program): "200 OK" + file or JSON
Client:           draws the result`,
  lineByLine: [
    { line: 'Client', text: 'Asks.' },
    { line: 'Server', text: 'Waits, works, answers.' },
    { line: 'Response', text: 'Status + body.' },
  ],
  predict: {
    prompt: 'If the server process is stopped, what does the client get?',
    answer: 'A connection error — no response body from that program.',
  },
  practice: {
    copy: 'Label three arrows: request, work, response.',
    modify: 'Rewrite the office analogy as a canteen orders window.',
    create: 'List three things a school app should NOT store only in the browser.',
  },
  mistake: 'Thinking the Wi‑Fi router is the application server.',
  debug: {
    broken: '“Code Lab is my production backend.”',
    hint: 'Lab preview is local mock/render. It is not a multi-user server.',
  },
  guidedChallenge: 'Name the client and the server when you open a public website.',
  independentChallenge: 'Why hiding an API key only in frontend JS is not hiding it.',
  quiz: [
    q('A server’s core job is to…', ['Answer requests', 'Only pick CSS colours', 'Replace HTML forever'], 0, 'Request/response.'),
    q('The browser in this picture is usually the…', ['Client', 'Database engine required', 'Git remote'], 0, 'Client asks.'),
    q('Can SKONGA v1 start Express for you?', ['No', 'Yes, inside pwd', 'Only on Fridays'], 0, 'No server runtime.'),
  ],
  takeaways: ['Client asks; server answers.', 'Servers can remember.', 'Lab ≠ production kitchen.'],
  cheatSheet: 'client → request → server → response',
  youCanNow: 'Point at the server half of a web app.',
  nextId: 'be-02',
})

const be02 = paper({
  id: 'be-02',
  title: 'HTTP request and response',
  order: 2,
  prerequisites: ['be-01'],
  goal: 'You can name the parts of an HTTP request and response at beginner level.',
  why: 'Every API lesson is this envelope with different contents.',
  concept:
    'HTTP is the agreement for how clients and servers talk on the web. A request has a method, a path, headers, and sometimes a body. A response has a status, headers, and a body.',
  analogy:
    'A posted letter: method = what you want done, path = which desk, headers = stickers, body = the letter inside.',
  explanation:
    'Request idea: GET /learn/web HTTP/1.1 plus Host header.\nResponse idea: 200 OK plus Content-Type plus body bytes.\n\nHeaders are metadata. The body is the payload.\nHTTPS is HTTP inside encryption — same shape, safer pipe.',
  example: 'A tiny GET.',
  code: `GET /api/lessons/be-01 HTTP/1.1
Host: academy.example
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json

{"id":"be-01","title":"What is a server?"}`,
  lineByLine: [
    { line: 'GET', text: 'Method — read this resource.' },
    { line: '/api/lessons/be-01', text: 'Path — which resource.' },
    { line: '200 OK', text: 'Status — success.' },
    { line: '{...}', text: 'JSON body.' },
  ],
  predict: {
    prompt: 'Which part tells the client “this worked”?',
    answer: 'The status (200 OK), not the JSON keys alone.',
  },
  practice: {
    copy: 'Write method, path, one header, status, body for a lesson fetch.',
    modify: 'Change the path to another lesson id. Keep GET.',
    create: 'Invent a request for “list all CSS lessons”.',
  },
  mistake: 'Calling the JSON keys “HTTP”. JSON is a body format inside HTTP.',
  debug: {
    broken: 'Treating the URL bar text as only a filename on your phone.',
    hint: 'The path is an address the server maps to code or a file.',
  },
  guidedChallenge: 'Mark method vs path vs body on the sample.',
  independentChallenge: 'Explain HTTPS in one sentence without claiming you implemented it.',
  quiz: [
    q('HTTP response success often starts with…', ['200', 'pwd', 'flex'], 0, '2xx success family.'),
    q('Headers are…', ['Metadata about the message', 'Always the database', 'Git commits'], 0, 'Envelope stickers.'),
    q('JSON in this sample is…', ['The body', 'The TLS certificate', 'The terminal'], 0, 'Payload.'),
  ],
  takeaways: ['Method + path + headers + body.', 'Status matters.', 'JSON rides in HTTP.'],
  cheatSheet: 'METHOD path · headers · body · status',
  youCanNow: 'Sketch one HTTP exchange.',
  nextId: 'be-03',
})

const be03 = paper({
  id: 'be-03',
  title: 'HTTP methods',
  order: 3,
  prerequisites: ['be-02'],
  goal: 'You can match GET, POST, PUT/PATCH, and DELETE to read, create, replace/update, and remove.',
  why: 'Using GET to delete data confuses teammates and caches.',
  concept:
    'GET reads. POST creates (or triggers work). PUT replaces; PATCH updates part. DELETE removes. Loading a URL in a browser is normally GET.',
  analogy:
    'Library: GET = read, POST = add a book, PATCH = correct a page, DELETE = remove from the catalogue.',
  explanation:
    'Safe beginner rules: GET should not change server data. POST bodies often carry JSON for create. Repeating GET should not create ten copies.\n\nYou will not implement these methods inside SKONGA v1.',
  example: 'Lessons collection.',
  code: `GET    /api/lessons
POST   /api/lessons          { "title": "HTTP methods" }
PATCH  /api/lessons/be-03    { "title": "HTTP methods (v2)" }
DELETE /api/lessons/be-03`,
  lineByLine: [
    { line: 'GET /api/lessons', text: 'List or read.' },
    { line: 'POST /api/lessons', text: 'Create.' },
    { line: 'PATCH .../be-03', text: 'Change some fields.' },
    { line: 'DELETE .../be-03', text: 'Remove.' },
  ],
  predict: {
    prompt: 'Should clicking a public lesson link be GET or DELETE?',
    answer: 'GET. A normal navigation should not destroy data.',
  },
  practice: {
    copy: 'Write the four methods and one verb each.',
    modify: 'Design POST body for a new community question (title + lessonId).',
    create: 'A table: school action vs method vs path.',
  },
  mistake: 'Putting secrets in a GET query string and sharing the link.',
  debug: {
    broken: 'GET /api/lessons/be-03/delete',
    hint: 'Prefer DELETE on the resource path if you control the API.',
  },
  guidedChallenge: 'Which method for “submit quiz score”?',
  independentChallenge: 'Why GET caches are useful and dangerous if GET is misused.',
  quiz: [
    q('Reading a lesson should be…', ['GET', 'DELETE', 'rm -rf'], 0, 'Read.'),
    q('Creating a new record is usually…', ['POST', 'pwd', 'h1'], 0, 'Create.'),
    q('DELETE means…', ['Remove that resource', 'Only clear CSS', 'Start Vite'], 0, 'Remove.'),
  ],
  takeaways: ['Methods are verbs.', 'GET is for read.', 'Body often rides with write methods.'],
  cheatSheet: 'GET POST PUT/PATCH DELETE',
  youCanNow: 'Pick a method for a school action.',
  nextId: 'be-04',
})

const be04 = paper({
  id: 'be-04',
  title: 'Status codes',
  order: 4,
  prerequisites: ['be-03'],
  goal: 'You can interpret 2xx, 4xx, and 5xx and name 200, 201, 400, 401, 404, 500.',
  why: '“Something went wrong” is not enough. The number tells who failed.',
  concept: '2xx = success. 4xx = client request problem. 5xx = server failed.',
  analogy:
    '200 = here is the letter. 404 = no such desk. 401 = show your pass. 400 = form unreadable. 500 = office printer died.',
  explanation:
    '200 OK. 201 Created. 400 Bad Request. 401 Unauthorized. 403 Forbidden. 404 Not Found. 500 Internal Server Error.\n\nDo not memorise fifty codes. Read the family first.',
  example: 'A missing lesson.',
  code: `GET /api/lessons/does-not-exist
HTTP/1.1 404 Not Found
{"error":"Lesson not found"}`,
  lineByLine: [
    { line: '404', text: 'Client asked for a missing id.' },
    { line: 'error field', text: 'Clue in the body.' },
  ],
  predict: {
    prompt: 'Quiz JSON is valid but the database disk is dead. 4xx or 5xx?',
    answer: '5xx — server-side failure.',
  },
  practice: {
    copy: 'Write six codes and a one-word cause each.',
    modify: 'Invent a 201 response body for a new question post.',
    create: 'A mini chart: who should fix 400 vs 500.',
  },
  mistake: 'Treating every failure as 404.',
  debug: {
    broken: 'Frontend treats an HTML error page as JSON.',
    hint: 'Check Content-Type and status before JSON.parse.',
  },
  guidedChallenge: '401 vs 403 in one sentence each.',
  independentChallenge: 'What would you show a learner for 404 vs 500?',
  quiz: [
    q('404 means…', ['Resource not found', 'Server exploded', 'Git conflict'], 0, 'Missing.'),
    q('500 means…', ['Server error', 'Wrong CSS class only', 'Always a bad password'], 0, 'Server fault family.'),
    q('201 often follows…', ['Successful create', 'ls -l', 'flex-wrap'], 0, 'Created.'),
  ],
  takeaways: ['Family first (2/4/5).', '404 ≠ 500.', 'Status + body together.'],
  cheatSheet: '200 201 · 400 401 403 404 · 500',
  youCanNow: 'Read a status without panic.',
  nextId: 'be-05',
})

const be05 = labL({
  id: 'be-05',
  title: 'JSON as a data body',
  order: 5,
  prerequisites: ['be-02', 'js-09'],
  goal: 'You can parse JSON in the browser and render one field — knowing this mock is not a server.',
  why: 'APIs speak JSON more often than they speak HTML.',
  concept:
    'JSON is text that looks like JS objects/arrays with stricter rules: double quotes on keys, no functions.',
  analogy: 'A packing list in a rigid school format so any office can read it.',
  explanation:
    'JSON.parse(text) turns text into a JS value. JSON.stringify(obj) goes the other way.\n\nIn this lab the “API” is a string in the JS pane. A real API would arrive through HTTP.',
  example: 'Parse and show a title.',
  code: `const text = '{"id":"be-05","title":"JSON"}'
const data = JSON.parse(text)
document.getElementById('out').textContent = data.title`,
  lineByLine: [
    { line: 'text', text: 'JSON is a string on the wire.' },
    { line: 'JSON.parse', text: 'Become a JS object.' },
    { line: 'data.title', text: 'Read a field after parse.' },
  ],
  predict: {
    prompt: 'What happens if you parse {id: be-05} without quotes?',
    answer: 'JSON.parse throws — that is not valid JSON.',
  },
  practice: {
    copy: 'Run the lab. Confirm the title appears.',
    modify: 'Add a "level": 4 field and show it.',
    create: 'An array of two lessons; render both titles.',
  },
  mistake: 'Forgetting that JSON keys must use double quotes.',
  debug: {
    broken: "{'title': 'JSON'}",
    hint: 'Use double quotes: {"title":"JSON"}',
  },
  guidedChallenge: 'stringify a small object and parse it back.',
  independentChallenge: 'Break the JSON, read the error, fix it.',
  quiz: [
    q('JSON on the network is…', ['Text', 'A live SQL engine', 'A CSS grid'], 0, 'Text body.'),
    q('JSON.parse turns text into…', ['A JS value', 'A Git branch', 'pwd'], 0, 'Parse.'),
    q('This lab’s backend is…', ['A mock string in JS', 'Production Postgres', 'Capacitor'], 0, 'Honest mock.'),
  ],
  takeaways: ['JSON is text.', 'parse / stringify.', 'Mock ≠ HTTP server.'],
  cheatSheet: 'JSON.parse · JSON.stringify · "keys"',
  youCanNow: 'Turn a JSON string into page text.',
  nextId: 'be-06',
  lab: labHtml(
    `<h1>JSON mock</h1>
<p id="out">…</p>
<pre id="raw"></pre>`,
    'body{font-family:system-ui,sans-serif;padding:24px}pre{background:#f4f4f5;padding:12px}',
    `const text = '{"id":"be-05","title":"JSON as a data body","level":4}'
document.getElementById('raw').textContent = text
try {
  const data = JSON.parse(text)
  document.getElementById('out').textContent = data.title
  console.log(data)
} catch (err) {
  document.getElementById('out').textContent = String(err)
  console.error(err)
}`
  ),
})

const be06 = paper({
  id: 'be-06',
  title: 'REST resources',
  order: 6,
  prerequisites: ['be-03', 'be-05'],
  goal: 'You can design resource URLs for a collection and one item, and keep verbs in the HTTP method.',
  why: 'Random paths like /getLessonDataNow.php pile up.',
  concept:
    'REST style: nouns in the path, verbs in the method. /api/lessons is a collection. /api/lessons/be-06 is one item.',
  analogy: 'The directory lists rooms (resources). What you do in the room is the verb (method).',
  explanation:
    'Prefer GET /api/lessons and GET /api/lessons/be-06 and POST /api/lessons.\nAvoid GET /api/getLessons and GET /api/deleteLesson?id=be-06.\nQuery strings filter. REST is a style, not physics.',
  example: 'SKONGA-shaped resources.',
  code: `GET  /api/courses
GET  /api/courses/web/modules/css/lessons
POST /api/progress   { "lessonId": "be-06", "completed": true }`,
  lineByLine: [
    { line: '/api/courses', text: 'Collection of courses.' },
    { line: '.../lessons', text: 'Nested collection — still nouns.' },
    { line: 'POST /api/progress', text: 'Create/update a progress record.' },
  ],
  predict: {
    prompt: 'Is /api/doCompleteLesson?id=be-06 noun-first REST style?',
    answer: 'No — the verb leaked into the path.',
  },
  practice: {
    copy: 'Write collection URL + item URL for community posts.',
    modify: 'Add a query filter for courseId=web.',
    create: 'Sketch five endpoints for a tiny quiz API.',
  },
  mistake: 'A new custom verb in every path.',
  debug: {
    broken: '/api/getFetchRetrieveAllUsersDataNow',
    hint: 'GET /api/users',
  },
  guidedChallenge: 'Map “mark lesson complete” to method + path.',
  independentChallenge: 'When is nesting too deep? Keep 2–3 levels.',
  quiz: [
    q('REST paths prefer…', ['Nouns', 'Only verbs in the path', 'rm flags'], 0, 'Resources.'),
    q('The verb belongs mainly in the…', ['HTTP method', 'CSS class name', 'Capacitor appId'], 0, 'GET/POST/…'),
    q('/api/lessons/be-06 is…', ['One item', 'A Git remote', 'A flex container'], 0, 'Item resource.'),
  ],
  takeaways: ['Nouns in paths.', 'Verbs in methods.', 'Collections vs items.'],
  cheatSheet: '/api/things · /api/things/:id',
  youCanNow: 'Sketch a tiny REST surface.',
  nextId: 'be-07',
})

const be07 = paper({
  id: 'be-07',
  title: 'Authentication ideas',
  order: 7,
  prerequisites: ['be-06'],
  goal: 'You can separate identity (who) from pages anyone may read, and know why secrets stay off the frontend.',
  why: 'SKONGA lets you Learn without an account. Saving progress across devices needs identity.',
  concept:
    'Authentication answers “who are you?”. Authorisation answers “what may you do?”.',
  analogy: 'School gate pass (authn) versus “only prefects enter the staff room” (authz).',
  explanation:
    'Public: GET lesson content. Private: POST progress, write a community post as you.\nNever ship a service-role key in frontend source.\n401 = no valid proof. 403 = proof exists but permission denied.',
  example: 'Two kinds of routes.',
  code: `GET  /api/lessons/be-07     # public content
POST /api/progress          # requires identity
Authorization: Bearer <token>`,
  lineByLine: [
    { line: 'public GET', text: 'Curriculum can be open.' },
    { line: 'POST progress', text: 'Needs a user.' },
    { line: 'Authorization header', text: 'One common way to send proof.' },
  ],
  predict: {
    prompt: 'If Learn works logged out, must GET lesson JSON require a password?',
    answer: 'Not necessarily. SKONGA keeps Learn public; persistence may need auth.',
  },
  practice: {
    copy: 'Write authn vs authz in your own words.',
    modify: 'List three SKONGA actions that should stay public vs account-only.',
    create: 'A warning: do not put the service key in browser JS.',
  },
  mistake: 'Hiding an admin button with CSS and calling it security.',
  debug: {
    broken: 'const SECRET = "super-admin" in a React file',
    hint: 'Anyone can read the bundle. Secrets belong on a server.',
  },
  guidedChallenge: '401 or 403 when a student tries to delete another student’s post while logged in?',
  independentChallenge: 'Why optional auth matches SKONGA’s architecture.',
  quiz: [
    q('Authentication asks…', ['Who are you?', 'What colour is the card?', 'What is pwd?'], 0, 'Identity.'),
    q('A secret key in frontend JS is…', ['Visible to users', 'Safe forever', 'A Git branch'], 0, 'Not secret.'),
    q('Learn-without-login is…', ['A product choice for public lessons', 'Impossible on the web', 'An APK requirement'], 0, 'SKONGA policy.'),
  ],
  takeaways: ['Who vs what you may do.', 'Public vs private routes.', 'Secrets off the client.'],
  cheatSheet: 'authn · authz · 401 · 403 · no secrets in JS',
  youCanNow: 'Sort public curriculum from account actions.',
  nextId: 'be-08',
})

const be08 = paper({
  id: 'be-08',
  title: 'Data that outlives a refresh',
  order: 8,
  prerequisites: ['be-07'],
  goal: 'You can contrast RAM, localStorage, and a remote database.',
  why: 'Zustand persist dies if the learner clears site data. That is not a school register.',
  concept:
    'Memory lasts until refresh. localStorage lasts on that browser until cleared. A database lasts across devices if the API writes it.',
  analogy: 'Scrap paper (RAM), a notebook in your bag (localStorage), the official register (database).',
  explanation:
    'SKONGA progress can live in the browser today. That is honest and limited.\nA backend database is how many learners share one source of truth.\nOwnership question: whose disk?',
  example: 'Three homes for a completed-lesson flag.',
  code: `RAM           → gone on refresh
localStorage  → this browser only
DB via API    → any device after login`,
  lineByLine: [
    { line: 'RAM', text: 'Variables in the running page.' },
    { line: 'localStorage', text: 'Key/value in the browser profile.' },
    { line: 'DB', text: 'Server-side records.' },
  ],
  predict: {
    prompt: 'You finish css-08 on a phone (local only). Will a laptop show it without an account/API?',
    answer: 'No. That completion never left the phone.',
  },
  practice: {
    copy: 'Draw the three homes and one example each.',
    modify: 'Decide where community posts should live and why.',
    create: 'A paragraph: Progress v1 vs Progress with backend.',
  },
  mistake: 'Calling localStorage “the cloud”.',
  debug: {
    broken: 'Expecting persist middleware to sync two phones automatically.',
    hint: 'Without an API + identity, each browser has its own notebook.',
  },
  guidedChallenge: 'Which home fits curriculum files shipped in the app?',
  independentChallenge: 'Name one privacy issue if progress lives on a server.',
  quiz: [
    q('localStorage belongs to…', ['That browser profile', 'Every phone automatically', 'GitHub.com always'], 0, 'Local bag.'),
    q('A shared register of marks needs…', ['A backend store + identity', 'Only CSS variables', 'pwd'], 0, 'Server data.'),
    q('Curriculum JS files in the repo are…', ['Shipped with the app', 'Created per click in Postgres first', 'rm flags'], 0, 'App content.'),
  ],
  takeaways: ['Whose disk?', 'Local ≠ multi-device.', 'DB needs an API.'],
  cheatSheet: 'RAM · localStorage · DB/API',
  youCanNow: 'Choose a home for a piece of data.',
  nextId: 'be-09',
})

const be09 = paper({
  id: 'be-09',
  title: 'Deployment — the idea',
  order: 9,
  prerequisites: ['be-01', 'npm-01'],
  goal: 'You can explain deploy as putting a build on a computer that stays reachable by a URL.',
  why: 'localhost:5173 is your desk. Learners in another house cannot see that desk.',
  concept:
    'Build turns source into files a host can serve. Deploy uploads those files (and maybe a server process).',
  analogy: 'Printing the book and placing copies in a library versus reading the draft on your bed.',
  explanation:
    'Frontend-only deploy: static files from npm run build (dist/).\nBackend deploy: a process must keep running, plus env secrets on the host.\nThis lesson does not deploy SKONGA for you.',
  example: 'Two addresses.',
  code: `Dev:   http://localhost:5173
Prod:  https://your-host.example
Build: npm run build  →  dist/`,
  lineByLine: [
    { line: 'localhost', text: 'Your machine.' },
    { line: 'build', text: 'Optimised files.' },
    { line: 'host URL', text: 'Other people can open this.' },
  ],
  predict: {
    prompt: 'You change a lesson file but do not deploy. Do visitors see it?',
    answer: 'Not on the public URL. They see the last deployed build.',
  },
  practice: {
    copy: 'Write desk vs library for localhost vs production.',
    modify: 'Add “env secrets stay on the host” to your tools runbook.',
    create: 'A 5-step deploy story: commit → build → upload → open URL → check one lesson.',
  },
  mistake: 'Calling npm run dev “production”.',
  debug: {
    broken: 'Production still shows old CSS.',
    hint: 'Old build cached, or deploy did not run after the change.',
  },
  guidedChallenge: 'What folder does Vite emit on build in this project?',
  independentChallenge: 'Why a backend needs more than a static file bucket.',
  quiz: [
    q('localhost is…', ['Your computer', 'The only possible production', 'A Git method'], 0, 'Desk.'),
    q('npm run build prepares…', ['Files to host', 'A Python iframe', 'rm of src'], 0, 'dist.'),
    q('This lesson deploys SKONGA for you?', ['No', 'Yes automatically', 'Only if CSS is purple'], 0, 'Idea only.'),
  ],
  takeaways: ['Desk vs library.', 'Build then host.', 'Secrets on the host.'],
  cheatSheet: 'dev · build · host URL · env on server',
  youCanNow: 'Describe what “we shipped it” means.',
  nextId: 'be-project',
})

const beProject = labL({
  id: 'be-project',
  title: 'Backend project — Mock lesson API',
  order: 10,
  estimatedMinutes: 35,
  prerequisites: ['be-04', 'be-05', 'be-06'],
  goal: 'You can design five endpoints on paper and render a mock collection in Code Lab from JSON.',
  why: 'Backend skill starts as a contract. Express can wait; a sloppy contract cannot.',
  concept: 'Write the API, then fake one successful GET in the browser.',
  analogy: 'Architect’s drawing before bricks. The lab is a cardboard model of one room.',
  explanation:
    'On paper specify: GET list, GET item, POST progress, statuses for missing id and bad body, which routes need auth.\nIn Code Lab, render a mock list only. Do not pretend POST hits a database.',
  example: 'List mock.',
  code: `const payload = {
  status: 200,
  body: [
    { id: "be-01", title: "What is a server?" },
    { id: "be-02", title: "HTTP request and response" }
  ]
}`,
  practice: {
    copy: 'Run the mock list. See two titles.',
    modify: 'Add a third lesson object and show HTTP 200 on the page.',
    create: 'Paper spec for five endpoints + render at least two titles from JSON.',
  },
  mistake: 'Calling fetch to localhost:3000 in this lab and declaring backend done.',
  debug: {
    broken: 'JSON array with single-quoted keys',
    hint: 'Valid JSON, then parse, then map to DOM.',
  },
  guidedChallenge: 'Write the 404 body for GET /api/lessons/nope.',
  independentChallenge: 'Share the endpoint list in Community with courseId backend.',
  quiz: [
    q('The cardboard model in Lab is…', ['A mock 200 list', 'Postgres', 'Git push'], 0, 'Mock only.'),
    q('POST /api/progress in this lab…', ['Specified on paper, not a real DB write', 'Writes production marks', 'Runs pwd'], 0, 'Honest scope.'),
    q('A missing id should document…', ['404', 'display:flex', '201 only'], 0, 'Status in the contract.'),
  ],
  takeaways: ['Contract first.', 'One mock GET in the browser.', 'Real servers later.'],
  cheatSheet: 'spec endpoints · mock GET 200 · no fake DB',
  youCanNow: 'Hand a tiny API drawing to a future implementation.',
  nextId: 'app-01',
  lab: labHtml(
    `<h1>Mock GET /api/lessons</h1>
<p id="status"></p>
<ul id="list"></ul>`,
    'body{font-family:system-ui,sans-serif;padding:24px}#status{color:#166534}',
    `const response = {
  status: 200,
  body: [
    { id: 'be-01', title: 'What is a server?' },
    { id: 'be-02', title: 'HTTP request and response' },
  ],
}
document.getElementById('status').textContent = 'HTTP ' + response.status + ' OK (mock)'
const ul = document.getElementById('list')
response.body.forEach((lessonItem) => {
  const li = document.createElement('li')
  li.textContent = lessonItem.id + ' — ' + lessonItem.title
  ul.appendChild(li)
})
console.log(JSON.stringify(response))`
  ),
})

export const backend = {
  id: 'backend',
  level: 4,
  title: 'Backend Development',
  blurb: 'HTTP, REST, JSON, auth ideas, data homes, deploy ideas — no fake Node runtime.',
  status: 'NEW',
  modules: [
    {
      id: 'http',
      title: 'HTTP & REST',
      goal: 'Speak request/response without running a server.',
      lessons: [be01, be02, be03, be04, be05, be06],
    },
    {
      id: 'data-auth',
      title: 'Data, auth, deploy',
      goal: 'Know where data and secrets belong.',
      lessons: [be07, be08, be09, beProject],
    },
  ],
}
