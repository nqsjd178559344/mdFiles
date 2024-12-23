// 请使用正则表达式匹配一个有效的电子邮件地址。
const reg1 = /^\w{1,}@\w{1,}\.[\w.]{1,}$/;
const flag1 = [
  "test@example.com",
  "user123@gmail.com",
  "my_name@yahoo.co.uk",
].every((item) => reg1.test(item));
const flag11 = ["test@.com", "@example.com", "test@example"].every(
  (item) => !reg1.test(item)
);
console.log(flag1 && flag11, "~flag1");

// 写一个正则表达式来匹配一个包含数字、字母和下划线，且长度在 6 到 12 个字符之间的字符串。
const reg2 = /^[0-9A-Za-z_]{6,12}$/;
const flag2 = ["abc123_", "user_456", "myStr90"].every((item) =>
  reg2.test(item)
);
const flag21 = ["a", "abc1234567", "abc-123"].every(
  (item) => !/^[0-9A-Za-z_]{6,12}$/g.test(item)
);
console.log(flag2 && flag21, "~flag2");

// 用正则表达式匹配一个以 http 或 https 开头，后面跟着 :// ，然后是任意字符，直到遇到.com 结尾的 URL 。
const reg3 = /^(https?):\/\/[^\s]+?\.com$/;
const flag3 = ["http://www.example.com", "https://test.example.com"].every(
  (item) => reg3.test(item)
);
const flag31 = ["ftp://example.com", "http://example.org"].every(
  (item) => !reg3.test(item)
);
console.log(flag3 && flag31, "~flag3");

// 写出一个正则表达式，用于匹配一个只包含大写字母的字符串。
const reg4 = /^[A-Z]{1,}$/;
const flag4 = ["ABC", "HELLO", "WORLD"].every((item) => reg4.test(item));
const flag42 = ["Abc", "hello", "123ABC"].every((item) => !reg4.test(item));
console.log(flag4 && flag42, "~flag4");

// 利用正则表达式匹配一个 11 位的中国大陆手机号码。
const reg5 = /1[3|5|6|7|8|9][0-9]{9}/;
const flag5 =
  ["13812345678", "15698765432"].every((item) => reg5.test(item)) &&
  ["1234567890", "138123456"].every((item) => !reg5.test(item));
console.log(flag5, "~flag5");

// 用正则表达式匹配一个整数（包括正整数、负整数和零）。

const reg6 = /^-?\d{1,}$/;
const flag6 =
  ["123", "-56", "0"].every((item) => reg6.test(item)) &&
  ["12.3", "abc123"].every((item) => !reg6.test(item));
console.log(flag6, "~flag6");

// 写一个正则表达式，匹配一个至少包含一个大写字母、一个小写字母和一个数字的字符串。
// const reg7 =
//   /^[A-Z]{1,}[a-z]{1,}[0-9]{1,}|[A-Z]{1,}[0-9]{1,}[a-z]{1,}|[a-z]{1,}[A-Z]{1,}[0-9]{1,}|[a-z]{1,}[0-9]{1,}[A-Z]{1,}|[0-9]{1,}[a-z]{1,}[A-Z]{1,}[0-9]{1,}[A-Z]{1,}[a-z]{1,}$/;

// const reg7 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

const reg7 = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[1-9]).+$/;
const flag7 = ["Abc123", "aB3cd", "1aZ"].every((item) => reg7.test(item));
const flag72 = ["ABC", "abc", "123"].every((item) => !reg7.test(item));
console.log(flag7 && flag72, "~flag7");

// 写一个正则表达式，匹配一个至少包含一个大写字母、一个小写字母、一个数字和一个特殊字符（如 @#$%^&* ）的字符串。

const reg8 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&*]).+$/;
const flag8 = ["Abc123@", "aB3&cd", "1*aZ"].every((item) => reg8.test(item));
const flag82 = ["A#BC", "abc", "123"].every((item) => !reg8.test(item));
console.log(flag8 && flag82, "flag8");

// 构建一个正则表达式，匹配一个字符串，要求以小写字母开头，至少包含一个大写字母、一个数字，且长度在 8 到 15 个字符之间。

// const reg9 = /^[a-z](?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{6,13}$/;
const reg9 = /^[a-z](?=.*[A-Z])(?=.*\d).{7,14}$/;
const flag9 = [
  "abcD1234",
  "pqrstU7q",
  "aBc123aBc123@",
  "aB3&cdad",
  "a1*adsjakdjasZ",
].every((item) => reg9.test(item));
const flag92 = ["A#BCA#BC", "abc", "123"].every((item) => !reg9.test(item));
console.log(flag9 && flag92, "~flag9");

// todo<无法判断相邻,所以直接判断4个相邻的数字> 用正则表达式匹配一个字符串，至少包含两组连续的数字，且每组数字的长度至少为 2 。

const reg10 = /^(?=.*\d{4}).+$/;

const flag10_1 = [
  "1234Abc@",
  "aB3476&cd67",
  "1149*aZ56",
  "123abc3456",
  "78def9012",
].every((item) => reg10.test(item));
const flag10_2 = ["12A#BC", "abc", "123", "1a2b", "12abc34"].every(
  (item) => !reg10.test(item)
);

console.log(flag10_1 && flag10_2, "~flag10_2");

// 写出一个正则表达式，匹配一个至少包含 3 个元音字母（a、e、i、o、u）的字符串。

const reg11 = /^(?=(.*[aeiou]){3,}).+$/;

const flag11_1 = ["aeiouaei", "ouaeiooo"].every((item) => reg11.test(item));
const flag11_2 = ["hello", "bcdfg"].every((item) => !reg11.test(item));

console.log(flag11_1 && flag11_2, "~flag11");

// 设计一个正则表达式，匹配一个字符串，以大写字母开头，中间包含至少一个小写字母和一个特殊字符，以数字结尾，且长度在 6 到 10 个字符之间。

const reg12 = /^[A-Z](?=.*[a-z])(?=.*[@#$%^&*]).{4,8}[0-9]$/;

const flag12_1 = ["Acd@n8", "Bfg#q9"].every((item) => reg12.test(item));
const flag12_2 = ["aBc12", "ABCDE1", "A123456"].every(
  (item) => !reg12.test(item)
);

console.log(flag12_1 && flag12_2, "~flag12");
