import { RecipeListComp } from '../../../infrastructure/components/recipe-list-comp/recipelistcomp';
import './myfridge.scss';
import { SpinLoader } from '../../../infrastructure/components/spin-loader/spinloader';
import { Ingredients } from '../components/ingredients';
import { useContext } from 'react';
import { MyFridgeContext } from '../context/myfridge.context';

function MyFridge() {
    // Responsabilities:
    // - Form to add ingredient to list of selected ingredients
    // - List of selected ingredients with button to delete each ingredient and Find recipes button
    // - Box showing ingredients that is filtered while typing in the ingredient name showing only matching ingredients
    // - List of recipes

    const {
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
    } = useContext(MyFridgeContext);

    return (
        <section className="myfridge-section">
            <div className="myfridge-init">
                <div className="myfridge-init__title-container">
                    <h2 className="myfridge-init__title">My Fridge</h2>
                </div>
                <div className="myfridge-init__header">
                    <form className="ingredients-form" onSubmit={handleSubmit}>
                        <label htmlFor="ingredient">Search ingredient:</label>
                        <div className="ingredients-form__input-btn-container">
                            <input
                                type="text"
                                value={ingredient}
                                name="ingredient"
                                onChange={handleInputChange}
                                required
                                className="ingredients-form__text-input"
                            />
                            <button className="form__button ingredients-form__button--add">
                                Add
                            </button>
                            <button
                                className="form__button ingredients-form__button--clear"
                                onClick={handleClearClick}
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                    <div className="selected-ing">
                        <span>List of selected ingredients: </span>
                        <ul className="selected-ing__list">
                            {selectedIngredients.map((item) => (
                                <li
                                    key={`select${item}`}
                                    className="selected-ing__item"
                                >
                                    <span>{item}</span>
                                    <span
                                        role="button"
                                        onClick={(ev) =>
                                            handleDeleteButton(ev, item)
                                        }
                                        className="selected-ing__delete-btn"
                                    >
                                        ❌
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <button
                            className="form__button selected-ing__search-btn"
                            onClick={handleFindRecipes}
                        >
                            Find recipes
                        </button>
                    </div>
                </div>
            </div>
            <Ingredients
                ingListFilter={ingListFilter}
                ingredientsList={ingredientsList}
                handleIngredientClick={handleIngredientClick}
            />
            {isLoadingRecipes ? (
                <SpinLoader />
            ) : (
                <RecipeListComp recipeList={recipesState} />
            )}
        </section>
    );
}

export default MyFridge;
