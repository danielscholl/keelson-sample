# examples

Spare parts for going further with the Cosmos build than `frontend-mix` alone goes.

## `cosmos-plan.md`

A representative plan the `frontend-mix` `plan` node produces from `spec.md`, with
the three sections every downstream phase reads: the UI scope, the data and API
contract, and the deploy decision. It is committed here so you have a real plan to
work with without paying for a build first.

The interesting half is **SECTION B, the data contract**. A linear build implements
it faithfully and validates the build against it, so nothing in the pipeline ever
questions the contract itself. It carries a handful of defects that are internally
consistent but externally wrong: a UTC-midnight "daily" that flips mid-evening for
most of the world, a `sort_order` range that never says unique, and a
check-then-increment rate limit with a race in the gap.

## Review it with a swarm

With the [swarm](https://github.com/danielscholl/keelson-rib-swarm) rib installed,
a Scout swarm reviews the contract in a few minutes. Register this repository as a
project (read-only is enough), choose **Scout**, and start it with:

```text
Review SECTION B of examples/cosmos-plan.md against spec.md. Spawn three reviewers: a contract skeptic who stress-tests timing, load and failure; a backend realist who owns persistence, idempotency and what survives a restart; and a spec-first planner who defends the plan and concedes only spec-grounded defects. Each posts its strongest finding with the line it cites, then replies to one other reviewer's finding. You judge: list the defects that survived, each with the one-line fix, and write the corrected SECTION B in full.
```

Save the corrected section into a copy of the plan, `examples/cosmos-plan-reviewed.md`.

## Rebuild from the reviewed plan

A review only pays off if you can build from its result. Keep the original
`cosmos-plan.md` beside the reviewed copy, then build each one on its own
`--worktree` branch by pointing the `PLAN` input at it:

```bash
# the plan as written, defects and all
keelson workflow run frontend-mix --worktree --watch \
  --inputs ARGUMENTS="Build the app described in spec.md. Local only - no deployment this run." \
  --inputs PLAN=examples/cosmos-plan.md

# the same build from the hardened plan
keelson workflow run frontend-mix --worktree --watch \
  --inputs ARGUMENTS="Build the app described in spec.md. Local only - no deployment this run." \
  --inputs PLAN=examples/cosmos-plan-reviewed.md
```

The `plan` node adopts each file verbatim and skips planning, so the only thing
that changed between the two builds is the contract they were handed. The
`git diff` between their two branches is the review's payoff made concrete.
