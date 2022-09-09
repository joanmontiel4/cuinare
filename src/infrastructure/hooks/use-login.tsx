import { useEffect, useMemo } from 'react';
import { iUser } from '../interfaces/iuser';
import { SessionStore } from '../services/session-store';
import * as acu from '../../infrastructure/components/login-button/reducer/userlogged.action.creators';
import * as aci from '../../infrastructure/components/login-button/reducer/islogged.action.creators';

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Repository } from '../repositories/RTdatabase';
import { iRecipe } from '../interfaces/irecipe';

export function useLogin() {
    const isLogged = useSelector((state: RootState) => state.isLogged);
    const dispatch = useDispatch();

    const ls = useMemo(() => new SessionStore<iUser>('Login'), []);

    useEffect(() => {
        const storeUser = ls.getItem();
        if (storeUser) {
            dispatch(acu.updateUserLoggedAction(storeUser));
            dispatch(aci.updateIsLoggedAction(true));
        }
    }, [ls, dispatch]);

    const repo = useMemo(() => {
        const collection = 'users';
        return new Repository(collection);
    }, []);

    const handleClick = () => {
        if (isLogged) {
            doLogout();
        } else {
            doLogin();
        }
    };
    interface iPartialUser {
        favorites: Array<iRecipe>;
        myRecipes: Array<iRecipe>;
    }

    const doLogin = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const error: any = new Error('No credential');
                error.code = '';
                error.customData = { email: '' };
                if (!credential) throw error;
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log({ token, user });
                console.log(result);
                dispatch(aci.updateIsLoggedAction(true));
                repo.getData(result.user.uid).then((data) => {
                    let newFavorites: Array<iRecipe> = [];
                    if (Array.isArray((data as iPartialUser).favorites)) {
                        newFavorites = (data as iPartialUser).favorites;
                    }
                    let newMyRecipes: Array<iRecipe> = [];
                    if (Array.isArray((data as iPartialUser).myRecipes)) {
                        newMyRecipes = (data as iPartialUser).myRecipes;
                    }
                    const userData: iUser = {
                        uid: result.user.uid,
                        token: token as string,
                        name: result.user.displayName as string,
                        email: result.user.email as string,
                        photoURL: result.user.photoURL as string,
                        favorites: newFavorites,
                        myRecipes: newMyRecipes,
                    };
                    dispatch(acu.updateUserLoggedAction(userData));
                    ls.setItem(userData);
                });
            })
            .catch((error) => {
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
                console.error({
                    errorCode: error.code,
                    errorMessage: error.message,
                    email: error.customData.email,
                    credential,
                });
            });
    };

    const doLogout = () => {
        signOut(getAuth())
            .then(() => {
                dispatch(aci.updateIsLoggedAction(false));
                dispatch(
                    acu.updateUserLoggedAction({
                        uid: '',
                        token: '',
                        name: '',
                        email: '',
                        photoURL: '',
                        favorites: [],
                        myRecipes: [],
                    })
                );
                ls.removeItems();
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return {
        isLogged,
        handleClick,
    };
}
