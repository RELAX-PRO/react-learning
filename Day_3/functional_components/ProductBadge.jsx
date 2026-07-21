// File: ProductBadge.jsx
import React from 'react';

// Notice Rule 1: Starts with a Capital letter 'P'
// Notice: We use Object Destructuring ({ title, price, isOnSale }) directly in the parameters!
const ProductBadge = ({ title, price, isOnSale = false }) => {
  
  // You can write any pure JavaScript logic here before returning JSX:
  const finalPrice = isOnSale ? price * 0.8 : price;

  // Notice Rule 2: Everything is wrapped inside one main <div> root element
  return (
    <div className="product-card-container">
      <h2>{title}</h2>
      <p>Price: ${finalPrice}</p>
      {isOnSale && <span className="sale-tag">🔥 ON SALE!</span>}
    </div>
  );
};

// We export it so other files (like App.jsx) can import and render it!
export default ProductBadge;

console.log("ProductBadge component loaded successfully!" +ProductBadge({ title: "Sample Product", price: 19.99, isOnSale: true }));