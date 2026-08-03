# 01. Fetch API

> **💡 How to Imagine This:**
> Think of `fetch` like ordering at a drive-thru. You place your order (make a request), wait in line (the promise), and receive a bag of food. But before you can actually eat, you have to manually unwrap the food (calling `response.json()`). You also have to check if they actually gave you what you wanted, because the drive-thru will only "fail" if the road is closed, not if they mess up your order.


This section covers the basics of data fetching in React using the native browser `fetch` API. It demonstrates making GET requests to fetch data, making POST requests to send data, and handling the network requests using React state and effects.

## Pros & Cons

**Pros:**
- Built into modern browsers, so no additional dependencies are required.
- Standardized API with widespread support and understanding.
- Sufficient for small to medium-sized applications.

**Cons:**
- Requires manual parsing of JSON (`response.json()`).
- Error handling can be tricky since it only rejects on network failures, not on HTTP error statuses (like 404 or 500), which require manual checking of `response.ok`.
- Lacks advanced features like built-in request cancellation, interceptors, and automated retries out-of-the-box.

# React Router Setup

React is a "Single Page Application" (SPA) framework. It doesn't actually request new HTML files from the server when you click a link. Instead, it uses JavaScript to swap out components instantaneously, tricking the user into thinking they changed pages!

To achieve this, we use the industry-standard library: **React Router DOM**.

### Core Components:
- **`<BrowserRouter>`**: Wraps your entire app. It connects your app to the browser's URL bar.
- **`<Routes>`**: Looks at the URL and decides which Route to show.
- **`<Route>`**: Maps a specific URL path (e.g., `/about`) to a specific Component (e.g., `<AboutPage />`).
- **`<Link>`**: Replaces the HTML `<a>` tag. It changes the URL *without* refreshing the page!


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React from 'react';
// 1. Import the necessary components (You must 'npm install react-router-dom' first!)
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

/*
  BASIC PATTERN: The Global Router Setup
*/

// Mock Pages
const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Us</h1>;

