# Submission Handling

> **💡 How to Imagine This:**
> Imagine a mailroom clerk intercepting an outgoing package. Before the package goes on the delivery truck (browser default submission), the clerk stops it, checks if the postage is correct, and then hands it over to a specialized courier (API request).

Submission handling involves capturing form data, preventing default browser behavior, performing final validations, and communicating with an API.

## Pros & Cons

**Pros:**
- Centralized place to process form data before sending it to the server.
- Allows for handling loading states and asynchronous operations cleanly.
- Enables intercepting native form submissions to implement custom logic.

**Cons:**
- Requires manual prevention of default behavior (`e.preventDefault()`), which is easily forgotten.
- Managing complex submission states (loading, success, error) requires additional boilerplate unless using specialized form libraries.
