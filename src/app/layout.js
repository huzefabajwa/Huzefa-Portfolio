'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import CommonLayout from "@/components/client-view/common-layout";
import { usePathname } from "next/navigation";

const roboto = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${roboto.className} ${pathname === "/" ? "home-page" : ""}`}>
        <CommonLayout>
          {children}
        </CommonLayout>
      </body>
    </html>
  );
}
