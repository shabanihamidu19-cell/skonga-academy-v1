import React from 'react'
import { useNavigate } from 'react-router-dom'
import { COURSES, getLessonById } from '../data/curriculum'
import useProgressStore from '../stores/useProgressStore'
import useAppStore from '../stores/useAppStore'
import styles from './HomePage.module.css'

export default function HomePage() {
  const nav = useNavigate()
  const current = useProgressStore((s) => s.current)
  const streak = useProgressStore((s) => s.streak)
  const courseStats = useProgressStore((s) => s.courseStats)
  const posts = useAppStore((s) => s.posts)
  const loc = current?.lessonId ? getLessonById(current.lessonId) : null
  const currentCourseId = loc?.course?.id
  const currentPct = currentCourseId ? courseStats(currentCourseId).pct : 0

  return (
    <div className={styles.page}>
      <header className="top-bar">
        <div className="top-bar-title">SKONGA Academy</div>
      </header>
      <div className="scroll-area">
        <p className={styles.hello}>Learn. Code. Build. Connect.</p>
        <p className={styles.sub}>Shule ya programming + Code Lab + community. Si feed tu.</p>

        <div
          className={`card ${styles.continue}`}
          onClick={() => {
            if (loc) nav(`/learn/${loc.course.id}/${loc.module.id}/${loc.lesson.id}`)
            else nav('/learn')
          }}
        >
          <div className="section-label" style={{ margin: 0 }}>Continue learning</div>
          <h2>{loc ? loc.lesson.title : 'Choose a learning path'}</h2>
          <p>{loc ? `${loc.course.title} · ${loc.module.title}` : 'Open Learn to start'}</p>
          <div className={styles.bar}><span style={{ width: `${currentPct}%` }} /></div>
          <small>
            {currentCourseId ? `${loc.course.title} ${currentPct}%` : 'No course in progress'}
            {' · '}streak {streak || 0} days
          </small>
        </div>

        <p className="section-label">Quick</p>
        <div className={styles.grid}>
          <button className="btn-primary" onClick={() => nav('/learn')}>Open Learn</button>
          <button className="btn-dark" onClick={() => nav('/lab')}>Code Lab</button>
          <button className="btn-dark" onClick={() => nav('/projects')}>Projects</button>
          <button className="btn-dark" onClick={() => nav('/challenges')}>Challenges</button>
        </div>

        <p className="section-label">Paths</p>
        {COURSES.map((c) => {
          const st = courseStats(c.id)
          return (
            <button key={c.id} className={`card ${styles.path}`} onClick={() => nav(`/learn/${c.id}`)}>
              <strong>L{c.level} · {c.title}</strong>
              <span>{st.done}/{st.total} lessons</span>
            </button>
          )
        })}

        <p className="section-label">Community</p>
        {posts.slice(0, 2).map((p) => (
          <div key={p.id} className="card" style={{ marginBottom: 10 }}>
            <small>{p.type} · {p.user.name}</small>
            <p>{p.content}</p>
          </div>
        ))}
        <button className="btn-dark btn-full" onClick={() => nav('/community')}>Open community</button>
        <div className="bottom-spacer" />
      </div>
    </div>
  )
}
