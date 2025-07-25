
"use client"

import { CartProvider } from "@/context/CartContext";
import Navbar from "@/component/layout/Navbar";
import Header from "@/component/layout/Header"; 
import Footer from "@/component/layout/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import { ServerProvider, useService } from "@/context/ServerContext";
import {useEffect } from "react";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
const inter = Geist_Mono({ 
   variable:"--font-geist-mono",
  subsets: ["latin", "cyrillic"]
});
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
function MainLayout({ children }) {
  const { systemInfo } = useService();

  useEffect(() => {
    if (systemInfo) {
      document.documentElement.style.setProperty(
        "--primary-color",
        systemInfo.primaryColor
      );
      document.documentElement.style.setProperty(
        "--secondary-color",
        systemInfo.secondaryColor
      );
    }
  }, [systemInfo]);

  return (
    <>
      {/* <TopBar />
   
      <Navigation /> */}
          <Header />
          <Navbar />
      <main className="bg-gray-100">{children}</main>
      <Footer />
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body
      className={inter.className}
    >
    <ServerProvider>
      <CartProvider>
<MainLayout>
{children}
  </MainLayout>        
      </CartProvider>
    </ServerProvider>
    </body>
  </html>
  );
}
