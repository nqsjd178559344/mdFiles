1. array
   1. Array.of | Array.from 区别
   2. [].some | [].every
   
2. Object
   1. Object.assign: 仅拷贝源对象自身且可枚举属性至目标对象[拷贝属性值]


3. 深拷贝
4. 递归
   1. 封装方法获取需要的数据:getItemsById(arr,ids)
```
const arr = [
  {
    id: 1,
    name: "我是1",
    children: [
      {
        id: 11,
        name: "我是11",
        children: [],
      },
    ],
  },
  {
    id: 2,
    name: "我是2",
    children: [
      {
        id: 21,
        name: "我是21",
        children: [],
      },
    ],
  },
];
// 调用getItemsById(arr,[1,21])
// 返回：
[
  {
    id: 1,
    name: "我是1",
    children: [
      {
        id: 11,
        name: "我是11",
      }
    ]
  },
  {
    id: 21,
    name: "我是21",
    children: []
  }
]
```
```
// 答案: 
function getItemsById(items, ids) {
  const result = []
  function checkItems(items, ids) {
    if (Array.isArray(items)) {
      items.forEach(item => {
        if (ids.includes(item.id)) {
          result.push(item)
        } else if (item.children.length) {
          checkItems(item.children, ids)
        }
      })
    }
  }
  checkItems(items, ids)
  return result
}

const res = getItemsById(arr, [1, 21])
console.log(res)
```

