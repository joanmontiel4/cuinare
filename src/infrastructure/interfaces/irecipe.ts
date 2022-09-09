export interface iRecipe {
    id: string;
    name: string;
    drinkAlternate: string | null;
    category: string;
    area: string;
    instructions: string;
    image: string;
    tags: Array<string> | null;
    videoLink: string | null;
    ingredients: Array<string | null>;
    measures: Array<string | null>;
    source: string | null;
    imageSource: string | null;
    creativeCommonsConfirmed: string | null;
    dateModified: string | null;
    isMyFavorite: boolean;
}
