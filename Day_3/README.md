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


# JSX Syntax

JSX stands for JavaScript XML. It looks exactly like HTML, but it is actually a syntax extension for JavaScript.

Because JSX is JavaScript, you can inject variables, run functions, and execute logic directly inside your markup using curly braces `{}`. 

### Key Differences from HTML:
- `class` becomes `className` (because `class` is a reserved keyword in JS).
- `for` becomes `htmlFor`.
- All tags MUST be closed. In HTML, `<input>` or `<br>` is fine. In JSX, they must be self-closing: `<input />` and `<br />`.
- Inline styles take a JavaScript object, not a string: `style={{ color: 'red' }}`.


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React from 'react';

/*
  BASIC PATTERN: Injecting Data into JSX
*/

const UserProfile = () => {
  const user = "Alice";
  const unreadCount = 5;

  return (
    // Note the use of 'className' instead of 'class'
    <div className="profile">
      {/* We use {} to escape the HTML and execute JavaScript! */}
      <h1>Welcome back, {user}</h1>
      
      {/* Self-closing tags are mandatory! */}
      <hr />
      
      <p>You have {unreadCount} unread messages.</p>
    </div>
  );
};

export default UserProfile;

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.jsx

import React from 'react';

/*
  ADVANCED PATTERN: Executing complex logic in JSX
  
  You aren't limited to just variables inside {}. 
  You can execute ANY JavaScript expression!
*/

const Dashboard = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    return "Good Afternoon";
  };

  const user = { firstName: "bob", lastName: "smith" };

  return (
    <div>
      {/* Executing a function call */}
      <h2>{getGreeting()}!</h2>
      
      {/* Executing string manipulation methods */}
      <p>Logged in as: {user.firstName.toUpperCase()}</p>
      
      {/* Passing a JS Object to the style prop (notice the double curlies {{}}) */}
      <span style={{ backgroundColor: 'black', color: 'white' }}>
        Admin Mode
      </span>
    </div>
  );
};

export default Dashboard;

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.jsx

import React from 'react';

/*
  ANTI-PATTERN: Using Statements inside JSX
  
  You can put EXPRESSIONS inside curly braces {}.
  You CANNOT put STATEMENTS (like if/else, for-loops, or variable declarations).
*/

const BrokenLogic = () => {
  const isLoggedIn = true;

  return (
    <div>
      {/* BUG: You cannot write an if-statement inside JSX! */}
      {/* 
        {if (isLoggedIn) {
          return <p>Welcome!</p>
        }} 
      */}
    </div>
  );
};

// THE FIX: Use the Ternary Operator (? :) which is an expression!
const FixedLogic = () => {
  const isLoggedIn = true;
  return (
    <div>
      {isLoggedIn ? <p>Welcome!</p> : <p>Please log in.</p>}
    </div>
  );
};

export default FixedLogic;

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

import React from 'react';

/*
  YOUR TURN!
  
  TODO:
  1. Create a component called `ProductCard`.
  2. Inside the component, define a `price` variable set to 100.
  3. Return a `<div>` with a `className` of "card".
  4. Inside the div, render the price dynamically, wrapped in an `<h2>` tag.
  5. Add a self-closing `<input />` below the price.
*/

// Write your code below this line:
```

# Props (Properties)

Components are like JavaScript functions. If you want a function to be reusable, you pass arguments into it. 
In React, these arguments are called **Props**.

Props allow you to pass data from a Parent component down to a Child component. 
**Props are strictly read-only.** A child component can NEVER mutate its props. Data in React only flows in one direction: Downwards.


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React from 'react';

/*
  BASIC PATTERN: Passing and Receiving Props
*/

// The Child Component
// We destructure the 'title' and 'author' directly from the props object!
const ArticleHeader = ({ title, author }) => {
  return (
    <header>
      <h1>{title}</h1>
      <p>Written by {author}</p>
    </header>
  );
};

// The Parent Component
const BlogPage = () => {
  return (
    <main>
      {/* We pass props exactly like HTML attributes! */}
      <ArticleHeader title="React is Awesome" author="Alice" />
      <ArticleHeader title="Mastering Props" author="Bob" />
    </main>
  );
};

export default BlogPage;

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.jsx

import React from 'react';

/*
  ADVANCED PATTERN: Spreading Props
  
  If a parent receives a massive object of data and needs to pass all of it 
  down to a child, you don't have to type out every single prop manually!
  You can use the Spread Operator {...} inside the JSX tag.
*/

const UserProfile = ({ name, age, location, role }) => {
  return (
    <div className="profile">
      <h3>{name} ({role})</h3>
      <p>{age} years old, from {location}</p>
    </div>
  );
};

const Dashboard = () => {
  // A large data object fetched from an API
  const fetchedUserData = {
    name: "Charlie",
    age: 35,
    location: "New York",
    role: "Admin"
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* We spread the entire object into props! */}
      <UserProfile {...fetchedUserData} />
    </div>
  );
};

export default Dashboard;

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.jsx

import React from 'react';

/*
  ANTI-PATTERN: Mutating Props
  
  Props are READ-ONLY. They belong to the parent component.
  A child component is absolutely forbidden from altering them.
*/

const BrokenChild = ({ title }) => {
  
  // BUG: A child trying to change its own props will cause React to 
  // throw a TypeError ("Cannot assign to read only property").
  // title = title.toUpperCase();

  return <h1>{title}</h1>;
};

// THE FIX: If a child needs to modify the display of a prop, 
// it should create a new local variable to hold the transformed data.
const FixedChild = ({ title }) => {
  const displayTitle = title.toUpperCase(); // Create a new variable
  return <h1>{displayTitle}</h1>;
};

export default FixedChild;

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

import React from 'react';

/*
  YOUR TURN!
  
  TODO:
  1. Create a child component called `Badge` that accepts a `text` prop.
  2. Have it render a `<span>` containing the `text`.
  3. Create a parent component called `Sidebar`.
  4. Have the `Sidebar` render the `Badge` component, passing the string "New!" into the `text` prop.
*/

// Write your code below this line:
```

