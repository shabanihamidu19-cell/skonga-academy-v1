import { lesson, q, labHtml } from './lessonFactory'

/**
 * LEVEL 3 — Developer Tools.
 * Provenance: NEW (not recovered).
 * Terminal/Git: no OS sandbox in SKONGA v1 — predict and write.
 * Browser debug lessons may use Code Lab (HTML/CSS/JS only).
 */

const NO_OS =
  'SKONGA Academy v1 does not sandbox your phone’s real Terminal, Git, or npm. These lessons are taught by prediction, tracing, and written practice. When you have Termux or a computer, you may run the same commands there — optional extra proof, not required to complete the lesson.'

function paper(partial) {
  return lesson({
    status: 'NEW-complete',
    difficulty: 'beginner',
    estimatedMinutes: 20,
    runtime: 'none',
    runtimeNote: NO_OS,
    lab: null,
    completion: { requireQuiz: true, requireLab: false },
    ...partial,
  })
}

function labLesson(partial) {
  return lesson({
    status: 'NEW-complete',
    difficulty: 'beginner',
    estimatedMinutes: 22,
    runtime: 'html-css-js',
    completion: { requireQuiz: true, requireLab: true },
    ...partial,
  })
}

const term01 = paper({
  id: 'term-01',
  title: 'What is the Terminal?',
  order: 1,
  prerequisites: ['found-01'],
  goal: 'You can explain that the terminal is a text interface for giving the computer short commands.',
  why: 'Buttons hide the verbs. Developers need verbs: list, move, run, save.',
  concept:
    'A terminal (or shell) reads a line of text, runs a program, and prints text back. The blinking cursor is waiting for your next command.',
  analogy:
    'A workshop counter: you say “show me the drawers”, the clerk lists them. No mouse tour of the building required.',
  explanation:
    'Graphical apps (Files, VS Code, SKONGA itself) are one interface. The terminal is another interface to the same machine.\n\nA command has a name, then optional arguments and flags:\n\nls\nls -l\nls src\n\nOutput is text. Errors are also text — read them.\n\nThis course will not pretend SKONGA is your operating system. You learn the language here so a real shell later is not magic.',
  example: 'A conversation in text.',
  code: `$ pwd
/home/asha/skonga
$ ls
README.md  src`,
  lineByLine: [
    { line: '$', text: 'Prompt — the shell is ready (symbol varies).' },
    { line: 'pwd', text: 'A command: print working directory.' },
    { line: '/home/asha/skonga', text: 'The computer’s answer.' },
  ],
  predict: {
    prompt: 'If you type a command that does not exist, what should you expect?',
    answer: 'An error message naming the missing command — not a redesigned website.',
  },
  practice: {
    copy: 'Copy the sample conversation by hand. Label which lines are human, which are computer.',
    modify: 'Rewrite the sample as if your folder is called academy.',
    create: 'Write a 4-line comic: You, Shell, You, Shell.',
  },
  mistake: 'Thinking the terminal is only for “hackers” or that it replaces HTML.',
  debug: {
    broken: 'Clicking around waiting for pwd to appear as a purple button inside Code Lab.',
    hint: 'pwd is a shell command. Code Lab runs HTML/CSS/JS. Learn pwd on paper (or Termux later).',
  },
  guidedChallenge: 'Name two interfaces to the same computer: one graphical, one text.',
  independentChallenge: 'Explain to a classmate why errors in the terminal are useful.',
  quiz: [
    q('The terminal mainly exchanges…', ['Text commands and text output', 'Only CSS colours', 'APK signatures'], 0, 'Text in, text out.'),
    q('A missing command usually produces…', ['An error message', 'A new CSS grid', 'Silent success always'], 0, 'Read the error.'),
    q('Does SKONGA v1 run pwd for you?', ['No — learn it here, run later on a real shell', 'Yes, inside the iframe Python', 'Only on GitHub.com automatically'], 0, 'No OS sandbox.'),
  ],
  takeaways: ['Terminal = text interface.', 'Commands are verbs.', 'No fake shell in v1.'],
  cheatSheet: 'prompt → command → output or error',
  youCanNow: 'Describe what a shell is for.',
  nextId: 'term-02',
})

