# Controlled Components

> **💡 How to Imagine This:**
> Imagine a marionette puppet. Every movement it makes is directly controlled by the puppeteer (React state). The puppet can't move on its own; it only reflects the exact poses the puppeteer dictates.

Controlled components are form elements whose value is controlled by React state. The state becomes the "single source of truth" for the input, ensuring predictability.

## Pros & Cons

**Pros:**
- Complete control over input data and instant validation.
- Easy to enforce formats or limit characters during typing.
- State always represents the latest input, making it easy to pass data to other components.

**Cons:**
- Requires writing more boilerplate code (state hooks and onChange handlers).
- Can cause performance issues on very large forms if every keystroke triggers a complex re-render.