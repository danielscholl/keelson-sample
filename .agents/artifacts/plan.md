# Cosmos — Full-Stack Build Plan

## SECTION A - UI Scope

### Stack & Visual Language

**Framework:** Next.js 14 (App Router) with TypeScript, Bun as package manager  
**Styling:** Tailwind CSS with a custom deep-space config  
**Visuals:** All CSS/SVG/gradients — no photographic assets

**Color System (dark background, always):**
- Base bg: `#03030a` (near-black space)
- Surface cards: `#0d0d1a`
- Category accent colors:
  - Planet: amber `#f59e0b` / `#78350f`
  - Moon: slate-blue `#94a3b8` / `#1e293b`
  - Star: yellow-gold `#fde68a` / `#78350f`
  - Nebula: purple-magenta `#c084fc` / `#3b0764`
  - Galaxy: indigo-blue `#818cf8` / `#1e1b4b`
  - Black Hole: crimson `#f87171` / `#450a0a`
  - Exoplanet System: teal `#2dd4bf` / `#042f2e`
- Primary text: `#f0f0ff`
- Muted text: `#94a3b8`
- Accent glow: white `rgba(255,255,255,0.05)` card border

**Typography:**
- Headings: system serif or `font-serif` (fallback), large, high-contrast white
- Body: `font-sans`, `text-slate-300`
- Category labels: monospace caps, letter-spaced

---

### Pages

#### Page 1: Home — `/`

**Purpose:** Cinematic landing. Establishes the dark-sky mood, surfaces the object of the day, invites exploration.

**Layout:**
- Full-viewport hero with animated procedural starfield background
- Centered wordmark and tagline
- "Today's Object" featured card below the fold (or as a dramatic hero callout)
- Footer row linking to the catalog

**Copy:**

```
[wordmark]  COSMOS
[tagline]   The universe, twelve objects at a time.
[sub]       An explorer for the most remarkable objects in the cosmos.
            Planets. Moons. Stars. Nebulae. Galaxies. The abyss itself.

[section label]  TODAY'S OBJECT
[card CTA]       Explore [Object Name]  →

[bottom link]    See the full catalog  →
```

**Error / loading states:**
- Object-of-the-day loading: show pulsing skeleton card (same dimensions, animated opacity)
- Fetch error: "The cosmos is unreachable right now. Try refreshing."

---

#### Page 2: Catalog — `/explore`

**Purpose:** Browse and filter all 12 objects. Category pills + name search.

**Layout:**
- Sticky top bar with category filter pills and search input
- Responsive grid of ObjectCards (2-col mobile, 3-col tablet, 4-col desktop)
- Result count badge
- Empty state when nothing matches

**Copy:**

```
[page headline]  The Catalog
[sub]            All twelve objects. Filter by category or search by name.

[search placeholder]  Search by name…

[category pills]
  ALL   PLANET   MOON   STAR   NEBULA   GALAXY   BLACK HOLE   EXOPLANET SYSTEM

[result count]  Showing [N] of 12 objects
[result count filtered]  [N] result for "[query]"  /  No results for "[query]"

[empty state headline]  Nothing out here.
[empty state sub]       Try a different category or clear your search.
[empty state CTA]       Clear filters
```

---

#### Page 3: Object Detail — `/object/[slug]`

**Purpose:** Full detail for one cosmic object. Description, stats, facts, chills reaction, prev/next navigation.

**Layout:**
- Full-bleed procedural visual header (object-specific CSS/SVG, 40vh tall)
- Category badge + object name headline + tagline
- Body content columns: description left, stats right (stacks on mobile)
- "Did You Know?" fact cards in a row
- Chills reaction bar at the bottom
- Prev / Next object navigation footer

**Copy:**

```
[back link]         ← Back to Catalog

[category badge]    STAR   (or PLANET, MOON, etc.)

[object name]       The Sun
[tagline]           The star at the heart of everything.

[section label]     About
[description]       [full prose from seed data]

[section label]     Key Stats
[stats table]       [stat name]  [value]  (e.g. "Distance from Earth  1 AU / ~150 million km")

[section label]     Did You Know?
[fact cards]        "…" (each fact in its own card)

[reaction label]    Did this give you chills?
[reaction button — default]    ✦  Give it chills
[reaction count]               [N] people got chills
[reaction button — after click]  ✓  You felt it  (disabled, filled state)
[reaction already-clicked msg]   You've already given this chills today.

[prev/next nav]
  ←  [Previous Object Name]          [Next Object Name]  →
```

