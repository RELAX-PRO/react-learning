# Module 1: File System Routing 📁🌐

Welcome to the world of Next.js! 
In pure React, if you want multiple pages (Home, About, Patient Profile), you have to install a library like `react-router-dom` and manually write a giant configuration file linking URLs to Components.

Next.js completely eliminates this. It uses **File System Routing**.

## The App Router (`/app`)
In Next.js, the structure of your folders *is* the structure of your website.

Look at the `app` folder in this directory:
1. `app/page.tsx` ➡️ This becomes your home page (`/`).
2. `app/patients/page.tsx` ➡️ This becomes `/patients`.
3. `app/patients/[id]/page.tsx` ➡️ This becomes a **Dynamic Route** (e.g., `/patients/123`).

## Dynamic Routes (The `[id]` folder)
When you name a folder with brackets like `[id]`, you are telling Next.js: "This is a variable!".
Next.js will capture whatever the user types in the URL and pass it to your component via the `params` prop.

Check out `app/patients/[id]/page.tsx` to see how we receive the Patient ID directly from the URL, without any setup!


# Performance & Memoization

React is incredibly fast by default. However, when a parent component re-renders, **all of its children re-render automatically**, even if their props didn't change!

In massive applications, this cascading re-render can cause severe lag.

### The Solutions:
1. **React.memo**: Wraps a component. Tells React: "Only re-render this component if its props change."
2. **useMemo**: Wraps a heavy calculation. Tells React: "Only recalculate this math if the variables change."
3. **useCallback**: Wraps a function. Tells React: "Keep the exact same memory address for this function across renders, so you don't trigger child re-renders."


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React, { useState, useMemo } from 'react';

/*
  BASIC PATTERN: useMemo
*/

const ExpensiveMath = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Imagine this loop takes 2 seconds to run.
  // If we didn't use useMemo, typing in the 'text' input below would trigger a re-render,
  // causing the 2-second loop to run on EVERY keystroke, freezing the browser!
  const hugeNumber = useMemo(() => {
    console.log("Running expensive math...");
    let total = 0;
    for (let i = 0; i < 100000000; i++) total += count;
    return total;
  }, [count]); // ONLY recalculate if 'count' changes! Not if 'text' changes!

  return (
    <div>
      <h1>Result: {hugeNumber}</h1>
      <button onClick={() => setCount(count + 1)}>Increment Math</button>
      
      <hr />
      {/* Typing here updates 'text', triggering a re-render. But the math is cached! */}
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Type here (No lag!)" />
    </div>
  );
};

