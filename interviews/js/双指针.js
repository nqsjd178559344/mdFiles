
const nums1 = [-1,0,1,2,-1,-4]

/**
 * 
 * @param {*} _array 
 * @returns number[][]
 * @description 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。
请你返回所有和为 0 且不重复的三元组。
注意： 答案中不可以包含重复的三元组。
示例：

js复制代码输入： nums = [-1,0,1,2,-1,-4]
输出： [[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。
 */
function findThreeNum(_array){
    const array = _array.sort((a,b)=>a-b) 
    let result = []
    for (let index = 0; index < array.length; index++) {
        const item = array[index];
        let left = index + 1
        let right = array.length - 1
        while(left !== right && left < array.length && right > 0){
        const sum = array[left] + array[right]

            if(sum > -1 * item){
                right --
            }else if(sum < -1 * item){
                left ++
            }else{
                result.push([item,array[left],array[right]])
                break
            }
        }
    }

    return result
}

// const res1 = findThreeNum(nums)

// console.log(res1,'~res1')


/**
 * 
 * @param {*} array 
 * @description 已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0,1,2,4,5,6,7] 在变化后可能得到：

若旋转 4 次，则可以得到 [4,5,6,7,0,1,2]
若旋转 7 次，则可以得到 [0,1,2,4,5,6,7]

注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。
给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。
你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

示例：
js复制代码输入： nums = [3,4,5,1,2]
输出： 1
解释： 原数组为 [1,2,3,4,5] ，旋转 3 次得到输入数组。
 */

const nums2 = [3,4,5,1,2]

const nums3 = [4,5,6,2,3]

const nums4 = [4,5,6,7,8,9]

const nums5 = [5,6,7,8,9,4]


function findMin(array){
    let left = 0
    let right = array.length - 1
    while( left !== right){

        const middle = Math.floor((left + right)/2)
        if(array[middle] < array[right]){
            right = middle
        }else if(array[middle] > array[right]){
            left = middle + 1
        }
    }
    return array[right]
}


const res2 = findMin(nums5)

console.log(res2,'~res2')