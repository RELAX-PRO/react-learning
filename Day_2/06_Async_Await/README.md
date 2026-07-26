# Async / Await

> **💡 How to Imagine This:**
> If a Promise is like holding a restaurant buzzer and waiting for it to go off, `async/await` is like hiring a personal assistant. You just tell them, "Wait here for the table to be ready, and let me know when it is," while you read a book. The code pauses on that exact line until the task finishes, making it read exactly like a normal, step-by-step to-do list.

`async` and `await` are extensions of Promises that allow you to write asynchronous code that looks and behaves like synchronous code, making it significantly easier to read and maintain.

## Pros & Cons

**Pros:**
- Makes asynchronous code look sequential and linear, improving readability and maintainability.
- Allows the use of standard `try/catch` blocks for intuitive and robust error handling.
- Eliminates the need for complex `.then()` and `.catch()` chains.

**Cons:**
- Requires understanding that it still runs on Promises under the hood; an unhandled rejection in an `async` function still causes issues.
- Using `await` sequentially when operations could be run in parallel (e.g. `Promise.all()`) can lead to performance bottlenecks.
