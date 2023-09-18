// ASCII：
// 大写字母：65~90
// 小写字母：97~122
// 数字：48-57

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return Math.round(Math.random() * 10);
}
function getRandomSymbol() {
  const symbols = '~!@#$%^&*()_+{}":?><;.,';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomMap = [
  getRandomLower,
  getRandomUpper,
  getRandomNumber,
  //   getRandomSymbol,
];

function randomString(length) {
  let result = "";
  while (result.length <= length) {
    const index = Math.floor(Math.random() * length);
    const methods = randomMap[index % randomMap.length];
    result += methods();
  }

  return result;
}

// 'a839ac'
const r1 = randomString(6);

// '8abc'
const r2 = randomString(4);
