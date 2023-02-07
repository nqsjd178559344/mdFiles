2946 ObjectEntries
3188 Tuple to Nested Object
3192 Reverse
3243 FlattenDepth
4182 Fibonacci
4425 Greater Than
5310 Join
5317 LastIndexOf
5360 Unique
8640 Number Range

### 总结

1. 生成联合类型:

```ts
object[keyof object]
需要注意never的时候写成 [T] extends [never]
```

2. 比较数值大小: 生成两个当前值长度的数组 来比较
3. 对于数组最后一项单独处理，其余项统一处理

```ts
eg: ts 实现join
<Join<['a', 'p', 'p', 'l', 'e'], '-'> =>'a-p-p-l-e'

type Join<T extends string[], U extends string | number> =
T extends [infer First extends string, ...infer Rest extends string[]]
? Rest['length'] extends 0
    ? First
    : `${First}${U}${Join<Rest, U>}`
: ''

```

4. ts 去重 [1, 1, 2, 2, 3, 3] => [1, 2, 3]

   ```ts
   不可先转为联合类型再转回数组
   ['num',1,2,3,4][number] ==> 'num' | 1 | 2 | 3 | 4
    but
   ['num',1,2,3,4,string,number][number] ==> string | number
   ```
