例:
let f = new F()
1. 创建了个 obj
2. f.__proto__ = F.prototype
3. 将 F 的 this 指向给 f, 并 执行 F
4. 如果 F 的返回值为 undefined || 值类型 || this, 则 返回 obj; 如返回值 为 对象，则返回对象

function myNew(fn) {
    let obj = {}
    obj.__proto__ = fn.prototype
    const res = fn.apply(obj)
    return res && typeof res === 'object' ? res : obj
}