const term02 = paper({
  id: 'term-02',
  title: 'pwd, ls, and cd',
  order: 2,
  prerequisites: ['term-01'],
  goal: 'You can say where you are (pwd), list a folder (ls), and change folder (cd).',
  why: 'Every other command is dangerous if you do not know which folder you are in.',
  concept: 'The shell has a current working directory. pwd prints it. ls lists names in it. cd changes it.',
  analogy: 'You are standing in a room (pwd). ls is looking at the furniture. cd is walking into another room.',
  explanation:
    'pwd — print working directory (full path).\nls — list files and folders in the current directory.\nls src — list inside src without going there.\ncd src — enter src.\ncd .. — go up one folder.\ncd — (alone, on many systems) go home.\n\nAfter cd, pwd should change. If it did not, the path was wrong.',
  example: 'Move into a project.',
  code: `$ pwd
/home/asha
$ ls
skonga-academy
$ cd skonga-academy
$ pwd
/home/asha/skonga-academy
$ ls
README.md  package.json  src`,
  lineByLine: [
    { line: 'pwd', text: 'Where am I?' },
    { line: 'ls', text: 'What is in this folder?' },
    { line: 'cd skonga-academy', text: 'Enter that folder.' },
    { line: 'cd ..', text: 'Up one level (not shown; you should still know it).' },
  ],
  predict: {
    prompt: 'After cd skonga-academy, what should pwd contain?',
    answer: 'A path ending in skonga-academy.',
  },
  practice: {
    copy: 'Trace the sample. After each command write the new “room”.',
    modify: 'Add a step: cd src then pwd. Write the new path.',
    create: 'From /home/asha/skonga-academy/src, write the cd .. command and the pwd you expect.',
  },
  mistake: 'cd into a file (not a folder), or assuming ls changes the current directory (it does not).',
  debug: {
    broken: '$ ls src\n$ pwd   # still the parent, learner confused',
    hint: 'ls looks. cd moves. pwd reports. Looking is not walking.',
  },
  guidedChallenge: 'Order: pwd, ls, cd, pwd.',
  independentChallenge: 'Map a three-folder tree on paper and walk it with cd / ls / pwd.',
  quiz: [
    q('Which command changes folder?', ['cd', 'ls', 'print()'], 0, 'cd = change directory.'),
    q('ls by itself…', ['Lists the current folder', 'Deletes Git', 'Always moves you home'], 0, 'List, do not move.'),
    q('cd .. goes…', ['Up one folder', 'To GitHub.com', 'Into package.json'], 0, 'Parent directory.'),
  ],
  takeaways: ['pwd = where.', 'ls = what.', 'cd = walk.'],
  cheatSheet: 'pwd · ls · cd folder · cd ..',
  youCanNow: 'Navigate a folder tree on paper.',
  nextId: 'term-03',
})

const term03 = paper({
  id: 'term-03',
  title: 'mkdir, touch, cp, mv, rm',
  order: 3,
  prerequisites: ['term-02'],
  goal: 'You can create a folder and a file, copy or rename, and explain why rm is dangerous.',
  why: 'Projects are files. You must create and tidy them without guessing.',
  concept:
    'mkdir makes a directory. touch (or a redirect) can create an empty file. cp copies. mv moves or renames. rm deletes.',
  analogy: 'Workshop verbs: build a drawer, add a blank page, photocopy, relabel, throw away.',
  explanation:
    'mkdir notes\ntouch notes/day1.txt\ncp notes/day1.txt notes/backup.txt\nmv notes/backup.txt notes/day1-copy.txt\n\nrm notes/day1-copy.txt removes that file.\nrm -r folder removes a folder and its contents — easy to regret.\n\nThere is no reliable Recycle Bin in every shell. Treat rm as permanent unless you know your setup.',
  example: 'Make a notes drawer.',
  code: `mkdir notes
touch notes/day1.txt
cp notes/day1.txt notes/backup.txt
mv notes/backup.txt notes/day1-copy.txt
# rm notes/day1-copy.txt   # only when you mean it`,
  lineByLine: [
    { line: 'mkdir notes', text: 'Create folder notes.' },
    { line: 'touch notes/day1.txt', text: 'Create empty file (common on macOS/Linux).' },
    { line: 'cp A B', text: 'Copy A to B.' },
    { line: 'mv A B', text: 'Rename or move A to B.' },
  ],
  predict: {
    prompt: 'After cp notes/day1.txt notes/backup.txt, how many files exist in notes?',
    answer: 'Two: day1.txt and backup.txt.',
  },
  practice: {
    copy: 'Write the five verbs and one example each.',
    modify: 'Rename day1.txt to lesson.txt using mv. Write ls notes you expect.',
    create: 'Plan commands to make src/practice/hello.txt without using a GUI.',
  },
  mistake: 'rm -r on the wrong folder because pwd was not checked.',
  debug: {
    broken: 'rm notes',
    hint: 'notes is a directory. Plain rm may refuse or (with flags) destroy the tree. Check pwd. Prefer deleting a named file first.',
  },
  guidedChallenge: 'Write cp then ls. Predict two names.',
  independentChallenge: 'A “do / undo” pair: create a file, then the rm that removes only that file.',
  quiz: [
    q('mkdir creates…', ['A folder', 'A Git commit', 'A CSS class'], 0, 'Make directory.'),
    q('mv can…', ['Rename or move', 'Only print CSS', 'Run Python in the iframe'], 0, 'Move/rename.'),
    q('rm should be treated as…', ['Easy to regret — check pwd first', 'Always reversible everywhere', 'A flexbox property'], 0, 'Deletion is sharp.'),
  ],
  takeaways: ['Create with mkdir/touch.', 'Copy vs move.', 'rm needs pwd first.'],
  cheatSheet: 'mkdir · touch · cp · mv · rm',
  youCanNow: 'Describe file-surgery commands safely.',
  nextId: 'term-04',
})

