import { createReducer } from '@reduxjs/toolkit';
import * as ac from './recipes.action.creators';
import { iRecipe } from '../../../infrastructure/interfaces/irecipe';

const initialState: Array<iRecipe> = [];

export const recipesReducer = createReducer(initialState, (builder) => {
    return (
        builder
            .addCase(ac.loadRecipesAction, (state, action) => action.payload)
            // .addCase(ac.addRecipesAction, (state, action) => {
            //     return [...state, action.payload];
            // })
            .addCase(ac.updateRecipeAction, (state, action) => {
                return state.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(ac.deleteRecipeAction, (state, action) => {
                return state.filter((item) => item.id !== action.payload.id);
            })
            .addDefaultCase((state) => state)
    );
});
