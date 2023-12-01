import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Product from '../pages/product'

describe('Product Component', () => {
  it('renders well', () => {
    render(<Product />)

    const basketIcon = screen.getByAltText('basket')
    expect(basketIcon).toBeInTheDocument()
  })
})
