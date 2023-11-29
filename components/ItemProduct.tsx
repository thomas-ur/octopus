import React, { Fragment, useEffect, useState } from 'react'
import db from '../../server/db'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function ItemProduct({ updateBasketCount }) {
  const [products, setProducts] = useState(db.products)

  const [cart, setCart] = useState([])

  // Function to add a product to the cart
  const addToCart = (productId) => {
    const productToAdd = products.find((product) => product.id === productId)

    if (productToAdd) {
      setCart([...cart, productToAdd])
    }
  }

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    const index = cart.findIndex((product) => product.id === productId)
    if (index !== -1) {
      const updatedCart = [...cart.slice(0, index), ...cart.slice(index + 1)]
      setCart(updatedCart)
    }
  }

  // Function to format the price from product db.js
  const formatPrice = (priceInCents) => {
    const price = Math.floor(priceInCents / 100)
    const cents = priceInCents % 100
    return `${price},${cents}`
  }

  // Update basket count in the basket in Product
  const addToBasket = (basketCount) => {
    updateBasketCount(basketCount + 1)
  }

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(storedCart)
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <Fragment>
      <Slider arrows={false}>
        {products &&
          products.map((product) => (
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
                      className='product-buttons add'
                      onClick={() => addToCart(product.id)}>
                      +
                    </button>
                    <p className='product-buttons-result'>
                      {' '}
                      <span>QYT</span>
                      {cart.length}
                    </p>
                    <button
                      className='product-buttons remove'
                      onClick={() => removeFromCart(product.id)}>
                      -
                    </button>
                  </div>
                </div>
                <div className='product-add-basket'>
                  <button onClick={() => addToBasket(cart.length)}>
                    {' '}
                    Ajouter au panier
                  </button>
                </div>
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
                  Octopus Energy Ltd is a company registered in England and
                  Wales. Registered number: 09263424. Registered office: 33
                  Holborn, London, ECIN 2HT. Trading office: 20-24 Broadwick
                  Street, London, WIF 8HT
                </p>
              </div>
            </div>
          ))}
      </Slider>
    </Fragment>
  )
}