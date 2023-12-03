import React, { useEffect, useState } from 'react'
import ItemProduct from '../components/ItemProduct'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import db from '../server/db'
import Link from 'next/link'
import { basketGetProductCount } from '../controller/basket'

const Product = () => {
  const [products] = useState(db.products)
  const [basketCount, setBasketCount] = useState(0)

  // Callback function to update the basket count
  const updateBasketCount =() => {
    setBasketCount(basketGetProductCount())
  }

  useEffect(() => {
    setBasketCount(basketGetProductCount())
  }, [])

  return (
    <section className='background-product'>
      <div className='header-product'>
        <h1>
          <img src='/octopus-logo.svg' alt='Octopus Energy Logo' />
        </h1>
        <Link href='/results'>
          <div className='basket'>
            {basketCount > 0 && (
              <span className='basket-count'>{basketCount}</span>
            )}
            <img src='/basket.svg' alt='basket' />
          </div>
        </Link>
      </div>
      <div className='product-slider'>
        <Slider arrows={false}>
          {products &&
            products.map((product) => (
              <ItemProduct
                key={product.id}
                product={product}
                updateBasketCount={updateBasketCount}
              />
            ))}
        </Slider>
      </div>
      <div className='product-flex'>
        {products &&
          products.map((product) => (
            <ItemProduct
              key={product.id}
              product={product}
              updateBasketCount={updateBasketCount}
            />
          ))}
      </div>
    </section>
  )
}

export default Product
