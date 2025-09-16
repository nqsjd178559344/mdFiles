/**
 * 函数 贪心算法(问题数据):
    1. 对问题数据进行预处理（通常是排序，关键步骤！）
       - 根据问题特性选择合适的排序依据
       - 例如：活动选择问题按结束时间排序，找零问题按面额从大到小排序
    
    2. 初始化结果集合为空
       - 用于存储选中的最优解元素
    
    3. 初始化一个变量记录当前状态
       - 例如：最后选中活动的结束时间、已使用的总资源等
    
    4. 遍历所有候选元素（按预处理后的顺序）:
        a. 如果当前元素符合选择条件（能构成局部最优解）:
            i. 将该元素加入结果集合
            ii. 更新当前状态变量
    
    5. 返回结果集合

  总结：什么时候该按结束位置排序？
    当题目目标是 **“在有限资源下，选择最多不重叠的区间 / 活动”** 时，必须按 “结束位置排序”，核心逻辑是：
    “尽早释放资源，为后续创造更多可能”

    而如果题目是 “合并重叠区间”“找到区间的交集” 等，按 “起始位置排序” 更高效 —— 因为这类问题的核心是 “按顺序处理区间的重叠关系”，和 “是否尽早结束” 无关。
 */

/**
 * 第一题：找零问题（入门级）
问题：假设你是一名收银员，需要给顾客找零 amount 元。现有面额为 [1, 5, 10, 20, 50, 100] 元的纸币，请问如何使用最少的纸币张数完成找零？
 */

function fn1(totalAmount) {
  const coins = [100, 50, 20, 10, 5, 1];
  const result = [];
  let currentAmount = totalAmount;
  let currentIndex = 0;

  while (currentAmount > 0) {
    const coin = coins[currentIndex];
    if (currentAmount >= coin) {
      result.push(coin);
      currentAmount -= coin;
    } else {
      currentIndex++;
    }
  }

  return result.length;
}

// 测试
// console.log(fn1(37), 5); // 20,10,5,1,1
// console.log(fn1(100), 1);
// console.log(fn1(123), 5);

/**
 * 问题：有 n 个活动，每个活动都有一个开始时间和结束时间。如果两个活动的时间不重叠，它们可以同时进行。请问最多能选择多少个互不重叠的活动？
 */

function fn2(activities) {
  activities.sort((a, b) => a.end - b.end);

  const result = [];

  let end = -Infinity;

  for (let i = 0; i < activities.length; i++) {
    const activity = activities[i];
    if (activity.start >= end) {
      result.push(activity);
      end = activity.end;
    }
  }

  return result;
}

const activities = [
  { start: 1, end: 4 },
  { start: 3, end: 5 },
  { start: 0, end: 6 },
  { start: 5, end: 7 },
  { start: 3, end: 9 },
  { start: 5, end: 9 },
  { start: 6, end: 10 },
  { start: 8, end: 11 },
  { start: 8, end: 12 },
  { start: 2, end: 14 },
  { start: 12, end: 16 },
];

// const result = fn2(activities);
// console.log(`最多能选择 ${result.length} 个活动`);
// console.log("选中的活动：", result);

/**
 * 第三题：区间覆盖问题（进阶级）
问题：给定一个目标区间 [targetStart, targetEnd] 和一个区间集合 intervals，每个区间为 [start, end]。请从区间集合中选择最少数量的区间，使这些区间的并集能够完全覆盖目标区间。如果无法覆盖，返回 -1。
 */

function fn3(targetStart, targetEnd, intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [];
  let start = targetStart;
  let index = 0;

  while (start < targetEnd) {
    let maxEnd = start;
    let bestInterval = null;

    while (index < intervals.length && intervals[index][0] <= start) {
      if (intervals[index][1] > maxEnd) {
        maxEnd = intervals[index][1];
        bestInterval = intervals[index];
      }

      index++;
    }

    if (bestInterval === null) return -1;

    result.push(bestInterval);
    start = maxEnd;

    if (start >= targetEnd) break;
  }

  return result.length;
}

