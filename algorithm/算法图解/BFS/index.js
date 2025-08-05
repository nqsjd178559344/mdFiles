/**
 * 第一题：二叉树的层序遍历（BFS 入门）
题目：给你一棵二叉树的根节点，返回其节点值的层序遍历结果（即逐层地，从左到右访问所有节点）。
示例：
输入二叉树：

plaintext
    3
   / \
  9  20
    /  \
   15   7


输出：[[3], [9,20], [15,7]]

提示：

BFS 的典型应用，用队列存储每一层的节点。
步骤：初始化队列放入根节点 → 每次遍历当前队列中所有节点（即当前层）→ 收集它们的值，再把它们的子节点加入队列 → 重复直到队列为空。
 */

const graph = {
  3: [9, 20],
  20: [15, 7],
};

function bfs(graph, rootVal = 3) {
  const queue = [];
  const result = [];
  queue.push(rootVal);
  while (queue.length) {
    const size = queue.length;
    const currentLevel = [];
    for (let index = 0; index < size; index++) {
      const last = queue.shift();
      currentLevel.push(last);
      if (graph[last]) {
        for (const element of graph[last]) {
          queue.push(element);
        }
      }
    }
    result.push(currentLevel);
  }

  return result;
}

// console.log(bfs(graph), "bfs");

/**
 * 第二题：二叉树的最大深度（DFS 入门）
题目：给定一棵二叉树，找出其最大深度。最大深度是从根节点到最远叶子节点的最长路径上的节点数量。
示例：上面的二叉树，最大深度是 3（3→20→7 或 3→20→15）。

提示：

DFS 递归写法超简单：树的最大深度 = 1 + max (左子树深度，右子树深度)。
终止条件：空节点的深度为 0。
 */
function dfs(root, nodeVal) {
  if (!root[nodeVal]) return 1;
  let maxLength = 0;
  for (const neighbor of root[nodeVal]) {
    const neighborMaxLength = dfs(root, neighbor);
    if (neighborMaxLength > maxLength) maxLength = neighborMaxLength;
  }

  return 1 + maxLength;
}

// const bfsResult = bfs(graph, 3);
// console.log(bfsResult, "bfsResult");

// const dfsResult = dfs(graph, 3);
// console.log(dfsResult, "dfsResult");

/**
 * 第三题：二叉树的前序遍历（DFS）
题目：给定一棵二叉树的根节点，返回其节点值的前序遍历结果（遍历顺序：根节点 → 左子树 → 右子树）。
示例：
输入二叉树（和之前相同）：

plaintext
    3
   / \
  9  20
    /  \
   15   7


输出：[3,9,20,15,7]

提示：

用 DFS 递归：先访问当前节点，再递归遍历左子树，最后递归遍历右子树。
终止条件：遇到空节点，返回空数组。
 */

// function dfs1(graph) {
//   const result = [];

//   function dfsInternal(nodeVal) {
//     result.push(nodeVal);
//     if (graph[nodeVal])
//       for (const neighbor of graph[nodeVal]) {
//         dfsInternal(neighbor);
//       }
//   }

//   dfsInternal(3);

//   return result;
// }

// console.log(dfs1(graph, "dfs1"));

// function bfs1(root, nodeVal) {
//   const result = [];
//   const queue = [nodeVal];
//   while (queue.length) {
//     const size = queue.length;
//     for (let index = 0; index < size; index++) {
//       const current = queue.shift();
//       result.push(current);
//       if (root[current])
//         for (const neighbor of root[current]) {
//           queue.push(neighbor);
//         }
//     }
//   }

//   return result;
// }

// const bfs1Result = bfs1(graph, 3);
// console.log(bfs1Result, "bfs1Result");

// function dfs1(root, nodeVal) {
//   const result = [];
//   function dfsInternal(nodeVal) {
//     result.push(nodeVal);
//     if (root[nodeVal])
//       for (const neighbor of root[nodeVal]) {
//         dfsInternal(neighbor);
//       }
//   }
//   dfsInternal(nodeVal);
//   return result;
// }

// const dfs1Result = dfs1(graph, 3);
// console.log(dfs1Result, "dfs1Result");

