import { createAction } from '@reduxjs/toolkit';
import { iCategory } from '../../../infrastructure/interfaces/icategory';

import { actionTypes } from './categories.action.types';

export interface iAction<T> {
    type: actionTypes;
    payload: T;
}
// Temporarily change Array<iRecipe> to <iRecipe>
export const loadCategoriesAction = createAction<Array<iCategory>>(
    actionTypes['categories@load']
);
// export const addTasksAction = createAction<iTask>(actionTypes['tasks@add']);
// export const updateTasksAction = createAction<iTask>(
//     actionTypes['tasks@update']
// );
// export const deleteTasksAction = createAction<iTask>(
//     actionTypes['tasks@delete']
// );
