---
name: frontend-mix-design
description: Design and scaffold a beautiful frontend from SECTION A of a planning document. Best handled by a model strong at UI generation (switch with /model; Gemini-class models excel here). The skill only builds the UI surface - auth, API calls, and SDK integrations belong to the next step. Use when the user has a plan.md from the frontend-mix-plan skill and is ready to build the UI.
argument-hint: <plan.md path>
---

# Frontend-Mix · Design

You are the **UI design** step of a manual mixed-provider build. This step is best handled by a model that is strong at UI generation - use `/model` to switch to one (Gemini-class models tend to produce the most polished frontends). **Only build the UI surface - auth, API calls, third-party SDKs, and deployment belong to later steps. Do not touch them.**

## What to do

1. Use the `view` tool to open the plan path the user gave you, end-to-end. Extract everything under the `## SECTION A - UI Scope` header. Ignore SECTION B and SECTION C - they are not your scope.

2. The plan filename carries your run-name. Strip the directory and the `-plan.md` suffix. Example: `.agents/artifacts/acme-saas-landing-plan.md` → run-name = `acme-saas-landing`. You'll use it to name your output file so the next skill in the chain can find it.

3. If no plan path was given or it doesn't resolve, ask the user for the plan path. Do not proceed without it.

## How to build

1. Treat SECTION A's copy as canonical - do not invent or paraphrase headlines.
2. Scaffold pages and components in the framework already in the repo (Next.js App Router by default; honor whatever the plan says).
3. Use Tailwind + shadcn/ui. Lean into beautiful layout, generous spacing, subtle animation, strong accessible contrast. Mobile-first.
4. **Leave seams for the integration step.** Every place that needs auth state, every API call site, every protected route - leave a clearly named stub and a `// INTEGRATION: ...` comment describing what the integration step should fill in.
5. Do NOT install auth SDKs (no `clerk init`, no Supabase wiring, etc).
6. Do NOT call third-party APIs.
7. Do NOT create server routes - those are the integration step's job.

## Output

Write to `.agents/artifacts/<run-name>-ui-summary.md`. Create the `.agents/artifacts/` directory if it doesn't exist.

The file lists:
- Every file created (path + one-line purpose)
- Every `// INTEGRATION:` stub left behind (file + line + what's expected)

## After scaffolding

Tell the user the absolute path to `<run-name>-ui-summary.md` and the next step:

```
Wrote .agents/artifacts/<run-name>-ui-summary.md

Next: switch back to a strong reasoning model with /model, then ask Copilot to run the
frontend-mix-integrate step with BOTH the plan path AND the ui-summary path.
```

## Design tips

- The hero/landing page is where a strong UI model's edge shows. Spend disproportionate effort here.
- Subtle motion is not heavy motion. A 200ms fade on card hover beats a parallax scroll.
- One accent color, used sparingly. Two if the brand demands it.
- White space is not wasted space. Don't fill it.
