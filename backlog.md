# Backlog — Cosmos

Both builds end with a working app, the `frontend-mix` pipeline and the factory
run over `factory/backlog.json`, and a working app is where the interesting work
starts. This backlog is what comes after the first build: hand an item to a
chat session, a workflow, or a swarm, and compare how each one works the same
change.

Every build of Cosmos is different — same spec, different models, different
code — so each item below is written against the **spec's capabilities**, not
any particular implementation. Whatever your build looks like, the item still
applies; discovering *where* it lands in your code is part of the task.

Items are sized so one bounded agent session can finish one: read the item,
find the seam in your build, make the change, verify it against the acceptance
check.

## Items

### 1. Credit the data (small)

The catalog's facts are real and deserve a visible credit. Add a small,
unobtrusive credit (a footer line, an about note — your call) saying the
catalog is a fixed educational seed set of real astronomical objects.

**Accept when:** the credit is reachable from every page that shows catalog
content, and no canonical fact from `spec.md` was changed to add it.

### 2. Surprise me (small)

Add a control that jumps to a random catalog object. It must never land on the
object already open, and it should work from anywhere the visitor might be.

**Accept when:** activating it repeatedly from an object's detail view always
navigates to a *different* object.

### 3. Category filter that survives a reload (medium)

The spec asks for browsing narrowed by category. Make the active filter part of
the URL, so a filtered view survives a reload and can be shared as a link.

**Accept when:** applying a category filter, copying the URL into a fresh tab,
and loading it shows the same filtered view.

### 4. Keyboard navigation (medium)

Let a keyboard visitor move through the catalog: previous/next between objects
from a detail view (arrow keys or `j`/`k`), and a key to return to the catalog
(`Escape` is conventional). Do not steal keys while a text input is focused.

**Accept when:** you can open an object, walk the whole catalog without
touching the mouse, and typing in the search field never triggers navigation.

### 5. A gentle rate limit (medium)

The reaction endpoint refuses a second reaction on the same object in the same
day (a `429`). Find out what your build's UI does when that happens — many
builds fail silently — and make it graceful: the visitor should learn they have
already reacted today, not wonder whether the button is broken.

**Accept when:** reacting twice to the same object shows a clear,
non-error-toned explanation the second time, and the displayed count stays
correct.

### 6. The concurrency audit (analysis — no edits)

Two defects tend to survive a single-pass build of this spec, both caught in
review exercises elsewhere in the tutorial arc: the reaction write can race
(two simultaneous clicks both passing a check-then-increment), and the "object
of the day" can roll over at a surprising local time. Audit **your** build:
does either defect exist in the code you actually shipped? Report what you
find and the one change you would make first. Do not edit anything — this item
is reconnaissance, and it pairs with item 5.

**Accept when:** you have a written verdict on both defects, each tied to a
named file or route in your build.

## Working an item

Any agent surface works. Some starting points, in ascending order of
delegation:

```sh
# chat: paste an item and work it interactively
keelson chat

# a workflow: capture the item as a repeatable run
keelson workflow run plan-act-evaluate --inputs ARGUMENTS="backlog.md item 3"
```

Or run the factory again: file the items you want as beads (`bd create`, with
`bd dep add` for any order between them), and start a swarm with the prompt in
`factory/PROMPT.md`. Item 6 is analysis, not code, so label it for a reviewer
rather than a writer.
