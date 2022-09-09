import { startFirebase } from './firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// startFirebase is a function that has the responsability to call two external functions
// Since they are external, we need to mock them
jest.mock('firebase/app');
jest.mock('firebase/database');

describe('Given the startFirebase service', () => {
    describe('When it is called', () => {
        test('Then firebase services should be called', () => {
            // act
            startFirebase();
            // assert
            expect(initializeApp).toHaveBeenCalled();
            expect(getDatabase).toHaveBeenCalled();
        });
    });
});
