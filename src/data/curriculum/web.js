import { lesson, q, labHtml } from './lessonFactory'

/**
 * LEVEL 2 — Web Development
 * Provenance: NEW curriculum for SKONGA Academy v1 (not recovered).
 * HTML / CSS / JS modules: NEW-complete (authored for Academy v1, not recovered).
 */
import { cssLessons } from './css'
import { jsLessons } from './javascript'

const baseCss = 'body{font-family:system-ui,sans-serif;padding:24px;line-height:1.5;max-width:40rem;margin:0 auto;color:#111}'

const web01 = lesson({
  id: 'web-01',
  title: 'How the Web Works',
  order: 1,
  status: 'NEW-complete',
  estimatedMinutes: 18,
  difficulty: 'beginner',
  goal: 'You can explain request → response → browser render in plain language.',
  prerequisites: ['found-01'],
  why: 'If a page “just appears” in your mind, every error feels like magic. This lesson removes the magic.',
  concept:
    'When you open a website, your browser asks another computer for files. That computer (a server) sends files back. Your browser reads them and draws the page.',
  analogy:
    'You order food at a window. You make a request. The kitchen (server) prepares a plate (response). You eat at your table (the browser window). If the kitchen is closed, you get no plate — that is an error, not “food magic”.',
  explanation:
    'A URL is an address (like a shop name). Your browser sends a request across the network. A server answers with files — often HTML first, then CSS and JavaScript.\n\nHTML describes structure (headings, paragraphs, links). CSS describes look. JavaScript describes behaviour.\n\nIn SKONGA Code Lab you act as both kitchen and table: you write the files and the browser preview shows the result on your device. You do not need the public internet for those exercises.',
  example: 'Typing a school website address starts a request for its HTML file.',
  code: `Browser:  "Please send /index.html"
Server:   "Here is the file" + HTML text
Browser:  reads tags → draws the page`,
  lineByLine: [
    { line: 'Browser request', text: 'Asks for a resource at a URL.' },
    { line: 'Server response', text: 'Sends files or an error status.' },
    { line: 'Render', text: 'Browser turns HTML/CSS/JS into what you see.' },
  ],
  predict: {
    prompt: 'If the server is offline, what does the browser show?',
    answer: 'An error or “cannot connect”. No page files arrived to render.',
  },
  practice: {
    copy: 'Retell the request → response → render story in three sentences.',
    modify: 'Replace the food analogy with a library borrowing books analogy.',
    create: 'Write a short comic-style script with two characters: Browser and Server.',
  },
  tryIt: 'Say out loud who sends the request and who sends the response.',
  modify: 'Add one sentence about what HTML is for.',
  experiment: 'Later in Code Lab, notice you can “serve” a page to yourself without a real website online.',
  mistake: 'Thinking the website lives inside the Wi‑Fi router only.',
  debug: {
    broken: '“Code Lab needs Wi‑Fi or the HTML will not exist.”',
    hint: 'Your HTML is a file you type. Preview can work offline for local content.',
  },
  guidedChallenge: 'Order these: render, request, response.',
  independentChallenge: 'Explain to a classmate why the same HTML can open on a phone and a laptop.',
  quiz: [
    q('Who usually draws HTML into a visible page?', ['The server', 'The browser', 'The charger'], 1, 'Servers send files; browsers render.'),
    q('HTML arriving over the network is mostly…', ['Pictures only', 'Text with tags', 'A battery setting'], 1, 'HTML is text.'),
    q('In Code Lab, who provides the HTML file?', ['Only Google', 'You (the learner)', 'The phone company'], 1, 'You write it; the preview shows it.'),
  ],
  assessment: [{ q: 'Describe request, response, and render in your own words.', type: 'short' }],
  takeaways: [
    'Browsers ask; servers answer; browsers draw.',
    'HTML/CSS/JS are files.',
    'Code Lab lets you practise without deploying a public site first.',
  ],
  cheatSheet: 'URL → request → files → render',
  youCanNow: 'Explain what happens after you press Enter in the address bar.',
  nextId: 'web-02',
  completion: { requireQuiz: true, requireLab: false },
})

