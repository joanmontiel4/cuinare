import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { iMenuOptions } from '../../interfaces/imenu-options';

const Home = React.lazy(() => import('../../../features/home/page/home'));
const Recipes = React.lazy(
    () => import('../../../features/recipes/page/recipes')
);
const MyFridge = React.lazy(
    () => import('../../../features/myfridge/page/myfridge')
);
const MyRecipes = React.lazy(
    () => import('../../../features/myrecipes/page/myrecipes')
);
const Favorites = React.lazy(
    () => import('../../../features/favorites/page/favorites')
);

export function AppRoutes({
    menuOptions,
}: {
    menuOptions: Array<iMenuOptions>;
}) {
    return (
        <Routes>
            <Route
                path={menuOptions[0].path}
                element={
                    <React.Suspense>
                        <Home />
                    </React.Suspense>
                }
            ></Route>
            <Route
                path={menuOptions[1].path}
                element={
                    <React.Suspense>
                        <Recipes />
                    </React.Suspense>
                }
            ></Route>
            <Route
                path={menuOptions[2].path}
                element={
                    <React.Suspense>
                        <MyFridge />
                    </React.Suspense>
                }
            ></Route>
            <Route
                path={menuOptions[3].path}
                element={
                    <React.Suspense>
                        <MyRecipes />
                    </React.Suspense>
                }
            ></Route>
            <Route
                path={menuOptions[4].path}
                element={
                    <React.Suspense>
                        <Favorites />
                    </React.Suspense>
                }
            ></Route>
            <Route path="*" element={<Navigate replace to="" />}></Route>
        </Routes>
    );
}