const term04 = paper({
  id: 'term-04',
  title: 'Relative vs absolute paths',
  order: 4,
  prerequisites: ['term-03'],
  goal: 'You can tell a path that starts at the filesystem root from a path that starts here.',
  why: 'Wrong path = command hits the wrong file. This is how people delete the wrong thing.',
  concept:
    'An absolute path starts from the root (often / on Linux, or a drive prefix on Windows). A relative path starts from the current working directory.',
  analogy:
    'Absolute: “Tanzania, Dar es Salaam, Street 12.” Relative: “two doors left of where I am standing.”',
  explanation:
    'If pwd is /home/asha/skonga-academy:\n\nAbsolute: /home/asha/skonga-academy/src/App.jsx\nRelative: src/App.jsx\nAlso relative: ./src/App.jsx  (dot means current folder)\nUpward: ../README.md\n\nHome shortcut on many shells: ~\n\nWindows users will see \\ and drive letters. The idea is the same: full address vs address from here.',
  example: 'Same file, two addresses.',
  code: `pwd
# /home/asha/skonga-academy
ls src/App.jsx
ls /home/asha/skonga-academy/src/App.jsx`,
  lineByLine: [
    { line: 'src/App.jsx', text: 'Relative to the current folder.' },
    { line: '/home/.../App.jsx', text: 'Absolute — works from any current folder (if the file exists).' },
    { line: '..', text: 'Parent of the current folder.' },
  ],
  predict: {
    prompt: 'pwd is /home/asha/skonga-academy/src. What is the relative path to package.json in the project root?',
    answer: '../package.json',
  },
  practice: {
    copy: 'Draw your project tree. Write one absolute and one relative path to README.',
    modify: 'From src/pages, write a relative path to src/data/curriculum/web.js.',
    create: 'Three paths to the same imagined file notes/day1.txt from three different pwd values.',
  },
  mistake: 'Starting a relative path with / by accident — that becomes absolute from the system root.',
  debug: {
    broken: 'cd src   # already inside src\ncd src   # error or empty surprise',
    hint: 'Second src is relative. There is no src/src. Use pwd first.',
  },
  guidedChallenge: 'Translate ./src and /src — they are not the same.',
  independentChallenge: 'Explain . and .. in one sentence each.',
  quiz: [
    q('A path starting with / on Linux is usually…', ['Absolute', 'A CSS id', 'A Git branch required'], 0, 'From the root.'),
    q('.. means…', ['Parent folder', 'Delete git', 'Print types'], 0, 'Up one.'),
    q('. means…', ['Current folder', 'A Python dict', 'npm publish'], 0, 'Here.'),
  ],
  takeaways: ['Absolute = full address.', 'Relative = from pwd.', '/src ≠ ./src.'],
  cheatSheet: '/absolute/path · relative/path · . · .. · ~',
  youCanNow: 'Choose the right kind of address.',
  nextId: 'term-05',
})

