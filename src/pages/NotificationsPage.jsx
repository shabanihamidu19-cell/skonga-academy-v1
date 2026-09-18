import React, { useEffect } from 'react'
import useAppStore from '../stores/useAppStore'
import styles from './NotificationsPage.module.css'

const ICON_MAP = {
  like: { path: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z', cls: styles.iconCoral },
  comment: { path: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', cls: styles.iconTeal },
  challenge: { path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', cls: styles.iconPurple },
  buddy: { path: 'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM20 8v6M23 11h-6', cls: styles.iconTeal },
  milestone: { path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', cls: styles.iconAmber },
}

export default function NotificationsPage() {
  const notifications = useAppStore(s => s.notifications)
  const markRead = useAppStore(s => s.markNotificationsRead)

  useEffect(() => {
    const t = setTimeout(markRead, 500)
    return () => clearTimeout(t)
  }, [markRead])

  return (
    <div className={styles.page}>
      <header className="top-bar">
        <div className="top-bar-title">Arifa</div>
      </header>

      <div className="scroll-area">
        {notifications.map(n => {
          const icon = ICON_MAP[n.type] || ICON_MAP.milestone
          return (
            <div key={n.id} className={`${styles.item} ${n.unread ? styles.unread : ''}`}>
              <div className={`${styles.iconWrap} ${icon.cls}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d={icon.path} />
                </svg>
              </div>
              <div className={styles.content}>
                <p className={styles.message}>{n.message}</p>
                <span className={styles.time}>{n.timeAgo} iliyopita</span>
              </div>
              {n.unread && <span className={styles.dot} aria-label="Mpya" />}
            </div>
          )
        })}
        <div className="bottom-spacer" />
      </div>
    </div>
  )
}
