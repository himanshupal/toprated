import { ITopRatedPage } from "./TopRatedResponse";

export interface ICollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_pat: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IProductionCompany {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
}

export interface IProductionCountry {
  name: string;
  iso_3166_1: string;
}

export interface ISpokenLanguages {
  name: string;
  english_name: string;
  iso_639_1: string;
}

export interface IMovieInfoResponse extends Omit<ITopRatedPage, "genre_ids"> {
  belongs_to_collection: ICollection | null;
  budget: number;
  genres: IGenre[];
  homepage: string;
  imdb_id: string;
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguages[];
  status: string;
  tagline: string;
}
