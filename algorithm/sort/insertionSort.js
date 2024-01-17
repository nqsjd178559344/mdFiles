let array = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];

function insertionSort(arr) {
    let current, preIndex;
    for (let index = 1; index < arr.length; index++) {
        current = arr[index]
        preIndex = index - 1
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex]
            preIndex--
        }
        arr[preIndex + 1] = current
    }

    return arr
}

console.log(insertionSort(array))