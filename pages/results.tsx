import React, { useEffect, useState } from 'react';
import { Basket, basketGetAllProduct } from '../controller/basket';

const Results = () => {
  const [basket, setBasket] = useState({} as Basket);

  useEffect(() => {
    //Get all Product
    setBasket(basketGetAllProduct())
}, []);

  return (
    <div>
      <h1>Shopping Cart Items</h1>
      <ul>
      {Object.keys(basket).map((productId) => (
          <li key={productId}>
            Product ID: {productId}, Quantity: {basket[productId]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;