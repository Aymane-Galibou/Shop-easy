"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SmartLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname !== href) {
      setIsLoading(true);
      router.push(href);
    }
  };

  // fash ka ytbdl pathname i.e rah mchina la page lakhra donc khasna nhbso loading
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  return (
    <>
      <Link href={href} onClick={handleClick} className="cursor-pointer">
        {children}
      </Link>

      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-white" />
        </div>
      )}
    </>
  );
}
