import React from "react";

/**
 * MECHANICS: Event Handling in React
 * When passing event handlers to elements in React (like an onClick on a button),
 * it is crucial to pass the function reference, NOT invoke the function immediately.
 * Invoking the function immediately (e.g., handleDelete(product.id)) causes it to execute 
 * during the initial render phase, which often leads to infinite rendering loops if it 
 * updates state. Wrapping it in an arrow function (() => handleDelete(product.id)) 
 * delays the execution until the actual event occurs.
 */
const Example = () => {
return(
// Important: Do NOT invoke the function with parentheses!
// The expression below executes immediately during render because of `()`.
<button onClick={handleDelete(product.id)}>
  Delete Item 
</button>
)   
return (
// Recommended Approach: Wrap the function call inside an arrow function!
// This defines an anonymous function that React will call only when clicked.
<button onClick={() => handleDelete(product.id)}>
  Delete Item 
</button>)}
