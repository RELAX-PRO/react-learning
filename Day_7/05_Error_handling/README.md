# 05. Error Handling

This section details advanced error handling strategies when making network requests in React, focusing on categorizing errors (Network, 404, 500) and providing actionable UI recovery options like a Retry button.

## Pros & Cons

**Pros:**
- Prevents the application from crashing silently on network failures.
- Categorizing errors allows for precise user feedback (e.g., "Check internet" vs "Server is down").
- Adding retry mechanisms improves overall UX by keeping the user in control.

**Cons:**
- Requires writing and maintaining more boilerplate code (handling try/catch, distinguishing error types).
- Improper error handling can accidentally expose sensitive backend stack traces to the client.