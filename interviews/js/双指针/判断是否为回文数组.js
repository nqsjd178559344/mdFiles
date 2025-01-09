let array = [1, 3, 5, 7, 5, 3, 1];
let array2 = [1, 3, 5, 7, 5, 3, 9];

function isPalindrome(arr) {
  let slow = 0,
    fast = arr.length - 1;
  while (fast !== slow && arr[fast] === arr[slow]) {
    fast--;
    slow++;
  }

  if (fast === slow) return true;

  return false;
}

const result = isPalindrome(array);
const result2 = isPalindrome(array2);

console.log(result, result2);
