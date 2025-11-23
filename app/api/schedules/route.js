import { NextResponse } from 'next/server';
import kv from '@/lib/kv';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const ids = (await kv.get('schedules')) || [];
  const items = [];
  for (const id of ids) {
    const s = await kv.get(`schedule:${id}`);
    if (s) items.push(s);
  }
  return NextResponse.json({ ok: true, items });
}

export async function POST(req) {
  const body = await req.json();
  const id = uuidv4();
  const item = { id, ...body };
  const ids = (await kv.get('schedules')) || [];
  ids.push(id);
  await kv.set('schedules', ids);
  await kv.set(`schedule:${id}`, item);
  return NextResponse.json({ ok: true, item });
}

export async function DELETE(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ ok: false, message: 'id required' }, { status: 400 });
  const ids = (await kv.get('schedules')) || [];
  const newIds = ids.filter(x => x !== id);
  await kv.set('schedules', newIds);
  await kv.delete(`schedule:${id}`);
  return NextResponse.json({ ok: true });
}