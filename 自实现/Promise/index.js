class MyPromise {
    constructor(callback) {
        this._status = 'pending'
        this._s_res = null
        this._f_res = null
        this._unfinished_events = []
        callback(arg => {
            this._status = 'fulfilled'
            this._s_res = arg
            this._unfinished_events.forEach(item => {
                const returnValue =  item.resolve(arg) || arg
                handle(returnValue, item.resFn, item.rejFn)
            })
        }, arg => {
            this._status = 'reject'
            this._f_res = arg
            this._unfinished_events.forEach(item => {
                const returnValue =  item.reject(arg)
                handle(returnValue, item.resFn, item.rejFn)
            })
        })
    }
    then(onResolve, onReject) {
        return new MyPromise((resFn, rejFn) => {
            if (this._status === 'fulfilled') {
                const returnValue = onResolve(this._s_res) || this._s_res
                handle(returnValue, resFn, rejFn)
            } else if (this._status === 'reject') {
                const returnValue = onReject(this._f_res)
                errorBack(returnValue, resFn, rejFn)
            } else {
                this._unfinished_events.push({
                    resolve: onResolve,
                    reject: onReject,
                    resFn,
                    rejFn
                })
            }
        })

    }

}

function handle(returnValue, resFn, rejFn) {
    if (returnValue && returnValue['then'] && typeof returnValue['then'] === 'function') {
        returnValue.then(success => {
            resFn(success)
        }, error => {
            rejFn(error)
        })
    } else {
        resFn(returnValue)
    }
}

function errorBack(returnValue, resFn, rejFn) {
    if (returnValue && returnValue['then'] && typeof returnValue['then'] === 'function') {
        returnValue.then(success => {
            resFn(success)
        }, error => {
            rejFn(error)
        })
    } else {
        resFn(returnValue)
    }
}

// todo 基础使用
// new MyPromise((resolve,reject)=>{
//     resolve(1)
// }).then(res=>{
//     console.log(res,'res')
// })

// new MyPromise((resolve,reject)=>{
//     reject(1)
// }).then(res=>{
//     console.log(res,'res')
// },error=>{
//     console.log(error,'error')
// })

// todo 处理异步
// new MyPromise((resolve, reject) => {
//     setTimeout(function () {
//         resolve(1)
//     }, 1000)
// }).then(res => {
//     console.log(res, 'res')
// })

// todo 链式调用
// new MyPromise((resolve, reject) => {
//     resolve(1)
// })
// .then(res => {
//     return res + 233
// })
// .then(res => {
//     return res + '111'
// })
// .then(res => {
//     console.log(res, 'res')
// })

new MyPromise((resolve, reject) => {
    setTimeout(function () {
        resolve(7)
    }, 1000)
})
.then(res => {
    return res + 1
})
.then(res => {
    return res + 2
})
.then(res => {
    return res + '111'
})
.then(res => {
    console.log(res, 'res')
})
