### 功能

1. 可实现断点续传

### 优势

1. 相比于 content-disposition:attachment; filename=""
   1. 断网则要直接失败，需从头下载

### 写法

```js
headers: {
  range: `bytes=${start ?? ""}-${end ?? ""}`; // 单段
  range: `bytes=${start1 ?? ""}-${end1 ?? ""}, ${start2 ?? ""}-${end2 ?? ""}`; // 多段，多段时会发送预检请求
}
```

预检请求目的:看服务器是否支持

1. 非 GET、POST 请求：PUT、DELETE 等
2. 非常规请求头："Content-Type"等

### 返回值

```js
response:{
    "Status Code":200 // 服务器不支持Range，将返回全部内容
    "Status Code":206 // 成功
    "Status Code":416 // range超出
    'Content-Length':10, // 内容长度
    'Content-Range':`bytes 0-9/100` // range长度/总长度
    "Content-Type":'multipart/byteranges' // 多段，类似 multipart/form-data 一样，都是通过 boundary 分割，每一段都包含 Content-Range 和内容。
}
```

[相关链接](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Range
// https://mp.weixin.qq.com/s?__biz=Mzg3OTYzMDkzMg==&mid=2247495472&idx=1&sn=bc73cba1c6a4075dddddc88fe270772b&chksm=cf03200bf874a91d3b652f3094bff907220aeb49018f4576f53bd917c48dfd44f55dc4737c58&token=1511906647&lang=zh_CN#rd)
