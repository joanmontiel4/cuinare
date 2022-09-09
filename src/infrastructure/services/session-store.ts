export class SessionStore<T> {
    constructor(public storeName: string) {}
    getItem(): T | null {
        return sessionStorage.getItem(this.storeName)
            ? JSON.parse(sessionStorage.getItem(this.storeName) as string)
            : null;
    }

    getItems(): Array<T> {
        return sessionStorage.getItem(this.storeName)
            ? JSON.parse(sessionStorage.getItem(this.storeName) as string)
            : [];
    }

    setItem(data: T) {
        sessionStorage.setItem(this.storeName, JSON.stringify(data));
    }

    setItems(data: Array<T>) {
        sessionStorage.setItem(this.storeName, JSON.stringify(data));
    }

    removeItems() {
        sessionStorage.removeItem(this.storeName);
    }
}
