import type { IMovieCreditResponse } from "@/types/MovieCreditResponse";
import type { IMovieInfoResponse } from "@/types/MovieInfoResponse";
import type { ITopRatedPage } from "@/types/TopRatedResponse";
import { Fragment, useMemo, useState } from "react";
import Image from "next/image";
import Modal from "../Modal";
import Link from "next/link";

export interface ISlideData extends ITopRatedPage, IMovieInfoResponse {
  cast: IMovieCreditResponse["cast"];
}

const Slide: React.FC<ISlideData> = ({ id, title, poster_path, original_title, vote_average, release_date, tagline, overview, cast }) => {
  const topCastInvolvedInActing = useMemo(() => cast.filter(({ known_for_department }) => known_for_department === "Acting").slice(0, 5), [cast]);
  const [modalActive, setModalActive] = useState<boolean>(false);

  const slideClicked = () => {
    setModalActive(true);
  };

  return (
    <Fragment>
      <div className="relative flex flex-col bg-white rounded-lg overflow-hidden w-72 cursor-pointer" style={{ height: 600 }} onClick={slideClicked}>
        <div className="absolute top-2 right-2 text-xs w-8 h-8 bg-white text-black rounded-full grid place-content-center font-semibold">{vote_average.toFixed(2)}</div>

        <div className="rounded-t-lg w-full">
          <Image className="w-full" priority src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={`Movie poster for ${title}`} width={250} height={375} />
        </div>

        <div className="flex flex-col gap-1 p-2 h-full">
          <h1 className="text-black text-xl font-bold whitespace-break-spaces" title={original_title}>
            {title.replace(": ", ":\n")}
          </h1>

          <p className="text-gray-700 text-sm overflow-hidden text-ellipsis line-clamp-3" title={tagline ? undefined : overview}>
            {tagline || overview}
          </p>

          <div className="flex flex-1 items-end justify-end">
            <p className="text-gray-800 font-bold text-sm">
              Release Date:
              <span className="text-gray-700 font-semibold"> {release_date}</span>
            </p>
          </div>
        </div>
      </div>

      <Modal isActive={modalActive} onClose={() => setModalActive(false)}>
        <div className="bg-white rounded-xl overflow-hidden flex" style={{ width: 950 }}>
          <div className="rounded-l-xl h-full">
            <Image priority src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`Movie poster for ${title}`} width={500} height={750} />
          </div>

          <div className="flex flex-col gap-1 p-4 h-full" style={{ width: "75%" }}>
            <Link
              title={original_title}
              target="_blank"
              className="text-black text-3xl font-bold whitespace-break-spaces"
              href={`https://www.themoviedb.org/movie/${id}-${title.split(" ").join("-").toLowerCase()}`}
            >
              {title.replace(": ", ":\n")}
            </Link>

            {tagline && (
              <p className="text-gray-500 text-sm">
                <em>{tagline}</em>
              </p>
            )}

            <hr />

            <h3 className="text-gray-800 font-light">{overview}</h3>

            <hr />

            <h2 className="text-gray-800 text-lg font-semibold">Cast</h2>
            {topCastInvolvedInActing.map(({ id, name, character, profile_path }) => (
              <Link
                key={id}
                target="_blank"
                className="text-gray-600 text-sm flex gap-2 items-center"
                href={`https://www.themoviedb.org/person/${id}-${name.split(" ").join("-").toLowerCase()}`}
              >
                <Image className="w-8" src={`https://image.tmdb.org/t/p/w200${profile_path}`} alt="" height={32} width={50} />
                <span>
                  {name} <em>as</em> {character}
                </span>
              </Link>
            ))}

            <div className="flex flex-1 items-end justify-end">
              <p className="text-gray-800 font-bold text-sm">
                Release Date:
                <span className="text-gray-700 font-semibold"> {release_date}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Slide;
