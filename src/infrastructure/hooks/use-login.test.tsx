import {
    getAuth,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    OAuthCredential,
} from 'firebase/auth';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppContext } from '../context/context';
import { useLogin } from './use-login';
import { SessionStore } from '../services/session-store';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startFirebase } from '../services/firebase';

jest.mock('firebase/auth');
jest.mock('../services/session-store');
startFirebase();

SessionStore.prototype.getItem = jest.fn().mockReturnValue({});
SessionStore.prototype.setItem = jest.fn();

const mockStore = configureMockStore([thunk]);

describe('Given Login component', () => {
    describe('When it has been instantiate', () => {
        let jsx: JSX.Element;
        let TestComponent: Function;
        // let context: Context;
        let btnLabel: string;

        beforeEach(() => {
            (signInWithPopup as jest.Mock).mockResolvedValue({
                user: '',
            });
            (signOut as jest.Mock).mockResolvedValue({});
            GoogleAuthProvider.credentialFromResult = jest.fn(
                () => ({ accessToken: '' } as OAuthCredential)
            );
            (getAuth as jest.Mock).mockReturnValue({});

            TestComponent = ({ btnLabel }: { btnLabel: string }) => {
                const { handleClick } = useLogin();
                return (
                    <button
                        type="button"
                        onClick={() => {
                            handleClick();
                        }}
                    >
                        {btnLabel}
                    </button>
                );
            };
        });
        test('Login data is checked in Session storage', async () => {
            // arrange
            const store = mockStore({
                isLogged: false,
                userLogged: {},
            });
            btnLabel = 'Login';
            jsx = (
                <Provider store={store}>
                    <TestComponent btnLabel={btnLabel}></TestComponent>
                </Provider>
            );
            // act
            render(jsx);
            // assert
            await waitFor(() =>
                expect(SessionStore.prototype.getItem).toHaveBeenCalledTimes(1)
            );
        });
        // describe('And the user is not logged', () => {
        //     beforeEach(() => {
        //         // arrange
        //         btnLabel = 'Login';
        //         const store = mockStore({
        //             isLogged: false,
        //             userLogged: {},
        //         });
        //         jsx = (
        //             <Provider store={store}>
        //                 <TestComponent btnLabel={btnLabel}></TestComponent>
        //             </Provider>
        //         );
        //     });
        //     test('When a valid user click login button, firebase is invoked', async () => {
        //         // act
        //         render(jsx);
        //         // assert
        //         const element = screen.getByText(btnLabel);
        //         userEvent.click(element);
        //         expect(signInWithPopup).toHaveBeenCalled();
        //         expect(await SessionStore.prototype.setItem).toHaveBeenCalled();
        //     });
        //     //     test('When an invalid user click login button and no credential is provided by firebase', async () => {
        //     //         (
        //     //             GoogleAuthProvider.credentialFromResult as jest.Mock
        //     //         ).mockReturnValue(null);
        //     //         // act
        //     //         render(jsx);
        //     //         // assert
        //     //         const element = screen.getByText(btnLabel);
        //     //         try {
        //     //             userEvent.click(element);
        //     //             await expect(signInWithPopup).toHaveBeenCalled();
        //     //         } catch (error) {
        //     //             // eslint-disable-next-line jest/no-conditional-expect
        //     //             expect((error as Error).message).toBe('No credential');
        //     //         }
        //     //     });
        //     // });
        //     // describe('And the user is logged', () => {
        //     //     beforeEach(() => {
        //     //         // arrange
        //     //         btnLabel = 'Logout';
        //     //         SessionStore.prototype.getItem = jest
        //     //             .fn()
        //     //             .mockReturnValue({ user: 'Test' });
        //     //         context.isLogged = true;

        //     //         jsx = (
        //     //             <AppContext.Provider value={context}>
        //     //                 <TestComponent btnLabel={btnLabel}></TestComponent>
        //     //             </AppContext.Provider>
        //     //         );
        //     //     });
        //     //     test('When the user click logout button, firebase is invoked', async () => {
        //     //         // act
        //     //         render(jsx);
        //     //         // assert
        //     //         const element = screen.getByText(btnLabel);
        //     //         userEvent.click(element);
        //     //         expect(signOut).toHaveBeenCalled();
        //     //         expect(await context.setIsLogged).toHaveBeenCalled();
        //     //     });
        //     //     test('When the user click logout button and not sign out is possible in firebase', async () => {
        //     //         (signOut as jest.Mock).mockRejectedValueOnce(
        //     //             new Error('Imposible sign out')
        //     //         );
        //     //         // act
        //     //         render(jsx);
        //     //         // assert
        //     //         const element = screen.getByText(btnLabel);
        //     //         try {
        //     //             userEvent.click(element);
        //     //         } catch (error) {
        //     //             // eslint-disable-next-line jest/no-conditional-expect
        //     //             expect((error as Error).message).toBe('Imposible sign out');
        //     //         }
        //     //     });
        // });
    });
});
