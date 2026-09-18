/**
 * Lesson factory for SKONGA Academy.
 * All content authored here is NEW (not recovered from DevPath).
 *
 * Pedagogy fields (optional):
 * - practice: { copy, modify, create }
 * - investigate: { prompt, questions: string[], reveal?: string }  // code-reading before write
 * - parsons: { prompt, lines: string[], solution: number[] }      // 0-based order of lines
 * - tests: [{ input, expected }]                                 // paper/manual test cases
 */
export function lesson(partial) {
  return {
    status: 'NEW-draft', // NEW-complete | NEW-draft | NEW-missing | TODO
    difficulty: 'beginner',
    estimatedMinutes: 15,
    prerequisites: [],
    lineByLine: [],
    quiz: [],
    assessment: [],
    takeaways: [],
    cheatSheet: '',
    lab: null,
    practice: null,
    investigate: null,
    parsons: null,
    tests: null,
    subgoals: null, // string[] labelled steps for worked examples
    runtime: 'html-css-js', // 'html-css-js' | 'none'
    runtimeNote: '',
    completion: { requireQuiz: true, requireLab: false },
    ...partial,
  }
}

export function q(question, choices, answer, why) {
  return { q: question, choices, answer, why }
}

export function labHtml(html, css = '', js = '') {
  return { html, css, js }
}

/** Helper: Parson's problem — lines are scrambled; solution is correct 0-based indices order. */
export function parsons(prompt, orderedLines) {
  const lines = orderedLines.slice()
  // stable scramble for display: reverse pairs if length > 2
  const scrambled = orderedLines.map((text, i) => ({ text, i }))
  for (let i = scrambled.length - 1; i > 0; i--) {
    const j = (i * 3 + 1) % (i + 1)
    ;[scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]]
  }
  return {
    prompt,
    lines: scrambled.map((s) => s.text),
    // solution = original indices in the scrambled array order needed
    solution: orderedLines.map((text) => scrambled.findIndex((s) => s.text === text && orderedLines.indexOf(text) === s.i || s.text === text)),
    ordered: orderedLines,
  }
}
