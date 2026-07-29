# Lesson 4: Event Typing

## The Challenge with Events
Handling events (like typing in a text field, or clicking a submit button) in React involves dealing with the browser's Event objects. These objects contain hundreds of properties (`e.target.value`, `e.preventDefault()`, etc.). 

If you just type the event as `any`, you lose all auto-completion and safety.

## Using Built-in React Event Types
Look at `OptometrySearchForm.tsx`. We explicitly type our event handlers using React's provided types:

1. **`React.ChangeEvent<HTMLInputElement>`**: 
   - We use this for the `onChange` event of a text input.
   - By passing `<HTMLInputElement>`, TypeScript knows that `e.target` refers to an input field, which means it knows that `e.target.value` exists and is a string!
   
2. **`React.FormEvent<HTMLFormElement>`**:
   - We use this for the `<form onSubmit={...}>` event.
   - It grants safe access to `e.preventDefault()`, ensuring we don't accidentally reload the page.
   
3. **`React.MouseEvent<HTMLButtonElement>`**:
   - We use this for standard button clicks.

## Pro Tip
If you ever struggle to remember the exact name of a React Event type, simply hover over the `onChange` or `onSubmit` prop directly on the JSX element in VS Code, and TypeScript will reveal the exact event type it expects!
