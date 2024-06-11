import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import { TypeCommon } from '../../types/common';
import {
  addMovie,
  getAllMovies,
  getMovie,
} from '../../services/movie/movie.service';
import { IAddMovieRequest,IFetchMoviePage } from '../../types/movie';
import {RootState} from "../store";
import {AxiosError} from "axios";

export type InitialValue = {
  loading: boolean;
  error: string | undefined;
};

const initialState: InitialValue = {
  error: undefined,
  loading: false,
};


export const movieListThunk = createAsyncThunk(
  'movie/list',
  async (payload: IFetchMoviePage, { rejectWithValue }) => {
    try {
      const response = await getAllMovies(payload);
      return response?.data;
    } catch (error) {
        return rejectWithValue(error);
    }
  }
);

export const movieDetailThunk = createAsyncThunk(
  'movie/detail',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getMovie(id);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addMovieThunk = createAsyncThunk(
  'movie/add',
  async (payload: IAddMovieRequest, { rejectWithValue }) => {
    try {
      const response = await addMovie(payload);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);




export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        movieListThunk.fulfilled,
        movieDetailThunk.fulfilled,
        addMovieThunk.fulfilled
      ),
      (state) => {
        return {
          ...state,
          loading: false,
          error: undefined,
        };
      }
    );
    builder.addMatcher(
      isAnyOf(
        movieListThunk.rejected,
        movieDetailThunk.rejected,
        addMovieThunk.rejected
      ),
      (state, action) => {
        return {
          ...state,
          loading: false,
          error: (action.payload as AxiosError).message,
        };
      }
    );
    builder.addMatcher(
      isAnyOf(
        movieListThunk.pending,
        movieDetailThunk.pending,
        addMovieThunk.pending
      ),
      (state) => {
        return {
          ...state,
          loading: true,
        };
      }
    );
    builder.addMatcher(
      isAnyOf(
        movieListThunk.pending,
        movieDetailThunk.pending,
        addMovieThunk.pending

      ),
      (state) => {
        return {
          ...state,
          loading: false,
        };
      }
    );
  },
});


export const movieSelector = (state: RootState) => state.rootReducer.movieReducer;


export default movieSlice.reducer;
