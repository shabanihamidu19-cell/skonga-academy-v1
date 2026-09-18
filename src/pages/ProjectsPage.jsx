import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getCourse } from '../data/curriculum'
import useProgressStore from '../stores/useProgressStore'
import useAppStore from '../stores/useAppStore'

export default function ProjectsPage() {
  const nav = useNavigate()
  const course = getCourse('projects')
  const isComplete = useProgressStore((s) => s.isComplete)
  const showcase = useAppStore((s) => s.projects)

  return (
    <div>
      <header className="top-bar"><div className="top-bar-title">Projects</div></header>
      <div className="scroll-area">
        <p className="section-label">Guided</p>
        {course.modules[0].lessons.map((p) => (
          <button
            key={p.id}
            className="card"
            style={{ width: 'calc(100% - 32px)', margin: '0 16px 8px', textAlign: 'left' }}
            onClick={() => nav(`/learn/projects/guided/${p.id}`)}
          >
            <strong>{p.title}</strong>
            <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
              {p.goal} {isComplete(p.id) ? '· done' : `· ${p.status || 'NEW'}`}
            </div>
          </button>
        ))}
        <p className="section-label">Showcase</p>
        {showcase.map((p) => (
          <div key={p.id} className="card" style={{ margin: '0 16px 8px' }}>
            <strong>{p.emoji} {p.name}</strong>
            <p>{p.description}</p>
          </div>
        ))}
        <div className="bottom-spacer" />
      </div>
    </div>
  )
}
