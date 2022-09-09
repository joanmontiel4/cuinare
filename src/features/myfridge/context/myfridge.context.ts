import { createContext, SyntheticEvent } from 'react';
import { iRecipe } from '../../../infrastructure/interfaces/irecipe';

const initialContext: {
    ingredient: string;
    selectedIngredients: Array<string>;
    recipesState: Array<iRecipe>;
    isLoadingRecipes: boolean;
    ingredientsList: Array<string>;
    ingListFilter(): Array<string>;
    handleSubmit(ev: SyntheticEvent): void;
    handleInputChange(ev: SyntheticEvent): void;
    handleIngredientClick(ev: SyntheticEvent, ingredient: string): void;
    handleDeleteButton(ev: SyntheticEvent, ingredient: string): void;
    handleFindRecipes(ev: SyntheticEvent): void;
    handleClearClick(ev: SyntheticEvent): void;
} = {
    ingredient: '',
    selectedIngredients: [],
    recipesState: [],
    isLoadingRecipes: false,
    ingredientsList: [],
    ingListFilter: () => [],
    handleSubmit: (ev) => {},
    handleInputChange: (ev) => {},
    handleIngredientClick: (ev, ingredient) => {},
    handleDeleteButton: (ev, ingredient) => {},
    handleFindRecipes: (ev) => {},
    handleClearClick: (ev) => {},
};
export const MyFridgeContext = createContext(initialContext);
