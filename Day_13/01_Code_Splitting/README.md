# Lesson 1: Route-Level Code Splitting

## The Problem with SPAs
React is a Single Page Application (SPA). By default, when a user visits your website, tools like Vite or Webpack bundle **all of your code** (every page, every component, every library) into one giant `bundle.js` file.

If your app has 50 pages, the user is forced to download all 50 pages just to view the Login screen. This is a massive performance bottleneck.

## The Solution: Code Splitting
Look at `App.tsx` in this folder. We are using standard React APIs to fix this:

```tsx
const OpticsPOSView = lazy(() => import('./pages/OpticsPOSView'));
```

When Vite sees this `import()`, it automatically splits `OpticsPOSView` and all of its dependencies into a completely separate file (a "chunk").

## The `Suspense` Boundary
Because the chunk is not loaded initially, there is a delay when the user navigates to the route. React needs to know what to show while it fetches the chunk from the server.

We wrap our routes in a `<Suspense fallback={<LoadingScreen />}>`. This tells React: *"If the user navigates to a route that hasn't downloaded yet, show this loading screen until the file arrives."*

Route-level code splitting is the highest-impact performance optimization you can make in a large React application.
