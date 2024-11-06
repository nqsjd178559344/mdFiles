// 使用递归实现一个函数，计算给定正整数的阶乘。
function factorial(n) {
  // 实现代码

  if (n <= 1) return 1;

  return n * factorial(n - 1);
}
console.log(factorial(5)); // 输出 120

console.log(factorial(3)); // 输出  3 * 2 * 1 = 6
