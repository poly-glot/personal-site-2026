---
id: signposting-integrations
title: "Signposting: integrations without owning state"
deck: Why Luma never holds tenant credentials, and why every integration is one redirect away.
teaser: State is a liability. Borrow it; do not warehouse it. The rest of the design follows from there.
date: "2025-11-04"
year: 2025
topics:
  - Architecture
  - Platform
readMin: 12
abstract: SIGN
tone: "linear-gradient(135deg, #f8a41d22, #02292011)"
---

Luma talks to dozens of tenant systems — DAMs, CMSes, billing, identity. Luma
owns zero of their credentials. Not one. This is not laziness. It is a
deliberate stance we call signposting, and it makes integrations a redirect away
instead of a security incident waiting to happen.

> State is a liability. Borrow it; do not warehouse it.

## The stance

Every credential we store is a credential we have to rotate, audit, encrypt, and
breach-respond when something goes wrong. Multiply that by 200 tenants, three
identity providers each, and a handful of system integrations, and the math gets
ugly fast. The signposting module never stores. It signs a redirect, hands the
user to the tenant's IdP, and walks away with a short-lived token scoped to one
operation.

## How it works in practice {#how-it-works}

- Every integration is a flow, not a credential record.
- Every token is short-lived (default: 5 minutes) and scoped to one operation.
- Every audit log shows who initiated, who consented, and what was returned —
  never the secret itself.

The flow is OAuth-shaped, but the discipline is what matters. The tenant's IdP
is the source of truth. We are guests in their identity system, for the duration
of one operation. Then we go.

## The hard cases {#hard-cases}

Two cases tested this stance hard. Background jobs — where there is no user to
consent — and tenant-initiated webhooks, which want to authenticate without a
redirect. Both were tempting reasons to introduce stored credentials. Both
turned out to be solvable without breaking the rule.

### Background jobs

For background jobs, we use a service principal scoped to the tenant — issued by
their IdP, rotated by them, never stored by us. The job authenticates using that
principal at run-time. If the principal is revoked, the job fails fast and
surfaces a clear error to the tenant admin. The tenant always has the kill
switch, by design.

### Webhooks

For inbound webhooks, we use signed payloads with a per-tenant secret stored in
the tenant's IdP, not ours. Verification happens at the edge by fetching the
public key. The secret never touches our database.

## The compliance side-effect {#compliance-side}

Three of our largest tenants asked, in different reviews, where we store their
API keys. The answer — "we don't" — has shortened more security questionnaires
than any feature we've shipped. SOC 2 reviews go faster. Pen-test scopes shrink.
We are no longer in the business of being a high-value target for credential
theft, because there is nothing to steal.

:::callout[Compliance side-effect]

The cheapest credential to protect is the one you never had.

:::

## What this cost us {#what-this-cost}

Signposting is not free. The first few integrations took longer to build because
we had to invent the flow rather than reach for a credential record. Some
integrations we wanted got delayed because the tenant's IdP didn't support the
right grant type, and we had to negotiate with their team. The diagram is more
complicated. The trade is that the diagram is also accurate, six years later,
with no patches and no known credential-loss incidents.

## Closing thought {#closing}

The cheapest credential to protect is the one you never had. The cheapest secret
to rotate is the one that lives somewhere else. Borrow, don't warehouse. The
rest of the design follows from there.
