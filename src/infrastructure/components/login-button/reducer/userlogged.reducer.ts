import { createReducer } from '@reduxjs/toolkit';
import { iUser } from '../../../interfaces/iuser';
import * as ac from './userlogged.action.creators';

const initialState: iUser = {
    uid: '',
    token: '',
    name: '',
    email: '',
    photoURL: '',
    favorites: [],
    myRecipes: [],
};

export const userLoggedReducer = createReducer(initialState, (builder) => {
    return builder
        .addCase(ac.updateUserLoggedAction, (state, action) => action.payload)
        .addDefaultCase((state) => state);
});
