import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { IMovieCreditResponse } from "@/types/MovieCreditResponse";
import type { IMovieInfoResponse } from "@/types/MovieInfoResponse";
import type { ITopRatedResponse } from "@/types/TopRatedResponse";
import favicon from "@/assets/icons/favicon.ico";
import Carousel from "@/components/Carousel";
import { fetchDataFromTMDB } from "@/utils";
import { Fragment } from "react";
import Head from "next/head";

export interface IHomeUIProps extends InferGetServerSidePropsType<typeof getServerSideProps> {
  // ...
}

const HomeUI = ({ data, movieData, castData }: IHomeUIProps) => {
  return (
    <Fragment>
      <Head>
        <title>Top Rated Movies</title>
        <link rel="icon" href={favicon.src} type="image/x-icon" />
        <meta name="description" content="App that shows top rated movies using TMDB API" />
      </Head>

      <div className="px-3 py-8">
        <h1 className="font-bold text-2xl">Top Rated Movies</h1>
        <Carousel slides={data.results} movieData={movieData} castData={castData} />
      </div>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps<{ data: ITopRatedResponse; movieData: IMovieInfoResponse[]; castData: IMovieCreditResponse[] }> = async () => {
  const data = await fetchDataFromTMDB();
  const movieData = await Promise.all(
    data.results.map(async ({ id }) => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_APP_TMDB_API_KEY}`);
      return (await response.json()) as IMovieInfoResponse;
    })
  );
  const castData = await Promise.all(
    data.results.map(async ({ id }) => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_APP_TMDB_API_KEY}`);
      return (await response.json()) as IMovieCreditResponse;
    })
  );
  return { props: { data, movieData, castData } };
};

export default HomeUI;
