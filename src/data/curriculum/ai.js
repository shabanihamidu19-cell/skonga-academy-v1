import { lesson, q, labHtml } from './lessonFactory'

/**
 * LEVEL 6 — AI Development. Provenance: NEW.
 * No model runtime in SKONGA v1. Teach specification, verification, and safe use.
 */

const NO_MODEL =
  'SKONGA v1 does not host an LLM and does not call a paid AI API from Code Lab. You will write prompts, evaluate answers, and build UI that could later send a prompt. Completing a lesson does not require a live model.'

function paper(partial) {
  return lesson({
    status: 'NEW-complete',
    difficulty: 'beginner',
    estimatedMinutes: 20,
    runtime: 'none',
    runtimeNote: NO_MODEL,
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
      'This lab is a user interface or a mock reply. It is not a live model.',
    completion: { requireQuiz: true, requireLab: true },
    ...partial,
  })
}

const ai01 = paper({
  id: 'ai-01',
  title: 'What generative AI is — and is not',
  order: 1,
  prerequisites: ['be-02'],
  goal: 'You can describe an LLM as a next-token predictor steered by a prompt, which can be wrong.',
  why: 'If it feels like magic, you will not check it. Unchecked output becomes a school bug.',
  concept:
    'You provide instructions and context. The model continues with likely text. Likely is not the same as true.',
  analogy: 'A very fast intern who has read many books but has not lived your life or sat your exam.',
  explanation:
    'Generative models produce new text, images, or code from patterns.\nThey do not reliably “look up” your private marks unless a system you built gives them that data.\nThey invent citations. They can write code that does not run.\n\nProfessional use = specify + verify + keep secrets off the prompt when possible.',
  example: 'Two layers.',
  code: `Model  = pattern machine
Prompt = specification
You    = editor and tester`,
  lineByLine: [
    { line: 'Model', text: 'Produces likely continuations.' },
    { line: 'Prompt', text: 'Steers the continuation.' },
    { line: 'You', text: 'Accept or reject.' },
  ],
  predict: {
    prompt: 'If a model states a fact about your school that you never provided, should you trust it?',
    answer: 'Not without a source you can check. It may have guessed.',
  },
  practice: {
    copy: 'Write “likely ≠ true” and one example.',
    modify: 'Turn the intern analogy into a market-seller analogy.',
    create: 'A rule for when you must verify (marks, medical, legal, code).',
  },
  mistake: 'Pasting the whole company password file into a chat to “debug faster”.',
  debug: {
    broken: 'Shipping model output straight into production.',
    hint: 'Read it. Run code. Check facts. Then ship.',
  },
  guidedChallenge: 'Name two tasks models are decent at and two they are risky at.',
  independentChallenge: 'Why SKONGA still teaches you to code.',
  quiz: [
    q('A prompt is…', ['Instructions that steer the model', 'A GitHub password', 'A CSS selector'], 0, 'Specification.'),
    q('Likely text is always true?', ['No', 'Yes', 'Only on Tuesdays'], 0, 'Verify.'),
    q('Does this lesson call a live model?', ['No', 'Yes, secretly', 'Only in Python Lab'], 0, 'No model runtime.'),
  ],
  takeaways: ['Specify.', 'Verify.', 'Not magic.'],
  cheatSheet: 'prompt → likely text → you check',
  youCanNow: 'Talk about models without worship or panic.',
  nextId: 'ai-02',
})

