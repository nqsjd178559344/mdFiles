
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

const res1 = findThreeNum(nums)

console.log(res1,'~res1')