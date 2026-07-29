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
