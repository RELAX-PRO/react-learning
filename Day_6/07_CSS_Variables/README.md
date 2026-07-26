# CSS Variables

> **💡 How to Imagine This:**
> Think of CSS Variables like saving a contact in your phone. Instead of memorizing your friend's phone number and typing it every time (like a hardcoded color `#ff6347`), you save it as `var(--friend-number)`. If they get a new phone, you just update the contact once, and your phone automatically dials the new number everywhere!

CSS Variables (Custom Properties) allow defining reusable values for CSS styles, manageable dynamically in JavaScript and CSS.

## Pros & Cons

**Pros:**
- Native browser support without preprocessors.
- Can be updated dynamically via JavaScript or pseudo-classes (e.g., theming).
- Simplifies theme switching (e.g., dark/light mode).

**Cons:**
- Global scoping unless strictly managed at the component level.
- Not supported in legacy browsers (though rarely an issue today).
