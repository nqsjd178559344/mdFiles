// todo 任何求两数之和的计算都可以转化为两数之差
function twoSum(array, sum) {
  const map = new Map();
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (map.has(sum - element)) return [element, sum - element];

    map.set(element, 1);
  }

  return null;
}

// todo 进阶版
function findAllTwoSum(array, sum) {
  let result = [];
  const map = new Map();
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (map.has(sum - element)) {
      result.push([element, sum - element]);
    }

    map.set(element, 1);
  }

  return result;
}

//=> [5, 10]
const res1 = findAllTwoSum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 15);
console.log(res1, "~res1");

//=> null
const res2 = findAllTwoSum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 150);
console.log(res2, "~res2");
