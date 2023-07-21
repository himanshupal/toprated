export interface IMovieCast {
  id: number;
  adult: boolean;
  gender: number;
  known_for_department: "Acting";
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface IMovieCreditResponse {
  id: number;
  cast: IMovieCast[];
}
