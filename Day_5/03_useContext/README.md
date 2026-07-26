# 03_useContext

> **💡 How to Imagine This:**
> Think of `useContext` as a global loudspeaker in a building. Instead of passing a message room by room (prop drilling), the loudspeaker broadcasts the message directly to any room (component) that decides to tune in and listen.

## Overview
Shared data and prop-drilling avoidance hook.

## Pros & Cons

### Pros
- Avoids prop drilling.
- Great for global themes, user settings, or auth state.
- Easy to implement without external libraries.

### Cons
- Changes in context value cause all consumers to re-render.
- Can make components harder to reuse outside of the context provider.
