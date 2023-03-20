### webpack 基本概念

1. webpack 作用:
   1. 热更新: 开发过程中,代码保存 => 自动刷新 页面就好了
   2. 代码编译: 写 CSS/JS 代码后自动处理兼容问题
   3. 压缩打包: 一键压缩代码,图片处理等
   4. 模块合并
   5. 代码校验 => 规范代码
   6. 自动发布
2. webpack 本质 => 基于 nodeJs 的静态模块打包器
3. 提升 Webpack 打包速度 => nodeJs && Webpack 版本尽量高
4. webpack 参数

   1. 入口: entry
   2. 出口: output
   3. 载入: loader \*: 文件预处理器

      1. test
      2. use

      ```js
      const path = require("path");
      module.exports = {
        output: {
          filename: "my-first-webpack.bundle.js",
        },
        module: {
          rules: [{ test: /\.txt$/, use: "raw-loader" }],
        },
      };
      ```

   4. 插件: plugin \*: 可扩展 webpack

      ```js
      const HtmlWebpackPlugin = require("html-webpack-plugin"); // 通过 npm 安装
      const webpack = require("webpack"); // 用于访问内置插件

      module.exports = {
        module: {
          rules: [{ test: /\.txt$/, use: "raw-loader" }],
        },
        plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
      };
      ```

5. webpack 安装:
   1. 全局安装: npm install webpack webpack-cli -g [多项目可能不匹配]
   2. 开发环境安装: npm install webpack webpack-cli -D === --save -dev
   3. 安装指定版本: npm install webpack@4.16.1
   4. 查看可安装版本: npm info
   5. 安装入 dependencies: npm install webpack webpack-cli -D === --save
      1. 成功后 package.json 中新增两个包: dependencies/devDependencies
   6. 查看版本:
   7. webpack -v : 全局版本
   8. npx webpack -v: 当前版本

---

6. SourceMap => 定位错误
7. DevServer
8. hmr => 热更新[只打包新模块,替换新模块]
   1. webpack-dev-server: 作为服务器启动
   2. devServer 中 hot:true
   3. plugins: HotModuleReplacementPlugin
   4. js 模块中增加 module.hot.accept 增加 hmr 代码
      ```js
      // 进行热更新
      if (module.hot) {
        module.hot.accept("./list.js", () => {
          // 此页面更改则部分更改/否则全部更改
          // 不可使用require()
          console.log("list"), list();
        });
        // !关闭热更新:
        // module.hot.decline("./list.js")
      }
      ```
9. Babel

   1. 意义: js 编译器 2. 安装: npm install @babel/core[babel 核心] @babel-cli[命令行中使用] @babel/preset-env[转换 ES5+语法] babel-loader
      ———————

10. 模式<环境区分>: mode => development || production || none mode=production 时自动开启 TreeShaking 及 js 代码压缩
11. codeSpliting
12. 打包分析
13. 代码分割环境变量使用
14. 兼容性: 支持 ES5 以上的浏览器[IE8]

———————

### webpack 高级概念

1. TreeShaking[摇树优化] => console.log || 无用代码 [默认:development 模式时未使用代码也会被打包入]

   1. 注意: **依赖 ES6 模块语法** | 只打包需要的,提升速度

   ```js
   //! webpack默认打包全部代码[包括未使用的代码]
   //  解决方式:
   //  1. webpack3: 插件:uglifyjsWebpackPlugins
   //  2. webpack4: mode:production
   ```

   2. dev | pro 区分: <共同点>: 相同入口 | 部分相同的代码处理

2. 区别
   1. dev:
      1. devServer
      2. sourceMap
      3. 接口代理: proxy
   2. pro:
      1. TreeShaking
      2. 代码压缩
      3. 提供公共代码
3. 方案: _通过webpack-merge@4.1.0进行合并_
   1. webpack.dev.js | webpack.prod.js | webpack.base.js[开发生产公用代码]
4. **配置打包配置位置**:webpack|webpack-dev-server --config ./config/prod.js
5. 打包优化[js]
   1. 入口配置: entry 多入口 + webpack.ProvidePlugin
   2. 抽取公共代码: webpack4:**splitChunksPlugins:打包速度快** webpack4-:commonChunksPlugin
      1. 在 webpack.config 中配置 optimization
   3. 动态加载[按需加载 | 懒加载] : 配置 webpackChunkName + dynamicImport[可能需要]
      ```js
      import(/*webpackChunkName:'jquery'*/ "jquery").then(({ default: $ }) => {
        //! 如报错 dynamicImport,则先安装 @babel/plugin-syntax-dynamic-import并于 .babelrc 中配置
        console.log($.length);
      });
      ```
   4. 自动注入

——————— 4. css 代码分割

1.  将 css 单独打包: mini-css-extract-plugin@0.9.0
2.  css 代码压缩: optimize-css-assets-webpack-plugin@5.0.3 => 配置进 optimization.minimizer
    1. **该操作会导致 prod 模式下 js 代码不压缩 => optimization 默认功能失效**
    2. 解决办法 => 在 optimization.minimizer 中指定 js 压缩插件:terser-webpack-plugins@2.3.5
3.  代码包可视化分析工具: webpack-bundle-analyzer => require("webpack-bundle-analyzer").BundleAnalyzerPlugin
4.  获取环境参数:
    1.  官网=>指南=>环境变量[--env goal=local --env production --progress Tip],在 package.json 中 配置指令 | yargs