/**
 * 第四题：找数组中的目标值（BFS 思想）
题目：给定一个一维数组 nums 和目标值 target，从数组头部开始，依次检查每个元素是否等于 target，找到后返回索引（如果有多个，返回第一个）；找不到返回 - 1。
示例：
输入：nums = [5,3,8,1,3,7]，target = 3 → 输出：1（第一个 3 的索引）。

提示：

这题本质是 “线性查找”，但思路和 BFS 类似：按顺序（从左到右）依次检查每个元素（类似按层访问），找到目标就停止。
不需要队列，直接用 for 循环遍历即可，体会 “按顺序逐个检查” 的 BFS 思想。
 */

function bfs2(nums, target, index = 0) {
  if (!nums.length) return -1;

  const [first, ...rest] = nums;

  if (first === target) return index;

  return bfs2(rest, target, index + 1);
}

// console.log(bfs2([5, 3, 8, 1, 3, 7], 3), "bfs2Result");
// console.log(bfs2([5, 3, 8, 1, 3, 7], 1), "bfs2Result");

// function bfs2(nums, target, index = 0) {
//   const first = nums[0];
//   if (first === target) return index;

//   return bfs2(nums.slice(1), target, index + 1);
// }

// console.log(bfs2([5, 3, 8, 1, 3, 7], 3), "bfs2Result");
// console.log(bfs2([5, 3, 8, 1, 3, 7], 1), "bfs2Result");

/**
 * 第五题：判断是否为平衡二叉树（DFS）
题目：平衡二叉树是指左右两个子树的高度差的绝对值不超过 1，且左右两个子树都是平衡二叉树。给定一棵二叉树的根节点，判断它是否是平衡二叉树。
示例：
输入之前的二叉树（3 为根）→ 是平衡二叉树（左子树深度 1，右子树深度 2，差 1）；
如果给 20 再加一个右子节点 8，那么右子树深度 3，左子树深度 1，差 2 → 不是平衡二叉树。

提示：

用 DFS 递归：计算每个节点的左右子树深度，同时检查深度差是否≤1。
可以在计算深度的同时做判断，一旦发现不平衡就直接返回 false。
 */

const graph2 = {
  3: [9, 20],
  20: [15, 7],
  7: [null, 8],
};

// function dfs2(graph, rootVal = 3) {
//   function getDepth(current) {
//     if (current === null) return 0;
//     const currentGraph = graph[current] ?? [null, null];
//     const leftDepth = getDepth(currentGraph[0]);
//     const rightDepth = getDepth(currentGraph[1]);
//     if (leftDepth === -1) return -1;
//     if (rightDepth === -1) return -1;

//     if (Math.abs(leftDepth - rightDepth) > 1) return -1;

//     return 1 + Math.max(leftDepth, rightDepth);
//   }

//   return getDepth(rootVal) !== -1;
// }

// console.log(dfs2(graph), "dfs2_graph");
// console.log(dfs2(graph2), "dfs2_graph2");

/**
 * 新题 1：二叉树的中序遍历（DFS）
题目：给定邻接表表示的二叉树，返回中序遍历结果（顺序：左子树 → 根节点 → 右子树）。
示例：
graph = { 3: [9, 20], 20: [15, 7] }
输出：[9, 3, 15, 20, 7]

提示：
递归思路：先遍历左子 → 访问当前节点 → 再遍历右子。
 */

function dfs3(graph, root = 3) {
  let result = [];

  function dfs3Internal(current) {
    if (current === null) return;
    const left = graph[current]?.[0] || null;
    const right = graph[current]?.[1] || null;
    dfs3Internal(left);
    result.push(current);
    dfs3Internal(right);
  }

  dfs3Internal(root);

  return result;
}

// console.log(dfs3(graph), "dfs3_graph"); // [9,3,15,20,7];
// console.log(dfs3(graph2), "dfs3_graph2");

/**
 * 基于中序遍历逻辑，遍历邻接表 graph = {6: [2,8], 2: [1,4], 8: [7,9]}，统计并返回所有偶数节点的值（预期结果 [2,4,6,8]）。
 */

const graph3 = { 6: [2, 8], 2: [1, 4], 8: [7, 9] };

function dfs4(graph) {
  let result = [];
  function dfs4Internal(graph, root) {
    if (root === null) return;

    let left = graph[root]?.[0] ?? null;
    let right = graph[root]?.[1] ?? null;
    dfs4Internal(graph, left);
    if (root % 2 === 0) result.push(root);
    dfs4Internal(graph, right);
  }
  dfs4Internal(graph, 6);
  return result;
}
// console.log(dfs4(graph3), "dfs4_graph3");

