// Otaku 御宅族，简称宅
function Otaku(name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

// 因为缺乏锻炼的缘故，身体强度让人担忧
Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
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

console.log(person.name,'Kevin') // Kevin
console.log(person.habit,'Games') // Games
console.log(person.strength,'60') // 60

person.sayYourName(); // I am Kevin