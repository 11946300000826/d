import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import { TypeCommon } from '../../types/common';
import { handleError } from '../../utils/common.utils';
import {
  addMovie,
  getAllMovies,
  getMovie,
} from '../../services/movie/movie.service';
import { IAddMovieRequest } from '../../types/movie';

export type InitialValue = {
  loading: boolean;
  error: object;
  disable?: boolean;
};

const initialState: InitialValue = {
  error: {},
  loading: false,
  disable: false,
};

type MovieListArg = {
  status: string;
  limit: number;
  cursor: string;
};

export const movieListThunk = createAsyncThunk(
  'movie/list',
  async ({ status, limit, cursor }: MovieListArg, { rejectWithValue }) => {
    try {
      const response = await getAllMovies(status, cursor, limit);
      return response?.data;
    } catch (error) {
      return handleError(error as TypeCommon, rejectWithValue);
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
      return handleError(error as TypeCommon, rejectWithValue);
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
      return handleError(error as TypeCommon, rejectWithValue);
    }
  }
);

// export const createUserThunk = createAsyncThunk(
//     'user/create',
//     async (body: ICreateUserBody, { rejectWithValue }) => {
//         try {
//             const response = await createUser(body);
//             return response?.data;
//         } catch (error) {
//             return handleError(error as TypeCommon, rejectWithValue);
//         }
//     }
// );
//
// export const updateUserThunk = createAsyncThunk(
//     'user/update',
//     async ({ id, body }: { id: string; body: Partial<ICreateUserBody> }, { rejectWithValue }) => {
//         try {
//             const response = await updateUser(id, body);
//             return response?.data;
//         } catch (error) {
//             return handleError(error as TypeCommon, rejectWithValue);
//         }
//     }
// );
//
// export const deleteUserThunk = createAsyncThunk(
//     'user/update',
//     async ({ id }: { id: string }, { rejectWithValue }) => {
//         try {
//             const response = await deleteUser(id);
//             return response?.data;
//         } catch (error) {
//             return handleError(error as TypeCommon, rejectWithValue);
//         }
//     }
// );

export const movieSlice: TypeCommon = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAutoSaveRunning: (state, action: PayloadAction<boolean>) => {
      state.disable = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        movieListThunk.fulfilled,
        movieDetailThunk.fulfilled,
        addMovieThunk.fulfilled
        // createUserThunk.fulfilled,
        // updateUserThunk.fulfilled,
        // deleteUserThunk.fulfilled
      ),
      (state) => {
        return {
          ...state,
          loading: false,
          error: {},
        };
      }
    );
    builder.addMatcher(
      isAnyOf(
        movieListThunk.rejected,
        movieDetailThunk.rejected,
        addMovieThunk.rejected
        // createUserThunk.rejected,
        // updateUserThunk.rejected,
        // deleteUserThunk.rejected
      ),
      (state, action) => {
        return {
          ...state,
          loading: false,
          error: {
            message: action.payload,
          },
        };
      }
    );
    builder.addMatcher(
      isAnyOf(
        movieListThunk.pending,
        movieDetailThunk.pending,
        addMovieThunk.pending
        // createUserThunk.pending,
        // updateUserThunk.pending,
        // deleteUserThunk.fulfilled
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
        // createUserThunk.pending,
        // updateUserThunk.pending,
        // deleteUserThunk.pending
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

export const { setIsAutoSaveRunning } = movieSlice.actions;

export default movieSlice.reducer;
