---
id: react-hook-budgets
title: "Hook budgets: a useThrottle story"
deck: What happens when 600 cards each open a websocket. (Nothing good. Then we fixed it.)
teaser: Treat hooks like budgets, not utilities. The 601st card is the one that takes you out.
date: "2025-09-18"
year: 2025
topics:
  - Performance
  - DevEx
  - Engineering Culture
readMin: 8
abstract: HOOK
tone: "linear-gradient(135deg, #f8a41d22, #01010108)"
---

600 cards on a single dashboard. Each card opens a websocket on mount to listen
for updates. The 601st card is the one that takes you out.

This is the story of how we accidentally built a fork bomb out of a useEffect,
and the small change that fixed it.

> Treat hooks like budgets, not utilities.

## The symptom

It started with a complaint from QA: the asset dashboard "feels heavy" on
tenants with large catalogues. "Heavy" turned out to be 30-second initial loads,
fan-fading network panels, and the occasional browser tab crash on Chrome. None
of which appeared on our smaller test tenants. It only showed up at the top of
the customer list.

## The diagnosis

Each card on the dashboard had a useEffect that opened a websocket connection on
mount, listened for updates to that asset, and closed on unmount. Clean.
Idiomatic. Wrong.

With 600 cards mounted at once, we were opening 600 websocket connections in the
first second of page load. The browser had a connection ceiling we were
tripping. The server was happy to accept. The browser was not happy to send.

:::callout[Lesson]

Before optimising a hook, ask if you should be calling it 600 times in the first
place.

:::

## The wrong fix

Our first instinct was to throttle. Stagger the connections. We wrote a
useThrottle hook that opened a fraction of the connections per frame. The page
loaded faster. Updates lagged. CPU usage was worse, because we were now also
burning cycles on a backoff scheduler. We had built a more efficient version of
the wrong thing.

> You can throttle a fork bomb. It's still a fork bomb.

## The right fix

The fix wasn't throttling. The fix was hoisting the subscription up to the
dashboard level and pushing updates down via context. One websocket, 600
listeners. The hook we ended up writing — useResource — is six lines of code;
the architectural shift behind it is what mattered.

```jsx
function useResource(id) {
  const subs = useContext(SubsCtx);
  const [v, setV] = useState(subs.get(id));
  useEffect(() => subs.subscribe(id, setV), [id]);
  return v;
}
```

Six lines. The dashboard now opens one websocket and routes updates through a
single subscription registry. CPU is low. Network panel is quiet. Tab crashes
are gone. The 601st card no longer matters because connecting is no longer
per-card.

## Hook budgets

It's tempting to think of hooks as primitives. They aren't. They are budgets —
every subscription, every interval, every effect costs something. When you're
rendering 600 of anything, those costs compound silently until the page falls
over.

Now we ask, in code review: "how many of these will exist on the page at peak?"
If the answer is more than 50, we don't put expensive setup inside the
per-instance hook. We hoist.

## What I tell juniors

- useEffect is not a place to do work. It's a place to subscribe to work being
  done elsewhere.
- If your hook opens a connection, ask who else might also open one.
- If you're staggering, you're already losing. Hoist instead.

## Closing thought {#closing}

Hooks make local reasoning cheap. They also make global cost invisible. The
601st card is always coming. Plan for it.
