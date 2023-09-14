// todo 实现一个函数 max，找到数组中最大的一个值/两个值/N 个值
const arr = [1, 2, 3, 4, 20, 20];
const arr1 = [1, 2, 3, 4, 15, 20, 5, 6, 7, 8, 9];
const arr2 = [0, -1];
const arr3 = [];

function getMax(array) {
  if (!Array.isArray(array) || !array.length) return array;
  return Math.max(...array);
}

const max = getMax(arr1);
const omitMax = arr1.filter((i) => i !== max);
const secondMax = getMax(omitMax);

// 快慢指针
function getTwoMax(array) {
  if (!Array.isArray(array) || !array.length) return array;
  let max = -Infinity,
    secondMax = -Infinity;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element > max) {
      max = element;
    } else if (element > secondMax) {
      secondMax = element;
    } else {
    }
  }

  return [max, secondMax];
}

const res = getTwoMax(arr);
const res1 = getTwoMax(arr1);
const res2 = getTwoMax(arr2);
const res3 = getTwoMax(arr3);
console.log(res, "~res", res1, "~res1", res2, "~res2", res3);
