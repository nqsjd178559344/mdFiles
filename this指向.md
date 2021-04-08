1. js 调用函数 三种方式 :
    ```
    func(1,2) ≈ window.func(window,1,2)  ≈ func(undefined,1,2) 
    obj.child.method(1,2) ≈ obj.child.method(obj.child,1,2)
    func.call(context,1,2)
    ```

2. this 指向的是 call 的第一个参数 (context)
    eg:
    ```
        1. let obj = {
                fn:function(){
                    console.log(this)
                }
            }

            obj.fn() ≈ obj.fn.call(obj)
            let fn = obj.fn
            fn() ≈ window.fn.call(window) ≈ fn.call(undefined)
    ```

    
3. 如果返回值为对象，则this指向被返回的对象;否则还是指向原对象
注: 
1. 如果 call 的参数 为 undefined / null, 则 **非严格情况下** 指向 window ; **严格情况下** 指向 undefined 
2. 箭头函数中的 this 仍然为 函数外的 this 

总结:
实际上依然为，谁调用则指向谁


