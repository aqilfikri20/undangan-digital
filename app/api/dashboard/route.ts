import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { emptyWedding, invitationSlug, type Wedding } from '@/lib/invitation';
export async function GET() {
  try {
    const user = await currentUser(); if (!user) return NextResponse.json({ error: 'Silakan masuk kembali.' }, { status: 401 });
    const [rows] = await getDb().execute('SELECT slug, completed, wedding_data FROM invitations WHERE user_id = ? LIMIT 1', [user.id]);
    const item = (rows as { slug: string; completed: number; wedding_data: Wedding | string }[])[0];
    const data = item ? (typeof item.wedding_data === 'string' ? JSON.parse(item.wedding_data) : item.wedding_data) : emptyWedding;
    return NextResponse.json({ user, wedding: { ...emptyWedding, ...data }, completed: Boolean(item?.completed), slug: item?.slug || '' });
  } catch (error) { console.error('Muat dashboard gagal:', error); return NextResponse.json({ error: 'Data tidak dapat dimuat dari database.' }, { status: 500 }); }
}
export async function PUT(request: Request) {
  try {
    const user = await currentUser(); if (!user) return NextResponse.json({ error: 'Silakan masuk kembali.' }, { status: 401 });
    const body = await request.json() as { wedding?: Wedding; completed?: boolean };
    if (!body.wedding || typeof body.wedding !== 'object') return NextResponse.json({ error: 'Data undangan tidak valid.' }, { status: 400 });
    const wedding = { ...emptyWedding, ...body.wedding };
    if (!Array.isArray(wedding.gallery) || wedding.gallery.length > 8) return NextResponse.json({ error: 'Galeri maksimal 8 foto.' }, { status: 400 });
    const slug = invitationSlug(wedding);
    await getDb().execute('UPDATE invitations SET slug = ?, theme = ?, completed = ?, wedding_data = ? WHERE user_id = ?', [slug, wedding.theme, body.completed ? 1 : 0, JSON.stringify(wedding), user.id]);
    return NextResponse.json({ ok: true, slug });
  } catch (error) {
    if ((error as { code?: string }).code === 'ER_DUP_ENTRY') return NextResponse.json({ error: 'Nama pasangan ini sudah dipakai untuk tautan undangan lain.' }, { status: 409 });
    console.error('Simpan undangan gagal:', error); return NextResponse.json({ error: 'Data undangan gagal disimpan ke database.' }, { status: 500 });
  }
}
