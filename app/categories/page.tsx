"use client";
import SmartLink from "@/Components/SmartLink/SmartLink";
import { BrandsCard } from "@/Components/ui/brands-card";
import { ThreeDCardDemo } from "@/Components/ui/card";
import { Spotlight } from "@/Components/ui/Spotlight";
import { TextGenerateEffect } from "@/Components/ui/text-generate-effect";
import { LoginContext } from "@/Context/Loginauthentication";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

type Category = {
  name: string;
  image: string;
  _id: string;
};

function Categories() {
  const { isOpened } = useContext(LoginContext);
  const [Categoriesitems, setCategoriesitems] = useState<Category[]>();

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );
        setCategoriesitems(response.data.data);
      } catch (error) {
        console.error("Failed to fetch caegories:", error);
      }
    }

    getCategories();
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-col">
          <Spotlight className="-top-32 left-10" fill="black" />
          <Spotlight className="top-32 left-16" fill="orange" />

          <div className="w-full">

            <TextGenerateEffect
              className="pl-6 sm:px-2 py-2 text-[23px] md:text-5xl lg:text-6xl text-center"
              words="Here you can find all the Categories"
            />

          </div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">

            {Categoriesitems?.map((item, index) => (
              <SmartLink  key={index} href={`/categories/${item._id}`}>
                <BrandsCard header={item.name} imgsource={item.image} />
              </SmartLink>
            ))}
            
          </div>
        </div>
      </div>
    </>
  );
}
// https://ecommerce.routemisr.com/api/v1/categories

//https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b
export default Categories;
