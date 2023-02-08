1. let / const
   1. const，let，var 的区别（简单），const 定义的对象的属性是否可以改变？（简单）
      1. const:!变量提升, 暂时性死区 ，不可修改; (const 对象时，仍可更改该对象 [地址不可变])
      2. let: !变量提升, 暂时性死区 , 其下可修改 , 同一作用域下不可重复声明
      3. var: 全局可用，均可修改，挂载到 this 上(默认为 window)
         注:var let 之间最好用 let; let const 之间最好用 const; const JS 编译器会对其进行优化,可提高程序运行效率
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
      7. trim: 消除 string 首尾空格
      8. trimStart/trimLeft [ES10/ES2019]
      9. trimEnd/trimRight [ES10/ES2019]
      10. matchAll [ES11/ES2020]
      11. replaceAll [ES12/ES2021]/replace 区别
          1. replaceAll(subStr, newSubStr):一键替换所有
          2. replace(regexp|subStr, newSubStr|function): 默认只替换第一个
4. RegExp
   1. 先行断言
5. Number
   1. isNaN => !NaN
   2. isFinite => !Infinity(!Number)
   3. isInteger => !!整数[精度不高可用]
   4. MAX_SAFE_INTEGER/MIN_SAFE_INTEGER
   5. Math
      1. trunc => 整数部分 || NaN
      2. sign => +1 || -1 || +0 || -0 || NaN
      3. cbrt(X) => X 的立方根
6. BigInt [ES11/ES2020]
7. 动态 imports [ES11/ES2020]
   1. export \* as {myModule} from "./test-module.js";
8. globalThis [ES11/ES2020]
   1. 浏览器 => window
   2. nodejs => global
9. Function
   1. rest[...]
   2. 如函数参数使用了[默认值]/[解构赋值]/[扩展运算符], 那么函数内部就不能显式设定为严格模式
   3. name
   4. 箭头函数
      区别:
      1. 无自己的 this[上层作用域中的 this]
      2. 不可使用 new
      3. 不可使用 arguments
      4. 不可使用 yield
10. Array
    1. ... => 取代 apply
    2. find
    3. findIndex
    4. fill
    5. keys/values/entries
    6. includes
    7. flat/flatMap
    8. Array.from => 转换类数组对象(y 存在 length 属性)
11. Object
12. getOwnPropertyDescriptor => 获取描述对象
    1. value
    2. writable
    3. enumerable _可枚举性_
    4. configurable
13. is()
14. assign()
15. **proto**

    1. setPrototypeOf(obj,proto) =>**obj.**proto** = proto**

       ```
       let me = {}
       Object.setPrototypeOf(me, Father.prototype)
       Father.prototype = me.__proto__ = Object.getPrototypeOf(me)
       ```

    2. getPrototypeOf

       ```
       let me = new Father()
       Father.prototype = me.__proto__ = Object.getPrototypeOf(me)
       ```

16. _fromEntries_ => Object.entries 逆操作
17. 运算符
    1. ~~: [除 NaN/Infinity 等外]如!number，则为 0;否则为 number 本身 ==非 ES6+==
    2. **: a**2 === a \* a
    3. ?.: a?.b?.c => 如果取到 null||undefined, 则 return undefined [ES11/ES2020]
    4. ??: a??b => a == null || a == undefined 时 [ES11/ES2020]
18. Symbol
19. Set/Map
20. Promise
21. Iterator
22. 可使用 rest
23. 可遍历 [for..of]
24. Generator
    1. 返回*遍历器对象*
25. async[ES8/ES2017]
    1. 返回 Promise _原始类型则用 Promise.resolve 包裹_
26. Class
    1. constructor: 构造方法,默认添加
    2. extends: 继承
27. Proxy

    1. 不可修改!configurable && !writable 的属性
    2. 操作

       1. get(target,propKey,receiver)
       2. set(target,propKey,value,receiver) => _return boolean_
       3. has(target,propKey) => _return boolean_ **拦截 propKey in target 操作**
       4. deleteProperty(target,propKey) => _return boolean_ **拦截 delete proxy[propKey] 操作**
       5. ownKeys(target) => _return Array_ **拦截 Object.keys | for in 等**
       6. apply(target.object,arg) **拦截 proxy(...arg) | proxy.call(object,...arg) | proxy.apply(object,arg)**
       7. construct(target,args,newTarget) **拦截 new proxy(arg)等**

          ```
          let p = new P() => newTarget = p
          ```

       8. getPrototypeOf(target) **拦截 Object.getPrototypeOf(proxy)**
       9. setPrototypeOf(target,proto) **拦截 Object.setPrototypeOf(proxy,proto)**
       10. defineProperty(target,propKey,propDesc)
       11. getOwnPropertyDescriptor
       12. isExtensible
       13. preventExtensions

    3. Proxy.revocable() 可取消操作

       ```
       let target = {},handler={};
       let {proxy, revoke} = Proxy.revocable(target, handler);
       proxy.a = 1
       revoke()
       proxy.a = 1 // 报错
       ```

    4. this
       1. 内部 this 指向 proxy
       2. 拦截函数[get/set]指向 handler
    5. Proxy 与 Object.defineProperty 区别
       1. Object.defineProperty 为 ES5 新增,Proxy 为 ES6 新增,二者兼容度不同,且 Proxy 的某些功能不可由 polyfill 后提供
       2. Object.defineProperty 可通过对原对象的更改所触发,Proxy 仅可通过对代理对象的更改所触发
       3. Object.defineProperty 仅可监听对象上的某属性,Proxy 可监听全部的引用数据类型[Object/Array/Function]
       4. Object.defineProperty 仅可监听对象的某属性上的取值和设置,Proxy 可监听除此之外的多种操作

28. Reflect

注:

1. 空位处理:
   1. ES5
      1. forEach(), filter(), reduce(), every() 和 some()都会跳过空位。
      2. map()会跳过空位，但会保留这个值
      3. join()和 toString()会将空位视为 undefined，而 undefined 和 null 会被处理成空字符串。
   2. ES6
      1. 空位转为 undefined
