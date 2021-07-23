function Otaku(name, age) {
    this.strength = 60;
    this.age = age;

    return 'handsome boy';
}

function myNew(fn) {
    let obj = {}
    const args = Array.from(arguments).slice(1)
    obj.__proto__ = fn.prototype
    const res = fn.apply(obj, args)
    return res && typeof res === 'object' ? res : obj
}
// todo 检测

// var person = new Otaku('Kevin', '18');
var person = myNew(Otaku, 'Kevin', '18');


console.log(person.name) // undefined
console.log(person.habit) // undefined
console.log(person.strength) // 60
console.log(person.age) // 18