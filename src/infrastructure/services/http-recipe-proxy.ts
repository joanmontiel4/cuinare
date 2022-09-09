import { iCategory } from '../interfaces/icategory';
import { iRawCategory } from '../interfaces/iraw-category';
import { iRawRecipe } from '../interfaces/iraw-recipe';
import { iRecipe } from '../interfaces/irecipe';

// After adding "proxy": "http://www.themealdb.com/", to package.json to avoid CORS error
// More info at https://stackoverflow.com/questions/51128176/reactjs-api-data-fetching-cors-error
// For free access to API: find "api/json/v2/9973533" and replace to "api/json/v1/1"
// Some functionality will not work, such as "Latest recipes"

export interface iSummaryRecipe {
    strMeal: string;
    strMealThumb: string;
    idMeal: string;
}
// Idea suggerida per Xavi:
// const allRecipes: Map<string, iRecipe> = new Map<string, iRecipe>();
export class HttpRecipeProxy {
    transformRecipe = (rawRecipe: iRawRecipe): iRecipe => {
        const ingredientKeys: Array<string> = [];
        const measureKeys: Array<string> = [];
        for (let i = 1; i <= 20; i++) {
            ingredientKeys[i - 1] = 'strIngredient' + i.toString();
            measureKeys[i - 1] = 'strMeasure' + i.toString();
        }
        const ingredientsArray: Array<string | null> = ingredientKeys.map(
            (item) => rawRecipe[item as keyof iRawRecipe]
        );
        const measuresArray: Array<string | null> = measureKeys.map(
            (item) => rawRecipe[item as keyof iRawRecipe]
        );
        const processRecipe = {
            id: rawRecipe.idMeal,
            name: rawRecipe.strMeal,
            drinkAlternate: rawRecipe.strDrinkAlternate,
            category: rawRecipe.strCategory,
            area: rawRecipe.strArea,
            instructions: rawRecipe.strInstructions,
            image: rawRecipe.strMealThumb,
            tags:
                rawRecipe.strTags !== null
                    ? (rawRecipe.strTags as string).split(',')
                    : null,
            videoLink: rawRecipe.strYoutube,
            ingredients: ingredientsArray,
            measures: measuresArray,
            source: rawRecipe.strSource,
            imageSource: rawRecipe.strImageSource,
            creativeCommonsConfirmed: rawRecipe.strCreativeCommonsConfirmed,
            dateModified: rawRecipe.dateModified,
            isMyFavorite: false,
        };
        return processRecipe;
    };

    transformRecipes = (data: {
        [key: string]: [iRawRecipe];
    }): Array<iRecipe> => {
        return data.meals.map((rawRecipe) => this.transformRecipe(rawRecipe));
    };

    transformCategory = (rawCategory: iRawCategory): iCategory => {
        const processCategory = {
            id: rawCategory.idCategory,
            name: rawCategory.strCategory,
            image: rawCategory.strCategoryThumb,
            description: rawCategory.strCategoryDescription,
        };
        return processCategory;
    };

    transformCategories = (data: {
        [key: string]: [iRawCategory];
    }): Array<iCategory> => {
        return data.categories.map((rawCategory) =>
            this.transformCategory(rawCategory)
        );
    };

    // Works perfectly.
    // Very important, allows getting info each recipe.
    getRecipeById(id: string) {
        return fetch('/api/json/v2/9973533/lookup.php?i=' + id)
            .then((resp) => resp.json())
            .then((data) => {
                return this.transformRecipe(data.meals[0]);
            });
    }

    // Works perfectly.
    getRecipeByName(name: string) {
        return fetch('/api/json/v2/9973533/search.php?s=' + name)
            .then((resp) => resp.json())
            .then((data) => this.transformRecipe(data.meals[0]));
    }

    getRandomReceip(): Promise<iRecipe> {
        return fetch('/api/json/v2/9973533/random.php').then((resp) =>
            resp.json()
        );
    }

    getSelection10RandomReceips(): Promise<Array<iRecipe>> {
        return fetch('/api/json/v2/9973533/random.php').then((resp) =>
            resp.json()
        );
    }

    // Works perfectly
    // Very important.
    // Returns the object meals with an array of recipes.
    getAllByFirstLetter(letter: string) {
        return fetch('/api/json/v2/9973533/search.php?f=' + letter)
            .then((resp) => resp.json())
            .then((data) => this.transformRecipes(data));
    }

    // Works perfectly
    // Returns id, name, image, and description of each category.
    getAllRecipeCategories() {
        return fetch('/api/json/v2/9973533/categories.php')
            .then((resp) => resp.json())
            .then((data) => this.transformCategories(data));
    }

    // Works perfectly
    // Use /api/json/v2/9973533/latest.php since API Key is necessary
    getLatestReceips() {
        return fetch('/api/json/v2/9973533/latest.php')
            .then((resp) => resp.json())
            .then((data) => this.transformRecipes(data));
    }

    // Returns only category names.
    // Not fixed yet (not used)
    getListAllCategories() {
        return fetch('/api/json/v2/9973533/list.php?c=list')
            .then((resp) => resp.json())
            .then((data) => {
                return data.meals.map(
                    (item: { [key: string]: string }) => item.strCategory
                );
            });
    }
    // Not fixed yet (not used)
    getListAllAreas() {
        return fetch('/api/json/v2/9973533/list.php?a=list').then((resp) =>
            resp.json()
        );
    }
    // Works perfectly
    // Returns array of all available ingredients
    getListAllIngredients() {
        return fetch('/api/json/v2/9973533/list.php?i=list')
            .then((resp) => resp.json())
            .then((data) => {
                return data.meals.map(
                    (item: { [key: string]: string }) => item.strIngredient
                );
            });
    }

    // Works nicely
    getListFilterByIngredients(ingredients: Array<string>) {
        const newIngredientsList = ingredients.map((item) =>
            item.toLowerCase().replaceAll(' ', '_')
        );
        const ingredientsString = newIngredientsList.join(',');
        return fetch('/api/json/v2/9973533/filter.php?i=' + ingredientsString)
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                if (data.meals !== null) {
                    return data.meals.map(
                        (item: iSummaryRecipe) => item.idMeal
                    );
                }
            })
            .then((idList) => {
                if (idList !== undefined) {
                    return Promise.all(
                        idList.map((id: string) => this.getRecipeById(id))
                    );
                } else {
                    return [];
                }
            });
    }

    // Works perfectly
    // Important. fetch only returns just a list with name, image, and idMeal!
    // Fixed to return a list with proper format.
    getListFilterByCategory(category: string) {
        return fetch('/api/json/v2/9973533/filter.php?c=' + category)
            .then((resp) => resp.json())
            .then((data) => {
                return data.meals.map((item: iSummaryRecipe) => item.idMeal);
            })
            .then((idList) => {
                return Promise.all(
                    idList.map((id: string) => this.getRecipeById(id))
                );
            });
    }

    // Works perfectly
    // Important. fetchs a list of recipes from an Array of id's
    getFavoriteList(favoriteList: Array<string>) {
        return Promise.all(
            favoriteList.map((id: string) => this.getRecipeById(id))
        );
    }

    getListFilterByArea(area: string): Promise<Array<iRecipe>> {
        return fetch('/api/json/v2/9973533/filter.php?a=' + area).then((resp) =>
            resp.json()
        );
    }
}
