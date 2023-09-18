// todo 实现一个函数用来对 URL 的 querystring 进行编码
const data = {
  a: 3,
  b: 4,
  c: 5,
};

// 对 data 编码后得到 querystring 如下
//=> 'a=3&b=4&c=5'
const res1 = stringify({
  a: 3,
  b: 4,
  c: 5,
});

console.log(res1, "~res1");

// a=3&b=4
const res2 = stringify({ a: 3, b: 4 });

console.log(res2, "~res2");

// a=3&b=
const res3 = stringify({ a: 3, b: null });

console.log(res3, "~res3");

// a=3&%E5%B1%B1=%E6%9C%88
const res4 = stringify({ a: 3, 山: "月" });

console.log(res4, "~res4");

// a=3&b=
const res5 = stringify({ a: 3, b: [1, 2, 3] });

console.log(res5, "~res5");

// a=3&b=
const res6 = stringify({
  a: 3,
  b: function () {
    return "b";
  },
});

function stringify(object) {
  let result = "";
  for (const key in object) {
    const value = object[key];
    const noValue =
      typeof value === "object" || typeof value === "function" || !value;
    const target = `&${encodeURIComponent(key)}=${
      !noValue ? encodeURIComponent(value) : ""
    }`;
    result += target;
  }
  return result.slice(1);
}
