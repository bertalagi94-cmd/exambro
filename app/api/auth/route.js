import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { username, password } = body;

  if ((username === 'admin' && password === 'admin') || (username === 'Pengawas' && password === 'TM81')) {
    const role = username === 'admin' ? 'admin' : 'pengawas';
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    return NextResponse.json({ ok: true, token, role });
  }
  return NextResponse.json({ ok: false, message: 'invalid credentials' }, { status: 401 });
}