# Lesson 4: User Interaction

## Simulating the User
Rendering a component and checking if text exists is a great start, but modern web apps are highly interactive. Users click buttons, type in fields, and press keyboard shortcuts.

To test these interactions, we use `@testing-library/user-event`.

## `userEvent` vs `fireEvent`
You might see older tutorials using `fireEvent.click()`. 
`fireEvent` is a low-level tool that simply triggers a DOM event.

**`userEvent`** is much more advanced. When you call `userEvent.type()`, it doesn't just change the input value. It triggers a `keyDown`, `keyPress`, `input`, and `keyUp` event—exactly simulating what a real human does when typing on a physical keyboard.

## Key Interactions in `OptometryPatientSearch.test.tsx`

1. **Setup**: We always initialize it first: `const user = userEvent.setup();`
2. **Typing**: `await user.type(inputField, "Ahmed Mahmoud")` simulates a user typing characters one by one.
3. **Keyboard Keys**: You can simulate pressing special keys using bracket notation: 
   - `await user.type(inputField, "{Enter}")` simulates hitting the Return/Enter key.
   - `await user.keyboard("{Escape}")` simulates hitting the Escape key.

Notice that all `userEvent` actions are asynchronous (`await`). This is because React needs time to process the state changes and re-render the virtual DOM between keystrokes!
