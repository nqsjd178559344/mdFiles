### 好处

1. 接口可直接生成文档

### 类型释义

- declare

```
声明类型; 一处定义即可在其他地方使用, 且不校验类型[存疑];
```

- keyof

```
interface B{
    a:string;
    b:number;
    c:object
}
判断类型; A : keyof B
此时A => a|b|c

可用 a:B['a'] 来指定类型
```

![例](https://github-blog-resource.oss-cn-beijing.aliyuncs.com/keyof.png)

- extends
- 类型拓宽
- 类型缩小
- 泛型

- 工具类

1. typeof
2. keyof
3. in
4. infer???
5. extends
6. Partial<Type>
7. Required<Type>
8. Readonly<Type>
9. Record<Keys, Type>
10. Pick<Type, Keys>
11. Omit<Type, Keys>
12. Exclude<Type, ExcludedUnion>
13. Extract<Type, Union>
14. NonNullable<Type>
15. Parameters<Type>
16. ConstructorParameters<Type>
17. ReturnType<Type>
18. InstanceType<Type>
19. ThisParameterType<Type>

### 注意

1. 可推断类型不必标明
2. in interface 不可用 in???
