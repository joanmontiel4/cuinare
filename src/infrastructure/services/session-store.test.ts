import { SessionStore } from './session-store';

describe('Given an instance of service SessionStore', () => {
    interface iData {
        test: string;
    }
    let ss: SessionStore<iData>;
    let data: iData;
    let storeName: string;
    beforeEach(() => {
        storeName = 'Test';
        ss = new SessionStore(storeName);
        data = { test: 'Test Data' };
    });

    describe('When the method getItem is used, and no data is obtained', () => {
        test('Then corresponding method in sessionStorage should be call', () => {
            // arrange
            global.Storage.prototype.getItem = jest.fn().mockReturnValue(null);
            // act
            const result = ss.getItem();
            // assert
            expect(sessionStorage.getItem).toHaveBeenCalledWith(storeName);
            expect(result).toBeNull();
        });
    });

    describe('When the method getItem is used, and some data is obtained', () => {
        test('Then corresponding method in sessionStorage should be call', () => {
            // arrange
            global.Storage.prototype.getItem = jest
                .fn()
                .mockReturnValue(JSON.stringify(data));
            // act
            const result = ss.getItem();
            // assert
            expect(sessionStorage.getItem).toHaveBeenCalledWith(storeName);
            expect(result).toStrictEqual(data);
        });
    });

    describe('When the method getItems is used, and no data is obtained', () => {
        test('Then corresponding method in sessionStorage should be call', () => {
            // arrange
            global.Storage.prototype.getItem = jest.fn().mockReturnValue(null);
            // act
            const result = ss.getItems();
            // assert
            expect(sessionStorage.getItem).toHaveBeenCalledWith(storeName);
            expect(result).toStrictEqual([]);
        });
    });

    describe('When the method getItems is used, and some data is obtained', () => {
        test('Then corresponding method in sessionStorage should be call', () => {
            // arrange
            global.Storage.prototype.getItem = jest
                .fn()
                .mockReturnValue(JSON.stringify([data]));
            // act
            const result = ss.getItems();
            // assert
            expect(sessionStorage.getItem).toHaveBeenCalledWith(storeName);
            expect(result).toStrictEqual([data]);
        });
    });

    describe('When the method setItem is used', () => {
        test('Then corresponding method in sessionStorage should be call', () => {
            // arrange
            global.Storage.prototype.setItem = jest.fn();
            let expectedArgument = JSON.stringify(data);
            // act
            ss.setItem(data);
            // assert
            expect(localStorage.setItem).toHaveBeenCalledWith(
                storeName,
                expectedArgument
            );
        });
    });

    describe('When the method setItems is used', () => {
        test('Then corresponding method in sessionStorage should be call', () => {
            // arrange
            global.Storage.prototype.setItem = jest.fn();
            let expectedArgument = JSON.stringify([data]);
            // act
            ss.setItems([data]);
            // assert
            expect(sessionStorage.setItem).toHaveBeenCalledWith(
                storeName,
                expectedArgument
            );
        });
    });

    describe('When the method removeItems is used', () => {
        test('Then corresponding method in sessionStorage should be call', () => {
            // arrange
            global.Storage.prototype.removeItem = jest.fn();
            // act
            ss.removeItems();
            // assert
            expect(sessionStorage.removeItem).toHaveBeenCalledWith(storeName);
        });
    });
});
