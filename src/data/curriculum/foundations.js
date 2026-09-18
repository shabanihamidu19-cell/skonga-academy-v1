import { lesson, q } from './lessonFactory'
import { pairLessons } from './pair'

/**
 * LEVEL 0 — Developer Foundations
 * Status: NEW curriculum (not recovered).
 * Target: secondary-school beginner with little or no coding experience.
 */

export const foundations = {
  id: 'foundations',
  level: 0,
  title: 'Developer Foundations',
  blurb: 'How computers, files, and learning to code fit together — before any language.',
  status: 'NEW',
  modules: [
    {
      id: 'digital',
      title: 'Thinking like a builder',
      goal: 'Arrive ready to learn programming without mixing up files, apps, and the internet.',
      lessons: [
        lesson({
          id: 'found-01',
          title: 'How computers and programs fit together',
          order: 1,
          status: 'NEW-complete',
          estimatedMinutes: 20,
          difficulty: 'beginner',
          goal: 'You can explain the difference between a computer, a program, a file, and a browser.',
          prerequisites: [],
          why: 'Many beginners say “the internet did not work” when the real problem is a file, an app, or a typing mistake. Clear names make debugging possible.',
          concept:
            'A computer is a machine that stores and follows instructions. Those instructions live in programs. Programs work with files. A browser is one program that can open web files.',
          analogy:
            'Think of a school workshop. The workshop building is the computer. The tools (saw, drill) are programs. The wood and nails are files. The browser is one special tool that can build and show a small display board (a web page) from written plans.',
          explanation:
            'Your phone and your laptop are both computers. WhatsApp is a program. A photo saved as “team.jpg” is a file. Chrome or Safari is a browser — a program whose job is to request web pages and show them.\n\nWhen you learn coding at SKONGA, you will mostly write text files (HTML, CSS, JavaScript, later Python). A program reads those files and does something useful: show a page, calculate a score, or save a list.\n\nImportant: the browser is not “the internet”. The internet is the network of connected computers. The browser is the app on your device that can use that network — and can also open files you write yourself in Code Lab, even offline.',
          example: 'Three everyday examples: a song file, a camera app, a browser opening a school website.',
          code: `Computer
  ├── Programs (apps)     e.g. browser, calculator, WhatsApp
  ├── Files               e.g. notes.txt, photo.jpg, index.html
  └── Network (optional)  e.g. the internet

Browser = a program that can show web files`,
          lineByLine: [
            { line: 'Computer', text: 'The device: phone, laptop, or tablet.' },
            { line: 'Programs', text: 'Software that follows instructions.' },
            { line: 'Files', text: 'Saved information with a name and type.' },
            { line: 'Browser', text: 'One program specialised in web documents.' },
          ],
          predict: {
            prompt: 'If Chrome is closed, does the internet stop existing for the whole world?',
            answer:
              'No. The internet is the network. Chrome is only one program on your device that can use the network. Other people still have the internet.',
          },
          practice: {
            copy: 'Read the diagram above until you can say it in your own words.',
            modify: 'Replace the examples with three from your own life (one file, one program, one website).',
            create:
              'Write four short sentences: (1) what a computer is, (2) what a program is, (3) what a file is, (4) what a browser is. Do not copy the lesson word-for-word.',
          },
          tryIt: 'Name one file, one program, and one website you used this week.',
          modify: 'Add whether each one needs the internet or not.',
          experiment: 'Open SKONGA Code Lab later — you will write files and the browser will show them without uploading anything.',
          mistake: 'Calling everything “the system” or “the network” when you mean a specific app or file.',
          debug: {
            broken: '“My internet is broken because my HTML page looks wrong in Code Lab.”',
            hint: 'Code Lab runs on your device. A wrong page usually means the file content is wrong, not that the whole internet failed.',
          },
          guidedChallenge: 'Sort these into computer / program / file / network: laptop, Chrome, song.mp3, school Wi‑Fi.',
          independentChallenge:
            'Explain to a Form 1 friend why “the browser is broken” is different from “the file has a typing error”.',
          quiz: [
            q('A browser is…', ['The entire internet', 'A program that can display web files', 'A type of keyboard'], 1, 'Chrome, Firefox, Safari are programs.'),
            q('An HTML page you write in Code Lab is mainly…', ['A live satellite', 'A text file with tags', 'A phone battery'], 1, 'You edit text; the browser paints it.'),
            q('Which statement is true?', ['Closing Chrome turns off the internet for everyone', 'Files can exist without the internet', 'Programs are the same as Wi‑Fi'], 1, 'Files live on storage; network is optional.'),
          ],
          assessment: [
            { q: 'In one sentence each, define: computer, program, file, browser.', type: 'short' },
          ],
          takeaways: [
            'Computers run programs; programs use files.',
            'A browser is a program, not the whole internet.',
            'Learning to code means writing and testing files carefully.',
          ],
          cheatSheet: 'Computer → Programs + Files (+ Network)\nBrowser = program for web files',
          youCanNow: 'Talk about coding tools without mixing “file”, “app”, and “internet”.',
          nextId: 'found-02',
          completion: { requireQuiz: true, requireLab: false },
        }),

        lesson({
          id: 'found-02',
          title: 'Files, folders, and paths',
          order: 2,
          status: 'NEW-complete',
          estimatedMinutes: 20,
          difficulty: 'beginner',
          goal: 'You can read a simple path and explain where a file lives relative to a folder.',
          prerequisites: ['found-01'],
          why: 'Almost every beginner error that says “file not found” is a path mistake. Paths are addresses.',
          concept:
            'A folder holds files (and other folders). A path is the address that points to one file or folder.',
          analogy:
            'Your school has blocks, classrooms, and desks. “Block B / Room 12 / Desk 4” is a path. If you go to the wrong room, you will not find the book — even if the book exists.',
          explanation:
            'On a computer, folders are like rooms. Files are like books on a desk.\n\nA path can be:\n- Absolute: starts from the top of the storage (like starting from the school gate).\n- Relative: starts from where you already are (like “two doors left from this classroom”).\n\nFile names often end with an extension that hints at the type:\n- .html — web page structure\n- .css — page style\n- .js — page behaviour\n- .py — Python program\n\nWhen a project has index.html and styles.css in the same folder, the HTML file can refer to styles.css with a short relative path because they are neighbours.',
          example: 'A tiny website folder with two neighbour files.',
          code: `my-site/
  index.html
  styles.css
  images/
    logo.png

Relative from index.html:
  styles.css        → same folder
  images/logo.png   → folder images, then logo.png`,
          lineByLine: [
            { line: 'my-site/', text: 'Project folder (the “classroom”).' },
            { line: 'index.html', text: 'Main page file.' },
            { line: 'styles.css', text: 'Style file next to the page.' },
            { line: 'images/logo.png', text: 'File inside a subfolder.' },
          ],
          predict: {
            prompt: 'If index.html and styles.css are in the same folder, is the path to CSS “styles.css” or “/the-entire-computer/styles.css”?',
            answer: 'Usually the short relative path: styles.css',
          },
          practice: {
            copy: 'Copy the folder tree above onto paper.',
            modify: 'Add a file scripts/app.js to the tree and write the relative path from index.html.',
            create:
              'Design a folder tree for a “school club” page with: one HTML file, one CSS file, one images folder with two pictures. Label each path.',
          },
          tryIt: 'Draw folders for a bio page: bio/index.html and bio/style.css.',
          modify: 'Add bio/photo.jpg and write its path from index.html.',
          experiment: 'Say out loud whether each path is relative or absolute.',
          mistake: 'Putting spaces or wrong spelling in file names, then wondering why the image is “missing”.',
          debug: {
            broken: 'HTML says src="logo.png" but the file is in images/logo.png',
            hint: 'Update the path to images/logo.png (or move the file).',
          },
          guidedChallenge: 'From index.html, write paths to styles.css and images/logo.png.',
          independentChallenge: 'Invent a three-level folder path for notes/form1/science/week1.txt and explain each part.',
          quiz: [
            q('A path is…', ['A password', 'An address to a file or folder', 'A type of virus'], 1, 'Paths locate things.'),
            q('styles.css next to index.html is usually linked with…', ['a relative neighbour path', 'a phone number', 'a Python import only'], 0, 'Same folder → short relative path.'),
            q('.html at the end of a filename mainly tells us…', ['the battery level', 'a likely file type', 'the student’s age'], 1, 'Extensions hint at type.'),
          ],
          assessment: [
            { q: 'Draw a folder with two files and one subfolder. Write one relative path from the main HTML file.', type: 'short' },
          ],
          takeaways: [
            'Folders organise files.',
            'A path is an address.',
            'Relative paths start from where you are; absolute paths start from the root.',
          ],
          cheatSheet: 'folder/file.ext\nsame folder → name.ext\nsubfolder → sub/name.ext',
          youCanNow: 'Describe where project files live without guessing.',
          nextId: 'found-03',
          completion: { requireQuiz: true, requireLab: false },
        }),

        lesson({
          id: 'found-03',
          title: 'The learning loop of a developer',
          order: 3,
          status: 'NEW-complete',
          estimatedMinutes: 18,
          difficulty: 'beginner',
          goal: 'You can describe the SKONGA learning loop and why breaking code is part of learning.',
          prerequisites: ['found-01', 'found-02'],
          why: 'School often rewards only the final correct answer. Programming rewards careful iteration. If you fear mistakes, you stop learning.',
          concept:
            'Developers learn by a loop: understand → try → observe → fix → share. Memorising every word is not the goal.',
          analogy:
            'A football player does not read a book about kicking and then play a World Cup final. They practise, miss, adjust, and try again. Coding is practice with feedback.',
          explanation:
            'At SKONGA Academy the intended loop is:\n\nLearn → Understand → Practice → Code → Run → Modify → Debug → Build → Share → Ask\n\n- Learn / Understand: read the idea and the analogy.\n- Practice: copy a working example, then change it, then create a small solution.\n- Code / Run: write real files and see results (in Code Lab for web lessons).\n- Modify / Debug: change one thing; when it breaks, read the error and fix it.\n- Build: combine skills into a small page or project.\n- Share / Ask: post progress or questions so others can help.\n\nOpening a lesson is not mastery. Completing quiz and lab tasks (when required) is how SKONGA records progress.',
          example: 'You change one line, Run, see a blank page, fix a missing tag, Run again — that whole cycle is normal.',
          code: `Learn → Understand → Practice
     → Code → Run → Modify
     → Debug → Build → Share → Ask`,
          lineByLine: [
            { line: 'Learn / Understand', text: 'Get the idea clearly.' },
            { line: 'Practice', text: 'Copy, modify, create.' },
            { line: 'Code / Run', text: 'Make the computer show feedback.' },
            { line: 'Debug', text: 'Treat errors as messages, not insults.' },
            { line: 'Share / Ask', text: 'Learning is social when you are stuck.' },
          ],
          predict: {
            prompt: 'Does finishing a lesson only by scrolling to the bottom count as completion at SKONGA?',
            answer: 'No. Completion follows the lesson rules (often quiz, and Code Lab when required).',
          },
          practice: {
            copy: 'Write the loop on paper from memory after hiding this screen.',
            modify: 'Add one extra step you personally need (for example “rest 2 minutes”).',
            create: 'Describe a time you fixed something by trial and error (not necessarily code). Map it onto the loop.',
          },
          tryIt: 'Say the loop out loud once.',
          modify: 'Circle the step you usually skip — that is your weak point.',
          experiment: 'In the next HTML lesson, intentionally make one small mistake, then fix it.',
          mistake: 'Copying finished code without predicting what it should do.',
          debug: {
            broken: '“I am bad at coding because my first try failed.”',
            hint: 'First tries are supposed to fail sometimes. The skill is the next try.',
          },
          guidedChallenge: 'Order these mixed steps: Share, Run, Understand, Debug, Modify.',
          independentChallenge: 'Write a 5-line personal rule list for studying at SKONGA (your own words).',
          quiz: [
            q('At SKONGA, opening a lesson alone means…', ['Full mastery', 'You started; completion needs the required checks', 'You should skip the quiz'], 1, 'Progress is earned.'),
            q('Debug means…', ['Delete the project forever', 'Read what went wrong and fix it', 'Only ask a teacher never to try'], 1, 'Errors are information.'),
            q('The Create practice level means…', ['Paste the full solution immediately', 'Solve a small problem with less help', 'Avoid the computer'], 1, 'Create builds independence.'),
          ],
          assessment: [
            { q: 'List the SKONGA loop in order and mark which step you will practise first this week.', type: 'short' },
          ],
          takeaways: [
            'Coding skill grows through a loop, not one perfect attempt.',
            'Mistakes are part of the method.',
            'Completion requires interaction, not only reading.',
          ],
          cheatSheet: 'Learn → Practice → Code → Run → Modify → Debug → Build → Share → Ask',
          youCanNow: 'Continue to the notional machine — how a program runs in memory.',
          nextId: 'pair-01',
          completion: { requireQuiz: true, requireLab: false },
        }),

        lesson({
          id: 'found-04',
          title: 'Notional machine — how a program runs',
          order: 4,
          status: 'NEW-complete',
          estimatedMinutes: 22,
          difficulty: 'beginner',
          goal: 'You can describe a simple mental model: code is steps; variables are labelled boxes; the machine follows one step at a time.',
          prerequisites: ['found-03'],
          why: 'Without a notional machine, code feels like magic. With one, you can predict and debug.',
          concept:
            'A notional machine is a simplified picture of what the computer does when it runs your program: read the next instruction, update memory boxes, show output.',
          analogy:
            'A cook with a recipe card and labelled bowls. One instruction at a time. The bowls hold current ingredients (values).',
          explanation:
            'Remember this picture:\n\n1) Program text = the recipe (does nothing until run).\n2) Variables = labelled boxes in working memory.\n3) Assignment (name = value) = put a value in a box (replace what was there).\n4) Evaluation = work out the right-hand side, then store.\n5) Sequence = do the next line after the previous finishes.\n6) Output = show something outside the boxes (screen).\n\nLater: a loop means “go back to a line”. A function call means “jump to another recipe, then return”.\n\nYou do not need CPU registers. You need: boxes, one step at a time, no magic.',
          example: 'Trace with boxes.',
          code: `x = 2
y = x + 1
print(y)
# boxes: x→2, then y→3, then screen shows 3`,
          lineByLine: [
            { line: 'x = 2', text: 'Create/update box x with 2.' },
            { line: 'y = x + 1', text: 'Read x, compute 3, store in y.' },
            { line: 'print(y)', text: 'Read y; send 3 to output.' },
          ],
          predict: {
            prompt: 'After a = 5; a = a + 1 — what is in box a?',
            answer: '6 (read old 5, add 1, store back).',
          },
          investigate: {
            prompt: 'Read: b = 1 then b = b + b',
            questions: [
              'After the first line, what is in b?',
              'When evaluating b + b, which value of b is used?',
              'Final value of b?',
            ],
            reveal: 'b starts 1. b+b uses 1+1. Final b is 2.',
          },
          practice: {
            copy: 'Draw two boxes for the sample and fill them line by line.',
            modify: 'Trace z = 10; z = z - 3 on paper.',
            create: 'Invent three lines that leave name holding "Asha" and n holding 3.',
          },
          mistake: 'Thinking both sides of = happen at once, or that the left side is “math equality”.',
          debug: {
            broken: 'Believing print(x) stores a value in x.',
            hint: 'print reads and shows. Assignment (=) stores.',
          },
          guidedChallenge: 'Trace: a=1; b=2; a=b; b=3 — final a and b?',
          independentChallenge: 'Explain to a classmate: “= is put-in-the-box, not algebra balance.”',
          quiz: [
            q('A variable is best pictured as…', ['A labelled box holding a value', 'The Wi‑Fi router', 'A CSS colour'], 0, 'Memory box.'),
            q('name = value means…', ['Evaluate value, store in name', 'Always math equality', 'Delete the program'], 0, 'Assignment.'),
            q('The machine runs…', ['One step at a time in order (unless control jumps)', 'All lines at once always', 'Only CSS'], 0, 'Sequence.'),
          ],
          takeaways: [
            'Recipe + boxes + one step.',
            '= stores; print shows.',
            'Predict with the picture before you type.',
          ],
          cheatSheet: 'boxes · assign · evaluate RHS · next line · output',
          youCanNow: 'Continue to the block bridge, then Python.',
          nextId: 'blk-01',
          completion: { requireQuiz: true, requireLab: false },
        }),
      ],
    },
    {
      id: 'pairing',
      title: 'Learning together',
      goal: 'Use pair programming as a method, not only solo reading.',
      lessons: pairLessons,
    },
  ],
}
