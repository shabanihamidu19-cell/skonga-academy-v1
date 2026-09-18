import { lesson, q, labHtml } from './lessonFactory'

/**
 * LEVEL 1 — Algorithms module.
 * Provenance: NEW (not recovered).
 * Thinking + tracing first. One Code Lab demo for linear search (JS), not a Python runtime.
 */

const PAPER =
  'Algorithms here are taught by writing steps and tracing them. There is no special “algorithm engine”. Python still does not run in Code Lab. One later lesson uses JavaScript only to highlight a search on screen.'

function paper(partial) {
  return lesson({
    status: 'NEW-complete',
    difficulty: 'beginner',
    estimatedMinutes: 20,
    runtime: 'none',
    runtimeNote: PAPER,
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
    runtimeNote: 'Browser demo only — the algorithm is the loop you can read, not a hidden engine.',
    completion: { requireQuiz: true, requireLab: true },
    ...partial,
  })
}

const algo01 = paper({
  id: 'algo-01',
  title: 'What is an algorithm?',
  order: 1,
  prerequisites: ['found-01'],
  goal: 'You can define an algorithm as a finite, ordered set of steps that solves a problem.',
  why: 'If “algorithm” only means “something Google uses”, you cannot design a grade calculator.',
  concept:
    'An algorithm is a clear procedure: given input, follow steps, stop, produce output. A recipe, a queue rule, and a search through a list are algorithms. A vague wish is not.',
  analogy: 'Directions to Room 12: leave the gate, turn left at the mango tree, stop at the green door. Not “find the room somehow”.',
  explanation:
    'Good beginner tests for an algorithm:\n1) Finite — it must be able to stop\n2) Ordered — step 2 after step 1\n3) Unambiguous enough that two people do the same thing\n4) Solves a stated problem\n\nCode is one way to write an algorithm. A numbered list on paper is also an algorithm. SKONGA starts on paper so language syntax does not hide the thinking.',
  example: 'Make tea (short).',
  code: `1. Boil water
2. Put tea leaves in a cup
3. Pour water
4. Wait 3 minutes
5. Stop`,
  lineByLine: [
    { line: '1–4', text: 'Ordered actions.' },
    { line: '5. Stop', text: 'Finite — we know when we are done.' },
  ],
  predict: {
    prompt: 'Is “be good at maths” an algorithm?',
    answer: 'No. It is a goal, not a finite ordered procedure.',
  },
  practice: {
    copy: 'Write the tea algorithm by hand.',
    modify: 'Add a decision: if no tea leaves, stop and report failure.',
    create: 'An algorithm for lining up five learners by first name — in words only.',
  },
  mistake: 'Calling any computer feature “the algorithm” without steps.',
  debug: {
    broken: 'Step: “Do the thing until it feels right.”',
    hint: 'Name the thing. Name the stop rule.',
  },
  guidedChallenge: 'Turn “find my pen” into 4 steps that could fail honestly.',
  independentChallenge: 'Write an algorithm a classmate can follow with their eyes closed (safe, classroom-scale).',
  quiz: [
    q('An algorithm must be able to…', ['Stop', 'Use CSS', 'Call an LLM'], 0, 'Finite.'),
    q('A wish without steps is…', ['Not an algorithm', 'A REST verb', 'A Git commit'], 0, 'Goals ≠ procedures.'),
    q('Algorithms can be written…', ['On paper or in code', 'Only in Python Lab', 'Only on GitHub'], 0, 'Thinking first.'),
  ],
  takeaways: ['Steps + stop.', 'Paper counts.', 'Code is later spelling.'],
  cheatSheet: 'input → ordered finite steps → output',
  youCanNow: 'Spot a real procedure versus a slogan.',
  nextId: 'algo-02',
})

