import React from 'react'
import useAppStore from '../stores/useAppStore'
import styles from './PostCard.module.css'

const TYPE_META = {
  learn:    { label: '🧠 Nilijifunza', cls: 'tag-learn' },
  bug:      { label: '🐛 Bug', cls: 'tag-bug' },
  project:  { label: '🚀 Project', cls: 'tag-project' },
  question: { label: '❓ Swali', cls: 'tag-question' },
  challenge:{ label: '🎯 Challenge', cls: 'tag-challenge' },
  resource: { label: '📚 Resource', cls: 'tag-resource' },
  progress: { label: '📈 Progress', cls: 'tag-progress' },
}

const TECH_CLS = { JS: 'tb-js', JavaScript: 'tb-js', React: 'tb-react', Python: 'tb-python', HTML: 'tb-html', CSS: 'tb-css', 'Node.js': 'tb-node', API: 'tb-react' }

export default function PostCard({ post }) {
  const toggleLike = useAppStore(s => s.toggleLike)
  const meta = TYPE_META[post.type] || TYPE_META.learn

  return (
    <article className={`card ${styles.post} fade-up`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={`avatar avatar-md ${post.user.avatarColor}`}>
          {post.user.initials}
        </div>
        <div className={styles.meta}>
          <div className={styles.name}>{post.user.name}</div>
          <div className={styles.sub}>
            {post.timeAgo} iliyopita · {post.user.city} {post.user.country}
          </div>
        </div>
        <span className={`tag ${meta.cls}`}>{meta.label}</span>
      </div>

      {/* Streak */}
      {post.user.streak >= 7 && (
        <div className="streak-pill" style={{ marginBottom: 8, display: 'inline-flex' }}>
          🔥 {post.user.streak} day streak
        </div>
      )}

      {/* Body */}
      <p className={styles.body}>{post.content}</p>

      {/* Code block */}
      {post.code && (
        <pre className={styles.code}><code>{post.code}</code></pre>
      )}

      {/* Project card */}
      {post.project && (
        <div className={styles.projectBox}>
          <div className={styles.projectTech}>
            {post.project.tech.map(t => (
              <span key={t} className={`tech-badge ${TECH_CLS[t] || 'tb-js'}`}>{t}</span>
            ))}
          </div>
          <div className={styles.projectLinks}>
            {post.project.github && (
              <a href={post.project.github} className={`btn-dark ${styles.projBtn}`}>GitHub</a>
            )}
            {post.project.demo && (
              <a href={post.project.demo} className={`btn-primary ${styles.projBtn}`}>Live Demo</a>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        <button
          className={`${styles.action} ${post.liked ? styles.liked : ''}`}
          onClick={() => toggleLike(post.id)}
          aria-label={post.liked ? 'Toa like' : 'Penda'}
          aria-pressed={post.liked}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={post.liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          {post.likes}
        </button>

        <button className={styles.action} aria-label="Maoni">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          {post.comments}
        </button>

        {post.type === 'bug' && (
          <button className={`${styles.action} ${styles.helpBtn}`} aria-label="Saidia">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Saidia
          </button>
        )}

        <button className={styles.action} style={{ marginLeft: 'auto' }} aria-label="Shiriki">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </button>
      </div>
    </article>
  )
}
