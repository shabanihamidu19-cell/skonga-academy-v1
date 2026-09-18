import { lesson, q } from './lessonFactory'

/**
 * Python strings module — NEW.
 * Common CS1 gap: text manipulation after basic types.
 * Runtime: none (honest — no Python in Code Lab v1).
 */

const NO_RUN =
  'Code Lab v1 cannot run Python. Predict, write on paper or Termux later. Quiz completes the lesson.'

function L(partial) {
  return lesson({
    status: 'NEW-complete',
    difficulty: 'beginner',
    estimatedMinutes: 20,
    runtime: 'none',
    runtimeNote: NO_RUN,
    lab: null,
    completion: { requireQuiz: true, requireLab: false },
    ...partial,
  })
}

const str01 = L({
  id: 'py-str-01',
  title: 'Strings as text sequences',
  order: 1,
  prerequisites: ['py-03'],
  goal: 'You can index characters, slice a substring, and use len on a string.',
  why: 'Names, messages, and file names are text. Treating a string only as “one blob” blocks many real tasks.',
  concept:
    'A string is a sequence of characters. s[0] is the first character. s[1:4] is a slice. len(s) is how many characters.',
  analogy: 'A string is a row of lockers. Each locker has a number starting at 0. A slice is “lockers 1 through 3”.',
  explanation:
    'word = "SKONGA"\nword[0] → "S"\nword[-1] → last character "A"\nword[1:4] → "KON" (start included, end excluded)\nlen(word) → 6\n\nIndex out of range is an error. Empty string "" has length 0.',
  example: 'Index and slice.',
  code: `word = "SKONGA"
print(word[0])
print(word[1:4])
print(len(word))`,
  lineByLine: [
    { line: 'word[0]', text: 'First character (zero-based).' },
    { line: 'word[1:4]', text: 'Slice: indexes 1,2,3.' },
    { line: 'len(word)', text: 'Count of characters.' },
  ],
  predict: {
    prompt: 'What does "Asha"[1] print?',
    answer: 's',
  },
  investigate: {
    prompt: 'Read this snippet. Do not write new code yet.',
    questions: [
      'What is s[0] if s = "Hi"?',
      'Does s[0:2] include the character at index 2?',
      'What is len("")?',
    ],
    reveal: 's[0] is "H". Slice end is exclusive, so "Hi". Empty string length is 0.',
  },
  practice: {
    copy: 'Trace the three prints for "SKONGA".',
    modify: 'Predict "Neema"[0:3].',
    create: 'Write how to get the last letter of name without counting by hand (use [-1]).',
  },
  mistake: 'Thinking the end index of a slice is included.',
  debug: {
    broken: 'print("ab"[2])',
    hint: 'Only indexes 0 and 1 exist. IndexError.',
  },
  parsons: {
    prompt: 'Order the lines so the program prints the first letter of city.',
    lines: [
      'print(city[0])',
      'city = "Dar"',
      'print(len(city))',
    ],
    ordered: ['city = "Dar"', 'print(city[0])', 'print(len(city))'],
  },
  tests: [
    { input: 'word = "OK"', expected: 'word[0] is "O"; len is 2' },
  ],
  guidedChallenge: 'Slice the first three letters of "Python".',
  independentChallenge: 'Explain why "hi"[2] fails.',
  quiz: [
    q('First character index is…', ['0', '1 always', 'len'], 0, 'Zero-based.'),
    q('Slice end is…', ['Excluded', 'Always included', 'Random'], 0, 'Python slices.'),
    q('len("ab") is…', ['2', '1', '3'], 0, 'Two characters.'),
  ],
  takeaways: ['Index from 0.', 'Slice end exclusive.', 'len counts characters.'],
  cheatSheet: 's[i] · s[a:b] · len(s) · s[-1]',
  youCanNow: 'Pull pieces out of a string.',
  nextId: 'py-str-02',
})

