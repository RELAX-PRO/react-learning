# Functional Updates

> **💡 How to Imagine This:**
> Imagine a relay race. Instead of trying to guess where the previous runner was and running from there, you grab the baton directly from them exactly where they left off. A functional update ensures you're always working with the most up-to-date state (the baton), rather than stale information.

Explanation of using functional state updates (setCount(prev => prev + 1)).

## Pros & Cons
**Pros:** Ensures state updates rely on the most current state value, avoiding closure bugs.
**Cons:** Slightly more verbose than passing a direct value.
