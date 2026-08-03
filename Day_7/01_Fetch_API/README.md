# 01. Fetch API

> **💡 How to Imagine This:**
> Think of `fetch` like ordering at a drive-thru. You place your order (make a request), wait in line (the promise), and receive a bag of food. But before you can actually eat, you have to manually unwrap the food (calling `response.json()`). You also have to check if they actually gave you what you wanted, because the drive-thru will only "fail" if the road is closed, not if they mess up your order.


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