const algo02 = paper({
  id: 'algo-02',
  title: 'Input, process, output',
  order: 2,
  prerequisites: ['algo-01'],
  goal: 'You can label the input, the process, and the output of a small problem.',
  why: 'Beginners jump into typing. Professionals name the boxes first.',
  concept:
    'Input is what you are given. Process is the work. Output is what you must produce. If any box is fuzzy, the algorithm is fuzzy.',
  analogy: 'Exam paper: questions in (input), thinking (process), answers written (output).',
  explanation:
    'Example — highest mark:\nInput: a list of numbers\nProcess: look at each, keep the largest seen\nOutput: one number\n\nExample — grade band:\nInput: one mark\nProcess: compare to 80 / 60\nOutput: A, B, or C\n\nWrong output type is a design bug: returning a speech when you needed a number.',
  example: 'IPO card.',
  code: `Problem: average of three marks
Input:  m1, m2, m3
Process: (m1+m2+m3) / 3
Output: one number`,
  lineByLine: [
    { line: 'Input', text: 'Three marks.' },
    { line: 'Process', text: 'Add, divide.' },
    { line: 'Output', text: 'The mean.' },
  ],
  predict: {
    prompt: 'IPO for “is this mark a pass if pass >= 10?” — what is the output type?',
    answer: 'A yes/no (boolean), not the mark itself.',
  },
  practice: {
    copy: 'Write IPO for the tea algorithm.',
    modify: 'Write IPO for lining up by name.',
    create: 'IPO for “count how many marks are >= 10”.',
  },
  mistake: 'Mixing process and output (“the output is I will add them”).',
  debug: {
    broken: 'Output: “the list” when the question asked for the maximum only.',
    hint: 'Re-read the problem sentence. Circle the noun you must deliver.',
  },
  guidedChallenge: 'IPO for finding whether “Asha” appears in a register.',
  independentChallenge: 'Two different processes that share the same input/output (max via scan vs sort-then-last — just name them).',
  quiz: [
    q('Input is…', ['What you are given', 'Always CSS', 'The Play Store'], 0, 'Given data.'),
    q('Output is…', ['What you must produce', 'The Wi‑Fi password', 'npm install'], 0, 'Deliverable.'),
    q('Process sits…', ['Between input and output', 'Only in Capacitor', 'In the URL bar'], 0, 'The work.'),
  ],
  takeaways: ['Name the three boxes.', 'Output has a type.', 'Fuzzy IPO → fuzzy code.'],
  cheatSheet: 'Input · Process · Output',
  youCanNow: 'Fill an IPO card before coding.',
  nextId: 'algo-03',
})

const algo03 = paper({
  id: 'algo-03',
  title: 'Sequence, selection, iteration',
  order: 3,
  prerequisites: ['algo-02', 'py-06'],
  goal: 'You can classify a step as “do in order”, “choose a path”, or “repeat”.',
  why: 'Every beginner program is these three ideas wearing a language costume.',
  concept:
    'Sequence = one step after another. Selection = if/else. Iteration = loops. Algorithms combine them.',
  analogy:
    'Walk to the office (sequence). If it is closed, go home (selection). Knock on every door on the corridor (iteration).',
  explanation:
    'Grade calculator: sequence (read mark → classify → print) plus selection (bands).\nAverage of a list: iteration (visit each mark) plus sequence (add, divide).\n\nWhen a program feels “stuck”, ask: am I missing a stop on the loop, or a missing branch?',
  example: 'Labels on a mini algorithm.',
  code: `1. Set total = 0          # sequence
2. For each mark           # iteration
     total = total + mark
3. If count is 0           # selection
     output "no marks"
   Else
     output total / count`,
  lineByLine: [
    { line: 'For each', text: 'Iteration.' },
    { line: 'If count is 0', text: 'Selection — empty list is a real case.' },
  ],
  predict: {
    prompt: '“Pour water, then wait” is mainly which of the three?',
    answer: 'Sequence.',
  },
  practice: {
    copy: 'Mark S / C / I next to each line of the sample.',
    modify: 'Add a selection: ignore marks below 0.',
    create: 'An attendance algorithm using all three ideas once each.',
  },
  mistake: 'Using a loop when there is only one value — or using no loop when there are twenty.',
  debug: {
    broken: 'A loop with no stop rule.',
    hint: 'Iteration needs a finite test. That is still an algorithm rule from lesson 1.',
  },
  guidedChallenge: 'Classify the Python grade project: where is selection?',
  independentChallenge: 'Rewrite tea-making with one selection (sugar or not).',
  quiz: [
    q('if/else is…', ['Selection', 'Only CSS', 'A remote'], 0, 'Choose a path.'),
    q('for each mark is…', ['Iteration', 'A status code', 'Deploy'], 0, 'Repeat.'),
    q('Step 1 then step 2 is…', ['Sequence', 'RAG', 'npm'], 0, 'Order.'),
  ],
  takeaways: ['Three control ideas.', 'Combine them.', 'Empty cases need selection.'],
  cheatSheet: 'sequence · selection · iteration',
  youCanNow: 'Tag the bones of a procedure.',
  nextId: 'algo-04',
})

