# Architecture Conventions

## Smallest change first; no abstraction without migration

- DO: **State the minimal fix.** After naming a root cause, name the smallest
  change that makes the bug impossible, and justify any machinery beyond it
  against the current data scale rather than hypothetical load. A missing
  `delete()` is fixed by adding the `delete()`, not by a background worker plus
  a new index plus a migration.
- DO: **No abstraction without migration.** When you extract a shared primitive,
  the same change deletes every copy it replaces. A primitive adopted in one of
  seven call sites is dead weight stacked on the debt it was meant to remove.

## Keep data work where it belongs

- DO: **Assemble a page's data in one place.** When a view needs aggregated or
  hierarchical data, compute it in a single route handler or loader, not by
  fanning out N requests and merging client-side. Don't band-aid a data shape in
  the component layer because the source is awkward to query.
- DO: **Use true cursor or offset pagination.** Never sample N from each of the
  first M children to fake a page.
