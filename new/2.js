function Otaku(name, age) {
    this.strength = 60;
    this.age = age;

    return {
        name: name,
        habit: 'Games'
    }
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

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined