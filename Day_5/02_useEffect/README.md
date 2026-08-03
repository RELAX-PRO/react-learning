# The useEffect Hook

If `useState` is the brain of a component (remembering data), `useEffect` is the nervous system (interacting with the outside world).

A React component's primary job is to take Props/State and return JSX. This is called a **Pure Render**. It should not affect anything else.

But what if you need to:
- Fetch data from a database?
- Start a timer or interval?
- Directly manipulate a DOM element (like focusing an input)?
- Subscribe to a WebSocket?

These are called **Side Effects**. They must be placed inside the `useEffect` hook.

### How it works:
```jsx
useEffect(() => {
  // Your side effect code goes here...
}, [dependencyArray]);
```
The code inside `useEffect` runs *after* React has updated the DOM. It does not block the browser from painting the screen!


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React, { useState, useEffect } from 'react';

/*
  BASIC PATTERN: Running a Side Effect
*/

const DocumentTitleUpdater = () => {
  const [count, setCount] = useState(0);

  // This effect runs after the component renders.
  useEffect(() => {
    // We are reaching outside of React to modify the actual browser tab title.
    // This is a classic "Side Effect".
    document.title = `You clicked ${count} times`;
  }); 
  // Notice there is NO dependency array here! 
  // This means this effect runs after EVERY SINGLE render.

  return (
    <div>
      <p>Look at the browser tab title!</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};

export default DocumentTitleUpdater;

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.jsx

import React, { useState, useEffect } from 'react';

/*
  ADVANCED PATTERN: Syncing LocalStorage
  
  A very common use case for useEffect is syncing React State with the browser's LocalStorage, 
  so data persists even if the user refreshes the page!
*/

const PersistentTheme = () => {
  // 1. Initialize state by reading from LocalStorage (if it exists)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'light';
  });

  // 2. The Effect: Whenever the 'theme' state changes, save it back to LocalStorage!
  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    console.log(`Theme saved to LocalStorage: ${theme}`);
  }, [theme]); // This array ensures the effect ONLY runs when 'theme' changes.

  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#FFF', color: theme === 'dark' ? '#FFF' : '#333', height: '100vh', padding: '20px' }}>
      <h1>Current Theme: {theme}</h1>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
};

export default PersistentTheme;

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.jsx

import React, { useState, useEffect } from 'react';

/*
  ANTI-PATTERN: Side Effects in the Render Phase
  
  You must NEVER perform side effects directly in the main body of the component.
*/

const BrokenComponent = () => {
  const [count, setCount] = useState(0);

  // BUG: Fetching data or setting timeouts directly in the render phase!
  // Every time 'count' changes, this component re-renders. 
  // If we fetch here, we will DOS attack our own server with infinite requests!
  
  // fetch('https://api.example.com/data').then(...) // CRITICAL ERROR!
  
  // setTimeout(() => console.log("Tick"), 1000); // CRITICAL ERROR! (Creates infinite timers)

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
};

export default BrokenComponent;

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

import React, { useEffect } from 'react';

/*
  YOUR TURN!
  
  TODO:
  1. Create a component called `WelcomeLogger`.
  2. Write a `useEffect` hook inside it.
  3. The effect should simply `console.log("Component has rendered!")`.
  4. Ensure you do NOT provide a dependency array, so it logs on every render.
*/

// Write your code below this line:
```
