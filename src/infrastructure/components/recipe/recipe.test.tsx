import { screen } from '../../../infrastructure/testutils/test.utils';
// installing redux-mock-store
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { render as rtlRender, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Recipe } from './recipe';
import { startFirebase } from '../../../infrastructure/services/firebase';
import React from 'react';
import userEvent from '@testing-library/user-event';

startFirebase();
const mockStore = configureMockStore([thunk]);

const mockRecipe1 = {
    id: '1456',
    name: 'test-recipe-name',
    drinkAlternate: null,
    category: 'test-recipe-name',
    area: 'test-recipe-name',
    instructions: 'test-recipe-name',
    image: 'test-recipe-name',
    tags: null,
    videoLink: null,
    ingredients: ['test-ing1'],
    measures: ['test-meas1'],
    source: 'my recipes',
    imageSource: null,
    creativeCommonsConfirmed: null,
    dateModified: null,
    isMyFavorite: false,
};
const mockRecipe2 = {
    id: '2145',
    name: 'test-recipe-name2',
    drinkAlternate: null,
    category: 'test-recipe-name2',
    area: 'test-recipe-name2',
    instructions: 'test-recipe-name2',
    image: 'test-recipe-name2',
    tags: null,
    videoLink: null,
    ingredients: ['test-ing2'],
    measures: ['test-meas2'],
    source: 'my recipes2',
    imageSource: null,
    creativeCommonsConfirmed: null,
    dateModified: null,
    isMyFavorite: false,
};
const mockStoreObject = mockStore({
    isLogged: true,
    userLogged: {
        favorites: [{ mockRecipe1 }, { mockRecipe2 }],
    },
});

const mockRecipe = {
    id: '654',
    name: 'test-recipe-name',
    drinkAlternate: null,
    category: 'test-recipe-name',
    area: 'test-recipe-name',
    instructions: 'test-recipe-name',
    image: 'test-recipe-name',
    tags: null,
    videoLink: null,
    ingredients: ['test-ing1'],
    measures: ['test-meas1'],
    source: 'my recipes',
    imageSource: null,
    creativeCommonsConfirmed: null,
    dateModified: null,
    isMyFavorite: false,
};

describe('Given the recipe component', () => {
    describe('When the component is rendered and it is NOT selected (details are not printed)', () => {
        test('The text "Category" should be rendered', () => {
            rtlRender(
                <Provider store={mockStoreObject}>
                    <Recipe recipe={mockRecipe}></Recipe>
                </Provider>
            );
            const element = screen.getByText(/Category/i);
            expect(element).toBeInTheDocument();
        });
    });
    describe('When the component is rendered and it is selected (details are printed)', () => {
        let setIsSelectedStateMock: jest.Mock;
        beforeEach(() => {
            setIsSelectedStateMock = jest.fn();
            const useStateMock: any = (useState: any) => [
                useState,
                setIsSelectedStateMock,
            ];
            // To make it work change in recipe.tsx useState() to React.useState()
            jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        });
        test('handleClick is called when click in Category', async () => {
            rtlRender(
                <Provider store={mockStoreObject}>
                    <Recipe recipe={mockRecipe}></Recipe>
                </Provider>
            );
            const element = screen.getByText(/Category/i);
            expect(element).toBeInTheDocument();
            userEvent.click(element);
            await waitFor(() => {
                expect(setIsSelectedStateMock).toHaveBeenCalled();
            });
        });
        beforeEach(() => {
            setIsSelectedStateMock = jest.fn();
            // How to mock useState:
            // const useStateMock: any = (useState: any) => [
            //     useState,
            //     setIsSelectedStateMock,
            // ];
            const useStateMock: any = (useState: any) => [
                true,
                setIsSelectedStateMock,
            ];
            // To make it work change in recipe.tsx useState() to React.useState()
            jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        });
        test('The text "Instructions" has been rendered', async () => {
            rtlRender(
                <Provider store={mockStoreObject}>
                    <Recipe recipe={mockRecipe}></Recipe>
                </Provider>
            );
            const element = screen.getByText(/Category/i);
            expect(element).toBeInTheDocument();
            userEvent.click(element);
            const secondElement = await screen.findByText(/Instructions/i);
            // screen.debug(secondElement);
            await waitFor(() => {
                expect(secondElement).toBeInTheDocument();
            });
        });
    });
});
