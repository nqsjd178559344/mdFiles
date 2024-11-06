// 给定一个数组，使用递归的方式计算数组中所有元素的和。

function sumArray(arr) {
  // 实现代码
  if (!arr.length) return 0;
  const [target = 0, ...rest] = arr;

  return target + sumArray(rest);
}
console.log(sumArray([1, 2, 3, 4, 5])); // 输出 15

console.log(sumArray([1, 2, 3])); // 输出 15
