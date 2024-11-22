// 使用递归实现一个函数，将给定的字符串反转。

function reverseString(str) {
  // 实现代码
  // todo 只

  if (!str) return "";

  return reverseString(str.slice(1)) + str[0];
}
console.log(reverseString("hello")); // 输出 'olleh'
