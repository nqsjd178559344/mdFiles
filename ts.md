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
3. 可以通过下标来将数组或者对象转成联合类型

   ```
       // 数组
       T[number]
       // 对象
       T[keyof T]
   ```

4. 获取 数组/元组 的 length array["length"]
5. 可赋值初始值

   ```ts
   interface Todo1 {
     title: string;
     description?: string;
     completed: boolean;
   }

   type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> & {
     readonly [key in K]: T[key];
   };

   type A = MyReadonly2<Todo1>;
   type B = MyReadonly2<Todo1, "title" | "description">;
   ```

6. 元组和数组的区别
   元组的长度是有限的，数组是无限的，也就是他们的 ['length'] 返回的结果是不同的
   元组返回的是数字
   数组返回的是 number

7. 合并 类型

```ts
/**
 * A = { a: number;} & { b: number;} & {  c: boolean;}
 * 合并: Omit<A,never> => {a: number;b: number;c: boolean;}
 */
```
