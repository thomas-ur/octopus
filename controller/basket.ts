
export interface Basket {
    [key: number]: { quantity: number; name: string }
}

export function basketAddProduct(product, quantity) {
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
    console.log("basket = " + JSON.stringify(basket))
    return basket
}