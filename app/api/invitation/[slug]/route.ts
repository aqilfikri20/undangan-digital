import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { emptyWedding, type Wedding } from '@/lib/invitation';
export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    const [rows] = await getDb().execute('SELECT wedding_data FROM invitations WHERE slug = ? AND completed = 1 LIMIT 1', [slug]);
    const item = (rows as { wedding_data: Wedding | string }[])[0]; if (!item) return NextResponse.json({ error: 'Undangan tidak ditemukan.' }, { status: 404 });
    const wedding = typeof item.wedding_data === 'string' ? JSON.parse(item.wedding_data) : item.wedding_data;
    const [messages] = await getDb().execute('SELECT gm.guest_name AS name, gm.attendance, gm.message, gm.created_at AS createdAt FROM guest_messages gm JOIN invitations i ON i.id = gm.invitation_id WHERE i.slug = ? ORDER BY gm.created_at DESC LIMIT 30', [slug]);
    return NextResponse.json({ wedding: { ...emptyWedding, ...wedding }, messages });
  } catch (error) { console.error('Muat undangan gagal:', error); return NextResponse.json({ error: 'Undangan tidak dapat dimuat.' }, { status: 500 }); }
}
export async function POST(request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params; const body = await request.json();
    const name = String(body.name || '').trim(); const attendance = String(body.attendance || '').trim(); const message = String(body.message || '').trim();
    if (!name || name.length > 120 || !message || message.length > 2000 || !['Joyfully accepts', 'Regretfully declines'].includes(attendance)) return NextResponse.json({ error: 'Mohon lengkapi nama, kehadiran, dan pesan.' }, { status: 400 });
    const [found] = await getDb().execute('SELECT id FROM invitations WHERE slug = ? AND completed = 1 LIMIT 1', [slug]);
    const invitation = (found as { id: number }[])[0];
    if (!invitation) return NextResponse.json({ error: 'Undangan tidak ditemukan.' }, { status: 404 });
    await getDb().execute('INSERT INTO guest_messages (invitation_id, guest_name, attendance, message) VALUES (?, ?, ?, ?)', [invitation.id, name, attendance, message]);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) { console.error('Simpan RSVP gagal:', error); return NextResponse.json({ error: 'Pesan belum dapat disimpan.' }, { status: 500 }); }
}
