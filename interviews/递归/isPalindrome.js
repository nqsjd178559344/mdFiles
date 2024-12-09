function isPalindrome(str) {
  // 创建一个递归函数 isPalindrome，用来判断给定的字符串 str 是否是回文（即正着读和倒着读都一样），如果是回文返回 true，否则返回 false。例如，isPalindrome("racecar") 应该返回 true，isPalindrome("hello") 应该返回 false。
  // 在这里填写代码

  if (str.length === 1 || str.length === 0) return true;

  const first = str[0];
  const last = str[str.length - 1];
  const rest = str.slice(1, -1);

  return first === last && isPalindrome(rest);
}

console.log(isPalindrome("racecar")); // true

console.log(isPalindrome("true")); // false
