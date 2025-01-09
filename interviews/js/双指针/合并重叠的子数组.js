/**
 * 合并重叠的子数组，有一个数组包含多个子数组，每个子数组都由不同的时间段[starti,endi]组成，要求合并所有重叠的时间段，返回一个新的二维数组。
输入intervals：一个二维数组，其中每个元素也是一个数组 [start, end] 表示一个时间段，start 和 end 均为整数，且满足 start <= end。
例输入： [[1, 3], [2, 6], [8, 10], [15, 18]];
输出：返回一个二维数组，包含合并后的所有不重叠的时间段。
输出：[[1, 6], [8, 10], [15, 18]]
 */

function mergeArray(arr) {
  let result = [];
  let slow = 0;
  for (let fast = 0; fast < arr.length; fast++) {
    const item = arr[fast],
      next = arr[fast + 1];
    while (next && item[1] >= next[0]) {
      fast++;
      break;
    }
    const value = [arr[slow][0], arr[fast][1]];
    result.push(value);
    slow = fast + 1;
  }

  return result;
}

const result = mergeArray([
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
]); // [[1, 6], [8, 10], [15, 18]]

console.log(result, "~result");

const result2 = mergeArray([
  [1, 3],
  [2, 6],
  [8, 10],
  [9, 18],
]); // [[1, 6], [8, 18]]

console.log(result2, "~result2");

const result3 = mergeArray([
  [1, 3],
  [2, 6],
  [8, 8],
  [10, 18],
]); // [[1, 6], [8, 8], [10, 18]]

console.log(result3, "~result3");
