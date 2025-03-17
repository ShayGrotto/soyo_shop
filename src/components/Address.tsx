"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// component
import {
  AlertDialog,
  //AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";

// server action
import { addAddressAction, deleteAddressAction } from "@/app/actions/addresses";

// type
import { AddressType } from "@/utils/global";

// validation
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  address: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  phone: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
});

export default function Address({ userid, addressData }: { userid: number; addressData: AddressType[] }) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      city: "",
      address: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // // Do something with the form values.
    // // ✅ This will be type-safe and validated.
    console.log(values);

    await addAddressAction(
      values.username,
      values.city,
      values.address,
      values.phone,
      userid
    );
    setOpen(false);
    form.reset();
  }

  const handleDelete = async (id: number) => {
    await deleteAddressAction(id);
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-6 mb-4">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <div className="border rounded-mb h-40 cursor-pointer relative text-slate-600">
            <p className="m-3">New address</p>
            <div className="absolute bottom-2 left-3">
              <Plus width={14} />
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Place add a address follow the from?
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Place name here" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Place city here" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Place address here" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Place phone here" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button type="submit">Save</Button>
                </AlertDialogFooter>
              </form>
            </Form>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      {
        addressData.map((item) => (
          <div key={item.id} className="border rounded-sm h-40 relative text-slate-600">
            <p className="m-3">{item.name}</p>
            <div className="text-sm ml-5">
              <p>{item.city}</p>
              <p>{item.address}</p>
              <p>{item.phone}</p>
            </div>

            <div className="absolute bottom-2 left-3 flex text-xs gap-2">
                <div className="flex items-center cursor-pointer"><Edit width={14}/>Edit</div>
                <div className="flex items-center cursor-pointer" onClick={() => handleDelete(item.id)}><Trash2 width={14}/>Remove</div>
            </div>
          </div>
        ))
      }
    </div>
  );
}
