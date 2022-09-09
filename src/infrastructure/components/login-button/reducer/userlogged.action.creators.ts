import { createAction } from '@reduxjs/toolkit';
import { iUser } from '../../../interfaces/iuser';
import { actionTypes } from './userlogged.action.types';

export interface iAction<T> {
    type: actionTypes;
    payload: T;
}

export const updateUserLoggedAction = createAction<iUser>(
    actionTypes['userLogged@update']
);