const term05 = paper({
  id: 'term-05',
  title: 'Reading command output and flags',
  order: 5,
  prerequisites: ['term-04'],
  goal: 'You can recognise a flag (like -l or --help) and use --help / man as a habit instead of guessing.',
  why: 'Flags change a command’s behaviour. Guessing -r on rm is how folders disappear.',
  concept: 'A flag is an option, often starting with - or --. Commands can print their own help.',
  analogy: 'The verb is “walk”. Flags are “slowly” or “backwards”. Same verb, different manner.',
  explanation:
    'ls -l  (long listing)\nls -a  (include hidden names starting with .)\nls -la (flags can combine on many commands)\n\nMany commands support:\ncommand --help\n\nRead the first paragraph of help before adding dangerous flags.\n\nExit codes: 0 often means success. Non-zero often means failure. You do not need to memorise codes yet — notice that failure is a value, not a mood.',
  example: 'Ask a command who it is.',
  code: `ls --help
# or
ls -l
echo $?
# 0 often means the last command succeeded`,
  lineByLine: [
    { line: '-l', text: 'Short flag.' },
    { line: '--help', text: 'Long flag asking for help text.' },
    { line: '$?', text: 'Last exit code on many shells (optional extra).' },
  ],
  predict: {
    prompt: 'Does ls -l change the current directory?',
    answer: 'No. It only changes how the listing is printed.',
  },
  practice: {
    copy: 'Write three flags you met: -l, -a, --help and what you think they do.',
    modify: 'Invent a safe experiment: ls --help vs ls -l. What kind of output is each?',
    create: 'A personal rule: “I do not add -r to rm unless I can say pwd out loud.”',
  },
  mistake: 'Copying a flag from the internet onto rm without reading it.',
  debug: {
    broken: 'rm -rf /  # never practise this',
    hint: 'Do not run destruction examples. Learn that -r + wrong path is catastrophic. Use help on ls instead.',
  },
  guidedChallenge: 'Match -a with “include hidden files” for ls.',
  independentChallenge: 'Write how you would ask any new command for help.',
  quiz: [
    q('A flag…', ['Changes how a command behaves', 'Is a CSS colour token required', 'Commits to GitHub automatically'], 0, 'Options.'),
    q('A safe first extra argument to try is often…', ['--help', '-rf /', 'force push'], 0, 'Help first.'),
    q('ls -l …', ['Lists in a longer format', 'Deletes src', 'Starts Vite'], 0, 'Format flag.'),
  ],
  takeaways: ['Flags modify verbs.', 'Help before danger.', 'Success/failure is an exit code.'],
  cheatSheet: 'cmd --help · ls -l · ls -a',
  youCanNow: 'Treat flags as meaningful, not decoration.',
  nextId: 'git-01',
})

const git01 = paper({
  id: 'git-01',
  title: 'Why Git?',
  order: 1,
  prerequisites: ['term-02'],
  goal: 'You can explain Git as version history for files — undo and time travel — not as “the website GitHub”.',
  why: 'Without history, every experiment risks destroying the last working page.',
  concept:
    'Git is software that records snapshots of a folder. GitHub (and similar hosts) are websites that store copies of those snapshots. They are related, not identical.',
  analogy:
    'Git is the camera and the photo album on your desk. GitHub is a locker at school where you can also keep copies of the album.',
  explanation:
    'A repository (repo) is a folder Git is watching, plus hidden Git data (often a .git directory).\n\nA commit is one snapshot with a message: what changed and why.\n\nYou can work offline with Git. The network is only needed to talk to a remote (GitHub).\n\nSKONGA Academy’s own repo is an example of this idea — you do not need to push from the lesson player.',
  example: 'Separate the tools.',
  code: `Git     = snapshots on a machine
GitHub = a hosting site for those snapshots
commit = one saved snapshot + message`,
  lineByLine: [
    { line: 'repository', text: 'A project folder under Git’s watch.' },
    { line: 'commit', text: 'A snapshot you chose to keep.' },
    { line: 'remote', text: 'Another place that also has the commits (often GitHub).' },
  ],
  predict: {
    prompt: 'If the internet is down, can Git still commit locally?',
    answer: 'Yes. Commits are local until you push.',
  },
  practice: {
    copy: 'Write one sentence each for Git, GitHub, commit.',
    modify: 'Replace the camera analogy with a school exercise-book draft history.',
    create: 'List three reasons a learner wants yesterday’s working HTML back.',
  },
  mistake: 'Saying “I put it on Git” when you only uploaded a zip to chat.',
  debug: {
    broken: '“GitHub is Git.”',
    hint: 'GitHub hosts Git data. Git runs on your machine too.',
  },
  guidedChallenge: 'Which tool works offline: Git commits or the GitHub website UI?',
  independentChallenge: 'Explain why messages on commits matter to future-you.',
  quiz: [
    q('Git is…', ['Version-history software', 'Only a CSS framework', 'A phone brand'], 0, 'Snapshots.'),
    q('GitHub is…', ['A common host for Git remotes', 'The Python runtime in Code Lab', 'display:flex'], 0, 'Hosting.'),
    q('A commit is…', ['A snapshot + message', 'Always a live website', 'rm -rf'], 0, 'Chosen snapshot.'),
  ],
  takeaways: ['Git ≠ GitHub.', 'Commit = snapshot.', 'History is a learning tool.'],
  cheatSheet: 'Git local · remote host · commit',
  youCanNow: 'Separate camera from locker.',
  nextId: 'git-02',
})

