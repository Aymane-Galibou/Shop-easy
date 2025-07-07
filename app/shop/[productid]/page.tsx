import { cookies } from "next/headers";
import React from "react";
import ProductdetailsMain from "./Secondpage";

async function Productdetails({
  params,
  searchParams,
}: {
  params: Promise<{ productid: string }>;
  searchParams?: Promise<{ category?: string }>;
}) {
  const CookiesStore = await cookies();

  const token = CookiesStore.get("auth_token")?.value;

  const productid = (await params).productid;

  const category = (await searchParams)?.category ?? "";

  return (
    <>
      <ProductdetailsMain
        productid={productid}
        category={category}
        token={token ?? ""}
      />
    </>
  );
}

export default Productdetails;