const web02 = lesson({
  id: 'web-02',
  title: 'Your first HTML document',
  order: 2,
  status: 'NEW-complete',
  estimatedMinutes: 25,
  difficulty: 'beginner',
  goal: 'You can write a valid HTML page with doctype, html, head, and body, and run it in Code Lab.',
  prerequisites: ['web-01'],
  why: 'Every website starts as a document the browser knows how to read. If the skeleton is wrong, later CSS and JavaScript have nowhere solid to live.',
  concept:
    'HTML is a text document made of tags. Tags are words in angle brackets that mark the meaning of content. The browser builds a structure from those tags and shows the page.',
  analogy:
    'A house plan: the outer walls are html. The title documents and permits live in head (not the living room). The rooms people walk through are body.',
  explanation:
    'Most tags come in pairs: an opening tag like <h1> and a closing tag like </h1>. The content sits between them.\n\n<!DOCTYPE html> tells the browser to use modern HTML rules.\n<html> wraps the whole document.\n<head> holds information about the page (title, character set).\n<body> holds what the visitor is meant to see.\n\nYou will type this in Code Lab and press Run. The preview should show your heading on the page.',
  example: 'Smallest useful page: a title and one heading.',
  code: `<!DOCTYPE html>
<html lang="sw">
  <head>
    <meta charset="UTF-8" />
    <title>Ukurasa wangu</title>
  </head>
  <body>
    <h1>Habari SKONGA</h1>
  </body>
</html>`,
  lineByLine: [
    { line: '<!DOCTYPE html>', text: 'Declares modern HTML5.' },
    { line: '<html lang="sw">', text: 'Root element; lang helps tools and accessibility.' },
    { line: '<head>…</head>', text: 'Metadata about the document.' },
    { line: '<meta charset="UTF-8" />', text: 'Use a character set that supports many languages.' },
    { line: '<title>…</title>', text: 'Name of the document (browser tab).' },
    { line: '<body>…</body>', text: 'Visible content.' },
    { line: '<h1>…</h1>', text: 'Main heading on the page.' },
  ],
  predict: {
    prompt: 'What should appear as the main text on the page after Run?',
    answer: 'The heading text: Habari SKONGA (unless you changed it).',
  },
  practice: {
    copy: 'Open Code Lab from this lesson. Run the starter without changing it. Confirm the heading shows.',
    modify: 'Change the title to your name. Change the h1 to a Kiswahili greeting of your choice. Run again.',
    create:
      'In Code Lab, keep the skeleton and add a short paragraph under the heading that introduces you (use <p>…</p>). Do not look at a finished solution first.',
  },
  tryIt: 'Open in Code Lab and press Run.',
  modify: 'Edit title and h1, then Run.',
  experiment: 'Temporarily remove </body> and Run. Note that browsers may still show content, but the document is incomplete — fix it again.',
  mistake: 'Putting the visible heading only inside <head>. Head is not the living room.',
  debug: {
    broken: '<html><title>Hi</title><h1>Hello</h1></html>',
    hint: 'Put title inside head. Put h1 inside body.',
  },
  guidedChallenge: 'Add one <p> under the h1 that says which school subject you like.',
  independentChallenge: 'Build a one-screen “About me” page: title, h1, two paragraphs.',
  quiz: [
    q('Where does the document title belong?', ['body', 'head', 'after the last paragraph only'], 1, 'title is metadata in head.'),
    q('What does <!DOCTYPE html> do?', ['Draws a purple box', 'Declares HTML5', 'Deletes CSS'], 1, 'It selects the HTML5 mode.'),
    q('Which element wraps visible page content?', ['head', 'meta', 'body'], 2, 'body is visible content.'),
  ],
  assessment: [
    { q: 'List the outer skeleton tags of an HTML page in order.', type: 'short' },
  ],
  takeaways: [
    'HTML is structure written with tags.',
    'head = about the page; body = the page people see.',
    'Code Lab Run shows your document immediately.',
  ],
  cheatSheet: '<!DOCTYPE html> → <html> → <head> + <body>',
  youCanNow: 'Create a valid blank page and display a heading in the preview.',
  nextId: 'web-03',
  lab: labHtml(
    `<!DOCTYPE html>
<html lang="sw">
<head>
  <meta charset="UTF-8" />
  <title>Ukurasa wangu</title>
</head>
<body>
  <h1>Habari SKONGA</h1>
</body>
</html>`,
    baseCss,
    ''
  ),
  completion: { requireQuiz: true, requireLab: true },
})

