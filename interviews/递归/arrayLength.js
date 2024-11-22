// 使用递归实现一个函数，计算给定数组的长度。

const arr = [1, 2, 3, 4];
function arrayLength(arr) {
  // 实现代码
  if (!arr.length) return 0;
  return 1 + arrayLength(arr.slice(1));
}

console.log(arrayLength(arr)); // 输出 4
console.log(arrayLength([3, 12, 321, 3, 213, 21, 3, 213])); // 输出 8
