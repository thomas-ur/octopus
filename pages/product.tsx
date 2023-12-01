import React, { useState } from 'react'
import ItemProduct from '../components/itemProduct'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Product = () => {
  const [basketCount, setBasketCount] = useState(0)

  // Callback function to update the basket count
  const updateBasketCount = (count: number) => {
    setBasketCount(count)
  }

  return (
    <section className='background-product'>
      <div className='header-product'>
        <h1>
          <img src='/octopus-logo.svg' alt='Octopus Energy Logo' />
        </h1>
        <div className='basket'>
          {basketCount > 0 && (
            <span className='basket-count'>{basketCount}</span>
          )}
          <img src='/basket.svg' alt='basket' />
        </div>
      </div>
      <div className='product-slider'>
        <Slider>
          <ItemProduct updateBasketCount={updateBasketCount} />
        </Slider>
      </div>
      <div className='product-flex'>
        <ItemProduct updateBasketCount={updateBasketCount} />
      </div>
    </section>
  )
}

export default Product
