import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render as rtlRender, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Login } from './login';
import { startFirebase } from '../../services/firebase';
import userEvent from '@testing-library/user-event';
import * as hook from '../../hooks/use-login';

const mockStore = configureMockStore([thunk]);
startFirebase();

describe('Given the Login component', () => {
    describe('When the component is rendered and the user is not logged', () => {
        test('The text "Login" should be rendered', () => {
            //arrange
            const mockStoreObject = mockStore({
                isLogged: false,
                userLogged: {
                    photoURL: 'test-photo',
                },
            });
            //act
            rtlRender(
                <Provider store={mockStoreObject}>
                    <Login />
                </Provider>
            );
            //assert
            const element = screen.getByText(/Login/i);
            expect(element).toBeInTheDocument();
        });
    });
    describe('When the component is rendered and the user is logged', () => {
        test('The text "Logout" should be rendered', () => {
            //arrange
            const mockStoreObject = mockStore({
                isLogged: true,
                userLogged: {
                    photoURL: 'test-photo',
                },
            });
            //act
            rtlRender(
                <Provider store={mockStoreObject}>
                    <Login />
                </Provider>
            );
            //assert
            const element = screen.getByText(/Logout/i);
            expect(element).toBeInTheDocument();
        });
    });
    // Is not yet working
    // moving the line jest.mock('../../hooks/use-login'); helps, but still does not work

    // describe('When the component is click and the user is not logged', () => {
    //     beforeEach(() => {
    //         jest.mock('../../hooks/use-login');
    //         (hook.useLogin as jest.Mock).mockReturnValue({
    //             handleClick: jest.fn(),
    //         });
    //     });
    //     test('handleClick is called', () => {
    //         //arrange
    //         jest.mock('../../hooks/use-login');
    //         let handleClick: Function;

    //         (hook.useLogin as jest.Mock).mockReturnValue({
    //             handleClick: jest.fn(),
    //         });

    //         handleClick = hook.useLogin().handleClick;
    //         const mockStoreObject = mockStore({
    //             isLogged: false,
    //             userLogged: {
    //                 photoURL: 'test-photo',
    //             },
    //         });
    //         //act
    //         rtlRender(
    //             <Provider store={mockStoreObject}>
    //                 <Login />
    //             </Provider>
    //         );
    //         const element = screen.getByText(/Login/i);
    //         expect(element).toBeInTheDocument();
    //         userEvent.click(element);
    //         //assert
    //         expect(handleClick).toHaveBeenCalled();
    //     });
    // });
});
