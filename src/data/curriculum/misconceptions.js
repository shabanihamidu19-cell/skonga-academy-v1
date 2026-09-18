import { lesson, q } from './lessonFactory'

/**
 * Spiral review — common CS1 misconceptions.
 * Provenance: NEW. Based on well-known novice error categories (not recovered content).
 * Runtime: none. Paper/trace only.
 */

const NO =
  'This is a review module. No Code Lab Run. Trace on paper, then take the quiz.'

function L(partial) {
  return lesson({
    status: 'NEW-complete',
    difficulty: 'beginner',
    estimatedMinutes: 18,
    runtime: 'none',
    runtimeNote: NO,
    lab: null,
    completion: { requireQuiz: true, requireLab: false },
    ...partial,
  })
}

const mc01 = L({
  id: 'mc-01',
  title: 'Misconceptions — assignment vs equality',
  order: 1,
  prerequisites: ['py-06'],
  goal: 'You can separate “put in the box” (=) from “are these equal?” (== in Python / === in JS).',
  why: 'Mixing these is one of the longest-lived beginner bugs across languages.',
  concept: 'In Python, = assigns. == compares for equality and yields True/False.',
  analogy: 'Writing a name on a locker (=) versus asking “is this the same locker number?” (==).',
  explanation:
    'x = 5  → store 5 in x.\nif x == 5:  → ask whether x holds 5.\n\nIn JavaScript, beginners also confuse = with ===. Same idea: one writes, one asks.\n\nNever write if x = 5 in Python for a check — that is invalid syntax. In some languages it assigns inside the if and causes silent bugs.',
  code: `x = 5
print(x == 5)   # True
print(x == 6)   # False`,
  predict: {
    prompt: 'After x = 3; y = x; x = 4 — what is y?',
    answer: '3 (y keeps the old value unless you assign y again).',
  },
  investigate: {
    prompt: 'Read: if score = 10: print("A")  (as a mistake pattern)',
    questions: [
      'Is this valid Python for a comparison?',
      'What did the author probably mean?',
      'How do you write the comparison correctly?',
    ],
    reveal: 'Invalid in Python. Meant score == 10.',
  },
  tests: [
    { input: 'x = 2; x == 2', expected: 'True' },
    { input: 'x = 2; x = 3; x == 2', expected: 'False' },
    { input: 'a = 1; b = a; a = 9', expected: 'b is still 1' },
  ],
  practice: {
    copy: 'Write one assignment and one equality check on paper.',
    modify: 'Fix: if name = "Asha": to a real comparison.',
    create: 'Two test cases for “pass if score >= 10” using == only where needed.',
  },
  mistake: 'Reading = as algebra balance.',
  debug: {
    broken: 'if x = 5:  # Python',
    hint: 'Use == for questions. = only to store.',
  },
  parsons: {
    prompt: 'Order: store 10 in score, then print whether score equals 10.',
    lines: ['print(score == 10)', 'score = 10'],
    ordered: ['score = 10', 'print(score == 10)'],
  },
  quiz: [
    q('In Python, = mainly…', ['Stores a value', 'Always compares', 'Deletes a file'], 0, 'Assignment.'),
    q('Equality check uses…', ['==', 'Only a single =', 'display:flex'], 0, 'Compare.'),
    q('After a=1; b=a; a=2, b is…', ['1', '2', 'undefined always'], 0, 'Copy value at assignment time for ints.'),
  ],
  takeaways: ['= stores.', '== asks.', 'Trace both.'],
  cheatSheet: '= assign · == equal?',
  youCanNow: 'Catch the assignment/equality swap.',
  nextId: 'mc-02',
})

