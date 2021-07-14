1. let / const
  1. const，let，var 的区别（简单），const 定义的对象的属性是否可以改变？（简单）
     1. const:!变量提升, 暂时性死区 ，不可修改; (const 对象时，仍可更改该对象 [地址不可变])
     2. let: !变量提升, 暂时性死区  , 其下可修改 , 同一作用域下不可重复声明
     3. var: 全局可用，均可修改，挂载到this上(默认为window)
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
      5. 