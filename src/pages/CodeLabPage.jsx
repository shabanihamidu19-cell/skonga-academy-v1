import React, { useEffect, useMemo, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useLabStore from '../stores/useLabStore'
import useProgressStore from '../stores/useProgressStore'
import { getLessonById } from '../data/curriculum'
import styles from './CodeLabPage.module.css'

function buildSrcdoc(html, css, js) {
  const bridge = `
<script>
(function(){
  function send(fn, args){
    parent.postMessage({ type: 'skonga-console', fn: fn, args: args.map(String) }, '*');
  }
  ['log','warn','error'].forEach(function(fn){
    var orig = console[fn];
    console[fn] = function(){
      send(fn, Array.from(arguments));
      orig.apply(console, arguments);
    };
  });
  window.onerror = function(msg){ send('error', [String(msg)]); };
})();
<\/script>`
  const hasHtmlTag = /<html/i.test(html)
  if (hasHtmlTag) {
    let out = html
    if (css) {
      out = out.replace(/<\/head>/i, `<style>${css}</style></head>`)
      if (!/<\/head>/i.test(out)) out = `<style>${css}</style>` + out
    }
    out = out.replace(/<\/body>/i, `${bridge}<script>${js}<\/script></body>`)
    if (!/<\/body>/i.test(out)) out += `${bridge}<script>${js}<\/script>`
    return out
  }
  return `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}${bridge}<script>${js}<\/script></body></html>`
}

export default function CodeLabPage() {
  const { exerciseId } = useParams()
  const nav = useNavigate()
  const iframeRef = useRef(null)
  const html = useLabStore((s) => s.html)
  const css = useLabStore((s) => s.css)
  const js = useLabStore((s) => s.js)
  const logs = useLabStore((s) => s.logs)
  const activeFile = useLabStore((s) => s.activeFile)
  const setFile = useLabStore((s) => s.setFile)
  const setActiveFile = useLabStore((s) => s.setActiveFile)
  const pushLog = useLabStore((s) => s.pushLog)
  const clearLogs = useLabStore((s) => s.clearLogs)
  const reset = useLabStore((s) => s.reset)
  const loadStarter = useLabStore((s) => s.loadStarter)
  const markLab = useProgressStore((s) => s.markLab)

  useEffect(() => {
    if (!exerciseId) return
    const found = getLessonById(exerciseId)
    if (found?.lesson.lab) loadStarter(found.lesson.lab, exerciseId)
  }, [exerciseId, loadStarter])

  useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === 'skonga-console') pushLog({ fn: e.data.fn, text: e.data.args.join(' ') })
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [pushLog])

  const srcdoc = useMemo(() => buildSrcdoc(html, css, js), [html, css, js])

  const run = () => {
    clearLogs()
    const frame = iframeRef.current
    if (frame) frame.srcdoc = srcdoc
  }

  const completeLab = () => {
    if (exerciseId) markLab(exerciseId)
    if (exerciseId) {
      const found = getLessonById(exerciseId)
      if (found) nav(`/learn/${found.course.id}/${found.module.id}/${found.lesson.id}`)
    }
  }

  const value = activeFile === 'html' ? html : activeFile === 'css' ? css : js

  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <button className="btn-dark" onClick={() => nav(-1)}>Back</button>
        <strong>Code Lab</strong>
        <span className={styles.spacer} />
        <button className="btn-dark" onClick={reset}>Reset</button>
        <button className="btn-primary" onClick={run}>Run</button>
      </header>
      <div className={styles.tabs}>
        {['html', 'css', 'js'].map((f) => (
          <button key={f} className={activeFile === f ? styles.on : ''} onClick={() => setActiveFile(f)}>
            {f.toUpperCase()}
          </button>
        ))}
      </div>
      <div className={styles.split}>
        <textarea
          className={styles.editor}
          spellCheck={false}
          value={value}
          onChange={(e) => setFile(activeFile, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault()
              const t = e.target
              const v = t.value
              const s = t.selectionStart
              setFile(activeFile, v.slice(0, s) + '  ' + v.slice(t.selectionEnd))
            }
          }}
        />
        <iframe
          ref={iframeRef}
          className={styles.preview}
          title="Browser preview"
          sandbox="allow-scripts"
          srcDoc={srcdoc}
        />
      </div>
      <div className={styles.console}>
        {logs.length === 0 ? <span>Console</span> : logs.map((l, i) => (
          <div key={i} className={l.fn === 'error' ? styles.err : ''}>{l.fn}: {l.text}</div>
        ))}
      </div>
      {exerciseId && (
        <div className={styles.done}>
          <button className="btn-primary btn-full" onClick={completeLab}>Mark lab done & return</button>
        </div>
      )}
    </div>
  )
}