**Error state (unknown slug):**
```
404 — Object Not Found
That object doesn't exist in this catalog. Maybe it's still forming.
[CTA]  ← Back to Catalog
```

---

### Components

#### `StarfieldCanvas`
- SVG or Canvas element, fills viewport behind all pages
- Procedurally places ~200 randomly-seeded stars (white dots, varying opacity/radius)
- Slow parallax drift animation on scroll or time
- Appears on all pages as a persistent background layer

#### `CosmosNav`
- Fixed top bar, transparent with backdrop-blur
- Left: wordmark "COSMOS" linking to `/`
- Right: nav link "Explore →" linking to `/explore`; "Today's Object" with subtle glow dot

#### `HeroSection` (Home only)
- Full-viewport centered layout
- Wordmark, tagline, sub-headline
- Animated entrance (fade up on load)

#### `ObjectOfTheDayCard` (Home only)
- Large featured card, 2/3 viewport width max
- Shows the object's procedural visual at left, name/tagline/description excerpt at right
- Glowing category-color border
- "Explore [Name] →" CTA button
- "Today's featured object" label

#### `CatalogGrid`
- Responsive CSS grid
- Renders a list of `ObjectCard` components
- Handles empty state rendering

#### `SearchAndFilter`
- `<input>` for name search (debounced 300ms)
- Category pill buttons (All + 7 categories)
- Active filter pill has filled background (category accent color)
- Result count line below

#### `ObjectCard`
- Dark card with subtle border
- Top half: `CosmicVisual` (mini, 120px tall)
- Body: category badge, object name, tagline
- Hover: glow border, slight scale-up transform
- Links to `/object/[slug]`

#### `CosmicVisual`
- Pure CSS/SVG visual, unique per object category (and optionally per object)
- Sizes: `sm` (card), `lg` (detail header)
- Variants:
  - **Planet (Jupiter/Mars):** Radial gradient sphere, banded stripes, optional swirl for GRS
  - **Planet (Saturn):** Sphere + tilted elliptical ring SVG
  - **Moon (Europa):** Pale blue-white gradient sphere, faint crack lines
  - **Moon (Titan):** Amber-haze sphere with thick atmosphere rim
  - **Star (Sun):** Warm yellow-gold radial glow with spiky corona rays (CSS clip-path)
  - **Star (Betelgeuse):** Deep red-orange pulsing orb, larger and irregular
  - **Nebula (Orion):** Layered translucent color blobs (purple, blue, pink) in SVG
  - **Nebula (Pillars):** Three tall SVG column shapes in amber/green/teal gradients
  - **Galaxy (Andromeda):** Spiral arm SVG shape in blue-white
  - **Black Hole (Sgr A\*):** Dark circle surrounded by glowing accretion ring (conic-gradient + rotation animation)
  - **Exoplanet (TRAPPIST-1):** Small dim star with 7 tiny orbiting dots at varying radii (CSS animation)

#### `CategoryBadge`
- Mono-caps text label
- Background and text use category accent color
- e.g., `STAR` in gold, `NEBULA` in purple

#### `StatsGrid`
- Two-column key/value layout
- Each row: stat name (muted) + value (white, bold)

#### `FactsList`
- Horizontal scroll row of fact cards on mobile, grid on wider screens
- Each card: quotation mark icon, fact text, subtle border

#### `ChillsButton`
- Toggle-style button showing ✦ icon + "Give it chills"
- Below: "[N] people got chills" counter
- On click: POST `/api/reactions/[slug]`, optimistic +1 update, then confirm with server value
- After click: switches to filled/disabled state, shows "✓ You felt it"
- Persists clicked state in `localStorage` keyed by slug (client-side dedup)

#### `ObjectNav` (Detail page footer)
- Prev/Next arrows with object names
- Wraps around (last → first)

---

### Object Slugs & Taglines