const ai02 = paper({
  id: 'ai-02',
  title: 'Prompt craft',
  order: 2,
  prerequisites: ['ai-01'],
  goal: 'You can write a prompt with role, task, constraints, and an example.',
  why: '“Explain code” produces mush. “Explain this loop to Form 1 in five lines, no jargon” is work.',
  concept:
    'A useful prompt names who the model should act as, what to produce, limits (length, language, forbidden moves), and a sample of good output when you can.',
  analogy: 'A practical exam rubric beats “do well”.',
  explanation:
    'Role: You are a patient tutor for Form 1.\nTask: Explain what a variable is.\nConstraints: Kiswahili or simple English. Max 6 sentences. No new jargon without a definition.\nExample: Compare a variable to a labelled school bag.\n\nThen paste the code or paragraph you want discussed.\n\nSystem vs user is a common API split: standing orders vs this question. Same idea on paper.',
  example: 'A tight pair.',
  code: `Role: Form 1 Python tutor
Task: Explain this line
Constraints: 5 sentences, one analogy
Input: name = "Asha"`,
  lineByLine: [
    { line: 'Role', text: 'Voice and level.' },
    { line: 'Task', text: 'The deliverable.' },
    { line: 'Constraints', text: 'What not to do / how long.' },
    { line: 'Input', text: 'The artefact under discussion.' },
  ],
  predict: {
    prompt: 'Which prompt is better: “Fix this” or “Find the missing quote and explain the error”?',
    answer: 'The second — it names the job.',
  },
  practice: {
    copy: 'Copy the four-part template.',
    modify: 'Write a prompt that reviews your profile card CSS.',
    create: 'A prompt that refuses to invent file names you did not provide.',
  },
  mistake: 'One-word prompts for multi-step work.',
  debug: {
    broken: '“Make it better.”',
    hint: 'Better how? Faster, clearer, shorter, more correct?',
  },
  guidedChallenge: 'Add a constraint: “Quote my code; do not invent new files.”',
  independentChallenge: 'Write a grading rubric the model must follow.',
  quiz: [
    q('Constraints exist to…', ['Limit and shape the answer', 'Train Git', 'Replace HTML'], 0, 'Guardrails.'),
    q('Role sets…', ['Level and voice', 'The HTTP status', 'The APK name'], 0, 'Who speaks.'),
    q('Examples in a prompt…', ['Show the shape you want', 'Are illegal', 'Start a server'], 0, 'Few-shot idea.'),
  ],
  takeaways: ['Role + task + limits + input.', 'Vague in, vague out.', 'You still edit.'],
  cheatSheet: 'role · task · constraints · example · input',
  youCanNow: 'Write a specification, not a wish.',
  nextId: 'ai-03',
})

const ai03 = paper({
  id: 'ai-03',
  title: 'AI APIs vs chatting on a website',
  order: 3,
  prerequisites: ['ai-02', 'be-03'],
  goal: 'You can contrast a chat website with an API call: method, URL, JSON body, secret key.',
  why: 'Product features need APIs. Browser chat tabs do not ship inside your quiz page by themselves.',
  concept:
    'A hosted chat UI is for humans. An API is for programs: POST JSON, receive JSON. Keys authenticate the program, not the learner’s SKONGA password.',
  analogy: 'Talking to a clerk at the window versus sending a filled form the office software can read.',
  explanation:
    'Typical shape:\nPOST /v1/chat\nAuthorization: Bearer <secret>\n{ "messages": [ { "role": "user", "content": "..." } ] }\n\nThe secret belongs on a server. A frontend-only key will leak.\n\nSKONGA will not put a real key in this repo. You may design the request on paper.',
  example: 'Envelope.',
  code: `POST /v1/chat
Authorization: Bearer <server-secret>
Content-Type: application/json

{"messages":[{"role":"user","content":"Explain a variable"}]}`,
  lineByLine: [
    { line: 'POST', text: 'Create a completion request.' },
    { line: 'Bearer', text: 'Proof the server is allowed to spend quota.' },
    { line: 'messages', text: 'The prompt as structured data.' },
  ],
  predict: {
    prompt: 'If the key is in frontend JS, who can see it?',
    answer: 'Anyone who opens the shipped bundle or network tab.',
  },
  practice: {
    copy: 'Map chat-website vs API on two columns.',
    modify: 'Write a 401 vs 429 guess (unauthorized vs too many requests) in your notes.',
    create: 'A sequence: browser → your backend → model vendor → back.',
  },
  mistake: 'Pasting an API key into a GitHub README.',
  debug: {
    broken: 'Frontend fetch directly to a vendor with a secret in VITE_.',
    hint: 'VITE_ values are public. Put vendor keys on a server.',
  },
  guidedChallenge: 'Which SKONGA machine should hold the vendor key?',
  independentChallenge: 'Why a mock reply is acceptable in class without a vendor account.',
  quiz: [
    q('An AI API is mainly…', ['HTTP + JSON + a key', 'A CSS theme', 'pwd'], 0, 'Program interface.'),
    q('Vendor keys belong…', ['On a server', 'In the lesson HTML', 'In Community posts'], 0, 'Secrets off client.'),
    q('Chat websites replace APIs for your product?', ['No, products need a programmable interface', 'Yes always', 'Only with flexbox'], 0, 'UI ≠ API.'),
  ],
  takeaways: ['Chat UI ≠ API.', 'POST JSON.', 'Keys on the server.'],
  cheatSheet: 'POST /chat · messages[] · secret on server',
  youCanNow: 'Sketch an AI request without sending one.',
  nextId: 'ai-04',
})

