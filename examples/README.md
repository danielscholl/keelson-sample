# examples

Spare parts for going further with the Cosmos build than `frontend-mix` alone goes.

## `cosmos-plan.md`

A representative plan the `frontend-mix` `plan` node produces from `spec.md`, with
the three sections every downstream phase reads: the UI scope, the data and API
contract, and the deploy decision. It is committed here so you have a real plan to
work with without paying for a build first.

The interesting half is **SECTION B, the data contract**. A linear build implements
it faithfully and validates the build against it, so nothing in the pipeline ever
questions the contract itself. That is its blind spot, and it is exactly the kind of
thing a *room of reviewers* catches before a line of code is written. If you have
the [chamber](https://github.com/danielscholl/keelson-rib-chamber) rib installed,
SECTION B is a ready-made target to red-team: it carries a handful of defects that
are internally consistent but externally wrong (a UTC-midnight "daily" that flips
mid-evening for most of the world, a `sort_order` range that never says unique, a
check-then-increment rate limit with a race in the gap).

## A review panel, ready to author

Genesis writes a Mind from a one-line brief. These four author a contract-review
panel for SECTION B: three reviewers who disagree by design, plus a moderator to
route them. A review wants independent reads, so pin the three reviewers to three
different models (all on one Copilot subscription) rather than the "best" one.

| Brief | Model (Copilot) | Why this model |
|---|---|---|
| A spec-first build planner who defends the plan and concedes only real, spec-grounded defects. | `claude-opus-4.8` | reasoning and holding a line |
| An adversarial contract skeptic who stress-tests API and data contracts against real-world timing, load, and failure. | `gpt-5.5` | blunt and literal, good at finding the edge |
| A backend realist who owns persistence, idempotency, and what survives a restart. | `gemini-3.1-pro-preview` | a third family, a third reading |
| A moderator who routes the discussion and closes it without debating. | `claude-opus-4.8` | orchestration |

```bash
keelson workflow run chamber-genesis --arguments "A spec-first build planner who defends the plan and concedes only real, spec-grounded defects." --inputs model=claude-opus-4.8 --inputs provider=copilot
keelson workflow run chamber-genesis --arguments "An adversarial contract skeptic who stress-tests API and data contracts against real-world timing, load, and failure." --inputs model=gpt-5.5 --inputs provider=copilot
keelson workflow run chamber-genesis --arguments "A backend realist who owns persistence, idempotency, and what survives a restart." --inputs model=gemini-3.1-pro-preview --inputs provider=copilot
keelson workflow run chamber-genesis --arguments "A moderator who routes the discussion and closes it without debating." --inputs model=claude-opus-4.8 --inputs provider=copilot
```

Then convene a `group-chat` room of the three reviewers, moderated by the fourth,
and hand it SECTION B. For a build instead of a review, the model strengths flip
the other way: pin a design worker to `gemini-3.1-pro-preview`, a coding worker to
`gpt-5.5`, and a manager to `claude-opus-4.8`. The chamber rib's tutorials walk
both paths.