const algo04 = paper({
  id: 'algo-04',
  title: 'Trace tables',
  order: 4,
  prerequisites: ['algo-03'],
  goal: 'You can dry-run an algorithm with a trace table: one row per step, columns for variables.',
  why: 'Guessing the output is how silent bugs survive. A table makes the machine visible.',
  concept:
    'A trace table lists the changing variables after each interesting step. You play the computer on paper.',
  analogy: 'A football scoresheet: after each goal, the numbers update. You can replay the match.',
  explanation:
    'Problem: total of [4, 1, 3]\n\nColumns: step | mark | total\nStart total = 0\nSee 4 → total 4\nSee 1 → total 5\nSee 3 → total 8\nStop. Output 8.\n\nIf the table and a later program disagree, the table is your evidence.',
  example: 'Trace.',
  code: `total = 0
for mark in [4, 1, 3]:
    total = total + mark
# trace: 0 → 4 → 5 → 8`,
  lineByLine: [
    { line: 'total = 0', text: 'Initialise — never skip this row.' },
    { line: 'total = total + mark', text: 'New row each time.' },
  ],
  predict: {
    prompt: 'After seeing 4 and 1, what is total?',
    answer: '5',
  },
  tests: [
    { input: 'total of [4,1,3]', expected: 'trace ends at 8' },
  ],
  practice: {
    copy: 'Copy the three-row trace for [4, 1, 3].',
    modify: 'Trace [10, -2]. Predict 8.',
    create: 'Trace a max algorithm on [3, 9, 4] — columns: mark, max_so_far.',
  },
  mistake: 'Updating two variables in your head and only writing the last one.',
  debug: {
    broken: 'Forgot to initialise total, first row is blank.',
    hint: 'Always write the starting value as row 0.',
  },
  guidedChallenge: 'Trace count of marks >= 10 on [9, 10, 12].',
  independentChallenge: 'Swap two numbers a=2, b=5 using a third box t. Trace a, b, t.',
  quiz: [
    q('A trace table is for…', ['Watching variables change', 'Deploying Vite', 'Styling flex'], 0, 'Dry run.'),
    q('Row 0 should usually show…', ['Initial values', 'The Play Store', 'HTTP 500'], 0, 'Start state.'),
    q('If table and code disagree…', ['You have evidence to debug', 'Delete the project', 'Add more CSS'], 0, 'Use the table.'),
  ],
  takeaways: ['Play the computer.', 'One change per row.', 'Initialise in writing.'],
  cheatSheet: 'step · variables · new values',
  youCanNow: 'Prove what an algorithm does on one example.',
  nextId: 'algo-05',
})

const algo05 = paper({
  id: 'algo-05',
  title: 'Linear search',
  order: 5,
  prerequisites: ['algo-04'],
  goal: 'You can describe linear search: look at each item in order until you find the target or the list ends.',
  why: 'Finding a name in a register is the first real search. Know it before fancy searches.',
  concept:
    'Linear search starts at the first item and walks forward. If the item equals the target, stop with found. If the list ends, stop with not found.',
  analogy: 'Checking every desk in a row until you see Asha’s bag, or you run out of desks.',
  explanation:
    'Input: list, target\nOutput: position (or “not found”)\n\nOn [“Juma”, “Asha”, “Neema”] look for “Asha”:\nDesk 0 Juma — no\nDesk 1 Asha — yes, stop. Position 1.\n\nWorst case: the target is last, or missing — you look at everyone. That cost is “length of the list” checks.',
  example: 'Pseudocode.',
  code: `for each index i in list:
    if list[i] == target:
        output i and stop
output "not found"`,
  lineByLine: [
    { line: 'for each index', text: 'Iteration from the start.' },
    { line: 'if equal', text: 'Selection — success path.' },
    { line: 'after the loop', text: 'Failure path — we finished the list.' },
  ],
  predict: {
    prompt: 'How many comparisons to find “Neema” in [Juma, Asha, Neema]?',
    answer: 'Three.',
  },
  investigate: {
    prompt: 'Read the linear-search pseudocode in this lesson.',
    questions: [
      'Where does the loop start?',
      'What happens on a match?',
      'What happens if the loop finishes with no match?',
    ],
    reveal: 'Start at first item. On match, stop with index. If finished, not found.',
  },
  parsons: {
    prompt: 'Order the idea of linear search (not Python syntax — logic steps).',
    lines: [
      'If item equals target, stop with found',
      'Look at the next item',
      'Start at the first item',
      'If no items left, report not found',
    ],
    ordered: [
      'Start at the first item',
      'If item equals target, stop with found',
      'Look at the next item',
      'If no items left, report not found',
    ],
  },
  practice: {
    copy: 'Trace search for “Asha” on the sample list.',
    modify: 'Trace search for “Ali” — show the not-found ending.',
    create: 'Write IPO + steps for “first mark below 10”.',
  },
  mistake: 'Stopping at the first item always, even when it does not match.',
  debug: {
    broken: 'After a match, the algorithm keeps walking and overwrites the answer.',
    hint: 'Stop when you find it — or record the first index and break.',
  },
  guidedChallenge: 'Why “average case” is often about half the list — intuition only, no formula required.',
  independentChallenge: 'Compare searching a pile of papers versus a labelled dictionary (preview of “better structure”).',
  quiz: [
    q('Linear search walks…', ['From the start, item by item', 'Only the last item', 'A CSS grid'], 0, 'Scan.'),
    q('If the name is missing…', ['You check every item', 'You skip the list', 'HTTP 201'], 0, 'Full scan.'),
    q('Output can be…', ['An index or not found', 'Always 200', 'A flex row'], 0, 'Found or not.'),
  ],
  takeaways: ['Scan in order.', 'Stop on hit.', 'Miss = full length.'],
  cheatSheet: 'for each item: if equal → return index else not found',
  youCanNow: 'Search a short list on paper.',
  nextId: 'algo-06',
})