﻿# Prop Passing

> **💡 How to Imagine This:**
> Think of it like passing a baton in a relay race. A parent component holds some information and hands it down to a child component, who can then use it to finish their part of the race.


In React, data is passed down from parent components to child components via properties, or "props". Props are read-only and allow components to remain reusable and predictable.

## Pros & Cons

**Pros:**
- Encourages a clear, unidirectional data flow (top-down).
- Makes it straightforward to track how data moves through an application.
- Increases the reusability of presentational components.

**Cons:**
- Can lead to "prop drilling" if components are deeply nested.
- Parent components may become overly bloated if they have to manage too much state just to pass it down.


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


# List Rendering (The `key` prop)

You will constantly fetch arrays of data from an API (like a list of users or products) and need to render a component for every item in that array.

In React, we accomplish this by embedding the `.map()` array method directly inside JSX.

### The Rule of Keys
When React renders a list, it needs a way to identify which items have changed, been added, or been removed. To do this, **you MUST provide a unique `key` prop to the top-level element inside the `.map()` callback.**
If you do not provide a `key`, React will scream at you in the console and your app's performance will degrade significantly as the list changes.


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React from 'react';

/*
  BASIC PATTERN: Rendering a list with .map() and Keys
*/

const users = [
  { id: 101, name: "Alice" },
  { id: 102, name: "Bob" },
  { id: 103, name: "Charlie" }
];

const UserList = () => {
  return (
    <ul>
      {/* We map over the array directly inside the JSX */}
      {users.map((user) => (
        // The 'key' prop MUST be attached to the outermost element returned by map!
        // It must be a unique, stable identifier (like a database ID).
        <li key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  );
};

export default UserList;

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.jsx

import React from 'react';

/*
  ADVANCED PATTERN: Combining .filter() and .map()
  
  You can build complex UI logic purely through array method chaining.
*/

const tasks = [
  { id: 1, title: "Clean room", isCompleted: false },
  { id: 2, title: "Buy groceries", isCompleted: true },
  { id: 3, title: "Pay bills", isCompleted: false }
];

const PendingTasks = () => {
  return (
    <div>
      <h2>Pending Tasks:</h2>
      <ul>
        {/* We chain filter and map together in one fluid motion! */}
        {tasks
          .filter(task => !task.isCompleted) // Only keep incomplete tasks
          .map(task => (                     // Render the remaining tasks
            <li key={task.id}>{task.title}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default PendingTasks;

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.jsx

import React from 'react';

/*
  ANTI-PATTERN: Using the array index as a Key
  
  The .map() callback gives you a second argument: the index (0, 1, 2...).
  Junior developers often use this index as the React 'key' prop to silence the console warning.
*/

const BrokenList = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        // BUG: Using 'index' as a key is extremely dangerous!
        // If the array is sorted, reversed, or has items deleted from the middle, 
        // the indexes change! React will get confused and render the wrong data to the wrong row!
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
};

// THE FIX: Always use a unique identifier from your data (like a database ID or UUID).
// <li key={item.databaseId}>{item.name}</li>

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

import React from 'react';

/*
  YOUR TURN!
  
  TODO:
  1. Given this array: `const cars = [{ id: 'x1', brand: 'Ford' }, { id: 'x2', brand: 'Honda' }];`
  2. Create a `CarList` component.
  3. Map over the `cars` array to render a `<div>` for each car containing its brand name.
  4. Ensure you apply the correct `key` prop to prevent console warnings!
*/

// Write your code below this line:
```

﻿# Virtual DOM

> **💡 How to Imagine This:**
> Imagine drawing a complex painting on a digital tablet before putting it on a real canvas. Instead of starting over on the canvas every time you make a mistake, you easily tweak the digital sketch, and then efficiently trace only the changes onto the final real canvas.


The Virtual DOM is a lightweight JavaScript representation of the actual DOM. React uses it to determine the most efficient way to update the browser's UI.

## Pros & Cons

**Pros:**
- Significantly improves performance by batching updates and minimizing direct DOM manipulations.
- Allows React to perform a diffing algorithm (reconciliation) quickly in memory.

**Cons:**
- Adds an abstraction layer, requiring memory overhead.
- Not all changes strictly require it; for extremely simple applications, it may be overkill.


﻿# Rendering Elements

> **💡 How to Imagine This:**
> It's like a movie projector. The React elements are the frames of film, and rendering is the process of shining a light through them to display the actual picture on the screen for the user to see.


Elements are the smallest building blocks of React apps. Unlike browser DOM elements, React elements are plain objects and are cheap to create.

## Pros & Cons

**Pros:**
- Declarative UI descriptions make code highly readable.
- React takes care of updating the DOM to match the elements.

**Cons:**
- React elements are immutable; once created, they cannot be changed. This requires re-rendering to update the UI.