| # | Name                    | Slug                  | Tagline (design session's voice) |
|---|-------------------------|-----------------------|----------------------------------|
| 1 | The Sun                 | `the-sun`             | The star at the heart of everything. |
| 2 | Jupiter                 | `jupiter`             | A world of storms that never end. |
| 3 | Saturn                  | `saturn`              | Ringed wonder of the outer system. |
| 4 | Mars                    | `mars`                | The red frontier, waiting. |
| 5 | Europa                  | `europa`              | An ocean locked beneath the ice. |
| 6 | Titan                   | `titan`               | A world with weather — just not ours. |
| 7 | Betelgeuse              | `betelgeuse`          | A dying giant that will light the sky. |
| 8 | Sagittarius A*          | `sagittarius-a-star`  | Four million suns of pure darkness. |
| 9 | Orion Nebula (M42)      | `orion-nebula`        | A stellar nursery hiding in plain sight. |
| 10| Pillars of Creation     | `pillars-of-creation` | Towers of gas where stars are born. |
| 11| Andromeda Galaxy (M31)  | `andromeda-galaxy`    | Our nearest neighbor — and our fate. |
| 12| TRAPPIST-1              | `trappist-1`          | Seven chances at a second Earth. |

---

## SECTION B - Integration Scope

### Authentication
**None.** All routes are public. No sessions, no tokens, no middleware guards.

---

### Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Runtime / pkg mgr | Bun | Spec & README call for it; fast installs |
| Framework | Next.js 14 (App Router) | SSR for SEO/initial load; API routes colocated |
| Language | TypeScript | Type safety for data model |
| Styling | Tailwind CSS v3 | Utility-first; easy dark theme |
| Database | SQLite via `better-sqlite3` | Self-contained local file, synchronous API |
| ORM/query | Raw SQL (better-sqlite3 prepared statements) | Simple schema, no ORM needed |

---

### Database

**File:** `cosmos.db` in project root (gitignored)

#### Table: `objects`

```sql
CREATE TABLE objects (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT    NOT NULL UNIQUE,
  name        TEXT    NOT NULL,
  category    TEXT    NOT NULL,   -- 'Planet'|'Moon'|'Star'|'Nebula'|'Galaxy'|'Black Hole'|'Exoplanet System'
  tagline     TEXT    NOT NULL,
  description TEXT    NOT NULL,
  stats       TEXT    NOT NULL,   -- JSON: [{ label: string, value: string }]
  facts       TEXT    NOT NULL,   -- JSON: string[]
  sort_order  INTEGER NOT NULL
);
```

#### Table: `reactions`

```sql
CREATE TABLE reactions (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  object_slug TEXT    NOT NULL UNIQUE REFERENCES objects(slug),
  chills      INTEGER NOT NULL DEFAULT 0
);
```

#### Table: `reaction_log` (casual rate-limit, no auth)

```sql
CREATE TABLE reaction_log (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  object_slug TEXT    NOT NULL,
  ip_hash     TEXT    NOT NULL,   -- SHA-256 of IP, not raw IP
  reacted_on  TEXT    NOT NULL    -- ISO date string YYYY-MM-DD
);
CREATE UNIQUE INDEX idx_reaction_log ON reaction_log(object_slug, ip_hash, reacted_on);
```

Rate-limit rule: one chills per (object, ip_hash, calendar day). Silently reject duplicates (no error shown to user; client uses localStorage for instant feedback).

---

### Seed Data Module

**File:** `src/lib/seed-data.ts` — canonical TypeScript object that holds all 12 objects with their accurate facts from the spec.

**Script:** `scripts/seed.ts` — runs with `bun scripts/seed.ts`  
- Creates tables (if not exists)  
- Upserts all 12 objects  
- Inserts reactions row (chills=0) for each object if missing  
- Idempotent (safe to re-run)

Add to `package.json` scripts: `"db:seed": "bun scripts/seed.ts"`

---

### API Endpoints (Next.js Route Handlers)

All under `src/app/api/`.

#### `GET /api/objects`

Query params: `category` (string, optional), `search` (string, optional)

Response:
```json
{
  "objects": [
    {
      "slug": "the-sun",
      "name": "The Sun",
      "category": "Star",
      "tagline": "The star at the heart of everything.",
      "chills": 42
    },
    ...
  ],
  "total": 12
}
```

