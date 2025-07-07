"use client";
import RelatedProducts from "@/app/shop/[productid]/RelatedProducts";
import { BrandsCard } from "@/Components/ui/brands-card";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type specifiqCategorie = {
  name: string;
  image: string;
  id: string;
  createdAt: string;
};

function Specifcat() {
  const params = useParams();
  const { specifcat } = params;

  const [specifqCategorie, setspecifqCategorie] = useState<specifiqCategorie>();


  useEffect(() => {
      async function getspecifiqCategorie() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${specifcat}`
    );

    setspecifqCategorie(data.data);
    console.log(data.data);
  }


    window.scrollTo(0, 0);

    getspecifiqCategorie();

  }, []);

  return (
    <>
      <div className="h-screen w-full flex flex-col">
        {/*  first part */}

        <div className="flex flex-col gap-6 sm:flex-row  sm:items-center px-2">
          <div>
            {specifqCategorie && (
              <BrandsCard
                header={specifqCategorie?.name}
                imgsource={specifqCategorie?.image}
                desc={specifqCategorie?.createdAt}
              />
            )}
          </div>

          <div className="px-5 border-gray-600 dark:border-white border-2 rounded-xl">
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed tracking-wide px-4 sm:px-6 md:px-8 max-w-3xl mx-auto text-center mb-8">
              Explore the core details of this main category along with key
              highlights and specifications at a glance. Below, you&apos;ll find a
              curated list of products that belong to the same category,
              offering you consistent quality and relevance. Whether you&apos;re
              comparing options or exploring related items, everything you need
              is right here in one place.
            </p>
          </div>
        </div>

        {/*  second part */}
<div className="w-full">

          {specifqCategorie && (
            <RelatedProducts categorie={specifqCategorie?.name} />
          )}{" "}
          </div>
      </div>
    </>
  );
}

export default Specifcat;
