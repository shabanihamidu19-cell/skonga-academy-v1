import React, { useState } from 'react'
import useAppStore from '../stores/useAppStore'
import styles from './ExplorePage.module.css'

const TABS = ['Study Buddies', 'Projects']

const TECH_CLS = { JS: 'tb-js', JavaScript: 'tb-js', React: 'tb-react', Python: 'tb-python', HTML: 'tb-html', CSS: 'tb-css', 'Node.js': 'tb-node', API: 'tb-react' }

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState(0)
  const [query, setQuery] = useState('')
  const buddies = useAppStore(s => s.buddies)
  const projects = useAppStore(s => s.projects)
  const connectBuddy = useAppStore(s => s.connectBuddy)

  return (
    <div className={styles.page}>
      <header className="top-bar">
        <div className="top-bar-title">Explore</div>
      </header>

      {/* Search */}
      <div className={styles.searchWrap}>
        <div className={styles.searchBox}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="search"
            placeholder="Tafuta learners, projects, topics..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Tafuta"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs} role="tablist">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === i}
            className={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="scroll-area">
        {activeTab === 0 && (
          <>
            <p className="section-label">Wanaojifunza JavaScript kama wewe</p>
            {buddies.map(buddy => (
              <div key={buddy.id} className={`card ${styles.buddyCard} fade-up`}>
                <div className={styles.buddyTop}>
                  <div className={`avatar avatar-md ${buddy.avatarColor}`}>{buddy.initials}</div>
                  <div className={styles.buddyInfo}>
                    <div className={styles.buddyName}>{buddy.name}</div>
                    <div className={styles.buddyLevel}>{buddy.level} · Miezi {buddy.monthsLearning}</div>
                  </div>
                  <button
                    className={buddy.isMentor
                      ? `btn-ghost ${styles.connectBtn}`
                      : buddy.connected
                        ? `btn-ghost ${styles.connectBtn}`
                        : `btn-dark ${styles.connectBtn}`}
                    onClick={() => connectBuddy(buddy.id)}
                    aria-label={buddy.isMentor ? 'Omba mentor' : buddy.connected ? 'Connected' : 'Connect'}
                  >
                    {buddy.isMentor ? 'Mentor' : buddy.connected ? 'Connected ✓' : 'Connect'}
                  </button>
                </div>
                <div className={styles.buddyTags}>
                  {buddy.learning.map(t => (
                    <span key={t} className={`tech-badge ${TECH_CLS[t] || 'tb-js'}`}>{t}</span>
                  ))}
                </div>
                <div className={styles.buddyFooter}>
                  <span className={styles.buddyStreak}>🔥 {buddy.streak} day streak</span>
                  <span className={styles.buddyCity}>{buddy.city} {buddy.country}</span>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 1 && (
          <>
            <p className="section-label">Projects za hivi karibuni</p>
            {projects.map(proj => (
              <div key={proj.id} className={`card ${styles.projCard} fade-up`}>
                <div className={styles.projTop}>
                  <div>
                    <div className={styles.projName}>{proj.name}</div>
                    <div className={styles.projAuthor}>na {proj.author}</div>
                  </div>
                  <span className={styles.projEmoji}>{proj.emoji}</span>
                </div>
                <p className={styles.projDesc}>{proj.description}</p>
                <div className={styles.projFooter}>
                  <div className={styles.projTech}>
                    {proj.tech.map(t => (
                      <span key={t} className={`tech-badge ${TECH_CLS[t] || 'tb-js'}`}>{t}</span>
                    ))}
                  </div>
                  <div className={styles.projStats}>
                    <span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                      {proj.views}
                    </span>
                    <span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                      {proj.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        <div className="bottom-spacer" />
      </div>
    </div>
  )
}
