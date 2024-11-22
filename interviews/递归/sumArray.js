// 给定一个数组，使用递归的方式计算数组中所有元素的和。

function sumArray(arr) {
  // 实现代码

  if (!arr.length) return 0;

  return arr[0] + sumArray(arr.slice(1));
}
console.log(sumArray([1, 2, 3, 4, 5])); // 输出 15

console.log(sumArray([1, 2, 3])); // 输出 6
