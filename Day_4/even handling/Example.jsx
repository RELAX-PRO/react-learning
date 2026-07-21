import React from "react";

const Example = () => {
return(
// CRITICAL BUG: Do NOT invoke the function with parentheses!
<button onClick={handleDelete(product.id)}>
  Delete Item 🗑️
</button>
)   
return (
// PRO WAY: Wrap the function call inside an arrow function!
<button onClick={() => handleDelete(product.id)}>
  Delete Item 🗑️
</button>)}
