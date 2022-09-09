import { createAction } from '@reduxjs/toolkit';
import { actionTypes } from './islogged.action.types';

export interface iAction<T> {
    type: actionTypes;
    payload: T;
}
// Temporarily change Array<iRecipe> to <iRecipe>
export const updateIsLoggedAction = createAction<boolean>(
    actionTypes['isLogged@update']
);
