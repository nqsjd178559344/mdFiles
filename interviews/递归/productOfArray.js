// 使用递归实现一个函数，计算给定数组中所有元素的乘积。

const arr = [2, 3, 4];
function productOfArray(arr) {
  // 实现代码
  if (!arr.length) return 1;
  return arr[0] * productOfArray(arr.slice(1));
}
console.log(productOfArray(arr)); // 输出 24

console.log(productOfArray([1, 7, 5, 3])); // 输出 35*3 = 105
