import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { COURSES, getCourse } from '../data/curriculum'
import useProgressStore from '../stores/useProgressStore'
import styles from './LearnPage.module.css'

export default function LearnPage() {
  const { courseId } = useParams()
  const nav = useNavigate()
  const course = courseId ? getCourse(courseId) : null
  const isComplete = useProgressStore((s) => s.isComplete)
  const courseStats = useProgressStore((s) => s.courseStats)

  if (!course) {
    return (
      <div className={styles.page}>
        <header className="top-bar"><div className="top-bar-title">Learn</div></header>
        <div className="scroll-area">
          <p className={styles.lead}>Levels 0–7. Lessons are data. Completion needs a quiz — and a lab when the lesson includes one.</p>
          {COURSES.map((c) => {
            const st = courseStats(c.id)
            return (
              <button key={c.id} className={`card ${styles.course}`} onClick={() => nav(`/learn/${c.id}`)}>
                <div>
                  <div className={styles.lvl}>LEVEL {c.level}</div>
                  <strong>{c.title}</strong>
                  <p>{c.blurb}</p>
                </div>
                <span>{st.pct}%</span>
              </button>
            )
          })}
          <div className="bottom-spacer" />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <header className="top-bar">
        <button className="btn-dark" onClick={() => nav('/learn')}>All</button>
        <div className="top-bar-title">{course.title}</div>
      </header>
      <div className="scroll-area">
        <p className={styles.lead}>{course.blurb}</p>
        {course.modules.map((m) => (
          <section key={m.id}>
            <p className="section-label">{m.title}</p>
            {m.lessons.map((l, i) => (
              <button
                key={l.id}
                className={`card ${styles.lesson}`}
                onClick={() => nav(`/learn/${course.id}/${m.id}/${l.id}`)}
              >
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <span>
                  {l.title}
                  <small> {isComplete(l.id) ? '· done' : `· ${l.status || 'NEW-draft'}`}</small>
                </span>
              </button>
            ))}
          </section>
        ))}
        <div className="bottom-spacer" />
      </div>
    </div>
  )
}
