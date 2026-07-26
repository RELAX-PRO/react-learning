# 03. Handling Promises

This section covers how to manage complex or multiple asynchronous operations using Promises, focusing specifically on `Promise.all` to perform concurrent data fetching.

## Pros & Cons

**Pros:**
- `Promise.all` allows multiple network requests to run concurrently instead of sequentially, significantly reducing loading times.
- State updates can be bundled together once all data is ready, preventing UI tearing or intermediate loading states.

**Cons:**
- "All or Nothing" behavior: If a single promise in `Promise.all` fails, the entire batch rejects. (Consider `Promise.allSettled` if you need partial successes).
- Launching too many heavy concurrent requests might overload the client or the server.