import {
    SyntheticEvent,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../../../infrastructure/context/context';
import { RootState } from '../../../store/store';
import { MyFridgeContext } from './myfridge.context';
import * as acr from '../../recipes/reducer/recipes.action.creators';
import { HttpRecipeProxy } from '../../../infrastructure/services/http-recipe-proxy';

export function MyFridgeProvider({ children }: { children: JSX.Element }) {
    const [ingredient, setIngredient] = useState('');
    const initialSelectedIngredients: Array<string> = [];
    const [selectedIngredients, setSelectedIngredients] = useState(
        initialSelectedIngredients
    );
    const initialIngredientsList: Array<string> = [];
    const [ingredientsList, setIngredientsList] = useState(
        initialIngredientsList
    );

    const recipesState = useSelector((state: RootState) => state.recipes);
    const dispatch = useDispatch();
    const { isLoadingRecipes, setIsLoadingRecipes } = useContext(AppContext);

    const api = useMemo(() => {
        return new HttpRecipeProxy();
    }, []);

    const loadIngredients = useCallback(() => {
        dispatch(acr.loadRecipesAction([]));
        api.getListAllIngredients().then((data: Array<string>) =>
            setIngredientsList(data)
        );
    }, [api, dispatch]);

    useEffect(() => {
        loadIngredients();
    }, [loadIngredients]);

    const ingListFilter = () => {
        return ingredientsList.filter((item) =>
            item.toLowerCase().includes(ingredient.toLowerCase())
        );
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        let currentIngredient: string;
        if (ingListFilter().length === 1) {
            currentIngredient = ingListFilter()[0];
            if (!selectedIngredients.includes(currentIngredient)) {
                setSelectedIngredients([
                    ...selectedIngredients,
                    currentIngredient,
                ]);
            }
        }
    };

    const handleInputChange = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const currentIngredient = (ev.target as HTMLFormElement).value;
        setIngredient(currentIngredient);
    };

    const handleIngredientClick = (ev: SyntheticEvent, ingredient: string) => {
        ev.preventDefault();
        !selectedIngredients.includes(ingredient) &&
            setSelectedIngredients([...selectedIngredients, ingredient]);
    };

    const handleDeleteButton = (ev: SyntheticEvent, ingredient: string) => {
        ev.preventDefault();
        setSelectedIngredients(
            selectedIngredients.filter((item) => item !== ingredient)
        );
    };

    const handleFindRecipes = (ev: SyntheticEvent) => {
        ev.preventDefault();
        if (selectedIngredients.length > 0) {
            setIsLoadingRecipes(true);
            api.getListFilterByIngredients(selectedIngredients).then((data) => {
                dispatch(acr.loadRecipesAction(data));
                setIsLoadingRecipes(false);
            });
        } else {
            dispatch(acr.loadRecipesAction([]));
        }
    };

    const handleClearClick = (ev: SyntheticEvent) => {
        ev.preventDefault();
        setIngredient('');
    };

    const context = {
        ingredient,
        selectedIngredients,
        recipesState,
        isLoadingRecipes,
        ingredientsList,
        ingListFilter,
        handleSubmit,
        handleInputChange,
        handleIngredientClick,
        handleDeleteButton,
        handleFindRecipes,
        handleClearClick,
    };
    return (
        <MyFridgeContext.Provider value={context}>
            {children}
        </MyFridgeContext.Provider>
    );
}
