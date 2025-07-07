"use client";
import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { FaStar } from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";
import { Lens } from "./lens";

export function ThreeDCardDemo({
  header,
  description,
  imgsource,
  rating,
  price,
}: {
  header?: string;
  description?: string;
  imgsource?: string;
  rating?: number;
  price?: number;
}) {
  return (
    <CardContainer className="inter-var w-full">

      {header && imgsource && (
        <CardBody className="bg-gray-50 relative group/card h-[500px] dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  rounded-xl p-6 border">

          {" "}
          <CardItem
            translateZ="50"
            className="text-xl font-bold  text-neutral-600 dark:text-white"
          >
            {header?.split(" ").slice(0, 3).join(" ")}
          </CardItem>
          <CardItem
            translateZ="100"
            rotateX={20}
            rotateZ={-10}
            className="w-full mt-4"
          >
            <Lens>


            <Image
              priority={false}
              src={imgsource}
              style={{ height: "256px", width: "100%" }}
              height={'100'}
              width={'1500'}
              className="object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
              />
              </Lens>
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {description?.split(` `).slice(0, 3).join(" ")}
          </CardItem>
          <div className="flex justify-between my-2">
            <CardItem className="flex gap-1 my-4 ">
              <FaStar className="text-yellow-300 text-[16px]" />
              <FaStar className="text-yellow-300 text-[16px]" />
              <FaStar className="text-yellow-300 text-[16px]" />

              <h1 className="text-[14px] ml-3 text-neutral-500">{rating}</h1>
            </CardItem>

            <CardItem className="flex items-center gap-1">
              <p className="font-extrabold">{price}</p>
              <span className="text-xl text-orange-600">
                <FiDollarSign />
              </span>
            </CardItem>
          </div>
          <div className="flex justify-between items-center mt-10  absolute left-2 right-2 bottom-6">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl text-xs font-normal text-orange-600 dark:text-white"
            >
              Show more
            </CardItem>
            <CardItem
              translateZ={20}
              translateX={-40}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Add to Cart
            </CardItem>
          </div>
        </CardBody>
      )}
    </CardContainer>
  );
}
