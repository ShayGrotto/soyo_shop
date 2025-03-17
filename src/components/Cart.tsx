"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { MoveUpRight, Trash2 } from "lucide-react";

import { useCartStore } from "@/stores";

import { useMemo } from "react";

export default function Cart({ status }: { status: number }) {
  const { cartList, removeFormCart, updateQuantity } = useCartStore();

  const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleRemoveItem = (index: number) => {
    removeFormCart(index);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    updateQuantity(index, quantity);
  };

  const total = useMemo(() => {
    return cartList.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }, [cartList]);

  return (
    <div className="container">
      {cartList.length ? (
        <div className="py-24 px-2 flex">
          <div className="flex-1 mr-14">
            <h2 className="text-2xl font-bold">Cart</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[400px]">Item</TableHead>
                  <TableHead className="w-[300px]">Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
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
                    <TableCell>
                      <Trash2
                        className="mr-1"
                        color="gray"
                        cursor="pointer"
                        onClick={() => handleRemoveItem(index)}
                      />
                      <Select
                        value={item.quantity.toString()}
                        onValueChange={() =>
                          handleUpdateQuantity(
                            index,
                            parseInt(item.quantity.toString())
                          )
                        }
                      >
                        <SelectTrigger className="w-14">
                          <SelectValue placeholder="Place select quantity" />
                        </SelectTrigger>

                        <SelectContent>
                          {quantityOptions.map((quantity) => (
                            <SelectItem
                              key={quantity}
                              value={quantity.toString()}
                            >
                              {quantity}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>${item.product.price}</TableCell>
                    <TableCell className="text-right">
                      ${item.product.price * item.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="w-56">
            <h2 className="text-2xl font-medium flex flex-row mb-6">Total</h2>
            <p className="text-2xl font-bold text-red-400 mb-6">${total}</p>
            {status === 200 ? (
              <Link href="/checkout">
                <Button className="w-full">Checkout</Button>
              </Link>
            ) : (
              <>
                <Link href="/account">
                  <Button className="w-full">Login</Button>
                </Link>
                <p className="text-sm text-slate-500 text-center mt-1">
                  You need login to checkout
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="py-48 px-2">
          <h2 className="text-2xl font-bold">Cart</h2>
          <p className="text-sm w-[400px] mb-6 mt-4">
            You don`&apos`t have anything in your cart, Let`&apos`s change that,
            use the link below to start browsing our product
          </p>
          <div className="flex text-sm items-center underline text-orange-400">
            <Link href="/">Start Shopping</Link>
            <MoveUpRight />
          </div>
        </div>
      )}
    </div>
  );
}
