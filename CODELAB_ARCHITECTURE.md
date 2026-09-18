# CODE LAB ARCHITECTURE

## Scope v1

Languages: **HTML, CSS, JavaScript only**.

No Python/Node runtime in the browser in v1. Python lessons use predict/modify/create in the Lesson Player without Run-in-Lab.

## Surface

```
[ HTML | CSS | JS ]     [ Run ] [ Reset ] [ Fullscreen ]
+------------------+   +------------------+
| Code editor      |   | iframe preview   |
| line numbers     |   | (srcdoc)         |
+------------------+   +------------------+
| Console (log / error / warn)            |
```

Mobile: stacked editor → Run → preview. Desktop: split.

## How preview works

On Run:

1. Concatenate CSS into `<style>`, JS into `<script>`
2. Wrap JS in try/catch
3. Inject a console bridge:

```js
['log','warn','error'].forEach(fn => {
  const orig = console[fn]
  console[fn] = (...args) => {
    parent.postMessage({ type: 'skonga-console', fn, args: args.map(String) }, '*')
    orig.apply(console, args)
  }
})
window.onerror = (msg) => parent.postMessage({ type: 'skonga-console', fn: 'error', args: [String(msg)] }, '*')
```

4. Set `iframe.srcdoc` to the document
5. Sandbox: `allow-scripts` only (no same-origin)

Reset restores lesson starter or blank template.

## Lesson integration

Lesson data may include `lab: { html, css, js, challenge }`.

Route `/lab/:exerciseId` loads that starter via `getExercise(exerciseId)`.

Buttons:

- Open in Code Lab → navigate with starter
- Check challenge → simple string/DOM assertion where defined, else self-attest + quiz

Progress: `completeLab(lessonId)` in progress store.

## Editor v1 implementation choice

No extra npm dependency required for v1:

- `textarea` + line-number gutter
- tab key inserts two spaces
- language label only (highlighting can be added later with a lightweight highlighter)

This keeps Vite bundle small and mobile-usable. Syntax highlighting is a Phase 2 enhancement, not a blocker for Run/Preview.

## Security

- srcdoc + sandbox
- do not eval in parent
- no remote script URLs in starters we ship
