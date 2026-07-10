import Database from 'better-sqlite3';
import path from 'path';
import { SEED_OBJECTS } from '../src/lib/seed-data';

const DB_PATH = path.join(process.cwd(), 'cosmos.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS objects (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    slug        TEXT    NOT NULL UNIQUE,
    name        TEXT    NOT NULL,
    category    TEXT    NOT NULL,
    tagline     TEXT    NOT NULL,
    description TEXT    NOT NULL,
    stats       TEXT    NOT NULL,
    facts       TEXT    NOT NULL,
    sort_order  INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS reactions (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    object_slug TEXT    NOT NULL UNIQUE REFERENCES objects(slug),
    chills      INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS reaction_log (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    object_slug TEXT    NOT NULL,
    ip_hash     TEXT    NOT NULL,
    reacted_on  TEXT    NOT NULL
  );

  CREATE UNIQUE INDEX IF NOT EXISTS idx_reaction_log ON reaction_log(object_slug, ip_hash, reacted_on);
`);

const upsertObject = db.prepare(`
  INSERT INTO objects (slug, name, category, tagline, description, stats, facts, sort_order)
  VALUES (@slug, @name, @category, @tagline, @description, @stats, @facts, @sort_order)
  ON CONFLICT(slug) DO UPDATE SET
    name = excluded.name,
    category = excluded.category,
    tagline = excluded.tagline,
    description = excluded.description,
    stats = excluded.stats,
    facts = excluded.facts,
    sort_order = excluded.sort_order
`);

const insertReaction = db.prepare(`
  INSERT OR IGNORE INTO reactions (object_slug, chills) VALUES (?, 0)
`);

const seedAll = db.transaction(() => {
  for (const obj of SEED_OBJECTS) {
    upsertObject.run({
      slug: obj.slug,
      name: obj.name,
      category: obj.category,
      tagline: obj.tagline,
      description: obj.description,
      stats: JSON.stringify(obj.stats),
      facts: JSON.stringify(obj.facts),
      sort_order: obj.sort_order,
    });
    insertReaction.run(obj.slug);
  }
});

seedAll();
console.log(`✓ Seeded ${SEED_OBJECTS.length} objects into ${DB_PATH}`);
db.close();
