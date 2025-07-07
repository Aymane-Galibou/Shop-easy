"use client";

import React, { useEffect, useState } from "react";
import { ThreeDCardDemo } from "@/Components/ui/card";
import axios from "axios";
import { TextGenerateEffect } from "@/Components/ui/text-generate-effect";
import { Spotlight } from "@/Components/ui/Spotlight";
import SmartLink from "@/Components/SmartLink/SmartLink";

export type Product = {
  description: string;
  title: string;
  imageCover: string;
  ratingsAverage?: number;
  price?: number;
  id: string;
  category?: { name: string };
};

function Shop() {

  
  const [productsitems, setproductsitems] = useState<Product[]>();

  async function getProducts() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );

      setproductsitems(response.data.data);
      // console.log(response.data.data); for testing data
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  new Promise((resolve) =>
    setTimeout(() => {
      resolve("");
    }, 2000)
  );
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col">
        <Spotlight className="-top-32 left-10 md:-top-20" fill="black" />

        <div className="w-full mt-10 text-left">
          <TextGenerateEffect
            className="px-2 text-[40px] md:text-5xl lg:text-6xl text-center"
            words="Discover Your Next Favorite Product"
          />
        </div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">

          {productsitems?.map((item, index) => (

            <SmartLink
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
            </SmartLink>


          ))}
        </div>


      </div>
    </>
  );
}

export default Shop;
