import { AxiosResponse } from 'axios';
import { deleteMethod, get, post, put } from '../base.service';
import { IAddMovieRequest, MovieDetail, MovieList } from '../../types/movie';

export interface ICreateUserBody {
  firstName: string;
  lastName: string;
  age: number;
}

export const getAllMovies = (
  status: string,
  cursor: string,
  limit: number
): Promise<AxiosResponse<MovieList>> => {
  return get<MovieList>({
    url: 'v1/movies',
    params: {
      status,
      cursor,
      limit,
    },
  });
};

export const getMovie = (id: string): Promise<AxiosResponse<MovieDetail>> => {
  return get<MovieDetail>({
    url: `v1/movies/${id}`,
  });
};

export const addMovie = (payload: IAddMovieRequest) => {
  console.log(payload);
  return post<any>({
    url: 'v1/movies',
    body: { ...payload },
  });
};
