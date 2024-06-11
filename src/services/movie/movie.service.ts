import { AxiosResponse } from 'axios';
import { deleteMethod, get, post, put } from '../base.service';
import {IAddMovieRequest, IFetchMoviePage, MovieDetail, MovieList} from '../../types/movie';



export const getAllMovies = (
    param: IFetchMoviePage
): Promise<AxiosResponse<MovieList>> => {
  return get<MovieList>({
    url: 'v1/movies',
    params: {
      status: param.status,
      cursor: param.cursor,
      limit: param.limit,
      order: param.order
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
  return post<{ message: string }>({
    url: 'v1/movies',
    body: { ...payload },
  });
};
