import { lesson, q, labHtml } from './lessonFactory'

/**
 * LEVEL 2 — JavaScript in the browser. Provenance: NEW (not recovered).
 */

const base =
  'body{font-family:system-ui,sans-serif;padding:24px;line-height:1.5;max-width:42rem;margin:0 auto;color:#111}button{padding:8px 14px;margin-top:8px}#out{margin-top:12px}'

function L(partial) {
  return lesson({
    status: 'NEW-complete',
    difficulty: 'beginner',
    estimatedMinutes: 22,
    runtime: 'html-css-js',
    completion: { requireQuiz: true, requireLab: true },
    ...partial,
  })
}

export const jsLessons = [
  L({
    id: 'js-01',
    title: 'JavaScript Foundations',
    order: 1,
    prerequisites: ['css-project'],
    goal: 'You can run a script that writes to the page and to the console after the HTML loads.',
    why: 'HTML is structure and CSS is look. JavaScript is behaviour — the page can compute after it appears.',
    concept:
      'The browser reads HTML, applies CSS, then runs JavaScript. console.log writes to the Code Lab console. textContent writes onto an element.',
    analogy:
      'The stage (HTML) and lights (CSS) are set. JavaScript is the actor who walks on and speaks.',
    explanation:
      'In Code Lab, JS lives in the JS pane. After Run, the preview executes it.\n\nStart with two proofs:\n1) console.log("SKONGA") — look at the console under the preview.\n2) document.getElementById("out").textContent = "Karibu" — look at the page.\n\nIf the console is empty, you did not Run, or the script has an error (read the red line).',
    example: 'Greet the learner on the page and in the console.',
    code: `console.log("SKONGA")
document.getElementById("out").textContent = "Karibu"`,
    lineByLine: [
      { line: 'console.log(...)', text: 'Prints a message for the programmer.' },
      { line: 'getElementById("out")', text: 'Finds the element with that id.' },
      { line: 'textContent = ...', text: 'Replaces the visible text of that element.' },
    ],
    predict: {
      prompt: 'After Run, where does "SKONGA" appear if you only console.log it?',
      answer: 'In the Code Lab console — not automatically as a heading.',
    },
    practice: {
      copy: 'Run. Confirm console + page text both change.',
      modify: 'Change Karibu to a greeting with your name.',
      create: 'Log two lines and set #out to a short sentence you invent.',
    },
    mistake: 'Expecting console.log to replace the whole website design.',
    debug: {
      broken: 'document.getElementById("out").textContent = Karibu',
      hint: 'Strings need quotes: "Karibu". Without quotes JS looks for a variable named Karibu.',
    },
    guidedChallenge: 'Log a number and a string.',
    independentChallenge: 'Page shows your name; console shows “ready”.',
    quiz: [
      q('console.log is mainly for…', ['The developer console', 'CSS colours', 'The <title> only'], 0, 'Programmer output.'),
      q('To change visible text you usually set…', ['textContent (or similar) on an element', 'The Wi‑Fi password', 'Python print in this lab'], 0, 'Talk to the DOM.'),
      q('JS runs…', ['In the browser after/with the page', 'Only on paper', 'Instead of HTML forever'], 0, 'Browser behaviour.'),
    ],
    takeaways: ['JS is behaviour.', 'Console ≠ page.', 'Run, then read errors.'],
    cheatSheet: 'console.log · getElementById · textContent',
    youCanNow: 'Prove a script ran in preview and console.',
    nextId: 'js-02',
    lab: labHtml(
      `<h1>JS Foundations</h1>
<p id="out">Ready</p>`,
      base,
      `console.log("SKONGA")
document.getElementById("out").textContent = "Karibu"`
    ),
  }),

  L({
    id: 'js-02',
    title: 'Variables',
    order: 2,
    prerequisites: ['js-01'],
    goal: 'You can store a value with const or let and use the name later.',
    why: 'Without names, you copy the same text everywhere and forget what it means.',
    concept: 'A variable is a labelled box. const cannot be reassigned. let can.',
    analogy: 'A school locker with a name on it. const is a locker you do not swap for another locker.',
    explanation:
      'const name = "Asha"\nlet streak = 3\nstreak = 4\n\nUse const by default. Switch to let when the value must change.\n\n= stores. It is not the same as == (compare), which comes with operators.',
    example: 'Name and streak on the page.',
    code: `const name = "Asha"
let streak = 3
streak = 4
document.getElementById("out").textContent = name + " · streak " + streak`,
    lineByLine: [
      { line: 'const name = "Asha"', text: 'Store a string; do not reassign name.' },
      { line: 'let streak = 3', text: 'Store a number you plan to change.' },
      { line: 'streak = 4', text: 'Replace the number in that box.' },
    ],
    predict: {
      prompt: 'What shows if you try const name = "Asha"; name = "Juma"?',
      answer: 'An error — const cannot be reassigned.',
    },
    practice: {
      copy: 'Run and read the output line.',
      modify: 'Change the name and starting streak.',
      create: 'Two consts (city, role) printed on #out.',
    },
    mistake: 'Using = when you meant “are these equal?”',
    debug: {
      broken: 'const score = 10\nscore = 11',
      hint: 'Use let score if it must change.',
    },
    guidedChallenge: 'Add let lives = 3 and decrease it to 2.',
    independentChallenge: 'Show “Asha from Dar” using two variables.',
    quiz: [
      q('const means…', ['Do not reassign this name', 'Always a colour', 'Delete the variable'], 0, 'Constant binding.'),
      q('let is for values that…', ['May change', 'Must be CSS only', 'Cannot be numbers'], 0, 'Reassignable binding.'),
      q('= in this lesson means…', ['Store', 'Compare', 'Import Python'], 0, 'Assignment.'),
    ],
    takeaways: ['Name your values.', 'const by default.', '= stores.'],
    cheatSheet: 'const name = "Asha" · let n = 1',
    youCanNow: 'Keep values in named boxes.',
    nextId: 'js-03',
    lab: labHtml(
      `<p id="out"></p>`,
      base,
      `const name = "Asha"
let streak = 3
streak = 4
document.getElementById("out").textContent = name + " · streak " + streak
console.log(name, streak)`
    ),
  }),

  L({
    id: 'js-03',
    title: 'Data types',
    order: 3,
    prerequisites: ['js-02'],
    goal: 'You can tell string, number, and boolean apart and use typeof to check.',
    why: '"7" + 1 is not the same as 7 + 1. Type mistakes look like “JS is broken”.',
    concept: 'typeof reports a type name. Strings are text in quotes. Numbers have no quotes. Booleans are true or false.',
    analogy: 'Flour, water, and salt are all “ingredients” but you do not bake them the same way.',
    explanation:
      'typeof 7 → "number"\ntypeof "7" → "string"\ntypeof true → "boolean"\n\n"7" + 1 becomes "71" because + glues strings. Number("7") + 1 becomes 8 if conversion succeeds.',
    example: 'Print types on the page.',
    code: `console.log(typeof 7)
console.log(typeof "7")
console.log("7" + 1)
console.log(Number("7") + 1)`,
    lineByLine: [
      { line: 'typeof 7', text: 'Asks the type of a number.' },
      { line: '"7" + 1', text: 'String plus anything tends to concatenate.' },
      { line: 'Number("7")', text: 'Convert text that looks like a number.' },
    ],
    predict: {
      prompt: 'What is "3" + "3"? What is 3 + 3?',
      answer: '"33" versus 6.',
    },
    practice: {
      copy: 'Run and compare the four console lines.',
      modify: 'Log typeof false and typeof "false".',
      create: 'Show both "7"+1 and Number("7")+1 on the page.',
    },
    mistake: 'Putting quotes around a number you intended to add.',
    debug: {
      broken: 'const age = "15"\nconst next = age + 1  // "151"',
      hint: 'Convert with Number(age) before adding.',
    },
    guidedChallenge: 'Store score as a number and pass as a boolean.',
    independentChallenge: 'Explain in a comment why "10" > "9" is a string trap (optional reading).',
    quiz: [
      q('typeof "7" is…', ['string', 'number', 'css'], 0, 'Quotes make a string.'),
      q('"2" + "2" is…', ['"22"', '4', 'false'], 0, 'String glue.'),
      q('true is a…', ['boolean', 'heading', 'stylesheet'], 0, 'Boolean type.'),
    ],
    takeaways: ['Quotes change type.', 'typeof is a flashlight.', 'Convert before you compute.'],
    cheatSheet: 'string · number · boolean · typeof',
    youCanNow: 'Predict a type before you run.',
    nextId: 'js-04',
    lab: labHtml(
      `<pre id="out"></pre>`,
      base,
      `const lines = [
  'typeof 7 → ' + typeof 7,
  'typeof "7" → ' + typeof "7",
  '"7" + 1 → ' + ("7" + 1),
  'Number("7") + 1 → ' + (Number("7") + 1),
]
document.getElementById("out").textContent = lines.join("\\n")
lines.forEach((l) => console.log(l))`
    ),
  }),

  L({
    id: 'js-04',
    title: 'Operators',
    order: 4,
    prerequisites: ['js-03'],
    goal: 'You can use + - * / for maths and === / !== / > for comparisons.',
    why: 'Conditions and scores need comparisons you can trust.',
    concept: 'Arithmetic operators compute. Comparison operators produce booleans. === tests equal value and type.',
    analogy: 'A calculator (+ − × ÷) plus exam ticks (true/false).',
    explanation:
      'Prefer === over == so "7" === 7 is false (different types).\n\n% is remainder: 10 % 3 is 1.\n\nComparisons: >, <, >=, <=, !==.',
    example: 'Score check.',
    code: `const score = 12
console.log(score + 3)
console.log(score >= 10)
console.log(score === "12")`,
    lineByLine: [
      { line: 'score + 3', text: 'Arithmetic.' },
      { line: 'score >= 10', text: 'Boolean comparison.' },
      { line: 'score === "12"', text: 'False — number versus string.' },
    ],
    predict: {
      prompt: 'Is 10 / 2 === 5 ?',
      answer: 'True.',
    },
    practice: {
      copy: 'Run and read the booleans.',
      modify: 'Change score until >= 10 becomes false.',
      create: 'Compute a percentage: (16 / 20) * 100 and log it.',
    },
    mistake: 'Using = inside an if instead of ===.',
    debug: {
      broken: 'if (score = 10) { ... }',
      hint: 'That assigns 10. Compare with === or >=.',
    },
    guidedChallenge: 'Log whether 7 !== "7".',
    independentChallenge: 'Show pass/fail using a comparison stored in a const.',
    quiz: [
      q('=== checks…', ['Equal value and type', 'Only CSS class', 'File names'], 0, 'Strict equality.'),
      q('>= 10 means…', ['At least 10', 'Less than 10 only', 'A colour'], 0, 'Minimum 10.'),
      q('10 % 3 is…', ['1', '30', '"103"'], 0, 'Remainder.'),
    ],
    takeaways: ['Compute vs compare.', '=== is safer than ==.', 'Booleans feed if-statements.'],
    cheatSheet: '+ - * / % · === !== > < >= <=',
    youCanNow: 'Compute and compare values.',
    nextId: 'js-05',
    lab: labHtml(
      `<p id="out"></p>`,
      base,
      `const score = 12
const lines = [
  'score + 3 = ' + (score + 3),
  'score >= 10 → ' + (score >= 10),
  'score === "12" → ' + (score === "12"),
]
document.getElementById("out").textContent = lines.join(' · ')
console.log(lines)`
    ),
  }),

  L({
    id: 'js-05',
    title: 'Conditions',
    order: 5,
    prerequisites: ['js-04'],
    goal: 'You can branch with if / else so the page shows different text for different scores.',
    why: 'Programs choose. Quizzes, logins, and games are conditions.',
    concept: 'if (test) { ... } else { ... } runs one path. The test must be boolean-ish; use comparisons.',
    analogy: 'A junction: if the bridge is open, go ahead; else take the long road.',
    explanation:
      'const score = 12\nif (score >= 10) {\n  message = "Pass"\n} else {\n  message = "Retry"\n}\n\nCurly braces keep each path clear. else if chains extra tests.',
    example: 'Pass or retry on the page.',
    code: `const score = 12
let message = "Retry"
if (score >= 10) {
  message = "Pass"
}
document.getElementById("out").textContent = message`,
    lineByLine: [
      { line: 'if (score >= 10)', text: 'Test.' },
      { line: '{ message = "Pass" }', text: 'Runs only when the test is true.' },
    ],
    predict: {
      prompt: 'If score is 8, what should #out show in the sample?',
      answer: 'Retry.',
    },
    practice: {
      copy: 'Run with 12 — expect Pass.',
      modify: 'Set score to 8 and Run.',
      create: 'Add else if (score >= 8) "Almost" before the final else.',
    },
    mistake: 'Forgetting braces and accidentally attaching the wrong line to the if.',
    debug: {
      broken: 'if score >= 10 { ... }',
      hint: 'Parentheses around the test: if (score >= 10).',
    },
    guidedChallenge: 'Three bands: A (>=16), B (>=10), C (else).',
    independentChallenge: 'Show a weather line: hot if temp >= 30 else mild.',
    quiz: [
      q('else runs when…', ['The if test is false', 'CSS fails', 'The HTML file is empty always'], 0, 'The other path.'),
      q('The test belongs in…', ['Parentheses after if', 'The CSS pane only', '<title>'], 0, 'if (test).'),
      q('Conditions need…', ['A true/false test', 'A grid always', 'A server always'], 0, 'Booleans.'),
    ],
    takeaways: ['One test, two (or more) paths.', 'Braces keep paths honest.', 'Change the input, re-run.'],
    cheatSheet: 'if (test) { ... } else { ... }',
    youCanNow: 'Choose a message from a number.',
    nextId: 'js-06',
    lab: labHtml(
      `<p id="out"></p>`,
      base,
      `const score = 12
let message = "Retry"
if (score >= 10) {
  message = "Pass"
}
document.getElementById("out").textContent = message
console.log(score, message)`
    ),
  }),

  L({
    id: 'js-06',
    title: 'Loops',
    order: 6,
    prerequisites: ['js-05'],
    goal: 'You can repeat work with a for loop and show each step.',
    why: 'Lists of skills, scores, and quiz options are loops waiting to happen.',
    concept: 'for (let i = 1; i <= 3; i++) repeats a body while the test stays true, then updates i.',
    analogy: 'Stamping 1, 2, 3 on three envelopes instead of writing three separate programs.',
    explanation:
      'Three parts in the for header: start, test, update.\n\nYou can also loop an array: for (const skill of skills) { ... }\n\nStop infinite loops: the update must move toward failing the test.',
    example: 'Count 1 to 3 on the page.',
    code: `let text = ""
for (let i = 1; i <= 3; i++) {
  text += i + " "
}
document.getElementById("out").textContent = text`,
    lineByLine: [
      { line: 'let i = 1', text: 'Start at 1.' },
      { line: 'i <= 3', text: 'Keep going while true.' },
      { line: 'i++', text: 'Add one after each round.' },
    ],
    predict: {
      prompt: 'How many times does the body run for i = 1; i <= 3; i++?',
      answer: 'Three times (1, 2, 3).',
    },
    practice: {
      copy: 'Run and see 1 2 3.',
      modify: 'Count to 5.',
      create: 'Loop an array of three skills onto the page (use for...of).',
    },
    mistake: 'Writing i + 1 without storing it (i never changes).',
    debug: {
      broken: 'for (let i = 1; i <= 3;) { text += i }',
      hint: 'Add i++ or the loop may never end / never move.',
    },
    guidedChallenge: 'Sum 1+2+3 with a loop into total.',
    independentChallenge: 'Print even numbers 2, 4, 6.',
    quiz: [
      q('A loop is for…', ['Repeating work', 'Choosing colours only', 'Naming files only'], 0, 'Repetition.'),
      q('i++ means…', ['Increase i by 1', 'Delete i', 'Compare i to CSS'], 0, 'Update.'),
      q('for...of is useful for…', ['Walking each item in a list', 'Hiding the preview', 'APK builds'], 0, 'Array walks.'),
    ],
    takeaways: ['Start, test, update.', 'Watch the counter.', 'Arrays + loops pair naturally.'],
    cheatSheet: 'for (let i = 0; i < n; i++) { ... }',
    youCanNow: 'Repeat an action a known number of times.',
    nextId: 'js-07',
    lab: labHtml(
      `<p id="out"></p>`,
      base,
      `let text = ""
for (let i = 1; i <= 3; i++) {
  text += i + " "
  console.log(i)
}
document.getElementById("out").textContent = text`
    ),
  }),

  L({
    id: 'js-07',
    title: 'Functions',
    order: 7,
    prerequisites: ['js-06'],
    goal: 'You can write a function that takes an input and returns a value you can show.',
    why: 'Copy-pasting the same three lines is how bugs multiply. Name the action once.',
    concept: 'function greet(name) { return "Hujambo " + name } — name is a parameter. "Asha" is an argument when you call greet("Asha").',
    analogy: 'A recipe: ingredients in, dish out. You can cook it more than once.',
    explanation:
      'return sends a value back to the caller. Without return, the function gives undefined.\n\nCall it: const msg = greet("Asha")\n\nKeep functions small: one job.',
    example: 'Greet helper.',
    code: `function greet(name) {
  return "Hujambo " + name
}
document.getElementById("out").textContent = greet("Asha")`,
    lineByLine: [
      { line: 'function greet(name)', text: 'Declare with one parameter.' },
      { line: 'return ...', text: 'Send the string back.' },
      { line: 'greet("Asha")', text: 'Call with an argument.' },
    ],
    predict: {
      prompt: 'What is greet("Juma")?',
      answer: 'Hujambo Juma',
    },
    practice: {
      copy: 'Run and read the greeting.',
      modify: 'Change the template to “Karibu, ” + name.',
      create: 'function pass(score) that returns "Pass" or "Retry".',
    },
    mistake: 'Forgetting return and wondering why the page shows nothing useful.',
    debug: {
      broken: 'function greet(name) { "Hujambo " + name }',
      hint: 'Add return before the string.',
    },
    guidedChallenge: 'double(n) returns n * 2. Show double(5).',
    independentChallenge: 'fullName(first, last) returns both names.',
    quiz: [
      q('A parameter is…', ['The name inside the function definition', 'A CSS colour only', 'The iframe'], 0, 'Placeholder input.'),
      q('return does…', ['Sends a value back', 'Deletes HTML', 'Opens Termux'], 0, 'Output of the function.'),
      q('Call a function with…', ['Parentheses and arguments', 'Only a semicolon in CSS', 'A table tag'], 0, 'greet("Asha").'),
    ],
    takeaways: ['Name the action.', 'return the result.', 'Call it from the page.'],
    cheatSheet: 'function name(param) { return ... }',
    youCanNow: 'Package logic you can reuse.',
    nextId: 'js-08',
    lab: labHtml(
      `<p id="out"></p>`,
      base,
      `function greet(name) {
  return "Hujambo " + name
}
const msg = greet("Asha")
document.getElementById("out").textContent = msg
console.log(msg)`
    ),
  }),

  L({
    id: 'js-08',
    title: 'Arrays',
    order: 8,
    prerequisites: ['js-07'],
    goal: 'You can store an ordered list, read an index, and push a new item.',
    why: 'Skills, scores, and quiz choices are lists.',
    concept: 'const skills = ["HTML", "CSS"] — index 0 is the first item. push adds at the end. length is how many.',
    analogy: 'A numbered queue. The first person is number 0 in JavaScript.',
    explanation:
      'skills[0] → "HTML"\nskills.push("JS")\nskills.length → 3\n\nDo not skip holes. Loop with for...of when you want each item.',
    example: 'Show skills joined as text.',
    code: `const skills = ["HTML", "CSS"]
skills.push("JS")
document.getElementById("out").textContent = skills.join(" · ")`,
    lineByLine: [
      { line: '["HTML", "CSS"]', text: 'Array literal.' },
      { line: 'push("JS")', text: 'Add to the end.' },
      { line: 'join(" · ")', text: 'Make one string for the page.' },
    ],
    predict: {
      prompt: 'After push, what is skills[2]?',
      answer: '"JS"',
    },
    practice: {
      copy: 'Run and read the joined list.',
      modify: 'Push one more skill.',
      create: 'An array of three numbers; show the first and the length.',
    },
    mistake: 'Using index 1 as the first item.',
    debug: {
      broken: 'skills[3] after only two pushes from empty — undefined',
      hint: 'Valid indexes are 0 .. length-1.',
    },
    guidedChallenge: 'Log each skill with for...of.',
    independentChallenge: 'Remove the idea of a fourth empty slot; print length honestly.',
    quiz: [
      q('First item is usually index…', ['0', '1 always', '-1 only'], 0, 'Zero-based.'),
      q('push…', ['Adds at the end', 'Deletes CSS', 'Renames the file'], 0, 'Append.'),
      q('length is…', ['How many items', 'The font size', 'A boolean only'], 0, 'Count.'),
    ],
    takeaways: ['Zero-based indexes.', 'push grows the list.', 'join is handy for the page.'],
    cheatSheet: 'arr[0] · arr.push(x) · arr.length',
    youCanNow: 'Keep an ordered collection.',
    nextId: 'js-09',
    lab: labHtml(
      `<p id="out"></p>`,
      base,
      `const skills = ["HTML", "CSS"]
skills.push("JS")
document.getElementById("out").textContent = skills.join(" · ")
console.log(skills, skills[0], skills.length)`
    ),
  }),

  L({
    id: 'js-09',
    title: 'Objects',
    order: 9,
    prerequisites: ['js-08'],
    goal: 'You can group related values with named keys and read them with dot notation.',
    why: 'A learner is not three loose variables forever — they are one record.',
    concept: 'const user = { name: "Asha", streak: 3 } — keys on the left, values on the right. user.name reads the name.',
    analogy: 'A form: each field has a label (key) and an answer (value).',
    explanation:
      'Use objects for things with several properties. Use arrays for lists of things.\n\nuser["name"] also works. Start with dot notation.\n\nYou can nest later; keep this lesson flat.',
    example: 'Show a user line.',
    code: `const user = { name: "Asha", streak: 3 }
document.getElementById("out").textContent =
  user.name + " · streak " + user.streak`,
    lineByLine: [
      { line: '{ name: "Asha" }', text: 'Object literal with a string property.' },
      { line: 'user.name', text: 'Read the name key.' },
    ],
    predict: {
      prompt: 'What is user.streak?',
      answer: '3',
    },
    practice: {
      copy: 'Run the profile line.',
      modify: 'Add city: "Dar" and show it.',
      create: 'An object lesson { title, minutes } printed on the page.',
    },
    mistake: 'Writing user[name] without quotes when you meant the key "name" as a string — or mixing arrays and objects randomly.',
    debug: {
      broken: 'user = name: "Asha", streak: 3',
      hint: 'Wrap properties in { } and separate with commas.',
    },
    guidedChallenge: 'Update user.streak = 4 and show the new value.',
    independentChallenge: 'Two users in an array; show the first user’s name.',
    quiz: [
      q('Object values are labelled by…', ['Keys', 'Only indexes 0,1,2', 'CSS ids required'], 0, 'Named keys.'),
      q('user.name reads…', ['The name property', 'The whole CSS file', 'The iframe URL'], 0, 'Dot access.'),
      q('Prefer objects when…', ['One thing has several named fields', 'You only need 1,2,3 counting', 'You hide HTML'], 0, 'Records.'),
    ],
    takeaways: ['Keys + values.', 'Dot to read.', 'Array = list; object = record.'],
    cheatSheet: 'const user = { name, streak } · user.name',
    youCanNow: 'Model one learner as an object.',
    nextId: 'js-10',
    lab: labHtml(
      `<p id="out"></p>`,
      base,
      `const user = { name: "Asha", streak: 3 }
document.getElementById("out").textContent = user.name + " · streak " + user.streak
console.log(user)`
    ),
  }),

  L({
    id: 'js-10',
    title: 'The DOM',
    order: 10,
    prerequisites: ['js-09'],
    goal: 'You can select an element and change its text or class after the page loads.',
    why: 'This is how buttons, quizzes, and live scores exist. JS talks to the document.',
    concept:
      'The DOM is the browser’s live tree of the page. querySelector finds a node. textContent and classList change it.',
    analogy: 'A labelled seating chart of the page. You find a seat, then change the sign on it.',
    explanation:
      'document.querySelector("#out") finds the first match.\nquerySelectorAll finds many.\n\nNever assume the node exists — if you mistype the id, you get null and .textContent will throw.\n\nclassList.add("ok") lets CSS take over the look.',
    example: 'Rewrite a heading.',
    code: `const el = document.querySelector("#out")
el.textContent = "Changed"
el.classList.add("ok")`,
    lineByLine: [
      { line: 'querySelector("#out")', text: 'CSS-style selector to find a node.' },
      { line: 'textContent =', text: 'Change visible text.' },
      { line: 'classList.add', text: 'Attach a CSS class.' },
    ],
    predict: {
      prompt: 'What happens if #out is missing?',
      answer: 'querySelector returns null. Reading .textContent throws — check the console.',
    },
    practice: {
      copy: 'Run and see Changed + green style.',
      modify: 'Select h1 and change its text too.',
      create: 'Add a second paragraph and fill it via JS only.',
    },
    mistake: 'Running JS before the element exists (in Code Lab panes this is usually OK if HTML includes the id).',
    debug: {
      broken: 'document.querySelector("out").textContent = "Hi"',
      hint: 'Ids need #: querySelector("#out").',
    },
    guidedChallenge: 'Toggle a class on the box (add "ok").',
    independentChallenge: 'Fill three elements from one object’s fields.',
    quiz: [
      q('querySelector uses…', ['A CSS-like selector', 'Only Python', 'Git clone'], 0, 'Same idea as CSS selectors.'),
      q('null from querySelector means…', ['No match', 'Success', 'Need more padding'], 0, 'Nothing found.'),
      q('classList.add connects JS to…', ['CSS classes', 'APK signing', 'SQL tables only'], 0, 'Look stays in CSS.'),
    ],
    takeaways: ['Select, then change.', '# for ids.', 'null is a real error — read it.'],
    cheatSheet: 'querySelector · textContent · classList',
    youCanNow: 'Rewrite a live element.',
    nextId: 'js-11',
    lab: labHtml(
      `<h1>DOM</h1>
<p id="out">Before</p>`,
      base + '.ok{color:#166534;font-weight:700}',
      `const el = document.querySelector("#out")
el.textContent = "Changed"
el.classList.add("ok")
console.log(el.textContent)`
    ),
  }),

  L({
    id: 'js-11',
    title: 'Events',
    order: 11,
    prerequisites: ['js-10'],
    goal: 'You can run code when a learner clicks a button.',
    why: 'Pages that only run once on load are demos. Products react to people.',
    concept: 'addEventListener("click", handler) registers a function the browser calls when that event happens.',
    analogy: 'A doorbell: wiring (listener) plus what you do when it rings (handler).',
    explanation:
      'const btn = document.querySelector("#btn")\nbtn.addEventListener("click", () => {\n  ...\n})\n\nDo not put () after the handler when you register it — that would call it immediately.\n\npreventDefault() stops a form from reloading the preview when needed.',
    example: 'Count clicks.',
    code: `let n = 0
document.querySelector("#btn").addEventListener("click", () => {
  n += 1
  document.querySelector("#out").textContent = "Clicks: " + n
})`,
    lineByLine: [
      { line: 'addEventListener("click", ...)', text: 'Subscribe to clicks.' },
      { line: '() => { ... }', text: 'Handler function.' },
      { line: 'n += 1', text: 'State that remembers between clicks.' },
    ],
    predict: {
      prompt: 'Does the handler run before the first click?',
      answer: 'No. It waits for the event.',
    },
    practice: {
      copy: 'Run, then click several times.',
      modify: 'Change the label to “Mara: ” + n.',
      create: 'A second button that resets n to 0.',
    },
    mistake: 'addEventListener("click", handler()) with extra parentheses — runs once now, not on click.',
    debug: {
      broken: 'document.querySelector("#btn").addEventListener("click", update())',
      hint: 'Pass the function, do not call it: addEventListener("click", update)',
    },
    guidedChallenge: 'Disable the button after 5 clicks.',
    independentChallenge: 'Click changes a box’s class between two states.',
    quiz: [
      q('addEventListener needs…', ['An event name and a function', 'A Python runtime', 'A table layout'], 0, 'Type + handler.'),
      q('The handler runs…', ['When the event happens', 'Only while saving APK', 'Instead of HTML'], 0, 'Event-driven.'),
      q('Click state lives in…', ['Variables you update inside the handler', 'The CSS comment only', 'The URL bar required'], 0, 'Remember in JS.'),
    ],
    takeaways: ['Listen, then react.', 'Do not call the handler when registering.', 'Clicks + DOM = interface.'],
    cheatSheet: 'element.addEventListener("click", handler)',
    youCanNow: 'Make a button do something.',
    nextId: 'web-project',
    lab: labHtml(
      `<button type="button" id="btn">Click</button>
<p id="out">Clicks: 0</p>`,
      base,
      `let n = 0
document.querySelector("#btn").addEventListener("click", () => {
  n += 1
  document.querySelector("#out").textContent = "Clicks: " + n
  console.log(n)
})`
    ),
  }),

  L({
    id: 'web-project',
    title: 'Web project — One-question quiz page',
    order: 12,
    estimatedMinutes: 40,
    prerequisites: ['js-05', 'js-10', 'js-11'],
    goal: 'You can combine HTML + CSS + JS so a learner picks an answer, clicks Check, and sees feedback.',
    why: 'This is the first full web artefact: structure, look, and behaviour in one page.',
    concept: 'Read the checked input, compare to the correct value, write the result into the DOM.',
    analogy: 'A paper quiz plus a teacher who ticks immediately.',
    explanation:
      'Requirements:\n1) One question in HTML\n2) At least two radio options with values\n3) A Check button with a click listener\n4) Feedback text that says Correct or Try again\n5) Basic CSS so the page is readable\n\nStarter already works. Your job is to change the question to one from an earlier SKONGA lesson and keep the logic correct.',
    example: 'Where does visible HTML belong?',
    code: `document.querySelector("#check").addEventListener("click", () => {
  const choice = document.querySelector("input[name='a']:checked")
  const out = document.querySelector("#result")
  if (!choice) { out.textContent = "Choose first"; return }
  out.textContent = choice.value === "body" ? "Correct" : "Try again"
})`,
    practice: {
      copy: 'Run the starter quiz and try both answers.',
      modify: 'Rewrite the question and the correct value.',
      create: 'Meet all five requirements with your own question from HTML or CSS.',
    },
    mistake: 'Comparing to the visible label text instead of input value — or forgetting :checked.',
    debug: {
      broken: 'document.querySelector("input").value',
      hint: 'Select the checked radio: input[name="a"]:checked',
    },
    guidedChallenge: 'Add a third option that is also wrong.',
    independentChallenge: 'Share the finished quiz idea in Community with courseId web.',
    quiz: [
      q('Who compares the answer?', ['JavaScript', 'Only CSS grid', 'The charger'], 0, 'JS reads and compares.'),
      q('Radio options need…', ['name + value', 'Python print', 'A backend first'], 0, 'Grouped fields with values.'),
      q('Feedback belongs…', ['In the DOM after click', 'Only in package.json', 'In Capacitor only'], 0, 'Write to the page.'),
    ],
    takeaways: ['HTML + CSS + JS together.', 'Events read forms.', 'You can ship a tiny product.'],
    cheatSheet: 'checked input → compare value → textContent',
    youCanNow: 'Build a one-question interactive page.',
    nextId: null,
    lab: labHtml(
      `<h1>Where does visible HTML belong?</h1>
<label><input type="radio" name="a" value="head"> head</label>
<label><input type="radio" name="a" value="body"> body</label>
<button type="button" id="check">Check</button>
<p id="result"></p>`,
      base + 'label{display:block;margin:8px 0}',
      `document.querySelector("#check").addEventListener("click", () => {
  const choice = document.querySelector("input[name='a']:checked")
  const out = document.querySelector("#result")
  if (!choice) {
    out.textContent = "Choose first"
    return
  }
  out.textContent = choice.value === "body" ? "Correct" : "Try again"
})`
    ),
  }),
]
