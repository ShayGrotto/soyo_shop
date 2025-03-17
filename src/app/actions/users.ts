'use server'

import db from "@/lib/db"
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken"


// secret key
const SECRET_KEY ='SOYO_SHOP'

export async function loginAction(email: string, password: string) {
    const res = await db('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password])

    const cookie = await cookies()
    if(res.length === 0) {
        return {
            status: 401,
            body: 'Email or password is incorrect'
        } 
    } else {

        const token =  jwt.sign({ email, username: res[0].username, userid: res[0].id}, SECRET_KEY, { expiresIn: '1h' })
        cookie.set({
            name: 'token',
            value: token,
            path: '/',
            maxAge: 60 * 60 * 24 * 30 // 30days
        })

        return {
            status: 200,
            body: 'Login successfully'

        }
    }
   
}


export async function registerAction(email: string, username: string, password: string) {
    const res = await db('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password])
    if(res.length > 0) {
        return { 
            status: 401,
            body: 'Email has already been taken' 
        }
    } else {
        await db('INSERT INTO users (email, username, password) VALUES ($1, $2, $3)', [email, username, password])
        return {
            status: 200,
            body: 'Register successfully'
        }
    }

    
}


export async function authAction() {
    const cookie = await cookies()
    const token = cookie.get('token') 

    // console.log(token, 'token')

    try {
        if(!token) {
           return {
            status: 401,
            body: 'Unauthorized'
           } 
        }
        const decoded = jwt.verify(token.value, SECRET_KEY) as JwtPayload
        return {
            status: 200,
            body: 'success',
            data:decoded
        }
 
    } catch(err) {
        return {
            status: 401,
            body: `Unauthorized ${err}`
        }
    }
}

export async function logoutAction() {
    const cookie = await cookies()
    cookie.delete('token')
    return {
        status: 200,
        body: 'Logout successfully'
    }
}