import { render, screen } from '../../../infrastructure/testutils/test.utils';
import Favorites from './favorites';
// installing redux-mock-store
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { startFirebase } from '../../../infrastructure/services/firebase';

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
const store = mockStore({
    isLogged: true,
    userLogged: {
        favorites: [{ mockRecipe1 }, { mockRecipe2 }],
    },
});

describe('Given the favorites page', () => {
    describe('When the page is rendered and the user is not logged', () => {
        test('The text "Please, login" should be rendered', () => {
            render(<Favorites></Favorites>);
            const element = screen.getByText(/Please, login/i);
            expect(element).toBeInTheDocument();
        });
    });
    describe('When the page is rendered and the user is logged', () => {
        test('The title "Favorite recipes" should be rendered', () => {
            rtlRender(
                <Provider store={store}>
                    <Favorites></Favorites>
                </Provider>
            );
            const element = screen.getByText(/Favorite recipes/i);
            expect(element).toBeInTheDocument();
        });
    });
});
