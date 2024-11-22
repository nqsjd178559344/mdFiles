const test1 = [1, 3, [3, 5, [6, 9, [1, 0]]], 8];

function flat(array, deep = 9999) {
  if (!array.length) return [];

  let result = [];

  for (const element of array) {
    if (Array.isArray(element) && deep) {
      result = result.concat(flat(element, deep - 1));
    } else {
      result.push(element);
    }
  }

  return result;
}

console.log(flat(test1));
console.log(flat(test1, 1));
console.log(flat(test1, 999));
