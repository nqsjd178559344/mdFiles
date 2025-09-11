/**
 * ! 动态规划通用框架
function solve(问题输入):
    1. 确定问题目标：明确要求解的结果（如最值、数量、是否存在等）
    
    2. 定义dp状态：
        dp[状态变量] = 子问题的解
        （状态变量根据问题维度确定，可能是1维、2维甚至更高，需覆盖子问题）
    
    3. 初始化dp数组：
        根据边界条件，设置基础子问题的解（如dp[0]、dp[0][0]等）
        （通常需要设置初始值，如0、Infinity、-Infinity等，取决于问题）
    
    4. 填充dp数组（核心）：
        for 遍历所有可能的状态:
            for 遍历相关的子状态:
                dp[当前状态] = 基于子状态的计算结果（转移方程）
    
    5. 返回最终结果：
        return dp[目标状态]
 */

/**
 * 第一题：求三角形最小路径和（基础二维 DP）
问题描述：给定一个三角形 triangle（数组的数组，如 [[2],[3,4],[6,5,7],[4,1,8,3]]），找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的节点上（例如从第 i 行的第 j 个元素，只能到第 i+1 行的第 j 或 j+1 个元素）。

提示：

状态定义：可以用 dp[i][j] 表示到达第 i 行第 j 列的最小路径和
转移方程：dp[i][j] 只能从上方的 dp[i-1][j-1] 或 dp[i-1][j] 过来（注意边界情况：第一列只能从上方正对着的元素过来，最后一列只能从上方前一个元素过来）
初始条件：dp[0][0] = triangle[0][0]（顶点）
 */

function minimumTotal(triangle) {
  if (!triangle.length) return 0;
  const rows = triangle.length;

  const dp = triangle;

  for (let i = 1; i < rows; i++) {
    for (let j = 0; j < dp[i].length; j++) {
      if (j === 0) {
        dp[i][j] += dp[i - 1][j];
      } else if (j === dp[i].length - 1) {
        dp[i][j] += dp[i - 1][j - 1];
      } else {
        dp[i][j] += Math.max(dp[i - 1][j], dp[i - 1][j - 1]);
      }
    }
  }

  return Math.min(...dp[rows - 1]);
}

// console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]), 12);
// console.log(minimumTotal([[5]]), 5);
// console.log(minimumTotal([[1], [2, 3]]), 3);

/**
 * 第二题：不同路径（组合计数类 DP）
问题描述：一个机器人位于 m x n 网格的左上角（起始点 (0,0)），机器人每次只能向下或向右移动一步，问到达右下角 ( m-1, n-1 ) 有多少种不同的路径？

提示：

状态定义：dp[i][j] 表示到达 (i,j) 的路径总数
转移方程：到达 (i,j) 只能从上方 (i-1,j) 或左方 (i,j-1) 来，因此路径数是两者之和
初始条件：第一行（i=0）只能从左边过来，所以 dp[0][j] = 1；第一列（j=0）只能从上面过来，所以 dp[i][0] = 1
 */

function fn2(m, n) {
  // 初始化二维数组，m行n列
  const dp = new Array(m);
  for (let i = 0; i < m; i++) {
    dp[i] = new Array(n); // 为每行创建子数组
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0) {
        dp[0][j] = 1;
      } else if (j === 0) {
        dp[i][0] = 1;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }

  return dp[m - 1][n - 1];
}

// console.log(fn2(3, 7), 28);
// console.log(fn2(1, 5), 1);
// console.log(fn2(3, 2), 3);

/**
 * 第三题：零钱兑换（完全背包入门）
问题描述：给定不同面额的硬币 coins 和一个总金额 amount，计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 - 1。（假设每种硬币的数量是无限的）

提示：

状态定义：dp[i] 表示凑成金额 i 所需的最少硬币数
转移方程：对于每个金额 i，尝试用每种硬币（如果硬币面额≤i），则 dp[i] = min(dp[i], dp[i - coin] + 1)（用了一枚该硬币）
初始条件：dp[0] = 0（金额 0 不需要硬币），其他初始化为一个很大的数（表示无法凑成）
 */

function fn3(coins, amount) {
  if (amount === 0) return 0;
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

// console.log(fn3([1, 2, 5], 11), 3);
// console.log(fn3([2], 3), -1);
// console.log(fn3([1, 3, 4], 0), 0);

/**
 * 第四题：最长回文子序列（字符串 DP）
问题描述：给定一个字符串 s，找到其中最长的回文子序列的长度。回文子序列是指不要求连续，但顺序一致的回文序列（例如 "bbbab" 的最长回文子序列是 "bbbb"，长度 4）。

提示：

状态定义：dp[i][j] 表示字符串 s 中从索引 i 到 j（闭区间）的最长回文子序列长度
转移方程：
如果 s[i] === s[j]，则 dp[i][j] = dp[i+1][j-1] + 2（两头各加一个字符）
否则，dp[i][j] = max(dp[i+1][j], dp[i][j-1])（取去掉左或右字符后的最大值）
初始条件：单个字符的回文子序列长度是 1（dp[i][i] = 1），空字符串长度是 0
 */

// function fn4(str) {
//     const result = 0
//     const dp = []
//     for (let i = 0; i < str.length; i++) {
//        for (let j = i+1; j < str.length; j++) {
//         if(str[i] === str[j]){
//             dp[i][j] = dp[i+1][j-1] + 2
//         }else{
//             dp[i][j]
//         }

//        }

//     }
// }

// console.log(fn4("bbbab"), 4);
// console.log(fn4("abcba"), 5);
// console.log(fn4("abcd"), 1);

/**
 * 第五题：分割等和子集（0-1 背包变体）
问题描述：给定一个只包含正整数的非空数组 nums，判断该数组是否可以分割成两个子集，使得两个子集的元素和相等。（例如 [1,5,11,5] 可以分割成 [1,5,5] 和 [11]，和都是 11）

提示：

先计算数组总和，如果总和是奇数，直接返回 false（无法平分）
目标转化为：是否存在子集的和等于总和的一半（设为 target）
状态定义：dp[i] 表示能否凑出和为 i 的子集
转移方程：对于每个数字 num，从 target 往 num 倒序遍历，dp[i] = dp[i] || dp[i - num]（如果之前能凑出 i-num，加上 num 就能凑出 i）

 */

function fn5(nums) {
  const totalSum = nums.reduce((pre, cur) => (pre += cur), 0);
  if (totalSum % 2) return false;
  const dp = new Array(totalSum + 1).fill(false);
  dp[0] = true;

  const target = totalSum / 2;

  for (const num of nums) {
    for (let i = target; i >= num; i--) {
      dp[i] = dp[i] || dp[i - num];
    }
  }

  return dp[target];
}

// console.log(fn5([1, 5, 11, 5]), true);
// console.log(fn5([1, 2, 3, 4, 5]), false);
// console.log(fn5([1]), false);

/**
 * 第六题：最大子数组和（一维 DP 基础）
问题描述：给定一个整数数组 nums，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
示例：输入 [-2,1,-3,4,-1,2,1,-5,4]，输出 6（子数组 [4,-1,2,1] 的和为 6）。
 */

function fn6(nums) {
  if (!nums.length) return 0;
  const dp = new Array(nums.length);
  dp[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
  }

  return Math.max(...dp);
}

console.log(fn6([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
