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
          1.  replaceAll:一键替换所有
          2.  replace(regexp|subStr, newSubStr|function): 默认只替换第一个