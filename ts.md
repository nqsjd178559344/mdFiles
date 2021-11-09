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
```

![例](https://github-blog-resource.oss-cn-beijing.aliyuncs.com/keyof.png)

- extends
- 泛型

- Utility Types

1. Partial<Type>
2. Required<Type>
3. Readonly<Type>
4. Record<Keys, Type>
5. Pick<Type, Keys>
6. Omit<Type, Keys>
7. Exclude<Type, ExcludedUnion>
8. Extract<Type, Union>
9. NonNullable<Type>
10. Parameters<Type>

### 注意

1. 可推断类型不必标明
