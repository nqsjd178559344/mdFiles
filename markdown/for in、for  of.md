for in / for of 的 区别:
1. **根本区别: for in 可遍历对象,for of 不可**
2. for in 
   1. 会遍历所有自身及继承的可枚举属性
   2. 最好不要用其遍历数组(不保证以特定顺序返回)
   3. 如果想要其自身的属性，则通过 **hasOwnProperty/getOwnPropertyNames/propertyIsEnumerable**
3. for of 
   1. 仅可遍历*可迭代对象*(**iterable**)上的属性，例如 *Array/Set/Map/String/arguments/NodeList*,
   2. 可正确响应 *break/continue/return*
   3. 原理:
      1. 首先调用集合的Symbol.iterator方法并返回一个新的迭代器对象
      2. 迭代器对象可以是任意具有.next()方法的对象
      3. for-of循环将重复调用这个方法，每次循环调用一次
4. 
注:
   1. Object.keys(): 会遍历所有自身(不包含继承)的可枚举属性 => Array
   2. Object.getOwnPropertyNames(): 会遍历所有自身(不包含继承)的所有属性(不含Symbol属性,但是包括不可枚举属性) => Array

   1. Object.hasOwnProperty(): 指示对象自身属性中是否具有指定的属性 => boolean

   2. 遍历对象方式
     1. for...in: for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
     2. Object.keys(obj):  Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
     3. Object.getOwnPropertyNames(obj): Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
     4. Object.getOwnPropertySymbols(obj): Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。
     5. Reflect.ownKeys(obj): Reflect.ownKeys返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。