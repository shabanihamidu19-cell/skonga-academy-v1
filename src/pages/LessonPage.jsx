import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getLesson, getNextLesson, getLessonById } from '../data/curriculum'
import useProgressStore from '../stores/useProgressStore'
import useLabStore from '../stores/useLabStore'
import useAppStore from '../stores/useAppStore'
import styles from './LessonPage.module.css'

export default function LessonPage() {
  const { courseId, moduleId, lessonId } = useParams()
  const lesson = getLesson(courseId, moduleId, lessonId)
  const nav = useNavigate()
  const markQuiz = useProgressStore((s) => s.markQuiz)
  const markTests = useProgressStore((s) => s.markTests)
  const testsDone = useProgressStore((s) => s.testsDone)
  const completeLesson = useProgressStore((s) => s.completeLesson)
  const canComplete = useProgressStore((s) => s.canComplete)
  const isComplete = useProgressStore((s) => s.isComplete)
  const setCurrent = useProgressStore((s) => s.setCurrent)
  const loadStarter = useLabStore((s) => s.loadStarter)
  const addPost = useAppStore((s) => s.addPost)
  const profile = useAppStore((s) => s.profile)

  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [asked, setAsked] = useState(false)
  const [parsonsOrder, setParsonsOrder] = useState([])
  const [parsonsMsg, setParsonsMsg] = useState('')

  useEffect(() => {
    if (lesson) setCurrent({ courseId, moduleId, lessonId })
  }, [lesson, courseId, moduleId, lessonId, setCurrent])

  useEffect(() => {
    if (lesson?.parsons?.lines) {
      setParsonsOrder(lesson.parsons.lines.slice())
      setParsonsMsg('')
    } else {
      setParsonsOrder([])
      setParsonsMsg('')
    }
  }, [lesson?.id])

  if (!lesson) {
    return <div className="scroll-area" style={{ padding: 24 }}>Lesson not found.</div>
  }

  const quiz = lesson.quiz || []
  const score = quiz.reduce((n, item, i) => n + (answers[i] === item.answer ? 1 : 0), 0)

  const submitQuiz = () => {
    setSubmitted(true)
    if (quiz.length) markQuiz(lesson.id, score, quiz.length)
  }

  const finish = () => {
    // Opening the page is not completion. Quiz/lab flags on the lesson decide.
    if (canComplete(lesson)) completeLesson(lesson.id)
    const next = getNextLesson(courseId, moduleId, lessonId)
    if (next) {
      nav(`/learn/${next.courseId}/${next.moduleId}/${next.lessonId}`)
      return
    }
    // Cross-course / cross-module link from lesson.nextId (curriculum graph).
    if (lesson.nextId) {
      const loc = getLessonById(lesson.nextId)
      if (loc) {
        nav(`/learn/${loc.course.id}/${loc.module.id}/${loc.lesson.id}`)
        return
      }
    }
    nav(`/learn/${courseId}`)
  }

  const openLab = () => {
    if (lesson.lab) loadStarter(lesson.lab, lesson.id)
    nav(lesson.lab ? `/lab/${lesson.id}` : '/lab')
  }

  const ask = () => {
    addPost({
      id: 'q-' + Date.now(),
      user: { id: 'me', name: profile.name, initials: profile.initials, avatarColor: 'av-purple', country: profile.country, city: profile.city, streak: profile.streak },
      type: 'question',
      content: `Nisaidie kwenye lesson: ${lesson.title}`,
      likes: 0,
      comments: 0,
      liked: false,
      tags: [courseId],
      courseId,
      moduleId,
      lessonId,
      topic: lesson.title,
    })
    setAsked(true)
    nav('/community')
  }

  return (
    <div className={styles.page}>
      <header className="top-bar">
        <button className="btn-dark" onClick={() => nav(`/learn/${courseId}`)}>Back</button>
        <div className="top-bar-title">{lesson.title}</div>
      </header>
      <div className="scroll-area">
        <article className={styles.article}>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: '0 0 12px' }}>
            {lesson.status || 'NEW'}
            {lesson.estimatedMinutes ? ` · ~${lesson.estimatedMinutes} min` : ''}
            {lesson.difficulty ? ` · ${lesson.difficulty}` : ''}
            {lesson.runtime === 'none' ? ' · no browser Run' : ''}
          </p>
          {lesson.runtime === 'none' && lesson.runtimeNote && (
            <Section n="00" title="Runtime (honest)">
              {lesson.runtimeNote}
            </Section>
          )}
          <Section n="01" title="Learning Goal">{lesson.goal}</Section>
          {lesson.prerequisites?.length > 0 && (
            <Section n="02" title="Prerequisites">{lesson.prerequisites.join(', ')}</Section>
          )}
          <Section n="03" title="Why this matters">{lesson.why}</Section>
          <Section n="04" title="Concept">{lesson.concept}</Section>
          <Section n="05" title="Explanation">{lesson.explanation}</Section>
          <Section n="06" title="Analogy">{lesson.analogy}</Section>
          {lesson.code && (
            <Section n="07" title="Code">
              <pre className={styles.pre}>{lesson.code}</pre>
            </Section>
          )}
          {lesson.lineByLine?.length > 0 && (
            <Section n="08" title="Line by line">
              <ul>{lesson.lineByLine.map((row) => <li key={row.line}><code>{row.line}</code> — {row.text}</li>)}</ul>
            </Section>
          )}
          {lesson.predict && (
            <Section n="09" title="Predict">{lesson.predict.prompt}
              <details><summary>Check</summary><p>{lesson.predict.answer}</p></details>
            </Section>
          )}
          {lesson.investigate && (
            <Section n="09b" title="Investigate (read before you write)">
              <p>{lesson.investigate.prompt}</p>
              <ol>
                {(lesson.investigate.questions || []).map((qq) => (
                  <li key={qq}>{qq}</li>
                ))}
              </ol>
              {lesson.investigate.reveal && (
                <details>
                  <summary>Reveal</summary>
                  <p>{lesson.investigate.reveal}</p>
                </details>
              )}
            </Section>
          )}
          {lesson.subgoals?.length > 0 && (
            <Section n="04b" title="Subgoals (worked path)">
              <ol>
                {lesson.subgoals.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ol>
            </Section>
          )}
          {lesson.parsons && (
            <Section n="09c" title="Parson’s problem (order the lines)">
              <p>{lesson.parsons.prompt}</p>
              <ol className={styles.parsonsList}>
                {parsonsOrder.map((ln, i) => (
                  <li key={ln + i} className={styles.parsonsItem}>
                    <code>{ln}</code>
                    <span className={styles.parsonsBtns}>
                      <button type="button" className="btn-dark" disabled={i === 0} onClick={() => {
                        const next = parsonsOrder.slice()
                        ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
                        setParsonsOrder(next)
                        setParsonsMsg('')
                      }}>↑</button>
                      <button type="button" className="btn-dark" disabled={i === parsonsOrder.length - 1} onClick={() => {
                        const next = parsonsOrder.slice()
                        ;[next[i + 1], next[i]] = [next[i], next[i + 1]]
                        setParsonsOrder(next)
                        setParsonsMsg('')
                      }}>↓</button>
                    </span>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  const target = lesson.parsons.ordered || []
                  const ok = target.length === parsonsOrder.length && target.every((line, i) => line === parsonsOrder[i])
                  setParsonsMsg(ok ? 'Correct order ✓' : 'Not yet — keep swapping.')
                }}
              >
                Check order
              </button>
              {parsonsMsg && <p style={{ marginTop: 8 }}>{parsonsMsg}</p>}
              <details style={{ marginTop: 8 }}>
                <summary>Reveal correct order</summary>
                <pre className={styles.pre}>{(lesson.parsons.ordered || []).join('\n')}</pre>
              </details>
            </Section>
          )}
          {lesson.tests?.length > 0 && (
            <Section n="09d" title="Test cases (check on paper)">
              <ul>
                {lesson.tests.map((t) => (
                  <li key={String(t.input)}><strong>Input:</strong> {t.input} → <strong>Expect:</strong> {t.expected}</li>
                ))}
              </ul>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
                <input
                  type="checkbox"
                  checked={!!testsDone[lesson.id]}
                  onChange={(e) => { if (e.target.checked) markTests(lesson.id) }}
                />
                <span>I traced these cases on paper</span>
              </label>
            </Section>
          )}
          <Section n="10" title="Practice levels">
            <p>🟢 Copy & understand — {lesson.practice?.copy || lesson.tryIt || 'Follow the working example.'}</p>
            <p>🟡 Modify — {lesson.practice?.modify || lesson.modify || 'Change one value and observe.'}</p>
            <p>🔴 Create — {lesson.practice?.create || lesson.independentChallenge || 'Solve a small problem without the full solution.'}</p>
          </Section>
          {lesson.mistake && <Section n="11" title="Common mistake">{lesson.mistake}</Section>}
          {lesson.debug && (
            <Section n="12" title="Debug">
              <pre className={styles.pre}>{lesson.debug.broken}</pre>
              <p>{lesson.debug.hint}</p>
            </Section>
          )}
          {lesson.guidedChallenge && <Section n="13" title="Guided challenge">{lesson.guidedChallenge}</Section>}

          {quiz.length > 0 && (
            <Section n="14" title="Quiz">
              {quiz.map((item, i) => (
                <div key={item.q} className={styles.q}>
                  <p>{item.q}</p>
                  {item.choices.map((c, ci) => (
                    <label key={c}>
                      <input
                        type="radio"
                        name={'q' + i}
                        disabled={submitted}
                        checked={answers[i] === ci}
                        onChange={() => setAnswers({ ...answers, [i]: ci })}
                      />
                      {c}
                    </label>
                  ))}
                  {submitted && <small>{answers[i] === item.answer ? '✓' : '✗'} {item.why}</small>}
                </div>
              ))}
              {!submitted ? (
                <button className="btn-primary" onClick={submitQuiz}>Submit quiz</button>
              ) : (
                <p>Score {score}/{quiz.length}</p>
              )}
            </Section>
          )}

          {lesson.takeaways && (
            <Section n="15" title="Takeaways">
              <ul>{lesson.takeaways.map((t) => <li key={t}>{t}</li>)}</ul>
            </Section>
          )}
          {lesson.cheatSheet && <Section n="16" title="Cheat sheet"><pre className={styles.pre}>{lesson.cheatSheet}</pre></Section>}
          <Section n="17" title="What you can do now">{lesson.youCanNow}</Section>
        </article>

        <div className={styles.actions}>
          {lesson.lab && lesson.runtime !== 'none' && (
            <button className="btn-primary btn-full" onClick={openLab}>Open in Code Lab</button>
          )}
          {lesson.runtime === 'none' && (
            <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: '0 0 8px' }}>
              No Code Lab Run for this lesson — complete the quiz after you predict and write.
            </p>
          )}
          <button className="btn-dark btn-full" onClick={ask} disabled={asked}>Ask community about this lesson</button>
          <button className="btn-primary btn-full" onClick={finish}>
            {isComplete(lesson.id)
              ? 'Continue'
              : canComplete(lesson)
                ? 'Complete & next'
                : 'Next (finish quiz/lab to complete)'}
          </button>
        </div>
        <div className="bottom-spacer" />
      </div>
    </div>
  )
}

function Section({ n, title, children }) {
  return (
    <section className={styles.sec}>
      <h3><span>{n}</span> {title}</h3>
      <div>{children}</div>
    </section>
  )
}