const algo06 = labL({
  id: 'algo-06',
  title: 'Linear search on screen',
  order: 6,
  prerequisites: ['algo-05', 'js-06'],
  goal: 'You can watch a JS loop compare each name and highlight the match — and explain the loop in words.',
  why: 'Seeing the walk makes the trace table physical. This is still linear search, not a magic find().',
  concept: 'The lab uses a for loop and textContent. If you used names.includes, you would hide the algorithm.',
  analogy: 'A torch moving desk to desk. The torch is the index.',
  explanation:
    'Read the JS pane. The loop must visit 0, then 1, then 2.\nChange the target. Run again.\nIf you replace the loop with a built-in search, write one sentence about what you hid — then put the loop back for this lesson.',
  example: 'The walk.',
  code: `for (let i = 0; i < names.length; i++) {
  if (names[i] === target) { /* highlight */ break }
}`,
  lineByLine: [
    { line: 'i = 0', text: 'First desk.' },
    { line: 'i++', text: 'Next desk.' },
    { line: 'break', text: 'Stop after a hit.' },
  ],
  predict: {
    prompt: 'Target “Neema”. Which index should light up?',
    answer: '2 (third name).',
  },
  practice: {
    copy: 'Run. Confirm Asha highlights if she is the target.',
    modify: 'Set target to Ali. Show a “not found” line.',
    create: 'Add a fourth name and find it.',
  },
  mistake: 'Calling names.indexOf and saying you practised the algorithm.',
  debug: {
    broken: 'Loop starts at i = 1 and misses Juma.',
    hint: 'Linear search starts at 0.',
  },
  guidedChallenge: 'Log i and names[i] each round.',
  independentChallenge: 'Count comparisons in a variable and print it.',
  quiz: [
    q('The highlight should move because…', ['The loop changes i', 'CSS searched by itself', 'Git found it'], 0, 'Index walks.'),
    q('break after a hit…', ['Stops extra work', 'Deletes the list', 'Deploys'], 0, 'Finite success.'),
    q('This lab runs Python?', ['No, JavaScript preview', 'Yes', 'Only Termux inside iframe'], 0, 'JS only.'),
  ],
  takeaways: ['The loop is the algorithm.', 'Do not hide it yet.', 'Not found is a result.'],
  cheatSheet: 'for i … if names[i] === target',
  youCanNow: 'Point at the line that is the search.',
  nextId: 'algo-07',
  lab: labHtml(
    `<p>Target: <strong id="target"></strong></p>
<ol id="row"></ol>
<p id="msg"></p>`,
    'body{font-family:system-ui,sans-serif;padding:24px}li.hit{background:#ddd6fe;font-weight:700}',
    `const names = ['Juma', 'Asha', 'Neema']
const target = 'Asha'
document.getElementById('target').textContent = target
const row = document.getElementById('row')
let found = -1
for (let i = 0; i < names.length; i++) {
  const li = document.createElement('li')
  li.textContent = i + ': ' + names[i]
  if (names[i] === target && found < 0) {
    li.className = 'hit'
    found = i
  }
  row.appendChild(li)
  console.log(i, names[i])
}
document.getElementById('msg').textContent =
  found >= 0 ? ('Found at index ' + found) : 'Not found'`
  ),
})