const web03 = lesson({
  id: 'web-03',
  title: 'Text and headings',
  order: 3,
  status: 'NEW-complete',
  estimatedMinutes: 20,
  difficulty: 'beginner',
  goal: 'You can structure a page with one main h1, supporting headings, and paragraphs.',
  prerequisites: ['web-02'],
  why: 'Headings are the outline of your page. Screen readers and humans both use them to scan.',
  concept: 'h1–h6 mark headings by rank. p marks a paragraph. Use headings for structure, not only for decoration.',
  analogy: 'A book has one title, chapter titles, then section titles, then paragraphs of text.',
  explanation:
    'A simple page usually has one main h1. Use h2 for major sections under that. Do not skip ranks only to get a size you like — size is a CSS job later.\n\n<p> wraps normal sentences. Keep paragraphs focused.',
  example: 'Title, section, paragraph.',
  code: `<h1>SKONGA Academy</h1>
<h2>Web Development</h2>
<p>We build pages one clear idea at a time.</p>
<p>This is a second paragraph.</p>`,
  lineByLine: [
    { line: '<h1>', text: 'Main title of this page.' },
    { line: '<h2>', text: 'Section under the main title.' },
    { line: '<p>', text: 'A paragraph of text.' },
  ],
  predict: {
    prompt: 'How many h1 elements should a simple single-topic page usually have?',
    answer: 'One main h1.',
  },
  practice: {
    copy: 'Run the starter and read the outline out loud: h1, then h2, then paragraphs.',
    modify: 'Change the h2 to “HTML basics” and rewrite both paragraphs about yourself.',
    create: 'Write a page outline for “My favourite subject” with h1, two h2 sections, and one paragraph each.',
  },
  tryIt: 'Run the lab starter.',
  modify: 'Edit headings and paragraphs, Run.',
  experiment: 'Try two h1 headings. Notice the outline becomes less clear.',
  mistake: 'Using h3 only because it looks smaller, while skipping h1/h2.',
  debug: {
    broken: '<p>My Title</p><h1>Details...</h1>',
    hint: 'The main title should be the h1; details belong in paragraphs or lower headings.',
  },
  guidedChallenge: 'Add an h2 called “About me” and one paragraph under it.',
  independentChallenge: 'Make a mini article: h1, two h2s, three paragraphs total.',
  quiz: [
    q('A simple page should usually have…', ['As many h1 as possible', 'One main h1', 'Zero headings'], 1, 'One main heading keeps the outline clear.'),
    q('Paragraph text belongs in…', ['<title>', '<p>', '<!DOCTYPE>'], 1, 'p is for paragraphs.'),
    q('Heading rank is mainly about…', ['Structure/outline', 'Only colour', 'Battery percent'], 0, 'Headings structure content.'),
  ],
  assessment: [{ q: 'Why is one main h1 helpful?', type: 'short' }],
  takeaways: ['Headings form an outline.', 'Paragraphs hold normal text.', 'Pick rank for meaning; style comes later.'],
  cheatSheet: 'h1 page title · h2 section · p paragraph',
  youCanNow: 'Write a readable text structure in HTML.',
  nextId: 'web-04',
  lab: labHtml(
    `<h1>SKONGA Academy</h1>
<h2>Web Development</h2>
<p>We build pages one clear idea at a time.</p>
<p>This is a second paragraph.</p>`,
    baseCss,
    ''
  ),
  completion: { requireQuiz: true, requireLab: true },
})

