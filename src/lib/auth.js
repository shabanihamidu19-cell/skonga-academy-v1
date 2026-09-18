import { supabase } from './supabase'

/**
 * Sign up with email + password
 * Creates profile row and returns session if email confirm is disabled
 */
export async function signUp({ email, password, fullName, username }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        username: username,
      },
    },
  })

  if (error) throw error

  if (data.user) {
    const { error: profileError } = await supabase.from('profiles').upsert(
      {
        id: data.user.id,
        full_name: fullName || email.split('@')[0],
        username: username || email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, ''),
        country: '🇹🇿',
        city: 'Dar es Salaam',
      },
      { onConflict: 'id' }
    )

    if (profileError) {
      console.warn('Profile create warning:', profileError.message)
    }
  }

  return data
}

/**
 * Sign in with email + password
 */
export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

/**
 * Sign out
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/**
 * Get current session
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}

/**
 * Get current user + profile
 */
export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) throw error
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return { user, profile }
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })
}
