import { LocalStore } from './local-store';

describe('Given an instance of service LocalStore', () => {
    let ls: LocalStore<{ test: string }>;
    let data: { test: string };

    beforeEach(() => {
        ls = new LocalStore('Test');
        data = { test: 'Test Data' };
    });
    describe('When the method getItem is used, and no data is obtained', () => {
        test('Then corresponding method in localStore should be called', () => {
            //arrange
            global.Storage.prototype.getItem = jest.fn().mockReturnValue(null);
            // act
            ls.getItem();
            // assert
            expect(localStorage.getItem).toHaveBeenCalled();
        });
    });
    describe('When the method getItem is used, and data is obtained', () => {});
});
