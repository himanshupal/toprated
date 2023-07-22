import type { IMovieCreditResponse } from "@/types/MovieCreditResponse";
import type { IMovieInfoResponse } from "@/types/MovieInfoResponse";
import type { ITopRatedPage } from "@/types/TopRatedResponse";
import { Fragment, useMemo, useState } from "react";
import { useDisplayDimensions } from "@/hooks";
import Modal from "@/components/Modal";
import Image from "next/image";
import Link from "next/link";

export interface ISlideData extends ITopRatedPage, IMovieInfoResponse {
  cast: IMovieCreditResponse["cast"];
}

const getUsername = (text: string) => text.split(" ").join("-").toLowerCase();

const Slide: React.FC<ISlideData> = ({ id, title, poster_path, original_title, vote_average, release_date, tagline, overview, cast }) => {
  const topCastInvolvedInActing = useMemo(() => cast.filter(({ known_for_department }) => known_for_department === "Acting").slice(0, 5), [cast]);
  const [modalActive, setModalActive] = useState<boolean>(false);
  const dimensions = useDisplayDimensions();

  return (
    <Fragment>
      <div className="relative flex flex-col bg-white rounded-lg overflow-hidden w-72 cursor-pointer" style={{ height: 600 }} onClick={() => setModalActive(true)}>
        <div title="Average Rating" className="absolute top-2 right-2 text-xs w-8 h-8 bg-white text-black rounded-full grid place-content-center font-semibold">
          {vote_average.toFixed(2)}
        </div>

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
        {(ref) => {
          const titleAndOverview = (
            <Fragment>
              <Link
                title={original_title}
                target="_blank"
                className="text-black text-3xl font-bold whitespace-break-spaces"
                href={`https://www.themoviedb.org/movie/${id}-${getUsername(title)}`}
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
            </Fragment>
          );

          return (
            <div ref={ref} className="relative bg-white rounded-xl overflow-hidden flex flex-col md:flex-row w-380 xs:w-500 md:w-750 lg:w-950">
              <div title="Average Rating" className="absolute top-3 left-3 text-xs w-8 h-8 bg-white text-black rounded-full grid place-content-center font-semibold">
                {vote_average.toFixed(2)}
              </div>

              <div className="rounded-l-xl h-full xs:flex md:block">
                <Image
                  priority
                  className={"object-cover xs:h-auto md:h-full" + (dimensions.width < 535 ? " w-full" : "")}
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={`Movie poster for ${title}`}
                  width={dimensions.width <= 768 ? 200 : 500}
                  height={dimensions.width <= 768 ? 450 : 750}
                />

                <div className="hidden xs:block md:hidden p-4">{titleAndOverview}</div>
              </div>

              <div className="flex flex-col gap-1 p-4 xs:pt-0 md:p-4 h-full md:w-75p">
                <div className="xs:hidden md:block">{titleAndOverview}</div>

                <hr />

                <h2 className="text-gray-800 text-lg font-semibold">Cast</h2>
                {topCastInvolvedInActing.map(({ id, name, character, profile_path }) => (
                  <Link key={id} target="_blank" className="text-gray-600 text-sm flex gap-2 items-center" href={`https://www.themoviedb.org/person/${id}-${getUsername(name)}`}>
                    <Image className="w-8 hidden md:inline-block" src={`https://image.tmdb.org/t/p/w200${profile_path}`} alt="" height={32} width={50} />
                    <span>
                      <b>{name}</b> <em>as</em> {character}
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
          );
        }}
      </Modal>
    </Fragment>
  );
};

export default Slide;
