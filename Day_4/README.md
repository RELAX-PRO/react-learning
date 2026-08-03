# Event Handling

> **💡 How to Imagine This:**
> Think of event handling like the buttons on a microwave. The buttons just sit there waiting. When you press one (the event), it sends a signal to the microwave's brain (the event handler function) to start cooking or set a timer.

Explanation of how event handlers capture user interactions in React.

## Pros & Cons
**Pros:** Declarative and tied directly to the component structure. Easy to read.
**Cons:** Can bloat the component if handlers are large.


# The useState Hook

Variables declared with `let` or `const` inside a component are forgotten the moment the component finishes rendering. Furthermore, if you change their values, React does not care. It will NOT update the screen to show the new value.

If you want a component to "remember" data between renders, AND you want React to automatically update the UI when that data changes, you must use **React State**.

### How useState works:
```jsx
const [currentValue, setterFunction] = useState(initialValue);
```
1. **initialValue:** The value the state starts with on the very first render.
2. **currentValue:** The variable holding the current state data.
3. **setterFunction:** The ONLY way you are allowed to change the state. When you call this function, React updates the `currentValue` and automatically triggers a re-render of the component!


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React, { useState } from 'react';

/*
  BASIC PATTERN: Counter Example
  This is the "Hello World" of React State.
*/

const Counter = () => {
  // We use array destructuring to grab the count and the function that updates it.
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Current Count: {count}</h1>
      
      {/* We pass an arrow function to the onClick event. 
          When clicked, we call setCount with the new value. */}
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
};

export default Counter;

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.jsx

import React, { useState } from 'react';

/*
  ADVANCED PATTERN: Functional State Updates
  
  State updates in React are asynchronous! If you try to update the state 
  multiple times rapidly in a single function using the current variable (e.g. count + 1), 
  React will batch them together and you'll get bugs.
  
  To fix this, pass a callback function to the setter instead of a raw value!
*/

const SafeCounter = () => {
  const [count, setCount] = useState(0);

  const handleTripleIncrement = () => {
    // WRONG: React batches these. The count will only go up by 1!
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);

    // RIGHT: Pass a function. React guarantees 'prevCount' is the absolute latest state!
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleTripleIncrement}>Add 3 Safely</button>
    </div>
  );
};

export default SafeCounter;

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.jsx

import React, { useState } from 'react';

/*
  ANTI-PATTERN: Direct State Mutation
  
  You are absolutely forbidden from modifying the state variable directly.
  React only knows the state changed if you use the Setter Function!
*/

