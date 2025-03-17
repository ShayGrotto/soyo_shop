'use client'

import { useState } from "react"

import Login from "@/components/Login"
import Register from "@/components/Register"

import { NotAccountType } from "@/utils/global"
export default function NotAccount() {
    const [notAccountType, setNotAccountType] = useState<NotAccountType>("login")
    return (
        <div className="container1">
            {
                notAccountType === "login" ? <Login setNotAccountType={setNotAccountType}/> : <Register setNotAccountType={setNotAccountType}/>
            }
        </div>
    )
}
