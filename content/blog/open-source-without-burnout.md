---
id: open-source-without-burnout
title: Running OpenGuessr without burning out
deck: Notes from two years of maintainer life. The PRs you don't merge matter most.
teaser: Saying no with grace is the first skill. Saying no with a CONTRIBUTING.md that explains why is the second.
date: "2025-05-14"
year: 2025
topics:
  - Open Source
  - Process
  - Career
readMin: 11
abstract: MAP
tone: "linear-gradient(135deg, #f8a41d22, #f8a41d05)"
---

OpenGuessr has had two years of maintainer life. Roughly 1,200 issues, 600 PRs,
eleven contributors who stayed past their first patch. I'm still here. Most
maintainers I started with aren't.

This is what kept me going. None of it is clever. All of it is hard.

> The PRs you don't merge matter most.

## Saying no, with a CONTRIBUTING file {#saying-no}

Saying no with grace is the first skill. Saying no with a CONTRIBUTING.md that
explains why is the second. The document does the emotional labour you'd
otherwise repeat in twenty PR threads. Update it whenever you find yourself
typing the same paragraph for the third time.

Our CONTRIBUTING.md has grown to twelve sections. Each one was added the third
time I had the same conversation. Every section saves me a future conversation,
which means it saves me a future small resentment, which means it saves me from
quitting in eighteen months.

## Cadence over heroism {#cadence}

I work on OpenGuessr for two evenings a week. That's it. The cadence is sacred.
When I tried to "catch up" on a quiet weekend, I burned out within a month. Slow
and steady ships the same software in the same year.

The cadence is also what calibrates the community. When contributors see
consistent merging, consistent triage, consistent silence on certain days — they
adapt. Inconsistent maintainers create anxious communities.

## Triage rules I borrowed and never gave back {#triage-rules}

- Every issue gets an acknowledgement within seven days, or it gets closed with
  a "thanks, won't pursue" and a reason. Silence is rude.
- PRs without tests get a single comment asking for tests. If they don't come
  within two weeks, the PR is closed politely. The author can reopen.
- Architecture changes need a mini-ADR in the PR description, not just code.
  Even five lines of rationale is enough.

None of these are unique to me. All of them I learned by watching other
maintainers — Caolan, Sindre, the React team — and copying. Open source is a
craft you steal from people more disciplined than you.

## The hard conversations

Twice a year, someone has a public meltdown about a closed PR. It happens. The
temptation is to argue. The discipline is to point them at the CONTRIBUTING
file, restate the reason once, and stop. Most of the time the contributor
returns three weeks later, having calmed down, and writes something useful. A
small number do not. That is fine. The community is bigger than any one person,
including me.

:::callout[What I tell new maintainers] Pick the cadence you can sustain in your
worst week, not your best. The community calibrates to whatever you do, so pick
the rhythm you actually want. :::

## On sponsorship {#sponsorship}

GitHub Sponsors covers about a quarter of my coffee budget. It is meaningful,
not as income, but as social proof — it's the sentence "someone valued this
enough to send me $5" repeated forty times. On the bad weeks, that sentence is
the difference between continuing and quitting.

If you can sponsor a maintainer whose work you use, sponsor them. The amount
matters less than the fact of it.

## Closing thought {#closing}

You don't owe the open-source world a project. If you have one, you don't owe it
everything you have. Pick the cadence you can keep. Write the docs that save you
arguments. Sponsor the maintainers you depend on. And when you say no, mean it
kindly — but mean it.
