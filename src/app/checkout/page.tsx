// components
import Checkout from "@/components/Checkout"

// action
import { authAction } from "../actions/users"
import { addressAction } from "../actions/addresses"

import { redirect } from "next/navigation"

export default async function Page() {

    const auth = await authAction()
    if(auth.status !== 200) {
        redirect("/account")
    }

    const address = await addressAction(auth.data?.userid)

    return (
        <div className="container1">
            <Checkout addressesData={address.data}/>
        </div>

    )
}