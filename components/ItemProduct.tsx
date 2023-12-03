import React, { Fragment, useState } from 'react'
import { basketAddProduct } from '../controller/basket'
import { Product } from '../store/product.type'
import classNames from 'classnames'

export default function ItemProduct({product, updateBasketCount,}: { product: Product, updateBasketCount: () => void }) {
  const [quantity, setQuantity] = useState(1)

  // Function to add quantity
  const addToCart = () => {
    setQuantity(quantity + 1)
  }

  // Function to remove quantity
  const removeFromCart = () => {
    const newQuantity = Math.max(0, quantity - 1)
    setQuantity(newQuantity)
  }

  // Function to format the price from product db.js
  const formatPrice = (priceInCents: number) => {
    const price = Math.floor(priceInCents / 100)
    const cents = priceInCents % 100
    return `${price},${cents}`
  }

  // Update basket count of the product.id selected in the basket in Product
  const addToBasket = () => {
    basketAddProduct(product, quantity)
    updateBasketCount()
  }

  return (
    <Fragment>
      <div className='product' key={product.id}>
        <div className='itemProduct'>
          <div className='product-image'>
            <img src={product.img_url} alt={product.name} />
          </div>
          <div className='product-title'>
            <h1>{product.name}</h1>
            <h6>
              {product.power} // Packet of {product.quantity}
            </h6>
          </div>
          <div className='container-flex'>
            <div className='product-price'>
              <h2>£ {formatPrice(product.price)}</h2>
            </div>
            <div className='product-buttons'>
              <button
                className={classNames('product-buttons', 'remove', {
                  disabled: quantity == 1,
                })}
                onClick={removeFromCart}
                disabled={quantity === 1}>
               <span>-</span> 
              </button>
              <p className='product-buttons-result' title='Current quantity'>
                <span>Qty</span>
                {quantity}
              </p>
              <button className='product-buttons add' onClick={addToCart}>
              <span>+</span> 
              </button>
            </div>
          </div>
          <button className='product-add-basket' onClick={addToBasket}>
            Add to cart
          </button>
        </div>
        <div className='product-container background'>
          <h2>Description</h2>
          <p>{product.description}</p>
        </div>
        <div className='product-container'>
          <h2>specifications</h2>
          <table className='product-specification'>
            <tbody>
              <tr>
                <td>
                  <span>Brand</span>
                </td>
                <td>
                  <span>{product.brand}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Item weight (g)</span>
                </td>
                <td>
                  <span>{product.weight}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Dimensions</span>
                </td>
                <td>
                  <span>{product.height} x {product.width} x {product.length}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Item Model number</span>
                </td>
                <td>
                  <span>{product.model_code} </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Color</span>
                </td>
                <td>
                  <span>{product.colour}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}
