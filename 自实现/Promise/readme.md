### 静态方法
    静态方法包含this关键字，这个this指的是类，而不是实例。

1. 想在静态方法中调用非静态方法
    ```js
    // 返回第一个率先改变状态的实例，且状态跟随其一起改变
    static race(promises) {
        return new MyPromise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            reject();
        }

        if (!promises.length) {
            resolve([]);
        }

        for (let index = 0; index < promises.length; index++) {
            const item = promises[index];
            const p = new MyPromise(item)
            const _item = p.#isPromiseLike(item) ? item : p.resolve(item);
            _item.then(resolve, reject);
        }
        });
    }
    ```
2. 想在非静态方法中调用静态方法(resolve为静态方法)
    ```js
    finally(callback) {
        return this.then(
        (value) => this.constructor.resolve(callback()).then(() => value),
        (error) =>
            this.constructor.resolve(callback()).then(() => {
            throw error;
            })
        );
    }
    ```
