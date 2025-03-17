'use client'
import { useState } from "react"

// Components
import { ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

// type
import { Product } from "@/utils/global"

// store
import { useCartStore } from "@/stores"

// server action
//import { authAction } from "@/app/actions/users"


export default function AddCart({ product} : { product: Product}) {

    const [value, setValue] = useState<string>("")

    const { cartList, addToCart, isItemInCart, updateQuantity } = useCartStore()
    
    

    const handleChange = (value: string) => {
        setValue(value)
    }

    const handleAddToCart = () => {
        const index = isItemInCart(product.name, value)
        if(index < 0) {
            addToCart({product, selectedVariant: value, quantity: 1})
        } else {
            updateQuantity(index, cartList[index].quantity + 1)
        }
        toast(`${product.name} added to cart`)
        setValue("")
    }

    return (
        <div className="w-80 py-12">
            <h3>Select</h3>
            <ToggleGroup value={value} type='single' onValueChange={handleChange} className="justify-start py-6 border-b" variant="outline">
                {
                    product.variant.map((item, index) => (
                        <ToggleGroupItem value={item} key={index} className="px-4 bg-slate-50 mr-3">{item}</ToggleGroupItem> 
                    ))
                }
            </ToggleGroup>

            <h3>Price</h3>
            <p className="text-2xl font-bold text-red-400 mb-6">${product.price}</p>
            <Button disabled={value ? false : true} onClick={handleAddToCart}>Add ot cart</Button>
        </div>  
    )

}