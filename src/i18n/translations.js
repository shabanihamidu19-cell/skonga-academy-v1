/**
 * DevPath i18n — Lightweight translation system
 * Primary: Kiswahili | Secondary: English
 */

export const translations = {
  sw: {
    // Navigation
    'nav.feed': 'Feed',
    'nav.explore': 'Explore',
    'nav.challenges': 'Challenges',
    'nav.alerts': 'Arifa',
    'nav.profile': 'Profile',

    // Feed
    'feed.composePlaceholder': 'Umejifunza nini leo?',
    'feed.challengeBanner': '30 Days of JavaScript',
    'feed.challengeSub': 'Day {day} ya {total} · {count} learners',
    'feed.view': 'Angalia',
    'feed.newPost': 'Post mpya',
    'feed.cancel': 'Ghairi',
    'feed.post': 'Post',
    'feed.addCode': 'Ongeza code',
    'feed.removeCode': 'Ondoa code',

    // Post types
    'type.learn': 'Nilijifunza',
    'type.bug': 'Bug',
    'type.project': 'Project',
    'type.question': 'Swali',
    'type.challenge': 'Challenge',
    'type.progress': 'Progress',

    // Post actions
    'post.like': 'Penda',
    'post.unlike': 'Toa like',
    'post.comment': 'Maoni',
    'post.help': 'Saidia',
    'post.share': 'Shiriki',
    'post.timeAgo': '{time} iliyopita',

    // Explore
    'explore.title': 'Explore',
    'explore.buddies': 'Study Buddies',
    'explore.projects': 'Projects',
    'explore.connect': 'Unganisha',
    'explore.connected': 'Umeunganishwa',
    'explore.mentor': 'Mentor',

    // Challenges
    'challenges.title': 'Challenges',
    'challenges.active': 'Inaendelea',
    'challenges.upcoming': 'Inakuja',
    'challenges.participants': '{count} learners',
    'challenges.daysLeft': 'Siku {count} zimebaki',
    'challenges.today': 'Leo',
    'challenges.done': 'Imekamilika',
    'challenges.locked': 'Imefungwa',

    // Notifications
    'notifications.title': 'Arifa',
    'notifications.markRead': 'Weka zote kama zimesomwa',
    'notifications.empty': 'Hakuna arifa bado',

    // Profile
    'profile.title': 'Profile',
    'profile.streak': '{count} day streak',
    'profile.journey': 'Journey yangu',
    'profile.projects': 'Projects',
    'profile.badges': 'Badges',
    'profile.edit': 'Hariri Profile',
    'profile.language': 'Lugha',
    'profile.languageSw': 'Kiswahili',
    'profile.languageEn': 'English',
    'profile.level': 'Beginner Developer',
    'profile.months': 'Miezi {count} ya kujifunza',

    // Common
    'common.loading': 'Inapakia...',
    'common.error': 'Hitilafu imetokea',
    'common.retry': 'Jaribu tena',
    'common.save': 'Hifadhi',
    'common.cancel': 'Ghairi',
  },

  en: {
    // Navigation
    'nav.feed': 'Feed',
    'nav.explore': 'Explore',
    'nav.challenges': 'Challenges',
    'nav.alerts': 'Alerts',
    'nav.profile': 'Profile',

    // Feed
    'feed.composePlaceholder': 'What did you learn today?',
    'feed.challengeBanner': '30 Days of JavaScript',
    'feed.challengeSub': 'Day {day} of {total} · {count} learners',
    'feed.view': 'View',
    'feed.newPost': 'New Post',
    'feed.cancel': 'Cancel',
    'feed.post': 'Post',
    'feed.addCode': 'Add code',
    'feed.removeCode': 'Remove code',

    // Post types
    'type.learn': 'I Learned',
    'type.bug': 'Bug',
    'type.project': 'Project',
    'type.question': 'Question',
    'type.challenge': 'Challenge',
    'type.progress': 'Progress',

    // Post actions
    'post.like': 'Like',
    'post.unlike': 'Unlike',
    'post.comment': 'Comment',
    'post.help': 'Help',
    'post.share': 'Share',
    'post.timeAgo': '{time} ago',

    // Explore
    'explore.title': 'Explore',
    'explore.buddies': 'Study Buddies',
    'explore.projects': 'Projects',
    'explore.connect': 'Connect',
    'explore.connected': 'Connected',
    'explore.mentor': 'Mentor',

    // Challenges
    'challenges.title': 'Challenges',
    'challenges.active': 'Active',
    'challenges.upcoming': 'Upcoming',
    'challenges.participants': '{count} learners',
    'challenges.daysLeft': '{count} days left',
    'challenges.today': 'Today',
    'challenges.done': 'Done',
    'challenges.locked': 'Locked',

    // Notifications
    'notifications.title': 'Notifications',
    'notifications.markRead': 'Mark all as read',
    'notifications.empty': 'No notifications yet',

    // Profile
    'profile.title': 'Profile',
    'profile.streak': '{count} day streak',
    'profile.journey': 'My Journey',
    'profile.projects': 'Projects',
    'profile.badges': 'Badges',
    'profile.edit': 'Edit Profile',
    'profile.language': 'Language',
    'profile.languageSw': 'Kiswahili',
    'profile.languageEn': 'English',
    'profile.level': 'Beginner Developer',
    'profile.months': '{count} months learning',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.retry': 'Retry',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
  },
}

/**
 * Simple t() helper
 * Usage: t('feed.composePlaceholder') or t('feed.challengeSub', { day: 4, total: 30, count: 847 })
 */
export function createT(lang = 'sw') {
  return function t(key, params = {}) {
    const dict = translations[lang] || translations.sw
    let text = dict[key] || translations.sw[key] || key

    Object.keys(params).forEach((k) => {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), params[k])
    })

    return text
  }
}
