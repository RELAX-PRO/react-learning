# Nested Routes

This folder shows how layouts can contain child routes.

## What to learn

- Parent and child route structure
- Shared layout rendering

## Key idea

- The parent route renders the layout that stays on screen.
- Child routes render inside that layout through an Outlet.
- The `index` child is the default page when the parent path matches exactly.

## Why it matters

- Nested routes keep shared UI in one place.
- They let you build dashboard-style pages with tabs or subpages.
- They avoid repeating the same layout code on every screen.

## Practice checklist

- Build one nested route pair