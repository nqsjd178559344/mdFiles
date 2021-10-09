// ? 1. 固定参数自动调用
function add(a, b, c) {
    return a + b + c
}
function currying1(fn) {
    let args = []
    return function () {
        Array.prototype.push.apply(args, arguments)
        if (args.length === fn.length) { // 调用
            return fn.apply(fn, args)
        } else {
            return arguments.callee
        }
    }
}

// todo test
// const curry = currying1(add)
// let res1 = curry(1)(2)
// let res2 = curry(2)(3)
// let res3 = curry(233)(344)
// let res4 = curry(233)(344)(555)

// console.log(res1)
// console.log(res2)
// console.log(res4)

//? 2. 自己将其调用
function currying2(fn) {
    let args = []
    return function () {
        if (!arguments.length) { // 调用
            return fn.apply(fn, args)
        } else {
            Array.prototype.push.apply(args, arguments)
            return arguments.callee
        }
    }
}
const curry = currying2(add)
// let res5 = curry(233)(344)(246)()
// console.log(res5)

let res6 = curry(233)(344)(423)(234)()
console.log(res6)

