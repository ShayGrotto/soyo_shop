
// component
import Account from "@/components/Account"
import NotAccount from "@/components/NotAccount"

// server action
import { authAction } from "../actions/users"
import { addressAction } from "../actions/addresses"

// import { NotAccountType } from "@/utils/global"
export default async function Page() {

    const auth = await authAction()
    const address = await addressAction(auth.data?.userid)

    return (
       <>
         {
            auth.status === 200 && auth.data ? <Account authData={auth.data} addressData={address.data}/> : <NotAccount />
         }
       </>
    )
}