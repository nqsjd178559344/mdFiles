例:
let f = new F()
1. 创建了个 obj
2. f.__proto__ = F.prototype
3. 将 F 的 this 指向给 f, 并 执行 F
4. 如果 F 的返回值为 undefined || 值类型 || this, 则 返回 obj; 如返回值 为 对象，则返回对象

new做了什么 ：
1. 创建一个对象obj 
2. 绑定原型(obj.__proto__ = 被new的.prototype)
3. 让 被new的 中的 this 指向 obj,并执行 被new的 函数体
4. 如果 被new的 返回值为值类型，则 返回obj；如果 返回 this，则this === obj，同样返回 obj；如果返回值是引用类型，则返回引用类型