const algo07 = paper({
  id: 'algo-07',
  title: 'Finding the maximum',
  order: 7,
  prerequisites: ['algo-04'],
  goal: 'You can trace an algorithm that keeps a running maximum while scanning a list.',
  why: '“Who scored highest?” is everyday school data. The pattern reuses linear scan.',
  concept:
    'Start with the first item as max_so_far (or a very small starter). For each next item, if it is bigger, replace max_so_far.',
  analogy: 'Walking the queue; you only remember the tallest person seen so far.',
  explanation:
    'List [3, 9, 4]\nmax = 3\nsee 9 → 9 > 3 → max = 9\nsee 4 → 4 > 9? no\nOutput 9\n\nEmpty list is a special case: there is no maximum. Say so. Do not invent 0 unless 0 is a real mark.',
  example: 'Pseudocode.',
  code: `if list is empty: output "none" and stop
max = list[0]
for each later item x:
    if x > max: max = x
output max`,
  lineByLine: [
    { line: 'max = list[0]', text: 'Need one real starting value.' },
    { line: 'if x > max', text: 'Only update on a new record.' },
  ],
  predict: {
    prompt: 'Trace max on [8, 2, 8]. What is the output? How many updates after the start?',
    answer: 'Output 8. Zero updates after start (ties do not need to change).',
  },
  tests: [
    { input: 'max of [3,9,4]', expected: '9' },
    { input: 'max of [8,2,8]', expected: '8' },
  ],
  practice: {
    copy: 'Build a trace table for [3, 9, 4].',
    modify: 'Do the same for minimum.',
    create: 'IPO + trace for “position of the maximum” (first time it appears).',
  },
  mistake: 'Initialising max to 0 when all marks could be negative — or when the list is empty.',
  debug: {
    broken: 'max starts at 0; list is [-3, -1]; output 0.',
    hint: '0 was never in the list. Start from list[0].',
  },
  guidedChallenge: 'How many comparisons for n items after the first is chosen?',
  independentChallenge: 'State why this is still “linear” like search.',
  quiz: [
    q('max_so_far updates when…', ['The new item is bigger', 'CSS loads', 'Always on every item'], 0, 'Strictly greater (or >= if you choose).'),
    q('Empty list should…', ['Be handled as no answer', 'Always print 0', 'Crash the browser on purpose'], 0, 'Special case.'),
    q('This scan visits…', ['Each item about once', 'Only item 0', 'Every CSS rule'], 0, 'Linear pass.'),
  ],
  takeaways: ['Running champion.', 'Start from a real item.', 'Empty is a case.'],
  cheatSheet: 'max = first; for each later: if bigger, replace',
  youCanNow: 'Crown a winner in one pass.',
  nextId: 'algo-08',
})

