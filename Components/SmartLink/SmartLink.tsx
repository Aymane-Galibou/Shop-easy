"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SmartLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If it's an external link or the same page, let it be
    if (href.startsWith('http') || pathname === href) return;

    e.preventDefault();
    setIsLoading(true);
    
    // We use transition to push the route
    router.push(href);
  };

  // Reset loading when the path actually changes
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  return (
    <>
      <Link 
        href={href} 
        onClick={handleClick} 
        className={`cursor-pointer ${className}`}
      >
        {children}
      </Link>

      {/* THE UX UPGRADE: Top Progress Bar instead of full-screen overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ width: "0%", opacity: 1 }}
            animate={{ width: "70%", opacity: 1 }} 
            exit={{ width: "100%", opacity: 0 }}   
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-[3px] bg-orange-500 z-[9999] shadow-[0_0_10px_rgba(249,115,22,0.5)]"
          />
        )}
      </AnimatePresence>

      {/* Optional: Subtle Spinner in the corner instead of center screen */}
      {isLoading && (
        <div className="fixed bottom-5 right-5 z-[9999]">
          <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </>
  );
}