// * 编写一个正则表达式，用于匹配前面不是数字的单词。例如，对于字符串 "abc 123def xyz"，应匹配 "abc" 和 "xyz"，但不匹配 "123def"。

const reg1 = /\b(?<!\d)[a-zA-Z]+\b/g;

console.log(["abc", "xyz", "123def"].join(" ").match(reg1), "~flag1");

// * 编写一个正则表达式，用于匹配后面不是数字的单词。例s如，对于字符串 "abc 123def xyz"，应匹配 "abc" 和 "xyz"，但不匹配 "123def"。

const reg2 = /\b[a-zA-Z]+(?!\d)\b/g;

console.log(["abc", "xyz", "def123"].join(" ").match(reg2), "~flag2");

// * 编写一个正则表达式，用于匹配前面是元音字母（a, e, i, o, u）的单词。例如，对于字符串 "apple banana eat egg"，应匹配 "pple" "gg" "at"，但不匹配 "anana" 。
const reg3 = /\b(?=[aeiouAEIOU])[a-zA-Z]+\b/g;
// const reg3 = /\b(?<=[aeiouAEIOU])[a-zA-Z]+\b/g;
// const reg3 = /\b(?<=[aeiou])\w+\b/g;

console.log(["apple", "egg", "eat", "banana"].join(" ").match(reg3), "~flag3");

// * 编写一个正则表达式，用于匹配后面是元音字母（a, e, i, o, u）的单词。例如，对于字符串 "apple banana eat egg"，应匹配 "appl" "banana" "e"，但不匹配 "egg"。

const reg4 = /\w+(?=[aeiouAEIOU])/g;
console.log(["apple", "egg", "eat", "banana"].join(" ").match(reg4), "~flag4");

// * 编写一个正则表达式，用于匹配数字，但前提是这个数字前面不是字母。例如，对于字符串 "a1 2b 3c 4"，应匹配 "2" "3" "4"，但不匹配 "1"。
const reg5 = /(?<![a-zA-Z])\d/g;
console.log(["a1", "2b", "3c", "4"].join(" ").match(reg5), "~flag5");

// * 编写一个正则表达式，匹配这样的单词：该单词前面是元音字母，且单词后面跟着一个非字母数字字符。例如，对于字符串 "a boy, e girl; m cat."，应匹配 "boy" 和 "girl"，但不匹配 "cat"。

const reg6 = /(?<=[aeiouAEIOU])\s\w+(?=\W)/g;
console.log(["a boy,", "e girl;", "m cat."].join(" ").match(reg6), "~flag6");

// * 编写一个正则表达式，匹配前面不是字符串 "pre" 的单词。例如，对于字符串 "pretest other pre hello"，应匹配 "other" 和 "hello"，但不匹配 "pretest" "pre"。

const reg7 = /\b(?!pre)\w+\b/g;
console.log(
  ["pretest", "other", "pre", "hello"].join(" ").match(reg7),
  "~flag7"
);
