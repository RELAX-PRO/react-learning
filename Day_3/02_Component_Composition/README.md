# Component Composition (The `children` prop)

Sometimes, you want to build a "Wrapper" component. 
For example, a `<Card>` component that has a beautiful drop shadow and border radius, but doesn't know what content will be placed inside of it until it is actually used.

React handles this natively using a special prop called `children`. 
Whatever you nest *inside* the opening and closing tags of a component will automatically be passed into that component as the `children` prop!


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React from 'react';

/*
  BASIC PATTERN: The Children Prop
*/

// The Wrapper Component
// It extracts the special 'children' prop.
const Card = ({ children }) => {
  return (
    <div style={{ border: '1px solid gray', padding: '20px', borderRadius: '8px' }}>
      {/* It renders whatever was nested inside of it! */}
      {children}
    </div>
  );
};

// The Parent Component
const App = () => {
  return (
    <div>
      {/* We use opening and closing tags for the Card. 
          Everything inside gets passed as 'children' */}
      <Card>
        <h2>Title goes here</h2>
        <p>This paragraph is passed via the children prop!</p>
      </Card>

      <Card>
        <img src="logo.png" alt="Logo" />
      </Card>
    </div>
  );
};

export default App;

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.jsx

import React from 'react';

/*
  ADVANCED PATTERN: Layout Composition (Slots)
  
  Sometimes `children` isn't enough because you have multiple distinct areas 
  in your wrapper (e.g., a left sidebar and a main content area).
  You can pass entire React components as standard props!
*/

// The Layout Component accepts React elements as props
const TwoColumnLayout = ({ sidebarContent, mainContent }) => {
  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '250px', background: '#eee' }}>
        {sidebarContent}
      </aside>
      
      <main style={{ flex: 1, padding: '20px' }}>
        {mainContent}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <TwoColumnLayout 
      sidebarContent={<ul><li>Home</li><li>Settings</li></ul>}
      mainContent={<h1>Welcome to the main dashboard area!</h1>}
    />
  );
};

export default App;

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.jsx

import React from 'react';

/*
  ANTI-PATTERN: Deep Prop Drilling instead of Composition
  
  Junior developers often pass data down through 5 layers of components 
  just to reach the one component at the bottom that needs it.
*/

// The middle wrapper shouldn't need to know about 'avatarUrl' and 'userName'
// just to pass it down to the Avatar component.
const BadWrapper = ({ avatarUrl, userName }) => {
  return (
    <div className="wrapper">
      <BadAvatar url={avatarUrl} name={userName} />
    </div>
  );
};

const BadAvatar = ({ url, name }) => <img src={url} alt={name} />;

// THE FIX: Use composition! The wrapper doesn't need to know the data.
// It just accepts 'children'.
const GoodWrapper = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};

// Now the Parent handles the data directly!
// <GoodWrapper>
//   <BadAvatar url={data.url} name={data.name} />
// </GoodWrapper>

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

import React from 'react';

/*
  YOUR TURN!
  
  TODO:
  1. Create a wrapper component called `Modal`.
  2. Have it accept the `children` prop.
  3. Render a `<div>` with a class of "modal-overlay", containing an inner `<div>` with a class of "modal-content".
  4. Render the `children` inside the "modal-content" div.
*/

// Write your code below this line:
```

﻿# Prop Validation

> **💡 How to Imagine This:**
> Imagine a bouncer at a club checking IDs. Prop validation ensures that only the exact type of data you expect (like a number instead of a text string) gets let into your component.


Prop validation uses prop-types (or TypeScript) to ensure that components receive data of the correct type and format, preventing runtime bugs.

## Pros & Cons

**Pros:**
- Catches errors during development by warning about invalid prop types.
- Serves as a form of self-documenting code.
- Can specify complex shapes and required versus optional props.

**Cons:**
- Requires importing an external library (prop-types) in modern React, or moving entirely to TypeScript.
- Checks only run in development mode, not in production.


﻿# Component Lifecycle

> **💡 How to Imagine This:**
> Think of it like the life of a butterfly. It's born (mounts onto the screen), it grows and adapts to changes (updates), and eventually, it flutters away (unmounts from the screen).


A React component goes through three main phases during its lifetime: Mounting (birth), Updating (growth), and Unmounting (death). Understanding this lifecycle is critical for managing side effects, network requests, and DOM manipulations.

## Pros & Cons

**Pros:**
- Provides hooks into precise moments in a component's existence.
- Essential for cleaning up resources (like intervals or event listeners) to prevent memory leaks.

**Cons:**
- Historically required class components, leading to complex and spread-out logic (e.g., componentDidMount, componentDidUpdate, componentWillUnmount).
- In modern functional components, these concepts are unified under the useEffect hook, which requires a shift in mental model from lifecycle methods to synchronization.
