import { cookies } from 'next/headers'

const SESSION_COOKIE = 'admin_session'

export function getCredentials() {
  return {
    user: process.env.ADMIN_USER || 'admin',
    pass: process.env.ADMIN_PASS || 'your-secret-password',
  }
}

export async function createSession() {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function isAuthenticated() {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value === 'authenticated'
}