const web04 = lesson({
  id: 'web-04',
  title: 'Links',
  order: 4,
  status: 'NEW-complete',
  estimatedMinutes: 18,
  difficulty: 'beginner',
  goal: 'You can create links to another page and to a place on the same page.',
  prerequisites: ['web-03'],
  why: 'The web is a web because pages point to each other.',
  concept: 'The <a> element (anchor) creates a link. The href attribute holds the destination address.',
  analogy: 'A door sign that also contains the address of the room behind the door.',
  explanation:
    'Write clickable text between <a> and </a>. Put the destination in href.\n\nExamples of href values:\n- https://example.com — a page on the web\n- about.html — another file in your project\n- #contact — an element on the same page whose id is contact',
  example: 'A link out and a jump link on the same page.',
  code: `<p><a href="https://example.com">Visit example</a></p>
<p><a href="#bottom">Jump to the bottom</a></p>
<p>More content here...</p>
<p id="bottom">You arrived at the bottom.</p>`,
  lineByLine: [
    { line: '<a href="...">', text: 'Opens an anchor; href is the destination.' },
    { line: 'Link text', text: 'What the user reads and clicks.' },
    { line: 'id="bottom"', text: 'A target on this page for #bottom.' },
  ],
  predict: { prompt: 'What attribute sets where the link goes?', answer: 'href' },
  practice: {
    copy: 'Run the starter and inspect the links.',
    modify: 'Change the external link text and URL to a website you know.',
    create: 'Add a third link that points to https://www.wikipedia.org with clear link text.',
  },
  tryIt: 'Run and inspect the links.',
  modify: 'Edit href values and labels.',
  experiment: 'Break href by removing the quotes and fix the error.',
  mistake: 'Writing <a> without href, or putting the URL as text only with no tag.',
  debug: { broken: '<a>Click me</a>', hint: 'Add href="https://example.com".' },
  guidedChallenge: 'Add a link to example.com with clear text.',
  independentChallenge: 'Build a mini resources list with three external links and one jump link.',
  quiz: [
    q('Which attribute sets the destination of a link?', ['src', 'href', 'link'], 1, 'Anchors use href.'),
    q('<a href="#team"> jumps to…', ['another website always', 'an element with id="team" on this page', 'the CSS file'], 1, '#id is same-page navigation.'),
    q('Link text should be…', ['Always “Click here” only', 'Clear about the destination', 'Empty'], 1, 'Readable text helps everyone.'),
  ],
  assessment: [{ q: 'Write one full anchor tag to https://example.com with sensible text.', type: 'short' }],
  takeaways: ['a + href makes links.', '#id jumps inside a page.', 'Clear link text matters.'],
  cheatSheet: '<a href="URL">text</a> · <a href="#id">jump</a>',
  youCanNow: 'Connect pages and sections with anchors.',
  nextId: 'web-05',
  lab: labHtml(
    `<p><a href="https://example.com">Visit example</a></p>
<p><a href="#bottom">Jump to the bottom</a></p>
<p>More content here so the jump is meaningful...</p>
<p id="bottom">You arrived at the bottom.</p>`,
    baseCss,
    ''
  ),
  completion: { requireQuiz: true, requireLab: true },
})

const web05 = lesson({
  id: 'web-05',
  title: 'Images',
  order: 5,
  status: 'NEW-complete',
  estimatedMinutes: 18,
  difficulty: 'beginner',
  goal: 'You can show an image with src and a meaningful alt text.',
  prerequisites: ['web-04'],
  why: 'Images fail to load sometimes. Alt text keeps meaning available for everyone.',
  concept: 'The <img> tag embeds an image. src is where the file is. alt describes the image in words.',
  analogy: 'A photo with a caption written on the back in case the photo fades.',
  explanation:
    'img is an empty element — write it as one tag.\n\nsrc points to a path or URL. alt should describe the image if the image carries information.\n\nIf the path is wrong, you will see a broken image — that is a path problem.',
  example: 'A placeholder image with alt text.',
  code: `<img
  src="https://via.placeholder.com/240"
  alt="A grey square placeholder image"
/>
<p>Caption: practice image for SKONGA.</p>`,
  lineByLine: [
    { line: '<img ... />', text: 'Empty element that shows an image.' },
    { line: 'src="..."', text: 'Location of the image file.' },
    { line: 'alt="..."', text: 'Text alternative for the image.' },
  ],
  predict: {
    prompt: 'If src is wrong but alt is present, what can the user still get?',
    answer: 'The meaning in the alt text (and often a broken-image indicator).',
  },
  practice: {
    copy: 'Run the starter and confirm an image area appears.',
    modify: 'Change alt to a clearer description. Change the caption paragraph.',
    create: 'Add a second image under the first with its own alt text.',
  },
  tryIt: 'Run the lab.',
  modify: 'Edit alt and caption.',
  experiment: 'Break src on purpose, observe, then restore it.',
  mistake: 'Leaving alt out on informative images.',
  debug: {
    broken: '<img src="photo.png">',
    hint: 'Add alt="..." describing the photo. Also check the path if it does not load.',
  },
  guidedChallenge: 'Write alt text for a photo of students in a computer lab.',
  independentChallenge: 'Make a tiny gallery: two images + captions.',
  quiz: [
    q('img needs which pair first for a useful image?', ['href and title', 'src and alt', 'class and only id'], 1, 'src finds the file; alt describes it.'),
    q('alt text is for…', ['Hiding the image always', 'A text alternative when the image is missing or not seen', 'Changing the Wi‑Fi password'], 1, 'Accessibility and resilience.'),
    q('A wrong src usually means…', ['HTML is illegal worldwide', 'The path or URL is incorrect', 'Paragraphs are forbidden'], 1, 'Check the address of the file.'),
  ],
  assessment: [{ q: 'Write one img tag with src and alt.', type: 'short' }],
  takeaways: ['src locates the file.', 'alt carries meaning.', 'Broken images are often path bugs.'],
  cheatSheet: '<img src="path" alt="description" />',
  youCanNow: 'Place images responsibly on a page.',
  nextId: 'web-06',
  lab: labHtml(
    `<img src="https://via.placeholder.com/240" alt="A grey square placeholder image" />
<p>Caption: practice image for SKONGA.</p>`,
    baseCss,
    ''
  ),
  completion: { requireQuiz: true, requireLab: true },
})

