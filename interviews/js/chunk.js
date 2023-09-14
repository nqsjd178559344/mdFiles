function chunk(array, count) {
  if (!Array.isArray(array) || !array.length) return array;
  let result = [];
  for (let index = 0; index < array.length; index += count) {
    const splitArray = array.slice(index, index + count);
    result.push(splitArray);
  }
  return result;
}

function chunk2(array, count) {
  if (!Array.isArray(array) || !array.length) return array;
  let result = [];
  while (array.length > 0) {
    result.push(array.splice(0, count));
  }
  return result;
}

// => [[1, 2, 3], [4, 5, 6], [7]]
const array = [1, 2, 3, 4, 5, 6, 7];
const result = chunk(array, 3);
console.log(result, "~result");

const result2 = chunk2(array, 3);
console.log(result2, "~result2");
console.log(array, "~array");
