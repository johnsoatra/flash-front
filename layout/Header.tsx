'use client';
import Product from "@/assets/svg/product";
import Badge from "@/components/Badge";
import { useMainContext } from "@/context/mainContext";
import { useEffect } from "react";

export default function Header() {
  const context = useMainContext();
  console.log('context', context);
  // useEffect(() => {
  //   console.log('context', context);
  // }, [context]);
  return (
    <header
      className="w-full min-h-18 flex items-center justify-center bg-back border-b">
      <div className="flex items-center justify-between gap-x-1.5">
        <h2 className="font-bold text-[2rem] tracking-[25%]">FLASH</h2>
        {/* {context.lastCardCode && <div className="relative">
          <Product />
          <Badge amount={1} />
        </div>} */}
      </div>
    </header>
  );
}