const App = () => {
  return (
    // 2. Wrap the entire app
    <BrowserRouter>
      <nav>
        {/* 3. Use Link instead of <a href> to prevent page reloads! */}
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      {/* 4. Define the routing logic */}
      <Routes>
        {/* If the URL is '/', render the <Home /> component */}
        <Route path="/" element={<Home />} />
        {/* If the URL is '/about', render the <About /> component */}
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.jsx

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

/*
  ADVANCED PATTERN: Catch-All 404 Pages
  
  What if the user types a URL that doesn't exist?
  You can use the wildcard path "*" to catch any undefined routes and render a 404 page!
*/

const NotFound = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>404 - Page Not Found</h1>
    <Link to="/">Go Back Home</Link>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        
        {/* The Wildcard Route MUST be placed at the very bottom! */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.jsx

import React from 'react';

/*
  ANTI-PATTERN: Using the standard HTML <a> tag
  
  If you use `<a href="/about">`, the browser will do a full hard refresh.
  It wipes your React state, flashes a white screen, and downloads the entire 
  JavaScript bundle again. It completely destroys the SPA experience.
*/

const BrokenNavigation = () => {
  return (
    <nav>
      {/* BUG: Full page refresh! All React state will be lost! */}
      <a href="/dashboard">Go to Dashboard</a>
      
      {/* FIX: Use the React Router <Link> component instead. */}
      {/* <Link to="/dashboard">Go to Dashboard</Link> */}
    </nav>
  );
};

export default BrokenNavigation;

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

import React from 'react';

/*
  YOUR TURN!
  
  TODO:
  1. Set up a `<BrowserRouter>` wrapping a `<Routes>` block.
  2. Create a `<Route>` for `/contact` that renders a simple `<h1>Contact Us</h1>`.
  3. Create a `<Link>` that points to `/contact`.
*/

// Write your code below this line:
```

# 02. Axios Client

> **💡 How to Imagine This:**
> Imagine Axios as a premium food delivery app. Unlike the basic drive-thru (`fetch`), this app automatically unpacks your food for you (auto-parses JSON) and immediately gives you a clear refund notification if the restaurant is closed or messes up the order (throws proper HTTP errors). You can even set default delivery instructions (interceptors) for every order you make.


This section explains how to use Axios, a popular promise-based HTTP client, to fetch and send data in React. It covers configuring a centralized Axios instance with default settings and interceptors.

## Pros & Cons

**Pros:**
- Automatically parses JSON responses.
- Throws errors for HTTP error statuses (like 404, 500) natively, reducing boilerplate.
- Easy to configure default settings (e.g., Base URL, headers).
- Supports interceptors for request/response manipulation (e.g., adding auth tokens globally).
- Built-in protection against XSRF.

**Cons:**
- Adds an external dependency to your project, increasing bundle size.
- Fetch API is often sufficient for simpler applications, making Axios overkill in some scenarios.

# Dynamic Routing

Static routes like `/about` or `/contact` are easy. But what if you have an e-commerce store with 10,000 products? You can't manually create a `<Route>` for every single product!

You need **Dynamic Routes**.

By placing a colon `:` in front of a URL segment (e.g., `/products/:id`), React Router treats that segment as a variable.
If a user goes to `/products/99`, the route matches, and React Router extracts `99` as the `id` variable.
You can then use the `useParams()` hook to grab that `99` and fetch the correct product from the database!


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

/*
  BASIC PATTERN: useParams
*/

// This component will be used for ANY product URL!
const ProductDetails = () => {
  // We use the hook to extract the variables from the URL bar!
  const params = useParams();
  
  return (
    <div>
      {/* If the URL is /products/apple, params.productId will be "apple" */}
      <h1>Viewing Product ID: {params.productId}</h1>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/products/laptop">View Laptop</Link> | 
        <Link to="/products/phone">View Phone</Link>
      </nav>

      <Routes>
        {/* The ':productId' defines a dynamic variable! */}
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
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
  1. Create a route with a path of `/users/:username`.
  2. Create a component that reads the `username` parameter using `useParams`.
  3. Have the component render "Welcome to the profile of [username]".
*/

// Write your code below this line:
```

# 03. Handling Promises

> **💡 How to Imagine This:**
> Imagine sending a group of friends to different aisles in a grocery store to gather ingredients. Instead of waiting for one person to finish before sending the next, they all shop at the same time (`Promise.all`). You wait at the checkout counter until *everyone* gets back. If even one friend drops their basket (fails), you abandon the whole recipe.


This section covers how to manage complex or multiple asynchronous operations using Promises, focusing specifically on `Promise.all` to perform concurrent data fetching.

## Pros & Cons

**Pros:**
- `Promise.all` allows multiple network requests to run concurrently instead of sequentially, significantly reducing loading times.
- State updates can be bundled together once all data is ready, preventing UI tearing or intermediate loading states.

**Cons:**
- "All or Nothing" behavior: If a single promise in `Promise.all` fails, the entire batch rejects. (Consider `Promise.allSettled` if you need partial successes).
- Launching too many heavy concurrent requests might overload the client or the server.

# 04. Loading States

> **💡 How to Imagine This:**
> Think of a loading state (like a skeleton loader) as placing "Reserved" signs on tables at a restaurant before your party arrives. The layout is already set, preventing other guests from unexpectedly taking the space. When your friends (data) finally arrive, they sit exactly where the signs were, preventing a chaotic reshuffling of chairs (layout shift).


This section covers how to provide meaningful visual feedback while a React application is waiting for asynchronous operations to complete. It demonstrates the use of skeleton loaders to improve perceived performance.

## Pros & Cons

**Pros:**
- Enhances user experience by preventing layout shifts (Cumulative Layout Shift) when data arrives.
- Skeleton screens feel faster to users compared to blank screens or traditional spinner icons.

**Cons:**
- Requires creating and maintaining secondary "dummy" components that match the structure of the real UI.
- Overusing skeleton loaders for extremely fast requests might cause unpleasant screen flickering.

# 05. Error Handling

> **💡 How to Imagine This:**
> Think of this like the dashboard warning lights in your car. Instead of the car just silently refusing to start, it clearly tells you if you're out of gas (404 Not Found), have engine trouble (500 Server Error), or if the road is washed out (Network Failure). It might even give you a button to "Try starting again" (Retry mechanism).


This section details advanced error handling strategies when making network requests in React, focusing on categorizing errors (Network, 404, 500) and providing actionable UI recovery options like a Retry button.

## Pros & Cons

**Pros:**
- Prevents the application from crashing silently on network failures.
- Categorizing errors allows for precise user feedback (e.g., "Check internet" vs "Server is down").
- Adding retry mechanisms improves overall UX by keeping the user in control.

**Cons:**
- Requires writing and maintaining more boilerplate code (handling try/catch, distinguishing error types).
- Improper error handling can accidentally expose sensitive backend stack traces to the client.

# 06. Data Normalization

> **💡 How to Imagine This:**
> Imagine trying to find a specific book in a massive, unorganized pile (an Array). You have to check every single book until you find the right one. Normalizing data is like organizing that pile into a library's card catalog. You assign an ID to the book, and you can instantly walk to the exact shelf (O(1) lookup) without searching through the rest.


This section covers data normalization—restructuring API response data (usually arrays) into a dictionary-like object (e.g., `byId`) and an array of identifiers (`allIds`) before storing it in React state.

## Pros & Cons

**Pros:**
- Enables O(1) time complexity for reading or updating specific items.
- Solves nested data update issues, avoiding complex multi-level array mapping.
- Integrates cleanly with global state managers like Redux or Context API.

**Cons:**
- Requires initial processing overhead to map the incoming data into the normalized structure.
- Can be over-engineered for small lists or data that does not require frequent individual updates.

# 07. Effect Cleanup

> **💡 How to Imagine This:**
> Think of effect cleanup like renting an apartment. When you move in (component mounts), you set up internet and water services. When you move out (component unmounts), you MUST cancel those services. If you don't cancel them, you keep paying for things you aren't using, slowly draining your bank account (memory leaks).


This section highlights the critical importance of returning a cleanup function from the `useEffect` hook in React. It demonstrates how to properly tear down intervals and global event listeners when a component unmounts.

## Pros & Cons

**Pros:**
- Prevents memory leaks by ensuring resources (timers, event listeners, websockets, fetch requests) are properly destroyed when a component leaves the screen.
- Avoids bugs caused by updating state on an unmounted component.
- Ensures a clean slate when dependencies change and the effect needs to re-run.

**Cons:**
- Easy to forget, leading to silent performance degradation over time.
- Cleanup functions in Strict Mode during development run twice, which can be initially confusing for beginners (though it helps catch bugs).

