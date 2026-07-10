import { NextRequest, NextResponse } from 'next/server';
import { getObjects } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;

  const objects = getObjects({ category, search });
  return NextResponse.json({ objects, total: objects.length });
}