/**
 * 新题 2：统计二叉树的节点总数（DFS/BFS）
题目：给定邻接表表示的二叉树，计算总共有多少个节点。
示例：
graph = { 3: [9, 20], 20: [15, 7] } → 节点有 3、9、20、15、7 → 输出 5。

提示：

DFS：节点总数 = 1（当前节点） + 左子树节点数 + 右子树节点数
BFS：用队列遍历所有节点，计数即可。
 */

function dfs5(graph) {
  function dfs5Internal(graph, root) {
    if (root === null) return 0;
    const left = graph[root]?.[0] ?? null;
    const right = graph[root]?.[1] ?? null;
    return 1 + dfs5Internal(graph, left) + dfs5Internal(graph, right);
  }
  return dfs5Internal(graph, 3);
}

// console.log(dfs5(graph), "dfs5_graph");
// console.log(dfs5(graph2), "dfs5_graph2");

// function bfs3(graph) {
//   function bfs3Internal(root) {
//     const queue = [];
//     let count = 0;
//     queue.push(root);
//     while (queue.length) {
//       for (let index = 0; index < queue.length; index++) {
//         const first = queue.shift();
//         count++;
//         if (graph[first])
//           for (const element of graph[first]) {
//             if (element) queue.push(element);
//           }
//       }
//     }

//     return count;
//   }

//   return bfs3Internal(3);
// }

// console.log(bfs3(graph), "bfs3_graph");
// console.log(bfs3(graph2), "bfs3_graph2");

/**
 * 新题 3：判断两棵树是否相同（DFS）
题目：给定两个邻接表graph1、graph2和它们的根节点root1、root2，判断两棵树是否完全相同（结构相同且对应节点值相同）。
示例：
graph1 = { 1: [2,3] }, graph2 = { 1: [2,3] } → 相同，输出true；
graph1 = { 1: [2,null] }, graph2 = { 1: [null,2] } → 结构不同，输出false。

提示：
递归判断：当前节点值是否相同 → 左子树是否相同 → 右子树是否相同。
 */

function isSameTree(graph1, graph2, root1 = 1, root2 = 1) {
  if (root1 === null && root1 === null) return true;
  if (root1 === null || root2 === null) return false;
  if (root1 !== root2) return false;

  const graph1Child = graph1[root1] || [null, null];
  const graph2Child = graph2[root2] || [null, null];

  return (
    isSameTree(graph1, graph2, graph1Child[0], graph2Child[0]) &&
    isSameTree(graph1, graph2, graph1Child[1], graph2Child[1])
  );
}

// console.log(isSameTree({ 1: [2, 3] }, { 1: [2, 3] }), "dfs6_1");
// console.log(isSameTree({ 1: [2, null] }, { 1: [null, 2] }), "dfs6_2");

/**
 * 练习 2：判断一棵树是否为另一棵树的子树
子树定义：A 是 B 的子树，指 A 与 B 的某个子树完全相同。实现函数isSubtree(g1, g2, root1, root2)，判断g1（根root1）是否是g2（根root2）的子树。
示例：
g2 = {3: [4,5], 4: [1,2]}, g1 = {4: [1,2]} → isSubtree(g1, g2, 4, 3) 应返回true。
 */

function isSubtree(mainGraph, subGraph, mainRoot, subRoot) {
  if (subRoot === null) return true;
  if (mainRoot === null) return false;

  if (isSameTree(mainGraph, subGraph, mainRoot, subRoot)) return true;

  const mainChildren = mainGraph[mainRoot] || [null, null];
  const leftChild = mainChildren[0];
  const rightChild = mainChildren[1];

  return (
    isSameTree(mainGraph, subGraph, leftChild, subRoot) ||
    isSameTree(mainGraph, subGraph, rightChild, subRoot)
  );
}

// 大树：3为根，左子4，右子5；4的左子1，右子2
const mainGraph = {
  3: [4, 5],
  4: [1, 2],
};

// 小树1：4为根，左子1，右子2（是大树的子树）
const subGraph1 = { 4: [1, 2] };
// console.log(isSubtree(mainGraph, subGraph1, 3, 4)); // 输出 true

// // 小树2：5为根（是大树的子树）
// const subGraph2 = { 5: [null, null] };
// console.log(isSubtree(mainGraph, subGraph1, 3, 5)); // 输出 true

// // 小树3：4为根，左子1，右子3（不是大树的子树）
// const subGraph3 = { 4: [1, 3] };
// console.log(isSubtree(mainGraph, subGraph3, 3, 4)); // 输出 false

