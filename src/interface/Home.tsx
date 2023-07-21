"use client";

import type { ITopRatedPage } from "@/types/TopRatedResponse";
import Carousel from "@/components/Carousel";

export interface IHomeUIProps {
  data: ITopRatedPage[];
}

const HomeUI = ({ data }: IHomeUIProps) => {
  return (
    <div className="px-3 py-8">
      <h1 className="font-bold text-2xl">Top Rated Movies</h1>
      <Carousel slides={data.slice(0, 10)} />
    </div>
  );
};

export default HomeUI;
