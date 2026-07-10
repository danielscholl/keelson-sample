import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { getObjectBySlug, incrementChills } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const obj = getObjectBySlug(params.slug);
  if (!obj) {
    return NextResponse.json({ error: 'Object not found' }, { status: 404 });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';

  const ipHash = createHash('sha256').update(ip).digest('hex');
  const result = incrementChills(params.slug, ipHash);
  return NextResponse.json(result);
}
