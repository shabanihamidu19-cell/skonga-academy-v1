import { lesson, q, labHtml } from './lessonFactory'

/**
 * Block-based bridge — NEW.
 * Research: reduce syntax load before text Python (Scratch-style thinking).
 * SKONGA cannot host Scratch; we teach the same constructs with paper + one visual lab.
 */

const NOTE =
  'This bridge uses paper and a simple browser “block strip” lab. It is not Scratch. The goal is sequence / selection / iteration without Python syntax stress.'

function paper(partial) {
  return lesson({
    status: 'NEW-complete',
    difficulty: 'beginner',
    estimatedMinutes: 18,
    runtime: 'none',
    runtimeNote: NOTE,
    lab: null,
    completion: { requireQuiz: true, requireLab: false },
    ...partial,
  })
}

function labL(partial) {
  return lesson({
    status: 'NEW-complete',
    difficulty: 'beginner',
    estimatedMinutes: 22,
    runtime: 'html-css-js',
    runtimeNote: 'A visual strip of steps — still not a real Scratch VM.',
    completion: { requireQuiz: true, requireLab: true },
    ...partial,
  })
}

const blk01 = paper({
  id: 'blk-01',
  title: 'Blocks before text',
  order: 1,
  prerequisites: ['found-04'],
  goal: 'You can explain why beginners often start with blocks: ideas first, punctuation later.',
  why: 'Typing quotes, colons, and indents while learning “what is a loop” overloads the brain.',
  concept:
    'A block is a puzzle piece that means an action or a control structure. Snapping blocks builds a program without typing syntax.',
  analogy: 'LEGO instructions before writing a novel about building.',
  explanation:
    'Tools like Scratch show motion, looks, and control as coloured blocks.\nSKONGA’s bridge uses the same three ideas you will meet in Python:\n- Sequence: one block under another\n- Selection: an if-shaped block with a true path\n- Iteration: a repeat block around a body\n\nYou will not install Scratch here. You will think in blocks, then spell the same ideas in Python.',
  subgoals: [
    'Name sequence, selection, iteration',
    'Say why syntax can wait',
    'Map one everyday task to ordered blocks',
  ],
  code: `[ when start ]
  [ say Habari ]
  [ wait 1 second ]
  [ say SKONGA ]`,
  predict: {
    prompt: 'If the middle wait block is removed, what changes?',
    answer: 'Both messages appear with no pause between them.',
  },
  investigate: {
    prompt: 'Look at the three-block stack above.',
    questions: [
      'Which idea is pure sequence?',
      'Where would you put a “repeat 3 times” wrapper?',
      'What would an “if score > 10” diamond control?',
    ],
    reveal: 'Top-to-bottom is sequence. Repeat wraps the body. If chooses a path.',
  },
  practice: {
    copy: 'Redraw the three blocks on paper.',
    modify: 'Add a fourth block: say your name.',
    create: 'Blocks for: walk to door, if locked then knock, else open.',
  },
  mistake: 'Thinking blocks are “not real programming”.',
  debug: {
    broken: 'Skipping sequence and jumping to text syntax on day one.',
    hint: 'Master the three ideas; spelling comes next.',
  },
  tests: [
    { input: 'two say blocks in order', expected: 'second message after first' },
  ],
  quiz: [
    q('Blocks mainly reduce…', ['Syntax load while learning ideas', 'Need for algorithms', 'Need for thinking'], 0, 'Ideas first.'),
    q('One under another is…', ['Sequence', 'Only CSS', 'HTTP'], 0, 'Order.'),
    q('This module runs Scratch?', ['No', 'Yes fully', 'Only offline APK'], 0, 'Bridge only.'),
  ],
  takeaways: ['Ideas ≠ punctuation.', 'Three constructs.', 'Text comes after.'],
  cheatSheet: 'sequence · selection · iteration · then text',
  youCanNow: 'Treat blocks as real algorithms.',
  nextId: 'blk-02',
})