// 测试
const testCases = [
  {
    target: [1, 10],
    intervals: [
      [1, 4],
      [2, 3],
      [5, 7],
      [6, 8],
      [9, 10],
    ],
    expected: -1, // 正确结果：4~5之间存在缺口，无法覆盖
  },
  {
    target: [1, 5],
    intervals: [
      [1, 2],
      [3, 4],
    ],
    expected: -1, // 2~3之间有缺口
  },
  {
    target: [0, 5],
    intervals: [
      [0, 2],
      [1, 4],
      [3, 5],
    ],
    expected: 3,
  },
  // 新增一个可以覆盖的测试用例
  {
    target: [1, 10],
    intervals: [
      [1, 5],
      [2, 3],
      [5, 7],
      [6, 9],
      [9, 10],
    ],
    expected: 4, // 现在可以覆盖了：[1,5],[5,7], [6,9], [9,10]
  },
];

// testCases.forEach((test, i) => {
//   const result = fn3(test.target[0], test.target[1], test.intervals);
//   console.log(
//     `测试用例 ${i + 1}:`,
//     result === test.expected ? "通过" : "失败",
//     `(结果: ${result}, 预期: ${test.expected})`
//   );
// });

/**
 * 第四题：分发饼干（基础级）
问题：假设你是一位家长，有 g 个孩子和 s 块饼干。每个孩子有一个胃口值 g[i]（即每个孩子至少需要吃大小为 g[i] 的饼干才会满足），每块饼干有一个大小 s[j]。一块饼干只能分给一个孩子，且只有当饼干大小 s[j] >= g[i] 时，孩子 i 才会满足。请问最多能让多少个孩子满足？
 */

function fn4(g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);

  let cookieIndex = 0;
  let childIndex = 0;

  while (cookieIndex < s.length && childIndex < g.length) {
    if (s[cookieIndex] >= g[childIndex]) {
      childIndex++;
      cookieIndex++;
    } else {
      cookieIndex++;
    }
  }

  return childIndex;
}

// 测试用例
const testCases4 = [
  {
    g: [1, 2, 3],
    s: [1, 1],
    expected: 1, // 只有第一个孩子能被满足
  },
  {
    g: [1, 2],
    s: [1, 2, 3],
    expected: 2, // 两个孩子都能被满足
  },
  {
    g: [3, 2, 1],
    s: [1, 2, 3],
    expected: 3, // 排序后刚好一一对应满足
  },
  {
    g: [5, 4, 3],
    s: [2, 2, 2],
    expected: 0, // 没有饼干能满足任何孩子
  },
  {
    g: [5, 4, 3],
    s: [2, 2, 3],
    expected: 1,
  },
  {
    g: [2, 3],
    s: [1, 3],
    expected: 1,
  },
];

// testCases4.forEach((test, i) => {
//   const result = fn4(test.g, test.s);
//   console.log(
//     `测试用例 ${i + 1}:`,
//     result === test.expected ? "通过" : "失败",
//     `(结果: ${result}, 预期: ${test.expected})`
//   );
// });

/**
 * 第五题：无重叠区间（进阶级）
这道题是「活动选择问题」的变种，更贴近实际开发中的区间管理场景，需要你在理解贪心策略的基础上，反向思考问题。
问题描述
给定一个区间集合 intervals（每个区间为 [start, end]），请计算最少需要移除多少个区间，才能让剩下的区间互不重叠。

注意：可以认为区间的终点和起点重合时不算重叠（例如 [1,2] 和 [2,3] 不重叠）。
示例：输入 [[1,2],[2,3],[3,4],[1,3]]，输出 1（移除 [1,3] 后，剩下的 3 个区间互不重叠）。
 */

function fn5(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);

  let keepCount = 1;
  let lastEnd = intervals[0][1];
  for (let i = 1; i < intervals.length; i++) {
    const element = intervals[i];
    if (element[0] >= lastEnd) {
      keepCount++;
      lastEnd = element[1];
    }
  }

  return intervals.length - keepCount;
}

