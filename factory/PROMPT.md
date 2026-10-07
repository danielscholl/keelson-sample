# Factory prompt

Paste this into **Start a swarm** on the Swarms tab, with the plan set to
**Crew**, **Factory mode** on, and **Write** and **Use the tracker** on.

```text
Build Cosmos from the beads in this project's tracker; spec.md is the brief and each bead's description and acceptance criteria are the contract. Spawn two writers and one read-only reviewer. Writers take ready beads, one at a time; mark each bead in progress when a writer takes it. Writers run bun test and bun run typecheck before reporting. The reviewer reads each writer's diff against its bead's acceptance criteria (every bead's criteria are also in factory/backlog.json) and posts approve or one concrete issue. Merge each reviewed head and close its bead as it lands, so the board drains in dependency order. Conclude with the closed beads and the command to run the app.
```