const git02 = paper({
  id: 'git-02',
  title: 'init, status, add, commit',
  order: 2,
  prerequisites: ['git-01'],
  goal: 'You can describe the loop: see status, stage files, commit with a message.',
  why: 'This loop is 80% of daily Git. Branching waits until this is boring.',
  concept:
    'git init starts a repo. git status reports changes. git add stages files for the next snapshot. git commit records the snapshot.',
  analogy:
    'status = look at the desk. add = put chosen pages in the envelope. commit = seal the envelope and write what is inside.',
  explanation:
    'git init          # once per project folder\ngit status        # often\ngit add README.md\ngit commit -m "Add README"\n\nUntracked = Git sees a new file not in history.\nModified = file changed since last commit.\nStaged = chosen for the next commit.\n\nCommit messages should say why/what in human language, not only “update”.',
  example: 'First snapshot.',
  code: `git init
git status
git add README.md
git commit -m "Add README"`,
  lineByLine: [
    { line: 'git init', text: 'Create .git in this folder.' },
    { line: 'git status', text: 'What changed? What is staged?' },
    { line: 'git add', text: 'Stage path(s).' },
    { line: 'git commit -m "..."', text: 'Record a snapshot with a message.' },
  ],
  predict: {
    prompt: 'You edit App.jsx but do not add it. Does commit include App.jsx?',
    answer: 'No. Only staged files go into that commit.',
  },
  practice: {
    copy: 'Write the four-command loop in order.',
    modify: 'Write a better message than “update” for adding a CSS lesson file.',
    create: 'A status story: one untracked file, then after add, then after commit.',
  },
  mistake: 'git add . forever without reading status — secrets and junk get committed.',
  debug: {
    broken: 'git commit -m "update"   # nothing staged',
    hint: 'status first. add the files you intend. Then commit.',
  },
  guidedChallenge: 'Order: init, status, add, commit, status.',
  independentChallenge: 'Write two commit messages for: (1) first HTML page (2) fix missing quote.',
  quiz: [
    q('git add does…', ['Stage files for the next commit', 'Deploy Vercel', 'Run Python'], 0, 'Staging.'),
    q('A commit without add…', ['Omits unstaged changes', 'Always uploads APK', 'Deletes src'], 0, 'Staging area matters.'),
    q('status is used…', ['Often, to see the truth', 'Once in a lifetime', 'Only inside CSS'], 0, 'Look before you seal.'),
  ],
  takeaways: ['status → add → commit.', 'Messages are part of the work.', 'Do not stage blindly.'],
  cheatSheet: 'init · status · add · commit -m',
  youCanNow: 'Describe a first honest snapshot.',
  nextId: 'git-03',
})

