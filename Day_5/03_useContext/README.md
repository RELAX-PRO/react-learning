# 03_useContext

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