const blk02 = paper({
  id: 'blk-02',
  title: 'Snap selection and repeat',
  order: 2,
  prerequisites: ['blk-01'],
  goal: 'You can draw an if-block and a repeat-block for a school scenario.',
  why: 'Selection and iteration are the same ideas in Scratch and in Python.',
  concept:
    'If-block: test, then path A (and maybe else). Repeat-block: do the body a fixed number of times or until a condition.',
  analogy: 'Traffic light (if) and clapping three times (repeat).',
  explanation:
    'Example — late to class:\n[ if clock > 8:00 ]\n  [ say Run ]\nelse\n  [ say Walk ]\n\nExample — practice:\n[ repeat 5 ]\n  [ say Push-up ]\n\nWhen you reach Python, if/else and for/while are the text spelling of these shapes.',
  subgoals: [
    'Draw one if/else on paper',
    'Draw one repeat-N',
    'Label the condition in words',
  ],
  code: `[ if score >= 10 ]
  [ say Pass ]
else
  [ say Try again ]

[ repeat 3 ]
  [ say Karibu ]`,
  predict: {
    prompt: 'Repeat 3 around “Karibu” — how many times is Karibu said?',
    answer: 'Three.',
  },
  parsons: {
    prompt: 'Order blocks for: check pass, else encourage.',
    lines: [
      '[ say Try again ]',
      '[ if score >= 10 ]',
      '[ say Pass ]',
      'else',
    ],
    ordered: [
      '[ if score >= 10 ]',
      '[ say Pass ]',
      'else',
      '[ say Try again ]',
    ],
  },
  tests: [
    { input: 'score 12 on the if design', expected: 'Pass path' },
    { input: 'score 5', expected: 'Try again path' },
  ],
  practice: {
    copy: 'Copy both diagrams.',
    modify: 'Change pass mark to 8.',
    create: 'Repeat until bag is empty — describe the stop rule.',
  },
  mistake: 'Drawing repeat without a stop idea.',
  debug: {
    broken: 'if without a clear true/false test',
    hint: 'Write the condition in a full sentence first.',
  },
  quiz: [
    q('if needs…', ['A true/false test', 'Only print', 'A Git remote'], 0, 'Condition.'),
    q('repeat 5 runs the body…', ['Five times', 'Once', 'Forever always'], 0, 'Fixed count.'),
    q('Python if is…', ['Text spelling of the same idea', 'Unrelated', 'Only for CSS'], 0, 'Same construct.'),
  ],
  takeaways: ['If chooses.', 'Repeat multiplies.', 'Same in text later.'],
  cheatSheet: 'if / else · repeat N · until',
  youCanNow: 'Design control without typing Python.',
  nextId: 'blk-03',
})

const blk03 = labL({
  id: 'blk-03',
  title: 'Block strip lab',
  order: 3,
  prerequisites: ['blk-02'],
  goal: 'You can rearrange on-screen step cards into a working order and run a tiny demo.',
  why: 'Parson-style ordering plus a visible result links thinking to feedback.',
  concept: 'Each card is a step. Order matters. The lab runs a simple JS sequence when order is correct.',
  analogy: 'Putting recipe cards in the right order before cooking.',
  explanation:
    'Drag is not required — use Up/Down if the UI offers buttons, or follow the Parson’s control on the lesson page.\nIn Code Lab, pressing Run shows messages in order from the list in the JS pane.\nShuffle the array order and watch the story break; fix the order.',
  subgoals: [
    'Run the starter order',
    'Break the order on purpose',
    'Restore a sensible sequence',
  ],
  code: `const steps = ['Open book', 'Read line', 'Close book']
steps.forEach(s => log(s))`,
  predict: {
    prompt: 'If “Close book” is first, is the story still sensible?',
    answer: 'No — order encodes meaning.',
  },
  investigate: {
    prompt: 'Read the forEach over steps.',
    questions: [
      'What decides the order of messages?',
      'Is this selection or sequence?',
      'How would you repeat the whole list twice?',
    ],
    reveal: 'Array order = sequence. Looping the array twice = iteration around the sequence.',
  },
  parsons: {
    prompt: 'Order the morning routine.',
    lines: [
      'Go to school',
      'Wake up',
      'Pack bag',
    ],
    ordered: ['Wake up', 'Pack bag', 'Go to school'],
  },
  tests: [
    { input: 'starter order', expected: 'Open book → Read line → Close book' },
  ],
  practice: {
    copy: 'Run Lab; read the three lines.',
    modify: 'Add a fourth step string and Run.',
    create: 'A five-step evening routine in the array.',
  },
  mistake: 'Changing CSS and thinking the algorithm changed.',
  debug: {
    broken: 'steps in random order',
    hint: 'Sequence is the list order — fix the array.',
  },
  quiz: [
    q('The array order is…', ['The sequence', 'HTTP status', 'A secret key'], 0, 'Order.'),
    q('forEach here provides…', ['Walking each step', 'A database', 'Git merge'], 0, 'Iteration over list.'),
    q('This lab is Scratch?', ['No — simple JS demo', 'Yes', 'Only Python'], 0, 'Bridge demo.'),
  ],
  takeaways: ['Order is meaning.', 'Lists can hold steps.', 'Ready for text.'],
  cheatSheet: 'steps[] · forEach · order matters',
  youCanNow: 'Move to Python spelling of the same ideas.',
  nextId: 'blk-04',
  lab: labHtml(
    `<h1>Block strip</h1>
<ol id="out"></ol>
<p class="hint">Edit the steps array order in JS, then Run.</p>`,
    'body{font-family:system-ui,sans-serif;padding:24px}.hint{color:#666;font-size:13px}li{padding:6px 0;border-bottom:1px solid #eee}',
    `const steps = ['Open book', 'Read line', 'Close book']
const out = document.getElementById('out')
steps.forEach((s) => {
  const li = document.createElement('li')
  li.textContent = s
  out.appendChild(li)
  console.log(s)
})`
  ),
})

