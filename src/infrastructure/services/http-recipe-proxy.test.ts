import { HttpRecipeProxy } from './http-recipe-proxy';
import { iRawRecipe } from '../interfaces/iraw-recipe';
import { iRecipe } from '../interfaces/irecipe';
import { iCategory } from '../interfaces/icategory';
import { iRawCategory } from '../interfaces/iraw-category';

const repo = new HttpRecipeProxy();

describe('Given HttpRecipeProxy repository', () => {
    describe('When the repository is instantiated and the method getReceipeById() is called', () => {
        test('Then it should return an processed recipe data with type iRecipe', async () => {
            // arrange
            const responseData: { [key: string]: Array<iRawRecipe> } = {
                meals: [
                    {
                        idMeal: '12345',
                        strMeal: 'test-meal',
                        strDrinkAlternate: null,
                        strCategory: 'test-cat',
                        strArea: 'test-area',
                        strInstructions: 'test-instruc',
                        strMealThumb: 'test-meal-image',
                        strTags: null,
                        strYoutube: null,
                        strIngredient1: 'test-ing',
                        strIngredient2: '',
                        strIngredient3: '',
                        strIngredient4: '',
                        strIngredient5: '',
                        strIngredient6: '',
                        strIngredient7: '',
                        strIngredient8: '',
                        strIngredient9: '',
                        strIngredient10: '',
                        strIngredient11: '',
                        strIngredient12: '',
                        strIngredient13: '',
                        strIngredient14: '',
                        strIngredient15: '',
                        strIngredient16: '',
                        strIngredient17: '',
                        strIngredient18: '',
                        strIngredient19: '',
                        strIngredient20: '',
                        strMeasure1: 'test-meas',
                        strMeasure2: '',
                        strMeasure3: '',
                        strMeasure4: '',
                        strMeasure5: '',
                        strMeasure6: '',
                        strMeasure7: '',
                        strMeasure8: '',
                        strMeasure9: '',
                        strMeasure10: '',
                        strMeasure11: '',
                        strMeasure12: '',
                        strMeasure13: '',
                        strMeasure14: '',
                        strMeasure15: '',
                        strMeasure16: '',
                        strMeasure17: '',
                        strMeasure18: '',
                        strMeasure19: '',
                        strMeasure20: '',
                        strSource: null,
                        strImageSource: null,
                        strCreativeCommonsConfirmed: null,
                        dateModified: null,
                    },
                ],
            };

            const expectedData: iRecipe = {
                id: '12345',
                name: 'test-meal',
                drinkAlternate: null,
                category: 'test-cat',
                area: 'test-area',
                instructions: 'test-instruc',
                image: 'test-meal-image',
                tags: null,
                videoLink: null,
                ingredients: [
                    'test-ing',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                ],
                measures: [
                    'test-meas',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                ],
                source: null,
                imageSource: null,
                creativeCommonsConfirmed: null,
                dateModified: null,
                isMyFavorite: false,
            };
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(responseData),
            });
            const res = await repo.getRecipeById('12345');
            expect(res).toEqual(expectedData);
        });
    });
    describe('When the repository is instantiated and the method getReceipeByName() is called', () => {
        test('Then it should return an processed recipe data with type iRecipe', async () => {
            // arrange
            const responseData: { [key: string]: Array<iRawRecipe> } = {
                meals: [
                    {
                        idMeal: '12345',
                        strMeal: 'test-meal',
                        strDrinkAlternate: null,
                        strCategory: 'test-cat',
                        strArea: 'test-area',
                        strInstructions: 'test-instruc',
                        strMealThumb: 'test-meal-image',
                        strTags: null,
                        strYoutube: null,
                        strIngredient1: 'test-ing',
                        strIngredient2: '',
                        strIngredient3: '',
                        strIngredient4: '',
                        strIngredient5: '',
                        strIngredient6: '',
                        strIngredient7: '',
                        strIngredient8: '',
                        strIngredient9: '',
                        strIngredient10: '',
                        strIngredient11: '',
                        strIngredient12: '',
                        strIngredient13: '',
                        strIngredient14: '',
                        strIngredient15: '',
                        strIngredient16: '',
                        strIngredient17: '',
                        strIngredient18: '',
                        strIngredient19: '',
                        strIngredient20: '',
                        strMeasure1: 'test-meas',
                        strMeasure2: '',
                        strMeasure3: '',
                        strMeasure4: '',
                        strMeasure5: '',
                        strMeasure6: '',
                        strMeasure7: '',
                        strMeasure8: '',
                        strMeasure9: '',
                        strMeasure10: '',
                        strMeasure11: '',
                        strMeasure12: '',
                        strMeasure13: '',
                        strMeasure14: '',
                        strMeasure15: '',
                        strMeasure16: '',
                        strMeasure17: '',
                        strMeasure18: '',
                        strMeasure19: '',
                        strMeasure20: '',
                        strSource: null,
                        strImageSource: null,
                        strCreativeCommonsConfirmed: null,
                        dateModified: null,
                    },
                ],
            };

            const expectedData: iRecipe = {
                id: '12345',
                name: 'test-meal',
                drinkAlternate: null,
                category: 'test-cat',
                area: 'test-area',
                instructions: 'test-instruc',
                image: 'test-meal-image',
                tags: null,
                videoLink: null,
                ingredients: [
                    'test-ing',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                ],
                measures: [
                    'test-meas',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                ],
                source: null,
                imageSource: null,
                creativeCommonsConfirmed: null,
                dateModified: null,
                isMyFavorite: false,
            };
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(responseData),
            });
            const res = await repo.getRecipeByName('test-meal');
            expect(res).toEqual(expectedData);
        });
    });
    describe('When the repository is instantiated and the method getAllByFirstLetter() is called', () => {
        test('Then it should return an processed recipe data with type Array<iRecipe>', async () => {
            // arrange
            const responseData: { [key: string]: Array<iRawRecipe> } = {
                meals: [
                    {
                        idMeal: '12345',
                        strMeal: 'test-meal',
                        strDrinkAlternate: null,
                        strCategory: 'test-cat',
                        strArea: 'test-area',
                        strInstructions: 'test-instruc',
                        strMealThumb: 'test-meal-image',
                        strTags: null,
                        strYoutube: null,
                        strIngredient1: 'test-ing',
                        strIngredient2: '',
                        strIngredient3: '',
                        strIngredient4: '',
                        strIngredient5: '',
                        strIngredient6: '',
                        strIngredient7: '',
                        strIngredient8: '',
                        strIngredient9: '',
                        strIngredient10: '',
                        strIngredient11: '',
                        strIngredient12: '',
                        strIngredient13: '',
                        strIngredient14: '',
                        strIngredient15: '',
                        strIngredient16: '',
                        strIngredient17: '',
                        strIngredient18: '',
                        strIngredient19: '',
                        strIngredient20: '',
                        strMeasure1: 'test-meas',
                        strMeasure2: '',
                        strMeasure3: '',
                        strMeasure4: '',
                        strMeasure5: '',
                        strMeasure6: '',
                        strMeasure7: '',
                        strMeasure8: '',
                        strMeasure9: '',
                        strMeasure10: '',
                        strMeasure11: '',
                        strMeasure12: '',
                        strMeasure13: '',
                        strMeasure14: '',
                        strMeasure15: '',
                        strMeasure16: '',
                        strMeasure17: '',
                        strMeasure18: '',
                        strMeasure19: '',
                        strMeasure20: '',
                        strSource: null,
                        strImageSource: null,
                        strCreativeCommonsConfirmed: null,
                        dateModified: null,
                    },
                ],
            };

            const expectedData: Array<iRecipe> = [
                {
                    id: '12345',
                    name: 'test-meal',
                    drinkAlternate: null,
                    category: 'test-cat',
                    area: 'test-area',
                    instructions: 'test-instruc',
                    image: 'test-meal-image',
                    tags: null,
                    videoLink: null,
                    ingredients: [
                        'test-ing',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                    ],
                    measures: [
                        'test-meas',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                    ],
                    source: null,
                    imageSource: null,
                    creativeCommonsConfirmed: null,
                    dateModified: null,
                    isMyFavorite: false,
                },
            ];
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(responseData),
            });
            // eslint-disable-next-line testing-library/no-await-sync-query
            const res = await repo.getAllByFirstLetter('t');
            expect(res).toEqual(expectedData);
        });
    });
    describe('When the repository is instantiated and the method getAllRecipeCategories() is called', () => {
        test('Then it should return an processed recipe data with type iRecipe', async () => {
            // arrange

            const responseData: { [key: string]: Array<iRawCategory> } = {
                categories: [
                    {
                        idCategory: '1',
                        strCategory: 'Beef',
                        strCategoryThumb: 'test-img1',
                        strCategoryDescription: 'Test-description1',
                    },
                    {
                        idCategory: '2',
                        strCategory: 'Chicken',
                        strCategoryThumb: 'test-img2',
                        strCategoryDescription: 'Test-description2',
                    },
                ],
            };

            const expectedData: Array<iCategory> = [
                {
                    id: '1',
                    name: 'Beef',
                    image: 'test-img1',
                    description: 'Test-description1',
                },
                {
                    id: '2',
                    name: 'Chicken',
                    image: 'test-img2',
                    description: 'Test-description2',
                },
            ];
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(responseData),
            });
            // eslint-disable-next-line testing-library/no-await-sync-query
            const res = await repo.getAllRecipeCategories();
            expect(res).toEqual(expectedData);
        });
    });
    describe('When the repository is instantiated and the method getLatestReceips() is called', () => {
        test('Then it should return an processed recipe data with type Array<iRecipe>', async () => {
            // arrange
            const responseData: { [key: string]: Array<iRawRecipe> } = {
                meals: [
                    {
                        idMeal: '12345',
                        strMeal: 'test-meal',
                        strDrinkAlternate: null,
                        strCategory: 'test-cat',
                        strArea: 'test-area',
                        strInstructions: 'test-instruc',
                        strMealThumb: 'test-meal-image',
                        strTags: null,
                        strYoutube: null,
                        strIngredient1: 'test-ing',
                        strIngredient2: '',
                        strIngredient3: '',
                        strIngredient4: '',
                        strIngredient5: '',
                        strIngredient6: '',
                        strIngredient7: '',
                        strIngredient8: '',
                        strIngredient9: '',
                        strIngredient10: '',
                        strIngredient11: '',
                        strIngredient12: '',
                        strIngredient13: '',
                        strIngredient14: '',
                        strIngredient15: '',
                        strIngredient16: '',
                        strIngredient17: '',
                        strIngredient18: '',
                        strIngredient19: '',
                        strIngredient20: '',
                        strMeasure1: 'test-meas',
                        strMeasure2: '',
                        strMeasure3: '',
                        strMeasure4: '',
                        strMeasure5: '',
                        strMeasure6: '',
                        strMeasure7: '',
                        strMeasure8: '',
                        strMeasure9: '',
                        strMeasure10: '',
                        strMeasure11: '',
                        strMeasure12: '',
                        strMeasure13: '',
                        strMeasure14: '',
                        strMeasure15: '',
                        strMeasure16: '',
                        strMeasure17: '',
                        strMeasure18: '',
                        strMeasure19: '',
                        strMeasure20: '',
                        strSource: null,
                        strImageSource: null,
                        strCreativeCommonsConfirmed: null,
                        dateModified: null,
                    },
                ],
            };

            const expectedData: Array<iRecipe> = [
                {
                    id: '12345',
                    name: 'test-meal',
                    drinkAlternate: null,
                    category: 'test-cat',
                    area: 'test-area',
                    instructions: 'test-instruc',
                    image: 'test-meal-image',
                    tags: null,
                    videoLink: null,
                    ingredients: [
                        'test-ing',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                    ],
                    measures: [
                        'test-meas',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                    ],
                    source: null,
                    imageSource: null,
                    creativeCommonsConfirmed: null,
                    dateModified: null,
                    isMyFavorite: false,
                },
            ];
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(responseData),
            });
            // eslint-disable-next-line testing-library/no-await-sync-query
            const res = await repo.getLatestReceips();
            expect(res).toEqual(expectedData);
        });
    });
    // describe('When the repository is instantiated and the method getListFilterByCategory() is called', () => {
    //     test('Then it should return an processed recipe data with type Array<iRecipe>', async () => {
    //         // arrange
    //         interface iMealByCategory {
    //             strMeal: string;
    //             strMealThumb: string;
    //             idMeal: string;
    //         }
    //         const responseData: { [key: string]: Array<iMealByCategory> } = {
    //             meals: [
    //                 {
    //                     strMeal: 'test-meal',
    //                     strMealThumb: 'test-img',
    //                     idMeal: 'test-id',
    //                 },
    //             ],
    //         };

    //         const expectedData: Array<iRecipe> = [
    //             {
    //                 id: 'test-id',
    //                 name: 'test-meal',
    //                 drinkAlternate: null,
    //                 category: 'test-cat',
    //                 area: 'test-area',
    //                 instructions: 'test-instruc',
    //                 image: 'test-imag',
    //                 tags: null,
    //                 videoLink: null,
    //                 ingredients: [
    //                     'test-ing',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                 ],
    //                 measures: [
    //                     'test-meas',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                     '',
    //                 ],
    //                 source: null,
    //                 imageSource: null,
    //                 creativeCommonsConfirmed: null,
    //                 dateModified: null,
    //                 isMyFavorite: false,
    //             },
    //         ];
    //         // global.fetch = jest.fn().mockResolvedValue({
    //         //     json: jest.fn().mockResolvedValue(responseData),
    //         // });
    //         global.fetch = jest.fn().mockResolvedValue({
    //             json: jest
    //                 .fn()
    //                 .mockResolvedValue(
    //                     jest.fn().mockResolvedValue(expectedData)
    //                 ),
    //         });
    //         // eslint-disable-next-line testing-library/no-await-sync-query
    //         const res = await repo.getListFilterByCategory('test-category');
    //         expect(res).toEqual(expectedData);
    //     });
    // });
});
