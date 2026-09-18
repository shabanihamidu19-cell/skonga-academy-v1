import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../stores/useAppStore'
import styles from './ChallengesPage.module.css'

export default function ChallengesPage() {
  const challenges = useAppStore(s => s.challenges)
  const active = challenges.filter(c => c.status === 'active')
  const upcoming = challenges.filter(c => c.status === 'upcoming')

  return (
    <div className={styles.page}>
      <header className="top-bar">
        <div className="top-bar-title">Challenges</div>
      </header>

      <div className="scroll-area">
        {active.length > 0 && (
          <>
            <p className="section-label">Zinaendelea</p>
            {active.map(c => <ChallengeCard key={c.id} challenge={c} />)}
          </>
        )}

        {upcoming.length > 0 && (
          <>
            <p className="section-label">Zinakuja</p>
            {upcoming.map(c => <ChallengeCard key={c.id} challenge={c} />)}
          </>
        )}

        <div className="bottom-spacer" />
      </div>
    </div>
  )
}

function ChallengeCard({ challenge: c }) {
  const nav = useNavigate()
  const visibleDays = c.days.slice(0, 10)

  return (
    <div className={`card ${styles.card} fade-up`}>
      <div className={styles.cardTop}>
        <div>
          <div className={styles.cardName}>{c.name}</div>
          <div className={styles.cardSub}>
            {c.status === 'active' ? `Siku ${c.daysLeft} zimebaki` : `Inaanza ${c.startDate}`}
          </div>
        </div>
        <span className={`tag ${c.status === 'active' ? 'tag-learn' : 'tag-progress'}`}>
          {c.status === 'active' ? 'Active' : 'Soon'}
        </span>
      </div>

      {/* Day track (only show first 10) */}
      <div className={styles.dayTrack} aria-label="Maendeleo ya challenge">
        {visibleDays.map(d => (
          <div
            key={d.day}
            className={`${styles.dayDot} ${
              d.status === 'done' ? styles.done :
              d.status === 'today' ? styles.today :
              styles.locked
            }`}
            aria-label={`Siku ${d.day}: ${d.status}`}
          >
            {d.status === 'done' ? '✓' : d.status === 'today' ? d.day : d.day}
          </div>
        ))}
        {c.days.length > 10 && (
          <div className={styles.moreDays}>+{c.days.length - 10}</div>
        )}
      </div>

      {/* Today's lesson (active only) */}
      {c.status === 'active' && c.todayTopic && (
        <div className={styles.todayBox}>
          <div className={styles.todayTitle}>Leo: Day {c.currentDay} — {c.days[c.currentDay - 1]?.topic || 'Lesson'}</div>
          <div className={styles.todayDesc}>{c.todayTopic}</div>
          <button
            className={`btn-primary btn-full ${styles.startBtn}`}
            onClick={() => nav('/learn')}
            title="TODO: challenge days are mock labels, not recovered lessons"
          >
            Open Learn
          </button>
        </div>
      )}

      <div className={styles.cardFooter}>
        <span className={styles.participants}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          {c.participants.toLocaleString()} learners
        </span>
        {c.status === 'upcoming' && (
          <button className="btn-dark" style={{ fontSize: 12, padding: '7px 16px' }}>
            Jiandikishe
          </button>
        )}
      </div>
    </div>
  )
}