const algo08 = paper({
  id: 'algo-08',
  title: 'Counting steps (gentle efficiency)',
  order: 8,
  prerequisites: ['algo-05', 'algo-07'],
  goal: 'You can count the main comparisons in a linear scan and explain why a longer list costs more work.',
  why: '“Make it faster” is empty until you can count work on a small example.',
  concept:
    'A simple cost model: count how many times you compare two values. Linear search and max-scan do about one pass, so cost grows with the length of the list.',
  analogy: 'Checking 5 bags versus 50 bags at the gate. Same method; more bags, more checks.',
  explanation:
    'We are not doing Big-O notation as a ritual yet. We are counting.\n\nSearch missing name in 5 items → 5 comparisons.\nIn 50 items → 50.\n\nA method that sorts first “just to find one name” may do much more work on paper. You do not need a sort implementation to see that extra passes cost extra checks.\n\nFaster algorithms exist (binary search needs a sorted list). That is a later door, not this week’s homework.',
  example: 'Count out loud.',
  code: `list length n = 4
linear search miss → 4 comparisons
max scan → about 3 comparisons after taking the first item`,
  lineByLine: [
    { line: 'n = 4', text: 'Size of the input list.' },
    { line: 'comparisons', text: 'The work we chose to count.' },
  ],
  predict: {
    prompt: 'If n doubles from 10 to 20, roughly what happens to linear-search miss cost?',
    answer: 'It doubles (about 20 checks instead of 10).',
  },
  practice: {
    copy: 'Count comparisons for a miss on a list of 6.',
    modify: 'Count updates + comparisons for max on [1, 2, 3, 0].',
    create: 'A sentence: “I will not sort 200 names just to see if Asha is present — unless the list stays sorted.”',
  },
  mistake: 'Saying O(n) without being able to count n = 5 on paper.',
  debug: {
    broken: '“Computers are fast so counting is useless.”',
    hint: 'School lists grow. Habits grow. Count one example.',
  },
  guidedChallenge: 'Why binary search is not legal on an unsorted register — one sentence.',
  independentChallenge: 'Name one problem where you must look at every item (sum, max, average).',
  quiz: [
    q('A useful beginner cost is…', ['Number of comparisons', 'Colour of the button', 'APK size only'], 0, 'Count work.'),
    q('Longer list, same linear scan…', ['More work', 'Always less work', 'No work'], 0, 'Grows with n.'),
    q('Big-O slogans without a trace…', ['Are not enough here', 'Replace all lessons', 'Fix HTTP'], 0, 'Count first.'),
  ],
  takeaways: ['Count a small n.', 'Linear ≈ one pass.', 'Fancy names wait.'],
  cheatSheet: 'work ≈ how many times we compare',
  youCanNow: 'Talk about “faster” with a number attached.',
  nextId: 'algo-project',
})

const algoProject = paper({
  id: 'algo-project',
  title: 'Algorithms project — Register toolkit',
  order: 9,
  estimatedMinutes: 35,
  prerequisites: ['algo-04', 'algo-05', 'algo-07'],
  goal: 'You can write three paper algorithms for one register: search a name, find the max mark, count passes.',
  why: 'Three scans on the same data prove you own the pattern, not a single example.',
  concept: 'One input table. Three IPO cards. Three traces on the same sample rows.',
  analogy: 'One class list; three jobs the prefect might be asked to do.',
  explanation:
    'Sample register (use this or replace names):\nAsha 14, Juma 9, Neema 18, Ali 10\nPass mark = 10\n\nDeliver:\n1) Search “Neema” — trace + index\n2) Maximum mark — trace + value\n3) Count of passes — trace + count\n4) One sentence each on how many comparisons you did\n\nCode is optional (Python on paper or JS in Lab). The traces are required.',
  example: 'Data.',
  code: `rows = [
  ("Asha", 14),
  ("Juma", 9),
  ("Neema", 18),
  ("Ali", 10),
]`,
  tests: [
    { input: 'search Neema in sample', expected: 'index 2' },
    { input: 'max mark sample', expected: '18' },
    { input: 'passes >=10', expected: '3 (Asha, Neema, Ali)' },
  ],
  practice: {
    copy: 'Copy the four rows onto paper.',
    modify: 'Change Ali to 8 and redo the pass count.',
    create: 'All three algorithms + traces without looking at earlier samples first.',
  },
  mistake: 'One paragraph “I would loop” with no table.',
  debug: {
    broken: 'Max initialised at 0 and you forgot Juma’s 9 is still a valid mark but 18 wins anyway — still write the start row.',
    hint: 'Tables first. Cleverness second.',
  },
  guidedChallenge: 'What is the output of search “Maria”?',
  independentChallenge: 'Add a fourth job: average mark. IPO only.',
  quiz: [
    q('This project is complete when…', ['Three IPO+traces exist', 'An LLM writes them', 'An APK appears'], 0, 'Evidence on paper.'),
    q('Pass count is…', ['A scan with selection', 'A CSS media query', 'DELETE /api'], 0, 'Iterate + if.'),
    q('Same list, three jobs, shows…', ['Reuse of linear thinking', 'Need for a new language', 'Need for RAG'], 0, 'Pattern transfer.'),
  ],
  takeaways: ['One table, many jobs.', 'Trace is the artefact.', 'Linear scans are honest tools.'],
  cheatSheet: 'search · max · count-passes',
  youCanNow: 'Carry algorithm habits into Python, JS, and projects.',
  completion: { requireQuiz: true, requireLab: false, requireTests: true },
  nextId: 'mc-01',
})

export const algorithmLessons = [
  algo01, algo02, algo03, algo04, algo05, algo06, algo07, algo08, algoProject,
]
