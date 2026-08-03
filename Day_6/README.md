# Standard CSS

> **💡 How to Imagine This:**
> Think of Standard CSS like shouting rules into a crowded room. Everyone (every component) can hear what you're saying. If you shout "Make all buttons red!", every button in the room turns red, whether you meant them to or not.

Standard CSS uses simple .css files imported into React components. It relies on global scope and standard CSS syntax.

## Pros & Cons

**Pros:**
- Simple to learn and use.
- No build step required natively.
- Easy to copy-paste snippets.

**Cons:**
- Global namespace can lead to class name collisions.
- Harder to maintain as the project scales.
- Lack of built-in dead code elimination.


# The useRef Hook

`useRef` is a hook that provides an "escape hatch" in React. It allows you to do two distinct things:

1. **Access DOM Elements:** Directly grab an HTML element (like an `<input>`) to call native methods on it, like `.focus()`.
2. **Mutable Persistent Variables:** Hold a variable that persists across re-renders, BUT **changing it does not trigger a re-render**. 

If you have a variable that changes rapidly (like a timer ID or a background calculation) and the UI doesn't need to know about it, use `useRef` instead of `useState` to prevent massive performance drops!


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React, { useRef } from 'react';

/*
  BASIC PATTERN: Accessing the DOM (Focusing an input)
*/

const FocusInput = () => {
  // 1. Create a reference object. It starts as { current: undefined }
  const inputRef = useRef(null);

  const handleFocus = () => {
    // 3. We access the actual DOM element via .current, and call the native focus() method!
    inputRef.current.focus();
  };

  return (
    <div>
      {/* 2. Attach the ref to the JSX element */}
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button onClick={handleFocus}>Focus the Input</button>
    </div>
  );
};

export default FocusInput;

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.jsx

import React, { useState, useRef } from 'react';

/*
  ADVANCED PATTERN: Mutable Instance Variables
  
  If we store the setInterval ID in state, it causes a useless re-render.
  If we store it in a normal 'let' variable, it gets erased on the next render.
  Solution: useRef!
*/

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  
  // A persistent box to hold our timer ID across renders without causing re-renders itself!
  const timerIdRef = useRef(null);

  const startTimer = () => {
    if (timerIdRef.current) return; // Prevent multiple clicks
    timerIdRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };

  const stopTimer = () => {
    clearInterval(timerIdRef.current);
    timerIdRef.current = null; // Clear the ref
  };

  return (
    <div>
      <h1>Seconds: {seconds}</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
};

export default Stopwatch;

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.jsx

import React, { useRef } from 'react';

/*
  ANTI-PATTERN: Using refs for UI State
  
  Because changing a ref does NOT trigger a re-render, you should never 
  use it to store data that the user needs to see on the screen.
*/

const BrokenCounter = () => {
  const countRef = useRef(0);

  const handleIncrement = () => {
    // We mutate the ref...
    countRef.current += 1;
    console.log("Ref is now:", countRef.current); // Logs: 1, 2, 3...
    
    // BUG: The screen will NEVER update! React does not watch refs for UI changes.
  };

  return (
    <div>
      {/* This will stay stuck at 0 on the screen forever. */}
      <h1>Count: {countRef.current}</h1>
      <button onClick={handleIncrement}>Increment (Broken)</button>
    </div>
  );
};

export default BrokenCounter;

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

import React from 'react';

/*
  YOUR TURN!
  
  TODO:
  1. Create a component with a `<video>` element. (Use any dummy URL for the src).
  2. Create a `useRef` and attach it to the video.
  3. Create two buttons: "Play" and "Pause".
  4. Use the ref to call `ref.current.play()` and `ref.current.pause()` when the buttons are clicked.
*/