// 测试用例
const testCases5 = [
  {
    input: [
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 3],
    ],
    expected: 1, // 保留 3 个，移除 1 个
  },
  {
    input: [
      [1, 2],
      [1, 2],
      [1, 2],
    ],
    expected: 2, // 最多保留 1 个，移除 2 个
  },
  {
    input: [
      [1, 2],
      [2, 3],
    ],
    expected: 0, // 无重叠，无需移除
  },
  {
    input: [
      [1, 100],
      [11, 22],
      [1, 11],
      [2, 12],
    ],
    expected: 2, // 最多保留 2 个（[11,22] 和 [1,11] 或 [2,12]），移除 2 个
  },
];

// testCases5.forEach((test, i) => {
//   const result = fn5(test.input);
//   console.log(
//     `测试用例 ${i + 1}:`,
//     result === test.expected ? "通过" : "失败",
//     `(结果: ${result}, 预期: ${test.expected})`
//   );
// });

/**
 * 第六题：用最少的箭引爆气球（进阶应用级）
这道题是「无重叠区间」的经典变种，核心逻辑和贪心策略高度关联，但场景更具象化，能帮你理解 “如何将实际问题转化为贪心模型”。
问题描述
在二维平面上，有许多气球，每个气球用一个区间 [xstart, xend] 表示（x 轴上的投影，y 轴不影响）。现在你需要用弓箭射爆所有气球，弓箭沿 x 轴正方向发射，一旦射出，会无限沿 x 轴正方向飞行—— 也就是说，若弓箭射在 x=k 的位置，所有满足 xstart ≤ k ≤ xend 的气球都会被引爆。

请问：最少需要多少支弓箭才能引爆所有气球？

示例 1：输入 [[10,16],[2,8],[1,6],[7,12]]，输出 2（第一支箭射在 6~7 之间，爆 [2,8] 和 [1,6]；第二支箭射在 10~12 之间，爆 [10,16] 和 [7,12]）。
示例 2：输入 [[1,2],[3,4],[5,6],[7,8]]，输出 4（每个气球无重叠，需 4 支箭）。
 */

function fn6(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 1;
  let lastEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const element = intervals[i];
    if (element[0] > lastEnd) {
      count++;
      lastEnd = element[1];
    }
  }

  return count;
}

// 测试用例
const testCases6 = [
  {
    input: [
      [10, 16],
      [2, 8],
      [1, 6],
      [7, 12],
    ],
    expected: 2, // 第一支箭射在 6~7 之间，爆 [2,8] 和 [1,6]；第二支箭射在 10~12 之间，爆 [10,16] 和 [7,12]
  },
  {
    input: [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ],
    expected: 4, // 每个气球无重叠，需 4 支箭
  },
  {
    input: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
    expected: 2, // 箭射在 2 和 4，各爆 2 个气球
  },
  {
    input: [
      [1, 10],
      [2, 3],
      [4, 5],
      [6, 7],
    ],
    expected: 3, // 箭射在 3 5和 7
  },
];

// testCases6.forEach((test, i) => {
//   const result = fn6(test.input);
//   console.log(
//     `测试用例 ${i + 1}:`,
//     result === test.expected ? "通过" : "失败",
//     `(结果: ${result}, 预期: ${test.expected})`
//   );
// });

/**
 * 第七题：加油站问题（中等难度，高频面试题）
这道题是贪心算法在 “资源循环利用” 场景中的经典应用，需要结合 “局部收益” 和 “全局可行性” 的判断，比之前的区间问题更侧重 “动态决策”。
问题描述
在一条环路上有 n 个加油站，每个加油站有汽油 gas[i] 升。你有一辆油箱容量无限的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中一个加油站出发，开始时油箱为空。

请问：你能否绕环路行驶一周？如果能，返回出发时加油站的索引；如果不能，返回 -1。

说明：如果存在解，保证唯一（即只有一个加油站能作为起点）。
示例 1：
输入：gas = [1,2,3,4,5], cost = [3,4,5,1,2]
输出：3（从索引 3 出发：4→消耗 1 剩 3，+5 剩 8→消耗 2 剩 6，+1 剩 7→消耗 3 剩 4，+2 剩 6→消耗 4 剩 2，+3 剩 5，能绕一周）。
示例 2：
输入：gas = [2,3,4], cost = [3,4,3]
输出：-1（总汽油量 9 < 总消耗量 10，无法绕一周）。
 */

