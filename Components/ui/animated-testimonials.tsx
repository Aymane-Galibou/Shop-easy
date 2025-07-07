"use client";
import useaddProduct from "@/app/shop/[productid]/addProduct";
import { CardContext } from "@/Context/cardContext";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";

type Product = {
  description?: string;
  title?: string;
  imageCover?: string;
  ratingsAverage?: number;
  price?: number;
  id: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  ProductDetails,
  session,
  productId,
}: {
  testimonials: string[];
  ProductDetails: Product | undefined;
  autoplay?: boolean;
  session: string;
  productId: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };
  const addProduct = useaddProduct();

  const handleAdd = () => {
    addProduct(session, productId);
  };

  const { loadingcart } = useContext(CardContext);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="max-w-full md:max-w-6xl  mt-5 md:ml-6 border border-gray-300 rounded-lg z-10 antialiased font-sans px-8 md:px-8 lg:px-12 py-20">
      <div className="relative grid  grid-cols-1 md:grid-cols-2 gap-20">
        <div className="w-full">
          <div className="relative h-80">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >


                  <Image
                    src={testimonial}
                    alt={`${ProductDetails?.title}`}
                    width={700}
                    height={700}
                    draggable={false}
                    className="h-full w-full rounded-3xl border border-gray-500 object-cover object-center"
                    />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-between flex-col py-5 gap-2">
          <h3 className="text-2xl font-bold dark:text-white text-black">
            {ProductDetails?.title}
          </h3>

          <h3 className="dark:text-white flex items-center">
            <span>
              <FiDollarSign className="text-2xl font-extrabold text-orange-500" />
            </span>
            <span className="text-2xl font-bold">{ProductDetails?.price}</span>
          </h3>

          <div className="flex items-center my-2">
            <FaStar className="text-yellow-300 text-[16px]" />
            <FaStar className="text-yellow-300 text-[16px]" />
            <FaStar className="text-yellow-300 text-[16px]" />

            <h1 className="text-[14px] ml-3 text-neutral-500">
              {ProductDetails?.ratingsAverage}
            </h1>
          </div>

          <div className="flex gap-4 my-1">
            <input
              type="number"
              className="w-12 outline-none border border-orange-600 rounded-xl"
            />

            <button
              onClick={handleAdd}
              disabled={loadingcart}
              className="flex items-center gap-2 cursor-pointer bg-black hover:bg-orange-500 transition-all ease-in-out duration-500 text-white px-2.5 rounded-full py-2"
            >
              <span>
                <IoCartOutline />
              </span>

              {loadingcart ? (
                <span className="animate-spin w-[30px] h-[30px] border-white border-b-2 rounded-full"></span>
              ) : (
                <span>Add To Cart</span>
              )}
            </button>
          </div>

          <motion.p className="text-lg text-gray-500 mt-8 dark:text-neutral-300">
            {ProductDetails?.description}
          </motion.p>

          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
            </button>

            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
