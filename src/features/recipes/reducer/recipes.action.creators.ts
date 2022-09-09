import { createAction } from '@reduxjs/toolkit';
import { iRecipe } from '../../../infrastructure/interfaces/irecipe';

import { actionTypes } from './recipes.action.types';

export interface iAction<T> {
    type: actionTypes;
    payload: T;
}
// Temporarily change Array<iRecipe> to <iRecipe>
export const loadRecipesAction = createAction<Array<iRecipe>>(
    actionTypes['recipes@load']
);
// export const addTasksAction = createAction<iTask>(actionTypes['tasks@add']);
export const updateRecipeAction = createAction<iRecipe>(
    actionTypes['recipes@update']
);
export const deleteRecipeAction = createAction<iRecipe>(
    actionTypes['recipes@delete']
);