export default ExpensiveMath;

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx
// Write pseudo-code for a useMemo hook that calculates the total price of items in a cart array.
```

# Module 2: Server Components 🖥️⚡

This is the biggest revolution in React's history. 

In pure React, **all** components run in the user's browser. The browser downloads a massive Javascript bundle, executes it, fetches data, and *then* draws the UI. This is slow, especially on weak phones.

## Enter React Server Components (RSC)
In Next.js (App Router), every component you create is a **Server Component** by default.

This means:
1. The component runs on the Server (Node.js).
2. It can securely connect directly to your database!
3. It can be written as an `async` function, allowing you to `await` data without ever using `useEffect` or loading spinners!
4. The server executes the code, generates the final HTML, and sends *only* the HTML to the browser.
5. **Zero JavaScript** for this component is sent to the user's browser! This makes your bundle size incredibly small and fast.

## The Rule
Use Server Components for **Data Fetching** and **Static UI** (Layouts, articles, lists).

Check out `PatientList.tsx` to see how beautiful and simple data fetching becomes when you use a Server Component.


# Module 3: Client Components 💻🖱️

If Server Components are so amazing, why do we need Client Components?

Because Server Components **cannot**:
- Use `useState`, `useEffect`, or any React Hooks.
- Listen to browser events like `onClick` or `onChange`.
- Access browser APIs like `window` or `localStorage`.

When building our Clinic app, a static list of patients is great for a Server Component. But a Search Bar where the user types and clicks a button *requires* interactivity. It must run in the browser!

## The `"use client"` Directive
To turn a Server Component into a Client Component, you simply add `"use client";` at the very top of the file.
This tells Next.js: "Hey, bundle this Javascript and send it to the browser!"

## The Golden Rule of Interleaving
You should push Client Components as far down your component tree as possible. 
Instead of making the whole Page a client component, make a `Server Page`, put your `Server List` inside it, and just create a small `Client SearchBar` component to drop into the page.

Check out `SearchPatientInput.tsx` to see this in action.


# Module 4: Server Side Rendering (SSR) 🔄

In the old days of Pure React (Create React App/Vite), you shipped an empty HTML file `<div id="root"></div>` to the browser, and the browser had to do all the heavy lifting to draw the UI. 

**Server Side Rendering (SSR)** changes this.
When a user requests a URL, the Next.js server acts as the chef:
1. It looks at the database.
2. It cooks the data into the React Component.
3. It generates the final HTML.
4. It sends the finished HTML meal to the user.

## Why use SSR?
- **SEO**: Google bots can instantly read the HTML content (like Patient articles or Doctor profiles). They can't read an empty `<div id="root"></div>`.
- **Always Fresh**: The HTML is generated *at the exact moment* of the request. This means it is perfect for highly dynamic data like a "Live Clinic Dashboard" where the number of waiting patients changes every minute.

## How to trigger SSR in Next.js App Router?
By default, Next.js tries to be smart and cache things. To force it to perform SSR on *every single request*, we add this line to our page:
```typescript
export const dynamic = 'force-dynamic';
```
Check out `page.tsx` to see a Live Dashboard that is rendered on the server every time you refresh!


# Module 5: Static Site Generation (SSG) ⚡🧱

If SSR (Server Side Rendering) is a chef cooking a fresh meal every time a customer orders, **SSG (Static Site Generation)** is a bakery that bakes all the bread at 5:00 AM, puts it on the shelf, and instantly hands it to customers all day long!

## How SSG Works
During the Build phase (`npm run build`), Next.js executes your React components, generates the final HTML files, and saves them to the hard drive.
When a user requests the page, the server does zero work. It just hands them the pre-made HTML file. It is the absolute fastest way to serve a webpage!

## When to use SSG?
Use SSG for pages that **do not change often**:
- The Clinic's "About Us" page.
- Medical Blog Articles (e.g., "How to wear contact lenses").
- The Contact / Location page.

## Dynamic SSG (`generateStaticParams`)
What if you have dynamic routes like `/articles/[slug]`? How does the bakery know which articles to bake at 5:00 AM?
You use a special function called `generateStaticParams()`. 

Check out `page.tsx`! By returning an array of slugs (`eye-health`, `contact-lenses`), we tell Next.js to pre-build the HTML for those exact pages during the build process!


# Module 6: Data Fetching Patterns 📡🚀

Since Next.js allows us to fetch data directly inside Server Components, it is extremely easy to accidentally write slow code!

## The Waterfall Trap (Sequential Fetching)
If your Dashboard needs to fetch the `PatientProfile` and the `PatientMedicalHistory`, you might write it like this:
```typescript
const profile = await fetchPatientProfile(patientId); 
const history = await fetchPatientMedicalHistory(patientId); 
```
**This is a Waterfall!** The server will wait for the profile to finish downloading *before* it even asks the database for the history! If each takes 2 seconds, your user waits 4 seconds.

## The Solution: Parallel Fetching
If the `MedicalHistory` does not depend on the `Profile`, they should be fetched at the exact same time! We do this using standard JavaScript `Promise.all()`.

```typescript
const [profile, history] = await Promise.all([
  fetchPatientProfile(patientId),
  fetchPatientMedicalHistory(patientId)
]);
```
Now, both requests fire simultaneously! The user only waits 2 seconds total!

Check out `ParallelFetch.tsx` to see this implemented in a real component!


# Module 7: Deployment Workflows 🚀🌍

You have built a blazing fast, Next.js Optometry Clinic with Server Components, SSR, and SSG. Now, how do you get it on the internet?

## Vercel: The Creators of Next.js
The absolute easiest way to deploy a Next.js application is using **Vercel** (the company that created Next.js). Vercel is specifically designed to understand the Next.js architecture perfectly.

## The Workflow
1. **Push to GitHub**: You commit your code and push it to a repository.
2. **Connect Vercel**: You log into Vercel and link your GitHub repository.
3. **Automatic Build**: Vercel detects it's a Next.js app and automatically runs `npm run build`.
4. **The Magic Routing**:
   - Vercel takes your Static Pages (SSG) and pushes them to a global CDN so they load instantly anywhere in the world.
   - Vercel takes your Dynamic Pages (SSR) and automatically deploys them as **Serverless Functions**!

## Environment Variables
In Next.js, NEVER commit your API keys (like your Database Password) to GitHub!
Instead, you add them in the Vercel Dashboard under **Environment Variables**. Next.js will inject them into your Node server at runtime!

*Congratulations! You have completed the Next.js Fundamentals module!* 🎉


