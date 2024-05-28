# Symbol
1. 引入原因:防止属性名重复
2. 使用:
   1. 基本:
   ```
   let a = Symbol()
   ```
   2. 参数为 string
   ```
   let a1 = Symbol('a1');
   let a2 = Symbol('a2');
   ```
   1. 参数为 object
   ```
    const obj = {
        toString() {
            return 'abc';
        }
    };
    const sym = Symbol(obj); //Symbol(abc)
   ```
3. 注意:
   1. 相同参数的Symbol函数的返回值不相等
   2. Symbol 值不能与其他类型的值进行运算,且不能转为数值
   3. Symbol 值可以转为字符串或布尔值
   ```
   let sym = Symbol('My symbol');
    String(sym) // 'Symbol(My symbol)'
    sym.toString() // 'Symbol(My symbol)'
   ```
4. Symbol.prototype.description
   ```
    const sym = Symbol('foo');
    sym.description // "foo"
   ```
5. 

6. 方法:
   1. Symbol.for()
   2. Symfol.keyFor()

7. 总结
   1. 表示**独一无二**的值，用于定义对象的唯一属性名
        ==注 :同样参数的Symbol.for 出来的值相等,剩下的Symbol和任何值都不等==
    1. Symbol.for: 类例单例模式,首先会在全局搜索被登记的 Symbol 中是否有该字符串参数作为名称的 Symbol 值，如果有即返回该 Symbol 值，若没有则新建并返回一个以该字符串参数为名称的 Symbol 值，并登记在全局环境中供搜索。
    2. Symbol.keyfor: 返回一个已登记的 Symbol 类型值的 key ，用来检测该字符串参数作为名称的 Symbol 值是否已被登记。