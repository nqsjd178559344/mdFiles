const test1 = [1, 3, [3, 5, [6, 9, [1, 0]]], 8];

function flatDeep(array) {
  let result = [];
  for (const element of array) {
    if (Array.isArray(element)) {
      result.push(...flatDeep(element));
    } else {
      result.push(element);
    }
  }

  return result;
}

console.log(flatDeep(test1));

function flat(array, deep = 1) {
  let result = [];
  for (const element of array) {
    if (deep !== 0 && Array.isArray(element)) {
      result.push(...flat(element, deep - 1));
    } else {
      result.push(element);
    }
  }

  return result;
}

console.log(flat(test1));
console.log(flat(test1, 1));
console.log(flat(test1, 999));
