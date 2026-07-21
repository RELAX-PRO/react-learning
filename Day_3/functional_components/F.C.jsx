// File: App.jsx
import React from 'react';
import ProductBadge from './ProductBadge.jsx'; // Importing our functional component!
import UserAvatar from './UserAvatar.jsx';

const App = () => {
  return (
    <main className="app-container">
      <h1>Welcome to Our Store</h1>
      
      {/* Rendering UserAvatar as a JSX Tag */}
      <UserAvatar imageUrl="https://github.com/majed.png" altText="Majed Profile" />

      {/* Rendering ProductBadge MULTIPLE times with completely different data! */}
      <div className="products-grid">
        <ProductBadge title="MacBook Pro M3" price={1999} isOnSale={false} />
        <ProductBadge title="Wireless Noise-Canceling Headphones" price={299} isOnSale={true} />
        <ProductBadge title="Mechanical Gaming Keyboard" price={150} isOnSale={true} />
      </div>
    </main>
  );
};

export default App;