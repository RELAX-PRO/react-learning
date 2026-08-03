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


# JWT Authentication

Authentication in modern React applications (SPAs) is vastly different from traditional websites. Because React doesn't load a new HTML page on every click, it can't rely on traditional server-side cookies as easily.

Instead, the industry standard is **JSON Web Tokens (JWT)**.

### The JWT Flow:
1. **Login:** The user submits their email/password via a React form.
2. **Verification:** React sends this to the server (via Axios).
3. **The Token:** The server verifies the password, and sends back a cryptographic string called a JWT.
4. **Storage:** React saves this token (usually in `localStorage`).
5. **Future Requests:** Every time React asks the server for private data, it attaches the JWT in the HTTP Headers. The server sees the token and allows access!


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React, { useState } from 'react';

/*
  BASIC PATTERN: Storing the Token
*/

const Login = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = () => {
    // 1. We pretend we sent credentials to the server and got this token back:
    const fakeServerToken = "eyJhGciOiJIUzI1Ni...fake.jwt.string";
    
    // 2. We save it in LocalStorage so it persists across page refreshes!
    localStorage.setItem('token', fakeServerToken);
    
    // 3. We update React State so the UI immediately reacts
    setToken(fakeServerToken);
  };

  const handleLogout = () => {
    // To logout, you simply destroy the token!
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div>
      {token ? (
        <h2>Welcome back! <button onClick={handleLogout}>Logout</button></h2>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default Login;

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

/*
  YOUR TURN!
  
  TODO:
  1. Create a function called `checkAuth`.
  2. Have it read the 'token' from `localStorage`.
  3. If the token exists, return true. Otherwise, return false.
*/
```

# Prop Drilling Avoidance

> **💡 How to Imagine This:**
> Think of prop drilling like passing a bucket of water down a long line of people to put out a fire. Avoiding prop drilling is like installing a hose—you bypass the middlemen and deliver what you need exactly where it is needed.


This folder explains why passing props through many layers becomes hard to maintain.

## What to learn

- Identifying prop drilling
- Replacing it with better state sharing

## Pros & Cons
**Pros:** Makes component architecture cleaner, reduces coupling between layers, components become more reusable.
**Cons:** Finding the right level to extract state can be tricky, overusing context or composition might overcomplicate simple component trees.

## Practice checklist

- Remove one unnecessary prop chain


# Redux Toolkit

> **💡 How to Imagine This:**
> Think of Redux like a strict bank. You can't just reach into the vault and grab money. You have to fill out a deposit/withdrawal slip (action) and hand it to the teller (reducer), who follows strict rules to update your account balance (state) safely.


This folder introduces the modern Redux approach for global state management.

## What to learn

- Store structure
- Actions and reducers
- Slices and async patterns

## Pros & Cons
**Pros:** Excellent dev tools, highly scalable for large applications, robust ecosystem and community, predictable state updates.
**Cons:** Boilerplate compared to simpler solutions, steep learning curve, can be overkill for small apps.

## Practice checklist

- Create one slice
- Dispatch one action


# Zustand Store

> **💡 How to Imagine This:**
> Think of Zustand like a modern vending machine. No paperwork or bank tellers needed—you just press a button and instantly get exactly the snack (state) you want from the store.


This folder shows a lightweight store pattern for shared app state.

## What to learn

- Creating a store
- Reading and updating state from components

## Pros & Cons
**Pros:** Very lightweight and fast, minimal boilerplate, doesn't require Context Providers, works well outside React components.
**Cons:** Dev tools aren't as feature-rich as Redux, less strict structure might lead to messy state management in very large teams without conventions.

## Practice checklist

- Build one shared store value


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


# Recoil State

> **💡 How to Imagine This:**
> Think of Recoil like a smart spreadsheet. When you change the value in one cell (atom), any other cells with formulas that rely on it (selectors) automatically recalculate and update in real time.


This folder covers Recoil as an atomic state model and explains where it fits in the learning roadmap.

## What to learn

- Atom and selector ideas
- How state units stay small and focused
- How Recoil compares with other global state tools

## Pros & Cons
**Pros:** Built specifically for React, fine-grained re-renders, elegant handling of derived state and asynchronous data flow.
**Cons:** API has been experimental for a long time, larger bundle size than Jotai, slower adoption rate recently.

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


# Global Data Persistence

> **💡 How to Imagine This:**
> Think of this like saving your progress in a video game. If you turn off the console without saving, you lose everything. Persistence ensures your items and level are right where you left them when you return.


This folder explains how app state survives refreshes and browser restarts.

## What to learn

- Which data belongs in persistence
- When local persistence is enough
- The tradeoff between convenience and storage scope

## Pros & Cons
**Pros:** Improves user experience by saving preferences and state across sessions, can act as a local cache to reduce network requests.
**Cons:** Storage limits depend on the browser, data can become out of sync with the server, security risks if storing sensitive information locally.

## Practice checklist

- Persist one small setting
- Restore it after refresh


