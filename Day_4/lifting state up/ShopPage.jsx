// =========================================================================
// File 3: ShopPage.jsx (The Closest Common Ancestor - THE BOSS)
// =========================================================================
import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import ProductCard from './ProductCard.jsx';

const ShopPage = () => {
  // 1. WE LIFTED THE STATE UP TO HERE! This is the central water tank:
  const [cartCount, setCartCount] = useState(0);

  // Sample static data:
  const productsList = [
    { id: 1, name: "Mechanical Keyboard", price: 120 },
    { id: 2, name: "Wireless Mouse", price: 60 },
    { id: 3, name: "4K Monitor", price: 350 }
  ];

  // 2. The Parent owns the update logic:
  const handleAddItemToCart = (addedProduct) => {
    console.log(`Adding [${addedProduct.name}] to central cart...`);
    setCartCount(prev => prev + 1); // Safe functional update!
  };

  return (
    <div className="shop-container min-h-screen bg-gray-100">
      
      {/* 3. PIPE 1: Pass the READ value down to Sibling 1 (Navbar) */}
      <Navbar cartItemsCount={cartCount} />

      {/* 4. PIPE 2: Pass the UPDATE callback down to Sibling 2 (ProductCards) */}
      <main className="p-8 grid grid-cols-3 gap-6">
        {productsList.map(item => (
          <ProductCard 
            key={item.id} 
            product={item} 
            onAddToCart={handleAddItemToCart} 
          />
        ))}
      </main>

    </div>
  );
};

export default ShopPage;