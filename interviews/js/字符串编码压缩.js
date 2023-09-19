// todo 对以下数字进行编码压缩
function encode(string, count = 0) {
  const array = string.split("");
  let resultArray = [];
  for (let index = 0; index < array.length; index++) {
    let charCount = 1;
    while (array[index] === array[index + 1]) {
      index++;
      charCount++;
    }
    resultArray.push([array[index], charCount]);
  }

  return resultArray.reduce((pre, [item, _count]) => {
    if (count >= _count) {
      pre += item.repeat(_count);
    } else {
      pre += `${item}${_count}`;
    }
    return pre;
  }, "");
}

//=> a4b3c2
const e1 = encode("aaaabbbcc");
// console.log(e1, "e1");

//=> a4b3a4
const e2 = encode("aaaabbbaaaa");

// console.log(e2, "e2");

//=> a2b2c2
const e3 = encode("aabbcc");

// console.log(e3, "e3");

//=> a1b2c3d2e
const e4 = encode("abbcccdde");

// console.log(e4, "e4");

// todo 如果只出现一次，不编码数字，如 aaab -> a3b
const e5 = encode("aaab", 1);

// console.log(e5, "e5");
// todo 如果只出现两次，不进行编码，如 abbcccddddeeeffg -> abbc3d4e3ffg
const e6 = encode("abbcccddddeeeffg", 2);

// console.log(e6, "e6");

// todo 如果进行解码，碰到数字如何处理？
function decode(string) {
  let res = "";
  const array = string.split("");
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const count = Number(element);
    if (isNaN(count)) {
      res += element;
    } else {
      //   将前一个字符重复count-1次
      res += array[index - 1].repeat(count - 1);
    }
  }

  return res;
}

const d1 = decode("abbc3d4e3ffg");
console.log(d1, "d1");

const d2 = decode("a4b3c2");
console.log(d2, "d2");

const d3 = decode("a1b2c3d2e");
console.log(d3, "d3");
