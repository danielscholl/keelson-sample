# Cosmos — build plan

> A representative `plan.md`, the kind the `frontend-mix` `plan` node writes from
> `spec.md`. Captured from one real run and lightly trimmed. It is here so you have
> a real, rich plan to work with (review it, diff against it, hand it to a build)
> without paying for a full build first. A fresh run produces its own plan; this one
> is a fixed example, defects and all.

## SECTION A — UI Scope

A single-page explorer plus per-object detail. Dark-sky, cinematic, rendered with
CSS and SVG, no photographic assets.

- **`/` — Home.** A procedural starfield backdrop. A "Featured today" hero showing
  one object (see `GET /api/object-of-day`), headline "The cosmos, one object at a
  time." Below it, a responsive catalog grid of all objects as cards.
  - **ObjectCard** — name, category chip, one-line tagline, a reaction count with a
    single tap-to-react control. Empty reaction state reads "Be the first to react."
- **`/object/[slug]` — Detail.** Full description, the key-stats table, the
  "Did you know" facts as a list, and the same reaction control. Back link reads
  "← Back to the catalog."
- **Chrome.** A thin top bar with the wordmark; a footer line "Facts are real.
  Built local, no login." No nav menu, no search in v1.
- **Copy is canonical.** Headlines, button labels, and empty states above are the
  spec; build to them, do not paraphrase.

## SECTION B — Integration Scope (data and API contract)

Next.js 15 App Router. SQLite. Public, no auth, no accounts.

```text
TABLES
  objects(id, slug, name, category, tagline, description, stats, facts, sort_order)
    sort_order is 1..12.
  reactions(id, object_id, count)            one row per object, seeded at 0.
  reaction_log(id, object_id, ip_hash, reacted_at)   reacted_at is unix seconds.

RULES
  Rate limit: one reaction per (object_id, ip_hash) per UTC calendar day.
    Check reaction_log, then increment reactions.count.
  Seed: the 12 canonical objects. facts and stats are canonical; prose may be rewritten.

ENDPOINTS (public, no auth)
  GET  /api/object-of-day
    dayIndex = Math.floor(Date.now() / 86400000) % 12; pick objects-by-sort_order[dayIndex]
  POST /api/objects/[slug]/react   increment count; 429 if already reacted today
    IP from x-forwarded-for, SHA-256 hashed
  GET  /api/objects/[slug]/react   returns reactionCount and alreadyReacted
```

## SECTION C — Deployment Plan

Local only — no deployment this run. `bun run dev` serves it; `bun run build`
must pass. Success is the catalog rendering, a detail route resolving, and a
reaction persisting across a reload.
