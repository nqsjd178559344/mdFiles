# Symbol
1. 引入原因:防止属性名重复
2. 使用:
   1. 基本:
   ```
   let a = Symbol()
   ```
   2. 参数为 string
   ```
   let a1 = Symbol('a1');let a2 = Symbol('a2');
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