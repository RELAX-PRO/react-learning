# CSS Modules

> **💡 How to Imagine This:**
> Think of CSS Modules like writing a secret letter to a specific component. When you compile your code, it translates your class name into a unique, random secret code (like `.button_abc123`). This guarantees no other component can accidentally intercept or use your styles!

CSS Modules provide local scope by automatically generating unique class names. They are written in .module.css files.

## Pros & Cons

**Pros:**
- Prevents class name collisions by scoping styles locally.
- Easy integration with modern bundlers like Vite or Webpack.
- Familiar CSS syntax.

**Cons:**
- Syntax for importing and applying classes is slightly more verbose.
- Difficulty styling nested components conditionally without additional libraries.
