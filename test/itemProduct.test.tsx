import { render, fireEvent, screen } from '@testing-library/react'
import ItemProduct from '../components/ItemProduct'


test('should be able to increase and decrease product quantity', async () => {
  const { getByText, getByTitle } = render(
    <ItemProduct  product={1} updateBasketCount={5} />
  )

  const increaseButton = getByText('+');
  const currentQuantity = getByTitle('Current quantity');

  expect(currentQuantity).toHaveTextContent('Qyt1');

  fireEvent.click(increaseButton);
  expect(currentQuantity).toHaveTextContent('Qyt1');

  const decreaseButton = getByText('-');

  fireEvent.click(decreaseButton);
  expect(currentQuantity).toHaveTextContent('Qyt1');
})

test('should be able to add items to the basket', async () => {
  const updateBasketCountMock = jest.fn()
  const { getAllByText } = render(
    <ItemProduct product={1} updateBasketCount={updateBasketCountMock} />
  )

  const increaseButtons = screen.getAllByText('+')
  fireEvent.click(increaseButtons[0])

  const addToCartButton = screen.getAllByText('Add to cart')
  fireEvent.click(addToCartButton[0])

  expect(updateBasketCountMock).toHaveBeenCalledWith(1)
})
