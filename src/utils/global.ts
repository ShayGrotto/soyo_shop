export type SortValue = 'latest' | 'low' | 'high'

export type Product = {
    id: number
    name: string
    price: number
    description: string
    image: string
    variant: string[]
}

export type ProductsAction = {
    status: number
    body: string
    data: Product[]
}

export type ProductAction = {
    status: number
    body: string
    data: Product
}

export type CartItem = {
    product: Product
    quantity: number
    selectedVariant: string
}

export type NotAccountType = 'login' | 'register'

export type AddressType = {
    id: number
    userid: number
    city: string
    address: string
    phone: string
    name: string
}