const str02 = L({
  id: 'py-str-02',
  title: 'Join, split, and change case',
  order: 2,
  prerequisites: ['py-str-01'],
  goal: 'You can concatenate, split on a separator, and use upper/lower/strip.',
  why: 'User input has spaces and mixed case. Clean text before you compare.',
  concept:
    '"A" + "B" joins. "a,b,c".split(",") makes a list. s.strip() removes edges spaces. s.lower() helps fair comparison.',
  analogy: 'Glue two paper strips (join). Cut a list at commas (split). Trim the messy margins (strip).',
  explanation:
    'full = first + " " + last\nparts = "Asha,14".split(",")  → ["Asha", "14"]\n"  hi  ".strip() → "hi"\n"Asha".lower() → "asha"\n\nPrefer explicit cleaning before if name == "asha".',
  example: 'Clean and split.',
  code: `raw = "  Asha  "
name = raw.strip().lower()
print(name)
print("a,b".split(","))`,
  lineByLine: [
    { line: 'strip()', text: 'Remove leading/trailing spaces.' },
    { line: 'lower()', text: 'Same letters, lowercase.' },
    { line: 'split(",")', text: 'Break into a list.' },
  ],
  predict: {
    prompt: 'What does "  OK  ".strip() return?',
    answer: 'OK',
  },
  investigate: {
    prompt: 'Inspect: answer = input().strip().lower()',
    questions: [
      'Why strip before lower?',
      'If the learner types " Yes ", what is answer?',
      'Why is this safer than answer == "yes" on raw input?',
    ],
    reveal: 'Spaces break equality. After strip+lower, " Yes " becomes "yes".',
  },
  practice: {
    copy: 'Trace the sample prints.',
    modify: 'Split "Juma|9" on | and name both parts.',
    create: 'Write a mini algorithm: read a line, strip, lower, compare to "quit".',
  },
  mistake: 'Comparing input() to "yes" without strip/lower.',
  debug: {
    broken: 'if answer == "yes":  # user typed "Yes"',
    hint: 'Case differs. Use .lower() on both sides or on input.',
  },
  parsons: {
    prompt: 'Order lines to clean input and print it.',
    lines: [
      'print(name)',
      'name = raw.strip().lower()',
      'raw = input("Name: ")',
    ],
    ordered: ['raw = input("Name: ")', 'name = raw.strip().lower()', 'print(name)'],
  },
  tests: [
    { input: '"  Yes  "', expected: 'after strip+lower → "yes"' },
  ],
  guidedChallenge: 'Join first and last with a space using +.',
  independentChallenge: 'Split a CSV-like line of three marks.',
  quiz: [
    q('strip() removes…', ['Edge spaces', 'All letters', 'The variable'], 0, 'Trim edges.'),
    q('split(",") returns…', ['A list of pieces', 'An int', 'A browser'], 0, 'List.'),
    q('"A"+"B" is…', ['"AB"', '2', 'Error always'], 0, 'Concatenate.'),
  ],
  takeaways: ['Clean input.', 'split → list.', 'Case for fair compare.'],
  cheatSheet: '+ · split · strip · lower · upper',
  youCanNow: 'Prepare text before decisions.',
  nextId: 'py-str-03',
})

const str03 = L({
  id: 'py-str-03',
  title: 'Search inside a string',
  order: 3,
  prerequisites: ['py-str-02'],
  goal: 'You can use in, find, and count — and know find returns -1 when missing.',
  why: '“Does this message contain the word error?” is a daily check.',
  concept:
    '"err" in msg is True/False. msg.find("err") is the start index or -1. msg.count("a") counts non-overlapping hits.',
  analogy: 'Looking for a word in a sentence with your finger (linear scan under the hood).',
  explanation:
    'msg = "file not found"\n"not" in msg → True\nmsg.find("not") → 5\nmsg.find("OK") → -1\n\nDo not write if msg.find("x"):  # -1 is truthy issues in some patterns — prefer `in` for yes/no.',
  example: 'Membership.',
  code: `msg = "file not found"
print("not" in msg)
print(msg.find("not"))
print(msg.find("OK"))`,
  lineByLine: [
    { line: 'in', text: 'Boolean membership.' },
    { line: 'find', text: 'Index or -1.' },
  ],
  predict: {
    prompt: 'What is "abc".find("z")?',
    answer: '-1',
  },
  investigate: {
    prompt: 'Why is `if msg.find("x"):` risky for beginners?',
    questions: [
      'What does find return when x is missing?',
      'Is -1 treated as true or false in a boolean context in Python?',
      'What should you write for a clear yes/no check?',
    ],
    reveal: 'find → -1 if missing; -1 is truthy in Python! Prefer `if "x" in msg:`.',
  },
  practice: {
    copy: 'Trace the three prints.',
    modify: 'Count spaces in "a b c".',
    create: 'Algorithm: if "error" in line (case-insensitive), print ALERT.',
  },
  mistake: 'Using find’s -1 as “false” without care.',
  debug: {
    broken: 'if msg.find("x"): print("has x")  # missing x still enters sometimes',
    hint: 'Use `in` for membership.',
  },
  tests: [
    { input: 'msg="ok"', expected: '"err" in msg → False; find → -1' },
  ],
  guidedChallenge: 'Case-insensitive contains using lower().',
  independentChallenge: 'Connect this to linear search from Algorithms.',
  quiz: [
    q('"a" in "cat" is…', ['True', 'False', '-1'], 0, 'Membership.'),
    q('find when missing returns…', ['-1', '0', 'None'], 0, 'Sentinel.'),
    q('Clear yes/no check prefers…', ['in', 'only find without care', 'rm'], 0, 'Membership.'),
  ],
  takeaways: ['in for yes/no.', 'find for position.', 'Watch -1.'],
  cheatSheet: 'in · find · count · lower before check',
  youCanNow: 'Search text without a full parser.',
  nextId: 'py-05',
})

export const stringLessons = [str01, str02, str03]
