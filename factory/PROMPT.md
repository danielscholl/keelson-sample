# Factory prompt

Two parts, pasted together into **Start a swarm** on the Swarms tab: the brief
from [`BRIEF.md`](BRIEF.md) (what to build), then the factory section below
(how to build it). Use **Fleet**, **Factory mode** on, and **Write** and
**Use the tracker** on, in a clone with no `origin` remote.

Hand the brief alone to a single agent to get the baseline the factory has to
beat.

```text
How the factory works. You lead it, and the tracker is the plan.

If the tracker holds no beads, plan first: cut the whole build into beads, each small enough for one writer, each with a description, acceptance criteria another agent can check against a diff, and dependencies that let independent work run in parallel. Settle in the beads what writers would otherwise argue about, such as file layout and the design system. Post the plan in the channel and have at least two agents critique it before anyone builds; revise the beads to settle what they raise. If the tracker already holds beads, critique and refine them the same way instead of starting over.

Staff the factory as you judge best, within the plan's seats: writers, a design critic, a reviewer, whatever the work needs. Agents may talk among themselves, review each other's work against the brief and spec.md, and propose new or changed beads. Mark a bead in progress when a writer takes it. Writers run bun test and bun run typecheck before reporting. When you ask for a review, paste the bead's acceptance criteria into the request. Nothing merges until an agent other than its writer has approved that head. Judge pages by how they look, not only by their code: for any change a visitor can see, the writer runs the app on a free port and saves full-page screenshots at 1440px and 375px wide with whatever headless browser the machine has (letting entrance motion settle first), keeps them out of git, and names the image files in its report. A design critic opens those images, holds them to the brief's art direction, and sends back the one change that would most improve the page, until it approves. Merge each approved head and close its bead as it lands, so the board drains in dependency order.

Conclude with the closed beads, what the reviewers pushed back on, what nobody checked, and the command to run the app.
```
