# Context API

> **💡 How to Imagine This:**
> Imagine a school intercom system. Instead of the principal walking to every single classroom to pass a message, they speak into the intercom, and any classroom that needs to hear it can listen in.


This folder teaches the built-in React API for sharing data without prop drilling.

## What to learn

- Creating context
- Providing context values
- Consuming context in deep children

## Pros & Cons
**Pros:** Built-in to React (no external dependencies), simple to set up for small amounts of rarely changing data (e.g., themes, user auth).
**Cons:** Can cause unnecessary re-renders if the context value changes frequently, can lead to deeply nested Provider hell.

## Practice checklist

- Create one provider
- Read one value from context
