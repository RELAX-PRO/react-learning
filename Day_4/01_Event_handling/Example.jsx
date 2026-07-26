import React from "react";

const Example = () => {
return(
// Important: Do NOT invoke the function with parentheses!
<button onClick={handleDelete(product.id)}>
  Delete Item 
</button>
)   
return (
// Recommended Approach: Wrap the function call inside an arrow function!
<button onClick={() => handleDelete(product.id)}>
  Delete Item 
</button>)}
