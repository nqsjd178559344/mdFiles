// 使用递归实现一个函数，计算给定数组的长度。

const arr = [1, 2, 3, 4];
function arrayLength(arr, length = 0) {
  // 实现代码
  if (!arr.length) return length;

  return arrayLength(arr.slice(1), length + 1);
}
console.log(arrayLength(arr)); // 输出 4

function arrayLength2(arr) {
  // 实现代码
  if (!arr.length) return 0;

  return 1 + arrayLength(arr.slice(1));
}

console.log(arrayLength2(arr)); // 输出 4
