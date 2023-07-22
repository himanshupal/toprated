import type { IMovieCreditResponse } from "@/types/MovieCreditResponse";
import type { IMovieInfoResponse } from "@/types/MovieInfoResponse";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ITopRatedPage } from "@/types/TopRatedResponse";
import rightIcon from "@/assets/icons/right.svg";
import { useDisplayDimensions } from "@/hooks";
import leftIcon from "@/assets/icons/left.svg";
import Image from "next/image";
import Slide from "./Slide";

interface ICarouselData {
  slides: ITopRatedPage[];
  movieData: IMovieInfoResponse[];
  castData: IMovieCreditResponse[];
}

const Carousel: React.FC<ICarouselData> = ({ slides, movieData, castData }) => {
  const [slideCount, setSlideCount] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);

  const dimension = useDisplayDimensions();

  useEffect(() => {
    if (dimension.width <= 850) {
      return setSlideCount(1);
    }
    if (dimension.width <= 1200) {
      return setSlideCount(2);
    }
    if (dimension.width <= 1440) {
      return setSlideCount(3);
    }
    if (dimension.width <= 1800) {
      return setSlideCount(4);
    }
    return setSlideCount(5);
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
    <div className="w-full flex items-center justify-evenly mx-auto my-8 gap-2">
      <button className="border border-white rounded-full left-8 w-8 h-8 grid place-content-center hover:animate-pulse" onClick={moveBack}>
        <Image src={leftIcon.src} alt="L" width={8} height={8} />
      </button>

      <div className="flex items-start justify-around gap-8">
        {activeSlides.map((slide) => (
          <Slide key={slide.id} {...slide} {...movieData.find(({ id }) => id === slide.id)!} cast={...castData.find(({ id }) => id === slide.id)!.cast} />
        ))}
      </div>

      <button className="border border-white rounded-full right-8 w-8 h-8 grid place-content-center hover:animate-pulse" onClick={moveNext}>
        <Image src={rightIcon} alt="R" width={8} height={8} />
      </button>
    </div>
  );
};

export default Carousel;
