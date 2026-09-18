import { lesson, q } from './lessonFactory'
import { algorithmLessons } from './algorithms'
import { stringLessons } from './strings'
import { misconceptionLessons } from './misconceptions'
import { blockLessons } from './blocks'

/**
 * LEVEL 1 — Python fundamentals.
 * Provenance: NEW (not recovered).
 * Runtime: none in Code Lab v1. Do not offer a fake Run.
 */

const NO_RUN =
  'Code Lab v1 runs HTML, CSS, and JavaScript only. It cannot execute Python. Predict the output, write the snippet, then check the hidden answer. If you have Python on a computer or Termux later, run the same snippet there — that is optional, not required to complete the lesson.'

function L(partial) {
  return lesson({
    status: 'NEW-complete',
    difficulty: 'beginner',
    estimatedMinutes: 22,
    runtime: 'none',
    runtimeNote: NO_RUN,
    lab: null,
    completion: { requireQuiz: true, requireLab: false },
    ...partial,
  })
}

const py01 = L({
  id: 'py-01',
  title: 'print and output',
  order: 1,
  prerequisites: ['found-04', 'blk-04'],
  goal: 'You can explain what print does and predict the output of a one-line print.',
  why: 'Output is how a program proves it ran. In Python that first proof is print.',
  concept: 'print(...) sends text to the output stream. Quotes wrap a string. The parentheses call the function.',
  analogy: 'print is speaking aloud. The words in quotes are the sentence.',
  explanation:
    'print("Habari SKONGA")\n\nPython reads the line, calls print, and shows Habari SKONGA.\n\nYou can print several things separated by commas: print("Karibu", "Asha")\n\nQuotes must match. print("hi\') is an error.\n\nThere is no Run button for Python in SKONGA Code Lab. Your job here is mental execution.',
  example: 'A first greeting.',
  code: `print("Habari SKONGA")
print("Karibu", "Asha")`,
  lineByLine: [
    { line: 'print(...)', text: 'Call the print function.' },
    { line: '"Habari SKONGA"', text: 'A string argument.' },
    { line: 'comma arguments', text: 'print separates them with a space by default.' },
  ],
  predict: {
    prompt: 'What two lines appear after both prints?',
    answer: 'Habari SKONGA  then  Karibu Asha',
  },
  tests: [
    { input: 'print("Hi")', expected: 'Hi' },
    { input: 'print("A", "B")', expected: 'A B' },
  ],
  practice: {
    copy: 'Copy the snippet by hand on paper or in a notes app. Say the output out loud.',
    modify: 'Change the greeting to include your name. Write the new output.',
    create: 'Three print lines: your name, your city, one hobby. Write the three output lines.',
  },
  mistake: 'Forgetting quotes around text, or thinking print designs a website.',
  debug: {
    broken: 'print(Habari SKONGA)',
    hint: 'Habari SKONGA without quotes is not a string — Python looks for names. Use "Habari SKONGA".',
  },
  guidedChallenge: 'Predict print("2" + "2") versus print(2 + 2) — you will confirm types in a later lesson.',
  independentChallenge: 'Write a four-line “about me” using only print.',
  quiz: [
    q('print is used to…', ['Show output', 'Paint CSS', 'Open Capacitor'], 0, 'Output to the stream.'),
    q('Text you want to show is usually a…', ['String in quotes', 'CSS class required', 'Git remote'], 0, 'Quotes make strings.'),
    q('Can Code Lab v1 Run this Python?', ['No — predict it here', 'Yes, secretly', 'Only on Fridays'], 0, 'No Python runtime in the lab.'),
  ],
  takeaways: ['print speaks.', 'Quotes wrap text.', 'No fake Run in this module.'],
  cheatSheet: 'print("Habari SKONGA")',
  youCanNow: 'Predict a first print.',
  nextId: 'py-02',
})

