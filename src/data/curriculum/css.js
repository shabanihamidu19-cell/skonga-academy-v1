import { lesson, q, labHtml } from './lessonFactory'

/**
 * LEVEL 2 — CSS path. Provenance: NEW (not recovered).
 */

const base =
  'body{font-family:system-ui,sans-serif;padding:24px;line-height:1.5;max-width:42rem;margin:0 auto;color:#111}'

function L(partial) {
  return lesson({
    status: 'NEW-complete',
    difficulty: 'beginner',
    estimatedMinutes: 20,
    runtime: 'html-css-js',
    completion: { requireQuiz: true, requireLab: true },
    ...partial,
  })
}

export const cssLessons = [
  L({
    id: 'css-01',
    title: 'CSS Foundations',
    order: 1,
    estimatedMinutes: 22,
    prerequisites: ['html-project'],
    goal: 'You can write a CSS rule (selector + property + value) and see it change the preview.',
    why: 'HTML is the skeleton. Without CSS, every page looks like a raw document. One rule is enough to prove you control appearance.',
    concept:
      'A CSS rule has three parts: who it targets (selector), what to change (property), and the new setting (value).',
    analogy:
      'A school uniform rule: “All shirts (selector) must be colour (property) white (value).” The rule does not invent shirts — it dresses shirts that already exist.',
    explanation:
      'In Code Lab the CSS pane is a stylesheet. The preview applies those rules to the HTML pane.\n\nThe shape is:\n\nselector {\n  property: value;\n}\n\nEach declaration ends with a semicolon. Curly braces wrap the declarations that belong to that selector.\n\nIf nothing changes after Run, check three things: the selector matches an element that exists, the property name is spelled correctly, and the value is valid.',
    example: 'Make the main heading purple.',
    code: `h1 {
  color: purple;
}`,
    lineByLine: [
      { line: 'h1', text: 'Selector — every h1 in the document.' },
      { line: '{ }', text: 'Block of declarations for that selector.' },
      { line: 'color:', text: 'Property — the text colour.' },
      { line: 'purple;', text: 'Value — which colour. Semicolon ends the declaration.' },
    ],
    predict: {
      prompt: 'If HTML has <h1>SKONGA</h1> and CSS is h1 { color: purple; }, what colour is the heading?',
      answer: 'Purple (unless a more specific rule later overrides it).',
    },
    practice: {
      copy: 'Run the starter. Confirm the heading is purple.',
      modify: 'Change purple to teal. Change the paragraph colour to #444. Run again.',
      create: 'Add a rule that sets the page background to #f4f0ff. Do not copy a finished solution first.',
    },
    mistake: 'Writing color purple without the colon, or forgetting the semicolon when you add a second property.',
    debug: {
      broken: 'h1 { colour: purple }',
      hint: 'The property is color (American spelling). Add a colon and a semicolon: color: purple;',
    },
    guidedChallenge: 'Style h1 and p with two different colors.',
    independentChallenge: 'Style a short bio heading and paragraph using only three properties you choose.',
    quiz: [
      q('In h1 { color: purple; } the selector is…', ['purple', 'color', 'h1'], 2, 'h1 names who is styled.'),
      q('A declaration is…', ['property: value;', 'Only the HTML file name', 'A Python print'], 0, 'property + value + semicolon.'),
      q('If a rule “does nothing”, first check…', ['Whether the selector matches real HTML', 'Whether Wi‑Fi invented CSS', 'Whether the title tag is purple'], 0, 'No match → no visible change.'),
    ],
    takeaways: ['Selector + property + value.', 'CSS paints existing HTML.', 'Run after every small change.'],
    cheatSheet: 'selector { property: value; }',
    youCanNow: 'Write and run a first stylesheet rule.',
    nextId: 'css-02',
    lab: labHtml(
      `<h1>SKONGA</h1>
<p>This paragraph is waiting for a colour.</p>`,
      base + 'h1{color:purple}',
      ''
    ),
  }),

  L({
    id: 'css-02',
    title: 'Selectors',
    order: 2,
    prerequisites: ['css-01'],
    goal: 'You can target an element by tag, by class, and by id — and explain the difference.',
    why: 'If every rule uses only tag names, every paragraph on the page gets the same look. Classes let you style some things, not all.',
    concept:
      'Tag selectors (p) hit every matching tag. Class selectors (.card) hit elements with that class. Id selectors (#hero) hit the one element with that id.',
    analogy:
      'Tag = “all students”. Class = “the debate club”. Id = “the class prefect” (one person).',
    explanation:
      'In HTML: class="card" can appear on many elements. id="hero" should be unique on the page.\n\nIn CSS:\n- p { } selects paragraphs\n- .card { } selects class card\n- #hero { } selects id hero\n\nStart with classes for reusable look. Keep ids for unique landmarks. Do not fight the page with ten ids for styling.',
    example: 'A card class versus a page heading.',
    code: `h1 { font-size: 1.6rem; }
.card { padding: 16px; border: 1px solid #ccc; }
#hero { background: #f4f0ff; }`,
    lineByLine: [
      { line: 'h1', text: 'All h1 tags.' },
      { line: '.card', text: 'Any element whose class list includes card.' },
      { line: '#hero', text: 'The element with id="hero".' },
    ],
    predict: {
      prompt: 'Will .card { color: red; } change a <p> that has no class?',
      answer: 'No. Class selectors only match elements that include that class.',
    },
    practice: {
      copy: 'Run. See that only the card box has a border.',
      modify: 'Add class="card" to the second paragraph. Run. Both bordered pieces should match.',
      create: 'Create a class .note with a pale yellow background and apply it to one paragraph only.',
    },
    mistake: 'Writing class selectors without the dot (.card) or putting two ids with the same name.',
    debug: {
      broken: 'card { border: 1px solid black; }',
      hint: 'A class selector needs a dot: .card',
    },
    guidedChallenge: 'Style #hero differently from .card.',
    independentChallenge: 'Three paragraphs: only two share class .tip and look different from the third.',
    quiz: [
      q('The selector for class card is…', ['#card', '.card', 'card()'], 1, 'Dot means class.'),
      q('id selectors use…', ['#', '.', 'print'], 0, 'Hash means id.'),
      q('Reuse the same look on many boxes with…', ['One shared class', 'Twenty identical ids', 'Python lists'], 0, 'Classes are reusable.'),
    ],
    takeaways: ['.class for reusable look.', '#id for one landmark.', 'Tag selectors are broad.'],
    cheatSheet: 'p · .card · #hero',
    youCanNow: 'Aim styles at the right elements.',
    nextId: 'css-03',
    lab: labHtml(
      `<h1 id="hero">Hero heading</h1>
<div class="card"><p>I am a card.</p></div>
<p>I am a normal paragraph.</p>`,
      base + 'h1{font-size:1.6rem}#hero{background:#f4f0ff;padding:12px}.card{padding:16px;border:1px solid #ccc}',
      ''
    ),
  }),

  L({
    id: 'css-03',
    title: 'Colors',
    order: 3,
    prerequisites: ['css-02'],
    goal: 'You can set text color and background-color with a keyword or a hex value.',
    why: 'Colour is the fastest way to create hierarchy and mood — and the fastest way to make text unreadable if contrast is weak.',
    concept: 'color paints the text. background-color paints the surface behind the text.',
    analogy: 'Chalk colour versus blackboard colour. Both matter or you cannot read.',
    explanation:
      'Keywords like purple work, but hex codes like #6d28d9 give you precise control.\n\nHex is a hash plus six digits: two for red, two for green, two for blue. #111111 is near black. #ffffff is white.\n\nAlways check contrast: light text on a light background fails beginners and fails accessibility.',
    example: 'Dark page, light text.',
    code: `body {
  background-color: #0f1117;
  color: #eee;
}
.accent { color: #c4b5fd; }`,
    lineByLine: [
      { line: 'background-color', text: 'Fills the element’s background.' },
      { line: 'color', text: 'Text colour, inherited by children unless they override.' },
      { line: '#0f1117', text: 'Hex value — a dark surface.' },
    ],
    predict: {
      prompt: 'If body text is #eee and a child sets color: #111 on a #0f1117 background, is that child readable?',
      answer: 'Yes — dark text on dark background would fail; here the child is dark text only if background stays dark. Dark #111 on #0f1117 is poor contrast. Prefer light text on that background.',
    },
    practice: {
      copy: 'Run the dark theme starter.',
      modify: 'Change .accent to a colour you like. Keep contrast readable.',
      create: 'Make a .warning class: dark text on a warm background.',
    },
    mistake: 'Yellow text on white, or matching text colour to background “because it looks clean”.',
    debug: {
      broken: 'p { color: #fff; background-color: #fff; }',
      hint: 'Text and background need contrast. Darken one or lighten the other.',
    },
    guidedChallenge: 'Keep dark body; make links a visible accent colour.',
    independentChallenge: 'Two cards: one light theme, one dark theme, both readable.',
    quiz: [
      q('Text colour is the property…', ['color', 'margin', 'href'], 0, 'color styles text.'),
      q('#ffffff is…', ['Near white', 'A JavaScript function', 'A folder'], 0, 'High hex values are light.'),
      q('If you cannot read the text, first check…', ['Contrast between color and background-color', 'The phone charger brand', 'Git remotes'], 0, 'Contrast first.'),
    ],
    takeaways: ['color vs background-color.', 'Hex is precise.', 'Contrast is a requirement.'],
    cheatSheet: 'color · background-color · #rrggbb',
    youCanNow: 'Paint text and surfaces on purpose.',
    nextId: 'css-04',
    lab: labHtml(
      `<h1>Night lab</h1>
<p>Body text should stay readable.</p>
<p class="accent">Accent line</p>`,
      base + 'body{background-color:#0f1117;color:#eee} .accent{color:#c4b5fd}',
      ''
    ),
  }),

  L({
    id: 'css-04',
    title: 'Typography',
    order: 4,
    prerequisites: ['css-03'],
    goal: 'You can control font-size, font-weight, and line-height so a paragraph is comfortable to read.',
    why: 'Tiny cramped text makes learners quit. Type is layout, not decoration.',
    concept: 'font-size is how large letters are. line-height is space between lines. font-weight is how bold the face feels.',
    analogy: 'Handwriting in an exercise book: size of letters, gap between lines, how hard you press the pen.',
    explanation:
      'Use rem or px for size at this level. Start body text around 16–18px (or 1rem–1.125rem).\n\nline-height: 1.5 or 1.6 is a kind default for paragraphs.\n\nDo not make every line bold. Weight is for emphasis and headings.',
    example: 'Readable article text.',
    code: `body { font-size: 18px; line-height: 1.6; }
h1 { font-size: 1.8rem; font-weight: 700; }
p { font-weight: 400; }`,
    lineByLine: [
      { line: 'font-size: 18px', text: 'Comfortable body size on a phone.' },
      { line: 'line-height: 1.6', text: 'Relative leading — 1.6 × the font size.' },
      { line: 'font-weight: 700', text: 'Bold heading.' },
    ],
    predict: {
      prompt: 'If line-height is 1, will a long paragraph feel airy or cramped?',
      answer: 'Cramped — lines sit on top of each other.',
    },
    practice: {
      copy: 'Run and read the paragraph aloud. Notice spacing.',
      modify: 'Set line-height to 1 and then to 1.8. Keep the one that is easier to read.',
      create: 'A heading + two paragraphs with a clear size difference.',
    },
    mistake: 'Huge headings and 11px body text on mobile.',
    debug: {
      broken: 'p { font-size: 9px; line-height: 1; }',
      hint: 'Raise size toward 16–18px and line-height toward 1.5+.',
    },
    guidedChallenge: 'Make h1 clearly larger than p without using colour only.',
    independentChallenge: 'Typeset a three-paragraph club notice.',
    quiz: [
      q('line-height mainly controls…', ['Space between lines', 'Image file type', 'Python loops'], 0, 'Leading.'),
      q('Body text on phones is often near…', ['18px', '2px', '200px'], 0, 'Readable default.'),
      q('font-weight: 700 is…', ['Bolder text', 'A URL', 'A table'], 0, '700 ≈ bold.'),
    ],
    takeaways: ['Size, leading, weight.', 'Readability beats decoration.', 'Test on a narrow screen.'],
    cheatSheet: 'font-size · line-height · font-weight',
    youCanNow: 'Make a paragraph comfortable to read.',
    nextId: 'css-05',
    lab: labHtml(
      `<h1>Notice</h1>
<p>SKONGA learners write every day. Long lines need room to breathe so the eye can travel.</p>
<p>Change size and line-height in the CSS pane.</p>`,
      base + 'body{font-size:18px;line-height:1.6}h1{font-size:1.8rem;font-weight:700}',
      ''
    ),
  }),

  L({
    id: 'css-05',
    title: 'The box model',
    order: 5,
    prerequisites: ['css-04'],
    goal: 'You can change padding, border, and margin and explain which one is inside, on the edge, or outside.',
    why: 'Almost every spacing bug is a box-model bug. Learn the three layers once.',
    concept:
      'Every element is a box. Content sits in the middle. Padding is space inside the border. Border is the edge. Margin is space outside the border.',
    analogy:
      'A gift: the toy (content), tissue paper inside the box (padding), cardboard (border), space between this gift and the next gift (margin).',
    explanation:
      'padding: 16px adds air inside, so text does not touch the border.\nmargin: 16px pushes other boxes away.\nborder: 1px solid #333 draws the edge.\n\nYou can set one side: margin-top, padding-left.\n\nDefault content-box means padding adds to the total size. You do not need box-sizing yet — just watch the preview as you change numbers.',
    example: 'A card with inner air and outer gap.',
    code: `.card {
  padding: 16px;
  border: 2px solid #6d28d9;
  margin-bottom: 16px;
}`,
    lineByLine: [
      { line: 'padding', text: 'Inside space.' },
      { line: 'border', text: 'Visible edge (width style colour).' },
      { line: 'margin-bottom', text: 'Gap after this box.' },
    ],
    predict: {
      prompt: 'Will margin-bottom change the space inside the card text?',
      answer: 'No. Margin is outside. Padding changes inner space.',
    },
    practice: {
      copy: 'Run two cards. Notice the gap between them.',
      modify: 'Increase padding to 32px. Then increase margin-bottom to 32px. Name which change moved the cards apart.',
      create: 'A note box with 12px padding, 1px border, 24px margin-top.',
    },
    mistake: 'Using only margin when the text is glued to the border (that needs padding).',
    debug: {
      broken: '.card { margin: 40px; } /* text still touches the border */',
      hint: 'Add padding. Margin will not create inner breathing room.',
    },
    guidedChallenge: 'Make the second card sit farther from the first using margin only.',
    independentChallenge: 'Three stacked boxes with different padding so you can see inner space.',
    quiz: [
      q('Space inside the border is…', ['margin', 'padding', 'href'], 1, 'Padding is inner.'),
      q('Space outside the border is…', ['margin', 'font-weight', 'alt'], 0, 'Margin is outer.'),
      q('border: 2px solid #333 sets…', ['Width, style, colour of the edge', 'Python types', 'The URL only'], 0, 'Three border parts.'),
    ],
    takeaways: ['Content → padding → border → margin.', 'Padding = inner. Margin = outer.', 'Change one number at a time.'],
    cheatSheet: 'padding | border | margin',
    youCanNow: 'Space boxes on purpose.',
    nextId: 'css-06',
    lab: labHtml(
      `<div class="card"><strong>Card A</strong><p>Text inside.</p></div>
<div class="card"><strong>Card B</strong><p>Text inside.</p></div>`,
      base + '.card{padding:16px;border:2px solid #6d28d9;margin-bottom:16px;background:#fafafa}',
      ''
    ),
  }),

  L({
    id: 'css-06',
    title: 'Display',
    order: 6,
    prerequisites: ['css-05'],
    goal: 'You can tell block from inline and use display to change how a box participates in layout.',
    why: 'Beginners fight “why won’t this sit side by side?” Display is often the reason.',
    concept:
      'Block boxes (div, p, h1) start on a new line and want the full width. Inline boxes (span, a, strong) sit in the text flow. display can change that contract.',
    analogy:
      'Block = a full exercise-book line. Inline = a word in the sentence.',
    explanation:
      'display: block makes an element behave like a paragraph.\ndisplay: inline makes it sit in a line of text (width/height/margin-top often behave differently).\ndisplay: none removes it from layout (not just invisible).\n\nYou will use flex and grid next for rows and columns. Display is the door to those values too: display: flex.',
    example: 'Turn spans into stacked blocks.',
    code: `.tag { display: inline; padding: 4px 8px; }
.stack .tag { display: block; margin-bottom: 8px; }`,
    lineByLine: [
      { line: 'display: inline', text: 'Sits in the text line.' },
      { line: 'display: block', text: 'Starts a new line, full width.' },
    ],
    predict: {
      prompt: 'Are two <p> elements side by side by default?',
      answer: 'No. Paragraphs are block and stack vertically.',
    },
    practice: {
      copy: 'Run. See tags in a row, then stacked in the second group.',
      modify: 'Switch .stack .tag back to inline. Observe.',
      create: 'A navigation of three links that stack as blocks.',
    },
    mistake: 'Expecting width on a pure inline element to behave like a card.',
    debug: {
      broken: 'span { width: 200px; } /* barely changes */',
      hint: 'Inline boxes do not take width the way blocks do. Use inline-block or block/flex.',
    },
    guidedChallenge: 'Make the three tags each take a full line.',
    independentChallenge: 'Mix one inline label and one block description.',
    quiz: [
      q('p is typically…', ['block', 'a Python list', 'an id selector'], 0, 'Paragraphs are block.'),
      q('display: none…', ['Removes the box from layout', 'Only changes font-weight', 'Runs Python'], 0, 'Gone from layout.'),
      q('Side-by-side layout often needs…', ['flex/grid/inline-block — not default paragraphs', 'More <title> tags', 'Removing CSS'], 0, 'Display/layout tools.'),
    ],
    takeaways: ['Block vs inline.', 'display changes the contract.', 'none is not the same as color: white.'],
    cheatSheet: 'block · inline · none · flex · grid',
    youCanNow: 'Predict how a box sits in the flow.',
    nextId: 'css-07',
    lab: labHtml(
      `<p>
  <span class="tag">HTML</span>
  <span class="tag">CSS</span>
  <span class="tag">JS</span>
</p>
<div class="stack">
  <span class="tag">HTML</span>
  <span class="tag">CSS</span>
  <span class="tag">JS</span>
</div>`,
      base + '.tag{display:inline;padding:4px 8px;background:#ede9fe;margin-right:6px}.stack .tag{display:block;margin:0 0 8px}',
      ''
    ),
  }),

  L({
    id: 'css-07',
    title: 'Position — use with care',
    order: 7,
    prerequisites: ['css-06'],
    goal: 'You can explain static vs relative vs absolute and place a small badge without breaking the page.',
    why: 'Position is powerful and easy to abuse. Learn a badge-on-a-card, not a whole site of absolute boxes.',
    concept:
      'static is the default flow. relative nudges an element and becomes the anchor for absolute children. absolute takes an element out of flow and pins it to the nearest positioned ancestor.',
    analogy:
      'Relative is sliding a sticker a little on the page. Absolute is pinning a badge to a specific card instead of the whole desk.',
    explanation:
      'For a badge in the corner of a card:\n.card { position: relative; }\n.badge { position: absolute; top: 8px; right: 8px; }\n\nIf you forget relative on the card, the badge may jump to a different ancestor (even the page).\n\nPrefer flex/grid for page layout. Use position for small overlays.',
    example: 'New badge on a card.',
    code: `.card { position: relative; padding: 24px 16px 16px; }
.badge { position: absolute; top: 8px; right: 8px; }`,
    lineByLine: [
      { line: 'position: relative', text: 'Card stays in flow and anchors children.' },
      { line: 'position: absolute', text: 'Badge leaves flow.' },
      { line: 'top / right', text: 'Offset from the card’s padding edge.' },
    ],
    predict: {
      prompt: 'If .card is not positioned, where might .badge attach?',
      answer: 'The next positioned ancestor, often the page — the badge “escapes” the card.',
    },
    practice: {
      copy: 'Run and find the NEW badge.',
      modify: 'Move the badge to top: 8px; left: 8px.',
      create: 'Two cards, each with its own badge that stays on that card.',
    },
    mistake: 'position: absolute on every section of the homepage.',
    debug: {
      broken: '.badge { position: absolute; top: 8px; right: 8px; } /* card not relative */',
      hint: 'Set position: relative on the card first.',
    },
    guidedChallenge: 'Add a second badge labelled LIVE on the same card (different corner).',
    independentChallenge: 'A photo frame with a caption overlay using relative/absolute.',
    quiz: [
      q('Default position is…', ['static', 'python', 'fixed-on-mars'], 0, 'static = normal flow.'),
      q('Absolute children need…', ['A positioned ancestor (often relative)', 'A server', 'A table layout'], 0, 'Relative card is the usual anchor.'),
      q('Use position mainly for…', ['Small overlays', 'Replacing all HTML', 'Hiding the editor'], 0, 'Overlays, not whole layouts.'),
    ],
    takeaways: ['Flow first, overlays second.', 'relative anchors absolute.', 'Do not position the whole page.'],
    cheatSheet: 'relative parent + absolute child + top/right',
    youCanNow: 'Pin a badge to a card.',
    nextId: 'css-08',
    lab: labHtml(
      `<article class="card">
  <span class="badge">NEW</span>
  <h2>CSS club</h2>
  <p>Meet on Friday.</p>
</article>`,
      base + '.card{position:relative;padding:28px 16px 16px;border:1px solid #ddd;border-radius:12px;max-width:20rem}.badge{position:absolute;top:8px;right:8px;background:#6d28d9;color:#fff;font-size:12px;padding:2px 8px;border-radius:999px}',
      ''
    ),
  }),

  L({
    id: 'css-08',
    title: 'Flexbox',
    order: 8,
    prerequisites: ['css-07'],
    goal: 'You can make a row of items with display: flex, gap, and align-items.',
    why: 'Nav bars, toolbars, and profile rows are flex problems. Flex is the default modern row/column tool.',
    concept:
      'A flex container (display: flex) lays out its children on an axis. gap spaces them. justify-content distributes leftover space on the main axis. align-items aligns on the cross axis.',
    analogy:
      'Books on a shelf: the shelf is the container, books are items, gap is the space between books, align-items is whether they sit on the same shelf line.',
    explanation:
      '.row { display: flex; gap: 12px; align-items: center; }\n\nflex-direction: column stacks instead of lining up.\nflex-wrap: wrap lets items fall to the next line on small screens.\n\nStart with row + gap. Add justify-content: space-between when you want items at opposite ends.',
    example: 'Avatar + name row.',
    code: `.row {
  display: flex;
  gap: 12px;
  align-items: center;
}`,
    lineByLine: [
      { line: 'display: flex', text: 'Children become flex items.' },
      { line: 'gap: 12px', text: 'Space between items.' },
      { line: 'align-items: center', text: 'Vertical centre in a row.' },
    ],
    predict: {
      prompt: 'Does gap add space inside each item’s text?',
      answer: 'No. Gap is between items, not padding inside an item.',
    },
    practice: {
      copy: 'Run the profile row.',
      modify: 'Set justify-content: space-between and add a third item “Edit”.',
      create: 'A footer row with three links evenly spaced.',
    },
    mistake: 'Using huge margins on every child instead of gap on the parent.',
    debug: {
      broken: '.row { display: flex; } /* items glued together */',
      hint: 'Add gap: 12px on the flex container.',
    },
    guidedChallenge: 'Switch flex-direction to column and describe what happened.',
    independentChallenge: 'A toolbar: logo left, two buttons right (space-between).',
    quiz: [
      q('display: flex is set on…', ['The container', 'Only the <title>', 'Python'], 0, 'Parent becomes a flex container.'),
      q('gap controls…', ['Space between flex items', 'File encoding', 'Git users'], 0, 'Gap is inter-item space.'),
      q('align-items: center in a row…', ['Centres items on the cross axis', 'Deletes CSS', 'Runs the server'], 0, 'Cross-axis alignment.'),
    ],
    takeaways: ['Flex on the parent.', 'gap before extra margins.', 'Row first, wrap when needed.'],
    cheatSheet: 'display:flex; gap; align-items; justify-content',
    youCanNow: 'Build a horizontal cluster that stays aligned.',
    nextId: 'css-09',
    lab: labHtml(
      `<div class="row">
  <div class="avatar">A</div>
  <div>
    <strong>Asha</strong>
    <div class="muted">Web learner</div>
  </div>
</div>`,
      base + '.row{display:flex;gap:12px;align-items:center}.avatar{width:48px;height:48px;border-radius:50%;background:#6d28d9;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700}.muted{color:#666;font-size:14px}',
      ''
    ),
  }),

  L({
    id: 'css-09',
    title: 'Grid',
    order: 9,
    prerequisites: ['css-08'],
    goal: 'You can build a simple two-column grid and know when to pick grid instead of flex.',
    why: 'Equal cards in columns are a grid job. Flex is a row/stack job. Choosing the wrong one creates messy hacks.',
    concept:
      'display: grid plus grid-template-columns describes tracks. 1fr 1fr means two equal columns that share leftover space. gap still spaces cells.',
    analogy:
      'An exercise book table: you decide columns first, then drop content into cells.',
    explanation:
      '.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }\n\nUse grid when both rows and columns matter. Use flex when you have one axis (a nav, a header pair).\n\nOn a phone, two columns often become one. That is the next lesson (responsive).',
    example: 'Two equal lesson cards.',
    code: `.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}`,
    lineByLine: [
      { line: 'display: grid', text: 'Children become grid items.' },
      { line: '1fr 1fr', text: 'Two equal fractional columns.' },
      { line: 'gap', text: 'Row and column gap.' },
    ],
    predict: {
      prompt: 'If you add a third card to a 2-column grid, where does it go?',
      answer: 'It wraps to the next row, first column.',
    },
    practice: {
      copy: 'Run two cards side by side.',
      modify: 'Change to 1fr 1fr 1fr (three columns). Then back to two.',
      create: 'Four cards in a 2×2 grid with titles.',
    },
    mistake: 'Forcing grid when a single flex row would be simpler.',
    debug: {
      broken: '.grid { display: grid; } /* still one column */',
      hint: 'Set grid-template-columns, e.g. 1fr 1fr.',
    },
    guidedChallenge: 'Make the left column narrower: 1fr 2fr.',
    independentChallenge: 'A dashboard strip: two info cards in grid.',
    quiz: [
      q('1fr 1fr means…', ['Two equal columns', 'Two Python files', 'Two ids'], 0, 'Equal fractional tracks.'),
      q('Grid is best when…', ['You need rows and columns of cells', 'You only need one inline word', 'You hide HTML'], 0, 'Two-dimensional layout.'),
      q('gap on a grid…', ['Spaces rows and columns', 'Renames the lesson', 'Starts a server'], 0, 'Same idea as flex gap.'),
    ],
    takeaways: ['Columns are tracks.', 'fr shares leftover space.', 'Flex = one axis; grid = two.'],
    cheatSheet: 'display:grid; grid-template-columns: 1fr 1fr; gap',
    youCanNow: 'Place cards on a simple grid.',
    nextId: 'css-10',
    lab: labHtml(
      `<div class="grid">
  <article class="card"><h2>HTML</h2><p>Structure</p></article>
  <article class="card"><h2>CSS</h2><p>Look</p></article>
</div>`,
      base + '.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.card{border:1px solid #ddd;border-radius:12px;padding:16px}h2{margin:0 0 8px}',
      ''
    ),
  }),

  L({
    id: 'css-10',
    title: 'Responsive basics',
    order: 10,
    prerequisites: ['css-09'],
    goal: 'You can add a max-width media query so a two-column grid becomes one column on a narrow screen.',
    why: 'Learners open SKONGA on phones. A layout that only works on a wide laptop is unfinished.',
    concept:
      'A media query applies extra CSS only when a condition is true, such as “the viewport is 600px wide or less”.',
    analogy:
      'A classroom rule that applies only on assembly day. Same school, extra instructions when the situation matches.',
    explanation:
      '@media (max-width: 600px) {\n  .grid { grid-template-columns: 1fr; }\n}\n\nWrite the desktop (or default) rule first. Inside the query, override only what must change.\n\nAlso set images and cards to max-width: 100% so they do not overflow the screen.',
    example: 'Stack the grid on small screens.',
    code: `.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 600px) {
  .grid { grid-template-columns: 1fr; }
}`,
    lineByLine: [
      { line: '@media (max-width: 600px)', text: 'Condition: viewport ≤ 600px.' },
      { line: 'grid-template-columns: 1fr', text: 'Override: single column.' },
    ],
    predict: {
      prompt: 'On a 400px-wide preview, how many columns should this grid have?',
      answer: 'One, because 400 is less than 600.',
    },
    practice: {
      copy: 'Run, then narrow the preview/window if you can and watch the stack.',
      modify: 'Change the breakpoint to 800px and observe when it stacks.',
      create: 'A card whose padding shrinks on small screens.',
    },
    mistake: 'Designing only on a wide screen and calling it done.',
    debug: {
      broken: '@media max-width 600px { .grid { grid-template-columns: 1fr } }',
      hint: 'Use parentheses: @media (max-width: 600px) { … }',
    },
    guidedChallenge: 'Add max-width: 100% on images in the lab if you insert one.',
    independentChallenge: 'Two-column gallery that becomes one column on a phone.',
    quiz: [
      q('max-width: 600px in a query means…', ['Apply when the viewport is at most 600px', 'Always apply', 'Never apply on phones'], 0, 'Maximum width condition.'),
      q('Inside the query you usually…', ['Override only what must change', 'Delete HTML', 'Rename Python files'], 0, 'Minimal overrides.'),
      q('Responsive work exists because…', ['Screens have different widths', 'CSS cannot set colour', 'Servers refuse HTML'], 0, 'Viewport variety.'),
    ],
    takeaways: ['Default first, query second.', 'Phones are first-class.', 'Override the grid tracks, not the whole language.'],
    cheatSheet: '@media (max-width: 600px) { … }',
    youCanNow: 'Make a grid collapse on a narrow screen.',
    nextId: 'css-project',
    lab: labHtml(
      `<div class="grid">
  <article class="card"><h2>One</h2><p>Narrow the screen.</p></article>
  <article class="card"><h2>Two</h2><p>Should stack.</p></article>
</div>`,
      base + '.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.card{border:1px solid #ddd;padding:16px;border-radius:12px}@media (max-width:600px){.grid{grid-template-columns:1fr}}',
      ''
    ),
  }),

  L({
    id: 'css-project',
    title: 'CSS project — Profile card',
    order: 11,
    estimatedMinutes: 35,
    prerequisites: ['css-02', 'css-05', 'css-08'],
    goal: 'You can style a complete profile card: spacing, colour, type, and a flex row.',
    why: 'This is the artefact that proves the CSS module — not a pile of unrelated rules.',
    concept: 'Compose selectors, box model, colour, type, and flex on one component.',
    analogy: 'Finishing one well-painted room instead of buying more paint tins.',
    explanation:
      'Requirements:\n1) A card with padding, border or shadow, and radius\n2) A flex row for avatar + text\n3) Readable contrast\n4) A class-based stylesheet (not only tag selectors)\n5) A small badge using relative/absolute or a simple inline label\n\nReplace placeholder text with a real learner profile (yours is best).',
    example: 'Starter card in Code Lab — restyle it until it looks intentional.',
    code: `.card { display: flex; gap: 16px; padding: 16px; }
.avatar { /* size + circle */ }
.badge { /* small label */ }`,
    practice: {
      copy: 'Run the starter card.',
      modify: 'Change colours, radius, and type to your taste — keep contrast.',
      create: 'Meet all five requirements with your name and role. No leftover “Asha” unless that is you.',
    },
    mistake: 'Ten random properties and no structure (no flex, no padding, unreadable text).',
    debug: {
      broken: 'Avatar and text stacked awkwardly with no gap.',
      hint: 'display:flex; gap:16px; align-items:center on the card or inner row.',
    },
    guidedChallenge: 'Finish spacing and type before inventing extra decoration.',
    independentChallenge: 'Ship the card and share a progress note in Community.',
    quiz: [
      q('A reusable card look should live mainly in…', ['A class such as .card', 'Twenty ids', 'The address bar'], 0, 'Classes scale.'),
      q('Avatar + name on one line is usually…', ['A flex row', 'A Python for-loop', 'A <title> only'], 0, 'Flex for one axis.'),
      q('This project tests…', ['Composing CSS you already learned', 'Backend auth', 'APK signing'], 0, 'Synthesis.'),
    ],
    takeaways: ['One component, many skills.', 'Class + box + flex.', 'Next: JavaScript behaviour.'],
    cheatSheet: '.card + flex row + contrast + badge',
    youCanNow: 'Hand a styled card to the JS module.',
    nextId: 'js-01',
    lab: labHtml(
      `<article class="card">
  <div class="avatar">A</div>
  <div class="meta">
    <span class="badge">NEW</span>
    <h1>Asha</h1>
    <p>Web learner at SKONGA Academy</p>
  </div>
</article>`,
      base + '.card{position:relative;display:flex;gap:16px;align-items:center;padding:16px;border:1px solid #ddd;border-radius:16px;max-width:22rem}.avatar{width:64px;height:64px;border-radius:50%;background:#6d28d9;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.4rem}.meta h1{margin:0;font-size:1.2rem}.meta p{margin:4px 0 0;color:#444}.badge{display:inline-block;background:#ede9fe;color:#5b21b6;font-size:11px;padding:2px 6px;border-radius:999px}',
      ''
    ),
  }),
]
