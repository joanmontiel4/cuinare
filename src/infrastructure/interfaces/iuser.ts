import { iRecipe } from './irecipe';

export interface iUser {
    uid: string;
    token: string;
    name: string;
    email: string;
    photoURL: string;
    favorites: Array<iRecipe>;
    myRecipes: Array<iRecipe>;
}