const git03 = paper({
  id: 'git-03',
  title: 'branch and merge',
  order: 3,
  prerequisites: ['git-02'],
  goal: 'You can explain a branch as a movable label on commits, and merge as combining lines of work.',
  why: 'Trying an idea on the same line as your working page is how good work gets tangled.',
  concept:
    'main (or master) is usually the stable line. A branch is another line of commits. merge brings a line back.',
  analogy:
    'The class exercise book is main. A rough draft booklet is a branch. Merging copies the good draft pages back into the official book.',
  explanation:
    'git branch experiment\ngit switch experiment    # or git checkout experiment\n# ...commits on experiment...\ngit switch main\ngit merge experiment\n\nConflicts happen when both lines edited the same part of a file. Git then asks you to choose text. That is normal, not shame.\n\nYou do not need to merge from SKONGA’s UI. Understand the picture first.',
  example: 'Two labels.',
  code: `git switch -c experiment
git commit -m "Try a purple heading"
git switch main
git merge experiment`,
  lineByLine: [
    { line: 'switch -c experiment', text: 'Create and move to branch experiment.' },
    { line: 'commits on experiment', text: 'main does not move yet.' },
    { line: 'merge experiment', text: 'Bring those commits into the current branch (main).' },
  ],
  predict: {
    prompt: 'If you commit only on experiment, does main’s last commit change immediately?',
    answer: 'No. main stays until you merge (or reset — do not reset yet).',
  },
  practice: {
    copy: 'Draw main as a line and experiment as a side line that rejoins.',
    modify: 'Name a branch for “bio page colours” using only letters and hyphens.',
    create: 'Write when you would NOT merge yet (tests failing, page broken).',
  },
  mistake: 'Doing experimental deletes on main because “it is just one file”.',
  debug: {
    broken: 'merge conflict markers left in the file: <<<<<<<',
    hint: 'Those marks are Git asking you to edit. Remove the marks after choosing the correct lines, then commit.',
  },
  guidedChallenge: 'Give one reason to branch before restyling the profile card.',
  independentChallenge: 'Explain a conflict in one sentence to a non-coder.',
  quiz: [
    q('A branch is…', ['A line of commits with a name', 'A CSS media query', 'An APK'], 0, 'Named line.'),
    q('merge…', ['Combines another line into the current branch', 'Deletes GitHub', 'Runs npm'], 0, 'Join lines.'),
    q('Conflict means…', ['Two lines touched the same part', 'Python failed in Code Lab', 'The terminal is illegal'], 0, 'Same region edited twice.'),
  ],
  takeaways: ['Branch to try.', 'Merge to keep.', 'Conflicts are editable text.'],
  cheatSheet: 'switch -c name · commit · switch main · merge',
  youCanNow: 'Picture a side line of work.',
  nextId: 'git-04',
})

const git04 = paper({
  id: 'git-04',
  title: 'clone, push, and pull',
  order: 4,
  prerequisites: ['git-03'],
  goal: 'You can explain clone (copy a remote repo), push (send commits), and pull (bring commits).',
  why: 'School computers, phones, and teammates do not share one disk. Remotes move history.',
  concept:
    'clone copies a repo from a URL. remote is a nickname (often origin). push sends your commits. pull fetches and integrates theirs.',
  analogy:
    'clone = photocopy the album from the locker. push = put new photos in the locker. pull = bring locker photos back to your desk.',
  explanation:
    'git clone https://github.com/owner/skonga-academy-v1.git\ncd skonga-academy-v1\ngit remote -v\ngit push origin main\ngit pull origin main\n\nPush needs permission on that repo. Pull needs a network.\n\nNever put secrets (.env passwords) in commits you will push.',
  example: 'Talk to origin.',
  code: `git clone <url>
git remote -v
git pull
git push`,
  lineByLine: [
    { line: 'clone', text: 'Get history + files + .git.' },
    { line: 'remote -v', text: 'Show where origin points.' },
    { line: 'pull', text: 'Update from remote.' },
    { line: 'push', text: 'Publish local commits.' },
  ],
  predict: {
    prompt: 'You committed locally but never pushed. Does GitHub.com show the commit?',
    answer: 'No. The remote does not know until push (or another upload).',
  },
  practice: {
    copy: 'Map clone / push / pull to locker verbs.',
    modify: 'Write why .env should be in .gitignore before push.',
    create: 'A checklist before first push: status clean? message sane? no secrets?',
  },
  mistake: 'Force-pushing as a beginner habit. Do not practise --force here.',
  debug: {
    broken: 'push rejected (remote has commits you lack)',
    hint: 'Usually pull (or fetch + merge) first, then push. Read the error; do not invent --force.',
  },
  guidedChallenge: 'Which command creates the folder from a URL?',
  independentChallenge: 'Explain origin in one line.',
  quiz: [
    q('clone…', ['Copies a repo including history', 'Only zips node_modules', 'Runs the lesson quiz'], 0, 'Full copy.'),
    q('push…', ['Sends local commits to a remote', 'Deletes main forever safely', 'Styles flex'], 0, 'Publish commits.'),
    q('pull…', ['Brings remote commits to you', 'Is a CSS selector', 'Prints Python types'], 0, 'Update from remote.'),
  ],
  takeaways: ['clone once.', 'push / pull often.', 'No secrets in history.'],
  cheatSheet: 'clone · remote · pull · push',
  youCanNow: 'Describe how two machines share Git history.',
  nextId: 'npm-01',
})

