1. 非严格模式下,传入的参数,实参和 arguments 的值会共享; 当没有传入时,实参与 arguments 值不会共享
2. 严格模式下,不会共享
   ```
   function foo(name, age, sex, hobbit) {
        console.log(name, arguments[0]); // name name
        // 改变形参
        name = 'new name';
        console.log(name, arguments[0]); // new name new name
        // 改变arguments
        arguments[1] = 'new age';
        console.log(age, arguments[1]); // new age new age
        // 测试未传入的是否会绑定
        console.log(sex); // undefined
        sex = 'new sex';
        console.log(sex, arguments[2]); // new sex undefined
        arguments[3] = 'new hobbit';
        console.log(hobbit, arguments[3]); // undefined new hobbit
    }

    foo('name', 'age')
   ```