SQL: `SELECT o.*, r.chills FROM objects o LEFT JOIN reactions r ON o.slug = r.object_slug WHERE ... ORDER BY sort_order`

#### `GET /api/objects/today`

No params. Deterministic by date.

Algorithm:
```ts
const dayOfYear = getDayOfYear(new Date()); // 1–366
const index = (dayOfYear - 1) % 12;        // 0–11
// fetch object at sort_order = index + 1
```

Response: same shape as single object (full detail, see below).

#### `GET /api/objects/[slug]`

Response:
```json
{
  "slug": "the-sun",
  "name": "The Sun",
  "category": "Star",
  "tagline": "...",
  "description": "...",
  "stats": [{ "label": "Age", "value": "~4.6 billion years" }, ...],
  "facts": ["...", "..."],
  "chills": 42,
  "prevSlug": "trappist-1",
  "nextSlug": "jupiter"
}
```

Returns 404 JSON `{ "error": "Object not found" }` for unknown slugs.

#### `GET /api/categories`

Response:
```json
{
  "categories": [
    { "name": "Planet", "count": 3 },
    { "name": "Moon", "count": 2 },
    ...
  ]
}
```

#### `POST /api/reactions/[slug]`

Body: none required.  
Reads `x-forwarded-for` or `req.ip`, hashes it (SHA-256), checks `reaction_log`.

Success response:
```json
{ "chills": 43, "alreadyReacted": false }
```

Already-reacted response (HTTP 200, not error):
```json
{ "chills": 43, "alreadyReacted": true }
```

Unknown slug: `{ "error": "Object not found" }` HTTP 404.

---

### Data Layer

**File:** `src/lib/db.ts`  
- Initializes better-sqlite3 connection (singleton pattern for Next.js dev HMR safety)
- Exports typed query functions: `getObjects()`, `getObjectBySlug()`, `getObjectOfTheDay()`, `getCategories()`, `getChills()`, `incrementChills()`

**File:** `src/lib/seed-data.ts`  
- Pure TypeScript array of all 12 objects (no DB dependency)
- Canonical source of truth for content

---

### Object-of-the-Day Algorithm

```ts
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

function getObjectOfTheDay(date: Date = new Date()): DbObject {
  const idx = (getDayOfYear(date) - 1) % 12; // 0-based, mod 12
  return db.prepare('SELECT * FROM objects WHERE sort_order = ?').get(idx + 1);
}
```

---

### Client-Side State

- **Category filter + search:** React `useState` in the catalog page (no URL params needed for local-only build, but using `useSearchParams` for shareable URLs is a bonus)
- **Chills clicked state:** `localStorage.setItem('chills-[slug]', '1')` on successful POST; checked on component mount to show already-reacted state
- **No global state manager needed** (React context or simple props sufficient)

---

### Environment & Config

No `.env` variables needed for local-only build. DB path is hardcoded as `path.join(process.cwd(), 'cosmos.db')`.

`next.config.ts`:
```ts
const nextConfig = {
  experimental: { serverComponentsExternalPackages: ['better-sqlite3'] }
};
```

---

### Key Files Layout

```
my-frontend-mix/
├── cosmos.db                    (gitignored, created by seed script)
├── scripts/
│   └── seed.ts                  (Bun seed script)
├── src/
│   ├── app/
│   │   ├── layout.tsx           (root layout, CosmosNav, StarfieldCanvas)
│   │   ├── page.tsx             (home — object of the day)
│   │   ├── explore/
│   │   │   └── page.tsx         (catalog)
│   │   ├── object/
│   │   │   └── [slug]/
│   │   │       └── page.tsx     (detail)
│   │   └── api/
│   │       ├── objects/
│   │       │   ├── route.ts          (GET /api/objects)
│   │       │   ├── today/route.ts    (GET /api/objects/today)
│   │       │   └── [slug]/route.ts   (GET /api/objects/[slug])
│   │       ├── categories/
│   │       │   └── route.ts          (GET /api/categories)
│   │       └── reactions/
│   │           └── [slug]/route.ts   (POST /api/reactions/[slug])
│   ├── components/
│   │   ├── CosmosNav.tsx
│   │   ├── StarfieldCanvas.tsx
│   │   ├── ObjectOfTheDayCard.tsx
│   │   ├── CatalogGrid.tsx
│   │   ├── SearchAndFilter.tsx
│   │   ├── ObjectCard.tsx
│   │   ├── CosmicVisual.tsx
│   │   ├── CategoryBadge.tsx
│   │   ├── StatsGrid.tsx
│   │   ├── FactsList.tsx
│   │   ├── ChillsButton.tsx
│   │   └── ObjectNav.tsx
│   ├── lib/
│   │   ├── db.ts
│   │   ├── seed-data.ts
│   │   └── utils.ts             (getDayOfYear, slugify helpers)
│   └── types/
│       └── cosmos.ts            (CosmicObject, ObjectSummary, Category interfaces)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── .gitignore
```

