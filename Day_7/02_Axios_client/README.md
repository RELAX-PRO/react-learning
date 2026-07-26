# 02. Axios Client

This section explains how to use Axios, a popular promise-based HTTP client, to fetch and send data in React. It covers configuring a centralized Axios instance with default settings and interceptors.

## Pros & Cons

**Pros:**
- Automatically parses JSON responses.
- Throws errors for HTTP error statuses (like 404, 500) natively, reducing boilerplate.
- Easy to configure default settings (e.g., Base URL, headers).
- Supports interceptors for request/response manipulation (e.g., adding auth tokens globally).
- Built-in protection against XSRF.

**Cons:**
- Adds an external dependency to your project, increasing bundle size.
- Fetch API is often sufficient for simpler applications, making Axios overkill in some scenarios.