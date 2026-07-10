import { NextRequest, NextResponse } from 'next/server';
import { getObjectBySlug, getAdjacentSlugs } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const obj = getObjectBySlug(params.slug);
  if (!obj) {
    return NextResponse.json({ error: 'Object not found' }, { status: 404 });
  }
  const { prevSlug, nextSlug } = getAdjacentSlugs(obj.sort_order);
  return NextResponse.json({
    ...obj,
    stats: JSON.parse(obj.stats),
    facts: JSON.parse(obj.facts),
    prevSlug,
    nextSlug,
  });
}
