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

# 01_useState

> **💡 How to Imagine This:**
> Think of `useState` as a digital sticky note on your component's desk. Whenever you erase what's on the note and write something new (like updating a score), React notices the change and instantly redraws the component to show the new value.

## Overview
Local UI state management hook.

## Pros & Cons

### Pros
- Simple to use for basic state.
- Built-in reactivity updates UI automatically.
- Easy to read and understand.

### Cons
- Can become unwieldy with complex objects.
- Does not scale well across multiple components without prop drilling.


# The Dependency Array

The second argument to `useEffect` is the **Dependency Array**. It is a list of variables that tell React *when* the effect should run.

This is the most critical part of `useEffect`. Getting it wrong causes infinite loops or stale data.

### The 3 Variations:
1. **No Array:** `useEffect(() => {...})`
   - Runs after the initial render.
   - Runs after EVERY subsequent re-render.
   - Rarely used.

2. **Empty Array:** `useEffect(() => {...}, [])`
   - Runs after the initial render.
   - **Never runs again.** Perfect for fetching initial data or starting a global event listener.

3. **Populated Array:** `useEffect(() => {...}, [x, y])`
   - Runs after the initial render.
   - Runs again **ONLY IF** `x` or `y` have changed since the last render.


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React, { useState, useEffect } from 'react';

/*
  BASIC PATTERN: The Empty Array
*/

const DataFetcher = () => {
  const [data, setData] = useState(null);

  // We pass an empty array [] as the second argument.
  // This tells React: "Run this effect exactly ONCE when the component mounts, and never again."
  useEffect(() => {
    console.log("Fetching data from API...");
    
    // Simulating an API call
    setTimeout(() => {
      setData({ user: "Alice" });
    }, 1000);
    
  }, []); // <--- The Empty Dependency Array

  return (
    <div>
      {data ? <h1>Welcome, {data.user}</h1> : <p>Loading...</p>}
    </div>
  );
};

export default DataFetcher;

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.jsx

import React, { useState, useEffect } from 'react';

/*
  ADVANCED PATTERN: Reactive Dependencies
  
  If your effect uses a variable from the component scope (state, props, or derived data),
  you MUST include it in the dependency array. 
  This ensures the effect re-runs if that data changes.
*/

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log(`Fetching data for user ID: ${userId}`);
    
    // If we change the userId prop, we NEED this fetch to run again!
    // Therefore, userId must be in the dependency array.
    setTimeout(() => {
      setUserData({ id: userId, name: `User_${userId}` });
    }, 500);

  }, [userId]); // <--- Reactive Dependency!

  return (
    <div>
      {userData ? <p>Loaded: {userData.name}</p> : <p>Loading user {userId}...</p>}
    </div>
  );
};

// Demo component to change the prop
const App = () => {
  const [id, setId] = useState(1);
  return (
    <div>
      <button onClick={() => setId(2)}>Load User 2</button>
      <UserProfile userId={id} />
    </div>
  );
}

export default App;

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.jsx

import React, { useState, useEffect } from 'react';

/*
  ANTI-PATTERN: Lying to React (Missing Dependencies)
  
  If you use a state variable inside the effect, but fail to put it in the array,
  the effect will run once, and "lock in" the initial value forever.
  This is called a "Stale Closure".
*/

const StaleCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // BUG: We are using 'count' here, but we lied to React by passing an empty array [].
      // This means 'count' is forever locked at 0 inside this interval!
      // The counter will increment to 1, and stay there forever.
      console.log("Current count inside effect:", count);
      setCount(count + 1); 
    }, 1000);

    return () => clearInterval(timer);
  }, []); // <--- LIAR! 'count' should be in here!

  return <h1>Count: {count}</h1>;
};

export default StaleCounter;

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

import React, { useState, useEffect } from 'react';

/*
  YOUR TURN!
  
  TODO:
  1. Create a component with a `searchQuery` state.
  2. Create a `useEffect` that logs `"Searching for: " + searchQuery`.
  3. Ensure the effect ONLY runs when `searchQuery` changes by using the dependency array!
  4. Add an input field to let the user update the `searchQuery` state.
*/