const web06 = lesson({
  id: 'web-06',
  title: 'Lists',
  order: 6,
  status: 'NEW-complete',
  estimatedMinutes: 16,
  difficulty: 'beginner',
  goal: 'You can build ordered and unordered lists with li items.',
  prerequisites: ['web-05'],
  why: 'Steps, menus, and skill lists are lists — not random paragraphs glued together.',
  concept: 'ul = unordered (bullets). ol = ordered (numbers). li = one list item.',
  analogy: 'A shopping list versus a numbered recipe.',
  explanation:
    'Only put li elements as direct children of ul or ol for normal lists.\n\nChoose ol when order matters. Choose ul when order is just a collection.',
  example: 'A numbered learning plan.',
  code: `<h2>Today</h2>
<ol>
  <li>Write HTML</li>
  <li>Add CSS</li>
  <li>Run in Code Lab</li>
</ol>
<ul>
  <li>Patience</li>
  <li>Curiosity</li>
</ul>`,
  lineByLine: [
    { line: '<ol>', text: 'Ordered list container.' },
    { line: '<ul>', text: 'Unordered list container.' },
    { line: '<li>', text: 'One item in the list.' },
  ],
  predict: {
    prompt: 'Which list type fits “Step 1, Step 2, Step 3”?',
    answer: 'ol (ordered list).',
  },
  practice: {
    copy: 'Run the starter and count the items.',
    modify: 'Add a fourth step to the ordered list. Add one more skill to the unordered list.',
    create: 'Make your own “Evening routine” ordered list with at least four steps.',
  },
  tryIt: 'Run the lab.',
  modify: 'Edit list items.',
  experiment: 'Put a paragraph inside ul without li and notice why structure suffers — then fix it.',
  mistake: 'Writing list text without li wrappers.',
  debug: {
    broken: '<ul>HTML</ul>',
    hint: 'Wrap items: <ul><li>HTML</li></ul>',
  },
  guidedChallenge: 'Create a ul of three languages you want to learn.',
  independentChallenge: 'Combine one ol and one ul on a “Study plan” page with a heading.',
  quiz: [
    q('Numbered steps use…', ['ul', 'ol', 'img'], 1, 'ol means ordered list.'),
    q('Each item is marked with…', ['<li>', '<p> only', '<head>'], 0, 'li = list item.'),
    q('A bag of skills in no special order fits…', ['ol', 'ul', 'DOCTYPE'], 1, 'ul for unordered collections.'),
  ],
  assessment: [{ q: 'When do you choose ol instead of ul?', type: 'short' }],
  takeaways: ['ul vs ol is about meaning.', 'li holds each item.', 'Lists beat long comma sentences for steps.'],
  cheatSheet: '<ul><li>…</li></ul> · <ol><li>…</li></ol>',
  youCanNow: 'Structure steps and collections in HTML.',
  nextId: 'web-07',
  lab: labHtml(
    `<h2>Today</h2>
<ol>
  <li>Write HTML</li>
  <li>Add CSS</li>
  <li>Run in Code Lab</li>
</ol>
<ul>
  <li>Patience</li>
  <li>Curiosity</li>
</ul>`,
    baseCss,
    ''
  ),
  completion: { requireQuiz: true, requireLab: true },
})

