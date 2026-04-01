"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo1 from "../../public/logo1.png";
import { MdOutlineDarkMode, MdOutlineShoppingCart } from "react-icons/md";
import { IoMenu, IoClose } from "react-icons/io5"; // Added Close icon
import { usePathname, useRouter } from "next/navigation";
import { LoginContext } from "@/Context/Loginauthentication";
import Logout from "@/Context/Logout";
import { useTheme } from "next-themes";
import { FiSun, FiLogOut } from "react-icons/fi";
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
  const routera = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useContext(LoginContext);
  const { cartitemscount } = useContext(CardContext);
  const { theme, setTheme } = useTheme();

  const [activemenu, setactivemenu] = useState(false);
  const [loadlogout, setloadlogout] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handlelogout() {
    setloadlogout(true);
    await Logout();
    router.push("/signin");
    router.refresh();
    setloadlogout(false);
    setactivemenu(false);
  }

  if (!mounted) return null;

  return (
    <>
      {/* THE FIX: Fixed position with high z-index and backdrop-blur. 
         This prevents the hero from "eating" the navbar.
      */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* LOGO SECTION */}
            <SmartLink href="/">
              <div className="flex items-center gap-2 group">
                <div className="relative w-[50px] h-[60px]">
                  <Image
                    src={logo1}
                    alt="Logo"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform"
                    priority
                  />
                </div>
                <h1 className="text-xl font-black tracking-tighter dark:text-white uppercase">
                  Shop <span className="text-orange-500">Easy</span>
                </h1>
              </div>
            </SmartLink>

            {/* DESKTOP NAV - Only visible if Authenticated as per your original logic */}
            <div className="hidden md:flex items-center gap-8">
              {isAuthenticated && Navbarelements.map((item, index) => (
                <div key={index} className="relative group">
                  <SmartLink href={item.to}>
                    <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                      routera === item.to 
                      ? "text-orange-500" 
                      : "text-gray-600 dark:text-gray-300 hover:text-orange-500"
                    }`}>
                      {item.title}
                    </span>
                  </SmartLink>
                  {/* Modern Animated Underline */}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${
                    routera === item.to ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </div>
              ))}
            </div>

            {/* RIGHT SIDE ACTIONS */}
            <div className="flex items-center gap-5">
              
              {/* Cart & Theme */}
              <div className="flex items-center gap-4 border-r border-gray-200 dark:border-zinc-700 pr-5">
                <SmartLink href="/card">
                  <div className="relative text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors cursor-pointer">
                    <MdOutlineShoppingCart size={24} />
                    {isAuthenticated && cartitemscount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {cartitemscount}
                      </span>
                    )}
                  </div>
                </SmartLink>

                <button 
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors"
                >
                  {theme === "light" ? <MdOutlineDarkMode size={24} /> : <FiSun size={24} className="text-yellow-500" />}
                </button>
              </div>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center gap-4">
                {!isAuthenticated ? (
                  <>
                    <SmartLink href="/signin">
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors">Sign In</span>
                    </SmartLink>
                    <SmartLink href="/signup">
                      <span className="px-5 py-2 bg-orange-500 text-white rounded-full text-sm font-bold hover:bg-orange-600 transition-all shadow-md shadow-orange-200 dark:shadow-none">
                        Sign Up
                      </span>
                    </SmartLink>
                  </>
                ) : (
                  <button 
                    onClick={handlelogout}
                    className="flex items-center gap-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg transition-all"
                  >
                    {loadlogout ? (
                      <div className="animate-spin w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <FiLogOut /> <span>Logout</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Mobile Toggle */}
              <button 
                onClick={() => setactivemenu(!activemenu)}
                className="md:hidden text-3xl text-gray-800 dark:text-white"
              >
                {activemenu ? <IoClose /> : <IoMenu />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU - Full Screen Slide */}
        {activemenu && (
          <div className="fixed inset-0 top-20 bg-white dark:bg-black z-[110] flex flex-col p-8 space-y-6 md:hidden">
            {isAuthenticated ? (
              Navbarelements.map((item, index) => (
                <Link 
                  key={index} 
                  href={item.to}
                  onClick={() => setactivemenu(false)}
                  className={`text-4xl font-black uppercase ${routera === item.to ? "text-orange-500" : "text-gray-900 dark:text-white"}`}
                >
                  {item.title}
                </Link>
              ))
            ) : (
              <div className="flex flex-col gap-6">
                 <Link href="/signin" onClick={() => setactivemenu(false)} className="text-4xl font-black dark:text-white">Sign In</Link>
                 <Link href="/signup" onClick={() => setactivemenu(false)} className="text-4xl font-black text-orange-500">Sign Up</Link>
              </div>
            )}
            
            {isAuthenticated && (
              <button 
                onClick={handlelogout}
                className="text-left text-2xl font-bold text-red-500 pt-10"
              >
                {loadlogout ? "Logging out..." : "Log Out"}
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Spacer to push page content below the fixed navbar */}
      <div className="h-20" />
    </>
  );
}

export default Navbar;