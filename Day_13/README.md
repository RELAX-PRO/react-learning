# Day 13: React Performance & Optimization

Welcome to **Day 13**! 🚀

As your React applications grow in complexity, they can become slow and sluggish. A slow app frustrates users and impacts your business. 
In this module, we focus exclusively on **Performance Optimization** using standard React APIs.

## What you will learn today:

1. **[Code Splitting](./01_Code_Splitting/README.md)**: How to break your massive `bundle.js` into smaller chunks so the user doesn't have to download the entire application on the first visit.
2. **[Lazy Loading](./02_Lazy_Loading/README.md)**: How to fetch heavy components (like a barcode scanner or a complex chart) *only* when the user actually needs them.
3. **[Memoization](./03_Memoization/README.md)**: How to prevent React from doing unnecessary math or re-rendering components that haven't actually changed using `React.memo`, `useMemo`, and `useCallback`.

> [!WARNING]
> Optimization comes with a cost (complexity and memory overhead). You should **never** optimize prematurely. Build your application first, measure its performance, and only apply these techniques where things are actually slow.
