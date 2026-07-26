# 05. Error Handling

> **💡 How to Imagine This:**
> Think of this like the dashboard warning lights in your car. Instead of the car just silently refusing to start, it clearly tells you if you're out of gas (404 Not Found), have engine trouble (500 Server Error), or if the road is washed out (Network Failure). It might even give you a button to "Try starting again" (Retry mechanism).


This section details advanced error handling strategies when making network requests in React, focusing on categorizing errors (Network, 404, 500) and providing actionable UI recovery options like a Retry button.

## Pros & Cons

**Pros:**
- Prevents the application from crashing silently on network failures.
- Categorizing errors allows for precise user feedback (e.g., "Check internet" vs "Server is down").
- Adding retry mechanisms improves overall UX by keeping the user in control.

**Cons:**
- Requires writing and maintaining more boilerplate code (handling try/catch, distinguishing error types).
- Improper error handling can accidentally expose sensitive backend stack traces to the client.