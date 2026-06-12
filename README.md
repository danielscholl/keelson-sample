# frontend-mix

A mixed-model workflow for building beautiful, full-stack web apps by routing each phase of the build to the model that earns its tokens at that step — all from a single GitHub Copilot CLI session, switching models with `/model`.

> [!TIP]
> **Don't want to wire this up by hand? Ask Copilot.** Point Copilot CLI at this repo and say *"set up frontend-mix for me"* or *"run the frontend-mix chain for &lt;app idea&gt;."* The skills in `.agents/skills/` auto-load as project skills, so Copilot can drive the whole chain, switching models per phase with `/model`.

The chain routes each phase to a model class, picked with `/model`:

- **Fast / low-cost** (e.g. `claude-haiku-4.5`, `gemini-3.5-flash`) explores the repo and scopes the spec into a context handoff.
- **Strong reasoning** (e.g. `claude-opus-4.8`, `gpt-5.5`) plans the architecture, page copy, integrations, and deploy target.
- **UI-strong** (e.g. `gemini-3.5-flash`, `gemini-3.1-pro`) designs the UI from the plan's copy.
- **Strong reasoning** wires the integrations (auth, APIs, SDKs) into the UI scaffold.
- **Fast / low-cost** validates the build (install, typecheck, lint, build, tests).
- **Strong reasoning** addresses anything validation flagged.
- **Fast / low-cost** smoke-tests the *running* app — the step that catches "compiles green, renders broken."
- **Strong reasoning** runs the deploy.

The handoff between steps is a single markdown document on disk under `.agents/artifacts/`. Each step reads the prior artifact and writes the next. The file is the contract — which is exactly why one Copilot session can switch models between steps and still hand off cleanly.

## What's in this repo

- `.agents/skills/frontend-mix-*` — eight Copilot skills, one per phase, for running the chain by hand.
- `.agents/skills/frontend-mix-example/` — a complete worked example (the Cosmos build) with the real artifacts each step produced.
- `.agents/artifacts/` — where a live run writes its handoff files.

## Installing

Copilot CLI auto-discovers project skills from `.agents/skills/` (it also scans `.github/skills/` and `.claude/skills/`). **Inside this repo there's nothing to install** — the eight skills load automatically. Confirm with `/skills`.

To make them available in every repo, copy them into a personal skills directory Copilot scans (`~/.copilot/skills/` or `~/.agents/skills/`):

```bash
cp -r .agents/skills/frontend-mix-* ~/.copilot/skills/
```

> **Picking models per phase.** Copilot routes a single session through many models. Switch with `/model <id>` (or `/model auto` to let Copilot choose). Each skill's description recommends a model class — a fast model for grind work (explore, validate, smoke), a strong-reasoning model for judgment (plan, integrate, fix-validation, deploy), and a UI-strong model (a Gemini model) for design. There's no extra setup: the "mixed-provider" idea is just `/model` between steps.

## How to run the chain by hand

Switch to the recommended model with `/model`, then ask Copilot to run the step. Skills auto-trigger from their description; you can also name the step explicitly (e.g. *"run the frontend-mix-plan step on &lt;path&gt;"*). Each step writes a markdown file to `.agents/artifacts/` with the run-name as the filename prefix. The next step just needs that path.

### Quick chain

1. `frontend-mix-explore <spec.md path or "description">` — fast model
2. `frontend-mix-plan <context.md path>` — strong reasoning
3. `frontend-mix-design <plan path>` — UI-strong model
4. `frontend-mix-integrate <plan path> <ui-summary path>` — strong reasoning
5. `frontend-mix-validate <integration-summary path>` — fast model
6. `frontend-mix-fix-validation <validation-issues path> <plan path>` — strong reasoning (only if step 5 flagged failures)
7. `frontend-mix-smoke <integration-summary path> <validation-summary or resolution-summary path>` — fast model
8. `frontend-mix-deploy <plan path> <validation-summary or resolution-summary path>` — strong reasoning

<details>
<summary><b>Detailed walkthrough</b> (click to expand)</summary>

### 1. Explore — fast model

Set a fast model (`/model claude-haiku-4.5`, or any quick model). The explore step accepts **either** an absolute path to a spec markdown **or** a free-form description of what you want to build. Both work; whichever is more convenient. This is cheap context-gathering.

