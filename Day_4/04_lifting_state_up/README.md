# Lifting State Up

React has strict rules about data flow: **Data only flows downwards via Props.**

If Component A and Component B are siblings, they cannot directly talk to each other.
If Component A has a piece of state, Component B cannot read it.

### The Solution: Lift the State
If two sibling components need to share the exact same state, you must remove the state from the siblings, and "lift it up" into their closest common Parent component.

1. The Parent holds the state.
2. The Parent passes the *state value* down to Component B as a prop.
3. The Parent passes the *state setter function* down to Component A as a prop.

Now, when Component A clicks a button, it calls the Parent's setter function, updating the Parent's state, which flows down to Component B!


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React, { useState } from 'react';

/*
  BASIC PATTERN: Lifting State to the Parent
*/

// Sibling 1: Needs to trigger the update
const Controls = ({ onToggle }) => {
  return (
    <button onClick={onToggle}>Toggle Dark Mode</button>
  );
};

// Sibling 2: Needs to read the state
const Display = ({ isDark }) => {
  return (
    <div style={{ background: isDark ? 'black' : 'white', color: isDark ? 'white' : 'black' }}>
      <h1>{isDark ? "Dark Mode Active" : "Light Mode Active"}</h1>
    </div>
  );
};

// The Parent: Holds the state and distributes it via Props
const AppLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // We pass the setter logic to Controls, and the data to Display!
  return (
    <div>
      <Controls onToggle={() => setIsDarkMode(!isDarkMode)} />
      <Display isDark={isDarkMode} />
    </div>
  );
};

export default AppLayout;

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.jsx

import React, { useState } from 'react';

/*
  ADVANCED PATTERN: Sharing Complex Objects
  
  When lifting state, you are often lifting objects. 
  When a child component updates one property of the object, it must spread 
  the rest of the object to prevent deleting data!
*/

const FormInput = ({ label, value, onChange }) => (
  <div>
    <label>{label}</label>
    <input value={value} onChange={onChange} />
  </div>
);

const UserProfileBuilder = () => {
  // Parent holds a complex object in state
  const [user, setUser] = useState({ name: "", email: "" });

  // A generic handler that the parent provides to the children
  const handleUpdate = (field, newValue) => {
    // We spread the previous state, and overwrite only the specific field!
    setUser(prev => ({ ...prev, [field]: newValue }));
  };

  return (
    <div>
      <h2>Build Profile</h2>
      {/* Sibling 1 updates the name */}
      <FormInput 
        label="Name" 
        value={user.name} 
        onChange={(e) => handleUpdate("name", e.target.value)} 
      />
      {/* Sibling 2 updates the email */}
      <FormInput 
        label="Email" 
        value={user.email} 
        onChange={(e) => handleUpdate("email", e.target.value)} 
      />
      
      <hr />
      {/* Sibling 3 displays the result */}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default UserProfileBuilder;

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.jsx

import React from 'react';

/*
  ANTI-PATTERN: Prop Drilling for Global Data
  
  "Lifting state up" works great for adjacent siblings. 
  But if you lift state to the very top of your app (App.js) just so a component 
  10 levels deep can access it, you create "Prop Drilling".
  
  Prop drilling is passing props through dozens of intermediary components that 
  don't care about the data, just to get it to the bottom.
*/

// A component deeply nested in the tree needs 'theme'
const DeepChild = ({ theme }) => <p>Theme is {theme}</p>;

// These intermediary components don't care about theme, they just pass it along like a bucket brigade.
// This is an ANTI-PATTERN! (The solution is Context API or Redux, covered in Day 7/11).
const MiddleChild = ({ theme }) => <DeepChild theme={theme} />;
const TopChild = ({ theme }) => <MiddleChild theme={theme} />;

const App = () => {
  const [theme] = React.useState("dark");
  return <TopChild theme={theme} />;
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
  1. Create a `Parent` component with a `score` state (default 0).
  2. Create a `ScoreDisplay` component that takes `score` as a prop and renders it.
  3. Create a `ScoreButton` component that takes an `onIncrease` prop (a function) and renders a button that calls it.
  4. Render both children inside the `Parent`, wiring the props up correctly so clicking the button increases the parent's state!
*/

// Write your code below this line:
```
