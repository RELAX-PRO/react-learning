# Jotai Atoms

> **💡 How to Imagine This:**
> Imagine a set of LEGO blocks. Each individual block is an "atom" of state. You can build larger structures (derived state) by simply snapping these small, independent pieces together.


This folder teaches atomic state in React.

## What to learn

- Atom-based state
- Reading and writing small state units

## Pros & Cons
**Pros:** Bottom-up atomic approach prevents unnecessary re-renders automatically, minimal boilerplate, great for highly dynamic interdependent state.
**Cons:** Can become hard to trace state flow if atoms are scattered everywhere, slightly different mental model from typical global stores.

## Practice checklist

- Create one atom
- Update one atom from a component
