import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import LearnPage from './pages/LearnPage'
import LessonPage from './pages/LessonPage'
import CodeLabPage from './pages/CodeLabPage'
import ProjectsPage from './pages/ProjectsPage'
import FeedPage from './pages/FeedPage'
import ExplorePage from './pages/ExplorePage'
import ChallengesPage from './pages/ChallengesPage'
import NotificationsPage from './pages/NotificationsPage'
import ProfilePage from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'
import { getSession, onAuthStateChange } from './lib/auth'

export default function App() {
  const location = useLocation()
  const [session, setSession] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    getSession()
      .then((s) => setSession(s))
      .catch(() => setSession(null))

    const sub = onAuthStateChange((_event, s) => setSession(s))
    return () => sub?.data?.subscription?.unsubscribe?.()
  }, [])

  const hideNav = location.pathname.startsWith('/auth')

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/learn/:courseId" element={<LearnPage />} />
        <Route path="/learn/:courseId/:moduleId/:lessonId" element={<LessonPage />} />
        <Route path="/lab" element={<CodeLabPage />} />
        <Route path="/lab/:exerciseId" element={<CodeLabPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/community" element={<FeedPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/auth" element={session ? <Navigate to="/" replace /> : <AuthPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideNav && <BottomNav />}
    </>
  )
}
