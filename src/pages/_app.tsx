import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import type { NextPage } from "next";
import "@/styles/index.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const inter = Inter({ subsets: ["latin"] });

const CustomApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <main className={inter.className}>
      <Navbar />
      <Component {...pageProps} />
    </main>
  );
};

export default CustomApp;
