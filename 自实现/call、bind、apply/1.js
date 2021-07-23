Function.prototype.myBind = function (initContext) {
    const context = initContext || window
    const args = Array.from(arguments).slice(1)
    const self = this
    return function () {
        return self.call(context, ...args)
    }
}
// todo 检测

var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
    return this.value++
}

// 返回了一个函数
var bindFoo = bar.myBind(foo);

bindFoo(); // 1
console.log(foo, 'foo')

const res = bindFoo(); // 1
console.log(res, 'res')
console.log(foo, 'foo')