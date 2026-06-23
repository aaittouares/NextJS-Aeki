import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const msg = cookieStore.get('toast')?.value || null
  if (msg) cookieStore.delete('toast')
  return Response.json({ message: msg })
}
