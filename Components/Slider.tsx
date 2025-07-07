"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay,Navigation,Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import Image from "next/image";


const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"];

export default function HeroSlider() {
  return (
    <Swiper
    modules={[Autoplay,Navigation,Pagination,Scrollbar]}
      spaceBetween={15}
      slidesPerView={1}
      loop
      navigation
            pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}



      autoplay={{
        delay: 2000, // 3 seconds between slides
        disableOnInteraction: false, // keep autoplay after user interaction
      }}      speed={1000}
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>

          <Image
            src={img}
            alt={`Slide ${idx}`}
            width={1920}
            height={1080}
            className="w-full h-[600px] object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
