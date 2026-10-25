import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { makeSession, sessionCookie, verifyPassword } from '@/lib/auth';
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json(); const normalizedEmail = String(email || '').trim().toLowerCase();
    const [rows] = await getDb().execute('SELECT id, name, email, password_hash, role FROM users WHERE email = ? LIMIT 1', [normalizedEmail]);
    const user = (rows as { id: number; name: string; email: string; password_hash: string; role: string }[])[0];
    if (!user || !(await verifyPassword(String(password || ''), user.password_hash))) return NextResponse.json({ error: 'Email atau kata sandi tidak sesuai.' }, { status: 401 });
    const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    response.cookies.set(sessionCookie.name, makeSession(user.id), sessionCookie.options); return response;
  } catch (error) { console.error('Login gagal:', error); return NextResponse.json({ error: 'Tidak dapat masuk. Periksa koneksi database.' }, { status: 500 }); }
}
