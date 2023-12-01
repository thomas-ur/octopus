import React, { useEffect, useState } from 'react';

const Results = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Charger les données du localStorage lorsque le composant est monté
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  return (
    <div>
      <h1>Shopping Cart Items</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            Product ID: {item.id}, Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;