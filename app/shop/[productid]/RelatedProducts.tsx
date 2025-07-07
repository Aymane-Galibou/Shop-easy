"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../page";
import axios from "axios";
import Link from "next/link";
import { ThreeDCardDemo } from "@/Components/ui/card";

function RelatedProducts({ categorie }: { categorie: string }) {
  const [relatedProducts, setrelatedProducts] = useState<Product[]>();

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/products"
        );
        const filtredProducts = await data.data.filter(
          (p: Product) => p.category?.name === categorie
        );
        setrelatedProducts(filtredProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    getProducts();
  }, []);

  return (
    <>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">


{ (relatedProducts != null &&  relatedProducts?.length >0 ) ? <>
        {relatedProducts?.map((item, index) => (
          <Link
            key={index}
            href={`/shop/${item.id}?category=${item.category?.name}`}
          >
            <ThreeDCardDemo
              header={item.title}
              price={item.price}
              imgsource={item.imageCover}
              description={item.description}
              rating={item.ratingsAverage}
            />
          </Link>
        ))}
</> : <span>  There is no Product Yet </span>  } 

      </div>
    </>
  );
}

export default RelatedProducts;