const py02 = L({
  id: 'py-02',
  title: 'Variables',
  order: 2,
  prerequisites: ['py-01'],
  goal: 'You can store a value in a name and print that name.',
  why: 'Programs remember. A name lets you reuse a value without copying it.',
  concept: 'name = "Asha" stores the string in name. print(name) shows the stored value, not the letters n-a-m-e.',
  analogy: 'A labelled box. The label is name. The content can be replaced later.',
  explanation:
    'Assignment uses =.\n\nname = "Asha"\nprint(name)\nname = "Juma"\nprint(name)\n\nThe second print shows Juma because the box was updated.\n\nChoose clear names: score, not s, when you are learning.',
  example: 'Store then print.',
  code: `name = "Asha"
print(name)
name = "Juma"
print(name)`,
  lineByLine: [
    { line: 'name = "Asha"', text: 'Create/update the variable.' },
    { line: 'print(name)', text: 'Output the current value.' },
  ],
  predict: {
    prompt: 'What are the two printed lines?',
    answer: 'Asha  then  Juma',
  },
  tests: [
    { input: 'name="Asha"; print(name)', expected: 'Asha' },
    { input: 'name="Asha"; name="Juma"; print(name)', expected: 'Juma' },
  ],
  practice: {
    copy: 'Trace both prints on paper.',
    modify: 'Use your own two names. Write both outputs.',
    create: 'city and school variables, each printed once.',
  },
  mistake: 'print("name") when you meant print(name) — quotes print the word name.',
  debug: {
    broken: 'print(name)\nname = "Asha"',
    hint: 'Assign before you print, or Python does not know name yet (NameError).',
  },
  guidedChallenge: 'Store age = 15 and print it.',
  independentChallenge: 'Three variables, three prints, one sentence each.',
  quiz: [
    q('= in this lesson means…', ['Store', 'Compare', 'A CSS rule'], 0, 'Assignment.'),
    q('print(name) shows…', ['The value stored in name', 'Always the letters name', 'A webpage layout'], 0, 'No quotes around the variable.'),
    q('You can change a variable by…', ['Assigning again', 'Only restarting the phone', 'Editing package.json'], 0, 'New assignment.'),
  ],
  takeaways: ['Names remember values.', 'Assign before print.', 'print("name") ≠ print(name).'],
  cheatSheet: 'name = "Asha" · print(name)',
  youCanNow: 'Keep a value in a labelled box.',
  nextId: 'py-03',
})

const py03 = L({
  id: 'py-03',
  title: 'Data types',
  order: 3,
  prerequisites: ['py-02'],
  goal: 'You can separate int, float, str, and bool, and use type() as a flashlight.',
  why: '15 and "15" look similar to humans and behave differently in programs.',
  concept: 'int is a whole number. float has a decimal. str is text. bool is True or False.',
  analogy: 'Counted mangoes (int), measured water (float), a name on a book (str), a yes/no tick (bool).',
  explanation:
    'age = 15          # int\nheight = 1.6      # float\nname = "Asha"     # str\npassed = True     # bool\nprint(type(age))\n\nTrue and False are capitalised in Python.\n\n"15" + 1 is an error. int("15") + 1 is 16 if the text is a clean number.',
  example: 'Inspect types.',
  code: `age = 15
name = "Asha"
print(type(age))
print(type(name))
print(int("15") + 1)`,
  lineByLine: [
    { line: 'type(age)', text: 'Reports the type object.' },
    { line: 'int("15")', text: 'Convert numeric text to int.' },
  ],
  predict: {
    prompt: 'What kind of thing is "15"? What is 15?',
    answer: 'str versus int.',
  },
  tests: [
    { input: 'type(15)', expected: 'int' },
    { input: 'type("15")', expected: 'str' },
    { input: 'int("10")+1', expected: '11' },
  ],
  practice: {
    copy: 'Write type of 3, 3.0, "3", True.',
    modify: 'Convert "20" to int and add 2. Predict 22.',
    create: 'Four variables, four different types, four type() predictions.',
  },
  mistake: 'Adding a string to a number without converting.',
  debug: {
    broken: 'print("15" + 1)',
    hint: 'Convert: int("15") + 1 — or print two things with a comma.',
  },
  guidedChallenge: 'Predict type(3.0).',
  independentChallenge: 'Explain why True is not "True".',
  quiz: [
    q('type("15") is…', ['str', 'int', 'bool'], 0, 'Quotes → string.'),
    q('int("15") + 1 is…', ['16', '"151"', 'CSS'], 0, 'Numeric add after convert.'),
    q('True is a…', ['bool', 'float always', 'tag'], 0, 'Boolean.'),
  ],
  takeaways: ['Four starter types.', 'type() inspects.', 'Convert before you mix.'],
  cheatSheet: 'int · float · str · bool · type(x)',
  youCanNow: 'Name the type of a value.',
  nextId: 'py-04',
})

