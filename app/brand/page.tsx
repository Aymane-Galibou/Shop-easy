"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrandsCard } from "@/Components/ui/brands-card";
import { TextGenerateEffect } from "@/Components/ui/text-generate-effect";
import { Spotlight } from "@/Components/ui/Spotlight";

type brands = {
  _id: string;
  name: string;
  image: string;
};

function Brand() {
  const [brands, setbrands] = useState<brands[]>();

  useEffect(() => {
    async function getbrands() {
      try {
        const brand = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/brands"
        );
        setbrands(brand.data.data);
        console.log(brand.data.data);
      } catch (errore) {
        console.log(errore);
      }
    }

    getbrands();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <Spotlight className="-top-32  md:-top-20" fill="black" />

      <div className="w-full mt-10 text-left">
        <TextGenerateEffect
          className="px-2 text-[40px] md:text-5xl lg:text-6xl text-center"
          words="Shop the Latest Brand Collections"
        />
      </div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mt-14" style={{ gridAutoRows: '370px' }}>
        {brands?.map((item, index) => (
          <BrandsCard key={index} header={item.name} imgsource={item.image} />
        ))}
      </div>
    </div>
  );
}

export default Brand;

// https://ecommerce.routemisr.com/api/v1/brands
