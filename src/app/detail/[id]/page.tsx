import Image from "next/image"

import AddCart from "@/components/AddCart"

import { productAction, productsAction } from "@/app/actions/products"


export async function generateStaticParams() {
    const res = await productsAction()
    return res.data.map((product) => {
        return {
            id: product.id.toString()
        }
    })
}


export default async function Page({ params} : { params: Promise<{id: string}>}) {
    const { id } = await params

    const res = await productAction(Number(id))

    

    const product = res.data
    return (
        <div className="container flex py-6">
            <div className="w-64">
                <h2 className="font-sans text-3xl leading-10 font-bold my-8">{product.name}</h2>
                <p className="leading-10">{product.description}</p>
            </div>
            <div className="h-[500px] flex-1 mx-10 bg-slate-50 p-4 rounded-lg shadow-md relative">
                <Image src={product.image} alt={product.name} priority width={300} height={300} style={{objectFit: 'cover'}} />
            </div>
            <div className="w-80">
                <AddCart product={product} />
            </div>
        </div>
    )
}