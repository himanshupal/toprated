import type { ITopRatedPage } from "@/types/TopRatedResponse";
import Image from "next/image";

export interface ISlideData extends ITopRatedPage {
  // ...
}

const Slide: React.FC<ISlideData> = ({ id, title, poster_path, original_title, original_language }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden" style={{ height: 500 }}>
      <div className="rounded-t-lg max-w-max">
        <Image
          priority
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          style={{ height: "auto", width: "auto" }}
          alt={`Movie poster for ${title}`}
          height={320}
          width={250}
        />
      </div>

      <div className="flex flex-col gap-1 p-2">
        <span className="text-black">{id}</span>
        <div className="text-black font-bold whitespace-break-spaces">
          {title.split(": ").join("\n")} <p className="text-sm font-light">{original_language !== "en" && `(${original_title})`}</p>
        </div>
      </div>
    </div>
  );
};

export default Slide;
