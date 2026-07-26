# Navigation

> **💡 How to Imagine This:**
> Think of React Router navigation like a train system in a city. The URLs are the train tracks, the components are the stations, and the Router is the conductor making sure you arrive at the correct destination without ever having to leave the train (reload the page)!

This day teaches routing in React applications and how users move between screens.

## Learning order

1. Route definitions
2. Nested routes
3. Link navigation
4. Programmatic navigation
5. Route parameters
6. Query strings
7. Protected routes

## What to learn here

- How routes map URLs to screens
- How nested layouts work
- How to navigate with links and code
- How to read route params and query strings
- How to guard private pages

## Before you start

- A router is the system that decides which screen should appear for each URL.
- BrowserRouter is the wrapper that connects React Router to the browser address bar.
- Routes is the container that checks the URL and chooses the right Route.
- Route is the rule that says: when the URL matches this path, render this component.

## Practice checklist

- Create one route map
- Add one nested route
- Navigate with a link and with code
- Read one parameter from the URL

## Overview of React Router

**Pros:**
- Provides a standard way to implement routing in React applications.
- Supports both simple routing and complex nested layouts.
- Integrates well with the browser's history API.

**Cons:**
- Upgrades between major versions (e.g., v5 to v6) can introduce breaking changes and require significant refactoring.
- The concept of nested routing can be challenging for beginners to grasp initially.
