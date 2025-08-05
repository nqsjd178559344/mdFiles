/**
 * 例题 1：路径判断（DFS 应用）
题目：给定一个无向图（邻接表形式）和两个节点start、end，请判断从start到end是否存在路径。
示例：
图的邻接表为 {0: [1, 2], 1: [3], 2: [3], 3: [4], 4: []}，start=0，end=4 → 存在路径（0→1→3→4 或 0→2→3→4）；
若end=5（图中不存在该节点）→ 不存在路径。
 */

const graph = {
  0: [1, 2],
  1: [3],
  2: [3],
  3: [4],
  4: [],
};

function dfs(graph, start, end) {
  if (start === end) return true;

  for (const key of graph[start]) {
    if (dfs(graph, key, end)) return true;
  }

  return false;
}

// const dfsResult = dfs(graph, 0, 4);
// console.log(bfs1Result, "dfsResult");

/**
 * 例题 2：最短路径长度（BFS 应用）
题目：在一个无权无向图中，求从start节点到end节点的最短路径包含的边数（若不存在路径，返回 - 1）。
示例：
图的邻接表为 {A: ['B', 'C'], B: ['A', 'D'], C: ['A', 'D'], D: ['B', 'C', 'E'], E: ['D']}，start='A'，end='E' → 最短路径为 A→B→D→E 或 A→C→D→E，边数为 3。
 */

const graph2 = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "D"],
  D: ["B", "C", "E"],
  E: ["D"],
};

function bfs(graph, start, end) {
  let queue = [];
  queue.push(start);
  let steps = 0;

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const current = queue.shift();
      if (current === end) {
        return steps;
      }

      for (const neighbor of graph[current]) {
        queue.push(neighbor);
      }
    }

    steps++;
  }

  return steps;
}

// const bfsResult = bfs(graph2, "A", "E");
// console.log(bfsResult, "bfsResult");

/**
 * 判断图中是否存在路径
 * 
 * 用邻接表表示一个无向图，判断从start节点到end节点是否存在路径。
示例：
图：{0: [1,2], 1: [3], 2: [3], 3: [4]}，start=0，end=4 → 输出true。

提示：

用 DFS：从 start 出发递归访问邻居，遇到 end 返回 true，访问过的节点标记（避免环导致死循环）。
用 BFS：队列初始放 start，每次出队一个节点，遍历其邻居，遇到 end 返回 true，邻居入队前标记已访问。
 */

// function hasRoute(graph, start, end) {
//   const queue = [];
//   queue.push(start);
//   while (queue.length) {
//     const size = queue.length;
//     for (let i = 0; i < size; i++) {
//       const target = queue.shift();
//       if (target === end) return true;
//       if (!graph[target]) return false;
//       for (const neighbor of graph[target]) {
//         queue.push(neighbor);
//       }
//     }
//   }
// }

// function hasRoute(graph, start, end) {
//   if (start === end) return true;
//   if (graph[start]) {
//     const child = graph[start] || [null, null];
//     const leftChild = child[0];
//     const rightChild = child[1];

//     return hasRoute(graph, leftChild, end) || hasRoute(graph, rightChild, end);
//   }

//   return false;
// }

// console.log(hasRoute({ 0: [1, 2], 1: [3], 2: [3], 3: [4] }, 0, 4));
// console.log(hasRoute({ 0: [1, 2], 1: [3], 2: [3], 3: [4] }, 0, 5));
// console.log(hasRoute({ 0: [1, 2], 1: [3], 2: [3], 3: [4] }, 0, 1));
// console.log(hasRoute({ 0: [1, 2], 1: [3], 2: [4], 4: [5] }, 1, 5));
// console.log(hasRoute({ 0: [1, 2], 1: [3], 2: [4], 4: [5] }, 2, 5));
