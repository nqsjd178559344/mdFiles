1. 与 webpack 的比对
   1. 开箱即用，无需大部分的额外配置
   
2. 部分好文
   [深入浅出 Vite5 中依赖预构建](https://juejin.cn/post/7310439736828117046?searchId=20241014103405ABA79239F193808D7D5E)
3. 测试工具 [vitest](https://cn.vitest.dev/guide/)
4. vite 主要解决了 webpack 的什么痛点
   1. 热加载和打包速度慢原因：
         webpack 生成一个或多个 chunks ，每次改动都要重新生成
         vite 生成 esm，每次都只改动自身
         vite将npm_modules trans 为 esm， 存储在 .vite 文件中
         vite热更新：HMR 客户端使用 websocket 与 vite 开发服务器建立连接([热模块更换很容易 - Bjorn Lu](https://bjornlu.com/blog/hot-module-replacement-is-easy))