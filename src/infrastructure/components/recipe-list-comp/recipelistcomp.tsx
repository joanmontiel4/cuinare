import { iRecipe } from '../../interfaces/irecipe';
import { Recipe } from '../recipe/recipe';
import './recipelistcomp.scss';

export function RecipeListComp({ recipeList }: { recipeList: Array<iRecipe> }) {
    return (
        <div className="recipes-container">
            <div className="recipes__title-container">
                <h2 className="recipes__title">Recipes</h2>
            </div>
            <ul className="recipes">
                {recipeList.map((recipe) => (
                    <li key={recipe.id} className="recipes__item">
                        <Recipe recipe={recipe}></Recipe>
                    </li>
                ))}
            </ul>
        </div>
    );
}