With a spec file:

```
Run the frontend-mix-explore step on /path/to/spec.md
```

With a plain-text description:

```
Run the frontend-mix-explore step: "A landing page + sign-in + dashboard for an AI image-gen SaaS, Clerk for auth"
```

The skill picks a run-name slug from your input (e.g. `acme-saas-landing`), inspects the repo, and writes:

```
.agents/artifacts/acme-saas-landing-context.md
```

Note that path. The plan step needs it.

### 2. Plan — strong reasoning

Switch the model (`/model claude-opus-4.8`) and hand the plan step the context path from step 1. It reads the context (and the spec the context points to) and writes the three-section plan — no re-exploration:

```
Run the frontend-mix-plan step on /path/to/acme-saas-landing-context.md
```

Output:

```
.agents/artifacts/acme-saas-landing-plan.md
```

Note that path. The next step needs it.

### 3. Design — UI-strong model

Switch to a model strong at UI generation (`/model gemini-3.5-flash`). Then run the design step on the plan path:

```
Run the frontend-mix-design step on /path/to/acme-saas-landing-plan.md
```

Output:

```
.agents/artifacts/acme-saas-landing-ui-summary.md
```

### 4. Integrate — strong reasoning

Switch back to a strong-reasoning model (`/model claude-opus-4.8`). Pass BOTH the plan path AND the ui-summary path:

```
Run the frontend-mix-integrate step on /path/to/acme-saas-landing-plan.md and /path/to/acme-saas-landing-ui-summary.md
```

Output:

```
.agents/artifacts/acme-saas-landing-integration-summary.md
```

### 5. Validate — fast model

Switch to a fast model (`/model claude-haiku-4.5`):

```
Run the frontend-mix-validate step on /path/to/acme-saas-landing-integration-summary.md
```

Output is one of two files. If the build is clean:

```
.agents/artifacts/acme-saas-landing-validation-summary.md
```

If validation flagged failures after two repair attempts:

```
.agents/artifacts/acme-saas-landing-validation-issues.md
```

### 6. Fix validation — strong reasoning (only if step 5 wrote `validation-issues.md`)

Switch to a strong-reasoning model (`/model claude-opus-4.8`):

```
Run the frontend-mix-fix-validation step on /path/to/acme-saas-landing-validation-issues.md and /path/to/acme-saas-landing-plan.md
```

Output:

```
.agents/artifacts/acme-saas-landing-resolution-summary.md
```

The summary ends with `READY TO DEPLOY` or `NOT READY: <reason>`. Do not advance to smoke or deploy if it's NOT READY.

### 7. Smoke — fast model

Drive the *running* app and confirm it actually works — the bugs static checks can't see. Switch to a fast model and pass the integration-summary path AND the validation summary (clean run) OR the resolution summary (after fix-validation):

```
Run the frontend-mix-smoke step on /path/to/acme-saas-landing-integration-summary.md and /path/to/acme-saas-landing-validation-summary.md
```

It starts the app on a free port, drives every route, exercises the primary interaction, checks a bogus route returns a real 404, and screenshots each page. A page that loads 200 but renders blank/unstyled is a DEFECT. Output:

```
.agents/artifacts/acme-saas-landing-smoke-summary.md
```

The summary ends with `SMOKE: PASS` or `SMOKE: DEFECTS`. Fix any defects (switch to a strong-reasoning model) before deploying.

> If a browser-driving skill (e.g. `agent-browser`) is available, the step drives a real browser. Without it, the step falls back to curl-only route/API checks.

### 8. Deploy — strong reasoning

Switch to a strong-reasoning model. Pass the plan path AND either the validation summary (clean run) OR the resolution summary (after fix-validation):

```
Run the frontend-mix-deploy step on /path/to/acme-saas-landing-plan.md and /path/to/acme-saas-landing-resolution-summary.md
```

Output:

```
.agents/artifacts/acme-saas-landing-deploy-summary.md
```

App is live.

</details>

## Requirements

The chain needs only GitHub Copilot CLI. Switch models with `/model` between steps; every handoff is a file on disk under `.agents/artifacts/`. A browser-driving tool such as `agent-browser` is optional — it lets the smoke step drive a real browser; without it, smoke falls back to curl-only route/API checks.
