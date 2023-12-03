import { render, fireEvent, screen } from '@testing-library/react'
import ItemProduct from '../components/ItemProduct'

describe('<ItemProduct />', () => {
  const product = {
    id: 1,
    name: 'Product Name',
    power: 'Some Power',
    quantity: 1,
    img_url: 'https://example.com/image.jpg',
    price: 10.99,
    description: 'Product Description',
    brand: 'Product Brand',
    weight: 2.5,
    height: 10,
    width: 5,
    length: 15,
    colour: 'Cool daylight',
    model_code: 'E27 ES',
  }

  test('should be able to increase and decrease product quantity', async () => {
    const updateBasketCountMock = jest.fn()
    const { getByText, getByTitle } = render(
      <ItemProduct
        product={product}
        updateBasketCount={updateBasketCountMock}
      />
    )

    const increaseButton = getByText('+')
    const currentQuantity = getByTitle('Current quantity')

    expect(currentQuantity).toHaveTextContent('Qty1')

    fireEvent.click(increaseButton)
    expect(currentQuantity).toHaveTextContent('Qty2')

    const decreaseButton = getByText('-')

    fireEvent.click(decreaseButton)
    expect(currentQuantity).toHaveTextContent('Qty1')
  })

  test('should be able to add items to the basket', async () => {
    const updateBasketCountMock = jest.fn()
    const { getByText } = render(
      <ItemProduct
        product={product}
        updateBasketCount={updateBasketCountMock}
      />
    )

    const increaseButtons = screen.getByText('+')
    fireEvent.click(increaseButtons)

    const addToCartButton = screen.getByText('Add to cart')
    fireEvent.click(addToCartButton)

    expect(updateBasketCountMock).toHaveBeenCalledWith()
  })
})
