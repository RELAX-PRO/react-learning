# Global States

This day explains how to share state across a React app without passing props through every layer.

## Learning order

1. Context API
2. Prop drilling avoidance
3. Redux Toolkit
4. Zustand store
5. Jotai atoms
6. Recoil states
7. Global data persistence

## What to learn here

- When props become too noisy
- When context is enough
- When a dedicated store is better than local component state
- How to choose between Redux, Zustand, Jotai, and Recoil
- How to persist global state safely

## Why it matters

Global state is one of the biggest architecture decisions in a React app. Picking the wrong tool too early can make a project harder to maintain than the problem itself.

## Practice checklist

- Remove one level of prop drilling
- Move one shared value into context
- Compare one store-based approach with one context-based approach