import { useSelector } from 'react-redux';
import { Recipe } from '../../../infrastructure/components/recipe/recipe';
import { RootState } from '../../../store/store';
import './favorites.scss';

function Favorites() {
    // Responsabilities:
    // - Print list of recipes from userLoagged favorite-id list

    const isLogged = useSelector((state: RootState) => state.isLogged);
    const userLogged = useSelector((state: RootState) => state.userLogged);

    return (
        <section className="favorites">
            {!isLogged ? (
                <div className="favorites__title-container">
                    <p className="favorites__notlogin-text">
                        Please, login to see the list of your favorite recipes
                    </p>
                </div>
            ) : (
                <div className="recipes-container">
                    <div className="recipes__title-container">
                        <h2 className="recipes__title"> Favorite recipes</h2>
                    </div>
                    <ul className="recipes">
                        {userLogged.favorites.map((recipe) => (
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

export default Favorites;
