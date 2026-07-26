# 01. Fetch API

This section covers the basics of data fetching in React using the native browser `fetch` API. It demonstrates making GET requests to fetch data, making POST requests to send data, and handling the network requests using React state and effects.

## Pros & Cons

**Pros:**
- Built into modern browsers, so no additional dependencies are required.
- Standardized API with widespread support and understanding.
- Sufficient for small to medium-sized applications.

**Cons:**
- Requires manual parsing of JSON (`response.json()`).
- Error handling can be tricky since it only rejects on network failures, not on HTTP error statuses (like 404 or 500), which require manual checking of `response.ok`.
- Lacks advanced features like built-in request cancellation, interceptors, and automated retries out-of-the-box.