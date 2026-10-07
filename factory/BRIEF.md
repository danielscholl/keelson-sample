# Brief

What to build. This part is the same whether one agent builds it or a factory
does, so it doubles as the eval prompt.

```text
Build Cosmos, the app described in spec.md, as a showcase site. spec.md owns the content, the canonical facts and the capabilities; this brief owns the quality bar.

Stack: Bun and TypeScript, no frontend framework, no third-party runtime dependencies, Bun.serve with HTML imports, bun:sqlite for reactions, bun test for tests. bun run dev serves the app on port 3000.

Art direction: a cinematic planetarium at night, not a dashboard. Near-black blue depth with layered gradients and a procedural starfield, one warm accent used sparingly, generous negative space, oversized display type, small uppercase eyebrow labels. One shared design system that every page is built from, so the landing page and the detail page read as one site. Every one of the 12 objects gets its own recognizable SVG illustration (Saturn's rings, Jupiter's bands and Great Red Spot, the black hole's lensed accretion ring, Andromeda's tilted spiral), never one generic sphere. System fonts only; no images, web fonts or CDNs.

Behavior: every capability in spec.md works. The category filter and search live in the URL. The object of the day rolls over at the visitor's local midnight. The chills reaction persists server-side, refuses a same-day repeat with a calm message, and never races. A detail view walks the catalog with the arrow keys and returns with Escape. Layouts hold at 375px wide, focus is visible, contrast meets WCAG AA, and motion respects prefers-reduced-motion.

Done means: bun test and bun run typecheck pass, tests cover the API, the store and the pure UI logic, and README.md says how to run the app.
```
