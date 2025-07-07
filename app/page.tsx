"use client"
import HeroSlider from "@/Components/Slider";
import SmartLink from "@/Components/SmartLink/SmartLink";
import { ThreeDCardDemo } from "@/Components/ui/card";
import { InfiniteMovingCards } from "@/Components/ui/infinite-moving-cards";
import { TextGenerateEffect } from "@/Components/ui/text-generate-effect";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type brands = {
  _id?: string;
  name: string;
  image: string;
};
export type Product = {
  description: string;
  title: string;
  imageCover: string;
  ratingsAverage: number;
  price: number;
  id: string;
  category: { name: string };
};
export default function Home() {

  const [brandsitems, setbrandsitems] = useState<brands[]>([])


    async function getbrands() {
      try {
        const brand = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/brands"
        );
         setbrandsitems(await brand.data.data);
      } catch (errore) {
        console.log(errore);
      }
    }

      const [productsitems, setproductsitems] = useState<Product[]>();

  async function getProducts() {
    try {
      const {data} = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      const nonfiltreddata=await data.data;
      const filtreddata=await nonfiltreddata.filter((item:Product)=>item.ratingsAverage >4.2)

      setproductsitems(filtreddata);
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
  getbrands()
    getProducts();

      
  

}, []);

  return (
    <div className="w-full flex flex-col items-center gap-10">

{/*  the hero slider */}
      <div className="w-full">
        <HeroSlider />
      </div>
{/* the part of talking about us  */}

    <div className="flex flex-col items-center mt-3">
      <h1 className="text-center tracking-[1px] py-3 font-extrabold text-blue-600 sm:text-[3rem]">
Digital Marketing Agency Nº1 in Morocco
      </h1>
<p className="font-extralight w-1/2 text-center sm:text-[1.5rem]">
  If you want to launch, scale your business,
globalize yourself, Shop Easy your ecommerce agency is here to help you achieve your goals!
</p>
    </div>




    <div className="w-full flex flex-col items-center">



{/*  the part of new arrival */}

                <TextGenerateEffect
                  className="px-2 py-1 text-[1.5rem] sm:text-[3rem]  text-center"
                  words="New Arrivals"
                />

                <div className="w-[90%] flex flex-col items-center mx-auto border rounded-lg my-3 py-3 overflow-hidden" >

                  <InfiniteMovingCards items={items} />

                  <SmartLink href="/shop">
                  <span className="px-3 py-1.5 bg-orange-500 text-center tracking-[1px] text-white rounded-lg mt-2">

                    Go to Shop
                  </span>
                    </SmartLink>

                </div>



{/*  the part of brands */}

                <TextGenerateEffect
                  className="px-2 py-1 text-[1.5rem] sm:text-[3rem]  text-center"
                  words="Here are our partners and sponsors"
                />
                <div className="w-[90%] flex flex-col items-center mx-auto border  rounded-lg mt-3 py-3 overflow-hidden" >

                  <InfiniteMovingCards items={brandsitems} />

                  <SmartLink href="/brand">
                  <span className="px-3 py-1.5 bg-orange-500 text-center tracking-[1px] text-white rounded-lg mt-2">

                    see the brands
                  </span>
                    </SmartLink>

                </div>



{/*  the products Part */}

                <TextGenerateEffect
                  className="px-2 py-1 text-[1.5rem] sm:text-[3rem]  text-center"
                  words="A Selection of Our Products"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">

          {productsitems?.map((item, index) => (

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
        </div>


    </div>





    </div>
  );
}


const items=[
  {
    name:"Sac à Dos",
    image:"/p1.jpg"
  },
    {
    name:"Music Baf",
    image:"/p2.jpg"
  },
    {
    name:"Montre Connectée",
    image:"/p3.jpg"
  },
    {
    name:"HOVVIDA Compresseur à Air",
    image:"/p4.jpg"
  },
      {
    name:"uhlsport Player Football",
    image:"/p5.jpg"
  }
]