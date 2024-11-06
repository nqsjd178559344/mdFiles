// 使用递归实现一个函数，将给定的字符串反转。

function reverseString(str) {
  // 实现代码
  if (!str) return "";
  const first = str[0];
  const rest = str.slice(1);

  return reverseString(rest) + first;
}
console.log(reverseString("hello")); // 输出 'olleh'
