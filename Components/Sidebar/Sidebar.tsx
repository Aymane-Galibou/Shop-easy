"use client";
import React, { useContext } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoIosMan } from "react-icons/io";
import { IoMenu, IoWoman } from "react-icons/io5";
import { IoIosArrowDropright } from "react-icons/io";
import { RiMentalHealthFill } from "react-icons/ri";
import { IconType } from "react-icons";
import {
  FaShoppingBasket,
  FaBaby,
  FaHome,
  FaMusic,
  FaBook,
} from "react-icons/fa";
import { FaMobileScreenButton } from "react-icons/fa6";
import { FcElectronics } from "react-icons/fc";
import { LoginContext } from "@/Context/Loginauthentication";
import { motion } from "motion/react";

type sidebarelement = {
  title: string;
  logo: IconType;
};

const sidebarelements: sidebarelement[] = [
  { title: `men's fashion`, logo: IoIosMan },
  { title: `women's fashion`, logo: IoWoman },
  { title: `SuperMarket`, logo: FaShoppingBasket },
  { title: `Baby & Toys"`, logo: FaBaby },
  { title: `Home`, logo: FaHome },
  { title: `Music`, logo: FaMusic },
  { title: `Books`, logo: FaBook },
  { title: `Beauty & Health`, logo: RiMentalHealthFill },
  { title: `Mobiles`, logo: FaMobileScreenButton },
  { title: `Electronics`, logo: FcElectronics },
];

function SideBar() {
  const { isOpened, setisOpened } = useContext(LoginContext);

  return (
    <>
      {/* sidebar */}

      {!isOpened && (
        <div>
          <button
            onClick={() => setisOpened(!isOpened)}
            className={`text-2xl text-black p-2 dark:text-white bg-gray-400 dark:bg-slate-800 rounded-lg mx-1 sticky`}
          >
            <IoIosArrowDropright />
          </button>
        </div>
      )}

      
      <div
        className={`h-full bg-neutral-400 dark:bg-gray-900 fixed w-60 z-50 ${
          isOpened ? "flex flex-col" : "hidden"
        }`}
      >
        <div className="flex justify-between items-center p-3 py-5">
          {isOpened && <span className="text-xl font-bold">Categories</span>}{" "}
          <button
            onClick={() => setisOpened(!isOpened)}
            className={
              isOpened
                ? "text-2xl cursor-pointer"
                : "text-2xl cursor-pointer mx-auto"
            }
          >
            {isOpened ? <IoIosCloseCircleOutline /> : <IoMenu />}
          </button>
        </div>

        <div className="flex flex-col gap-4 mt-3 ml-2">
          {sidebarelements.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 cursor-pointer"
            >
              <span className="text-2xl">
                <item.logo />
              </span>

              {isOpened && <p>{item.title}</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


export default SideBar;

// https://ecommerce.routemisr.com/api/v1/categories
//https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b