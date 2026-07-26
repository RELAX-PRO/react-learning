# Async / Await

`async` and `await` are extensions of Promises that allow you to write asynchronous code that looks and behaves like synchronous code, making it significantly easier to read and maintain.

## Pros & Cons

**Pros:**
- Makes asynchronous code look sequential and linear, improving readability and maintainability.
- Allows the use of standard `try/catch` blocks for intuitive and robust error handling.
- Eliminates the need for complex `.then()` and `.catch()` chains.

**Cons:**
- Requires understanding that it still runs on Promises under the hood; an unhandled rejection in an `async` function still causes issues.
- Using `await` sequentially when operations could be run in parallel (e.g. `Promise.all()`) can lead to performance bottlenecks.
