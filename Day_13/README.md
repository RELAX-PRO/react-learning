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


# React Query (Data Fetching)

In Day 5, you learned how to fetch data using `useEffect` and `useState`. You had to manually track loading states, error states, and data states. 

What happens if the user navigates away and comes back? Should you fetch the data again? What if they are on a slow connection? What if you want to cache the data?

**React Query (TanStack Query)** handles ALL of this automatically. It completely replaces `useEffect` for data fetching in modern React applications.


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

/*
  BASIC PATTERN: useQuery
  Requires: npm install @tanstack/react-query
*/

// import { useQuery } from '@tanstack/react-query';

const fetchUser = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
  return res.json();
};

const Profile = () => {
  // React Query gives you the 3 states automatically!
  // It also caches the data, so if you unmount and remount, it loads instantly!
  /*
  const { data, isLoading, isError } = useQuery({ 
    queryKey: ['user', 1], 
    queryFn: fetchUser 
  });

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error fetching data</span>;

  return <h1>{data.name}</h1>;
  */
  
  return <div>Check comments for React Query implementation!</div>;
};

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx
// Write a pseudo-code useQuery hook to fetch a list of posts.
```

# Lesson 2: Component Lazy Loading

## Beyond the Route
In the previous lesson, we split our code at the route level. But what if a single page has a very heavy component that the user might never even click on?

In our Optometry Clinic, the `OpticsPOSView` page has a button to launch a Barcode Scanner (`OpticsBarcodeScannerModal.tsx`). This modal simulates loading heavy camera libraries and image processing tools.

If we import it normally:
```tsx
import { OpticsBarcodeScannerModal } from './OpticsBarcodeScannerModal';
```
The heavy camera libraries are downloaded immediately when the user visits the POS page, even if they never click the scanner button!

## Standard React `lazy`
In `OpticsPOSView.tsx`, we fix this using pure React:

```tsx
const LazyBarcodeScannerModal = lazy(() => import('./OpticsBarcodeScannerModal'));
```

**Notice the flow:**
1. The page loads instantly because the heavy modal is excluded from the initial bundle.
2. The user clicks "Launch Camera Scanner" (`isScannerOpen` becomes true).
3. React attempts to render `<LazyBarcodeScannerModal />`.
4. The `<Suspense>` boundary catches it, shows the loading text, and fetches the file from the server.
5. Once the file arrives, the modal appears!

> [!NOTE]
> We completely removed `next/dynamic` from this implementation because we are mastering pure React. React's built-in `lazy` combined with `Suspense` is the industry standard way to achieve lazy loading in Vite/CRA applications.


# Lesson 3: Memoization

## What is Memoization?
In computer science, Memoization is the technique of saving the result of an expensive calculation so that you don't have to compute it again if the inputs haven't changed.

In React, every time a component's state changes, the component (and all of its children) are completely re-rendered. This is normally very fast, but if a component does heavy math or renders thousands of items, it can freeze the browser.

We have three tools to prevent this, all demonstrated in `OpticsInventoryAnalyzer.tsx`:

### 1. `useMemo` (For Data)
Imagine we are filtering 10,000 inventory items.
```tsx
const filteredInventory = useMemo(() => {
  return initialInventory.filter(item => item.brand.includes(searchTerm));
}, [initialInventory, searchTerm]);
```
React will only run this expensive `.filter()` if `initialInventory` or `searchTerm` changes. If the user clicks a button to toggle the currency (`isEuro`), the filter does NOT re-run.

### 2. `React.memo` (For Components)
By wrapping a child component in `React.memo(Component)`, you tell React: *"Do not re-render this child unless its `props` have changed."*
In our file, the `StatCard` is memoized. When the user types in the search box, the parent re-renders, but the `StatCard` blocks the render unless the actual `value` passed to it changes.

### 3. `useCallback` (For Functions)
There is a catch! Functions in JavaScript are recreated on every render. If you pass a function to a memoized child component, the child will re-render anyway because the function is technically a "new" function in memory.

We fix this by wrapping the function in `useCallback`:
```tsx
const handleStatClick = useCallback(() => {
  alert(filteredInventory.length);
}, [filteredInventory.length]);
```
Now, the function remains exactly the same in memory across renders, allowing `React.memo` on the child component to work perfectly.


# Lesson 4: Bundle Analysis 🔬📊

Welcome to the X-Ray Room of your project! Do you remember the "metal detector" (`rollup-plugin-visualizer`) we plugged into our Vite engine? That is exactly what **Bundle Analysis** is!

Bundle Analysis isn't just a tool we run; it is the **art of reading the Treemap** and spotting the traps that consume memory. As a System Architect, there are 3 common "Software Tumors" (Bloat) you will constantly hunt for inside this colorful map to eradicate them! 👇⚡

---

## 1. Trap One: Failed Tree Shaking 🌳🍂

In the JavaScript world, there is a brilliant concept called **Tree Shaking**.
The idea is simple: If you import a single function from a massive library (the tree), the Vite engine should "shake the library" and drop all the code you didn't use, sending ONLY that specific function to the browser.

However, depending on how you write your `import` statement, you might accidentally disable this weapon!

### 💻 A Real Example from the Clinic:
Imagine you want to delay an API search (Debounce) when the doctor types a patient's name. You decide to use the famous `lodash` library.

Check out `PatientSearchDebounce.tsx` in this folder to see the difference between a disastrous import and a surgical, Tree-Shaking friendly import!

**How to spot this in the Bundle Analyzer?**
If you open the colorful map and see a massive block labeled `lodash`, you instantly know the import is wrong and needs to be corrected!

---

## 2. Trap Two: Giant Date Libraries (The `moment.js` Trap) 📅💣

In any billing or appointment system, you will inevitably deal with dates (printing today's date, calculating days between appointments). Beginners often install the most famous library: **`moment.js`**.

**What will you see in the X-Ray machine (Bundle Analyzer)?**
You will see a terrifying red block weighing **300 KB**! Why? Because `moment.js` bundles locale/language files for every country in the world (Chinese, Russian, Hindi...) and forces the patient's browser to download them, even if your clinic is entirely in English!

**🟢 The Architectural Solution:**
When you spot this in the map, you surgically remove `moment` and replace it with modern, modular libraries like:
* **`date-fns`** (allows importing individual functions).
* **`dayjs`** (weighs only 2 KB and works identically to moment).

---

## 3. Trap Three: Duplicate Dependencies 👯‍♂️⚠️

This trap is incredibly sneaky and is almost impossible to spot without the X-Ray machine!
Imagine you install a library for displaying Charts, and another library for printing PDF receipts. 

When you open the Bundle Analyzer, you might be shocked to find **TWO** blocks for React! Or two different blocks for a single utility library!

* **The Cause:** The PDF library uses an old version of a utility, while the Chart library uses a newer version. The engine ends up downloading both versions simultaneously, doubling your app's weight!
* **The Solution:** Use tools like `npm dedupe` or review your `package.json` to unify versions and force the project to resolve to a single version.

---

## 📋 Practical Summary: How to smartly read a Treemap?

When you run `npm run build` and Vite opens the visual map, train your eyes for this quick check:

| What you see in the Map | Architectural Diagnosis | Immediate Action Required |
| --- | --- | --- |
| **One massive block (Over 500KB)** | The page is not split properly. | Use `React.lazy` to separate heavy components from the main page. |
| **A massive `lodash` or `icons` block** | Tree Shaking failure. | Change the `import` method to point directly to the function/icon path. |
| **Two blocks of the same library** | Duplicate Dependencies. | Unify versions in `package.json` and clean packages. |

---

With this analytical weapon, you are no longer just building code that works; you are building **agile, healthy code** free of any dead weight, ensuring the absolute fastest user experience for the doctors in your clinic! 💪💎


# Lesson 5: Debouncing Inputs

## What is Debouncing?
In electronics, when you press a physical button, it might physically "bounce" and send 5 signals in a single millisecond instead of 1. Debouncing is the process of ignoring the extra signals until the bouncing stops.

In React, we use Debouncing to protect our servers. If a doctor is searching for a patient and types "A-h-m-e-d", that is 5 keystrokes. Without debouncing, React would send 5 separate database queries!

## How it works in `useDebounce.ts`
Debouncing works by setting a timer (`setTimeout`). 
When the user types 'A', we start a 600ms timer.
If they type 'h' before the 600ms is up, we **cancel** the first timer (`clearTimeout`) and start a new 600ms timer.

The API call is only made when the user finally *stops typing* for 600ms.

## Real World Application
Look at `PatientSearchBox.tsx`. We maintain two separate states:
1. **`instantSearch`**: This updates immediately on every keystroke. It is bound to the `<input>` so the UI feels perfectly fast and responsive to the user.
2. **`debouncedSearch`**: This is the delayed value. We use a `useEffect` to watch *this* value and trigger our API calls.

This pattern is an absolute requirement for any modern search bar or autocomplete feature!


# Lesson 6: Throttling Events

## Debouncing vs Throttling
While they both restrict how often a function runs, they have different goals:
- **Debouncing**: "Wait until the user completely *stops* doing the action for X milliseconds, then run it once." (Great for typing).
- **Throttling**: "The user is doing an action continuously. Force the function to run at a strict, steady rhythm (e.g., exactly once every 300ms) while the action is happening." (Great for scrolling or resizing).

## The Scroll Problem
If you listen to the window's `scroll` event, the browser will fire that event hundreds of times per second as the user moves their mouse wheel. 
If your event handler does heavy DOM calculations (like calculating scroll progress), the browser will freeze and stutter.

## The Throttling Solution
In `PatientMedicalRecord.tsx`, we use `lodash/throttle` to create a "regulator valve":

```typescript
const handleScroll = throttle(() => {
  // Heavy DOM calculations...
}, 300);
```

No matter how furiously the doctor scrolls through the medical record, our calculation will only execute a maximum of roughly 3 times per second. The browser breathes easily, and the UI remains buttery smooth.


# Lesson 7: Image Optimization

## The Heaviest Asset
Images are often the heaviest assets on any webpage. A single unoptimized banner image can be larger than your entire React JavaScript bundle!
While frameworks like Next.js provide an `<Image>` component to handle this automatically, in pure React (Vite), we must handle it manually using modern HTML5 features.

## Pure React Optimization Techniques
Open `OptimizedFrameImage.tsx` to see all of these features combined into one enterprise-grade component:

### 1. Modern Formats (`<picture>`)
Instead of serving a heavy `.jpg`, we use the `<picture>` tag to serve Next-Gen formats.
- **AVIF**: The best compression currently available.
- **WebP**: A great fallback if the browser doesn't support AVIF.
- **JPG**: The absolute last resort for ancient browsers.

### 2. CLS Prevention (`width` and `height`)
Cumulative Layout Shift (CLS) happens when an image suddenly loads and pushes all the text down. By explicitly defining `width` and `height` attributes, the browser reserves the exact empty space for the image *before* it even downloads, keeping the page layout perfectly stable.

### 3. Native Lazy Loading (`loading="lazy"`)
We no longer need heavy JavaScript libraries to lazy-load images! By simply adding `loading="lazy"`, the browser will refuse to download the image if it is buried at the bottom of the page, saving massive amounts of bandwidth.

### 4. Async Decoding (`decoding="async"`)
When an image arrives, the processor has to decode it. This can freeze the main thread. Setting `decoding="async"` tells the browser to decode the image in the background, ensuring the UI (like scrolling or clicking buttons) remains responsive.