const py04 = L({
  id: 'py-04',
  title: 'input',
  order: 4,
  prerequisites: ['py-03'],
  goal: 'You can describe how input() collects text and why you convert before maths.',
  why: 'Interactive programs ask questions. input always returns a string.',
  concept: 'name = input("Jina lako? ") pauses for a typed line. The result is str even if the person types 15.',
  analogy: 'A form field: whatever they write arrives as text on the paper.',
  explanation:
    'name = input("Jina lako? ")\nprint("Karibu", name)\n\nmark = int(input("Score: "))\n\nIf they type hello into int(input(...)), Python raises ValueError. Later you will handle that; now just know conversion can fail.\n\nIn this lesson, pretend the typed answers and write both the prompt and the output.',
  example: 'Ask then greet.',
  code: `name = input("Jina lako? ")
print("Karibu", name)
mark = int(input("Score: "))
print(mark + 1)`,
  lineByLine: [
    { line: 'input("...")', text: 'Show a prompt; read a line of text.' },
    { line: 'int(...)', text: 'Convert that text to a number when you need maths.' },
  ],
  predict: {
    prompt: 'If the learner types 10 at Score, what does print(mark + 1) show after a successful int()?',
    answer: '11',
  },
  tests: [
    { input: 'input always type', expected: 'str' },
    { input: 'int(input) then +1', expected: 'numeric sum works' },
  ],
  practice: {
    copy: 'Role-play: you are Python. A friend types Asha. Write the greeting line.',
    modify: 'Change the prompt to Kiswahili you prefer.',
    create: 'Two inputs: name and city. One print using both.',
  },
  mistake: 'Doing input() + 1 without int().',
  debug: {
    broken: 'age = input("Age: ")\nprint(age + 1)',
    hint: 'age is str. Use int(age) before adding.',
  },
  guidedChallenge: 'Write the output if name input is Juma.',
  independentChallenge: 'Design a 3-question interview script on paper.',
  quiz: [
    q('input() returns…', ['A string', 'Always an int', 'A CSS colour'], 0, 'Text line.'),
    q('Need a number from input? ', ['Convert with int(...)', 'Use === from JavaScript', 'Add a border'], 0, 'int(input(...)).'),
    q('int("hello") typically…', ['Raises an error', 'Becomes 0 quietly always', 'Opens Code Lab'], 0, 'ValueError.'),
  ],
  takeaways: ['input is text.', 'Convert for maths.', 'Role-play the conversation.'],
  cheatSheet: 'name = input("...? ") · int(input("Score: "))',
  youCanNow: 'Plan a question-and-answer snippet.',
  nextId: 'py-str-01',
})

const py05 = L({
  id: 'py-05',
  title: 'Operators',
  order: 5,
  prerequisites: ['py-04'],
  goal: 'You can compute with + - * / // % and compare with == != > < >= <=.',
  why: 'Marks, change, and pass/fail are operators.',
  concept: '/ is true division (float). // is integer division. % is remainder. == compares; = stores.',
  analogy: 'Calculator keys plus exam ticks.',
  explanation:
    'print(10 / 2)   # 5.0\nprint(10 // 3)  # 3\nprint(10 % 3)   # 1\nprint(3 > 1)    # True\nprint(2 == "2") # False\n\n** is power: 2 ** 3 is 8.',
  example: 'A small workspace of operators.',
  code: `print(10 / 2)
print(10 // 3)
print(10 % 3)
print(3 > 1)
print(2 == "2")`,
  lineByLine: [
    { line: '10 / 2', text: 'Division → float 5.0' },
    { line: '10 // 3', text: 'Whole groups of 3 in 10 → 3' },
    { line: '==', text: 'Equal values? types matter.' },
  ],
  predict: {
    prompt: 'What is 7 % 2?',
    answer: '1 (remainder).',
  },
  tests: [
    { input: '3+2', expected: '5' },
    { input: '10%3', expected: '1' },
    { input: '7//2', expected: '3' },
  ],
  practice: {
    copy: 'Predict each of the five prints before peeking.',
    modify: 'Replace 10 and 3 with your own pair. Recalculate.',
    create: 'A mark out of 20 converted to percent: (16 / 20) * 100.',
  },
  mistake: 'Using = inside a comparison.',
  debug: {
    broken: 'if score = 10:',
    hint: 'That assigns. Compare with ==.',
  },
  guidedChallenge: 'Is 5 != 6 True?',
  independentChallenge: 'Write four comparisons about your age and 18.',
  quiz: [
    q('== means…', ['Compare', 'Store', 'Import CSS'], 0, 'Equality test.'),
    q('10 // 3 is…', ['3', '3.333', '"103"'], 0, 'Floor division.'),
    q('% gives…', ['Remainder', 'A media query', 'A DOM node'], 0, 'Modulo.'),
  ],
  takeaways: ['= vs ==.', '/ vs //.', 'Comparisons produce bool.'],
  cheatSheet: '+ - * / // % ** · == != > <',
  youCanNow: 'Compute and compare on paper.',
  nextId: 'py-06',
})

