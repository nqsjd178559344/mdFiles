const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [],
    },
    {
      value: 3,
      children: [
        {
          value: 4,
          children: [],
        },
      ],
    },
  ],
};

// 使用递归实现一个函数，遍历这个树形结构并返回所有节点的值组成的数组。

function traverseTree(tree) {
  // 实现代码
  // return
  let result = [];

  if (tree.value) result.push(tree.value);

  if (tree.children.length) {
    for (const element of tree.children) {
      result = result.concat(...traverseTree(element));
    }
  }

  return result;
}
console.log(traverseTree(tree)); // 输出 [1, 2, 3, 4]
