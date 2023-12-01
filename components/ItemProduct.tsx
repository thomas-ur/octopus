import React, { Fragment, useEffect, useState } from 'react'

export default function ItemProduct({ product, updateBasketCount }) {
  const [cart, setCart] = useState([product])
  const [quantity, setQuantity] = useState(1)

  // Function to add a product to the cart
  const addToCart = () => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    )

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart]
      updatedCart[existingProductIndex].quantity += 1
      setCart(updatedCart)
      setQuantity(updatedCart[existingProductIndex].quantity)
    } else {
      const updatedProduct = { ...product, quantity: 1 }
      setCart([...cart, updatedProduct])
      setQuantity(1)
    }
  }

  // Function to remove a product from the cart
  const removeFromCart = () => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    )

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart]
      updatedCart[existingProductIndex].quantity = Math.max(1, quantity - 1)
      setCart(updatedCart)
      setQuantity(updatedCart[existingProductIndex].quantity)
    }
  }

  // Function to format the price from product db.js
  const formatPrice = (priceInCents) => {
    const price = Math.floor(priceInCents / 100)
    const cents = priceInCents % 100
    return `${price},${cents}`
  }

  // Update basket count of the product.id selected in the basket in Product
  const addToBasket = () => {
    updateBasketCount(cart.length)
  }

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(storedCart)
    setQuantity(1);
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

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
              {product.power} W // Packet of {product.quantity}
            </h6>
          </div>
          <div className='container-flex'>
            <div className='product-price'>
              <h2>£ {formatPrice(product.price)}</h2>
            </div>
            <div className='product-buttons'>
              <button
                className={`product-buttons remove ${
                  quantity === 1 ? 'disabled' : ''
                }`}
                onClick={() => removeFromCart()}
                disabled={quantity === 1}>
                -
              </button>
              <p className='product-buttons-result' title='Current quantity'>
                {' '}
                <span>Qyt</span>
                {quantity}
              </p>
              <button
                className='product-buttons add'
                onClick={() => addToCart()}>
                +
              </button>
            </div>
          </div>
          <button
            className='product-add-basket'
            onClick={() => addToBasket()}>
            {' '}
            Add to cart
          </button>
        </div>
        <div className='product-container background'>
          <h2>Description</h2>
          <p>{product.description}</p>
        </div>
        <div className='product-container'>
          <h2>Specification</h2>
          <p>
            {' '}
            Brand <span>{product.brand}</span>
          </p>
          <p>
            {' '}
            Item weight <span>{product.weight}</span>
          </p>
          <p>
            {' '}
            Dimensions{' '}
            <span>
              {product.height} {product.width} {product.length}
            </span>
          </p>
          <p>
            {' '}
            Color <span>{product.colour}</span>
          </p>
        </div>
        <div className='product-container background notabene'>
          <p>
            Octopus Energy Ltd is a company registered in England and Wales.
            Registered number: 09263424. Registered office: 33 Holborn, London,
            ECIN 2HT. Trading office: 20-24 Broadwick Street, London, WIF 8HT
          </p>
        </div>
      </div>
    </Fragment>
  )
}
