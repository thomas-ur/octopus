import { render, fireEvent, screen } from '@testing-library/react'
import ItemProduct from '../components/ItemProduct'


test('should be able to increase and decrease product quantity', async () => {
  const updateBasketCountMock = jest.fn()
  const { getByText, getByTitle } = render(
    <ItemProduct  product={1} updateBasketCount={updateBasketCountMock} />
  )

  const increaseButton = getByText('+');
  const currentQuantity = getByTitle('Current quantity');

  expect(currentQuantity).toHaveTextContent('Qyt1');

  fireEvent.click(increaseButton);
  expect(currentQuantity).toHaveTextContent('Qyt2');

  const decreaseButton = getByText('-');

  fireEvent.click(decreaseButton);
  expect(currentQuantity).toHaveTextContent('Qyt1');
})

test('should be able to add items to the basket', async () => {
  const updateBasketCountMock = jest.fn()
  const { getByText } = render(
    <ItemProduct product={1} updateBasketCount={updateBasketCountMock} />
  )

  const increaseButtons = screen.getByText('+')
  fireEvent.click(increaseButtons)

  const addToCartButton = screen.getByText('Add to cart')
  fireEvent.click(addToCartButton)

  expect(updateBasketCountMock).toHaveBeenCalledWith()
})
