import type { ITopRatedResponse } from "@/types/TopRatedResponse";

const fetchDataFromTMDB = async (revalidate?: boolean | number): Promise<ITopRatedResponse> => {
  const config: RequestInit = {};

  if (revalidate) {
    config.next = {
      revalidate: typeof revalidate === "number" ? revalidate : 60,
    };
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&limit=10&api_key=${process.env.NEXT_APP_TMDB_API_KEY}`,
    config
  );

  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
};

export default fetchDataFromTMDB;
