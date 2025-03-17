"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// types
import { AddressType } from "@/utils/global";

// components
import { ArrowUpRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// store
import { useCartStore } from "@/stores";

export default function Checkout({
  addressesData,
}: {
  addressesData: AddressType[];
}) {

  const [addressValue, setAddressValue] = useState('');

  const { cartList } = useCartStore();

  return (
    <>
      {/* Address */}
      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">Address</h2>
        {addressesData.length === 0 ? (
          <div className="my-2">
            <p> You don`&apos`t have a address yet</p>
            <div className="flex text-orange-400 text-sm items-center underline">
              <Link href="/account"></Link>
              <ArrowUpRight width={18} />
            </div>
          </div>
        ) : (
          <div>
            <Select value={addressValue} onValueChange={setAddressValue}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a address" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Addresses</SelectLabel>
                  {addressesData.map((address) => (
                    <SelectItem key={address.id} value={address.id.toString()}>
                      <h3 className="font-bold m-2">{address.name}</h3>
                      <p className="mx-5">City:{address.city}</p>
                      <p className="mx-5">Address:{address.address}</p>
                      <p className="mx-5">Phone:{address.phone}</p>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Cart */}
      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">Cart</h2>
        {cartList.length === 0 ? (
          <div className="my-2">
            <p>You don`&apos`t have a good</p>
            <div className="flex text-orange-400 text-sm items-center underline">
              <Link href="/">Shop Now</Link>
              <ArrowUpRight width={18} />
            </div>
          </div>
        ) : (
          <div>
            <Table>
              <TableCaption>A list of your recent add to cart</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          style={{
                            width: "64px",
                            height: "64px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="ml-4 space-y-3">
                          <p className="text-sm font-medium">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.selectedVariant}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.product.price}</TableCell>
                    <TableCell className="text-right">${item.product.price * item.quantity}</TableCell>
                  </TableRow>
                ))}
               
              </TableBody>
              <TableFooter>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                    ${
                        cartList.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
                    }
                </TableCell>
              </TableFooter>
            </Table>
          </div>
        )}
      </div>

      {/* Payment */}
      <div>
        {/* <h2 className="text-lg leading-10 font-bold">Payment</h2> */}
        <Button disabled={!addressValue && !cartList}>Payment</Button>
      </div>
    </>
  );
}
