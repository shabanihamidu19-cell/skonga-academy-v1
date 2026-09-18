import { lesson, q } from './lessonFactory'

/**
 * Pair programming pedagogy — NEW.
 * Research tip: driver + navigator, switch often.
 */

function L(partial) {
  return lesson({
    status: 'NEW-complete',
    difficulty: 'beginner',
    estimatedMinutes: 16,
    runtime: 'none',
    runtimeNote: 'Pairing is a social method. No Code Lab required.',
    lab: null,
    completion: { requireQuiz: true, requireLab: false },
    ...partial,
  })
}

const pair01 = L({
  id: 'pair-01',
  title: 'Pair programming — driver and navigator',
  order: 1,
  prerequisites: ['found-03'],
  goal: 'You can run a 20-minute pair session: one types, one thinks aloud, then switch.',
  why: 'Research and industry use pairing to catch mistakes early and reduce isolation.',
  concept:
    'Driver: hands on keyboard, types. Navigator: reads, suggests, watches for bugs. Switch every 5–10 minutes.',
  analogy: 'One person steers the cart; the other reads the map. Swap so both learn both skills.',
  explanation:
    'Rules of a SKONGA pair session:\n1) Agree on one small goal (e.g. finish one practice level).\n2) Driver types only what you both agree.\n3) Navigator does not grab the keyboard until switch.\n4) Switch on a timer.\n5) End with one sentence each: what we learned.\n\nRemote pair: shared screen + call. Solo day: use the rubber-duck version (explain aloud to yourself or Community).',
  subgoals: [
    'Name driver vs navigator',
    'Set a switch time',
    'Write one session goal',
  ],
  code: `Session card
Goal: _______________
Driver 1: ____  min 0–8
Driver 2: ____  min 8–16
Retro: one sentence each`,
  predict: {
    prompt: 'If the navigator stays silent the whole time, is that pairing?',
    answer: 'No — the navigator must actively think and speak.',
  },
  investigate: {
    prompt: 'Read the five rules above.',
    questions: [
      'Why switch roles?',
      'What is one good goal for a first pair on py-02?',
      'How does Community replace a missing partner?',
    ],
    reveal: 'Both must practice typing and thinking. Small goal. Post a question if solo.',
  },
  practice: {
    copy: 'Fill a session card on paper.',
    modify: 'Change switch time to 5 minutes for a harder task.',
    create: 'Invite a classmate or post in Community: “pair on found-04?”',
  },
  mistake: 'One person does all the work while the other watches videos.',
  debug: {
    broken: 'Navigator: “You just do it.”',
    hint: 'Ask a question every few lines: “What will this print?”',
  },
  tests: [
    { input: '20 min session', expected: 'at least one role switch + one retro sentence' },
  ],
  quiz: [
    q('Driver…', ['Types', 'Only watches forever', 'Only deploys'], 0, 'Hands on keys.'),
    q('Navigator…', ['Guides and checks', 'Must never speak', 'Deletes the repo'], 0, 'Map reader.'),
    q('Switching roles helps…', ['Both people practice both skills', 'Only the driver learn', 'Skip the quiz'], 0, 'Shared skill.'),
  ],
  takeaways: ['Two roles.', 'Switch.', 'Small goal + retro.'],
  cheatSheet: 'driver · navigator · timer · retro',
  youCanNow: 'Start a real pair session.',
  nextId: 'blk-01',
})

export const pairLessons = [pair01]