const ai04 = paper({
  id: 'ai-04',
  title: 'RAG in one picture',
  order: 4,
  prerequisites: ['ai-03', 'be-05'],
  goal: 'You can explain RAG as “retrieve trusted notes, then ask the model to answer using those notes”.',
  why: 'Models invent curriculum. A school should answer from its own lessons when it can.',
  concept:
    'Retrieval-Augmented Generation: search your documents first, stuff the relevant passages into the prompt, then generate. The model is still fallible; the notes are the source of truth.',
  analogy: 'An intern may speak only after you put the official handout on their desk.',
  explanation:
    'Without RAG: “What does SKONGA say about padding?” → guess.\nWith RAG: find the box-model lesson text → prompt: “Answer using only this excerpt…”\n\nYou need searchable notes (even a simple keyword search at beginner level) and a prompt that forbids extra facts.\n\nThis lesson does not build a vector database.',
  example: 'Pipeline.',
  code: `1. User question
2. Find excerpt from curriculum
3. Prompt = question + excerpt + "use only this"
4. Model draft
5. You / the app show excerpt + draft`,
  lineByLine: [
    { line: 'Find excerpt', text: 'Retrieval.' },
    { line: 'use only this', text: 'Constraint against invention.' },
    { line: 'show excerpt', text: 'Let the learner see the source.' },
  ],
  predict: {
    prompt: 'If retrieval returns the wrong lesson, can the answer still look confident?',
    answer: 'Yes. Garbage in, confident garbage out. Check the excerpt.',
  },
  practice: {
    copy: 'Draw the five steps.',
    modify: 'Write the constraint sentence you would add to the prompt.',
    create: 'Pick a SKONGA lesson and write a 3-line excerpt you would retrieve for “what is padding?”',
  },
  mistake: 'Calling any chatbot “RAG” because it sounds advanced.',
  debug: {
    broken: 'Prompt has no excerpt but claims “according to our curriculum”.',
    hint: 'If you did not retrieve, you must not cite.',
  },
  guidedChallenge: 'Why show the excerpt to the learner?',
  independentChallenge: 'Keyword search vs “embeddings” — you only need the idea that search exists.',
  quiz: [
    q('RAG adds…', ['Your documents into the prompt', 'A random APK', 'rm -rf'], 0, 'Retrieve then generate.'),
    q('The source of truth should be…', ['The retrieved notes', 'Whatever sounds likely', 'The CSS theme'], 0, 'Notes first.'),
    q('This lesson stands up a vector DB?', ['No', 'Yes', 'Only in Code Lab Python'], 0, 'Picture only.'),
  ],
  takeaways: ['Retrieve, then generate.', 'Cite the excerpt.', 'Wrong retrieval still looks fluent.'],
  cheatSheet: 'search notes → prompt with excerpt → draft → verify',
  youCanNow: 'Describe a school-safe AI pattern.',
  nextId: 'ai-05',
})

const ai05 = labL({
  id: 'ai-05',
  title: 'A tutor UI with a mock reply',
  order: 5,
  prerequisites: ['ai-02', 'js-11'],
  goal: 'You can build a small prompt box that shows a canned tutor reply — clearly labelled as a mock.',
  why: 'UI skill is separate from model skill. Ship the form before you spend on an API.',
  concept: 'Input, submit, output region. The reply function returns a fixed helpful string so the page works offline.',
  analogy: 'Rehearsing a play with a script before the guest actor arrives.',
  explanation:
    'On submit: read the textarea, append the user line, append a mock tutor line that reminds the learner to verify.\nDo not hide the word mock.\nLater you can replace mockReply() with fetch to your backend.',
  example: 'Swap point.',
  code: `function mockReply(q) {
  return 'Mock tutor: I received "' + q + '". Check your lesson notes; I am not a live model.'
}`,
  lineByLine: [
    { line: 'mockReply', text: 'Stand-in for an API.' },
    { line: 'append both lines', text: 'Visible history.' },
  ],
  predict: {
    prompt: 'Does a convincing paragraph from mockReply mean an LLM ran?',
    answer: 'No. It is a function you wrote.',
  },
  practice: {
    copy: 'Run. Send one question. Read the mock label.',
    modify: 'Change the mock sentence. Keep the word Mock.',
    create: 'Disable send when the box is empty.',
  },
  mistake: 'Branding the button “GPT-5” while returning a hardcoded string.',
  debug: {
    broken: 'Empty submit adds blank bubbles.',
    hint: 'If (!text) return.',
  },
  guidedChallenge: 'Log the question to the console as if sending to a server.',
  independentChallenge: 'Add a second canned reply when the question contains “padding”.',
  quiz: [
    q('This lab runs a vendor model?', ['No', 'Yes', 'Only on push'], 0, 'Mock.'),
    q('The UI must…', ['Show user text and a reply region', 'Hide all output', 'Call rm'], 0, 'Form + history.'),
    q('Replacing mockReply later…', ['Is a backend/API job', 'Requires an APK first', 'Needs Python in the iframe'], 0, 'Swap the function.'),
  ],
  takeaways: ['UI first.', 'Label mocks.', 'Swap later.'],
  cheatSheet: 'textarea · submit · mockReply · history',
  youCanNow: 'Ship an honest tutor shell.',
  nextId: 'ai-project',
  lab: labHtml(
    `<h1>Mock tutor</h1>
<div id="log"></div>
<textarea id="q" rows="3" placeholder="Ask about a lesson..."></textarea>
<button type="button" id="send">Send</button>
<p class="note">Replies are mocked. No model is running.</p>`,
    `body{font-family:system-ui,sans-serif;padding:24px;max-width:28rem}
#log{min-height:8rem;border:1px solid #ddd;padding:12px;margin-bottom:12px}
textarea,button{display:block;width:100%;margin:8px 0;padding:8px}
.note{color:#666;font-size:13px}
.user{font-weight:700}
.mock{color:#5b21b6}`,
    `function mockReply(text) {
  return 'Mock tutor: I received "' + text + '". Check your SKONGA notes; I am not a live model.'
}
const log = document.getElementById('log')
document.getElementById('send').addEventListener('click', () => {
  const box = document.getElementById('q')
  const text = box.value.trim()
  if (!text) return
  log.innerHTML += '<p class="user">You: ' + text + '</p>'
  log.innerHTML += '<p class="mock">' + mockReply(text) + '</p>'
  box.value = ''
})`
  ),
})

