let array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];

function swap(arr, left, right) {
    const temp = arr[left]
    arr[left] = arr[right]
    arr[right] = temp
}

// 只排序一次
function sortMin(arr, endIndex) {
    for (let index = 0; index < endIndex; index++) {
        if (arr[index] > arr[index + 1]) {
            swap(arr, index, index + 1)
        }

    }

    return arr
}

function bubbleSort(arr) {
    let length = arr.length
    for (let index = 0; index < length; index++) {
        sortMin(arr, length - index)
    }

    return arr

}

console.log(bubbleSort(array))