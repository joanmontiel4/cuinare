import { useDispatch, useSelector } from 'react-redux';
import { iRecipe } from '../../interfaces/irecipe';
import { iUser } from '../../../infrastructure/interfaces/iuser';
import { Repository } from '../../repositories/RTdatabase';
import { RootState } from '../../../store/store';
import * as acu from '../../../infrastructure/components/login-button/reducer/userlogged.action.creators';
import { SyntheticEvent, useMemo } from 'react';
import { SessionStore } from '../../services/session-store';
import './favoritebtn.scss';

export function FavoriteBtn({ recipe }: { recipe: iRecipe }) {
    const isLogged = useSelector((state: RootState) => state.isLogged);
    const userLogged = useSelector((state: RootState) => state.userLogged);
    const dispatch = useDispatch();

    let isMyFavorite = false;
    const collection = 'users';
    const ls = useMemo(() => new SessionStore<iUser>('Login'), []);
    const repo = useMemo(() => new Repository<iUser>(collection), []);

    if (Array.isArray(userLogged.favorites)) {
        userLogged.favorites.forEach((item) => {
            item.id === recipe.id && (isMyFavorite = true);
        });
    }

    const handleClick = (ev: SyntheticEvent) => {
        ev.preventDefault();
        if (!isLogged) return;
        const userId = userLogged.uid;
        let newListOfFavorites: Array<iRecipe> = [...userLogged.favorites];

        isMyFavorite
            ? (newListOfFavorites = newListOfFavorites.filter(
                  (item) => item.id !== recipe.id
              ))
            : newListOfFavorites.push(recipe);

        // Change userLogged data at the repository (database)
        repo.updateData(userId, { favorites: newListOfFavorites }).then(() => {
            // Update userLogged data at the store (state)
            const updatedUserData = {
                ...userLogged,
                favorites: newListOfFavorites,
            };
            dispatch(acu.updateUserLoggedAction(updatedUserData));
            // Update userLogged data in session storage
            ls.setItem(updatedUserData);
            // Update Favorite List from store (state)
        });
        isMyFavorite = !isMyFavorite;
    };

    return (
        <div className="favorite-btn-container">
            <i
                className={
                    isMyFavorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'
                }
                role="button"
                onClick={handleClick}
            ></i>
        </div>
    );
}
