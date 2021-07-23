使用:
    a.call(context,params1,params2,params3)
    a.apply(context,[params1,params2,params3])
    let b = a.bind(context,params1,params2,params3)
    b()

    即:
        call、apply 直接调用
        bind 返回个[原函数绑好this的新函数]等待调用