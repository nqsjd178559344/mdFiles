// todo 统计字符串中出现次数最多的字符及次数
function getFrequentChar1(string) {
  const obj = {};
  const array = string.split("");
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (!obj[element]) {
      obj[element] = 1;
    } else {
      obj[element] += 1;
    }
  }
  const maxSize = Math.max(...Object.values(obj));
  return Object.entries(obj).filter(([key, value]) => {
    return value === maxSize;
  })[0];
}

function getFrequentChar2(string) {
  const obj = {};
  const array = string.split("");
  let result = ["", 0];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (!obj[element]) {
      obj[element] = 1;
    } else {
      obj[element] += 1;
    }
    if (obj[element] > result[1]) {
      result = [element, obj[element]];
    }
  }

  return result;
}

//=> ['a', 6]
const r1 = getFrequentChar2("aaabbaaacc");

//=> ['d', 3]
const r2 = getFrequentChar2("ddd");

const r3 = getFrequentChar2(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
);

// console.log(r1, "~", r2, "~r3", r3);
