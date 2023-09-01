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
