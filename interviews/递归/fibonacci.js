// 使用递归实现一个函数，返回斐波那契数列的第 n 项。

function fibonacci(n) {
  // 实现代码
  if (n <= 2) return 1;

  return fibonacci(n - 1) + fibonacci(n - 2);
}
// console.log(fibonacci(7)); // 输出 13
console.log(fibonacci(6)); // 输出 8
// console.log(fibonacci(5)); // 输出 5
// console.log(fibonacci(4)); // 输出 3
// console.log(fibonacci(3)); // 输出 2
// console.log(fibonacci(2)); // 输出 1
// console.log(fibonacci(1)); // 输出 1
