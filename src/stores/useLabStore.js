import { create } from 'zustand'

const BLANK = {
  html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>SKONGA Lab</title>
</head>
<body>
  <h1>Code Lab</h1>
  <p>Andika HTML, CSS na JavaScript kisha bonyeza Run.</p>
</body>
</html>`,
  css: `body {
  font-family: Inter, sans-serif;
  padding: 24px;
  background: #f6f4ff;
  color: #1a1028;
}`,
  js: `console.log("SKONGA Code Lab ready")`,
}

const useLabStore = create((set, get) => ({
  html: BLANK.html,
  css: BLANK.css,
  js: BLANK.js,
  starter: BLANK,
  lessonId: null,
  logs: [],
  activeFile: 'html',

  loadStarter: (files, lessonId = null) => {
    const starter = {
      html: files.html ?? BLANK.html,
      css: files.css ?? '',
      js: files.js ?? '',
    }
    set({ ...starter, starter, lessonId, logs: [] })
  },

  setFile: (name, value) => set({ [name]: value }),
  setActiveFile: (activeFile) => set({ activeFile }),
  pushLog: (entry) => set({ logs: [...get().logs, entry].slice(-80) }),
  clearLogs: () => set({ logs: [] }),
  reset: () => {
    const { starter, lessonId } = get()
    set({ html: starter.html, css: starter.css, js: starter.js, logs: [], lessonId })
  },
}))

export default useLabStore
