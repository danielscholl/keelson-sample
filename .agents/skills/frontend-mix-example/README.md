# Frontend-Mix Example: the Cosmos Build

This is a **worked example** of the mixed-provider frontend workflow, ported for GitHub Copilot
CLI. The `frontend-mix-*` skills in `.agents/skills/` are run end-to-end to build a real app, and
the actual documents each step produced are captured in [`artifacts/`](./artifacts) so you can read
exactly what gets handed from one step to the next.

The app built here is **Cosmos**, a cinematic, no-login deep-sky planetarium: 12 real celestial
objects, a SQLite-backed API, a deterministic "object of the day", and an anonymous "chills"
reaction counter. The whole thing is rendered with CSS/SVG/gradients, no photos.

## The core idea

You don't pick one model. You route each phase to the model that's best at it, and the **handoff
between steps is a markdown file on disk, not a shared chat history.** Two models that have never
seen each other's context hand off cleanly because they both read the same artifact.

In Copilot CLI there's a single session - you switch the active model per phase with **`/model`**
(use `/model auto` to let Copilot pick). The skill `description` for each step recommends a model
class: a **fast/low-cost** model for grind work (explore, validate, smoke), a **strong reasoning**
model for judgment (plan, integrate, fix-validation, deploy), and a **UI-strong** model for the
design step. The original run that produced these artifacts used the providers noted in the table
below; the point is the routing, not the specific vendor.

```
spec.md                                          ← the input brief (Section A/B/C intent)
  │  frontend-mix-explore     (fast / low-cost model)
  ▼
.agents/artifacts/context.md                     ← repo state · framework rec · spec path · open decisions
  │  frontend-mix-plan        (strong reasoning)     reads context.md + the spec it points to
  ▼
.agents/artifacts/plan.md                        ← SECTION A content brief · B integration scope · C deploy
  │  frontend-mix-design      (UI-strong model)      reads SECTION A only
  ▼
.agents/artifacts/ui-summary.md                  ← the UI is designed, // INTEGRATION: stubs left behind
  │  frontend-mix-integrate   (strong reasoning)     reads SECTION B + ui-summary
  ▼
.agents/artifacts/integration-summary.md         ← API/DB wired, the stubs stripped
  │  frontend-mix-validate    (fast / low-cost model)
  ▼
.agents/artifacts/validation-summary.md          ← install / typecheck / lint / build
  │  frontend-mix-fix-validation (strong reasoning)  no-ops if validate was clean
  ▼
.agents/artifacts/resolution-summary.md
  │  frontend-mix-smoke       (fast / low-cost + a browser-driving skill)
  ▼
.agents/artifacts/smoke-summary.md (+ smoke-shots/)  ← drives the running app: routes, the chills click, real 404s
  │  frontend-mix-deploy      (strong reasoning)      follows SECTION C
  ▼
.agents/artifacts/deploy-summary.md              ← local-only for this build
```

## Skill → artifact map

| Step | Skill | Recommended model class | Model used in this run | Artifact |
|------|-------|-------------------------|------------------------|----------|
| 0 | `frontend-mix-explore` | fast / low-cost | Claude Sonnet | `artifacts/context.md` |
| 1 | `frontend-mix-plan` | strong reasoning | Claude Opus | `artifacts/plan.md` |
| 2 | `frontend-mix-design` | UI-strong | Gemini 3.5 Flash | `artifacts/ui-summary.md` |
| 3 | `frontend-mix-integrate` | strong reasoning | Claude Opus | `artifacts/integration-summary.md` |
| 4 | `frontend-mix-validate` | fast / low-cost | Claude Sonnet | `artifacts/validation-summary.md` |
| 5 | `frontend-mix-fix-validation` | strong reasoning | Claude Opus | `artifacts/resolution-summary.md` |
| 6 | `frontend-mix-smoke` | fast / low-cost + browser skill | Claude Sonnet | `artifacts/smoke-summary.md` + `artifacts/smoke-shots/` |
| 7 | `frontend-mix-deploy` | strong reasoning | Claude Opus | `artifacts/deploy-summary.md` |

> The smoke step (6) catches the bug below. It runs the `frontend-mix-smoke` skill in
> `.agents/skills/`; the example's `smoke-summary.md` came from running it.

## The one bug this pattern reliably produces

The design step put components under `lib/`, but the Tailwind `content` globs only scanned
`app`/`pages`/`components`, so those classes generated **no CSS**. The page compiled, typechecked,
linted, and built clean, and loaded HTTP 200, but rendered as a flat unstyled list. Static checks
all pass; only the **smoke** step (which looks at the actual rendered page) catches it. That's the
whole argument for the smoke step: "compiles green, renders broken."

## Notes

- `spec.md` is the input brief that started the run.
- `artifacts/` here mirrors what a live run writes to `.agents/artifacts/` at the repo root.
- These are real artifacts from the Cosmos build runs. `ui-summary.md` is the genuine design-step
  output (it lists the `// INTEGRATION:` stubs); the rest are from the complete end-to-end run that
  also produced the validate/smoke/deploy docs. The provider names in the table reflect that
  original run - in Copilot CLI you choose comparable models with `/model`.