const py06 = L({
  id: 'py-06',
  title: 'Conditions',
  order: 6,
  prerequisites: ['py-05'],
  goal: 'You can write if / elif / else with correct indentation.',
  why: 'Python uses indentation instead of curly braces. Wrong spaces = wrong program or an error.',
  concept: 'if test: body. elif another: body. else: body. The body is indented (4 spaces).',
  analogy: 'A junction with a side road (elif) and a default road (else).',
  explanation:
    'score = 12\nif score >= 10:\n    print("Pass")\nelse:\n    print("Retry")\n\nThe colon starts the block. Mix tabs and spaces and you will suffer. Use 4 spaces.\n\nelif score >= 8: is an extra test only when the previous tests failed.',
  example: 'Pass / retry.',
  code: `score = 12
if score >= 10:
    print("Pass")
else:
    print("Retry")`,
  lineByLine: [
    { line: 'if score >= 10:', text: 'Test + colon.' },
    { line: '    print(...)', text: 'Indented body.' },
  ],
  predict: {
    prompt: 'If score is 8, what prints?',
    answer: 'Retry',
  },
  tests: [
    { input: 'score=85; band if >=80', expected: 'A' },
    { input: 'score=50', expected: 'not A (depends on your bands)' },
  ],
  practice: {
    copy: 'Trace both paths for 12 and 8.',
    modify: 'Add elif score >= 8: print("Almost")',
    create: 'Temperature bands: hot / mild / cold with two thresholds you choose.',
  },
  mistake: 'Forgetting the colon or indenting the if itself.',
  debug: {
    broken: 'if score >= 10\nprint("Pass")',
    hint: 'Add a colon after the test and indent the print.',
  },
  guidedChallenge: 'A/B/C bands: 80 / 60 / else.',
  independentChallenge: 'A login sketch: if name == "Asha": print welcome else deny (practice only).',
  quiz: [
    q('Python blocks are marked by…', ['Indentation after a colon', 'Only curly braces like JS', 'The CSS pane'], 0, 'Spaces define blocks.'),
    q('else runs when…', ['Earlier tests failed', 'print is banned', 'int fails always'], 0, 'Default path.'),
    q('elif is…', ['Another test after if failed', 'A list method', 'A flex property'], 0, 'Else-if.'),
  ],
  takeaways: ['Colon + indent.', 'One path wins.', 'Trace with two sample numbers.'],
  cheatSheet: 'if test:\\n    ...\\nelif test:\\n    ...\\nelse:\\n    ...',
  youCanNow: 'Choose a path from a number.',
  nextId: 'py-07',
})

