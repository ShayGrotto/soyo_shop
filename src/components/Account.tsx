'use client'


import { JwtPayload } from "jsonwebtoken"
import { useRouter } from "next/navigation"

// component
import { Button } from "./ui/button"

import Address from "@/components/Address"

// server action
import { logoutAction } from "@/app/actions/users"

import { AddressType } from "@/utils/global"

export default function Account({ authData, addressData}: { authData: JwtPayload, addressData: AddressType[] }) {


    const router = useRouter()
    const handleClick = async () => {
        const res = await logoutAction()
        if(res.status == 200) {
            router.refresh()
        }
    }

    // console.log(authData.name)
    // console.log(authData.email)

    return (
        <div className="container1 py-10">
            <div className="border-b py-4">
                <h2 className="text-lg leading-10 font-bold">Account</h2>
                <div className="flex justify-between items-center">
                    <div>
                        <p>Hello: {authData.username}</p>
                        <p>Sing as {authData.email}</p>
                    </div>

                    <Button onClick={handleClick}>Login out</Button>

                </div>
            </div>

            <div className="border-b py-4">
                <h2 className="text-lg leading-10 font-bold">Address</h2>
                <div>
                    <p>Address: {authData.address}</p> 
                    <p>Phone: {authData.phone}</p>
                </div>
                <Address userid={authData.userid} addressData={addressData} />
            </div>

            <div className="py-10">
                <h2 className="text-lg leading-10 font-bold">Others</h2>
                {/* TODO :  add ORDER */}
            </div>
        </div>

    )
}