const mc02 = L({
  id: 'mc-02',
  title: 'Misconceptions — off-by-one and ranges',
  order: 2,
  prerequisites: ['py-07', 'algo-04'],
  goal: 'You can predict the last value of range(n) and the last valid index of a list of length n.',
  why: 'Off-by-one errors dominate loops and indexing.',
  concept: 'range(3) → 0,1,2 (not 3). A list of 3 items has indexes 0,1,2 only.',
  analogy: 'House numbers 0,1,2 on a street of three houses — there is no house 3.',
  explanation:
    'len(xs) is 3 → valid indexes 0..2.\nrange(3) stops before 3.\nfor i in range(len(xs)): is a common pattern; xs[len(xs)] crashes.',
  code: `xs = ["a", "b", "c"]
print(len(xs))       # 3
print(list(range(3)))  # [0, 1, 2]
# xs[3] → IndexError`,
  predict: {
    prompt: 'What numbers does range(1, 4) produce?',
    answer: '1, 2, 3',
  },
  tests: [
    { input: 'range(4)', expected: '0,1,2,3' },
    { input: 'list of 4 items, last index', expected: '3' },
    { input: 'range(len(["x","y"]))', expected: '0, 1' },
  ],
  investigate: {
    prompt: 'Read: for i in range(len(xs)): print(xs[i])',
    questions: [
      'If len is 2, which i values run?',
      'Does i ever equal len(xs)?',
      'Why is that safe for indexing?',
    ],
    reveal: 'i is 0..len-1. Never equals len, so xs[i] is valid.',
  },
  practice: {
    copy: 'Write range(5) as a list on paper.',
    modify: 'Last index of a 10-item list.',
    create: 'A loop that prints indexes and values for ["HTML","CSS"].',
  },
  mistake: 'Expecting range(n) to include n.',
  debug: {
    broken: 'print(xs[len(xs)])',
    hint: 'Last index is len-1.',
  },
  quiz: [
    q('range(3) includes 3?', ['No', 'Yes', 'Only on Tuesdays'], 0, 'Exclusive end.'),
    q('Last index if len is 5…', ['4', '5', '0 only'], 0, 'len - 1.'),
    q('xs[len(xs)] usually…', ['IndexError', 'Returns the first item', 'Deploys'], 0, 'Past the end.'),
  ],
  takeaways: ['Exclusive end.', 'Last index = len-1.', 'Count on paper once.'],
  cheatSheet: 'range(n) → 0..n-1 · last index len-1',
  youCanNow: 'Stop one step before the cliff.',
  nextId: 'mc-03',
})

const mc03 = L({
  id: 'mc-03',
  title: 'Misconceptions — loops that never end / never run',
  order: 3,
  prerequisites: ['py-07'],
  goal: 'You can spot a missing update in a while loop and an empty range.',
  why: 'Infinite loops and “nothing printed” frustrate beginners more than syntax.',
  concept: 'A while needs a condition that can become false. A for over an empty sequence runs zero times.',
  analogy: 'A door that never closes (infinite) versus a queue with nobody in it (zero runs).',
  explanation:
    'n = 3\nwhile n > 0:\n    print(n)\n    n = n - 1   # without this, infinite\n\nfor x in []:\n    print(x)  # prints nothing — not an error',
  code: `n = 3
while n > 0:
    print(n)
    n = n - 1`,
  predict: {
    prompt: 'If you delete n = n - 1, what goes wrong?',
    answer: 'n stays 3; loop never stops.',
  },
  tests: [
    { input: 'while n>0 with n starting 2 and n-=1 each time', expected: 'prints 2 then 1' },
    { input: 'for x in []', expected: 'body runs 0 times' },
    { input: 'range(0)', expected: 'no numbers' },
  ],
  investigate: {
    prompt: 'Read a while that forgets to change the variable.',
    questions: [
      'Which line should change n?',
      'What is the stop condition?',
      'How would you test it with a tiny starting n?',
    ],
    reveal: 'Update n toward the stop condition; test with n=1 first.',
  },
  practice: {
    copy: 'Trace the sample while on paper.',
    modify: 'Count up from 1 to 3 with a while.',
    create: 'Explain one infinite-loop risk in your own words.',
  },
  mistake: 'Blaming the computer when the loop body never updates the test variable.',
  debug: {
    broken: 'while True: print("hi")  # no break',
    hint: 'Need a break or a condition that fails.',
  },
  quiz: [
    q('while needs…', ['A way for the test to become false', 'Only CSS', 'Git'], 0, 'Finite loops.'),
    q('Empty list for-loop…', ['Runs zero times', 'Crashes always', 'Runs forever'], 0, 'Zero iterations.'),
    q('First test for a while…', ['Tiny starting value', 'Deploy to production', 'Delete print'], 0, 'Safe experiment.'),
  ],
  takeaways: ['Update the test variable.', 'Empty ≠ error.', 'Test small.'],
  cheatSheet: 'while test + update · empty for → 0 runs',
  youCanNow: 'Diagnose stuck or silent loops.',
  nextId: 'mc-04',
})

