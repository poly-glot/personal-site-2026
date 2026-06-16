---
id: platform-team-outcomes
title: A platform team's outcomes are its consumers' outcomes
deck: You don't get credit for shipping internal tools. You get credit for what your tenants ship.
teaser: This is the most important sentence in our team handbook. The second-most is also about consumers.
date: "2026-01-22"
year: 2026
topics:
  - Engineering Culture
  - Platform
readMin: 9
abstract: GRID
tone: "linear-gradient(135deg, #f8a41d22, #65656520)"
---

The most important sentence in our team handbook fits on one line: a platform
team's outcomes are its consumers' outcomes.

This is not a slogan. It is the rule we use to decide what to build, what to
ignore, and how to celebrate.

> You don't get credit for shipping internal tools. You get credit for what your
> tenants ship.

## The trap

Platform teams are easy to grade by their internal artefacts: services shipped,
libraries published, dashboards built. None of those are outcomes. They are
receipts. The outcomes belong to the tenants — the product teams whose features
ship faster, or don't, because of the platform.

The trap is seductive because the receipts are easy to count. "We shipped six
new APIs this quarter" sounds like progress. It also tells you nothing about
whether anything got better for anyone outside the platform team.

## What we measure instead {#what-we-measure}

We picked three metrics, all of them about the experience of being a tenant:

- Time from a tenant filing a request to that request being live for their
  users.
- Number of tenants who shipped at least one feature this quarter without our
  help.
- Number of tenants who escalated a platform issue and got a same-day fix.

None of those describe a platform artefact. They describe what it feels like to
be the next team over. That is the experience the platform exists to improve.

## Office hours, on purpose {#office-hours}

We hold weekly office hours where any tenant can drop in and complain. The bar
to attend is intentionally low. The result is a steady stream of small
grievances — a config that's confusing, a doc page that's stale, an error
message that doesn't say what to do next — that we wouldn't otherwise hear
about.

The platform team's worst failure mode is a feedback loop that only reports
successes. Office hours are how we keep the loop honest.

## Saying no, in a way that helps {#saying-no}

Tenants ask for things. Some of them are platform-shaped. Some of them are
bespoke favours dressed up in platform language. Saying no is part of the job.
Saying no badly is how a platform team becomes the bottleneck everyone hates.

Our rule: when we say no, we say no with a reason and an alternative. "We won't
build a custom CSV exporter for your tenant, but here's the export API and a
20-line example that does what you asked, and we'll review the PR." The no is
the same. The relationship is different.

## Celebrate the tenants, not yourselves {#celebrate-tenants}

In all-hands updates, we lead with what the tenants shipped, not what we
shipped. "Team A launched their feature in three days because we removed the
auth onboarding step." That sentence has a subject (Team A), a verb (launched),
and a co-conspirator (us). It is the platform team's most flattering possible
sentence.

:::callout[A test]

At your next planning session, list every initiative. Strike out anything whose
only success metric is internal. What remains is the work that actually matters.

:::

## Closing thought {#closing}

You can run a platform team like a vendor — shipping artefacts, billing time,
treating tenants as customers to be managed. You can also run it like a
colleague who happens to specialise in shared problems. The second one produces
better software and quieter weekends. We have tried both. The second one wins.
