# keelson-sample · Cosmos

A template project for [Keelson](https://github.com/danielscholl/keelson) that
builds one app, "Cosmos" (a no-login, local-only planetarium explorer described
in `spec.md`), in two shapes:

- **A pipeline.** The `frontend-mix` workflow builds the app in one straight
  line and routes each phase to the model class that earns its tokens there:
  fast models for grind work, strong reasoning for judgment, a UI-strong model
  for design. Swap the models per node, re-run, and compare.
- **A factory.** `factory/backlog.json` is the same build cut into eight beads
  with real dependencies. Seed it into a [beads](https://github.com/steveyegge/beads)
  tracker and a [swarm](https://github.com/danielscholl/keelson-rib-swarm) of
  agents works the graph in dependency order: writers build ready beads side by
  side, a reviewer reads every diff against its bead's acceptance criteria, and
  the lead merges each change and closes its bead.

> **Follow the tutorials:**
> [the pipeline](https://danielscholl.github.io/keelson/docs/tutorials/frontend-mix/) ·
> [the backlog](https://danielscholl.github.io/keelson/docs/tutorials/plan-the-backlog/) ·
> [the factory](https://danielscholl.github.io/keelson/docs/tutorials/run-the-factory/)

## What's in this repo

| Path | What it is |
|---|---|
| `.keelson/workflows/frontend-mix.yaml` | The workflow — a 10-node DAG Keelson runs unattended |
| `spec.md` | A ready-to-use input brief (the "Cosmos" planetarium app) |
| `.agents/skills/frontend-mix-*` | Eight agent skills for driving the same chain by hand from a chat session |
| `.agents/artifacts/` | Where a finished run commits its handoff trail |
| `factory/backlog.json` | The Cosmos build as eight beads with dependencies, ready for `bd create --graph` |
| `factory/PROMPT.md` | The swarm prompt that drains the backlog |
| `examples/` | A representative `plan.md` to review or build from (see [`examples/README.md`](examples/README.md)) |
| `backlog.md` | Scoped improvements for the app once it is built, by either shape |

## The pipeline

### The chain

Each node writes its primary output to a markdown file in the run's artifact
directory; the next node reads that file. The file is the contract — which is
exactly why different models can hand off cleanly between steps.

| Phase | Node | Model class | Artifact |
|---|---|---|---|
| 1 | `explore` | fast / low-cost | `context.md` |
| 2 | `plan` | strong reasoning | `plan.md` (SECTION A/B/C) |
| 3 | `build-ui` | UI-strong | `ui-summary.md` |
| 4 | `integrate` | strong reasoning | `integration-summary.md` |
| 5 | `validate` | fast / low-cost | `validation-summary.md` or `validation-issues.md` |
| 5b | `fix-validation` | strong reasoning | `resolution-summary.md` |
| 6 | `smoke` | fast / low-cost | `smoke-summary.md` — drives the *running* app |
| 7 | `approve-deploy` | — (human) | your sign-off, from the UI or CLI |
| 8 | `deploy` | strong reasoning | `deploy-summary.md` |
| 9 | `finalize` | — (bash) | commits the build + artifact trail |

The smoke step is the one that catches "compiles green, renders broken": a
build that typechecks, lints, and serves HTTP 200 but renders blank or
unstyled (a Tailwind `content` glob that misses a directory does exactly
this). Static checks pass it; only driving the running app catches it.

### Quick start

You need [Keelson installed](https://danielscholl.github.io/keelson/docs/guides/installation/)
and its default provider (GitHub Copilot) authenticated — `keelson doctor`
confirms both.

```bash
# 1. Create your copy from this template, then clone it
gh repo create my-frontend-mix --template danielscholl/keelson-sample --private --clone
cd my-frontend-mix

# 2. Start the server and register this clone as a project
keelson start
keelson project add frontend-mix "$(pwd)"

# 3. Sanity-check the workflow, then run it against the bundled spec
keelson workflow validate
keelson workflow run frontend-mix --watch \
  --inputs ARGUMENTS="Build the app described in spec.md. Local only - no deployment this run."
```

The run streams node-by-node in your terminal and in the Workflows surface at
`http://127.0.0.1:7878`. After the smoke test the run **pauses at an approval
gate** — reply from the UI, or:

```bash
keelson workflow respond <runId> approve-deploy "skip"
```

When the run completes, the app is built in your working tree and the full
handoff trail is committed under `.agents/artifacts/`.

### Mix the models

`.keelson/workflows/frontend-mix.yaml` is the swap point. Each node pins a
`model:`; the workflow header explains the routing. Change one line — say,
point `build-ui` at a different model — and re-run the same command to see
what a different model does with identical instructions.

To mix whole providers (Claude, Pi, Codex), enable them in
`~/.keelson/config.json` and add a `provider:` line to a node. See the
[configuration guide](https://danielscholl.github.io/keelson/docs/guides/configuration/).

### Compare runs

Run with `--worktree` and each attempt lands on its own branch
(`keelson/frontend-mix/<run-id>`) in an isolated git worktree — your main
branch stays untouched, and comparing two models is a `git diff` away:

```bash
keelson workflow run frontend-mix --worktree --watch \
  --inputs ARGUMENTS="Build the app described in spec.md. Local only - no deployment this run."
```

### Rebuild from a reviewed plan

Nothing in a linear pipeline ever questions the plan it trusts — a single model
writes the contract every later phase builds against, and a straight line has
nowhere to review it. So review it *before* the build, then rebuild from the
hardened version. The optional `PLAN` input takes a path to an existing
`plan.md`; the `plan` node adopts that file verbatim and skips planning, so every
downstream phase builds the plan you handed it rather than a freshly generated one:

```bash
keelson workflow run frontend-mix --worktree --watch \
  --inputs ARGUMENTS="Build the app described in spec.md. Local only - no deployment this run." \
  --inputs PLAN=examples/cosmos-plan.md
```

`examples/cosmos-plan.md` is a committed plan to edit by hand, or hand to a
swarm of reviewers to harden first. [`examples/README.md`](examples/README.md)
has the review prompt and the full round trip: build, review, rebuild, diff.

## The factory

You need the `bd` CLI 1.2 or later (`brew install beads`) and two ribs:

```bash
keelson rib add https://github.com/danielscholl/keelson-rib-beads
keelson rib add https://github.com/danielscholl/keelson-rib-swarm
```

The swarm rib also needs a `clickclack` binary on PATH and a grant that lets a
swarm's lead use the tracker; its
[install guide](https://danielscholl.github.io/keelson-rib-swarm/guides/install/)
and the [factory tutorial](https://danielscholl.github.io/keelson/docs/tutorials/run-the-factory/)
cover both. Then:

```bash
# 1. A fresh copy with no origin, so the swarm reviews and merges locally
git clone https://github.com/danielscholl/keelson-sample cosmos-factory
cd cosmos-factory
git remote remove origin

# 2. Seed the backlog and register the project
bd init --skip-agents --skip-hooks --non-interactive --prefix cosmos
bd create --graph factory/backlog.json
keelson stop && keelson start
keelson project add cosmos-factory "$(pwd)"
```

On the Swarms tab, paste the prompt from `factory/PROMPT.md`, choose **Crew**,
turn on **Factory mode**, pick `cosmos-factory`, and turn on **Write** and
**Use the tracker**. Keep the Beads tab open beside it to watch the board drain.
When the swarm concludes, `main` carries one reviewed merge per bead:

```bash
bun install && bun test && bun run dev
```

## After the build: work the backlog

Either build leaves a real app in your tree, and `backlog.md` keeps it going:
scoped improvements written against the spec rather than any one build, since
every build differs. File them as beads and run the factory again, or hand one
to a chat session or a workflow.

## Run it by hand instead

The `.agents/skills/frontend-mix-*` skills run the same chain one step at a
time from a chat session, with you switching models between steps — useful
when you want to inspect or steer each handoff. They follow the standard
agent-skills layout, so GitHub Copilot CLI picks them up from `.agents/skills/`
automatically (confirm with `/skills`). Start with `frontend-mix-explore`;
each skill tells you the next step.

## Requirements

- [Keelson](https://github.com/danielscholl/keelson) with its default Copilot
  provider authenticated (other providers optional — they're for the mixing).
- [Bun](https://bun.sh/) on your PATH (Keelson runs on it; the built app uses
  it too).
- No other keys needed: the bundled `spec.md` describes a no-auth, local-only
  app on purpose.
- For the factory: the `bd` CLI, the beads and swarm ribs, and `clickclack`.

## Credits

This sample is a Keelson port of **[frontend-mix](https://github.com/coleam00/frontend-mix)**
by [Cole Medin](https://github.com/coleam00) — the multi-model build, the
per-phase model routing, and the eight agent skills all originate there. He
walks through the original in [Claude Plans, Gemini Designs: One Workflow for
Beautiful Frontends](https://www.youtube.com/watch?v=Xh1z23uBZo0); go watch it
and support the [channel](https://www.youtube.com/@ColeMedin) — it's
consistently some of the best agent-engineering content around.

Keelson's workflow engine borrows its schema and DAG concepts from Cole's
[Archon](https://github.com/coleam00/Archon) as well.

## License

Licensed under the [Apache License 2.0](LICENSE).
