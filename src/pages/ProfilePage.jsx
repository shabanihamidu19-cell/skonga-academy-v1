import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../stores/useAppStore'
import useTranslation from '../i18n/useTranslation'
import { getCurrentUser, signOut } from '../lib/auth'
import styles from './ProfilePage.module.css'
import useProgressStore from '../stores/useProgressStore'
import { COURSES } from '../data/curriculum'

const TECH_CLS = {
  JS: 'tb-js',
  JavaScript: 'tb-js',
  React: 'tb-react',
  Python: 'tb-python',
  HTML: 'tb-html',
  CSS: 'tb-css',
  'Node.js': 'tb-node',
}

export default function ProfilePage() {
  const mockProfile = useAppStore((s) => s.profile)
  const courseStats = useProgressStore((s) => s.courseStats)
  const { t, lang, setLanguage } = useTranslation()
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)
  const [profile, setProfile] = useState(mockProfile)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        if (data?.profile) {
          const p = data.profile
          setProfile({
            ...mockProfile,
            name: p.full_name || p.username || mockProfile.name,
            initials: (p.full_name || p.username || 'U')
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2)
              .toUpperCase(),
            country: p.country || '🇹🇿',
            city: p.city || '',
            streak: p.streak || 0,
            bio: p.bio || mockProfile.bio,
            level: p.level || mockProfile.level,
            learning: p.learning?.length ? p.learning : mockProfile.learning,
          })
        }
      })
      .catch(() => {})
  }, [mockProfile])

  const pct = Math.round((profile.streak / (profile.streakGoal || 30)) * 100)
  const TABS = [t('profile.journey'), t('profile.projects'), t('profile.badges')]

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await signOut()
      navigate('/auth')
    } catch (err) {
      console.error(err)
      setLoggingOut(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.darkHeader}>
        <div className={styles.profileTop}>
          <div className={`avatar avatar-lg av-dark`}>{profile.initials}</div>
          <div className={styles.profileInfo}>
            <div className={styles.profileName}>{profile.name}</div>
            <div className={styles.profileRole}>{t('profile.level')}</div>
            <div className={styles.profileLoc}>
              {profile.country} {profile.city}
            </div>
          </div>
          <button className={styles.editBtn} onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? '...' : 'Toka'}
          </button>
        </div>

        <div className={styles.streakBar}>
          <span className={styles.fireEmoji}>🔥</span>
          <div className={styles.streakInfo}>
            <span className={styles.streakNum}>{profile.streak}</span>
            <span className={styles.streakLabel}>day streak</span>
          </div>
          <div className={styles.streakTrack}>
            <div className={styles.streakGoal}>
              {lang === 'sw' ? `Lengo: Siku ${profile.streakGoal || 30}` : `Goal: ${profile.streakGoal || 30} days`}
            </div>
            <div className={styles.streakRail}>
              <div
                className={styles.streakFill}
                style={{ width: `${Math.min(pct, 100)}%` }}
                role="progressbar"
                aria-valuenow={profile.streak}
                aria-valuemax={profile.streakGoal || 30}
              />
            </div>
          </div>
        </div>
      </div>

      
      <div style={{ padding: '0 16px 12px' }}>
        <p className="section-label">Courses</p>
        {COURSES.map((c) => {
          const st = courseStats(c.id)
          return (
            <div key={c.id} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span>{c.title}</span><span>{st.pct}%</span>
              </div>
              <div style={{ height: 6, background: '#222', borderRadius: 99 }}>
                <div style={{ width: st.pct + '%', height: '100%', background: '#a78bfa', borderRadius: 99 }} />
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statBox}>
          <div className={styles.statNum}>{profile.stats?.projects || 0}</div>
          <div className={styles.statLabel}>{t('profile.projects')}</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statNum}>{profile.stats?.challenges || 0}</div>
          <div className={styles.statLabel}>Challenges</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statNum}>{profile.stats?.activities || 0}</div>
          <div className={styles.statLabel}>Activities</div>
        </div>
      </div>

      {/* Language */}
      <div className={styles.techRow} style={{ justifyContent: 'space-between' }}>
        <span className={styles.techLabel}>{t('profile.language')}:</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className="tech-badge"
            style={{
              cursor: 'pointer',
              border: lang === 'sw' ? '1.5px solid var(--brand-teal)' : '1px solid var(--border)',
              background: lang === 'sw' ? 'var(--brand-teal-light)' : 'var(--bg-muted)',
            }}
            onClick={() => setLanguage('sw')}
          >
            🇹🇿 {t('profile.languageSw')}
          </button>
          <button
            className="tech-badge"
            style={{
              cursor: 'pointer',
              border: lang === 'en' ? '1.5px solid var(--brand-teal)' : '1px solid var(--border)',
              background: lang === 'en' ? 'var(--brand-teal-light)' : 'var(--bg-muted)',
            }}
            onClick={() => setLanguage('en')}
          >
            🇬🇧 {t('profile.languageEn')}
          </button>
        </div>
      </div>

      <div className={styles.techRow}>
        <span className={styles.techLabel}>{lang === 'sw' ? 'Inajifunza:' : 'Learning:'}</span>
        {(profile.learning || []).map((tech) => (
          <span key={tech} className={`tech-badge ${TECH_CLS[tech] || 'tb-js'} ${styles.activeTech}`}>
            {tech}
          </span>
        ))}
      </div>

      <div className={styles.tabs} role="tablist">
        {TABS.map((label, i) => (
          <button
            key={label}
            role="tab"
            aria-selected={tab === i}
            className={`${styles.tab} ${tab === i ? styles.tabActive : ''}`}
            onClick={() => setTab(i)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="scroll-area">
        {tab === 0 && <JourneyTab profile={profile} />}
        {tab === 1 && <ProjectsTab profile={profile} lang={lang} />}
        {tab === 2 && <BadgesTab profile={profile} />}
        <div className="bottom-spacer" />
      </div>
    </div>
  )
}

function JourneyTab({ profile }) {
  const items = profile.journey || []
  return (
    <>
      <p className="section-label">Journey</p>
      {items.map((item) => (
        <div
          key={item.id}
          className={`${styles.journeyItem} ${item.status === 'current' ? styles.journeyCurrent : ''}`}
        >
          <div className={`${styles.jDot} ${styles[`jDot_${item.status}`]}`} aria-hidden="true" />
          <div className={styles.jText} style={item.status === 'upcoming' ? { opacity: 0.5 } : {}}>
            {item.title}
          </div>
          <div className={`${styles.jMeta} ${item.status === 'current' ? styles.jMetaCurrent : ''}`}>
            {item.timeAgo}
          </div>
        </div>
      ))}
    </>
  )
}

function ProjectsTab({ profile, lang }) {
  const TECH_CLS_P = { HTML: 'tb-html', CSS: 'tb-css', JS: 'tb-js' }
  const projects = profile.projects || []
  return (
    <>
      <p className="section-label">Projects ({projects.length})</p>
      {projects.map((p) => (
        <div key={p.id} className={`card ${styles.projCard}`}>
          <div className={styles.projTop}>
            <div>
              <div className={styles.projName}>{p.name}</div>
              <div className={styles.projAge}>
                {lang === 'sw' ? `Siku ${p.daysAgo} zilizopita` : `${p.daysAgo} days ago`}
              </div>
            </div>
            <span style={{ fontSize: 26 }}>{p.emoji}</span>
          </div>
          <div className={styles.projFooter}>
            <div style={{ display: 'flex', gap: 5 }}>
              {(p.tech || []).map((tech) => (
                <span key={tech} className={`tech-badge ${TECH_CLS_P[tech] || 'tb-js'}`}>
                  {tech}
                </span>
              ))}
            </div>
            <span style={{ fontSize: 12, color: 'var(--coral-text)' }}>❤️ {p.likes}</span>
          </div>
        </div>
      ))}
    </>
  )
}

function BadgesTab({ profile }) {
  const badges = profile.badges || []
  return (
    <>
      <p className="section-label">Achievements ({badges.length})</p>
      <div className={styles.badgesGrid}>
        {badges.map((b) => (
          <div key={b.id} className={`card ${styles.badgeCard}`}>
            <div className={styles.badgeEmoji}>{b.emoji}</div>
            <div className={styles.badgeName}>{b.name}</div>
            <div className={styles.badgeDesc}>{b.desc}</div>
          </div>
        ))}
      </div>
    </>
  )
}
