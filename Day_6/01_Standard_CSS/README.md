# Standard CSS

> **💡 How to Imagine This:**
> Think of Standard CSS like shouting rules into a crowded room. Everyone (every component) can hear what you're saying. If you shout "Make all buttons red!", every button in the room turns red, whether you meant them to or not.

Standard CSS uses simple .css files imported into React components. It relies on global scope and standard CSS syntax.

## Pros & Cons

**Pros:**
- Simple to learn and use.
- No build step required natively.
- Easy to copy-paste snippets.

**Cons:**
- Global namespace can lead to class name collisions.
- Harder to maintain as the project scales.
- Lack of built-in dead code elimination.
