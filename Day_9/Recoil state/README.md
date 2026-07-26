# Recoil State

This folder covers Recoil as an atomic state model and explains where it fits in the learning roadmap.

## What to learn

- Atom and selector ideas
- How state units stay small and focused
- How Recoil compares with other global state tools

## Why it matters

Recoil is useful as a learning step for understanding atomic state design. Even if another library is preferred in a real project, the mental model helps you understand how state can be split into small reusable units.

## Good mental model

- Atoms hold small pieces of state
- Selectors derive values from atoms or other selectors
- Components subscribe only to the pieces they need

## Practice checklist

- Define one atom
- Read one derived value
- Compare Recoil with Jotai and Zustand