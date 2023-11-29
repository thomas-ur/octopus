import React, { useEffect, useState } from 'react'
import ItemProduct from '../components/ItemProduct/ItemProduct'
import logo from '../public/octopus-logo.svg'

const Product = () => {
  return (
    <main>
      <div className='header-product'>
        <h1>
          <img src='/octopus-logo.svg' alt='Octopus Energy Logo' />
        </h1>
        <div className='basket'>
          <img src="/basket.svg" alt="basket" />
        </div>
      </div>
      <ItemProduct />
    </main>
  )
}

export default Product
