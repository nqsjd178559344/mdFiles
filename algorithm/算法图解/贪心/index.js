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
 */

/**
 * 第一题：找零问题（入门级）
问题：假设你是一名收银员，需要给顾客找零 amount 元。现有面额为 [1, 5, 10, 20, 50, 100] 元的纸币，请问如何使用最少的纸币张数完成找零？
 */

function fn1(totalAmount) {
  const coins = [100, 50, 20, 10, 5, 1];
  const result = [];
  let currentAmount = totalAmount;

  while (currentAmount !== 0) {
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      if (currentAmount >= coin) {
        result.push(coin);
        currentAmount -= coin;
      }
    }
  }

  return result.length;
}

// 测试
// console.log(fn1(37), 3);
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

const result = fn2(activities);
console.log(`最多能选择 ${result.length} 个活动`);
console.log("选中的活动：", result);
