import type { IMovieInfoResponse } from "@/types/MovieInfoResponse";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ITopRatedPage } from "@/types/TopRatedResponse";
import Slide from "./Slide";
import { useDisplayDimensions } from "@/hooks";

interface ICarouselData {
  slides: ITopRatedPage[];
  movieData: IMovieInfoResponse[];
}

const Carousel: React.FC<ICarouselData> = ({ slides, movieData }) => {
  const [slideCount, setSliceCount] = useState<number>(5);
  const [skip, setSkip] = useState<number>(0);

  const dimension = useDisplayDimensions();

  useEffect(() => {
    if (dimension.width <= 768) {
      setSliceCount(1);
    } else if (dimension.width <= 1024) {
      setSliceCount(3);
    } else {
      setSliceCount(5);
    }
  }, [dimension]);

  const activeSlides = useMemo(() => {
    let end = skip + slideCount - 1;
    const indexes: number[] = [];

    if (end >= slides.length) {
      end -= slides.length;
      indexes.push(...Array.from({ length: slides.length - skip }, (_, i) => skip + i));
      indexes.push(...(!end ? [0] : Array.from({ length: end + 1 }, (_, i) => i)));
    } else {
      indexes.push(...Array.from({ length: end + 1 - skip }, (_, i) => skip + i));
    }

    return indexes.map((i) => slides[i]);
  }, [skip, slides, slideCount]);

  const moveBack = useCallback(() => {
    setSkip((s) => {
      const next = s - 1;
      if (next < 0) {
        return slides.length;
      }
      return next;
    });
  }, [slides]);

  const moveNext = useCallback(() => {
    setSkip((s) => {
      const next = s + 1;
      if (next >= slides.length) {
        return 0;
      }
      return next;
    });
  }, [slides]);

  return (
    <div className="w-full flex items-center justify-evenly mx-auto my-8 lg:max-w-full">
      <button className="border border-white p-2 left-8" onClick={moveBack}>
        Left
      </button>

      <div className="flex items-start justify-around gap-8 mx-10">
        {activeSlides.map((slide) => (
          <Slide key={slide.id} {...slide} {...movieData.find(({ id }) => id === slide.id)!} />
        ))}
      </div>

      <button className="border border-white p-2 right-8" onClick={moveNext}>
        Right
      </button>
    </div>
  );
};

export default Carousel;
