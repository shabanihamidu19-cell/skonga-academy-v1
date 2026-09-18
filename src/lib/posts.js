import { supabase } from './supabase'

/**
 * Fetch posts with author profile, ordered by newest
 */
export async function fetchPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      id,
      type,
      content,
      code,
      likes_count,
      comments_count,
      tags,
      project_name,
      project_tech,
      project_github,
      project_demo,
      created_at,
      user_id,
      profiles:user_id (
        id,
        full_name,
        username,
        avatar_url,
        country,
        city,
        streak
      )
    `
    )
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) throw error

  // Map to app shape
  return (data || []).map((p) => ({
    id: p.id,
    type: p.type,
    content: p.content,
    code: p.code,
    likes: p.likes_count || 0,
    comments: p.comments_count || 0,
    liked: false,
    tags: p.tags || [],
    timeAgo: formatTimeAgo(p.created_at),
    createdAt: new Date(p.created_at).getTime(),
    project: p.project_name
      ? {
          name: p.project_name,
          tech: p.project_tech || [],
          github: p.project_github,
          demo: p.project_demo,
        }
      : null,
    user: {
      id: p.profiles?.id || p.user_id,
      name: p.profiles?.full_name || p.profiles?.username || 'User',
      initials: getInitials(p.profiles?.full_name || p.profiles?.username || 'U'),
      avatarColor: 'av-teal',
      avatarUrl: p.profiles?.avatar_url,
      country: p.profiles?.country || '🇹🇿',
      city: p.profiles?.city || '',
      streak: p.profiles?.streak || 0,
    },
  }))
}

/**
 * Create a new post
 */
export async function createPost({ type, content, code, tags = [] }) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Lazima uingie kwanza')

  const { data, error } = await supabase
    .from('posts')
    .insert({
      user_id: user.id,
      type,
      content,
      code: code || null,
      tags,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Toggle like on a post
 */
export async function toggleLike(postId) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Lazima uingie kwanza')

  // Check if already liked
  const { data: existing } = await supabase
    .from('likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (existing) {
    await supabase.from('likes').delete().eq('id', existing.id)
    // Decrement count
    await supabase.rpc('decrement_likes', { post_id: postId }).catch(() => {})
    return { liked: false }
  } else {
    await supabase.from('likes').insert({ post_id: postId, user_id: user.id })
    await supabase.rpc('increment_likes', { post_id: postId }).catch(() => {})
    return { liked: true }
  }
}

function getInitials(name) {
  if (!name) return 'U'
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function formatTimeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'sasa hivi'
  if (mins < 60) return `dakika ${mins}`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `saa ${hours}`
  const days = Math.floor(hours / 24)
  return `siku ${days}`
}
