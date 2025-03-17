import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/utils/global';

type CartStore = {
    cartList: CartItem[]
    addToCart: (product: CartItem) => void
    removeFormCart: (index: number) => void
    isItemInCart: (name: string, selectedVariant: string) => number
    updateQuantity: (index: number, quantity: number) => void
}

const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            cartList: [],
            addToCart: (product) => set((state) => ({ cartList: [...state.cartList, product]})),
            removeFormCart: (index: number) => set((state) => { 
                 const newCartList = [...state.cartList]
                  newCartList.splice(index, 1)
                  return { cartList: newCartList}
            }),
            isItemInCart: (name: string, selectedVariant: string): number => {
                 return useCartStore.getState().cartList.findIndex((item: CartItem) => item.product.name === name && item.selectedVariant === selectedVariant)
             },
             updateQuantity: (index, quantity) => set((state) => {
                 const newCartList = [...state.cartList]
                 newCartList[index].quantity = quantity
                 // console.log(newCartList[index].quantity)
                 return { cartList: newCartList }
             })
                  
         }) , 
         {
             name: 'cart-storage'
         }
    )
)

export default useCartStore