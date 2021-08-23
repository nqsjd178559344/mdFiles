class MyPromise {
    constructor(callback) {
        this._status = 'pending'
        this.s_res = null
        this.f_res = null
        this._query = []
        callback(value => {
            this.s_res = value
            this._status = 'fulfilled'
            this._query.forEach(item => {
                item.resolve(value)
            })
        }, value => {
            this.f_res = value
            this._status = 'rejected'
            this._query.forEach(item => {
                item.reject(value)
            })
        })
    }
    then(onResolve, onReject) {
        if (this._status === 'fulfilled') {
            onResolve(this.s_res)
            return
        } else if (this._status === 'rejected') {
            onReject(this.f_res)
        } else {
            this._query.push({
                resolve: onResolve,
                reject: onReject,
            })
        }
    }
}

// todo basic
// new MyPromise((resolve, reject) => {
//     resolve(1);
// }).then(res => {
//     console.log(res,'MyPromise_success'); //1
// },error=>{
//     console.log(error,'MyPromise_error'); //2
// });

// todo 异步处理
new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(2333);
        // reject(2333);
    }, 1000);
}).then(res => {
    console.log(res, 'MyPromise_success');
}, error => {
    console.log(error, 'MyPromise_error'); //2
});

// // todo 处理链式调用
// new MyPromise((resolve, reject) => {
//     resolve(1);
// })
//     .then(res => {
//         return res;
//     })
//     .then(res => {
//         console.log(res);
//     });

