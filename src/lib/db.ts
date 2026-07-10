import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'cosmos.db');

declare global {
  // eslint-disable-next-line no-var
  var _cosmosDb: Database.Database | undefined;
}

function getDb(): Database.Database {
  if (!global._cosmosDb) {
    global._cosmosDb = new Database(DB_PATH);
    global._cosmosDb.pragma('journal_mode = WAL');
    global._cosmosDb.pragma('foreign_keys = ON');
  }
  return global._cosmosDb;
}

export interface DbObjectRow {
  id: number;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  stats: string;
  facts: string;
  sort_order: number;
  chills: number;
}

export interface DbObjectSummaryRow {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  chills: number;
}

export function getObjects(opts?: { category?: string; search?: string }): DbObjectSummaryRow[] {
  const db = getDb();
  let sql = 'SELECT o.slug, o.name, o.category, o.tagline, COALESCE(r.chills, 0) as chills FROM objects o LEFT JOIN reactions r ON o.slug = r.object_slug';
  const params: string[] = [];
  const conditions: string[] = [];

  if (opts?.category) {
    conditions.push('LOWER(o.category) = LOWER(?)');
    params.push(opts.category);
  }
  if (opts?.search) {
    conditions.push('LOWER(o.name) LIKE LOWER(?)');
    params.push(`%${opts.search}%`);
  }
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
  sql += ' ORDER BY o.sort_order';
  return db.prepare(sql).all(...params) as DbObjectSummaryRow[];
}

export function getObjectBySlug(slug: string): DbObjectRow | undefined {
  const db = getDb();
  return db.prepare(
    'SELECT o.*, COALESCE(r.chills, 0) as chills FROM objects o LEFT JOIN reactions r ON o.slug = r.object_slug WHERE o.slug = ?'
  ).get(slug) as DbObjectRow | undefined;
}

export function getObjectOfTheDay(): DbObjectRow | undefined {
  const db = getDb();
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = Date.now() - start.getTime();
  const dayOfYear = Math.floor(diff / 86400000);
  const sortOrder = ((dayOfYear - 1) % 12) + 1;
  return db.prepare(
    'SELECT o.*, COALESCE(r.chills, 0) as chills FROM objects o LEFT JOIN reactions r ON o.slug = r.object_slug WHERE o.sort_order = ?'
  ).get(sortOrder) as DbObjectRow | undefined;
}

export function getAdjacentSlugs(sortOrder: number): { prevSlug: string | null; nextSlug: string | null } {
  const db = getDb();
  const total = 12;
  const prevOrder = sortOrder === 1 ? total : sortOrder - 1;
  const nextOrder = sortOrder === total ? 1 : sortOrder + 1;
  const prev = db.prepare('SELECT slug FROM objects WHERE sort_order = ?').get(prevOrder) as { slug: string } | undefined;
  const next = db.prepare('SELECT slug FROM objects WHERE sort_order = ?').get(nextOrder) as { slug: string } | undefined;
  return { prevSlug: prev?.slug ?? null, nextSlug: next?.slug ?? null };
}

export function getCategories(): Array<{ name: string; count: number }> {
  const db = getDb();
  return db.prepare(
    'SELECT category as name, COUNT(*) as count FROM objects GROUP BY category ORDER BY count DESC'
  ).all() as Array<{ name: string; count: number }>;
}

export function getChills(slug: string): number {
  const db = getDb();
  const row = db.prepare('SELECT chills FROM reactions WHERE object_slug = ?').get(slug) as { chills: number } | undefined;
  return row?.chills ?? 0;
}

export function incrementChills(slug: string, ipHash: string): { chills: number; alreadyReacted: boolean } {
  const db = getDb();
  const today = new Date().toISOString().slice(0, 10);

  // Check for existing reaction today
  const existing = db.prepare(
    'SELECT id FROM reaction_log WHERE object_slug = ? AND ip_hash = ? AND reacted_on = ?'
  ).get(slug, ipHash, today);

  if (existing) {
    const chills = getChills(slug);
    return { chills, alreadyReacted: true };
  }

  // Insert log entry
  try {
    db.prepare(
      'INSERT INTO reaction_log (object_slug, ip_hash, reacted_on) VALUES (?, ?, ?)'
    ).run(slug, ipHash, today);
  } catch {
    // Unique constraint violation — already reacted
    const chills = getChills(slug);
    return { chills, alreadyReacted: true };
  }

  // Increment chills
  db.prepare(
    'INSERT INTO reactions (object_slug, chills) VALUES (?, 1) ON CONFLICT(object_slug) DO UPDATE SET chills = chills + 1'
  ).run(slug);

  const chills = getChills(slug);
  return { chills, alreadyReacted: false };
}