---

### Seed Content (key facts per spec — exact numbers)

All 12 objects populated from spec. Stats arrays per object:

**The Sun:**
- Age: ~4.6 billion years
- Distance from Earth: ~150 million km (1 AU)
- Core temperature: ~15 million °C
- Share of Solar System mass: ~99.86%
- Type: G2V main-sequence star

**Jupiter:**
- Distance from Sun: ~778 million km
- Moons: 95 officially recognized
- Day length: ~10 hours
- Great Red Spot: wider than Earth

**Saturn:**
- Distance from Sun: ~1.4 billion km (9.5 AU)
- Density: less than water
- Largest moon: Titan
- Notable feature: planetary ring system of ice and rock

**Mars:**
- Distance from Sun: ~228 million km
- Olympus Mons height: ~22 km
- Moons: Phobos and Deimos (2)
- Surface color: iron oxide red

**Europa:**
- Parent planet: Jupiter
- Surface: icy crust over subsurface saltwater ocean
- Size: slightly smaller than Earth's Moon
- Significance: one of the best candidates for extraterrestrial life

**Titan:**
- Parent planet: Saturn
- Atmosphere: thick nitrogen (only moon with dense atmosphere)
- Surface feature: liquid methane and ethane lakes and rivers

**Betelgeuse:**
- Distance: ~550–650 light years
- Constellation: Orion
- Type: red supergiant
- Notable event: Great Dimming 2019–2020

**Sagittarius A*:**
- Location: center of the Milky Way
- Mass: ~4.3 million solar masses
- Distance from Earth: ~26,000 light years
- First imaged: 2022, Event Horizon Telescope

**Orion Nebula (M42):**
- Type: stellar nursery
- Distance: ~1,344 light years
- Constellation: Orion (middle "star" of the sword)
- Visibility: naked eye

**Pillars of Creation:**
- Location: Eagle Nebula (M16)
- Distance: ~5,700 light years
- Famous images: Hubble 1995, JWST 2022

**Andromeda Galaxy (M31):**
- Distance: ~2.5 million light years
- Stars: ~1 trillion
- Fate: on collision course with Milky Way in ~4.5 billion years
- Type: spiral galaxy

**TRAPPIST-1:**
- Distance: ~40 light years
- Planets: 7 Earth-sized
- Habitable zone planets: several
- Star type: ultracool dwarf

---

## SECTION C - Deployment Plan

**Local only — no deployment needed this run.**

### Local Dev Setup

```bash
bun install                  # install all dependencies
bun run db:seed              # create cosmos.db and seed 12 objects
bun run dev                  # start Next.js dev server on http://localhost:3000
```

### Success Criteria

The build is complete when:
1. `bun run dev` starts without errors
2. `http://localhost:3000` loads the home page with today's object
3. `http://localhost:3000/explore` shows all 12 objects; filtering and search work
4. `http://localhost:3000/object/the-sun` (and all 11 other slugs) show full detail
5. `POST /api/reactions/[slug]` increments the chills count and persists to SQLite
6. No TypeScript errors (`bun run build` passes or `tsc --noEmit` passes)

### Pre-run Checklist

- `cosmos.db` is in `.gitignore`
- `node_modules` is in `.gitignore`
- `bun.lockb` is committed

### Stretch Goal (not required, do not block on this)

A single `vercel deploy --prod` would publish the app, but it is explicitly out of scope for this run. No Vercel config needed.
