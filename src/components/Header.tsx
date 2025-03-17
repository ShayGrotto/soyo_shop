'use client'

import Link from "next/link";
import { Separator } from "@/components/ui/separator"

import { MenuList, Title } from "@/lib/constants"
import React,  { useMemo} from "react";

import { useCartStore } from "@/stores";

export default function Header() {

    const { cartList } = useCartStore()

    const total = useMemo(() => {
        return cartList.reduce((acc, item) => acc + item.quantity, 0)
    }, [cartList])

    return (
        <div className="h-16 px-10 border-b bg-white">
            <div className="container flex items-center justify-between h-full">
                <h1 className="text-2xl">
                    <Link href="/">{Title}</Link>
                </h1>

                <div className="flex justify-end space-x-4 text-sm h-1/3">
                    {
                        MenuList.map((item, index) => (
                            <React.Fragment key={index}>
                                { index !==0 && <Separator orientation="vertical"/>}
                                <Link href={item.href} >{item.name}</Link>
                            </React.Fragment>
                        ))
                    } 

                    { cartList.length ? '(' + total + ')': ""}
                </div>
            </div>
        </div>
    )
}