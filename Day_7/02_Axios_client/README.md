# 02. Axios Client

> **💡 How to Imagine This:**
> Imagine Axios as a premium food delivery app. Unlike the basic drive-thru (`fetch`), this app automatically unpacks your food for you (auto-parses JSON) and immediately gives you a clear refund notification if the restaurant is closed or messes up the order (throws proper HTTP errors). You can even set default delivery instructions (interceptors) for every order you make.


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