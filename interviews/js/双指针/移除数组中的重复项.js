/**
 * 移除数组中的重复项：给定一个已排序的数组，使用快慢指针原地移除重复项，使得每个元素只出现一次，并返回新的数组。
 */

let array = [1, 3, 4, 5, 5, 6, 7, 8, 9, 9, 10];

function removeRepeatingItem(arr) {
  let slow = 0;
  for (let fast = 1; fast < arr.length; fast++) {
    while (arr[slow] === arr[fast]) {
      arr.splice(fast, 1);
      break;
    }
    slow = fast;
  }

  return arr;
}

const result = removeRepeatingItem(array);
console.log(result, "result", Array.from(new Set(array)));
