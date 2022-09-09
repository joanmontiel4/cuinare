import React from 'react';
import { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { DeleteRecipeBtn } from '../../../features/myrecipes/components/deleterecipebtn/deleterecipebtn';
import { RootState } from '../../../store/store';
import { iRecipe } from '../../interfaces/irecipe';
import { FavoriteBtn } from '../favoritebtn/favoritebtn';
import './recipe.scss';

export function Recipe({ recipe }: { recipe: iRecipe }) {
    let isMyRecipe = false;
    const isLogged = useSelector((state: RootState) => state.isLogged);
    const userLogged = useSelector((state: RootState) => state.userLogged);
    const initialIsSelected = false;
    // React.useState is used instead of useState to allow mocking useState
    const [isSelected, setIsSelected] = React.useState(initialIsSelected);
    if (isLogged) {
        if (Array.isArray(userLogged.myRecipes)) {
            userLogged.myRecipes.forEach(
                (item) => item.id === recipe.id && (isMyRecipe = true)
            );
        }
    }
    // let isSelected = false;
    const handleClick = (ev: SyntheticEvent) => {
        ev.preventDefault();
        setIsSelected(!isSelected);
    };

    return isSelected ? (
        <div className="full-recipe-card">
            <img
                className="full-recipe-card__image"
                src={recipe.image}
                alt="[meal name]"
            />

            <div className="full-recipe-card__info">
                <div
                    className="full-recipe-card__info-text"
                    onClick={handleClick}
                >
                    <h3 className="full-recipe-card__title">{recipe.name}</h3>
                    <div className="full-recipe-card__category-text">
                        <span className="full-recipe-card__info-text--title">
                            Category:{' '}
                        </span>
                        <span>{recipe.category}</span>
                    </div>
                    <div className="full-recipe-card__origin-text">
                        <span className="full-recipe-card__info-text--title">
                            Origin:{' '}
                        </span>
                        <span>{recipe.area}</span>
                    </div>
                    <div className="full-recipe-card__tags">
                        <span className="full-recipe-card__tags--title">
                            Tags:{' '}
                        </span>
                        <ul className="full-recipe-card__tag-list">
                            {recipe.tags &&
                                recipe.tags.map((tag, index) => (
                                    <li
                                        key={index}
                                        className="full-recipe-card__tag-item"
                                    >
                                        <span className="full-recipe-card__text">
                                            {tag}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="full-recipe-card__instructions">
                        <span className="full-recipe-card__info-text--title">
                            Instructions
                        </span>
                        <p>{recipe.instructions}</p>
                    </div>
                    <div className="full-recipe-card__ingredients">
                        <div className="full-recipe-card__ingredients-box">
                            <div className="full-recipe-card__title-box">
                                <span className="full-recipe-card__info-text--title">
                                    Ingredients:
                                </span>
                            </div>
                            <div className="full-recipe-card__title-box">
                                <span className="full-recipe-card__info-text--title">
                                    Measures:
                                </span>
                            </div>
                        </div>
                        <div className="full-recipe-card__ing-meas-box">
                            <ul className="full-recipe-card__ing-list">
                                {recipe.ingredients &&
                                    recipe.ingredients.map((ing, index) => (
                                        <li
                                            key={index}
                                            className="full-recipe-card__item"
                                        >
                                            <span className="full-recipe-card__text">
                                                {ing}
                                            </span>
                                        </li>
                                    ))}
                            </ul>
                            <ul className="full-recipe-card__meas-list">
                                {recipe.measures &&
                                    recipe.measures.map((meas, index) => (
                                        <li
                                            key={index}
                                            className="full-recipe-card__item"
                                        >
                                            <span className="full-recipe-card__text">
                                                {meas}
                                            </span>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="delete-favorite-box">
                    {isMyRecipe ? (
                        <DeleteRecipeBtn myrecipe={recipe}></DeleteRecipeBtn>
                    ) : (
                        <div className="delete-recipe-btn-size"></div>
                    )}
                    <FavoriteBtn recipe={recipe}></FavoriteBtn>
                </div>
            </div>
        </div>
    ) : (
        <div className="recipe-card">
            <img
                className="recipe-card__image"
                src={recipe.image}
                alt="[meal name]"
            />

            <div className="recipe-card__info">
                <div className="recipe-card__info-text" onClick={handleClick}>
                    <h3 className="recipe-card__title">{recipe.name}</h3>
                    <div className="recipe-card__category-text">
                        <span className="recipe-card__info-text--title">
                            Category:{' '}
                        </span>
                        <span>{recipe.category}</span>
                    </div>
                    <div className="recipe-card__origin-text">
                        <span className="recipe-card__info-text--title">
                            Origin:{' '}
                        </span>
                        <span>{recipe.area}</span>
                    </div>
                </div>
                <div className="delete-favorite-box">
                    {isMyRecipe ? (
                        <DeleteRecipeBtn myrecipe={recipe}></DeleteRecipeBtn>
                    ) : (
                        <div className="delete-recipe-btn-size"></div>
                    )}
                    <FavoriteBtn recipe={recipe}></FavoriteBtn>
                </div>
            </div>
        </div>
    );
}
