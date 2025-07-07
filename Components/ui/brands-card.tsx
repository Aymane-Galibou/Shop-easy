"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Lens } from "./lens";

export function BrandsCard({
  header,
  imgsource,
  desc,
}: {
  header: string;
  imgsource: string;
  desc?: string;
}) {
  return (
   <CardContainer className="inter-var w-full">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] h-[370px] rounded-xl p-6 border  ">
       
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {header}
        </CardItem>

        <CardItem translateZ="100" className="w-full mt-4">
          <Lens>
            
          <Image
            src={imgsource ?? ""}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
            />
            </Lens>
        </CardItem>

        <div className="flex justify-between items-center mt-6">
          <CardItem
            translateZ="50"
            className="text-sm font-bold text-neutral-600 dark:text-white"
          >
            {desc?.split("T").slice(0, 1).join("T")}
          </CardItem>

          <CardItem
            translateZ={20}
            translateX={-20}
            as="button"
            className="px-4 py-2 rounded-xl bg-orange-500 dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Discover
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
