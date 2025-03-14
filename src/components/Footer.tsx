import React from "react";
import { Separator } from "@/components/ui/separator";

import { Title, NavList } from "@/lib/constants";

export default function Footer() {
  return (
    <div className="border-t my-6">
      <div className="container py-32 flex justify-between">
        <h1 className="text-2xl">{Title}</h1>

        <div className="flex gap-10">
          {NavList.map((item, index) => (
            <React.Fragment key={index}>
              {index !== 0 && <Separator orientation="vertical" />}
              <div key={item.title}>
                <span>{item.title}</span>
                <ul className="m-4 space-y-3">
                  {item.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
