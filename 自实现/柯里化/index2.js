function add(a, b, c) {
  return a + b + c;
}
/**
    length是函数对象的一个属性值,指该函数有多少个必须要传入的的参数,即形参
    的个数。
    形参的数量不包括剩余参数个数,仅包括第一个具有默认值之前的参数个数。
    与之对比的是,arguments.length是函数被调用时实际传参的个数。
 */
// todo 到位数后自动调用
function currying1(fn) {
  let args = [];
  const f = function (...arg) {
    args.push(...arg);
    const flag = fn.length === args.length;
    if (flag) {
      return fn(...args);
    } else {
      return f;
    }
  };

  return f;
}

let res1 = currying1(add)(1)(2)(3);
let res2 = currying1(add)(2)(3);
let res3 = currying1(add)(233)(344);
let res4 = currying1(add)(233)(344)(555);

// console.log(res1);
// console.log(res2);
// console.log(res4);

// todo 手动调用
function currying2(fn) {
  let args = [];
  const f = function (...arg) {
    if (!arg.length) {
      return fn(...args);
    } else {
      args.push(...arg);
      return f;
    }
  };
  return f;
}
let res5 = currying2(add)(233)(344)(246)();
console.log(res5);
let res6 = currying2(add)(233)(344)(423)(234)();
console.log(res6);
