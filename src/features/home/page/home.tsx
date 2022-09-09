import { Recipe } from '../../../infrastructure/components/recipe/recipe';
import { useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { HttpRecipeProxy } from '../../../infrastructure/services/http-recipe-proxy';
import { AppContext } from '../../../infrastructure/context/context';
import * as acr from '../../recipes/reducer/recipes.action.creators';
import './home.scss';

function HomePage() {
    // Responsabilities:
    // - Get list of categories and render category-buttons
    // - Get list of receipes depending on the category selected
    // - Call Recipe card for each element

    const recipesState = useSelector((state: RootState) => state.recipes);
    const dispatch = useDispatch();

    const { isLoadingRecipes, setIsLoadingRecipes } = useContext(AppContext);

    const repo = useMemo(() => {
        return new HttpRecipeProxy();
    }, []);

    useEffect(() => {
        setIsLoadingRecipes(true);
        repo.getLatestReceips().then((data) => {
            dispatch(acr.loadRecipesAction(data));
            setIsLoadingRecipes(false);
        });
    }, [repo, dispatch, setIsLoadingRecipes]);

    return (
        <section className="homepage-section">
            <div className="home-init">
                <span className="home-init__title">cuinare</span>
            </div>
            <div className="home-init__text-box">
                <p className="home-init__text">
                    Recipes are not mathematical formulas, but like feelings,
                    they vary from person to person.
                </p>
                <br />
                <p className="home-init__text">
                    The recipes do not belong to the one who tells them, but to
                    the one who makes them, because each one puts their personal
                    and unique stamp.
                </p>
            </div>
            {isLoadingRecipes ? (
                <div className="loading-spinner-container">
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                <div className="recipes-container">
                    <div className="recipes__title-container">
                        <h2 className="recipes__title">Latest recipes</h2>
                    </div>
                    <ul className="recipes">
                        {recipesState.map((recipe) => (
                            <li key={recipe.id} className="recipes__item">
                                <Recipe recipe={recipe}></Recipe>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}

export default HomePage;
