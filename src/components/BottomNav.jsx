import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAppStore from '../stores/useAppStore'
import Icon from './Icons'
import styles from './BottomNav.module.css'

const NAV_ITEMS = [
  { path: '/', key: 'Home', icon: 'home' },
  { path: '/learn', key: 'Learn', icon: 'compass' },
  { path: '/lab', key: 'Lab', icon: 'trophy' },
  { path: '/community', key: 'Community', icon: 'bell' },
  { path: '/profile', key: 'Profile', icon: 'user-circle' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const unread = useAppStore((s) => s.unreadNotifications)

  const active = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => {
        const isActive = active(item.path)
        return (
          <button
            key={item.path}
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            onClick={() => navigate(item.path)}
            aria-label={item.key}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className={styles.iconWrap}>
              <Icon
                name={item.icon}
                size={22}
                strokeWidth={isActive ? 2 : 1.6}
                filled={isActive}
                className={styles.icon}
              />
              {item.path === '/community' && unread > 0 && (
                <span className={styles.badge}>{unread > 9 ? '9+' : unread}</span>
              )}
            </span>
            <span className={styles.label}>{item.key}</span>
            {isActive && <span className={styles.dot} aria-hidden="true" />}
          </button>
        )
      })}
    </nav>
  )
}
