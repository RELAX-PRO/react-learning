# Prop Drilling Avoidance

This folder explains why passing props through many layers becomes hard to maintain.

## What to learn

- Identifying prop drilling
- Replacing it with better state sharing

## Pros & Cons
**Pros:** Makes component architecture cleaner, reduces coupling between layers, components become more reusable.
**Cons:** Finding the right level to extract state can be tricky, overusing context or composition might overcomplicate simple component trees.

## Practice checklist

- Remove one unnecessary prop chain
