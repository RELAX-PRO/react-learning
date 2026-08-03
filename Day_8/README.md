# Axios Setup

While the native browser `fetch()` API is powerful, it has several annoyances:
1. You have to manually parse the JSON (`res.json()`).
2. It does not throw an error if the server returns a 404 or 500 status code. You have to manually check `!res.ok`.
3. Sending JSON bodies requires manually setting headers and stringifying the data.

**Axios** is a third-party library that solves all of these problems automatically. It is the industry standard for making HTTP requests in React applications.


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React, { useState, useEffect } from 'react';
// import axios from 'axios'; (Requires npm install axios)

/*
  BASIC PATTERN: Axios vs Fetch
*/

const AxiosDemo = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // With native fetch:
    // fetch('url')
    //   .then(res => { if(!res.ok) throw Error(); return res.json(); })
    //   .then(json => setData(json))

    // With Axios:
    // axios.get('url').then(res => setData(res.data));
    
    console.log("Axios automatically parses JSON and throws on 400/500 errors!");
  }, []);

  return <div>Check the comments for the Axios implementation!</div>;
};

export default AxiosDemo;

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

/*
  YOUR TURN!
  
  TODO:
  1. Write a pseudo-code `axios.post()` request to `/api/login`.
  2. Pass a payload object containing `{ email: "a@b.com", password: "123" }` as the second argument.
*/
```

# Route Definitions

> **💡 How to Imagine This:**
> Think of Route Definitions like a building's directory board in the lobby. It tells you exactly which room (component) you need to go to when you are looking for a specific department (URL path).

This folder explores Route Definitions in React Router.

## Overview
Route Definitions is essential for building modern single-page applications. It allows developers to define how different paths map to specific components, creating a seamless user experience.

## Pros & Cons

**Pros:**
- Enhances user experience by avoiding full page reloads.
- Promotes modular and maintainable code through component-based routing.
- Allows for dynamic and nested UI layouts.

**Cons:**
- Adds complexity to the application structure.
- Requires careful handling of browser history and state.
- Can lead to large bundle sizes if code-splitting is not implemented correctly.


# Nested Routes

> **💡 How to Imagine This:**
> Think of Nested Routes like opening folders on your computer. You open the 'Documents' folder (parent route), and inside it, the 'Taxes' folder (child route) appears, while the rest of your screen (the layout) stays exactly the same.

This folder explores Nested Routes in React Router.

## Overview
Nested Routes is essential for building modern single-page applications. It allows developers to define how different paths map to specific components, creating a seamless user experience.

## Pros & Cons

**Pros:**
- Enhances user experience by avoiding full page reloads.
- Promotes modular and maintainable code through component-based routing.
- Allows for dynamic and nested UI layouts.

**Cons:**
- Adds complexity to the application structure.
- Requires careful handling of browser history and state.
- Can lead to large bundle sizes if code-splitting is not implemented correctly.


# Link Navigation

> **💡 How to Imagine This:**
> Think of Link Navigation like moving between rooms in a house. Instead of the browser completely reloading a whole new house from the internet, React quickly and smoothly swaps the content on your screen to show the new room.

This folder explores Link Navigation in React Router.

## Overview
Link Navigation is essential for building modern single-page applications. It allows developers to define how different paths map to specific components, creating a seamless user experience.

## Pros & Cons

**Pros:**
- Enhances user experience by avoiding full page reloads.
- Promotes modular and maintainable code through component-based routing.
- Allows for dynamic and nested UI layouts.

**Cons:**
- Adds complexity to the application structure.
- Requires careful handling of browser history and state.
- Can lead to large bundle sizes if code-splitting is not implemented correctly.


# Programmatic Navigation

> **💡 How to Imagine This:**
> Think of Programmatic Navigation like being chauffeured. Instead of you clicking a button to go somewhere, the code automatically sends you to a new page—like being automatically redirected to a 'Thank You' page right after submitting a form.

This folder explores Programmatic Navigation in React Router.

## Overview
Programmatic Navigation is essential for building modern single-page applications. It allows developers to define how different paths map to specific components, creating a seamless user experience.

## Pros & Cons

**Pros:**
- Enhances user experience by avoiding full page reloads.
- Promotes modular and maintainable code through component-based routing.
- Allows for dynamic and nested UI layouts.

**Cons:**
- Adds complexity to the application structure.
- Requires careful handling of browser history and state.
- Can lead to large bundle sizes if code-splitting is not implemented correctly.


# Route Parameters

> **💡 How to Imagine This:**
> Think of Route Parameters like fill-in-the-blank spaces in a URL. Just like a library book has a unique ID to locate it on a shelf (`/books/123`), the `123` is the parameter that tells the page exactly which specific item to fetch and display.

This folder explores Route Parameters in React Router.

## Overview
Route Parameters is essential for building modern single-page applications. It allows developers to define how different paths map to specific components, creating a seamless user experience.

## Pros & Cons

**Pros:**
- Enhances user experience by avoiding full page reloads.
- Promotes modular and maintainable code through component-based routing.
- Allows for dynamic and nested UI layouts.

**Cons:**
- Adds complexity to the application structure.
- Requires careful handling of browser history and state.
- Can lead to large bundle sizes if code-splitting is not implemented correctly.


# Query Strings

> **💡 How to Imagine This:**
> Think of Query Strings like the filter options when shopping online. When you want to see only red shoes under $50, the URL adds extra details like `?color=red&maxPrice=50` to sort, filter, or customize the page content.

This folder explores Query Strings in React Router.

## Overview
Query Strings is essential for building modern single-page applications. It allows developers to define how different paths map to specific components, creating a seamless user experience.

## Pros & Cons

**Pros:**
- Enhances user experience by avoiding full page reloads.
- Promotes modular and maintainable code through component-based routing.
- Allows for dynamic and nested UI layouts.

**Cons:**
- Adds complexity to the application structure.
- Requires careful handling of browser history and state.
- Can lead to large bundle sizes if code-splitting is not implemented correctly.


# Protected Routes

> **💡 How to Imagine This:**
> Think of Protected Routes like a VIP bouncer at a club. Before letting you enter a specific room (page), the bouncer checks if you have a wristband (are logged in); if not, they immediately redirect you back to the entrance!

This folder explores Protected Routes in React Router.

## Overview
Protected Routes is essential for building modern single-page applications. It allows developers to define how different paths map to specific components, creating a seamless user experience.

## Pros & Cons

**Pros:**
- Enhances user experience by avoiding full page reloads.
- Promotes modular and maintainable code through component-based routing.
- Allows for dynamic and nested UI layouts.

**Cons:**
- Adds complexity to the application structure.
- Requires careful handling of browser history and state.
- Can lead to large bundle sizes if code-splitting is not implemented correctly.


