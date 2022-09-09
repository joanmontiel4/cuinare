import { createReducer } from '@reduxjs/toolkit';
import * as ac from './categories.action.creators';
import { iCategory } from '../../../infrastructure/interfaces/icategory';

const initialState: Array<iCategory> = [];

export const categoriesReducer = createReducer(initialState, (builder) => {
    return (
        builder
            .addCase(ac.loadCategoriesAction, (state, action) => action.payload)
            // .addCase(ac.addTasksAction, (state, action) => {
            //     return [...state, action.payload];
            // })
            // .addCase(ac.updateTasksAction, (state, action) => {
            //     return state.map((item) =>
            //         item.id === action.payload.id ? action.payload : item
            //     );
            // })
            // .addCase(ac.deleteTasksAction, (state, action) => {
            //     return state.filter((item) => item.id !== action.payload.id);
            // })
            .addDefaultCase((state) => state)
    );
});
