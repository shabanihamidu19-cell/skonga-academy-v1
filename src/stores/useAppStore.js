import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ===== MOCK DATA =====
const MOCK_POSTS = [
  {
    id: '1',
    user: { id: 'u1', name: 'Amani Mwangi', initials: 'AM', avatarColor: 'av-teal', country: '🇰🇪', city: 'Nairobi', streak: 18 },
    type: 'learn',
    content: 'Leo nimeelewa tofauti kati ya let, const, na var. Const haibadiliki kabisa — let inaweza kubadilika ndani ya block yake — var ni ya zamani, inaenda ovyo!',
    code: 'const dawa = "const";\nlet kubadilika = "let";\n// var — epuka sana 😬',
    likes: 34,
    comments: 8,
    liked: false,
    timeAgo: 'dakika 12',
    createdAt: Date.now() - 12 * 60 * 1000,
    tags: ['JavaScript'],
  },
  {
    id: '2',
    user: { id: 'u2', name: 'Juma Kimani', initials: 'JK', avatarColor: 'av-purple', country: '🇹🇿', city: 'Dar es Salaam', streak: 9 },
    type: 'bug',
    content: 'Nimekwama saa 2 kwa error hii. TypeError: Cannot read properties of undefined. Ninafanya nini vibaya? 😭',
    code: '// Error iko line 14\nconsole.log(user.name);\n// user ni undefined!',
    likes: 12,
    comments: 15,
    liked: false,
    timeAgo: 'saa 1',
    createdAt: Date.now() - 60 * 60 * 1000,
    tags: ['JavaScript'],
  },
  {
    id: '3',
    user: { id: 'u3', name: 'Zara Abdirahman', initials: 'ZA', avatarColor: 'av-coral', country: '🇰🇪', city: 'Mombasa', streak: 31 },
    type: 'project',
    content: 'Calculator yangu ya kwanza imekwisha! HTML + CSS + JavaScript peke yangu. Ilichukua siku 3 lakini ilifanya kazi! 🎉',
    project: { name: 'Calculator App', tech: ['HTML', 'CSS', 'JS'], github: '#', demo: '#' },
    likes: 89,
    comments: 23,
    liked: false,
    timeAgo: 'saa 3',
    createdAt: Date.now() - 3 * 60 * 60 * 1000,
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: '4',
    user: { id: 'u4', name: 'Fatuma Kassim', initials: 'FK', avatarColor: 'av-teal', country: '🇹🇿', city: 'Dar es Salaam', streak: 22 },
    type: 'progress',
    content: 'Wiki ya tano kwenye JavaScript! Nimeweza ku-complete challenges 12 mwezi huu. Nguvu! 💪',
    likes: 45,
    comments: 6,
    liked: false,
    timeAgo: 'saa 5',
    createdAt: Date.now() - 5 * 60 * 60 * 1000,
    tags: ['JavaScript'],
  },
]

const MOCK_CHALLENGES = [
  {
    id: 'c1',
    name: '30 Days of JavaScript',
    description: 'Jifunza JavaScript kutoka mwanzo hadi kuweza kujenga projects za kweli.',
    totalDays: 30,
    currentDay: 4,
    participants: 847,
    status: 'active',
    daysLeft: 26,
    todayTopic: 'Objects — jinsi ya kuunda na kutumia objects katika JavaScript',
    days: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      topic: ['Variables', 'Functions', 'Arrays', 'Objects', 'DOM', 'Events', 'Mini Project'][i] || `Day ${i + 1}`,
      status: i < 3 ? 'done' : i === 3 ? 'today' : 'locked',
    })),
  },
  {
    id: 'c2',
    name: 'Python Basics — 14 Days',
    description: 'Mwanzo wa Python — variables, loops, functions. Kwa wanaoanza kabisa.',
    totalDays: 14,
    currentDay: 0,
    participants: 234,
    status: 'upcoming',
    startDate: 'Jumatatu',
    daysLeft: 14,
    days: Array.from({ length: 14 }, (_, i) => ({ day: i + 1, status: 'locked' })),
  },
  {
    id: 'c3',
    name: 'CSS Layouts — 7 Days',
    description: 'Flexbox na Grid kwa undani. Jenga layouts halisi za web.',
    totalDays: 7,
    currentDay: 0,
    participants: 412,
    status: 'upcoming',
    startDate: 'Jumanne',
    daysLeft: 7,
    days: Array.from({ length: 7 }, (_, i) => ({ day: i + 1, status: 'locked' })),
  },
]

