// 给定一个数组，使用递归的方式找出数组中的最大元素。

const arr = [5, 8, 3, 10, 6];
function findMax(arr) {
  // 实现代码

  if (!arr.length) return 0;

  const restResult = findMax(arr.slice(1));

  return arr[0] > restResult ? arr[0] : restResult;
}
console.log(findMax(arr)); // 输出 10

console.log(findMax([5, 12, , 8, 3, 10, 6, 9, ,])); // 输出 12
