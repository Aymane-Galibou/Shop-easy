"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo1 from "../../public/logo1.png";
import { MdOutlineDarkMode, MdOutlineShoppingCart } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { LoginContext } from "@/Context/Loginauthentication";
import Logout from "@/Context/Logout";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { FiSun } from "react-icons/fi";
import SmartLink from "../SmartLink/SmartLink";
import { CardContext } from "@/Context/cardContext";

const Navbarelements = [
  { title: "Shop", to: "/shop" },
  { title: "Categories", to: "/categories" },
  { title: "Brand", to: "/brand" },
  { title: "Card", to: "/card" },
  { title: "About", to: "/about" },
];

function Navbar() {

  const routera: string = usePathname();
  const router = useRouter();

  const { isAuthenticated} = useContext(LoginContext);
  const { cartitemscount} = useContext(CardContext);



  const [activemenu, setactivemenu] = useState<boolean>(false);
  const [loadlogout, setloadlogout] = useState<boolean>(false);

  async function handlelogout() {
    setloadlogout(true);
    await Logout();
    router.push("/signin");
    router.refresh();
    setloadlogout(false);
  }

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // on sait que html est génereée sur le serveur mais dans la ligne .. le theme sur le serveur est undefined , et sur le client
  // il est definie donc c'est un dismatch donc la solution c'est d'attendre jusqu'a ce que notre component est bien montée
  //  et pour vérifier ca on doit utiliser useEffect car celui qui s'execute lorsque le component est pret
  //  sinon on affiche null



  useEffect(() =>{ 
    
    setMounted(true) 

  } , []);

  if (!mounted) return null;

  return (
    <>
      <div className="navbar dark:bg-black">
        <div className="flex items-center gap-4 sm:gap-10">
          <SmartLink href={"/"}>
            <div className="flex justify-between items-center">
              <Image
                style={{ width: "65px", height: "80px" }}
                priority={false}
                src={logo1}
                alt="welcome"
              />
              <h1 className="text-black dark:text-white font-extrabold text-[18px] flex-1  lg:text-2xl tracking-[0.6px]">
                Shop Easy
              </h1>
            </div>
          </SmartLink>

          {/* desktop navbar */}

          {isAuthenticated && (
            <div className="hidden md:flex gap-3  md:gap-6">
              {Navbarelements.map((item, index) => (
                <div
                  className={`${
                    routera === item.to
                      ? "font-extrabold text-black dark:text-white"
                      : "text-gray-700 dark:text-gray-300 font-extralight"
                  } relative tracking-[0.5px]  hover:text-black dark:hover:text-white hover:font-extrabold transition-all duration-300  text-[17px]`}
                  key={index}
                >
                  <span
                    className={
                      routera === item.to
                        ? ` absolute w-[100%] h-1 -bottom-1 bg-[#FF6B00] rounded-lg`
                        : "hidden"
                    }
                  ></span>
                  <SmartLink href={item.to}>{item.title}</SmartLink>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mr-3 p-3">
          <div

            className="text-[27px] flex items-center gap-3"
          >
<span className="hidden sm:flex relative text-gray-700 dark:text-gray-400 font-extralight cursor-pointer hover:text-black hover:font-extrabold">

            <SmartLink href="/card">
              <MdOutlineShoppingCart  /> 
            </SmartLink>

{  isAuthenticated &&          <p className="absolute right-0 w-5 h-5 flex items-center justify-center -top-3 text-white text-[16px] bg-orange-600 rounded-full">{cartitemscount}</p>
}
</span>
            <span 
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
             className="text-gray-700 font-extralight cursor-pointer hover:text-black hover:font-extrabold">

            {theme === "light" ? (
              <MdOutlineDarkMode />
            ) : (
              <FiSun className="text-yellow-500" />
            )}
            </span>

    

          </div>

          {!isAuthenticated && (
            <>
              <div className="hidden md:flex gap-3">
                <span className="text-[17px] tracking-[0.5px] font-extralight text-gray-700 dark:text-gray-300 dark:hover:text-white hover:text-black hover:font-extrabold">
                  <SmartLink href={"/signup"}>Sign up</SmartLink>{" "}
                </span>

                <span className="text-[17px] tracking-[0.5px] font-extralight text-gray-700 dark:text-gray-300 dark:hover:text-white hover:text-black hover:font-extrabold">
                  <SmartLink href={"/signin"}>Sign in</SmartLink>{" "}
                </span>
              </div>
            </>
          )}

          {isAuthenticated && (
            <span className="text-[17px] hidden md:flex tracking-[0.5px] font-extralight text-gray-700 dark:text-gray-300 transition-all duration-300 dark:hover:text-white hover:text-black hover:font-extrabold">
              <button onClick={() => handlelogout()}>
                {loadlogout ? (
                  <p className="animate-spin w-[30px] h-[30px] border-black dark:border-white border-t-2 rounded-full"></p>
                ) : (
                  <p>Log out</p>
                )}
              </button>
            </span>
          )}

          <span
            onClick={() => setactivemenu(!activemenu)}
            className="text-2xl cursor-pointer flex md:hidden"
          >
            <IoMenu />
          </span>
        </div>

        {/* phone and tablet navbar */}

        {activemenu && (
          <div className="fixed inset-0 bg-white zindex">
            <div className="flex flex-col gap-6 ml-6 mt-11 py-4 w-full h-full">
              {isAuthenticated && (
                <>
                  {Navbarelements.map((item, index) => (
                    <span
                      className={`${
                        routera === item.to
                          ? "font-extrabold text-black"
                          : "text-gray-700 font-extralight"
                      } relative tracking-[0.5px]  hover:text-black hover:font-extrabold  text-[17px]`}
                      key={index}
                    >
                      <span
                        className={
                          routera === item.to
                            ? ` absolute w-[25%] h-1 -bottom-1 bg-[#FF6B00] rounded-lg`
                            : "hidden"
                        }
                      ></span>
                      <Link
                        onClick={() => setactivemenu(!activemenu)}
                        href={{ pathname: item.to }}
                      >
                        {item.title}
                      </Link>
                    </span>
                  ))}
                </>
              )}

              {/*  sign in and sign up for phone navbar   */}

              {!isAuthenticated && (
                <>
                  <span className="text-[17px] tracking-[0.5px] font-extralight text-gray-700 hover:text-black hover:font-extrabold">
                    <Link
                      onClick={() => setactivemenu(!activemenu)}
                      href={"/signup"}
                    >
                      Sign up
                    </Link>{" "}
                  </span>

                  <span className="text-[17px] tracking-[0.5px] font-extralight text-gray-700 hover:text-black hover:font-extrabold">
                    <Link
                      onClick={() => setactivemenu(!activemenu)}
                      href={"/signin"}
                    >
                      Sign in
                    </Link>{" "}
                  </span>
                </>
              )}

              {/* log out for phone navbar */}
              {isAuthenticated && (
                <span className="text-[17px] tracking-[0.5px] font-extralight text-gray-700 hover:text-black hover:font-extrabold">
                  <button onClick={() => handlelogout()}>
                    {loadlogout ? (
                      <p className="animate-spin w-[30px] h-[30px] border-black dark:border-white border-t-2 rounded-full"></p>
                    ) : (
                      <p>Log out</p>
                    )}
                  </button>{" "}
                </span>
              )}

              <span
                onClick={() => setactivemenu(!activemenu)}
                className="absolute cursor-pointer text-2xl text-red-600 z-30 top-7 right-6"
              >
                <IoMenu />
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