/**
 * 第四题：无权图的最短路径（BFS 核心应用）
题目：在无权无向图中，求从start到end的最短路径包含的边数（不存在返回 - 1）。
示例：
图：{A: ['B','C'], B: ['D'], C: ['D'], D: ['E']}，start='A'，end='E' → 最短路径是 A→B→D→E（或 A→C→D→E），边数 3。

提示：

BFS 天然适合！每一层遍历对应距离 + 1，第一次遇到 end 时的层数就是最短路径。
队列中可以存储[节点, 当前距离]，方便统计。
 */

function minRoute(graph, start, end) {
  // 边界条件：起点即终点，路径长度0
  if (start === end) return 0;

  const queue = [];
  queue.push(start);
  const visited = new Set([start]);
  let count = 0;

  while (queue.length) {
    const size = queue.length;

    count++;

    for (let i = 0; i < size; i++) {
      const current = queue.shift();

      if (graph[current]) {
        for (const neighbor of graph[current]) {
          if (neighbor === end) return count;

          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
    }
  }

  return -1;
}

// console.log(
//   minRoute({ A: ["B", "C"], B: ["D"], C: ["D"], D: ["E"] }, "A", "E"),
//   3
// );

// console.log(minRoute(graph, "A", "A"), 0);
// console.log(minRoute(graph, "A", "F"), -1);

/**
 * 第五题：岛屿数量（网格 DFS/BFS 练习）
题目：给定一个由'1'（陆地）和'0'（水）组成的二维网格，计算岛屿的数量。岛屿由相邻的陆地连接形成（上下左右相邻），且网格外围全是水。
示例：
网格：

plaintext
[
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]


输出：3（3 个独立岛屿）。

提示：

遍历网格，遇到未访问的'1'时，用 DFS/BFS 把所有相连的'1'标记为已访问（比如改成'0'），同时岛屿数 + 1。
 */

// function numIslands(grid) {
//   const queue = [];
//   let count = 0;
//   for (let i = 0; i < grid.length; i++) {
//     for (let j = 0; j < grid[0].length; j++) {
//       if (grid[i][j] === "1") {
//         count++;

//         grid[i][j] = "0";
//         queue.push([i, j]);

//         while (queue.length) {
//           const [x, y] = queue.shift();
//           if (x - 1 >= 0) {
//             if (grid[x - 1][y] === "1") {
//               grid[x - 1][y] = "0";
//               queue.push([x - 1, y]);
//             }
//           }

//           if (x + 1 < grid.length) {
//             if (grid[x + 1][y] === "1") {
//               grid[x + 1][y] = "0";
//               queue.push([x + 1, y]);
//             }
//           }

//           if (y - 1 >= 0) {
//             if (grid[x][y - 1] === "1") {
//               grid[x][y - 1] = "0";
//               queue.push([x, y - 1]);
//             }
//           }

//           if (y + 1 < grid[0].length) {
//             if (grid[x][y + 1] === "1") {
//               grid[x][y + 1] = "0";
//               queue.push([x, y + 1]);
//             }
//           }
//         }
//       }
//     }
//   }

//   return count;
// }

// function numIslands(grid) {
//   const col = grid.length;
//   const row = grid[0].length;

//   let count = 0;

//   function dfs(x, y) {
//     if (!(x >= 0 && y >= 0 && x < col && y < row)) {
//       return;
//     }

//     if (grid[x][y] === "0") {
//       return;
//     }

//     grid[x][y] = "0";

//     dfs(x - 1, y);
//     dfs(x + 1, y);
//     dfs(x, y - 1);
//     dfs(x, y + 1);
//   }

//   for (let i = 0; i < col; i++) {
//     for (let j = 0; j < row; j++) {
//       if (grid[i][j] === "1") {
//         dfs(i, j);
//         count++;
//       }
//     }
//   }

//   return count;
// }

// console.log(
//   numIslands([
//     ["1", "1", "0", "0", "0"],
//     ["1", "1", "0", "0", "0"],
//     ["0", "0", "1", "0", "0"],
//     ["0", "0", "0", "1", "1"],
//   ]),
//   3
// );

// console.log(
//   numIslands([
//     ["1", "1", "1", "0", "0"],
//     ["1", "1", "1", "0", "0"],
//     ["1", "1", "1", "0", "0"],
//     ["0", "0", "0", "1", "1"],
//   ]),
//   2
// );

/**
 * 第六题：打开转盘锁（BFS 进阶）
题目：一个转盘锁有 4 个数字（0-9），初始状态是"0000"。每次可以转动一个数字（+1 或 - 1，9+1=0，0-1=9）。有一个deadends数组，包含不能出现的状态（出现则锁死）。求最少转动几次能到达target状态，无法到达返回 - 1。
示例：
deadends = ["0201","0101","0102","1212","2002"]，target = "0202" → 输出 6（0000→1000→1100→1200→1201→1202→0202）。

提示：

本质是求最短路径！每个状态是节点，转动一次是边。
BFS 遍历，用visited记录已尝试的状态（包括 deadends），每次出队一个状态，生成 8 种可能的新状态（4 个位置，每个 ±1），入队前检查是否合法。
 */

function minRoute(deadends, target) {
  if (target === "0000") return 0;
  if (deadends.includes(target)) return 0;

  function getNext(num) {
    if (num === 9) return 0;
    return num + 1;
  }

  function getPrev(num) {
    if (num === 0) return 9;
    return num - 1;
  }

  const queue = ["0000"];
  let count = 0;
  const visited = new Set(["0000"]);
  while (queue.length) {
    const size = queue.length;
    for (let index = 0; index < size; index++) {
      const current = queue.shift();

      if (current === target) return count;
      const [step1, step2, step3, step4] = current.split("").map(Number);

      const neighbor = [
        [getPrev(step1), step2, step3, step4].join(""),
        [getNext(step1), step2, step3, step4].join(""),
        [step1, getPrev(step2), step3, step4].join(""),
        [step1, getNext(step2), step3, step4].join(""),
        [step1, step2, getPrev(step3), step4].join(""),
        [step1, step2, getNext(step3), step4].join(""),
        [step1, step2, step3, getPrev(step4)].join(""),
        [step1, step2, step3, getNext(step4)].join(""),
      ];
      for (const item of neighbor) {
        if (!visited.has(item) && !deadends.includes(item)) {
          visited.add(item);
          queue.push(item);
        }
      }
    }

    count++;
  }

  return count !== 0 ? count : -1;
}

// const current = "0000";

// const neighbor = getNeighbors(current);
// const [step1, step2, step3, step4] = current.split("").map(Number);

// const neighbor2 = [
//   [getPrev(step1), step2, step3, step4].join(""),
//   [getNext(step1), step2, step3, step4].join(""),
//   [step1, getPrev(step2), step3, step4].join(""),
//   [step1, getNext(step2), step3, step4].join(""),
//   [step1, step2, getPrev(step3), step4].join(""),
//   [step1, step2, getNext(step3), step4].join(""),
//   [step1, step2, step3, getPrev(step4)].join(""),
//   [step1, step2, step3, getNext(step4)].join(""),
// ];

// console.log(neighbor, "~neighbor", neighbor2);

// function getNeighbors(current) {
//   const neighbors = [];
//   const digits = current.split("").map(Number); // 转成数字数组，方便计算

//   for (let i = 0; i < 4; i++) {
//     // 保存当前位置的数字（用于恢复）
//     const original = digits[i];

//     // +1 操作（9→0）
//     digits[i] = (original + 1) % 10;
//     neighbors.push(digits.join(""));

//     // -1 操作（0→9）
//     digits[i] = (original - 1 + 10) % 10; // +10避免负数
//     neighbors.push(digits.join(""));

//     // 恢复原数字，处理下一个位置
//     digits[i] = original;
//   }

//   return neighbors;
// }

// console.log(minRoute(["0201", "0101", "0102", "1212", "2002"], "0202"), 6);

/**
 * 1. 二叉树的层序遍历 II（自底向上）
题目：给定二叉树的邻接表表示，返回其节点值自底向上的层序遍历（即从最后一层到第一层，每层从左到右）。
示例：
graph = {3: [9,20], 20: [15,7]} → 输出 [[15,7], [9,20], [3]]

思路：

正常 BFS 按层遍历（从上到下），将每层结果存入数组；
最后反转结果数组（或每次将新层插入到数组头部）。
 */

function bfs4(graph, start = 3) {
  const queue = [start];
  let result = [];
  while (queue.length) {
    const size = queue.length;
    const itemLevel = [];
    for (let index = 0; index < size; index++) {
      const target = queue.shift();

      itemLevel.push(target);

      if (graph[target]) {
        for (const neighbor of graph[target]) {
          queue.push(neighbor);
        }
      }
    }

    result.unshift(itemLevel);
  }

  return result;
}

// console.log(bfs4({ 3: [9, 20], 20: [15, 7] }), [[15, 7], [9, 20], [3]]);

/**
 * 2. 腐烂的橘子（网格扩散）
题目：m x n 的网格中，0是空，1是新鲜橘子，2是腐烂橘子。每分钟，腐烂橘子会让上下左右的新鲜橘子腐烂。求最少几分钟后所有橘子腐烂，无法全部腐烂则返回 - 1。
示例：

javascript
const grid = [
  [2,1,1],
  [1,1,0],
  [0,1,1]
];
// 输出：4（4分钟后所有橘子腐烂）
 */

function bfs5(grid) {
  const m = grid.length;
  const n = grid[0].length;

  const queue = [];

  let time = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j]);
      }
    }
  }

  while (queue.length) {
    const size = queue.length;
    // 扩散效果才需要计算时间
    let flag = false;
    for (let index = 0; index < size; index++) {
      const [x, y] = queue.shift();
      if (x - 1 >= 0 && grid[x - 1][y] === 1) {
        grid[x - 1][y] = 2;
        queue.push([x - 1, y]);
        flag = true;
      }

      if (x + 1 < m && grid[x + 1][y] === 1) {
        grid[x + 1][y] = 2;
        queue.push([x + 1, y]);
        flag = true;
      }

      if (y - 1 >= 0 && grid[x][y - 1] === 1) {
        grid[x][y - 1] = 2;
        queue.push([x, y - 1]);
        flag = true;
      }

      if (y + 1 < n && grid[x][y + 1] === 1) {
        grid[x][y + 1] = 2;
        queue.push([x, y + 1]);
        flag = true;
      }
    }

    if (flag) time++;
  }

  //看剩余的情况下还有没有未被传染的橘子
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        return -1;
      }
    }
  }

  return time;
}

