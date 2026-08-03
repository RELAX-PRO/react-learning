# Functional Components

Welcome to React! 

In the early days of React, developers had to write complex JavaScript `class` structures to create UI elements. Today, we write **Functional Components**.

### What is a Functional Component?
It is simply a standard JavaScript function that returns JSX (HTML-like syntax). That's it!

### The Golden Rules of Components:
1. **Capitalization:** The function name MUST start with a capital letter (e.g., `function Button()`). If you use a lowercase letter (e.g., `function button()`), React will assume you are trying to render a native HTML `<button>` tag and will crash if it doesn't recognize it.
2. **One Root Element:** A component can only return ONE parent element. You cannot return two sibling `<div>` tags unless you wrap them in a parent `<div>` or a Fragment (`<></>`).


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React from 'react';

/*
  BASIC PATTERN: The Functional Component
  
  Notice that it is just a standard JavaScript arrow function.
  It must start with a Capital letter (WelcomeMessage).
*/

const WelcomeMessage = () => {
  // We return JSX. Under the hood, Babel compiles this HTML-like syntax 
  // into JavaScript React.createElement() calls!
  return (
    <div className="welcome-container">
      <h1>Welcome to React!</h1>
      <p>This is your first functional component.</p>
    </div>
  );
};

export default WelcomeMessage;

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.jsx

import React from 'react';

/*
  ADVANCED PATTERN: Composition (Components inside Components)
  
  The true power of React is breaking a massive UI down into microscopic, 
  reusable Lego blocks, and then composing them together.
*/

// A tiny, reusable block
const ProfileAvatar = () => {
  return <img src="avatar.jpg" alt="User Avatar" className="avatar-img" />;
};

// Another tiny, reusable block
const ProfileBio = () => {
  return <p>Senior React Developer</p>;
};

// The Parent Component composing the children together!
const UserProfileCard = () => {
  return (
    <div className="card">
      {/* We render other components just like HTML tags! */}
      <ProfileAvatar />
      <h2>Alice Smith</h2>
      <ProfileBio />
    </div>
  );
};

export default UserProfileCard;

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.jsx

import React from 'react';

/*
  ANTI-PATTERN: Returning Multiple Siblings
  
  A function in JavaScript can only return ONE thing.
  Therefore, a React component can only return ONE root JSX element.
*/

const BrokenComponent = () => {
  // BUG: This will cause a massive SyntaxError!
  // Adjacent JSX elements must be wrapped in an enclosing tag.
  /*
  return (
    <h1>Title</h1>
    <p>Subtitle</p>
  );
  */
};

// THE FIX: Use a React Fragment (<> ... </>) to wrap them without 
// adding an unnecessary <div> to the actual DOM.
const FixedComponent = () => {
  return (
    <>
      <h1>Title</h1>
      <p>Subtitle</p>
    </>
  );
};

export default FixedComponent;

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

import React from 'react';

/*
  YOUR TURN!
  
  TODO:
  1. Create a functional component called `SiteHeader`.
  2. Have it return a `<header>` tag containing an `<h1>` that says "My Cool App".
  3. Ensure the component is properly exported as the default export.
*/

// Write your code below this line:
```

﻿# Component Composition

> **💡 How to Imagine This:**
> Think of it like playing with LEGO blocks. You can build small, simple pieces (like a window, a door, a wheel) and snap them together to create something bigger and much more complex, like a house or a car.


Component composition is a pattern in React where components are built from smaller, modular pieces. This can be achieved through the children prop or by passing React elements into named props.

## Pros & Cons

**Pros:**
- Promotes high reusability of UI components.
- Avoids the problem of "prop drilling" by nesting components directly where they are used.
- Helps create clear and generic UI layout components.

**Cons:**
- Can result in a deeply nested component tree that may be harder to read.
- Sometimes requires understanding when to use children versus named slots.