const py07 = L({
  id: 'py-07',
  title: 'Loops',
  order: 7,
  prerequisites: ['py-06'],
  goal: 'You can walk a list with for and repeat with range.',
  why: 'Marks, names, and attempts are sequences.',
  concept: 'for n in [1, 2, 3]: print(n) — n takes each value. for i in range(3): repeats 0,1,2.',
  analogy: 'A stamp for every envelope in the pile.',
  explanation:
    'range(3) → 0, 1, 2 (three times, starting at 0).\nrange(1, 4) → 1, 2, 3.\n\nwhile test: repeats until the test is false. Always change something inside or it never ends.',
  example: 'Print a short list.',
  code: `for n in [1, 2, 3]:
    print(n)
for i in range(1, 4):
    print("t", i)`,
  lineByLine: [
    { line: 'for n in [1, 2, 3]:', text: 'n becomes 1, then 2, then 3.' },
    { line: 'range(1, 4)', text: '1 inclusive, 4 exclusive.' },
  ],
  predict: {
    prompt: 'How many lines does the first loop print?',
    answer: 'Three lines: 1 then 2 then 3.',
  },
  tests: [
    { input: 'for n in [1,2,3]: print(n)', expected: '1 then 2 then 3' },
    { input: 'list(range(3))', expected: '[0,1,2]' },
  ],
  practice: {
    copy: 'Write both outputs by hand.',
    modify: 'Loop ["HTML", "CSS", "JS"] and print each.',
    create: 'Sum 1..5 with a total variable and a for loop. Predict 15.',
  },
  mistake: 'Expecting range(3) to include 3.',
  debug: {
    broken: 'for n in [1, 2, 3]\nprint(n)',
    hint: 'Colon after the for line; indent print.',
  },
  guidedChallenge: 'Print even numbers 2, 4, 6 using a list or range.',
  independentChallenge: 'Countdown mental model: 3, 2, 1 using a list.',
  quiz: [
    q('for item in list does…', ['Repeats the body once per item', 'Styles a card', 'Signs an APK'], 0, 'Iteration.'),
    q('range(3) produces…', ['0, 1, 2', '1, 2, 3', 'Only 3'], 0, 'Zero-based, exclusive end.'),
    q('A while loop needs…', ['A test that can become false', 'A grid container', 'A radio input'], 0, 'Avoid infinity.'),
  ],
  takeaways: ['for walks a sequence.', 'range stops before the end.', 'Indent the body.'],
  cheatSheet: 'for x in xs: · range(n) · range(a, b)',
  youCanNow: 'Repeat work over a list.',
  nextId: 'py-08',
})

const py08 = L({
  id: 'py-08',
  title: 'Functions',
  order: 8,
  prerequisites: ['py-07'],
  goal: 'You can define a function with def, return a value, and call it.',
  why: 'Reusable recipes beat copy-paste.',
  concept: 'def greet(name): return "Hujambo " + name — call greet("Asha") to get the string.',
  analogy: 'A recipe card you can cook more than once.',
  explanation:
    'def greet(name):\n    return "Hujambo " + name\n\nprint(greet("Asha"))\n\nreturn exits the function with a value. print inside a function shows something but is not the same as return.\n\nParameters are local names.',
  example: 'Greet helper.',
  code: `def greet(name):
    return "Hujambo " + name

print(greet("Asha"))
print(greet("Juma"))`,
  lineByLine: [
    { line: 'def greet(name):', text: 'Define with one parameter.' },
    { line: 'return ...', text: 'Send a string back.' },
    { line: 'greet("Asha")', text: 'Call.' },
  ],
  predict: {
    prompt: 'What does greet("Juma") return?',
    answer: 'Hujambo Juma',
  },
  tests: [
    { input: 'greet("Asha") returns', expected: 'Hujambo Asha' },
    { input: 'double(5) if return n*2', expected: '10' },
  ],
  practice: {
    copy: 'Write both printed lines.',
    modify: 'Change the template to “Karibu, ”.',
    create: 'def double(n): return n * 2 and predict double(5).',
  },
  mistake: 'Forgetting return and printing None.',
  debug: {
    broken: 'def greet(name)\n    return "Hujambo " + name',
    hint: 'Colon after def greet(name):',
  },
  guidedChallenge: 'def passed(score): return score >= 10',
  independentChallenge: 'def full_name(first, last): return both with a space.',
  quiz: [
    q('def starts a…', ['Function definition', 'CSS grid', 'Git commit'], 0, 'Define.'),
    q('return sends…', ['A value to the caller', 'A file to Vercel always', 'A radio click'], 0, 'Function output.'),
    q('greet("Asha") is a…', ['Call with an argument', 'Variable assignment only', 'Media query'], 0, 'Invoke.'),
  ],
  takeaways: ['def + colon + indent.', 'return the result.', 'Call with parentheses.'],
  cheatSheet: 'def name(param):\\n    return ...',
  youCanNow: 'Package a small idea as a function.',
  nextId: 'py-09',
})