const npm01 = paper({
  id: 'npm-01',
  title: 'npm and package.json',
  order: 5,
  prerequisites: ['term-02'],
  goal: 'You can explain package.json as the project’s ingredient list and npm install as fetching those ingredients.',
  why: 'SKONGA itself uses npm. Without this map, node_modules looks like a virus.',
  concept:
    'package.json names the project and its dependencies. npm install reads it and fills node_modules. You rarely edit node_modules by hand.',
  analogy:
    'package.json is the recipe. npm install goes to the market. node_modules is the grocery bag — huge, generated, not hand-authored.',
  explanation:
    'Scripts live in package.json too:\n\n"dev": "vite"\n\nnpm run dev starts the script named dev.\n\nLockfiles (package-lock.json) freeze exact versions so install is repeatable.\n\nDo not commit node_modules. Do commit package.json and the lockfile.',
  example: 'SKONGA-style scripts.',
  code: `{
  "name": "skonga-academy",
  "scripts": { "dev": "vite", "build": "vite build" },
  "dependencies": { "react": "^18.3.1" }
}

# npm install
# npm run dev`,
  lineByLine: [
    { line: 'dependencies', text: 'Libraries the app imports.' },
    { line: 'scripts.dev', text: 'Named command for local work.' },
    { line: 'npm install', text: 'Create/update node_modules from the recipe.' },
  ],
  predict: {
    prompt: 'After cloning a JS app, why run npm install before npm run dev?',
    answer: 'dev tools and libraries are not in Git; install rebuilds them from package.json.',
  },
  practice: {
    copy: 'Write what you commit vs what you generate (node_modules).',
    modify: 'Name the script you would run to start SKONGA locally.',
    create: 'A three-step card: clone → install → run dev.',
  },
  mistake: 'Deleting package.json to “clean the project” while keeping node_modules.',
  debug: {
    broken: 'npm run dev  # missing script / missing install',
    hint: 'Read the error. Usually: wrong folder, no install, or script name mismatch.',
  },
  guidedChallenge: 'Why is node_modules in .gitignore?',
  independentChallenge: 'Explain lockfiles in one sentence.',
  quiz: [
    q('package.json is…', ['The recipe and script list', 'The Code Lab iframe', 'A Git branch required'], 0, 'Manifest.'),
    q('npm install…', ['Fetches dependencies', 'Commits to main', 'Writes CSS only'], 0, 'Market run.'),
    q('You usually commit…', ['package.json + lockfile, not node_modules', 'Only node_modules', 'Only .env secrets'], 0, 'Recipe in Git.'),
  ],
  takeaways: ['Recipe vs groceries.', 'install then run.', 'Ignore node_modules.'],
  cheatSheet: 'package.json · npm install · npm run dev',
  youCanNow: 'Map SKONGA’s own install/run loop.',
  nextId: 'dbg-01',
})

const dbg01 = labLesson({
  id: 'dbg-01',
  title: 'Debugging in the browser',
  order: 6,
  prerequisites: ['js-01'],
  goal: 'You can read a console error, find the bad line, fix it, and Run again.',
  why: 'Breaking code on purpose teaches more than copying perfect snippets.',
  concept:
    'An error is a message with a location. Fix the first error first. Re-run. Do not change five things at once.',
  analogy:
    'A teacher circling one line in red. You correct that line, then see if another circle appears.',
  explanation:
    'In Code Lab, the console under the preview shows log, warn, and error.\n\nTypical JS mistakes: missing quotes, using a name that does not exist, calling a method on null.\n\nProcess:\n1) Read the message\n2) Predict the cause\n3) Change one thing\n4) Run\n5) Confirm the message is gone\n\nThis lesson’s lab starts broken on purpose.',
  example: 'NameError-style reference in JS.',
  code: `// broken:
document.getElementById("out").textContent = hello
// fixed:
document.getElementById("out").textContent = "hello"`,
  lineByLine: [
    { line: 'hello without quotes', text: 'JS looks for a variable named hello.' },
    { line: '"hello"', text: 'A string — what we meant.' },
  ],
  predict: {
    prompt: 'What does the console show if hello is not defined?',
    answer: 'A ReferenceError (or similar) naming hello.',
  },
  practice: {
    copy: 'Run the broken starter. Read the console. Do not fix yet. Write the error words.',
    modify: 'Add quotes. Run. Confirm the page says hello and the error is gone.',
    create: 'Break it again on purpose (wrong id). Fix by matching the HTML id.',
  },
  mistake: 'Editing CSS randomly because the console mentioned JavaScript.',
  debug: {
    broken: 'document.getElementById("out").textContent = hello',
    hint: 'Quote the string, or define const hello = "hello" first.',
  },
  guidedChallenge: 'After the fix, log a second line that does not error.',
  independentChallenge: 'Introduce a null querySelector bug and write the message you see.',
  quiz: [
    q('First response to a red console line is…', ['Read it', 'Delete the project', 'Add more CSS until it vanishes'], 0, 'Read first.'),
    q('Change…', ['One thing, then Run', 'Everything at once', 'Only Git remotes'], 0, 'Scientific fix.'),
    q('This lab runtime is…', ['HTML/CSS/JS in Code Lab', 'Python in the iframe', 'A real OS shell'], 0, 'Browser only.'),
  ],
  takeaways: ['Errors are data.', 'One change per Run.', 'Console is part of school.'],
  cheatSheet: 'read error → one fix → Run',
  youCanNow: 'Treat a red line as a lesson, not a verdict.',
  nextId: 'tools-project',
  lab: labHtml(
    `<h1>Debug lab</h1>
<p id="out">…</p>`,
    'body{font-family:system-ui,sans-serif;padding:24px}',
    `// Intentionally broken starter — fix it.
document.getElementById("out").textContent = hello
console.log("If you see this after the fix, good.")`
  ),
})

