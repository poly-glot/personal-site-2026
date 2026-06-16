---
name: review
description: Review the current branch's diff against the base for this Deno/Fresh repo. Runs the scoped gate, then delegates to the read-only code-reviewer agent (rules sweep + rewrite parity check + five-axis lens). Invoke with /review.
---

# Code Review orchestrator

`/review` is a **thin dispatcher**: do the cheap setup, then hand the expensive
read-everything work to the `code-reviewer` agent so the diff and rules sweep
don't flood this session. Don't do review work here.

## Step 1: Determine subject

- `git rev-parse --abbrev-ref HEAD` gives the current branch.
- The base is `git merge-base HEAD main`, falling back to `master`. If the
  working tree has uncommitted changes, note that the review covers committed
  branch work, and offer to include the working tree.

## Step 2: Run the gate first

Run the scoped checks so the reviewer isn't reviewing broken code:

- if any `.ts`/`.tsx`/`.js`/`.jsx`/`.css`/`.json` source changed in range:
  `deno task check`

Report failures up front; a red gate is itself a Request-changes.

## Step 3: Spawn the agent

```
Agent({ subagent_type: "code-reviewer", description: "<branch> review",
  prompt: "Review the current branch <branch> against <base> (read-only). Apply the .claude/rules sweep, the rewrite parity check, and the five-axis lens per your agent definition." })
```
