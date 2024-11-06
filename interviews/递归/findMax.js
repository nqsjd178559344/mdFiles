// 给定一个数组，使用递归的方式找出数组中的最大元素。

const arr = [5, 8, 3, 10, 6];
function findMax(arr) {
  // 实现代码

  const defaultMin = -Infinity;

  if (arr.length === 1) return arr[0] ?? defaultMin;

  const [first = defaultMin, ...rest] = arr;

  let restMax = findMax(rest);

  return first > restMax ? first : restMax;
}
console.log(findMax(arr)); // 输出 10

console.log(findMax([5, 12, , 8, 3, 10, 6, 9, ,])); // 输出 12