const toolsProject = paper({
  id: 'tools-project',
  title: 'Tools project — Snapshot checklist',
  order: 7,
  estimatedMinutes: 30,
  prerequisites: ['term-02', 'git-02', 'npm-01'],
  goal: 'You can write a complete checklist for: know your folder, save a Git snapshot, and install/run a JS app.',
  why: 'Tools matter when they become a ritual you can repeat on a real project (including SKONGA).',
  concept: 'A personal runbook beats scattered command trivia.',
  analogy: 'A pilot checklist: not because flying is mysterious, because skipping a step is expensive.',
  explanation:
    'Write (on paper or in a notes file you might later commit) a checklist with three acts:\n\nA. Folder — pwd, ls, cd to the project root\nB. Snapshot — status, add specific files, commit with a real message\nC. App — npm install if needed, npm run dev\n\nAdd one safety line about rm and one about .env.\n\nYou are not required to perform this on GitHub to complete the lesson.',
  example: 'Skeleton.',
  code: `1. pwd / ls / cd <project>
2. git status
3. git add <files I intend>
4. git commit -m "meaningful message"
5. npm install   # if node_modules missing
6. npm run dev
7. Never commit .env`,
  practice: {
    copy: 'Copy the skeleton and fill folder names for SKONGA Academy.',
    modify: 'Add a “before rm” line that includes pwd.',
    create: 'Your own 8-line runbook with no copied junk commands.',
  },
  mistake: 'A checklist that only says “use Git” with no verbs.',
  debug: {
    broken: 'npm run dev while pwd is not the project root',
    hint: 'Act A first. Scripts live with package.json.',
  },
  guidedChallenge: 'Write the commit message you would use after finishing this lesson’s notes.',
  independentChallenge: 'Share the runbook idea in Community tagged tools (optional account).',
  quiz: [
    q('status belongs…', ['Before add/commit', 'After deleting .git for fun', 'Only in CSS comments'], 0, 'Look first.'),
    q('npm run dev needs…', ['The project root with package.json', 'A Python iframe', 'rm -rf first'], 0, 'Right folder.'),
    q('This project is complete when…', ['The written runbook + quiz are done', 'Code Lab runs git init', 'An APK appears'], 0, 'No fake OS.'),
  ],
  takeaways: ['Ritual > trivia.', 'Folder then snapshot then run.', 'Safety lines are curriculum.'],
  cheatSheet: 'pwd → status → add → commit → install → dev',
  youCanNow: 'Carry a tools runbook into the next level.',
  nextId: 'be-01',
})

export const tools = {
  id: 'tools',
  level: 3,
  title: 'Developer Tools',
  blurb: 'Terminal, Git, npm, and browser debug — honest about what SKONGA can run.',
  status: 'NEW',
  modules: [
    {
      id: 'cli',
      title: 'Terminal',
      goal: 'Navigate and name files without a fake shell.',
      lessons: [term01, term02, term03, term04, term05],
    },
    {
      id: 'git',
      title: 'Git and GitHub',
      goal: 'Snapshot locally; understand remotes.',
      lessons: [git01, git02, git03, git04, npm01],
    },
    {
      id: 'debug',
      title: 'Debug & project',
      goal: 'Fix a real JS error in Code Lab; write a runbook.',
      lessons: [dbg01, toolsProject],
    },
  ],
}
