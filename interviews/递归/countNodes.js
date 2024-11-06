class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

//   使用递归实现一个函数，计算给定二叉树中的节点总数。

const tree = new TreeNode(1);
tree.left = new TreeNode(2);
tree.right = new TreeNode(3);
tree.left.left = new TreeNode(4);
tree.left.right = new TreeNode(5);

function countNodes(root) {
  // 实现代码

  let result = 0;

  if (root.value) result++;

  if (root.left) {
    result += countNodes(root.left);
  }

  if (root.right) {
    result += countNodes(root.right);
  }

  return result;
}
console.log(countNodes(tree)); // 输出 5
