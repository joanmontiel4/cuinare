import { useDispatch, useSelector } from 'react-redux';
import { iRecipe } from '../../../../infrastructure/interfaces/irecipe';
import { iUser } from '../../../../infrastructure/interfaces/iuser';
import { Repository } from '../../../../infrastructure/repositories/RTdatabase';
import { RootState } from '../../../../store/store';
import * as acu from '../../../../infrastructure/components/login-button/reducer/userlogged.action.creators';
import { SyntheticEvent, useMemo } from 'react';
import { SessionStore } from '../../../../infrastructure/services/session-store';
import './deleterecipebtn.scss';

export function DeleteRecipeBtn({ myrecipe }: { myrecipe: iRecipe }) {
    // Responsabilities
    //   - eliminate myrecipe from DB
    //   - remove from myRecipes State and userLogged.myRecipes array
    //   - remove from userLogged.myRecipes State

    const isLogged = useSelector((state: RootState) => state.isLogged);
    const userLogged = useSelector((state: RootState) => state.userLogged);
    const dispatch = useDispatch();

    const ls = useMemo(() => new SessionStore<iUser>('Login'), []);

    const handleClick = (ev: SyntheticEvent) => {
        ev.preventDefault();
        // Firebase
        if (!isLogged) return;
        const collection = 'users';
        const repo = new Repository<iUser>(collection);
        const userId = userLogged.uid;
        let newListOfMyRecipes: Array<iRecipe> = [...userLogged.myRecipes];
        let newListOfFavoriteRecipes: Array<iRecipe> = [
            ...userLogged.favorites,
        ];

        newListOfMyRecipes = newListOfMyRecipes.filter(
            (item: iRecipe) => item.id !== myrecipe.id
        );
        newListOfFavoriteRecipes = newListOfFavoriteRecipes.filter(
            (item: iRecipe) => item.id !== myrecipe.id
        );

        // Change userLogged data at the repository (database)
        repo.updateData(userId, {
            myRecipes: newListOfMyRecipes,
            favorites: newListOfFavoriteRecipes,
        }).then(() => {
            // Update userLogged data at the store (state)
            const updatedUserData = {
                ...userLogged,
                myRecipes: newListOfMyRecipes,
                favorites: newListOfFavoriteRecipes,
            };
            dispatch(acu.updateUserLoggedAction(updatedUserData));
            // Update userLogged data in session storage
            ls.setItem(updatedUserData);
            // Update Favorite List from store (state)
        });
    };

    return (
        <div className="delete-btn-container">
            <i
                className="fa-solid fa-trash"
                role="button"
                onClick={handleClick}
            ></i>
        </div>
    );
}
