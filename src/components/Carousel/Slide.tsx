import type { IMovieInfoResponse } from "@/types/MovieInfoResponse";
import type { ITopRatedPage } from "@/types/TopRatedResponse";
import Image from "next/image";

export interface ISlideData extends ITopRatedPage, IMovieInfoResponse {
  // ...
}

const Slide: React.FC<ISlideData> = ({ id, title, poster_path, original_title, vote_average, release_date, tagline, overview }) => {
  const slideClicked = () => {
    console.log({ id });
  };

  return (
    <div className="relative flex flex-col bg-white rounded-lg overflow-hidden w-72" style={{ height: 600 }} onClick={slideClicked}>
      <div className="absolute top-2 right-2 text-xs w-8 h-8 bg-white text-black rounded-full grid place-content-center font-semibold">{vote_average.toFixed(2)}</div>

      <div className="rounded-t-lg w-full">
        <Image className="w-full" priority src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={`Movie poster for ${title}`} width={250} height={375} />
      </div>

      <div className="flex flex-col gap-1 p-2 h-full">
        <h1 className="text-black text-xl font-bold whitespace-break-spaces" title={original_title}>
          {title.replace(": ", ":\n")}
        </h1>

        <h3 className="text-gray-700 text-sm overflow-hidden text-ellipsis line-clamp-3" title={tagline ? undefined : overview}>
          {tagline || overview}
        </h3>

        <div className="flex flex-1 items-end justify-end">
          <h2 className="text-gray-800 font-bold text-sm">
            Release Date:
            <span className="text-gray-700 font-semibold"> {release_date}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Slide;
