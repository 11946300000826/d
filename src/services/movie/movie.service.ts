import { AxiosResponse } from "axios";
import { IAddMovieRequest, IFetchMoviePage, MovieDetail, MovieList } from "../../types/movie";
import { client, get, post } from "../base.service";

export const getAllMovies = (param: IFetchMoviePage): Promise<AxiosResponse<MovieList>> => {
	return get<MovieList>({
		url: "v1/movies",
		params: {
			status: param.status,
			cursor: param.cursor,
			limit: param.limit,
			order: param.order,
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
		url: "v1/movies",
		body: { ...payload },
	});
};

// export const updateMovie = (id: string, payload: MovieDetail) => {
// 	console.log(payload);

// 	return patch<{ message: string }>({
// 		url: `v1/movies/${id}`,
// 		body: { ...payload },
// 	});
// };

export const updateMovie = async (id: string, body: any) => {
	return await client.patch(`v1/movies/${id}`, body);
};
