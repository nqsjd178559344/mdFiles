1. let / const
  1. const，let，var 的区别（简单），const 定义的对象的属性是否可以改变？（简单）
     1. const:!变量提升, 暂时性死区 ，不可修改; (const 对象时，仍可更改该对象 [地址不可变])
     2. let: !变量提升, 暂时性死区  , 其下可修改 , 同一作用域下不可重复声明
     3. var: 全局可用，均可修改，挂载到this上(默认为window)
     注:var let 之间最好用let; let const 之间最好用 const; const JS编译器会对其进行优化,可提高程序运行效率
2. 解构赋值
3. String
   1. 增添了遍历器接口[Iterator]，可用 for..of 循环
   2. 模板字符串
   3. 方法:
      1. includes(searchString,position)
      2. startsWith(searchString,position)
      3. endsWith(searchString,position)
      4. repeat(+N) // 向下取整的+N
      5. padStart(length,string) [ES8/ES2017]
      6. padEnd(length,string) [ES8/ES2017]
      7. trim: 消除string 首尾空格
      8. trimStart/trimLeft [ES10/ES2019]
      9. trimEnd/trimRight  [ES10/ES2019]
      10. matchAll
      11. replaceAll [ES12/ES2121]/replace区别
          1.  replaceAll(subStr, newSubStr):一键替换所有
          2.  replace(regexp|subStr, newSubStr|function): 默认只替换第一个
4.  RegExp
5. Number
   1. isNaN => !NaN
   2. isFinite => !Infinity(!Number)
   3. isInteger => !!整数[精度不高可用]
   4. MAX_SAFE_INTEGER/MIN_SAFE_INTEGER
   5. Math
      1. trunc => 整数部分 || NaN
      2. sign => +1 || -1 || +0 || -0 || NaN
      3. cbrt(X) => X的立方根
6. BigInt[ES11/ES2120]
7. Function
   1. rest[...]
   2. 如函数参数使用了[默认值]/[解构赋值]/[扩展运算符], 那么函数内部就不能显式设定为严格模式
   3. name
   4. 箭头函数
      区别:
      1. 无自己的this[上层作用域中的this]
      2. 不可使用new
      3. 不可使用arguments
      4. 不可使用yield
8. Array
   1. ... => 取代 apply
   2. find
   3. findIndex
   4. fill
   5. keys/values/entries
   6. includes
   7. flat/flatMap
   8. Array.from => 转换类数组对象(y存在length属性)
9. Object
   1.  getOwnPropertyDescriptor => 获取描述对象
       1.  value
       2.  writable
       3.  enumerable *可枚举性*
       4.  configurable
   2.  is()
   3.  assign()
   4.  __proto__
       1.  setPrototypeOf(obj,proto) =>**obj.__proto__ = proto**
           ```
           let me = {}
           Object.setPrototypeOf(me, Father.prototype) 
           Father.prototype = me.__proto__ = Object.getPrototypeOf(me)
           ```
       2.  getPrototypeOf
           ```
           let me = new Father()
           Father.prototype = me.__proto__ = Object.getPrototypeOf(me)
           ```
   5.  *fromEntries* => Object.entries 逆操作
10. 运算符
    1.  **: a**2 === a * a
    2.  ?.: a?.b?.c => 如果取到null||undefined, 则return undefined [ES11/ES2020]
    3.  ??: a??b => a==null || a== undefined 时 [ES11/ES2020]
11. Symbol
12. Set/Map
13. Promise
14. Iterator 
   6.  可使用rest
   7.  可遍历 [for..of]
15. Generator
    1.  返回*遍历器对象*
16. async[ES8/ES2017]
    1.  返回Promise *原始类型则用Promise.resolve 包裹*
17. Class
    1.  constructor: 构造方法,默认添加
    2.  extends: 继承
18. Proxy
    1.  不可修改!configurable && !writable 的属性
    2.  操作
        1.  get(target,propKey,receiver)
        2.  set(target,propKey,value,receiver) => *return boolean*
        3.  has(target,propKey) => *return boolean* **拦截 propKey in target 操作**
        4.  deleteProperty(target,propKey) => *return boolean* **拦截 delete proxy[propKey] 操作**
        5.  ownKeys(target) => *return Array* **拦截Object.keys | for in 等**
        6.  apply(target.object,arg) **拦截 proxy(...arg) | proxy.call(object,...arg) | proxy.apply(object,arg)**
        7.  constructor(target,args) **拦截new proxy(arg)等**
        8.  getPrototypeOf(target) **拦截Object.getPrototypeOf(proxy)**
        9.  setPrototypeOf(target,proto) **拦截Object.setPrototypeOf(proxy,proto)**
        10. defineProperty(target,propKey,propDesc)
    3.  Proxy 与 Object.defineProperty 区别
        1.  Object.defineProperty为ES5新增,Proxy为ES6新增,二者兼容度不同,且Proxy的某些功能不可由polyfill后提供
        2.  Object.defineProperty可通过对原对象的更改所触发,Proxy仅可通过对代理对象的更改所触发
        3.  Object.defineProperty仅可监听对象上的某属性,Proxy可监听全部的引用数据类型[Object/Array/Function]
        4.  Object.defineProperty仅可监听对象的某属性上的取值和设置,Proxy可监听除此之外的多种操作

注:
1. 空位处理:
   1. ES5
      1. forEach(), filter(), reduce(), every() 和some()都会跳过空位。
      2. map()会跳过空位，但会保留这个值
      3. join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
   2. ES6
      1. 空位转为undefined