import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { COURSES, flattenLessons } from '../data/curriculum'

const useProgressStore = create(
  persist(
    (set, get) => ({
      completedLessons: {},
      quizScores: {},
      labDone: {},
      testsDone: {},
      // PROPOSED default start (NEW path): foundations → notional machine.
      current: {
        courseId: 'foundations',
        moduleId: 'digital',
        lessonId: 'found-01',
      },
      streak: 0,
      lastStudyDate: null,

      setCurrent: (current) => set({ current }),

      markQuiz: (lessonId, score, total) =>
        set((s) => ({
          quizScores: { ...s.quizScores, [lessonId]: { score, total, passed: score / total >= 0.7 } },
        })),

      markLab: (lessonId) =>
        set((s) => ({ labDone: { ...s.labDone, [lessonId]: true } })),

      markTests: (lessonId) =>
        set((s) => ({ testsDone: { ...s.testsDone, [lessonId]: true } })),

      completeLesson: (lessonId) => {
        const today = new Date().toISOString().slice(0, 10)
        const last = get().lastStudyDate
        let streak = get().streak
        if (last !== today) {
          const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
          streak = last === y ? streak + 1 : 1
        }
        set((s) => ({
          completedLessons: { ...s.completedLessons, [lessonId]: true },
          lastStudyDate: today,
          streak,
        }))
      },

      isComplete: (lessonId) => !!get().completedLessons[lessonId],

      canComplete: (lesson) => {
        const quiz = get().quizScores[lesson.id]
        const quizOk = !lesson.completion?.requireQuiz || quiz?.passed
        const labOk = !lesson.completion?.requireLab || get().labDone[lesson.id]
        // Paper tests are self-check: required only when completion.requireTests is true.
        const testsOk =
          !lesson.completion?.requireTests ||
          !lesson.tests?.length ||
          !!get().testsDone[lesson.id]
        return !!(quizOk && labOk && testsOk)
      },

      courseStats: (courseId) => {
        const course = COURSES.find((c) => c.id === courseId)
        if (!course) return { done: 0, total: 0, pct: 0 }
        const list = flattenLessons(course)
        const done = list.filter((l) => get().completedLessons[l.id]).length
        const total = list.length
        return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }
      },
    }),
    { name: 'skonga-progress' }
  )
)

export default useProgressStore
