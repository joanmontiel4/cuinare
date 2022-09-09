// test-utils.js
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// Import your own reducer
import { recipesReducer } from '../../features/recipes/reducer/recipes.reducer';
import { categoriesReducer } from '../../features/recipes/reducer/categories.reducer';
import { isLoggedReducer } from '../../infrastructure/components/login-button/reducer/islogged.reducer';
import { userLoggedReducer } from '../../infrastructure/components/login-button/reducer/userlogged.reducer';

function render(
    ui: JSX.Element,
    {
        preloadedState,
        store = configureStore({
            reducer: {
                recipes: recipesReducer,
                categories: categoriesReducer,
                isLogged: isLoggedReducer,
                userLogged: userLoggedReducer,
            },
            preloadedState,
        }),
        ...renderOptions
    }: { [key: string]: any } = {}
) {
    function Wrapper({ children }: { children: JSX.Element }) {
        return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
