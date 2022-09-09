import { createContext } from 'react';

interface iContext {
    isLoadingCategories: boolean;
    setIsLoadingCategories: Function;
    isLoadingRecipes: boolean;
    setIsLoadingRecipes: Function;
}

export const initialContext: iContext = {
    isLoadingCategories: false,
    setIsLoadingCategories: () => {},
    isLoadingRecipes: false,
    setIsLoadingRecipes: () => {},
};

export const AppContext = createContext(initialContext);
