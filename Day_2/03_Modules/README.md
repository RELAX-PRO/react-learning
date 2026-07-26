# Modules

ES6 Modules allow you to split your JavaScript code into multiple files. You can export variables, functions, and classes from one file and import them into another.

## Pros & Cons

**Pros:**
- Encourages separation of concerns by keeping files small and focused on specific functionality.
- Avoids polluting the global namespace, reducing variable naming collisions.
- Essential for modern frameworks like React to build encapsulated, reusable components.

**Cons:**
- Requires a build step (like Webpack or Vite) or specific server configurations to work properly in older environments.
- Managing long import paths in complex file structures can become tedious without absolute path configurations.
