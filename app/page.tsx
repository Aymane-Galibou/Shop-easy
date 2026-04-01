"use client";
import HeroSlider from "@/Components/Slider";
import SmartLink from "@/Components/SmartLink/SmartLink";
import { ThreeDCardDemo } from "@/Components/ui/card";
import { InfiniteMovingCards } from "@/Components/ui/infinite-moving-cards";
import { TextGenerateEffect } from "@/Components/ui/text-generate-effect";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Types remain the same
type brands = { _id?: string; name: string; image: string; };
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
  const [brandsitems, setbrandsitems] = useState<brands[]>([]);
  const [productsitems, setproductsitems] = useState<Product[]>();

  async function getbrands() {
    try {
      const brand = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
      setbrandsitems(brand.data.data);
    } catch (errore) {
      console.log(errore);
    }
  }

  async function getProducts() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
      const filtreddata = data.data.filter((item: Product) => item.ratingsAverage > 4.2);
      setproductsitems(filtreddata.slice(0, 12));
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  useEffect(() => {
    getbrands();
    getProducts();
  }, []);

  return (
    /* DARK MODE: Changed bg to dark:bg-[#0a0a0a] and text to dark:text-white */
    <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] text-slate-900 dark:text-white transition-colors duration-300 selection:bg-orange-100 dark:selection:bg-orange-900/30">
      
      {/* 1. HERO SECTION */}
      <section className="w-full relative">
        <HeroSlider />
      </section>

      {/* 2. THE VALUE PROPOSITION */}
      <section className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* DARK MODE: Explicitly added dark:text-white */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Digital Marketing Agency <span className="text-orange-500">Nº1</span> in Morocco
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light text-slate-500 dark:text-slate-400 leading-relaxed">
            If you want to launch, scale your business, or globalize, 
            <span className="font-semibold text-slate-800 dark:text-slate-200"> Shop Easy</span> is your 
            strategic partner for ecommerce excellence.
          </p>
        </motion.div>
      </section>

      {/* 3. NEW ARRIVALS */}
      {/* DARK MODE: Changed bg to dark:bg-zinc-900/50 */}
      <section className="bg-slate-50 dark:bg-zinc-900/50 py-20 overflow-hidden transition-colors">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div className="text-left">
            <h2 className="text-sm uppercase tracking-[3px] text-orange-500 font-bold mb-2">Curated</h2>
            <TextGenerateEffect className="text-3xl md:text-5xl font-bold dark:text-white" words="New Arrivals" />
          </div>
          <SmartLink href="/shop">
            <span className="group flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300 hover:text-orange-500 transition-colors">
              Explore Collection 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </SmartLink>
        </div>
        
        <div className="py-4">
          <InfiniteMovingCards items={items} speed="slow" />
        </div>
      </section>

      {/* 4. PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <TextGenerateEffect className="text-4xl font-bold dark:text-white" words="A Selection of Our Products" />
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full" />
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4"
          style={{ gridAutoRows: "500px" }}
        >
          {productsitems?.map((item, index) => (
            <Link
              key={index}
              href={`/shop/${item.id}?category=${item.category?.name}`}
              className="h-full"
            >
              {/* Ensure ThreeDCardDemo interior handles dark mode internally */}
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
      </section>

      {/* 5. BRANDS */}
      {/* DARK MODE: border-t dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] */}
      <section className="border-t border-slate-100 dark:border-zinc-800 py-20 bg-white dark:bg-[#0a0a0a] transition-colors">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <h3 className="text-slate-400 dark:text-slate-500 font-medium tracking-[2px] uppercase text-xs mb-10">Trusted by Global Brands</h3>
          
          {/* DARK MODE: Inverted grayscale for brands looks better in dark mode */}
          <div className="w-full opacity-60 dark:opacity-40 grayscale hover:grayscale-0 dark:hover:opacity-100 transition-all duration-500">
            <InfiniteMovingCards items={brandsitems} direction="right" speed="slow" />
          </div>

          <div className="mt-12">
            <SmartLink href="/brand">
              <span className="px-8 py-3 bg-slate-900 dark:bg-orange-600 text-white rounded-full text-sm font-bold hover:bg-orange-500 dark:hover:bg-orange-500 transition-all shadow-lg hover:shadow-orange-200">
                View All Partners
              </span>
            </SmartLink>
          </div>
        </div>
      </section>
    </main>
  );
}

const items = [
  { name: "Sac à Dos", image: "/p1.jpg" },
  { name: "Music Baf", image: "/p2.jpg" },
  { name: "Montre Connectée", image: "/p3.jpg" },
  { name: "HOVVIDA Compresseur à Air", image: "/p4.jpg" },
  { name: "uhlsport Player Football", image: "/p5.jpg" },
];