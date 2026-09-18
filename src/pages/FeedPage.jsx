import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../stores/useAppStore'
import useTranslation from '../i18n/useTranslation'
import { fetchPosts, createPost } from '../lib/posts'
import PostCard from '../components/PostCard'
import styles from './FeedPage.module.css'

export default function FeedPage() {
  const navigate = useNavigate()
  const unread = useAppStore((s) => s.unreadNotifications)
  const mockPosts = useAppStore((s) => s.getRankedPosts)
  const { t } = useTranslation()
  const [showCompose, setShowCompose] = useState(false)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingMock, setUsingMock] = useState(false)

  const loadPosts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchPosts()
      if (data && data.length > 0) {
        setPosts(data)
        setUsingMock(false)
      } else {
        // Empty DB → show mock so app is not empty
        setPosts(mockPosts())
        setUsingMock(true)
      }
    } catch (err) {
      console.warn('Fetch posts failed, using mock:', err.message)
      setPosts(mockPosts())
      setUsingMock(true)
    } finally {
      setLoading(false)
    }
  }, [mockPosts])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  const POST_TYPES = [
    { type: 'learn', emoji: '🧠', label: t('type.learn') },
    { type: 'bug', emoji: '🐛', label: t('type.bug') },
    { type: 'project', emoji: '🚀', label: t('type.project') },
    { type: 'question', emoji: '❓', label: t('type.question') },
  ]

  return (
    <div className={styles.page}>
      <header className="top-bar">
        <div className="logo">
          Dev<span>Path</span>
        </div>
        <div className={styles.topActions}>
          <button
            aria-label={`${t('nav.alerts')} ${unread > 0 ? `(${unread})` : ''}`}
            className={styles.iconBtn}
            onClick={() => navigate('/notifications')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unread > 0 && <span className={styles.notifDot} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div className="scroll-area">
        <div
          className={styles.composeBar}
          onClick={() => setShowCompose(true)}
          role="button"
          tabIndex={0}
          aria-label={t('feed.newPost')}
        >
          <div className="avatar avatar-sm av-teal">ME</div>
          <span className={styles.composePlaceholder}>{t('feed.composePlaceholder')}</span>
          <div className={styles.composeIcons}>
            {POST_TYPES.map((pt) => (
              <button
                key={pt.type}
                className={styles.composeIcon}
                aria-label={pt.label}
                onClick={(e) => {
                  e.stopPropagation()
                  setShowCompose(true)
                }}
              >
                {pt.emoji}
              </button>
            ))}
          </div>
        </div>

        <div
          className={styles.challengeBanner}
          onClick={() => navigate('/challenges')}
          role="button"
          tabIndex={0}
        >
          <div className={styles.challengeIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden="true">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <div className={styles.challengeText}>
            <div className={styles.challengeName}>{t('feed.challengeBanner')}</div>
            <div className={styles.challengeSub}>
              {t('feed.challengeSub', { day: 4, total: 30, count: 847 })}
            </div>
          </div>
          <button
            className={styles.challengeBtn}
            onClick={(e) => {
              e.stopPropagation()
              navigate('/challenges')
            }}
          >
            {t('feed.view')}
          </button>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)', fontSize: 13 }}>
            Inapakia posts...
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)', fontSize: 14 }}>
            Hakuna posts bado. Kuwa wa kwanza kuchapisha!
          </div>
        )}

        {!loading &&
          posts.map((post, i) => (
            <div key={post.id} style={{ animationDelay: `${i * 0.05}s` }}>
              <PostCard post={post} />
            </div>
          ))}

        <div className="bottom-spacer" />
      </div>

      {showCompose && (
        <ComposeModal
          onClose={() => setShowCompose(false)}
          onPosted={() => {
            setShowCompose(false)
            loadPosts()
          }}
        />
      )}
    </div>
  )
}

function ComposeModal({ onClose, onPosted }) {
  const addLocalPost = useAppStore((s) => s.addPost)
  const { t } = useTranslation()
  const [selectedType, setSelectedType] = useState('learn')
  const [content, setContent] = useState('')
  const [code, setCode] = useState('')
  const [showCode, setShowCode] = useState(false)
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState('')

  const POST_TYPES_FULL = [
    { type: 'learn', emoji: '🧠', label: t('type.learn') },
    { type: 'bug', emoji: '🐛', label: t('type.bug') },
    { type: 'project', emoji: '🚀', label: t('type.project') },
    { type: 'question', emoji: '❓', label: t('type.question') },
    { type: 'challenge', emoji: '🎯', label: t('type.challenge') },
    { type: 'progress', emoji: '📈', label: t('type.progress') },
  ]

  const handlePost = async () => {
    if (!content.trim() || posting) return
    setPosting(true)
    setError('')

    try {
      await createPost({
        type: selectedType,
        content: content.trim(),
        code: code.trim() || null,
      })
      onPosted()
    } catch (err) {
      // Fallback to local if Supabase fails
      console.warn('Supabase post failed, saving locally:', err.message)
      addLocalPost({
        id: Date.now().toString(),
        user: {
          id: 'me',
          name: 'Wewe',
          initials: 'ME',
          avatarColor: 'av-teal',
          country: '🇹🇿',
          city: 'Dar es Salaam',
          streak: 0,
        },
        type: selectedType,
        content: content.trim(),
        code: code.trim() || null,
        likes: 0,
        comments: 0,
        liked: false,
        tags: [],
      })
      onPosted()
    } finally {
      setPosting(false)
    }
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={t('feed.newPost')}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <button className={styles.cancelBtn} onClick={onClose} disabled={posting}>
            {t('feed.cancel')}
          </button>
          <span className={styles.modalTitle}>{t('feed.newPost')}</span>
          <button
            className={`btn-primary ${styles.postBtn}`}
            onClick={handlePost}
            disabled={!content.trim() || posting}
          >
            {posting ? '...' : t('feed.post')}
          </button>
        </div>

        <div className={styles.typeRow}>
          {POST_TYPES_FULL.map((pt) => (
            <button
              key={pt.type}
              className={`${styles.typeBtn} ${selectedType === pt.type ? styles.typeBtnActive : ''}`}
              onClick={() => setSelectedType(pt.type)}
              aria-pressed={selectedType === pt.type}
            >
              {pt.emoji} {pt.label}
            </button>
          ))}
        </div>

        <div className={styles.modalBody}>
          <div className={styles.composeRow}>
            <div className="avatar avatar-sm av-teal">ME</div>
            <textarea
              className={styles.textarea}
              placeholder={t('feed.composePlaceholder')}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              autoFocus
              rows={4}
            />
          </div>

          {showCode && (
            <textarea
              className={styles.codeInput}
              placeholder="// code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={4}
            />
          )}

          {error && (
            <div style={{ color: 'var(--coral-text)', fontSize: 13, padding: '0 16px' }}>{error}</div>
          )}
        </div>

        <div className={styles.modalActions}>
          <button className={styles.addCodeBtn} onClick={() => setShowCode(!showCode)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            {showCode ? t('feed.removeCode') : t('feed.addCode')}
          </button>
        </div>
      </div>
    </div>
  )
}
