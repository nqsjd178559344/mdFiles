type A = "a" | "b" | "c";
type B = "a" | "c" | "d";
type C = "b" | "c" | "d";

// 前者相比于后者独有的
type E = Exclude<A, B>; // type C = "b" // A相比于B独有的
type E1 = Exclude<B, A>; // type C = "d" // B相比于A独有的
type E2 = Extract<A, B>; // type D = "a" | "c" // 共有的

type A1 = Extract<A, C>; // "b" | "c"

// Exclude<'b',E2> | Exclude<'c',E2>
type Result = Exclude<A1, E2>;

export type Equals1<T, S> = [T] extends [S]
  ? [S] extends [T]
    ? true
    : false
  : false;

type Equals1Test = Equals1<any, 1>;

// https://github.com/microsoft/TypeScript/issues/27024
export type Equals2<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;

type Equals2Test1 = Equals1<any, 1>;
type Equals2Test2 = Equals1<any, any>;
type Equals2Test3 = Equals1<never, never>;
