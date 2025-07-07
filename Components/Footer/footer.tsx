"use client";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa6";
import SmartLink from "../SmartLink/SmartLink";

export default function Footer() {
  return (
    <div className="bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-300 px-6 md:px-16 py-10 mt-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Shop easy</h2>
          <p className="text-sm">
            Your go-to platform for quality products and great deals. We deliver happiness at your doorstep.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-emerald-500 transition"><a href="#" >Home</a></li>
            <li className="hover:text-emerald-500 transition"><SmartLink href="/shop" >Shop</SmartLink></li>
            <li className="hover:text-emerald-500 transition"><SmartLink href="/about" >About</SmartLink></li>
            <li className="hover:text-emerald-500 transition"><SmartLink href="/" >Contact</SmartLink></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/profile.php?id=100071468627852&locale=ar_AR" target="_blank"><FaFacebookF className="hover:text-blue-500" /></a>
            <a href="#"><FaTwitter className="hover:text-sky-500" /></a>
            <a href="https://www.instagram.com/aym____ane3/"><FaInstagram className="hover:text-pink-500" /></a>
            <a href="#"><FaLinkedinIn className="hover:text-blue-700" /></a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-sm mb-2">Subscribe to get the latest updates and offers.</p>
          <div className="flex items-center border rounded-full overflow-hidden dark:border-gray-700">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 bg-transparent outline-none"
            />
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-6 text-center text-sm">
        © {new Date().getFullYear()} Developed by Aymane Galibou. All rights reserved.
      </div>
    </div>
  );
}
