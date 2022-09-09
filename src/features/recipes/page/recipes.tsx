import { CategoryBtn } from '../components/categorybtn';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import * as acr from '../reducer/recipes.action.creators';
import * as acc from '../reducer/categories.action.creators';
import { HttpRecipeProxy } from '../../../infrastructure/services/http-recipe-proxy';
import { AppContext } from '../../../infrastructure/context/context';
import './recipes.scss';
import { RecipeListComp } from '../../../infrastructure/components/recipe-list-comp/recipelistcomp';
import { SpinLoader } from '../../../infrastructure/components/spin-loader/spinloader';

function Recipes() {
    // Responsabilities:
    // - Get list of categories and render category-buttons
    // - Get list of receipes depending on the category selected
    // - Call Recipe card for each element

    const initialCategory = 'Beef';

    const recipesState = useSelector((state: RootState) => state.recipes);
    const categoriesState = useSelector((state: RootState) => state.categories);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const dispatch = useDispatch();

    const { isLoadingCategories, setIsLoadingCategories } =
        useContext(AppContext);
    const { isLoadingRecipes, setIsLoadingRecipes } = useContext(AppContext);

    const repo = useMemo(() => {
        return new HttpRecipeProxy();
    }, []);

    useEffect(() => {
        setIsLoadingCategories(true);
        setIsLoadingRecipes(true);
        repo.getAllRecipeCategories().then((data) => {
            dispatch(acc.loadCategoriesAction(data));
            setIsLoadingCategories(false);
        });
        repo.getListFilterByCategory(selectedCategory).then((data) => {
            dispatch(acr.loadRecipesAction(data));
            setIsLoadingRecipes(false);
        });
    }, [
        repo,
        dispatch,
        selectedCategory,
        setIsLoadingCategories,
        setIsLoadingRecipes,
    ]);

    return (
        <section className="recipes-section">
            {isLoadingCategories ? (
                <SpinLoader />
            ) : (
                <div className="category-container">
                    <ul className="category">
                        {categoriesState.map((category) => (
                            <li key={category.id} className="category__item">
                                <CategoryBtn
                                    category={category}
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                ></CategoryBtn>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {isLoadingRecipes ? (
                <SpinLoader />
            ) : (
                <RecipeListComp recipeList={recipesState} />
            )}
        </section>
    );
}

export default Recipes;