// Write your code below this line:
```

# 02_useEffect

> **💡 How to Imagine This:**
> Think of `useEffect` as an assistant who runs errands for your component *after* it's done rendering on the screen. Whether it's fetching data from a server or setting up a subscription, the assistant handles it in the background so it doesn't block the UI from showing up.

## Overview
Side effects, data fetching, timers, and subscriptions hook.

## Pros & Cons

### Pros
- Handles side effects explicitly.
- Manages component lifecycle cleanly with cleanup functions.
- Keeps main render function pure.

### Cons
- Easy to cause infinite loops if dependencies are mismanaged.
- Can lead to spaghetti code if overused for derived state.


# Cleanup Functions (Memory Leaks)

Some side effects create persistent connections to the outside world. 
- Setting a `setInterval`
- Adding an `addEventListener` to the `window`
- Subscribing to a WebSocket or Firebase database

If your component is removed from the screen (unmounted), those persistent connections **keep running in the background**. If the user navigates away and comes back, a *second* connection is created! This causes massive memory leaks and crashes.

### The Solution
If you return a function from inside your `useEffect`, React treats it as a "Cleanup Function". 
React will run this cleanup function right before the component unmounts, giving you a chance to clear intervals, remove listeners, and close connections.


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React, { useState, useEffect } from 'react';

/*
  BASIC PATTERN: Clearing an Interval
*/

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // 1. Setup the persistent effect
    const intervalId = setInterval(() => {
      console.log("Tick...");
      setSeconds(prev => prev + 1);
    }, 1000);

    // 2. Return the Cleanup Function
    // React calls this function when the component is destroyed.
    return () => {
      console.log("Timer destroyed! Cleaning up...");
      clearInterval(intervalId); // We kill the interval so it doesn't leak!
    };
  }, []); 

  return <h1>Timer: {seconds}</h1>;
};

export default Timer;

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.jsx

import React, { useEffect, useState } from 'react';

/*
  ADVANCED PATTERN: Window Event Listeners
  
  A common pattern is tracking mouse movement or window resizing.
  You must remove the listener when the component unmounts!
*/

const MouseTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // The handler function
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Attach to the global window object
    window.addEventListener('mousemove', handleMouseMove);

    // CLEANUP: Remove it! If we didn't do this, every time this component 
    // mounted, it would add ANOTHER listener to the window!
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <h3>Mouse X: {position.x}</h3>
      <h3>Mouse Y: {position.y}</h3>
    </div>
  );
};

export default MouseTracker;

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.jsx

import React, { useEffect } from 'react';

/*
  ANTI-PATTERN: The Orphaned Listener (Memory Leak)
*/

const BrokenChatRoom = () => {
  
  useEffect(() => {
    // Pretend this is a WebSocket connection to a chat server
    console.log("Connected to Chat Room...");
    
    const handleNewMessage = (msg) => console.log("New Message:", msg);
    
    // window.ChatAPI.subscribe(handleNewMessage);
    
    // BUG: We forgot to return a cleanup function!
    // When the user leaves the chat room page, the browser keeps listening for messages 
    // and trying to update a component that no longer exists!
    // This throws the infamous React warning: 
    // "Can't perform a React state update on an unmounted component."
  }, []);

  return <h1>Chat Room Active</h1>;
};

export default BrokenChatRoom;

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

import React, { useEffect, useState } from 'react';

/*
  YOUR TURN!
  
  TODO:
  1. Create a component that tracks the window width.
  2. In a `useEffect`, add a 'resize' event listener to the `window`.
  3. When it resizes, update a `width` state variable.
  4. CRITICAL: Return a cleanup function that uses `removeEventListener` to clean it up!
*/

// Write your code below this line:
```

# 03_useContext

> **💡 How to Imagine This:**
> Think of `useContext` as a global loudspeaker in a building. Instead of passing a message room by room (prop drilling), the loudspeaker broadcasts the message directly to any room (component) that decides to tune in and listen.

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


# Fetching Data

The absolute most common use of `useEffect` is fetching data from an external API (like fetching a list of users, or product details).

Because fetching data takes time, it is an asynchronous side effect. 

### The 3 States of Data Fetching:
Whenever you fetch data, you should always handle three distinct UI states:
1. **Loading State:** The data hasn't arrived yet. Show a spinner.
2. **Error State:** The server crashed or the user is offline. Show an error message.
3. **Success State:** The data arrived safely. Render the component.


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React, { useState, useEffect } from 'react';

/*
  BASIC PATTERN: Fetching on Mount
*/