const py09 = L({
  id: 'py-09',
  title: 'Lists',
  order: 9,
  prerequisites: ['py-08'],
  goal: 'You can create a list, read an index, append, and loop it.',
  why: 'Collections of marks or names need a single structure.',
  concept: 'marks = [10, 14, 18] — marks[0] is 10. append adds at the end. len(marks) is 3.',
  analogy: 'A numbered queue starting at 0.',
  explanation:
    'First index is 0. Last index is len(list) - 1.\n\nmarks.append(20)\n\nfor m in marks:\n    print(m)',
  example: 'Read and grow a list.',
  code: `marks = [10, 14, 18]
print(marks[0])
marks.append(20)
print(len(marks))`,
  lineByLine: [
    { line: 'marks[0]', text: 'First item.' },
    { line: 'append(20)', text: 'Add at the end.' },
    { line: 'len(marks)', text: 'How many items now (4).' },
  ],
  predict: {
    prompt: 'After append, what is len(marks)?',
    answer: '4',
  },
  tests: [
    { input: 'marks=[10,14,18]; marks[0]', expected: '10' },
    { input: 'after append(20), len', expected: '4' },
  ],
  practice: {
    copy: 'Trace prints: 10 then 4.',
    modify: 'Start with two names; append yours; write the list.',
    create: 'Average of three marks: sum / 3 (predict the number).',
  },
  mistake: 'Asking for marks[3] on a three-item list (indexes 0,1,2).',
  debug: {
    broken: 'print(marks[3])  # only three items',
    hint: 'IndexError — last valid index is 2.',
  },
  guidedChallenge: 'Print each mark with a for loop.',
  independentChallenge: 'A shopping list of four items; print the last one.',
  quiz: [
    q('First list index is…', ['0', '1 always', 'len'], 0, 'Zero-based.'),
    q('append…', ['Adds at the end', 'Deletes the list', 'Runs CSS'], 0, 'Grow.'),
    q('len(xs) is…', ['How many items', 'The first item', 'A boolean only'], 0, 'Length.'),
  ],
  takeaways: ['0-based indexes.', 'append grows.', 'for walks the list.'],
  cheatSheet: 'xs[0] · xs.append(x) · len(xs)',
  youCanNow: 'Store an ordered collection.',
  nextId: 'py-10',
})

const py10 = L({
  id: 'py-10',
  title: 'Dictionaries',
  order: 10,
  prerequisites: ['py-09'],
  goal: 'You can store labelled fields in a dict and read them by key.',
  why: 'A student is a record, not a mysterious pile of variables.',
  concept: 'student = {"name": "Asha", "score": 18} — student["name"] is "Asha". Keys are usually strings.',
  analogy: 'A paper form with named boxes.',
  explanation:
    'Use square brackets and the key — not a dot like JavaScript’s user.name (that style is different in Python).\n\nstudent["score"] = 19 updates.\n\nMissing keys raise KeyError. .get("club") returns None if absent.',
  example: 'Read a student record.',
  code: `student = {"name": "Asha", "score": 18}
print(student["name"])
student["score"] = 19
print(student["score"])`,
  lineByLine: [
    { line: '{"name": "Asha"}', text: 'Key-value pair.' },
    { line: 'student["name"]', text: 'Read by key.' },
  ],
  predict: {
    prompt: 'After the update, what does print(student["score"]) show?',
    answer: '19',
  },
  tests: [
    { input: 'student={"name":"Asha"}; student["name"]', expected: 'Asha' },
    { input: 'missing key', expected: 'KeyError (or .get → None)' },
  ],
  practice: {
    copy: 'Trace both prints: Asha then 19.',
    modify: 'Add "city": "Dar" and print it.',
    create: 'A lesson dict with title and minutes.',
  },
  mistake: 'student.name as if this were JavaScript.',
  debug: {
    broken: 'print(student["nam"])',
    hint: 'KeyError — the key is "name".',
  },
  guidedChallenge: 'Loop keys with for k in student: print(k, student[k])',
  independentChallenge: 'Two students in a list of dicts; print the first name.',
  quiz: [
    q('Dict values are labelled by…', ['Keys', 'Only 0,1,2', 'Flex rows'], 0, 'Named keys.'),
    q('Read name with…', ['student["name"]', 'student.name as required syntax here', 'print CSS'], 0, 'Bracket + key.'),
    q('Wrong key usually…', ['Raises KeyError', 'Silently paints purple', 'Opens Lab'], 0, 'Missing key error.'),
  ],
  takeaways: ['Keys + values.', 'Brackets in Python.', 'List = sequence; dict = record.'],
  cheatSheet: 'd = {"name": "Asha"} · d["name"]',
  youCanNow: 'Model one student as a dict.',
  nextId: 'prog-project',
})

