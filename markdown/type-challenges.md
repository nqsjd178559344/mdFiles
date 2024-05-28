ObjectEntries
Tuple to Nested Object
Reverse
FlattenDepth
Fibonacci
Greater Than
Join
LastIndexOf
Unique
Number Range
Permutation
InUnion
MinusOne
Tuple to Nested Object
FlattenDepth
Combination

### 总结

1. 对全排列问题有两种经典解法：

   1. // 利用辅助变量方式递归，注意联合类型与字符串、数组之间转换的技巧。
   2. // 直接递归，不借助辅助变量，一般在题目返回类型容易构造时选择。

2. 生成联合类型:

   ```ts
   object[keyof object]
   需要注意never的时候写成 [T] extends [never]
   ```

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

3. ts 去重 [1, 1, 2, 2, 3, 3] => [1, 2, 3]

   ```ts
   不可先转为联合类型再转回数组
   ['num',1,2,3,4][number] ==> 'num' | 1 | 2 | 3 | 4
    but
   ['num',1,2,3,4,string,number][number] ==> string | number
   ```

4. 1
   ```ts
   { [K in keyof T]: T[K] } 在 TS 同样适用于描述数组
   ```

### 实例

6. Equal

   ```ts
   // 方法1:any等于一切
   type Equal1<U, Y> = [U] extends [Y]
     ? [Y] extends [U]
       ? true
       : false
     : false;

   //均为true
   type a1 = Equal<any, 1> extends true ? true : false;
   type a2 = Equal<any, unknown> extends true ? true : false;
   type a21 = Equal<unknown, any> extends true ? true : false;
   type a3 = Equal<any, ""> extends true ? true : false;

   type Equal2<U, Y> = (<T>() => T extends U ? 1 : 2) extends <
     T
   >() => T extends Y ? 1 : 2
     ? true
     : false;

   //均为false
   type a12 = Equal2<1, any> extends true ? true : false;
   type a22 = Equal2<any, unknown> extends true ? true : false;
   type a212 = Equal2<unknown, any> extends true ? true : false;
   type a32 = Equal2<any, ""> extends true ? true : false;
   ```

7. Trim( extends 后面还可以跟联合类型，这样任意一个匹配都会走到 Trim<R> 递归里。)

   ```ts
   type Trim<T extends string> = T extends ` ${infer R}` | `${infer R} `
     ? Trim<R>
     : T;
   ```
