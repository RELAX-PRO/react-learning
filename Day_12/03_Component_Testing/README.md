# Lesson 3: Component Testing

## Testing the UI
Unit testing pure functions is easy, but how do we test a React component? Components return JSX, rely on DOM nodes, and react to user state.

To test them, we use **React Testing Library (RTL)** alongside our test runner.

## The RTL Philosophy
React Testing Library was built on a very specific philosophy:
> *"The more your tests resemble the way your software is used, the more confidence they can give you."*

This means we DO NOT test internal React state. We don't check if `useState` has the value `true`. Instead, we test what the **User sees**. We check if a button with the text "Apply Discount" is rendered on the screen.

## Core RTL Tools used in `OptometryDiscountCard.test.tsx`

1. **`render(<Component />)`**: This function creates a virtual DOM in memory and mounts your React component into it.
2. **`screen`**: This is your primary tool for querying the virtual DOM. It acts like the user's eyes.
3. **`screen.getByText()`**: Finds an element on the screen that contains specific text.
4. **`screen.getByRole()`**: The most recommended way to find elements. It finds elements by their accessible role (e.g., `getByRole('button', { name: /Apply/i })`). This ensures your app is also accessible to screen readers!
