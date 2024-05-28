1. array
   1. Array.of | Array.from 区别

---

1. Object

   1. assign: 仅拷贝源对象自身且可枚举属性至目标对象[拷贝属性值]
   2. getOwnPropertyDescriptor(obj, prop)
      => 返回 defineProperty 属性(get/set/writable/)
   3. getOwnPropertyNames: 自身的可枚举/不可枚举的属性
      1. 获取可枚举属性(Object.keys/for in + hasOwnProperty 过滤)
      2. 获取不可枚举属性(getOwnPropertyNames + Object.keys + filter)
   4. getOwnPropertySymbols: 自身所有 Symbol 属性的数组
   5. getPrototypeOf: 指定对象的原型
   6. isExtensible: 对象是否可扩展 (可为其添加新属性/\_\_proto\_\_ 属性是否可更改) ES6 中非对象默认返回 false
      设置为不可扩展:
      Object.preventExtensions
      Object.seal
      Object.freeze

   兼容: √
   ES5: 第一个参数如不为 object 类型则报错
   ES6: 第一个参数如不为 object 类型则自动转换

---

1. 深拷贝

---

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
