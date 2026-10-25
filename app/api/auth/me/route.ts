import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/auth';
export async function GET() {
  try { const user = await currentUser(); return NextResponse.json({ user }, { status: user ? 200 : 401 }); }
  catch { return NextResponse.json({ user: null }, { status: 401 }); }
}
