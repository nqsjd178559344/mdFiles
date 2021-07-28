// class People {
//     constructor() {
//         this.a = 'a'
//     }
// }

const People = function () {
    this.a = 'a'

}

People.prototype.isA = 'isA'

const Person = function () {
    this.b = 'b'
}
Person.prototype = new People()
Person.prototype.constructor = Person
Person.prototype.isB = 'isB'

const Father = function () {
    this.c = 'c'
}
Father.prototype = new Person() // todo 直接指定 Father.prototype会丢失Father.prototype.constructor,需要重新指定constructor
Father.prototype.constructor = Father
Father.prototype.isC = 'isC'

const Me = function () {
    this.d = 'd'
}
Me.prototype = new Father()
Me.prototype.constructor = Me
Me.prototype.isD = 'isD'

const me = new Me()
me.isD = 'isD'

console.log(me, 'me')
// todo 这是作用域链相关
// console.log(me.a, '=a', me.isA)
// console.log(me.b, '=b', me.isB)
// console.log(me.c, '=c', me.isC)
// console.log(Me.prototype, 'me.prototype')
// console.log(Me.prototype.b, 'me.prototype.b')

// todo 这是原型链相关
// console.log('me', me.constructor)
// console.log(me.__proto__, 'Me.prototype')
console.log(me.__proto__.constructor)
// console.log(me.__proto__.__proto__, 'Father.prototype')
console.log(me.__proto__.__proto__.constructor)
// console.log(me.__proto__.__proto__.__proto__, 'Person.prototype')
console.log(me.__proto__.__proto__.__proto__.constructor)
// console.log(me.__proto__.__proto__.__proto__.__proto__, 'People.prototype')
console.log(me.__proto__.__proto__.__proto__.__proto__.constructor)
// console.log(me.__proto__.__proto__.__proto__.__proto__.__proto__, 'Object.prototype')
// console.log(me.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__, 'null')

