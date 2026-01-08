/**
// 结果集：存储所有符合条件的解
let result = [];

// 回溯函数：参数通常是「当前状态」「已做选择」等
function backtrack(当前状态, 已做选择) {
  // 终止条件：如果当前状态符合目标，加入结果集并返回
  if (满足终止条件) {
    result.push(已做选择的副本); // 注意：要存副本，避免后续修改影响
    return;
  }

  // 遍历所有可选选项
  for (let 选项 of 可选选项列表) {
    // 1. 做选择：将当前选项加入「已做选择」
    已做选择.push(选项);

    // 2. 递归探索：进入下一层决策树
    backtrack(新的当前状态, 已做选择);

    // 3. 撤销选择：回溯，将当前选项从「已做选择」中移除
    已做选择.pop();
  }
}

// 调用回溯函数，开始探索
backtrack(初始状态, 空的已做选择);
 */

/**
 * 例子 1：子集（简单）
问题：给定一个无重复元素的数组 nums，返回它所有可能的子集（包括空集和自身）。比如 nums = [1,2,3]，输出：[[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]。
思路分析
每个元素都有「选」或「不选」两种选择；
用回溯法遍历所有选择，收集所有可能的组合（子集）。
 */

function fn1(nums) {
  let result = [];

  function backtrack(start, path) {
    result.push([...path]);

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(0, []);

  return result;
}

console.log(fn1([1, 2, 3]), [
  [],
  [1],
  [2],
  [1, 2],
  [3],
  [1, 3],
  [2, 3],
  [1, 2, 3],
]);