const web07 = lesson({
  id: 'web-07',
  title: 'Tables for data',
  order: 7,
  status: 'NEW-complete',
  estimatedMinutes: 18,
  difficulty: 'beginner',
  goal: 'You can mark up a small data table with headers and cells — not for page layout.',
  prerequisites: ['web-06'],
  why: 'Scores, timetables, and price lists are tables. Using tables to position a whole website is an old bad habit.',
  concept: 'table contains rows (tr). Header cells use th. Data cells use td.',
  analogy: 'An exercise book grid: rows and columns of facts.',
  explanation:
    'Build row by row. First row often holds th headers. Following rows hold td values.\n\nUse tables when the data is truly tabular. For general page layout, later CSS is the right tool.',
  example: 'Name and score.',
  code: `<table>
  <tr>
    <th>Name</th>
    <th>Score</th>
  </tr>
  <tr>
    <td>Asha</td>
    <td>18</td>
  </tr>
  <tr>
    <td>Juma</td>
    <td>15</td>
  </tr>
</table>`,
  lineByLine: [
    { line: '<table>', text: 'Starts the table.' },
    { line: '<tr>', text: 'One row.' },
    { line: '<th>', text: 'Header cell.' },
    { line: '<td>', text: 'Data cell.' },
  ],
  predict: {
    prompt: 'Is td or th better for the column title “Score”?',
    answer: 'th — it is a header.',
  },
  practice: {
    copy: 'Run the starter table.',
    modify: 'Add a third student row with your own numbers.',
    create: 'Make a 3-column table: Subject, Teacher, Room — two data rows minimum.',
  },
  tryIt: 'Run the lab.',
  modify: 'Edit cells and add a row.',
  experiment: 'Swap a th into a data row and discuss why headers matter.',
  mistake: 'Building an entire homepage layout using only tables.',
  debug: {
    broken: '<table><td>Asha</td></table>',
    hint: 'Wrap cells in <tr>. Add header row with th.',
  },
  guidedChallenge: 'Add a column for “Club” to the sample table.',
  independentChallenge: 'Encode your class timetable for two days as a table.',
  quiz: [
    q('A data cell is…', ['tr', 'td', 'table'], 1, 'td = table data.'),
    q('Header cells use…', ['th', 'a href', 'img'], 0, 'th = table header.'),
    q('Tables are best for…', ['All page decoration', 'Tabular data', 'Replacing CSS forever'], 1, 'Data grids, not modern full layouts.'),
  ],
  assessment: [{ q: 'Write a two-by-two table in HTML for Name and Age.', type: 'short' }],
  takeaways: ['tr rows, th headers, td data.', 'Tables for data.', 'Layout comes later with CSS.'],
  cheatSheet: 'table > tr > th/td',
  youCanNow: 'Publish a small honest data table.',
  nextId: 'web-08',
  lab: labHtml(
    `<table border="1" cellpadding="8">
  <tr><th>Name</th><th>Score</th></tr>
  <tr><td>Asha</td><td>18</td></tr>
  <tr><td>Juma</td><td>15</td></tr>
</table>`,
    baseCss,
    ''
  ),
  completion: { requireQuiz: true, requireLab: true },
})

const web08 = lesson({
  id: 'web-08',
  title: 'Forms and input',
  order: 8,
  status: 'NEW-complete',
  estimatedMinutes: 22,
  difficulty: 'beginner',
  goal: 'You can build a form with a labelled text input and a submit button.',
  prerequisites: ['web-07'],
  why: 'Login screens, quizzes, and search boxes are forms. Structure them correctly before adding JavaScript.',
  concept: 'form groups fields. label describes an input. input collects a value. button submits.',
  analogy: 'An exam paper: labelled blanks and a finish button.',
  explanation:
    'Connect a label to an input with matching for and id attributes so clicking the label focuses the field.\n\nname identifies the field if a server later receives the form.\n\nIn Code Lab there is no real backend yet. We still write correct HTML so later JavaScript can read values.',
  example: 'Ask for a name.',
  code: `<form>
  <label for="name">Jina</label>
  <input id="name" name="name" type="text" />
  <button type="submit">Tuma</button>
</form>`,
  lineByLine: [
    { line: '<form>', text: 'Groups controls together.' },
    { line: '<label for="name">', text: 'Visible label tied to input id name.' },
    { line: '<input id="name" ...>', text: 'Text box for the value.' },
    { line: '<button type="submit">', text: 'Attempts to submit the form.' },
  ],
  predict: {
    prompt: 'Why should label for and input id match?',
    answer: 'So assistive tools and click-to-focus behaviour connect the text to the field.',
  },
  practice: {
    copy: 'Run the form. Type a name and submit to see the starter feedback.',
    modify: 'Change the label to “Full name”. Add placeholder text on the input.',
    create: 'Add a second field for “Age” with its own label and id.',
  },
  tryIt: 'Run and use the form.',
  modify: 'Edit labels and add a field.',
  experiment: 'Remove the label and notice how the form becomes harder to use.',
  mistake: 'Inputs without labels, or button outside the form by accident.',
  debug: {
    broken: '<input type="text">Jina',
    hint: 'Use <label for="id"> and matching id on input.',
  },
  guidedChallenge: 'Add type="email" field labelled “Email”.',
  independentChallenge: 'Build a “Club registration” form with name, class, and submit.',
  quiz: [
    q('Why use a label?', ['Decoration only', 'Focuses the input and helps accessibility', 'It replaces the server'], 1, 'Labels are usability and a11y.'),
    q('form is for…', ['Grouping fields that belong together', 'Only CSS colours', 'Hiding the browser'], 0, 'Forms collect related input.'),
    q('id and for should…', ['Never match', 'Match each other for a field', 'Be random numbers only'], 1, 'Matching pairs connect label and input.'),
  ],
  assessment: [{ q: 'Write label + input for a field called city.', type: 'short' }],
  takeaways: ['Forms group inputs.', 'Labels matter.', 'Structure first; server later.'],
  cheatSheet: '<form><label for="id">…</label><input id="id" name="..." /></form>',
  youCanNow: 'Build a basic accessible form skeleton.',
  nextId: 'web-09',
  lab: labHtml(
    `<form id="f">
  <label for="name">Jina</label>
  <input id="name" name="name" type="text" />
  <button type="submit">Tuma</button>
</form>
<p id="out"></p>`,
    baseCss + 'label{display:block;margin-top:12px}input{display:block;margin:6px 0;padding:8px;width:100%;max-width:20rem}button{margin-top:12px;padding:8px 14px}',
    `document.getElementById('f').addEventListener('submit', function (e) {
  e.preventDefault();
  var n = document.getElementById('name').value;
  document.getElementById('out').textContent = n ? ('Karibu, ' + n) : 'Andika jina.';
});`
  ),
  completion: { requireQuiz: true, requireLab: true },
})

