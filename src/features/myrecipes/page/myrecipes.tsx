import { Recipe } from '../../../infrastructure/components/recipe/recipe';
import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { HttpRecipeProxy } from '../../../infrastructure/services/http-recipe-proxy';
import * as acu from '../../../infrastructure/components/login-button/reducer/userlogged.action.creators';
import { Repository } from '../../../infrastructure/repositories/RTdatabase';
import { iRecipe } from '../../../infrastructure/interfaces/irecipe';
import { iUser } from '../../../infrastructure/interfaces/iuser';
import { SessionStore } from '../../../infrastructure/services/session-store';
import './myrecipes.scss';

function MyRecipes() {
    // Responsabilities:
    // - Get recipe using a form
    // - Print list of my recipes from userLogged.myRecipes
    const isLogged = useSelector((state: RootState) => state.isLogged);
    const userLogged = useSelector((state: RootState) => state.userLogged);
    const dispatch = useDispatch();
    const initialCategories: Array<string> = [];
    const [categories, setCategories] = useState(initialCategories);
    const [newRecipe, setNewRecipe] = useState(true);

    const ls = useMemo(() => new SessionStore<iUser>('Login'), []);

    const api = useMemo(() => {
        return new HttpRecipeProxy();
    }, []);

    let emptyArray: boolean = true;
    if (Array.isArray(userLogged.myRecipes)) {
        userLogged.myRecipes.length > 0 && (emptyArray = false);
    }

    useEffect(() => {
        api.getListAllCategories().then((data: Array<string>) => {
            setCategories(data);
        });
    }, [isLogged, dispatch, userLogged.myRecipes, api]);

    const initialFormState: Partial<iRecipe> = {
        name: '',
        drinkAlternate: null,
        category: '',
        area: '',
        instructions: '',
        image: '',
        tags: null,
        videoLink: null,
        ingredients: [''],
        measures: [''],
        source: null,
        imageSource: null,
        creativeCommonsConfirmed: null,
        dateModified: null,
        isMyFavorite: false,
    };

    const [formState, setFormState] = useState(initialFormState);

    const addIngredient = () => {
        setFormState({
            ...formState,
            ingredients: [...(formState.ingredients as Array<string>), ''],
            measures: [...(formState.measures as Array<string>), ''],
        });
    };

    const handleAdd = (recipe: iRecipe) => {
        // Firebase
        if (!isLogged) return;
        const collection = 'users';
        const repo = new Repository<iUser>(collection);
        const userId = userLogged.uid;
        let listOfRecipeNames: Array<string> = [];
        let recipeNameHasBeenUsed = false;

        if (Array.isArray(userLogged.myRecipes)) {
            listOfRecipeNames = userLogged.myRecipes.map((item) => item.name);
            // recipe.name is set as required in the form
            recipeNameHasBeenUsed = listOfRecipeNames.includes(
                recipe.name as string
            );
        }

        if (recipeNameHasBeenUsed)
            recipe.name =
                recipe.name + Math.floor(Math.random() * 100000).toString();

        let newListOfRecipes: Array<iRecipe> = [];
        if (Array.isArray(userLogged.myRecipes)) {
            newListOfRecipes = [...userLogged.myRecipes, recipe];
        } else {
            newListOfRecipes = [recipe];
        }

        repo.updateData(userId, { myRecipes: newListOfRecipes }).then(() => {
            const updatedUserData = {
                ...userLogged,
                myRecipes: newListOfRecipes,
            };
            // Update store (state)
            dispatch(acu.updateUserLoggedAction(updatedUserData));
            // Update session storage
            ls.setItem(updatedUserData);
        });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        handleAdd({
            id: Math.floor(Math.random() * 1000000).toString(),
            name: formState.name as string,
            drinkAlternate: null,
            category: formState.category as string,
            area: formState.area as string,
            instructions: formState.instructions as string,
            image: formState.image as string,
            tags: null,
            videoLink: null,
            ingredients: formState.ingredients as Array<string>,
            measures: formState.measures as Array<string>,
            source: 'my recipes',
            imageSource: null,
            creativeCommonsConfirmed: null,
            dateModified: null,
            isMyFavorite: false,
        });
        setFormState(initialFormState);
    };

    const handleChange = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormState({ ...formState, [element.name]: element.value });
    };

    const handleIngredientAndMeasureChange = (
        ev: SyntheticEvent,
        index: number
    ) => {
        const element = ev.target as HTMLFormElement;
        let arrayCopy;
        element.name === 'ingredients'
            ? (arrayCopy = [...(formState.ingredients as Array<string>)])
            : (arrayCopy = [...(formState.measures as Array<string>)]);
        arrayCopy[index] = element.value;
        setFormState({ ...formState, [element.name]: arrayCopy });
    };

    const newRecipeHandleClick = () => {
        isLogged && setNewRecipe(!newRecipe);
    };

    return (
        <section className="my-recipes">
            {!isLogged && (
                <div className="my-recipes__title-container">
                    <p className="my-recipes__notlogin-text">
                        Please, login to add your own recipes
                    </p>
                </div>
            )}
            <div className="my-recipes__title-container">
                <h2 className="my-recipes__title">
                    Please, enter the details of your recipe...
                </h2>
            </div>
            {newRecipe ? (
                <div className="my-recipes__btn-container">
                    <button
                        className="form__btn form__btn--close-form"
                        onClick={newRecipeHandleClick}
                    >
                        Enter new recipe
                    </button>
                </div>
            ) : (
                <div className="form-container">
                    <div className="form-box">
                        <form className="form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                id=""
                                className="form__input"
                                placeholder="Recipe name"
                                required
                            />
                            <select
                                name="category"
                                value={formState.category}
                                onChange={handleChange}
                                className="form__select"
                            >
                                <option value="">Select a category</option>
                                {categories.map((item) => {
                                    return (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    );
                                })}
                            </select>
                            <input
                                type="text"
                                name="image"
                                value={formState.image}
                                onChange={handleChange}
                                id=""
                                className="form__input"
                                placeholder="Image URL"
                            />
                            <input
                                type="text"
                                name="area"
                                value={formState.area}
                                onChange={handleChange}
                                id=""
                                className="form__input"
                                placeholder="Area"
                            />

                            <label className="form__label">
                                Enter recipe instructions:
                            </label>
                            <textarea
                                name="instructions"
                                value={formState.instructions}
                                onChange={handleChange}
                                className="form__text-area"
                                placeholder="Write here your instructions..."
                            />

                            <div className="form__input-array">
                                <div className="form__ingredients">
                                    {(
                                        formState.ingredients as Array<string>
                                    ).map((ingredient, index) => {
                                        return (
                                            <input
                                                key={index}
                                                type="text"
                                                name="ingredients"
                                                value={ingredient}
                                                onChange={(e) => {
                                                    handleIngredientAndMeasureChange(
                                                        e,
                                                        index
                                                    );
                                                }}
                                                id=""
                                                className="form__input form__input--shorter"
                                                placeholder={
                                                    'Ingredient ' +
                                                    (index + 1).toString()
                                                }
                                            />
                                        );
                                    })}
                                </div>
                                <div className="form__measures">
                                    {(formState.measures as Array<string>).map(
                                        (measure, index) => {
                                            return (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    name="measures"
                                                    value={measure}
                                                    onChange={(e) =>
                                                        handleIngredientAndMeasureChange(
                                                            e,
                                                            index
                                                        )
                                                    }
                                                    id=""
                                                    className="form__input form__input--shorter"
                                                    placeholder={
                                                        'Measure ' +
                                                        (index + 1).toString()
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </div>
                                <button
                                    className="form__btn form__btn--add"
                                    type="button"
                                    onClick={() => {
                                        return (
                                            (
                                                formState.ingredients as Array<string>
                                            ).length < 20 && addIngredient()
                                        );
                                    }}
                                >
                                    +
                                </button>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="form__btn form__btn--submit"
                                >
                                    Submit
                                </button>
                                <button
                                    className="form__btn form__btn--close-form"
                                    type="button"
                                    onClick={newRecipeHandleClick}
                                >
                                    Close form dialog
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isLogged && !emptyArray && (
                <div className="recipes-container">
                    <div className="recipes__title-container">
                        <h2 className="recipes__title">My Recipes</h2>
                    </div>
                    <ul className="recipes">
                        {userLogged.myRecipes.map((recipe: iRecipe) => (
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

export default MyRecipes;