// Write your code below this line:
```

# CSS Modules

> **💡 How to Imagine This:**
> Think of CSS Modules like writing a secret letter to a specific component. When you compile your code, it translates your class name into a unique, random secret code (like `.button_abc123`). This guarantees no other component can accidentally intercept or use your styles!

CSS Modules provide local scope by automatically generating unique class names. They are written in .module.css files.

## Pros & Cons

**Pros:**
- Prevents class name collisions by scoping styles locally.
- Easy integration with modern bundlers like Vite or Webpack.
- Familiar CSS syntax.

**Cons:**
- Syntax for importing and applying classes is slightly more verbose.
- Difficulty styling nested components conditionally without additional libraries.


# The useReducer Hook

As your components grow, `useState` can become messy. If you have an object with 5 different properties, and complex logic dictating how they update, your component file gets cluttered with business logic.

`useReducer` is an alternative to `useState`. It allows you to extract all the state-updating logic OUTSIDE of your component into a centralized "Reducer" function.

### How it works:
1. **State:** The current data.
2. **Action:** An object describing *what* happened (e.g., `{ type: 'INCREMENT' }`).
3. **Reducer:** A switchboard function that takes the current State and the Action, and returns the NEW State.
4. **Dispatch:** A function you call to send an Action to the Reducer.


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React, { useReducer } from 'react';

/*
  BASIC PATTERN: The Counter Reducer
*/

// 1. The Reducer Function (This sits OUTSIDE the component!)
// It takes the current state and the action, and returns the new state.
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const ReducerCounter = () => {
  // 2. Initialize the hook
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <h1>Count: {state.count}</h1>
      
      {/* 3. Dispatch Actions! */}
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
};

export default ReducerCounter;

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.jsx

import React, { useReducer } from 'react';

/*
  ADVANCED PATTERN: Form State with Payloads
  
  Actions can carry data! We call this the "payload".
  This is incredibly useful for managing massive forms.
*/

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      // The action carries the field name and the new value in its payload
      return { ...state, [action.payload.name]: action.payload.value };
    case 'RESET':
      return { username: "", email: "" };
    default:
      return state;
  }
};

const SignupForm = () => {
  const [state, dispatch] = useReducer(formReducer, { username: "", email: "" });

  const handleChange = (e) => {
    dispatch({ 
      type: 'UPDATE_FIELD', 
      payload: { name: e.target.name, value: e.target.value } 
    });
  };

  return (
    <form>
      <input name="username" value={state.username} onChange={handleChange} />
      <input name="email" value={state.email} onChange={handleChange} />
      <button type="button" onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </form>
  );
};

export default SignupForm;

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.jsx

import React from 'react';

/*
  ANTI-PATTERN: Mutating State in the Reducer
  
  Just like useState, state in a Reducer is IMMUTABLE. 
  You cannot modify the incoming state object directly. You MUST return a brand new object.
*/

const badReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      // BUG: Mutating the original state! React will not re-render because 
      // the memory address of the state object didn't change!
      state.count = state.count + 1; 
      return state; 
      
      // THE FIX:
      // return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

import React from 'react';

/*
  YOUR TURN!
  
  TODO:
  1. Write a reducer function called `toggleReducer` that handles a "TOGGLE" action.
  2. If the action is "TOGGLE", it should return `{ isOn: !state.isOn }`.
  3. Inside a component, use `useReducer` to initialize it with `{ isOn: false }`.
  4. Render a button that dispatches the "TOGGLE" action when clicked.
*/

// Write your code below this line:
```

# Custom Hooks

Eventually, you'll realize that you are writing the exact same `useEffect` and `useState` logic across multiple different components.

For example, fetching data from an API, tracking window size, or listening to keyboard presses.

React allows you to extract this logic into your own **Custom Hooks**. A custom hook is just a standard JavaScript function that:
1. Starts with the word `use` (e.g., `useFetch`, `useWindowSize`).
2. Calls *other* React hooks (like `useState` or `useEffect`) inside of it.


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import { useState, useEffect } from 'react';

/*
  BASIC PATTERN: The Custom useFetch Hook
*/

// This is our Custom Hook! Notice it starts with 'use'.
// We extracted all the messy fetching logic out of the component.
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, [url]);

  // We return the state so the component can use it!
  return { data, loading };
};

// --- In another file: App.jsx ---
// import { useFetch } from './useFetch';

const App = () => {
  // The component is now incredibly clean! We just call our custom hook.
  const { data, loading } = useFetch('https://jsonplaceholder.typicode.com/users/1');

  if (loading) return <p>Loading...</p>;
  return <h1>{data.name}</h1>;
};

export default App;

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

import React from 'react';

/*
  YOUR TURN!
  
  TODO:
  1. Create a custom hook called `useToggle` that initializes a boolean state.
  2. It should return an array containing the boolean, and a function to flip the boolean (true to false).
  3. Build a component that uses your custom hook!
*/

