// 给定一个整数数组，使用递归判断该数组是否按升序排列。

const arr = [1, 2, 3, 4, 5];
function isSorted(arr) {
  // 实现代码
  if (arr.length <= 1) return true;

  const first = arr.slice(0, 1);
  const second = arr.slice(1, 2);

  if (first >= second) return false;

  return isSorted(arr.slice(1)) ?? true;
}
console.log(isSorted(arr)); // 输出 true

console.log(isSorted([1, 2, 3, 4, 5, 6, 5])); // 输出 false

console.log(isSorted([1, 3, 2])); // 输出 false

console.log(isSorted([1, 2, 3])); // 输出 true