// console.log(
//   bfs5([
//     [2, 1, 1],
//     [1, 1, 0],
//     [0, 1, 1],
//   ]),
//   4
// );

// console.log(
//   bfs5([
//     [2, 1, 1, 1],
//     [1, 1, 0, 0],
//     [0, 1, 1, 0],
//     [0, 1, 0, 1],
//   ]),
//   -1
// );

// console.log(
//   bfs5([
//     [2, 2, 2],
//     [2, 2, 2],
//     [2, 2, 2],
//   ]),
//   0
// );

/**
 * 3. 单词接龙（字符串转换）
题目：给定字典 wordList，从 beginWord 到 endWord，每次只能改变一个字母，且中间单词必须在字典中。求最短转换序列的长度。
示例：
beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
→ 转换路径：hit→hot→dot→dog→cog → 长度 5。
 */

// console.log("hot".includes("ht"), "ht");

function isSubsequence(mainStr, subStr) {
  // 子串为空时默认存在
  if (subStr.length === 0) {
    return true;
  }

  let subIndex = 0; // 子串指针，记录当前需要匹配的字符位置

  // 遍历主字符串
  for (let i = 0; i < mainStr.length; i++) {
    // 如果找到匹配的字符，移动子串指针
    if (mainStr[i] === subStr[subIndex]) {
      subIndex++;
      // 子串所有字符都匹配成功
      if (subIndex === subStr.length) {
        return true;
      }
    }
  }

  // 遍历完主串仍未匹配完子串
  return false;
}

function bfs6(wordList, beginWord, endWord) {
  const queue = [beginWord];
  let count = 1;
  while (queue.length) {
    const size = queue.length;
    let flag = false;
    for (let index = 0; index < size; index++) {
      const target = queue.shift();
      if (target === endWord) return count;

      const [word1, word2, word3] = target.split("");
      for (let wordIndex = 0; wordIndex < wordList.length; wordIndex++) {
        const wordItem = wordList[wordIndex];
        if (isSubsequence(wordItem, `${word1}${word2}`)) {
          queue.push(wordItem);
          flag = true;
        }

        if (isSubsequence(wordItem, `${word1}${word3}`)) {
          queue.push(wordItem);
          flag = true;
        }

        if (isSubsequence(wordItem, `${word2}${word3}`)) {
          queue.push(wordItem);
          flag = true;
        }
      }
    }

    if (flag) count++;
  }

  return count;
}

console.log(bfs6(["hot", "dot", "dog", "lot", "log", "cog"], "hit", "cog"), 5);
