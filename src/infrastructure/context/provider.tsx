import { useState } from 'react';
import { AppContext } from './context';

export function AppContextProvider({ children }: { children: JSX.Element }) {
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);

    const context = {
        isLoadingCategories,
        setIsLoadingCategories,
        isLoadingRecipes,
        setIsLoadingRecipes,
    };

    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
}
