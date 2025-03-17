import Cart from "@/components/Cart";

// actions
import { authAction } from "../actions/users";

export default async function Page() {

    const  auth  = await authAction()

    return (
        <Cart status={auth.status} />
    )
}