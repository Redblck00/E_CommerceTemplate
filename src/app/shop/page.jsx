"use client";
import { Suspense } from "react";
import  dynamic  from "next/dynamic";

const ShopClient = dynamic(() => import("./ShopClient"), {
  ssr: false,
});

export default function ShopPage() {
  return (
    <div className="w-full bg-white">

    <Suspense fallback={<div>Loading...</div>}>
      <ShopClient />
    </Suspense>
    </div>
  );
}
