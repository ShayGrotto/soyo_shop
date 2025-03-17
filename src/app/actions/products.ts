'use server'

import db from "@/lib/db"

import {Product, ProductsAction, ProductAction }from "@/utils/global"

export async function productsAction(): Promise<ProductsAction>  {
    const res = (await db('SELECT * FROM products')) as Product[]
    return {
        status: 200,
        body: 'get products successfully',
        data: res
    }
} 


export async function productAction(id: number): Promise<ProductAction> {
    const res = (await db('SELECT * FROM products WHERE id = $1', [id])) as Product[]
    return {
        status: 200,
        body: 'get product successfully',
        data: res[0]
    }
}