const MOCK_BUDDIES = [
  {
    id: 'b1', name: 'Fatuma Kassim', initials: 'FK', avatarColor: 'av-teal',
    level: 'Beginner', monthsLearning: 3, streak: 22,
    country: '🇹🇿', city: 'Dar es Salaam',
    learning: ['JavaScript', 'React'],
    connected: false,
  },
  {
    id: 'b2', name: 'Omar Baraka', initials: 'OB', avatarColor: 'av-purple',
    level: 'Beginner', monthsLearning: 2, streak: 14,
    country: '🇺🇬', city: 'Kampala',
    learning: ['JavaScript', 'Node.js'],
    connected: false,
  },
  {
    id: 'b3', name: 'Lila Mukasa', initials: 'LM', avatarColor: 'av-coral',
    level: 'Intermediate', monthsLearning: 7, streak: 89,
    country: '🇰🇪', city: 'Nairobi',
    learning: ['JavaScript', 'React', 'Python'],
    isMentor: true,
    connected: false,
  },
]

const MOCK_PROJECTS = [
  {
    id: 'p1', name: 'Todo App with Local Storage', emoji: '📝',
    author: 'Amani Mwangi', authorInitials: 'AM', authorColor: 'av-teal',
    description: 'App ya kwanza na localStorage. Inaweza kuongeza, kufuta na ku-complete tasks.',
    tech: ['HTML', 'CSS', 'JS'], views: 142, likes: 34,
    github: '#', demo: '#',
  },
  {
    id: 'p2', name: 'Weather App — OpenAPI', emoji: '⛅',
    author: 'Fatuma Kassim', authorInitials: 'FK', authorColor: 'av-teal',
    description: 'Inatumia fetch() kupata hali ya hewa. Pia ina error handling vizuri.',
    tech: ['JS', 'API'], views: 208, likes: 57,
    github: '#', demo: '#',
  },
  {
    id: 'p3', name: 'Quiz App', emoji: '🧠',
    author: 'Juma Kimani', authorInitials: 'JK', authorColor: 'av-purple',
    description: 'Quiz ya JavaScript concepts. Maswali 20, timer, na leaderboard.',
    tech: ['HTML', 'CSS', 'JS'], views: 95, likes: 22,
    github: '#',
  },
]

const MOCK_NOTIFICATIONS = [
  {
    id: 'n1', type: 'like', icon: 'heart', iconBg: 'coral',
    message: 'Zara Abdirahman alipenda post yako kuhusu let vs const',
    timeAgo: 'dakika 5', unread: true,
  },
  {
    id: 'n2', type: 'comment', icon: 'message', iconBg: 'teal',
    message: 'Amani Mwangi alisaidia bug yako — angalia jibu lake!',
    timeAgo: 'dakika 23', unread: true,
  },
  {
    id: 'n3', type: 'challenge', icon: 'trophy', iconBg: 'purple',
    message: '30 Days of JavaScript — Day 4 inasubiri. Anza sasa!',
    timeAgo: 'saa 2', unread: true,
  },
  {
    id: 'n4', type: 'buddy', icon: 'user-plus', iconBg: 'teal',
    message: 'Fatuma Kassim alitaka kuwa study buddy wako',
    timeAgo: 'saa 4', unread: false,
  },
  {
    id: 'n5', type: 'milestone', icon: 'star', iconBg: 'amber',
    message: 'Hongera! Umefika streak ya siku 24 mfululizo 🔥',
    timeAgo: 'jana', unread: false,
  },
]

