import { PageCursor } from './pagination';

export interface MovieList {
  data: MovieShortInfo[];
  pagination: PageCursor;
}

export interface MovieShortInfo {
  id: string;
  name: string;
  status: string;
  codes: string[];
  thumbnail: string;
  rating_code: string;
  movie_length: number;
  release_date: string;
}

export interface MovieDetail {
  id: string;
  name: string;
  tmdb: number;
  status: string;
  codes: string[];
  thumbnail: string;
  poster: string;
  description: string;
  rating_code: string;
  genres: string[];
  trailer: string;
  movie_length: number;
  director: string;
  language: string;
  actors: Actor[];
  release_date: string;
  created_at: string;
  updated_at: string;
}

export interface Actor {
  name: string;
  role: string;
  image: string;
}

export type IFetchMoviePage = {
  status: string;
  limit: number;
  order: string
  cursor: string;
};


export interface IAddMovieRequest {
  name: string;
  trailer: string;
  tmdb: number;
  status: string;
  genres: string[];
  codes: string[];
  release_date: string;
  poster: string;
  thumbnail: string;
  language: string;
  description: string;
  director: string;
  actors: string[];
  rating_code: string;
  length: number;
}

