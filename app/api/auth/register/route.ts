import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { hashPassword, makeSession, sessionCookie } from '@/lib/auth';
import { emptyWedding } from '@/lib/invitation';
export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const cleanName = String(name || '').trim(); const cleanEmail = String(email || '').trim().toLowerCase();
    if (cleanName.length < 2 || !/^\S+@\S+\.\S+$/.test(cleanEmail) || String(password || '').length < 8) return NextResponse.json({ error: 'Nama, email, atau kata sandi tidak valid.' }, { status: 400 });
    const connection = await getDb().getConnection();
    let id: number;
    try {
      await connection.beginTransaction();
      const [result] = await connection.execute('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)', [cleanName, cleanEmail, await hashPassword(password), 'user']);
      id = Number((result as { insertId: number }).insertId);
      await connection.execute('INSERT INTO invitations (user_id, slug, theme, completed, wedding_data) VALUES (?, ?, ?, ?, ?)', [id, `undangan-${id}`, '', 0, JSON.stringify(emptyWedding)]);
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    const response = NextResponse.json({ user: { id, name: cleanName, email: cleanEmail, role: 'user' } });
    response.cookies.set(sessionCookie.name, makeSession(id), sessionCookie.options); return response;
  } catch (error) {
    if ((error as { code?: string }).code === 'ER_DUP_ENTRY') return NextResponse.json({ error: 'Email ini sudah terdaftar. Silakan masuk.' }, { status: 409 });
    console.error('Register gagal:', error); return NextResponse.json({ error: 'Pendaftaran gagal. Periksa koneksi database.' }, { status: 500 });
  }
}
