import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  const categories = getCategories();
  return NextResponse.json({ categories });
}