// Write your code below this line:
```

# SASS Integration

> **💡 How to Imagine This:**
> Imagine SASS like CSS with superpowers. Instead of writing the same color hex code 50 times, you can store it in a variable (like a speed-dial). And instead of repeating long selectors, you can nest them inside each other, like putting items into neat folders instead of throwing them all on your desktop.

SASS (Syntactically Awesome Style Sheets) is a CSS preprocessor that adds features like variables, nesting, and mixins.

## Pros & Cons

**Pros:**
- Advanced features like nesting, mixins, and inheritance.
- Better modularization through partials.
- Allows programmatic styling logic.

**Cons:**
- Requires compilation and build setup.
- Additional learning curve over standard CSS.
- Can lead to deeply nested, difficult-to-maintain selectors if misused.


# Tailwind CSS

> **💡 How to Imagine This:**
> Think of Tailwind CSS like building with Lego blocks instead of molding clay. Instead of writing custom CSS rules (clay), you use pre-made, single-purpose utility classes (Legos) right in your HTML. You snap together `bg-blue-500`, `text-white`, and `p-4` to build exactly what you need without leaving your component file!

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes directly in the markup.

## Pros & Cons

**Pros:**
- Extremely fast development once learned.
- Avoids custom CSS file bloat and limits naming issues.
- Enforces a consistent design system.

**Cons:**
- Markup can become cluttered and hard to read.
- Initial learning curve for class names.
- Requires build tools to purge unused CSS.


# Styled Components

> **💡 How to Imagine This:**
> Think of Styled Components like a self-heating jacket. Instead of keeping the heater (CSS) separate from the jacket (React Component), they are fused together. The jacket knows exactly how to warm itself up, and it can adjust its temperature instantly based on its current settings (props) without needing an external thermostat!

Styled Components use CSS-in-JS to create React components with styles encapsulated within them.

## Pros & Cons

**Pros:**
- Fully scoped styles to the component.
- Leverage JavaScript for dynamic styling based on props.
- Automatically handles vendor prefixing.

**Cons:**
- Larger bundle size and potential runtime overhead.
- Harder to read the structure when styles and logic are heavily mixed.
- Steeper learning curve for CSS-in-JS syntax.


# UI Component Libraries

UI Component Libraries (e.g., Material UI, Chakra UI, shadcn/ui) provide pre-built, accessible components to speed up development.

## Pros & Cons

**Pros:**
- Rapid development with pre-built components.
- Built-in accessibility and consistent design.
- Reduces time spent writing custom CSS.

**Cons:**
- Harder to override or customize deeply.
- Can bloat bundle size if not tree-shaken properly.
- Project looks generic unless heavily customized.


# CSS Variables

> **💡 How to Imagine This:**
> Think of CSS Variables like saving a contact in your phone. Instead of memorizing your friend's phone number and typing it every time (like a hardcoded color `#ff6347`), you save it as `var(--friend-number)`. If they get a new phone, you just update the contact once, and your phone automatically dials the new number everywhere!

CSS Variables (Custom Properties) allow defining reusable values for CSS styles, manageable dynamically in JavaScript and CSS.

## Pros & Cons

**Pros:**
- Native browser support without preprocessors.
- Can be updated dynamically via JavaScript or pseudo-classes (e.g., theming).
- Simplifies theme switching (e.g., dark/light mode).

**Cons:**
- Global scoping unless strictly managed at the component level.
- Not supported in legacy browsers (though rarely an issue today).


# Hybrid Styling Example

> **💡 How to Imagine This:**
> Think of Hybrid Styling (Tailwind + CSS Variables) like a smart home lighting system. Tailwind provides the quick switches on the wall (utility classes), while CSS Variables act as the central smart hub. When you tell the hub to switch to "Movie Mode" (theme change), all the lights instantly adapt without you having to rewire the house!

This folder contains a complete example combining Tailwind CSS with CSS Variables to achieve dynamic, performant theming.

## Pros & Cons

**Pros:**
- Combines the rapid development of Tailwind with the dynamic power of CSS Variables.
- No re-renders required for theme switching (handled by the browser).
- Clean and consistent design tokens.

**Cons:**
- Requires careful configuration (e.g., tailwind.config.js mapping).
- Overhead of managing both a utility framework and custom variables.


