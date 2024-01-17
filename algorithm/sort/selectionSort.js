let array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];

function swap(arr, left, right) {
    const temp = arr[left]
    arr[left] = arr[right]
    arr[right] = temp
}

// 未排序序列中找到最小元素，存放到排序序列的起始位置
function findMinIndex(arr, startIndex) {
    let minIndex = startIndex
    for (let index = startIndex + 1; index < arr.length; index++) {
        if (arr[minIndex] > arr[index]) {
            minIndex = index
        }

    }

    return minIndex
}

function selectionSort(arr) {
    for (let index = 0; index < arr.length - 1; index++) {
        const minIndex = findMinIndex(arr, index)
        swap(arr, index, minIndex)

    }

    return arr
}

console.log(selectionSort(array))