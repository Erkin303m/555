import { NextResponse } from 'next/server'
import { getCredentials, createSession } from '@/lib/auth'

export async function POST(request: Request) {
  const { username, password } = await request.json()
  const { user, pass } = getCredentials()

  if (username === user && password === pass) {
    await createSession()
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}