const web09 = lesson({
  id: 'web-09',
  title: 'Semantic HTML',
  order: 9,
  status: 'NEW-complete',
  estimatedMinutes: 18,
  difficulty: 'beginner',
  goal: 'You can replace meaningless wrapper soup with header, main, and footer where they fit.',
  prerequisites: ['web-08'],
  why: 'Semantic tags describe meaning. They help humans, CSS, and assistive technology understand the page.',
  concept: 'Choose elements that match the role of the content: header, main, nav, article, footer, section.',
  analogy: 'Labelling rooms in a house instead of calling every room “box”.',
  explanation:
    'div and span have no special meaning — use them when no better tag exists.\n\nheader often wraps the top branding/title area. main wraps the unique main content of the page (one main per page). footer wraps closing information.\n\nSemantics do not magically style the page; they clarify structure.',
  example: 'A simple meaningful page shell.',
  code: `<header>
  <h1>SKONGA</h1>
</header>
<main>
  <article>
    <h2>Lesson</h2>
    <p>Semantic tags describe meaning.</p>
  </article>
</main>
<footer>© SKONGA Academy</footer>`,
  lineByLine: [
    { line: '<header>', text: 'Introductory/top region.' },
    { line: '<main>', text: 'Primary content of this page.' },
    { line: '<article>', text: 'Self-contained composition.' },
    { line: '<footer>', text: 'Closing information.' },
  ],
  predict: {
    prompt: 'Should a page have many <main> elements?',
    answer: 'Normally one main landmark for the primary content.',
  },
  practice: {
    copy: 'Run the starter and identify header/main/footer in the code.',
    modify: 'Change the article heading and paragraph to your own topic.',
    create: 'Rebuild your About page using header, main, and footer.',
  },
  tryIt: 'Run the semantic skeleton.',
  modify: 'Personalise the text.',
  experiment: 'Replace main with a div and discuss what meaning you lost.',
  mistake: 'Wrapping everything in div with no landmarks.',
  debug: {
    broken: '<div><div><div>Title</div></div></div>',
    hint: 'Promote the title to h1 inside header; put primary content in main.',
  },
  guidedChallenge: 'Add a <nav> with two links inside the header.',
  independentChallenge: 'Semantic layout for a club announcement page.',
  quiz: [
    q('Primary unique content belongs in…', ['footer', 'main', 'head'], 1, 'main is the primary content landmark.'),
    q('div is…', ['Always wrong', 'Useful when no semantic element fits', 'A browser'], 1, 'div is neutral.'),
    q('Semantic HTML mainly improves…', ['Meaning and structure', 'Phone battery chemistry', 'Only font files'], 0, 'Meaning first.'),
  ],
  assessment: [{ q: 'Name three semantic elements and when you would use each.', type: 'short' }],
  takeaways: ['Prefer meaningful tags.', 'One main per page.', 'Semantics ≠ styling.'],
  cheatSheet: 'header · nav · main · article · section · footer',
  youCanNow: 'Structure pages with landmarks, not only divs.',
  nextId: 'html-project',
  lab: labHtml(
    `<header><h1>SKONGA</h1></header>
<main>
  <article>
    <h2>Lesson</h2>
    <p>Semantic tags describe meaning.</p>
  </article>
</main>
<footer>© SKONGA Academy</footer>`,
    baseCss,
    ''
  ),
  completion: { requireQuiz: true, requireLab: true },
})

