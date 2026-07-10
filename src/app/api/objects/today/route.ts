import { NextResponse } from 'next/server';
import { getObjectOfTheDay, getAdjacentSlugs } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  const obj = getObjectOfTheDay();
  if (!obj) {
    return NextResponse.json({ error: 'No objects found' }, { status: 404 });
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
