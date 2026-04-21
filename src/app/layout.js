import { Inter } from "next/font/google";
import "./globals.css";
import CommonLayout from "@/components/client-view/common-layout";

const roboto = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Huzefa | Portfolio',
  description: 'Full Stack Web Developer Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <CommonLayout>
          {children}
        </CommonLayout>
      </body>
    </html>
  );
}
