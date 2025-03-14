import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./globals.css";



export const metadata: Metadata = {
  title: "Soyo Shop",
  description: "A electron shop built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