const mc04 = L({
  id: 'mc-04',
  title: 'Misconceptions — types and “2” + 2',
  order: 4,
  prerequisites: ['py-03', 'py-str-02'],
  goal: 'You can predict TypeError from mixing str and int, and fix it with int() or str().',
  why: 'input() is text. Marks are numbers. Mixing them without conversion is everyday pain.',
  concept: '"2" + "2" → "22". 2 + 2 → 4. "2" + 2 → TypeError in Python.',
  analogy: 'Gluing paper digits versus adding quantities of oranges.',
  explanation:
    'score = int(input("Score: "))\nprint("Score: " + str(score))\n\nConvert at the boundary: text in → numbers for math → text out for messages.',
  code: `print("2" + "2")
print(2 + 2)
# print("2" + 2)  → TypeError`,
  predict: {
    prompt: 'What is int("15") + 1?',
    answer: '16',
  },
  tests: [
    { input: '"3"+"4"', expected: '"34"' },
    { input: '3+4', expected: '7' },
    { input: 'int("10")+5', expected: '15' },
  ],
  investigate: {
    prompt: 'Read: age = input("Age: "); print(age + 1)',
    questions: [
      'What type is age?',
      'Why does + 1 fail?',
      'Where should int() go?',
    ],
    reveal: 'age is str. int(age) + 1 or convert on input.',
  },
  practice: {
    copy: 'Write the three results: glue, add, error.',
    modify: 'Fix a message: "You scored " + score with score an int.',
    create: 'IPO for reading two numbers and printing their sum.',
  },
  mistake: 'Assuming input already returns a number.',
  debug: {
    broken: 'total = input("a") + input("b")  # wants numeric sum',
    hint: 'int() each side before +.',
  },
  quiz: [
    q('input() returns…', ['str', 'int always', 'bool'], 0, 'Text line.'),
    q('"2"+2 in Python…', ['TypeError', '4', '22 always'], 0, 'Mixed types.'),
    q('Numeric sum from text needs…', ['int(...)', 'only CSS', 'find()'], 0, 'Convert.'),
  ],
  takeaways: ['Know the type.', 'Convert at the edge.', 'Glue ≠ add.'],
  cheatSheet: 'int(text) · str(num) · input → str',
  youCanNow: 'Fix the classic type mix-up.',
  nextId: 'mc-05',
})

const mc05 = L({
  id: 'mc-05',
  title: 'Misconceptions — what print returns',
  order: 5,
  prerequisites: ['py-08'],
  goal: 'You can explain that print shows something and returns None; return sends a value to the caller.',
  why: 'x = print(5) does not store 5 in x. Functions that only print cannot be used as values.',
  concept: 'print → side effect on screen. return → value for the caller. None means “no useful value”.',
  analogy: 'Announcing the score to the crowd (print) versus handing the score paper to the referee (return).',
  explanation:
    'def double(n):\n    return n * 2\n\nx = double(3)  # x is 6\n\ndef show(n):\n    print(n)\n\ny = show(3)  # prints 3; y is None',
  code: `def double(n):
    return n * 2
print(double(4))
x = print(4)
print(x)   # None`,
  predict: {
    prompt: 'What is stored in x after x = print(2)?',
    answer: 'None (2 was only shown).',
  },
  tests: [
    { input: 'double(5) with return', expected: '10 as value' },
    { input: 'x = print(5)', expected: 'x is None' },
  ],
  investigate: {
    prompt: 'Read a function that prints a grade but returns nothing.',
    questions: [
      'Can the caller compute grade + 1?',
      'What keyword would fix that?',
      'When is print still useful inside a function?',
    ],
    reveal: 'Without return, caller gets None. return the grade; print at the edges if needed.',
  },
  practice: {
    copy: 'Trace x = print(4); print(x).',
    modify: 'Rewrite show to return the string instead.',
    create: 'def add(a,b) that returns the sum (no print inside).',
  },
  mistake: 'Using print as if it returned the printed value.',
  debug: {
    broken: 'total = print(a+b); print(total + 1)',
    hint: 'total is None. return a+b from a function, or print(a+b+1).',
  },
  quiz: [
    q('print mainly…', ['Shows output', 'Returns the number always', 'Assigns variables'], 0, 'Side effect.'),
    q('return mainly…', ['Gives a value to the caller', 'Only paints CSS', 'Starts Vite'], 0, 'Function result.'),
    q('x = print(1) stores…', ['None', '1', 'True'], 0, 'print → None.'),
  ],
  takeaways: ['print ≠ return.', 'None is a value.', 'Return for reuse.'],
  cheatSheet: 'print shows · return gives · None',
  youCanNow: 'Choose print vs return on purpose.',
  nextId: 'web-01',
})

export const misconceptionLessons = [mc01, mc02, mc03, mc04, mc05]
