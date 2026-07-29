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
