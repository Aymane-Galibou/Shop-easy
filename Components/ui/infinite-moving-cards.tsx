"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    id?:string
    name: string;
    image: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
<li
  key={item.name}
  className="relative w-[260px] sm:w-[300px] md:w-[350px] lg:w-[400px] max-w-full shrink-0 
             rounded-2xl border border-b-0 border-zinc-200 
             bg-gradient-to-b from-[#fafafa] to-[#f5f5f5] px-4 py-6 
             dark:border-zinc-700 dark:bg-gradient-to-b dark:from-[#27272a] dark:to-[#18181b] 
             overflow-hidden"
>

  <div className="flex flex-col items-center w-full gap-3">

    <span className="text-sm sm:text-base md:text-lg text-center font-medium text-neutral-700 dark:text-gray-300 line-clamp-2">
      {item.name}
    </span>

    <div className="relative w-full h-[180px] sm:h-[220px] md:h-[250px]">
      <Image
        src={item.image}
        alt={item.name}
        fill
        className="object-contain"
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 25vw"
        />
    </div>

  </div>

</li>
        ))}
      </ul>
    </div>
  );
};
