import {  Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
/*
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
*/
const frank = Frank_Ruhl_Libre({
  variable: "--font-geist-mono",
  subsets: ["hebrow"],
});


export const metadata = {
  title: "Finansim ilan bar lev",
  description: "create by ilan bar lev 08-2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir=''>
      <body 
        className={` ${frank.className}`}>
        <AppProvider>
        <div className=" relative flex flex-col min-h-screen">
        <header className="sticky top-0 z-10">
          <Navbar />
        </header>
        <main className=" p-1">
          {children}
        </main> 
        <Footer />
        </div>
        </AppProvider>
      </body>
    </html>
  );
}


/* פונטים  מהתקנה
${geistSans.variable} ${geistMono.variable} antialiased

import  Geist, Geist_Mono,
*/