### 同源

1. 广播站模式
   1. BroadCast Channel: 可创建一个所有同原页面均可共享的广播;=> 兼容不行![兼容性示意图](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/4/1/169d80efd65b5401~tplv-t2oaga2asx-watermark.awebp)
   2. Service Worker:
      1. 必须起服务=>只能被使用在 https 或者本地的 localhost 环境下
      2. 必须将 register 的文件放于与调用文件同级位置
   3. LocalStorage: storage 事件 => [传递值不变时不触发]
2. 共享存储
   1. Shared Worker => 待续
   2. IndexedDB[兼容性不太好]
3. 口口相传
   1. window.open + window.opener[只能监听通过 window.open 打开的页面]
4. 服务端
   1. WebSocket

### 非同源

1.  iframe: iframe 与父级页面可通过指定 origin 来忽略同源限制,故可在每个页面中嵌入 iframe, 各个 iframe 均为同源页面,可以使用同源方法进行数据传递 ![例图](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/3/31/169d468988a6ba8f~tplv-t2oaga2asx-watermark.awebp)
