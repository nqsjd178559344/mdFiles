1. 实现背景
   基于浏览器的 type 为 module 的 script 可以直接下载 es module 模块实现的。
2. 与 webpack 的比对
   1. 开箱即用，无需大部分的额外配置
3. 部分好文
   [深入浅出 Vite5 中依赖预构建](https://juejin.cn/post/7310439736828117046?searchId=20241014103405ABA79239F193808D7D5E)
4. 测试工具 [vitest](https://cn.vitest.dev/guide/)
5. vite 主要解决了 webpack 的什么痛点
   1. 热加载和打包速度慢原因：
      webpack 生成一个或多个 chunks ，每次改动都要重新生成
      vite 生成 esm，每次都只改动自身
      vite 将 npm_modules trans 为 esm， 存储在 .vite 文件中
      vite 热更新：HMR 客户端使用 websocket 与 vite 开发服务器建立连接([热模块更换很容易 - Bjorn Lu](https://bjornlu.com/blog/hot-module-replacement-is-easy))
6. 部分配置：

```ts
  build: {
    sourcemap: true, // 包括但不限于esbuild处理的部分、资源文件的处理（如图片、字体等）以及模块的合并和优化。
  },
```

1. 自定义打包命令

   1. 将

      ```json
         "build": "vite build --mode demo1",
      ```

      ```ts
      import { defineConfig, loadEnv, ConfigEnv } from "vite";
      import baseConfig from "../feature/vite.config";

      /**
            const getBuildMode = () => {
               const targetIndex = process.argv.indexOf("--mode");
               if (targetIndex !== -1) {
                  return process.argv[targetIndex + 1];
               }
               return;
            };
            const mode = getBuildMode(); // 可直接传入
         */

      const getDateStamp = () => {
        const now = new Date();
        const year = now.getFullYear().toString().slice(-2); // 获取年份后两位
        const month = (now.getMonth() + 1).toString().padStart(2, "0"); // 获取月份，不足两位补0
        const day = now.getDate().toString().padStart(2, "0"); // 获取日期，不足两位补0
        return `${year}${month}${day}`;
      };

      export default defineConfig(({ mode }: ConfigEnv) => {
        // 新增 .env.demo1 文件,维护其他环境变量
        const env = loadEnv(_mode, __dirname);
        return {
          ...baseConfig,
          base: mode ? `/${mode}/next` : undefined,
          build: {
            // 如果没找到参数，设置一个默认值
            outDir: `dist_${mode ?? "default"}_${getDateStamp()}`,
          },
        };
      });
      ```
