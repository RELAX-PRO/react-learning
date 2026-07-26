# 04. Loading States

This section covers how to provide meaningful visual feedback while a React application is waiting for asynchronous operations to complete. It demonstrates the use of skeleton loaders to improve perceived performance.

## Pros & Cons

**Pros:**
- Enhances user experience by preventing layout shifts (Cumulative Layout Shift) when data arrives.
- Skeleton screens feel faster to users compared to blank screens or traditional spinner icons.

**Cons:**
- Requires creating and maintaining secondary "dummy" components that match the structure of the real UI.
- Overusing skeleton loaders for extremely fast requests might cause unpleasant screen flickering.