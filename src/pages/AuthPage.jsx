import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp } from '../lib/auth'
import styles from './AuthPage.module.css'

export default function AuthPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('signup') // default to registration
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        const data = await signUp({
          email: email.trim(),
          password,
          fullName: fullName.trim() || email.split('@')[0],
          username: email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, ''),
        })

        // If session exists (email confirm disabled) → go to app
        if (data.session) {
          navigate('/')
          return
        }

        // Otherwise try auto sign-in
        try {
          await signIn({ email: email.trim(), password })
          navigate('/')
          return
        } catch {
          setMessage('Akaunti imeundwa! Sasa ingia na email yako.')
          setMode('signin')
        }
      } else {
        await signIn({ email: email.trim(), password })
        navigate('/')
      }
    } catch (err) {
      const msg = err?.message || 'Hitilafu imetokea. Jaribu tena.'
      if (msg.includes('Invalid login')) {
        setError('Email au password si sahihi.')
      } else if (msg.includes('already registered') || msg.includes('already been registered')) {
        setError('Email hii tayari imesajiliwa. Ingia badala yake.')
        setMode('signin')
      } else if (msg.includes('Password')) {
        setError('Password lazima iwe angalau herufi 6.')
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          Dev<span>Path</span>
        </div>
        <p className={styles.subtitle}>
          {mode === 'signin'
            ? 'Karibu tena — endelea na journey yako'
            : 'Jiunge na learners wa Afrika Mashariki'}
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Jina kamili"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={styles.input}
              autoComplete="name"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="Password (min 6)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
            minLength={6}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          />

          {error && <div className={styles.error}>{error}</div>}
          {message && <div className={styles.success}>{message}</div>}

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? 'Inafanya...' : mode === 'signin' ? 'Ingia' : 'Jisajili'}
          </button>
        </form>

        <button
          type="button"
          className={styles.switch}
          onClick={() => {
            setMode(mode === 'signin' ? 'signup' : 'signin')
            setError('')
            setMessage('')
          }}
        >
          {mode === 'signin' ? 'Huna akaunti? Jisajili' : 'Una akaunti? Ingia'}
        </button>
      </div>
    </div>
  )
}
