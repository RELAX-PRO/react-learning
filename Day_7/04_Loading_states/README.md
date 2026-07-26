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