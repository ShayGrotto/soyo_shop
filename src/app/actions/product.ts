'use server'

import db from "@/lib/db"

import {Product, ProductsAction }from "@/utils/global"

export async function productsAction(): Promise<ProductsAction>  {
    const res = await db('SELECT * FROM products') as Product[]
    return {
        status: 200,
        body: 'get products successfully',
        data: res
    }
} 