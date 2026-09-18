/**
 * SKONGA Academy curriculum registry.
 *
 * Provenance (authoritative):
 * - VERIFIED application code lives in the DevPath repo.
 * - DevPath contained no verified lesson bodies.
 * - Every lesson in this folder is NEW (authored for Academy v1).
 * - IDs such as web-02 / js-01 / py-01 are NEW registry IDs, not recovered historical IDs.
 * - Do not label these RECOVERED unless a verified source file is later mapped.
 */
import { foundations } from './foundations'
import { programming } from './programming'
import { web } from './web'
import { tools } from './tools'
import { backend } from './backend'
import { app } from './app'
import { ai } from './ai'
import { projects } from './projects'

export const COURSES = [
  foundations,
  programming,
  web,
  tools,
  backend,
  app,
  ai,
  projects,
]

export function getCourse(id) {
  return COURSES.find((c) => c.id === id) || null
}

export function getModule(courseId, moduleId) {
  const course = getCourse(courseId)
  return course?.modules.find((m) => m.id === moduleId) || null
}

export function getLesson(courseId, moduleId, lessonId) {
  const mod = getModule(courseId, moduleId)
  return mod?.lessons.find((l) => l.id === lessonId) || null
}

export function getLessonById(lessonId) {
  for (const course of COURSES) {
    for (const mod of course.modules) {
      const lesson = mod.lessons.find((l) => l.id === lessonId)
      if (lesson) {
        return { course, module: mod, lesson }
      }
    }
  }
  return null
}

export function getNextLesson(courseId, moduleId, lessonId) {
  const course = getCourse(courseId)
  if (!course) return null
  const mods = course.modules
  const mi = mods.findIndex((m) => m.id === moduleId)
  if (mi < 0) return null
  const lessons = mods[mi].lessons
  const li = lessons.findIndex((l) => l.id === lessonId)
  if (li < lessons.length - 1) {
    return { courseId, moduleId, lessonId: lessons[li + 1].id }
  }
  if (mi < mods.length - 1) {
    const next = mods[mi + 1]
    return { courseId, moduleId: next.id, lessonId: next.lessons[0].id }
  }
  return null
}

export function flattenLessons(course) {
  return course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleId: m.id, courseId: course.id }))
  )
}
