'use server'

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

import { AddressType } from "@/utils/global"; 

export async function addAddressAction(username: string, city: string, address: string, phone: string, userid: number) {
    await db('INSERT INTO addresses (name, city, address, phone, userid) VALUES ($1, $2, $3, $4, $5)', [username, city, address, phone, userid])
    revalidatePath('/account')
    return { 
        status: 200,
        body: 'Address added successfully' 
    }   
}

export async function addressAction(userid: number) {
    const res = await db('SELECT * FROM addresses WHERE userid = $1', [userid]) as AddressType[]
    return {
        status: 200,
        body: 'get addresses successfully',
        data: res 
    }
}


export async function deleteAddressAction(id: number) {
    await db('DELETE FROM addresses WHERE id = $1', [id])
    revalidatePath('/account')
    return { 
        status: 200,
        body: 'Address deleted successfully' 
    }   
}