const BrokenCounter = () => {
  let [count, setCount] = useState(0); // Using let instead of const is the first warning sign.

  const handleBadClick = () => {
    // BUG: This modifies the variable in memory, but React has NO IDEA it happened!
    // The screen will NOT update!
    count = count + 1; 
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleBadClick}>Break the App</button>
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
  1. Import `useState` from React.
  2. Create a component called `ToggleSwitch`.
  3. Initialize a state variable `isOn` to `false`.
  4. Render a button. When the button is clicked, toggle the state (if true, make false. If false, make true).
  5. The button text should read "Turn Off" when `isOn` is true, and "Turn On" when false.
*/

// Write your code below this line:
```

# Functional Updates

> **💡 How to Imagine This:**
> Imagine a relay race. Instead of trying to guess where the previous runner was and running from there, you grab the baton directly from them exactly where they left off. A functional update ensures you're always working with the most up-to-date state (the baton), rather than stale information.

Explanation of using functional state updates (setCount(prev => prev + 1)).

## Pros & Cons
**Pros:** Ensures state updates rely on the most current state value, avoiding closure bugs.
**Cons:** Slightly more verbose than passing a direct value.


# Handling Events

In standard HTML, event names are entirely lowercase (e.g., `<button onclick="handleClick()">`). 
In React JSX, events use **camelCase** (e.g., `<button onClick={handleClick}>`).

Furthermore, in HTML you pass a *string* containing JavaScript code. In React, you must pass an actual JavaScript *function reference* inside curly braces.

### The Event Object (`e`)
Just like vanilla JavaScript, React event handlers receive a Synthetic Event object. This object contains data about the event, such as the value typed into an input (`e.target.value`), or methods to stop the browser's default behavior (`e.preventDefault()`).


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React from 'react';

/*
  BASIC PATTERN: Passing Function References
*/

const ClickTracker = () => {
  
  // We define the handler function inside the component.
  // The browser automatically passes the Event object ('e') as the first argument.
  const handleButtonClick = (e) => {
    console.log("Button clicked!");
    console.log("Event type:", e.type); // "click"
  };

  return (
    <div>
      {/* 
        We pass the function REFERENCE to onClick.
        Notice there are NO parentheses () after handleButtonClick! 
        If you put (), the function runs immediately when the page loads!
      */}
      <button onClick={handleButtonClick}>
        Click Me
      </button>
    </div>
  );
};

export default ClickTracker;

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.jsx

import React from 'react';

/*
  ADVANCED PATTERN: Passing Arguments to Event Handlers
  
  Because you cannot use parentheses () in the onClick attribute (it would execute instantly), 
  how do you pass an argument to your handler function?
  
  You must wrap the call in an inline Arrow Function!
*/

const ItemList = () => {
  const handleDelete = (itemId) => {
    console.log("Deleting item with ID:", itemId);
    // Logic to delete the item would go here...
  };

  return (
    <ul>
      <li>
        Item 1 
        {/* 
          Instead of onClick={handleDelete(1)} (which executes instantly), 
          we give React an anonymous arrow function to call LATER. 
        */}
        <button onClick={() => handleDelete(1)}>Delete</button>
      </li>
      <li>
        Item 2 
        <button onClick={() => handleDelete(2)}>Delete</button>
      </li>
    </ul>
  );
};

export default ItemList;

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.jsx

import React from 'react';

/*
  ANTI-PATTERN: The Infinite Render Loop
  
  This is the most common error for beginners. Calling a function that updates 
  state directly inside the render phase.
*/

const InfiniteLoopCracher = () => {
  const [clicks, setClicks] = React.useState(0);

  const increment = () => setClicks(clicks + 1);

  // BUG: Because increment has parentheses (), it executes IMMEDIATELY when React renders the button.
  // The increment function calls setClicks().
  // setClicks() tells React to re-render the component.
  // The component re-renders, hits the button, executes increment() again...
  // Result: Maximum update depth exceeded error! (Infinite Loop)
  
  return (
    // <button onClick={increment()}>Crash Browser</button>
    <p>Code commented out for safety!</p>
  );
};

export default InfiniteLoopCracher;

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

import React from 'react';

/*
  YOUR TURN!
  
  TODO:
  1. Create a component called `HoverBox`.
  2. Create a state variable `isHovered` (default false).
  3. Render a `<div>` that has a `onMouseEnter` event and an `onMouseLeave` event.
  4. When the mouse enters, set state to true. When it leaves, set state to false.
  5. Change the background color of the div based on the state!
*/

// Write your code below this line:
```

# Immutability Patterns

> **💡 How to Imagine This:**
> Imagine a photographer documenting a building's construction. Instead of painting over the same physical photograph every time a brick is laid (mutation), they take a completely new picture each time. React relies on comparing these distinct "snapshots" to know exactly what changed.

Explanation of avoiding direct mutations to state objects and arrays.

## Pros & Cons
**Pros:** Predictable state, prevents elusive bugs, ensures React detects changes and re-renders correctly.
**Cons:** Can be tedious for deeply nested objects without helper libraries.


# State vs Regular Variables

A massive conceptual hurdle for React developers is knowing when to use `useState` versus when to just declare a normal `let` or `const` variable.

### Use a regular variable (`const` or `let`) when:
- The data is calculated from existing State or Props (Derived State).
- The data does NOT need to trigger a UI change when it updates.

### Use `useState` when:
- The data changes over time (like user input).
- **AND** the UI needs to instantly re-render to reflect that change.

If you put data into State that could have just been derived from a normal variable, you create bugs where the state goes "out of sync".


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React, { useState } from 'react';

/*
  BASIC PATTERN: Derived Data (Don't put this in state!)
*/

const Checkout = () => {
  // This IS state, because the user is actively typing and changing it.
  const [itemPrice, setItemPrice] = useState(10);
  const [quantity, setQuantity] = useState(2);

  // This is a REGULAR VARIABLE.
  // We do NOT need a state for 'total'. Every time itemPrice or quantity changes, 
  // React re-renders the component, recalculating the total automatically!
  const total = itemPrice * quantity;

  return (
    <div>
      <p>Price: ${itemPrice}</p>
      <p>Qty: {quantity}</p>
      <hr />
      <h3>Total: ${total}</h3>
    </div>
  );
};

export default Checkout;

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.jsx

import React, { useState } from 'react';

/*
  ADVANCED PATTERN: Filtering Lists
  
  A classic mistake is storing a "filtered" version of an array in state.
  Instead, keep the raw array in state, keep the search query in state, 
  and DERIVE the filtered list using a normal variable!
*/

const SearchableList = () => {
  // Raw Data State
  const [users] = useState(["Alice", "Bob", "Charlie", "David"]);
  
  // Search Input State
  const [query, setQuery] = useState("");

  // DERIVED DATA: We dynamically calculate this on every render!
  // If query is empty, it returns everyone. If query has text, it filters.
  const filteredUsers = users.filter(user => 
    user.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <ul>
        {filteredUsers.map(user => <li key={user}>{user}</li>)}
      </ul>
    </div>
  );
};

export default SearchableList;

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.jsx

import React, { useState } from 'react';

/*
  ANTI-PATTERN: Redundant State (Desync Bugs)
  
  Putting derived data into its own State is dangerous. 
  It means you now have two sources of truth that you have to manually keep in sync.
*/

const BrokenCheckout = () => {
  const [price, setPrice] = useState(10);
  const [qty, setQty] = useState(2);
  
  // BUG: Total is set to 20 once on initial render.
  // If price or qty changes, 'total' is completely unaware! 
  // It will permanently stay at 20 unless we manually write complex useEffects to update it.
  const [total, setTotal] = useState(price * qty); 

  return (
    <div>
      <p>Price: ${price}</p>
      <p>Qty: {qty}</p>
      <h3>Total: ${total} (This is broken!)</h3>
      
      {/* Clicking this changes qty to 3, but total remains 20! */}
      <button onClick={() => setQty(3)}>Change Qty</button>
    </div>
  );
};

export default BrokenCheckout;

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

import React from 'react';

/*
  YOUR TURN!
  
  TODO:
  1. Create a component with a state variable `birthYear` (default 1990).
  2. Using a REGULAR variable, calculate the `age` of the person (e.g., 2024 - birthYear).
  3. Render the `birthYear` and the derived `age`.
  4. Add a button that increments the `birthYear` state, and watch the age update automatically!
*/

// Write your code below this line:
```

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

# Controlled Components (Forms)

In standard HTML, input elements (like `<input>`, `<textarea>`, `<select>`) maintain their own internal state. When a user types, the browser updates the input's value automatically.

In React, this is considered highly dangerous. React is supposed to be the "Single Source of Truth" for all data in your application. 

### The React Way (Controlled Components)
We "hijack" the HTML input and force it to obey React state.
1. We create a React state variable.
2. We assign the input's `value` attribute to that state variable. (Now the input cannot change unless the state changes).
3. We add an `onChange` event to the input. When the user types, we take the keystroke and update the React state.
4. The component re-renders, and the input visually updates with the new state!


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React, { useState } from 'react';

/*
  BASIC PATTERN: A Controlled Input
*/

const ControlledInput = () => {
  // 1. Setup React State
  const [text, setText] = useState("");

  const handleChange = (e) => {
    // e.target.value contains the raw string the user just typed
    setText(e.target.value); 
  };

  return (
    <div>
      <label>Enter your name: </label>
      <input 
        type="text" 
        value={text}           // 2. Force the input to display the React State
        onChange={handleChange} // 3. Update the state when the user types
      />
      <p>You typed: {text}</p>
    </div>
  );
};

export default ControlledInput;

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.jsx

import React, { useState } from 'react';

/*
  ADVANCED PATTERN: Handling Multiple Inputs with One State Object
  
  If a form has 10 inputs, creating 10 different useState hooks is messy.
  Instead, create one state Object, and use the 'name' attribute of the inputs
  to dynamically update the correct property!
*/

const ComplexForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    country: "USA"
  });

  const handleChange = (e) => {
    // Destructure name and value from the event target (the input field)
    const { name, value } = e.target;
    
    // Spread previous state, and use computed property names [name] to update dynamically!
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form>
      {/* Notice the 'name' attributes match the keys in our state object perfectly */}
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
      <br/>
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
      <br/>
      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="USA">United States</option>
        <option value="UK">United Kingdom</option>
      </select>
      
      <p>Form Data: {JSON.stringify(formData)}</p>
    </form>
  );
};

export default ComplexForm;

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.jsx

import React from 'react';

/*
  ANTI-PATTERN: Uncontrolled Components (usually)
  
  If you do not provide a `value` prop, or do not provide an `onChange` handler, 
  the input becomes "uncontrolled". It manages its own state in the DOM.
*/

const UncontrolledForm = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // BUG: Because we didn't track the state, how do we get the value when the user submits?
    // We would have to use native DOM queries like document.getElementById(), 
    // which completely bypasses React's virtual DOM architecture and is heavily frowned upon.
    console.log("Form submitted, but I don't know the data!");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* This is uncontrolled! React has no idea what is typed in here. */}
      <input type="text" placeholder="Type something..." />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

import React from 'react';

/*
  YOUR TURN!
  
  TODO:
  1. Create a controlled `<textarea>`.
  2. Bind it to a state variable called `feedback`.
  3. Add a normal `<p>` tag below it that dynamically displays how many characters the user has typed!
     (Hint: feedback.length)
*/

// Write your code below this line:
```

# State Batching

> **💡 How to Imagine This:**
> Think of state batching like a waiter taking orders. Instead of running to the kitchen every time you ask for a burger, then running back when you ask for fries, and again for a drink, the waiter writes down all your requests at once. They then make a single trip to the kitchen (one re-render) with your entire updated order.

Explanation of React grouping multiple state updates into a single re-render for performance.

## Pros & Cons
**Pros:** Optimizes performance by reducing unnecessary renders.
**Cons:** May require functional updates if multiple queued updates depend on each other.


# State Initialization

> **💡 How to Imagine This:**
> Imagine moving into a new house. You only need to build the foundation and set up the heavy furniture once on moving day. Lazy state initialization is like telling React to only do the "heavy lifting" (expensive computations) the very first time the component renders, and never again.

Explanation of lazy initialization of state (e.g. passing a function to useState).

## Pros & Cons
**Pros:** Avoids re-running expensive initialization code on every render.
**Cons:** Slightly more complex syntax; only useful for heavy computations.


# State Updates

> **💡 How to Imagine This:**
> Think of state updates like placing an order on an online store. When you click "Buy", your cart changes, but your package doesn't instantly appear at your door. React notes your request and schedules a delivery (a re-render) to update the UI as soon as it efficiently can.

Overview of updating state and how it triggers re-renders.

## Pros & Cons
**Pros:** Simple API. React handles UI synchronization automatically.
**Cons:** Asynchronous nature can sometimes be unintuitive for beginners.


