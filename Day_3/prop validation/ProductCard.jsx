// =========================================================================
// File: ProductCard.jsx (A strictly validated and protected component)
// =========================================================================
import React from 'react';
import PropTypes from 'prop-types'; // 1. Importing the security guard!

// 2. The Functional Component definition:
const ProductCard = ({ title, price, inStock, tags, onAddToCart, children }) => {
  return (
    <div className="product-card border p-4 rounded shadow">
      <h2>{title}</h2>
      <p className="text-lg font-bold">${price}</p>
      
      <div className="status">
        {inStock ? "🟢 Available in store" : "🔴 Out of stock"}
      </div>

      <ul className="tags-list flex gap-2 my-2">
        {tags.map((tag, index) => (
          <li key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">{tag}</li>
        ))}
      </ul>

      {/* The optional children slot */}
      <div className="extra-info my-2">{children}</div>

      <button className="bg-blue-600 text-white p-2 rounded" onClick={onAddToCart}>
        Add to Cart 🛒
      </button>
    </div>
  );
};

// 3. THE SECURITY CHECKPOINT: Defining validation rules for every single prop!
ProductCard.propTypes = {
  // Title MUST be a string, and it is MANDATORY (isRequired):
  title: PropTypes.string.isRequired,
  
  // Price MUST be a number, and it is MANDATORY:
  price: PropTypes.number.isRequired,
  
  // inStock MUST be a boolean, but it is OPTIONAL (no isRequired):
  inStock: PropTypes.bool,
  
  // tags MUST be an array, and it is MANDATORY:
  tags: PropTypes.array.isRequired,
  
  // onAddToCart MUST be a function, and it is MANDATORY:
  onAddToCart: PropTypes.func.isRequired,
  
  // children can be any renderable React content (text, JSX, elements):
  children: PropTypes.node
};

export default ProductCard;