const htmlProject = lesson({
  id: 'html-project',
  title: 'HTML project — Personal bio page',
  order: 10,
  status: 'NEW-complete',
  estimatedMinutes: 35,
  difficulty: 'beginner',
  goal: 'You can combine headings, paragraphs, lists, links, and semantic layout into one bio page.',
  prerequisites: ['web-02', 'web-03', 'web-04', 'web-06', 'web-09'],
  why: 'Concepts stick when they become one artefact you can show.',
  concept: 'A project is a synthesis: plan the outline, mark it up, test in Code Lab, fix structure, then share.',
  analogy: 'Using every tool on the bench to finish one stool — not collecting tools forever.',
  explanation:
    'Requirements for completion:\n1) header with your name as h1\n2) main with About paragraph(s)\n3) a list of at least three skills or interests\n4) at least one link\n5) footer with a short line of text\n\nCSS can stay minimal. Structure is the goal of this module project.',
  example: 'Starter bio scaffold in Code Lab — replace every placeholder.',
  code: `<!-- Plan first, then tags:
header (name)
main (about + skills list + link)
footer -->`,
  practice: {
    copy: 'Run the starter to see the scaffold.',
    modify: 'Replace name, about text, and skills with your real information.',
    create: 'Meet all five requirements above without leaving placeholder text.',
  },
  tryIt: 'Open the project lab.',
  modify: 'Personalise all text.',
  experiment: 'Validate your outline: one h1, lists use li, link has href.',
  mistake: 'Decorating with random tags before the outline is clear.',
  debug: {
    broken: 'Skills written as one long paragraph with commas only.',
    hint: 'Use ul/ol and li for the skills list.',
  },
  guidedChallenge: 'Finish header + about first, then add the list.',
  independentChallenge: 'Ship the full bio page and share a progress post in Community.',
  quiz: [
    q('This project mainly tests…', ['Only colours', 'HTML structure you already learned', 'Python servers'], 1, 'Synthesis of HTML foundations.'),
    q('Skills should usually appear as…', ['A list with li items', 'Only the title tag', 'A table of Wi‑Fi passwords'], 0, 'Lists fit collections of skills.'),
    q('A bio page should include…', ['No headings', 'Clear structure with real content about you', 'Only empty divs'], 1, 'Content + structure.'),
  ],
  assessment: [
    { q: 'Describe your final outline (header/main/footer and what each contains).', type: 'short' },
  ],
  takeaways: [
    'You can structure a real page.',
    'Projects prove the module.',
    'Next module (CSS) will style this structure.',
  ],
  cheatSheet: 'header + main + list + link + footer',
  youCanNow: 'Hand a structured bio page to the CSS module.',
  nextId: 'css-01',
  lab: labHtml(
    `<header>
  <h1>Your Name</h1>
  <p>Learner at SKONGA Academy</p>
</header>
<main>
  <h2>About</h2>
  <p>Write two sentences about you.</p>
  <h2>Skills I am learning</h2>
  <ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
  </ul>
  <p><a href="https://example.com">A link I find useful</a></p>
</main>
<footer>© Your Name — SKONGA</footer>`,
    baseCss,
    ''
  ),
  completion: { requireQuiz: true, requireLab: true },
})

export const web = {
  id: 'web',
  level: 2,
  title: 'Web Development',
  blurb: 'HTML → CSS → JavaScript → pages you can run in Code Lab.',
  status: 'NEW',
  modules: [
    {
      id: 'html',
      title: 'HTML Foundations',
      goal: 'Structure pages the browser understands.',
      lessons: [web01, web02, web03, web04, web05, web06, web07, web08, web09, htmlProject],
    },
    {
      id: 'css',
      title: 'CSS Foundations',
      goal: 'Control colour, type, box model, and layout in Code Lab.',
      lessons: cssLessons,
    },
    {
      id: 'js',
      title: 'JavaScript in the browser',
      goal: 'Make pages compute and react in the browser preview.',
      lessons: jsLessons,
    },
  ],
}
