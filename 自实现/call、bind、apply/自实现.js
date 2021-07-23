Function.prototype.myCall = function (initContext) {
    const args = Array.from(arguments).slice(1)
    const context = initContext || window
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myApply = function (initContext) {
    let args = Array.from(arguments).slice(1)
    args = args.length ? args[0] : args
    const context = initContext || window
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myApply2 = function (initContext, arr = []) {
    const context = initContext || window
    context.fn = this
    let result = context.fn(...arr)
    delete context.fn
    return result
}

Function.prototype.myBind = function (initContext) {
    const context = initContext || window
    const args = Array.from(arguments).slice(1)
    const self = this
    return function () {
        const argus = Array.from(arguments)
        return self.call(context, ...args, ...argus)
    }
}

// todo 测试

const obj = {
    name: 1,
    value: 2
}

function fn1() {
    console.log(this.value, 'fn1')
}

function fn2(name, age) {
    console.log(this.value, 'fn2')
    console.log(name, age)
}

function fn3(name, age) {
    console.log(this.value, 'fn3')
    return {
        value: this.value,
        name: name,
        age: age
    }
}

// todo call

fn1.myCall(obj)
fn1.myCall(null)

fn2.myCall(obj, '张发发', 15)
fn2.myCall(null, '张发发', 15)

const res11 = fn3.myCall(obj, '张发发', 15)
const res12 = fn3.myCall(null, '张发发', 15)
console.log(res11, 'res11|res12', res12)

console.log('~~ 分割线 ~~')

fn1.call(obj)
fn1.call(null)

fn2.call(obj, '张发发', 15)
fn2.call(null, '张发发', 15)

const res21 = fn3.call(obj, '张发发', 15)
const res22 = fn3.call(null, '张发发', 15)
console.log(res21, 'res21|res22', res22)

fn1.myCall(obj)
fn1.myCall(null)

fn2.myCall(obj, '张发发', 15)
fn2.myCall(null, '张发发', 15)

// todo apply

fn1.myApply(obj)
fn1.myApply(null)

fn2.myApply(obj, ['张发发', 15])
fn2.myApply(null, ['张发发', 15])

const res11 = fn3.myApply(obj, ['张发发', 15])
const res12 = fn3.myApply(null, ['张发发', 15])
console.log(res11, 'res11|res12', res12)

console.log('~~ 分割线 ~~')

fn1.apply(obj)
fn1.apply(null)

fn2.apply(obj, ['张发发', 15])
fn2.apply(null, ['张发发', 15])

const res21 = fn3.apply(obj, ['张发发', 15])
const res22 = fn3.apply(null, ['张发发', 15])
console.log(res21, 'res21|res22', res22)

console.log('~~ 分割线 ~~')

fn1.call(obj)
fn1.call(null)

fn2.call(obj, '张发发', 15)
fn2.call(null, '张发发', 15)

const res21 = fn3.call(obj, '张发发', 15)
const res22 = fn3.call(null, '张发发', 15)
console.log(res21, 'res21|res22', res22)

// todo apply2

// todo apply

fn1.myApply2(obj)
fn1.myApply2(null)

fn2.myApply2(obj, ['张发发', 15])
fn2.myApply2(null, ['张发发', 15])

const res11 = fn3.myApply2(obj, ['张发发', 15])
const res12 = fn3.myApply2(null, ['张发发', 15])
console.log(res11, 'res11|res12', res12)

console.log('~~ 分割线 ~~')

fn1.apply(obj)
fn1.apply(null)

fn2.apply(obj, ['张发发', 15])
fn2.apply(null, ['张发发', 15])

const res21 = fn3.apply(obj, ['张发发', 15])
const res22 = fn3.apply(null, ['张发发', 15])
console.log(res21, 'res21|res22', res22)

console.log('~~ 分割线 ~~')

fn1.call(obj)
fn1.call(null)

fn2.call(obj, '张发发', 15)
fn2.call(null, '张发发', 15)

const res21 = fn3.call(obj, '张发发', 15)
const res22 = fn3.call(null, '张发发', 15)
console.log(res21, 'res21|res22', res22)

