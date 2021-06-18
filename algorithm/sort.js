// ? 1. 冒泡排序 √
let array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
function sort1(arr) {
  let length = arr.length; // 4
  for (let i = 0; i < length - 1; i++) { // i < 4
    for (let j = 0; j < length - 1 - i; j++) { // 3-i
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}

// ? 选择排序 √
// let arr = [3, 44, 38, 5, 47, 15, 36, middleItem = 26, 27, 2, 46, 4, 19, 50, 48];
function sort2(arr) {
  let length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }

    let temp = arr[minIndex];
    arr[minIndex] = arr[i]
    arr[i] = temp
  }
  return arr
}

// ? 快排 √
// let arr = [3, 44, 38, 5, 47, 15, 36, middleItem = 26, 27, 2, 46, 4, 19, 50, 48];
function sort3(arr) {
  if (arr.length <= 1) { return arr } // ???
  let middleIndex = Math.floor(arr.length / 2)
  let middleItem = arr.splice(middleIndex, 1)[0]
  let left = [], right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > middleItem) {
      right.push(arr[i])
    } else if (arr[i] < middleItem) {
      left.push(arr[i])
    }
  }

  let res = sort3(left).concat([middleItem], sort3(right))
  return res
}

// ? 插入排序 √
// let arr = [3, 44, 38, 5, 47, 15, 36, middleItem = 26, 27, 2, 46, 4, 19, 50, 48];
function sort4(arr) {
  let length = arr.length
  for (let i = 1; i < length; i++) {
    let preIndex = i - 1;
    let current = arr[i]
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  return arr
}

// ? 希尔排序

// ? 归并排序(分成两数组，分别调用归并，最后合起)
function sort5(arr) {
  let len = arr.length
  if (len < 2) return arr
  // let result = [],leftIndex = 0,rightIndex = 0;
  let middle = Math.floor(len / 2), left = arr.slice(0, middle), right = arr.slice(middle)

  return merge(sort5(left), sort5(right))
}

function merge(left, right) {
  console.log(left, '~~~~~~merge~~~~', right)
  let result = []
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while (left.length) {
    result.push(left.shift())
  }

  while (right.length) {
    result.push(right.shift())
  }

  console.log(result, 'result')

  return result
}

// ? 堆排

console.log(array, '~~~~~~~~~~')
// const res1 = sort1(array)
// const res2 = sort2(array)
// const res3 = sort3(array)
// const res4 = sort4(array)
const res5 = sort5(array)


// ! 冒泡√ | 快排√ | 选择排序√ | 堆排序 | 希尔排序 | 插排√ 

// 计数排序 | 桶排序 | 基数排序 
// console.log(res1, 'res1')
// console.log(res2, 'res2')
// console.log(res3, 'res3')
// console.log(res4, 'res4')
console.log(res5, 'res5')