function fn7(gas, cost) {
  const sumGas = gas.reduce((pre, cur) => (pre += cur), 0);
  const sumCost = cost.reduce((pre, cur) => (pre += cur), 0);
  if (sumCost > sumGas) return -1;

  let start = 0;
  let current_tank = 0;

  for (let i = 0; i < gas.length; i++) {
    current_tank += gas[i] - cost[i];

    if (current_tank < 0) {
      start = i + 1;
      current_tank = 0;
    }
  }

  return start;
}

// 测试用例
const testCases7 = [
  {
    gas: [1, 2, 3, 4, 5],
    cost: [3, 4, 5, 1, 2],
    expected: 3,
  },
  {
    gas: [2, 3, 4],
    cost: [3, 4, 3],
    expected: -1,
  },
  {
    gas: [1, 2, 3, 4, 5],
    cost: [3, 4, 5, 1, 2],
    expected: 3, // 正确
  },
  {
    gas: [2, 3, 4],
    cost: [3, 4, 3],
    expected: -1, // 总汽油 9 < 总消耗 10，正确
  },
  {
    gas: [3, 1, 2, 5, 4],
    cost: [4, 2, 1, 3, 2],
    expected: 2, // 从 2 出发：2→消耗 1 剩 1，+5 剩 6→消耗 3 剩 3，+4 剩 7→消耗 2 剩 5，+3 剩 8→消耗 4 剩 4，正确
  },
  {
    gas: [5, 1, 2, 3, 4],
    cost: [4, 4, 1, 5, 1],
    expected: 4, // 从 4 出发：4→消耗 1 剩 3，+5 剩 8→消耗 4 剩 4，+1 剩 5→消耗 4 剩 1，+2 剩 3→消耗 1 剩 2，+3 剩 5→消耗 5 剩 0，正确
  },
];

// testCases7.forEach((test, i) => {
//   const result = fn7(test.gas, test.cost);
//   console.log(
//     `测试用例 ${i + 1}:`,
//     result === test.expected ? "通过" : "失败",
//     `(结果: ${result}, 预期: ${test.expected})`
//   );
// });

/**
 * 第八题：买卖股票的最佳时机 II（中等难度，贪心经典应用）
这道题是贪心算法在 “利益最大化” 场景中的典型应用，核心是 “抓住每一次微小的上涨利润”，逻辑直观但需要理解 “为什么局部利润之和等于全局最大利润”。
问题描述
给定一个数组 prices，其中 prices[i] 表示某支股票第 i 天的价格。你可以无限次地完成交易（多次买卖一支股票），但有一个限制：你必须在卖出股票后，才能再次买入股票（即不能同时持有多支股票）。

请计算你能获得的最大利润。如果不能获得任何利润，返回 0。

示例 1：
输入：prices = [7,1,5,3,6,4]
输出：7（第 2 天买→第 3 天卖，赚 4；第 4 天买→第 5 天卖，赚 3，总利润 4+3=7）。
示例 2：
输入：prices = [1,2,3,4,5]
输出：4（每天都持有，第 1 天买→第 5 天卖，利润 4；或拆分成每天买卖，利润 1+1+1+1=4，结果一致）。
示例 3：
输入：prices = [7,6,4,3,1]
输出：0（价格一直下跌，不进行任何交易）。
 */

function fn8(prices) {
  let sum = 0;

  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff >= 0) {
      sum += diff;
    }
  }

  return sum;
}

// 测试用例
const testCases8 = [
  {
    prices: [7, 1, 5, 3, 6, 4],
    expected: 7,
  },
  {
    prices: [1, 2, 3, 4, 5],
    expected: 4,
  },
  {
    prices: [7, 6, 4, 3, 1],
    expected: 0,
  },
];

testCases8.forEach((test, i) => {
  const result = fn8(test.prices);
  console.log(
    `测试用例 ${i + 1}:`,
    result === test.expected ? "通过" : "失败",
    `(结果: ${result}, 预期: ${test.expected})`
  );
});