const aiProject = paper({
  id: 'ai-project',
  title: 'AI project — Prompt + policy sheet',
  order: 6,
  estimatedMinutes: 30,
  prerequisites: ['ai-02', 'ai-04', 'ai-05'],
  goal: 'You can deliver a one-page spec: audience, prompt template, retrieval rule, and what you will never send to a model.',
  why: 'Professional AI work is policy plus prompts, not a screenshot of a chat tab.',
  concept: 'Write the operating rules for a school tutor that does not exist in production yet.',
  analogy: 'Lab safety sheet before the chemicals arrive.',
  explanation:
    'Your sheet must include:\n1) Audience (e.g. Form 1)\n2) Prompt template (role/task/constraints)\n3) Retrieval rule (which notes count as truth)\n4) Forbidden inputs (secrets, other students’ data)\n5) Verification step (how a learner checks the answer)\n6) Honest status: mock UI only in SKONGA v1\n\nQuiz completes the lesson. No live model.',
  example: 'Headings only.',
  code: `Audience:
Template:
Retrieve:
Never send:
Verify:
Status: mock`,
  practice: {
    copy: 'Copy the six headings.',
    modify: 'Fill them for a CSS box-model tutor.',
    create: 'A full sheet with no empty heading.',
  },
  mistake: 'A sheet that only says “use ChatGPT”.',
  debug: {
    broken: 'Policy allows pasting .env files “just once”.',
    hint: 'Never. Put that in the Never send list.',
  },
  guidedChallenge: 'Add a line: if retrieval fails, say “I do not have that lesson excerpt.”',
  independentChallenge: 'Share the sheet idea in Community with courseId ai (no secrets).',
  quiz: [
    q('A professional AI lesson artefact is…', ['A spec + policy', 'A hidden API key', 'An APK'], 0, 'Rules first.'),
    q('Other students’ marks in a prompt are…', ['Forbidden without a designed system', 'Fine always', 'Required'], 0, 'Privacy.'),
    q('SKONGA v1 AI runtime is…', ['None / mock UI', 'Full RAG production', 'Python in Lab'], 0, 'Honest.'),
  ],
  takeaways: ['Write the rules.', 'Protect data.', 'Mocks are allowed if labelled.'],
  cheatSheet: 'audience · template · retrieve · never · verify · mock',
  youCanNow: 'Leave LEVEL 6 with a spec, not a myth.',
  nextId: 'proj-calculator',
})

export const ai = {
  id: 'ai',
  level: 6,
  title: 'AI Development',
  blurb: 'Specify, retrieve, verify. No live model in v1 — and no fake one.',
  status: 'NEW',
  modules: [
    {
      id: 'ai-foundations',
      title: 'AI Foundations',
      goal: 'Treat AI as a tool you specify and check.',
      lessons: [ai01, ai02, ai03, ai04, ai05, aiProject],
    },
  ],
}
