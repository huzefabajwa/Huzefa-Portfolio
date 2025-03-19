'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import CommonLayout from "@/components/client-view/common-layout";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation"; // Import Next.js hook

const roboto = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current route

  return (
    <html lang="en">
      <body className={`${roboto.className} ${pathname === "/" ? "home-page" : ""}`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <CommonLayout>
            {children}
          </CommonLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
