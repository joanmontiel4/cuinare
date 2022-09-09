import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { categoriesReducer } from '../features/recipes/reducer/categories.reducer';
import { recipesReducer } from '../features/recipes/reducer/recipes.reducer';
import { isLoggedReducer } from '../infrastructure/components/login-button/reducer/islogged.reducer';
import { userLoggedReducer } from '../infrastructure/components/login-button/reducer/userlogged.reducer';

export const store = configureStore({
    preloadedState: {
        recipes: [],
        categories: [],
        isLogged: false,
        userLogged: {
            uid: '',
            token: '',
            name: '',
            email: '',
            photoURL: '',
            favorites: [],
            myRecipes: [],
        },
    },
    reducer: {
        recipes: recipesReducer,
        categories: categoriesReducer,
        isLogged: isLoggedReducer,
        userLogged: userLoggedReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
