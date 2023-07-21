import { useCallback, useMemo, useState } from "react";
import Slide, { type ISlideData } from "./Slide";

interface ICarouselData {
  slides: ISlideData[];
}

const AT_ONCE = 5;

const Carousel: React.FC<ICarouselData> = ({ slides }) => {
  const [skip, setSkip] = useState<number>(0);

  const activeSlides = useMemo(() => {
    let end = skip + AT_ONCE - 1;
    const indexes: number[] = [];

    if (end >= slides.length) {
      end -= slides.length;
      indexes.push(...Array.from({ length: slides.length - skip }, (_, i) => skip + i));
      indexes.push(...(!end ? [0] : Array.from({ length: end + 1 }, (_, i) => i)));
    } else {
      indexes.push(...Array.from({ length: end + 1 - skip }, (_, i) => skip + i));
    }

    return indexes.map((i) => slides[i]);
  }, [skip, slides]);

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
    <div className="w-full flex items-center justify-evenly mx-auto my-8" style={{ maxWidth: "90%" }}>
      <button className="border border-white p-2 left-8" onClick={moveBack}>
        Left
      </button>

      <div className="flex flex-wrap items-start justify-around gap-12 mx-10">
        {activeSlides.map((slide) => (
          <Slide key={slide.id} {...slide} />
        ))}
      </div>

      <button className="border border-white p-2 right-8" onClick={moveNext}>
        Right
      </button>
    </div>
  );
};

export default Carousel;
