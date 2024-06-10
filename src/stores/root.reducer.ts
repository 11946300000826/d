
import { combineReducers } from '@reduxjs/toolkit';
import movieReducer from './movie/movie.slice';

export const rootReducer = combineReducers({
    movieReducer
});