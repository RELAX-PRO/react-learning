// ❌ CRITICAL BUG: NEVER mutate props directly inside the child component!
const ProductCard = ({ price }) => {
  // Trying to modify the passed prop directly:
  price = price - 20; // This will break React's rendering flow and throw errors!
  
  return <div>Price: ${price}</div>;
};

// ✅ THE CORRECT WAY: If you need a modified value, store it in a brand new local variable!
const ProductCard = ({ price }) => {
  // Create a clean new variable based on the prop:
  const discountedPrice = price - 20; 
  
  return <div>Price: ${discountedPrice}</div>;
};