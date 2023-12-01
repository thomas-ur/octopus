import { render, fireEvent, screen, act } from '@testing-library/react'
import ItemProduct from '../components/itemProduct'

test('should be able to increase and decrease product quantity', async () => {
  const { getAllByText, getAllByTitle } = render(
    <ItemProduct updateBasketCount={0} />
  )

  const increaseButtons = screen.getAllByText('+')

  const currentQuantityElements = getAllByTitle('Current quantity')
  const currentQuantity = currentQuantityElements[0];
  expect(currentQuantity).toHaveTextContent('QYT0')

  fireEvent.click(increaseButtons[0])
  expect(currentQuantity).toHaveTextContent('QYT1')

  const decreaseQuantity = getAllByText('-')

  fireEvent.click(decreaseQuantity[0])
  expect(currentQuantity).toHaveTextContent('QYT0')
})

test('should be able to add items to the basket', async () => {
  const updateBasketCountMock = jest.fn()
  const { getAllByText } = render(
    <ItemProduct updateBasketCount={updateBasketCountMock} />
  )

  const increaseButtons = screen.getAllByText('+')
  fireEvent.click(increaseButtons[0])
  fireEvent.click(increaseButtons[0])
  fireEvent.click(increaseButtons[0])

  const addToCartButton = screen.getAllByText('Add to cart')
  fireEvent.click(addToCartButton[0])

  expect(updateBasketCountMock).toHaveBeenCalledWith(3)
})
