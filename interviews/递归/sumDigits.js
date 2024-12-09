function sumDigits(num) {
  // 编写一个递归函数 sumDigits，它接收一个正整数 num，返回这个数字各位数之和。例如，sumDigits(123) 应该返回 6（因为 1 + 2 + 3 = 6）。
  const rest = Math.floor(num / 10);
  if (rest === 0) return num;
  const last = num % 10;
  return last + sumDigits(rest);
}

console.log(sumDigits(123));

console.log(sumDigits(123456));
