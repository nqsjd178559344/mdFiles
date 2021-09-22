function myInstanceof(proto, target) {
    proto = proto.__proto__;
    while (proto) {
        if (proto === target.prototype) {
            return true
        } else {
            proto = proto.__proto__
        }
    }
    return false;
}

console.log('____测试____')


console.log(myInstanceof({}, Array), {} instanceof Array)
console.log(myInstanceof([], Array), [] instanceof Array)
console.log(myInstanceof({}, Object), {} instanceof Object)
console.log(myInstanceof({}, Number), {} instanceof Number)

console.log(myInstanceof(8, Number), 8 instanceof Number)
const newNumber = new Number()
console.log(myInstanceof(newNumber, Number), newNumber instanceof Number,'newNumber')

console.log(myInstanceof('123', String), '123' instanceof String)
const newString = new String()
console.log(myInstanceof(newString, String), newString instanceof String,'newString')

class Person {

}

Person.prototype.isA = 'isA'

function People (){

}
People.prototype = new Person()
People.prototype.constructor = People

function Male() {

}
Male.prototype = new People()
Male.prototype.constructor = Male
const male = new Male()

function Father() {

}

Father.prototype = new Male()
Father.prototype.constructor = Father
const father = new Father()

function Son() {

}

Son.prototype = new Father()
Son.prototype.constructor = Son
Son.prototype.isSon = 'isSon'

const son = new Son()

console.log(son,'____son____')

/**
 * ! 父子之间通过 new 传递
 * ? 不可使用 class 仅可使用 function
 * ? 8 & Number | '123' & String 为何instanceof === false?
 */

console.log(myInstanceof(son, Father), son instanceof Father)
console.log(myInstanceof(son, Male), son instanceof Male)
console.log(myInstanceof(son, People), son instanceof People)
console.log(myInstanceof(son, Person), son instanceof Person)

console.log(father,'____father____')
console.log(myInstanceof(father, Father), father instanceof Father)
console.log(myInstanceof(father, Male), father instanceof Male)
console.log(myInstanceof(father, People), father instanceof People)
console.log(myInstanceof(father, Person), father instanceof Person)

console.log(male,'____male____')
console.log(myInstanceof(male, Male), male instanceof Male)
console.log(myInstanceof(male, People), male instanceof People)
console.log(myInstanceof(male, Person), male instanceof Person)