const blk04 = paper({
  id: 'blk-04',
  title: 'From blocks to Python lines',
  order: 4,
  prerequisites: ['blk-03'],
  goal: 'You can translate a three-block stack into three Python lines on paper.',
  why: 'The bridge only works if you connect shapes to text once.',
  concept:
    'say X → print("X"). repeat 3 → for i in range(3):. if score >= 10 → if score >= 10:.',
  analogy: 'Same sentence in two scripts: block script and alphabet script.',
  explanation:
    'Blocks:\n[ repeat 2 ]\n  [ say Karibu ]\n\nPython spelling:\nfor i in range(2):\n    print("Karibu")\n\nIndentation under the for is the “mouth” of the repeat block.\nYou still do not need Code Lab Run for Python — predict the two lines of output.',
  subgoals: [
    'Translate one sequence',
    'Translate one repeat',
    'Translate one if',
  ],
  code: `# blocks → text
for i in range(2):
    print("Karibu")

if score >= 10:
    print("Pass")
else:
    print("Try again")`,
  predict: {
    prompt: 'How many times does Karibu print?',
    answer: 'Twice.',
  },
  parsons: {
    prompt: 'Order the Python for a repeat-2 say.',
    lines: [
      '    print("Karibu")',
      'for i in range(2):',
    ],
    ordered: [
      'for i in range(2):',
      '    print("Karibu")',
    ],
  },
  tests: [
    { input: 'range(2) body print Karibu', expected: 'Karibu twice' },
  ],
  practice: {
    copy: 'Write the for-loop version by hand.',
    modify: 'Change to range(3).',
    create: 'Translate your if-pass blocks to Python if/else.',
  },
  mistake: 'Forgetting indent under for/if.',
  debug: {
    broken: 'for i in range(2):\nprint("Karibu")  # no indent',
    hint: 'Body belongs inside the loop — indent.',
  },
  investigate: {
    prompt: 'Compare the block repeat to the for line.',
    questions: [
      'What plays the role of the repeat shell?',
      'What plays the role of the inner say block?',
      'Why does range(2) match repeat 2?',
    ],
    reveal: 'for line = shell; indented print = body; range(2) yields two turns.',
  },
  quiz: [
    q('print is closest to which block idea?', ['say / show text', 'only Git', 'HTTP DELETE'], 0, 'Output.'),
    q('range(3) matches…', ['repeat about 3 times (0,1,2)', 'repeat 0 times', 'CSS grid'], 0, 'Three turns.'),
    q('Indent means…', ['This line is inside the block above', 'Delete the file', 'Deploy'], 0, 'Nesting.'),
  ],
  takeaways: ['Blocks map to lines.', 'Indent = inside.', 'Enter py-01 ready.'],
  cheatSheet: 'say→print · repeat→for · if→if',
  youCanNow: 'Start Python text without panic.',
  nextId: 'py-01',
})

export const blockLessons = [blk01, blk02, blk03, blk04]