const MOCK_PROFILE = {
  id: 'me',
  name: 'KIDCODER TZ',
  initials: 'KT',
  bio: 'Beginner developer kutoka Tanzania 🇹🇿. Najifunza JavaScript na React.',
  country: '🇹🇿',
  city: 'Dar es Salaam',
  streak: 24,
  streakGoal: 30,
  monthsLearning: 3,
  level: 'Beginner Developer',
  learning: ['JavaScript', 'React', 'Node.js'],
  stats: { projects: 6, challenges: 38, activities: 92 },
  journey: [
    { id: 'j1', title: 'HTML & CSS basics', status: 'done', timeAgo: 'Wiki 6 iliyopita' },
    { id: 'j2', title: 'JavaScript fundamentals', status: 'done', timeAgo: 'Wiki 3 iliyopita' },
    { id: 'j3', title: 'Calculator project ✅', status: 'done', timeAgo: 'Wiki 2 iliyopita' },
    { id: 'j4', title: '30 Days JS Challenge — Day 4', status: 'current', timeAgo: 'Sasa hivi' },
    { id: 'j5', title: 'React basics', status: 'upcoming', timeAgo: 'Inakuja' },
    { id: 'j6', title: 'Full-stack project', status: 'upcoming', timeAgo: 'Inakuja' },
  ],
  projects: [
    { id: 'mp1', name: 'Calculator App', emoji: '🧮', tech: ['HTML', 'CSS', 'JS'], likes: 89, daysAgo: 14, github: '#', demo: '#' },
    { id: 'mp2', name: 'Todo List App', emoji: '✅', tech: ['JS'], likes: 41, daysAgo: 21, github: '#' },
    { id: 'mp3', name: 'Color Picker', emoji: '🎨', tech: ['HTML', 'CSS', 'JS'], likes: 17, daysAgo: 35, github: '#' },
  ],
  badges: [
    { id: 'ba1', emoji: '🔥', name: 'Streak Master', desc: '24 siku mfululizo' },
    { id: 'ba2', emoji: '🚀', name: 'First Deploy', desc: 'Project ya kwanza live' },
    { id: 'ba3', emoji: '🐛', name: 'Bug Hunter', desc: 'Solve bugs 10' },
    { id: 'ba4', emoji: '🤝', name: 'Helper', desc: 'Saidia learners 5' },
    { id: 'ba5', emoji: '⚡', name: 'Fast Learner', desc: 'Challenges 5 kwa wiki moja' },
  ],
}

/**
 * Feed Ranking Algorithm (Phase 3)
 * Score = engagement + recency + type boost + East Africa boost
 */
function rankPosts(posts) {
  const now = Date.now()

  return [...posts]
    .map((post) => {
      const ageHours = Math.max(0.1, (now - (post.createdAt || now)) / (1000 * 60 * 60))
      const recencyScore = 100 / Math.sqrt(ageHours) // newer = higher

      const engagementScore = (post.likes || 0) * 1.5 + (post.comments || 0) * 3

      // Learning-focused type boost
      const typeBoost = {
        learn: 15,
        bug: 20,      // bugs need help → higher visibility
        project: 12,
        question: 18,
        challenge: 10,
        progress: 8,
      }[post.type] || 5

      // East Africa users slight boost
      const eaBoost = ['🇹🇿', '🇰🇪', '🇺🇬', '🇷🇼', '🇧🇮'].includes(post.user?.country) ? 8 : 0

      // High streak users get small boost (inspiration)
      const streakBoost = (post.user?.streak || 0) >= 20 ? 5 : 0

      const score = recencyScore + engagementScore + typeBoost + eaBoost + streakBoost

      return { ...post, _score: score }
    })
    .sort((a, b) => b._score - a._score)
}

// ===== STORE =====
const useAppStore = create(
  persist(
    (set, get) => ({
      // State
      posts: MOCK_POSTS,
      challenges: MOCK_CHALLENGES,
      buddies: MOCK_BUDDIES,
      projects: MOCK_PROJECTS,
      notifications: MOCK_NOTIFICATIONS,
      profile: MOCK_PROFILE,
      activeTab: 'feed',
      unreadNotifications: MOCK_NOTIFICATIONS.filter((n) => n.unread).length,
      language: 'sw', // 'sw' | 'en'

      // Actions
      setActiveTab: (tab) => set({ activeTab: tab }),

      setLanguage: (lang) => set({ language: lang }),

      toggleLike: (postId) =>
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === postId
              ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
              : p
          ),
        })),

      connectBuddy: (buddyId) =>
        set((state) => ({
          buddies: state.buddies.map((b) =>
            b.id === buddyId ? { ...b, connected: !b.connected } : b
          ),
        })),

      markNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, unread: false })),
          unreadNotifications: 0,
        })),

      addPost: (post) =>
        set((state) => ({
          posts: [
            {
              ...post,
              createdAt: Date.now(),
              timeAgo: 'sasa hivi',
            },
            ...state.posts,
          ],
        })),

      // Ranked feed (algorithm)
      getRankedPosts: () => rankPosts(get().posts),

      resetStore: () =>
        set({
          posts: MOCK_POSTS,
          buddies: MOCK_BUDDIES,
          notifications: MOCK_NOTIFICATIONS,
          unreadNotifications: MOCK_NOTIFICATIONS.filter((n) => n.unread).length,
        }),
    }),
    {
      name: 'skonga-community',
      partialize: (state) => ({
        posts: state.posts,
        buddies: state.buddies,
        notifications: state.notifications,
        unreadNotifications: state.unreadNotifications,
        language: state.language,
      }),
    }
  )
)

export default useAppStore
