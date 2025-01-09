/**
 * 给定一个整数数组nums和一个整数target，使用快慢指针找到一个连续的子数组，使得子数组元素之和等于target，返回该子数组的起始和结束索引（如果有多个，返回任意一个）。如果不存在这样的子数组，返回[-1, -1]。
 */

function findSubarrayWithSum(arr, target) {
  let slow = 0,
    fast = 1,
    sum = arr[slow];
  while (slow < arr.length) {
    if (sum === target) return [slow, fast - 1];

    if (sum < target) {
      sum += arr[fast];
      fast++;
    } else {
      slow++;
      fast = slow + 1;
      sum = arr[slow];
    }
  }
  return [-1, -1];
}

let array = [1, 3, 4, 5, 5, 6, 7, 8, 9, 9, 10];

const result = findSubarrayWithSum(array, 9);
console.log(result, "result"); // [2,3];

const result2 = findSubarrayWithSum(array, 7);
console.log(result2, "result"); // [1,2];
