import { Product } from "../store/product.type"

export interface Basket {
    [key: number]: number
}

export function basketAddProduct(product: Product, quantity: number) {
    const basket = basketGetAllProduct()
    if (basket[product.id]) {
        basket[product.id] += quantity
    } else {
        basket[product.id] = quantity
    }
    localStorage.setItem('basket', JSON.stringify(basket))
}

export function basketGetProductCount(): number {
    const basket = basketGetAllProduct()
    const values = Object.values(basket) as number[]
    return values.reduce((accumulator, current) => accumulator + current, 0)
}

export function basketGetAllProduct(): Basket {
    const basketStorage = localStorage.getItem('basket')
    const basket = (JSON.parse(basketStorage) || {}) as Basket
    return basket
}