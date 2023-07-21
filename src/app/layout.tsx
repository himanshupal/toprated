import React, { type PropsWithChildren } from "react";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "@/styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Top Rated Movies",
  description: "App that shows top rated movies using TMDB API",
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
