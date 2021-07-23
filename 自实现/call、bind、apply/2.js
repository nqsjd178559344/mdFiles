Function.prototype.myBind = function (initContext) {
    const context = initContext || window
    const args = Array.from(arguments).slice(1)
    const self = this
    return function () {
        const argus = Array.from(arguments)
        return self.call(context, ...args, ...argus)
    }
}
// todo 检测

var foo = {
    value: 1
};

function bar(name, age, sex) {
    console.log(this.value);
    console.log(name);
    console.log(age);
    console.log(sex);

}

var bindFoo1 = bar.myBind(foo, 'daisy');
var bindFoo2 = bindFoo1('18', 'female');

// 1
// daisy
// 18
// female