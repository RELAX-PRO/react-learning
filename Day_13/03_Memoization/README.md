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