const UserFetcher = () => {
  // We need 3 pieces of state to handle a professional data fetch
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // We use the native browser fetch API
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => {
        if (!res.ok) throw new Error("Server responded with an error");
        return res.json();
      })
      .then((json) => {
        setData(json); // Data arrived safely!
        setLoading(false); 
      })
      .catch((err) => {
        setError(err.message); // Something went wrong!
        setLoading(false);
      });
  }, []); // <-- Empty array: Only fetch ONCE when the component mounts!

  // Conditional Rendering based on the 3 states:
  if (loading) return <p>Loading user data...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  
  return <h1>User: {data.name}</h1>;
};

export default UserFetcher;

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.jsx

import React, { useState, useEffect } from 'react';

/*
  ADVANCED PATTERN: Async/Await inside useEffect
  
  The useEffect hook CANNOT be an async function (e.g., useEffect(async () => {}) is an error).
  If you want to use async/await, you must define an async function INSIDE the effect, 
  and then immediately call it.
*/

const AsyncFetcher = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 1. Define the async function
    const loadData = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed:", err);
      }
    };

    // 2. Call it immediately
    loadData();
    
  }, []);

  return <div>{data ? data.title : "Loading..."}</div>;
};

export default AsyncFetcher;

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.jsx

import React, { useState, useEffect } from 'react';

/*
  ANTI-PATTERN: The Infinite Fetch Loop
  
  If you accidentally omit the dependency array entirely, or put the fetched 'data'
  into the dependency array, you will create an infinite loop of network requests!
*/

const DDosAttacker = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(json => {
        // BUG: We update the state here...
        setData(json); 
      });
      
  // BUG: No dependency array! 
  // State updates -> Component re-renders -> Effect runs again -> Fetches data -> State updates...
  // You will send thousands of requests per second and crash the browser or the server.
  }); 

  return <div>Data Loaded</div>;
};

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

import React from 'react';

/*
  YOUR TURN!
  
  TODO:
  1. Setup a `useEffect` with an empty dependency array.
  2. Inside, use `fetch()` to grab `https://jsonplaceholder.typicode.com/todos/1`.
  3. Save the resulting JSON data into a state variable.
  4. Render the `title` of the Todo item!
*/

// Write your code below this line:
```

# 04_useRef

> **💡 How to Imagine This:**
> Think of `useRef` as a secret pocket in your component. You can put things in it or take things out, and React won't even notice—it won't trigger a re-render. It's also the perfect tool for grabbing a direct handle to a physical DOM element on the screen.

## Overview
Stable mutable values and direct DOM access hook.

## Pros & Cons

### Pros
- Persists data between renders without triggering re-renders.
- Allows direct DOM manipulation when necessary.
- Useful for storing timer IDs and previous state.

### Cons
- Overuse can lead to imperatively driven UI, breaking React's declarative model.
- Does not trigger UI updates on mutation.


# 05_useMemo

> **💡 How to Imagine This:**
> Think of `useMemo` as saving the answer to a really hard math problem. If someone asks you to calculate 2345 * 8769, you do it once, write the answer on a card, and just show the card the next time they ask—as long as the numbers haven't changed.

## Overview
Memoization of expensive calculations hook.

## Pros & Cons

### Pros
- Prevents expensive calculations on every render.
- Optimizes performance for heavy data processing.

### Cons
- Adds memory overhead for caching.
- Can actually slow down simple computations due to hook overhead.
- Often prematurely optimized by beginners.


# 06_useCallback

> **💡 How to Imagine This:**
> Think of `useCallback` as giving your friend a permanent ID card instead of a temporary visitor badge. When you pass a function down to a child component, React normally sees it as a brand-new function every time. `useCallback` ensures it's recognized as the exact same function, preventing unnecessary re-renders.

## Overview
Memoization of callback functions hook.

## Pros & Cons

### Pros
- Maintains referential equality for functions.
- Prevents unnecessary re-renders of child components wrapped in React.memo.

### Cons
- Same memory overhead as useMemo.
- Often misused when child components aren't memoized, yielding zero benefits.


# 07_useReducer

> **💡 How to Imagine This:**
> Think of `useReducer` as a specialized command center with a strict instruction manual. Instead of manually updating different pieces of state yourself, you send a formal "action" (like "INCREMENT_SCORE"), and the reducer follows the manual to update everything correctly in one swoop.

## Overview
Complex state logic and structured updates hook.

## Pros & Cons

### Pros
- Great for complex state logic with multiple sub-values.
- Makes state transitions predictable via dispatched actions.
- Keeps business logic outside of the component render cycle.

### Cons
- Requires more boilerplate code than useState.
- Slight learning curve for beginners used to simple setters.


