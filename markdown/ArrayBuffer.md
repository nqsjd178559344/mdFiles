### 合并两个 ArrayBuffer

```js
const [buffer1, buffer2] = res; // 两个请求回的二进制数据

const arr = new Uint8Array(buffer1.byteLength + buffer2.byteLength); // ArrayBuffer 只读，想要操作要通过 Uint8Array 来合并，之后再转为 ArrayBuffer。

const arr1 = new Uint8Array(buffer1);
arr.set(arr1, 0);

const arr2 = new Uint8Array(buffer2);
arr.set(arr2, arr1.byteLength);

arr.buffer;
```

[相关链接]('https://mp.weixin.qq.com/s?__biz=Mzg3OTYzMDkzMg==&mid=2247495472&idx=1&sn=bc73cba1c6a4075dddddc88fe270772b&chksm=cf03200bf874a91d3b652f3094bff907220aeb49018f4576f53bd917c48dfd44f55dc4737c58&token=1511906647&lang=zh_CN#rd')
