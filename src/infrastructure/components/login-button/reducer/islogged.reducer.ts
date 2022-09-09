import { createReducer } from '@reduxjs/toolkit';
import * as ac from './islogged.action.creators';

const initialState: boolean = false;

export const isLoggedReducer = createReducer(initialState, (builder) => {
    return builder
        .addCase(ac.updateIsLoggedAction, (state, action) => action.payload)
        .addDefaultCase((state) => state);
});
