# Uncontrolled Components

> **💡 How to Imagine This:**
> Imagine a self-driving car. You don't control the steering wheel at every second. Instead, the car drives itself (internal state), and you just ask it for its current location when you need it (using a Ref).

Uncontrolled components manage their own internal state, similar to traditional HTML form inputs. React accesses their values primarily through Refs rather than state.

## Pros & Cons

**Pros:**
- Less boilerplate code, as onChange handlers and state are not strictly required.
- Easier to integrate with non-React libraries or legacy code.
- Better performance on massive forms since typing doesn't trigger component re-renders.

**Cons:**
- More difficult to implement real-time validation or conditional UI changes based on input.
- Values are pulled on demand (e.g., on submit) rather than being constantly synchronized with React state.