const pyProject = L({
  id: 'prog-project',
  title: 'Module project — Student Grade Calculator',
  order: 11,
  estimatedMinutes: 35,
  prerequisites: ['py-02', 'py-04', 'py-06'],
  goal: 'You can combine variables, input, conversion, and conditions into one grading program on paper (or local Python).',
  why: 'The module exists to build this, not to collect syntax stickers.',
  concept: 'Ask for a mark, classify a band, print a sentence. Optional: wrap classification in a function.',
  analogy: 'A teacher’s mark book in a handful of lines.',
  explanation:
    'Requirements:\n1) Read a score (treat input as text, then int)\n2) Classify A (>=80), B (>=60), C (else) — you may pick the same bands\n3) Print Grade: X\n4) Show a second example with a different score so both branches are traced\n\nNo Code Lab Run. Complete by quiz + written trace. If you later run it in Termux python, that is extra proof, not the product runtime.',
  example: 'Canonical sketch.',
  code: `mark = int(input("Score: "))
if mark >= 80:
    grade = "A"
elif mark >= 60:
    grade = "B"
else:
    grade = "C"
print("Grade:", grade)`,
  tests: [
    { input: 'mark=85', expected: 'Grade A (if >=80)' },
    { input: 'mark=60', expected: 'Grade B (if >=60)' },
    { input: 'mark=40', expected: 'Grade C' },
  ],
  practice: {
    copy: 'Trace Score 85 → A and Score 59 → C on paper.',
    modify: 'Add a message “Pass” if grade is A or B.',
    create: 'Write the full program from memory, then compare to the sample.',
  },
  mistake: 'Skipping int() and comparing a string score to 80 in a confusing way.',
  debug: {
    broken: 'if mark >= 80\ngrade = "A"',
    hint: 'Colon and indent the assignment.',
  },
  guidedChallenge: 'Trace 60 exactly — which band?',
  independentChallenge: 'Add a function grade_for(mark) and call it.',
  quiz: [
    q('This project uses…', ['variables, input, conditions', 'only CSS grid', 'Capacitor plugins'], 0, 'Level 1 synthesis.'),
    q('input score should be converted with…', ['int(...)', 'display:flex', 'querySelector'], 0, 'Text → number.'),
    q('Does completing this lesson require Code Lab Run?', ['No', 'Yes, Python runs in the iframe', 'Only if CSS is purple'], 0, 'No Python runtime in v1.'),
  ],
  takeaways: ['You made a decision in code.', 'Traces beat fake buttons.', 'Web is next for visible pages.'],
  cheatSheet: 'int(input) → if/elif/else → print grade',
  youCanNow: 'Continue to Algorithms, then Web.',
  completion: { requireQuiz: true, requireLab: false, requireTests: true },
  nextId: 'algo-01',
})

export const programming = {
  id: 'programming',
  level: 1,
  title: 'Programming Fundamentals',
  blurb: 'Python-first thinking, then algorithms on paper (and one search demo in JS).',
  status: 'NEW',
  modules: [
    {
      id: 'blocks',
      title: 'Blocks bridge',
      goal: 'Sequence, selection, iteration without syntax stress.',
      lessons: blockLessons,
    },
    {
      id: 'python',
      title: 'Python basics',
      goal: 'Think with code before the browser.',
      lessons: [py01, py02, py03, py04, py05, py06, py07, py08, py09, py10, pyProject],
    },
    {
      id: 'strings',
      title: 'Strings',
      goal: 'Index, slice, clean, and search text.',
      lessons: stringLessons,
    },
    {
      id: 'algorithms',
      title: 'Algorithms',
      goal: 'Write steps, trace them, search and scan a list.',
      lessons: algorithmLessons,
    },
    {
      id: 'misconceptions',
      title: 'Misconceptions lab',
      goal: 'Spiral review of classic beginner bugs.',
      lessons: misconceptionLessons,
    },
  ],
}
