
### webpack基本概念
1. webpack 作用:
   1. 热更新: 开发过程中,代码保存 => 自动刷新 页面就好了
   2. 代码编译: 写CSS/JS代码后自动处理兼容问题
   3. 压缩打包: 一键压缩代码,图片处理等
   4. 模块合并
   5. 代码校验 => 规范代码
   6. 自动发布
2. webpack 本质:
    1. 基于nodeJs的静态模块打包器
3. 提升Webpack打包速度 => nodeJs && Webpack 版本尽量高
4. webpack 参数
   1. 入口: entry
   2. 出口: output
   3. 载入: loader *: 文件预处理器
      1. test
      2. use

       ```js
       const path = require('path');
       module.exports = {
       output: {
           filename: 'my-first-webpack.bundle.js',
       },
       module: {
           rules: [{ test: /\.txt$/, use: 'raw-loader' }],
       },
       };
       ```

   4. 插件: plugin *: 可扩展webpack

       ```js
       const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
       const webpack = require('webpack'); // 用于访问内置插件

       module.exports = {
       module: {
           rules: [{ test: /\.txt$/, use: 'raw-loader' }],
       },
       plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
       };
       ```

5. webpack 安装:
      1. 全局安装: npm install webpack webpack-cli -g [多项目可能不匹配]
      2. 开发环境安装: npm install webpack webpack-cli -D === --save -dev
      3. 安装指定版本: npm install webpack@4.16.1
      4. 查看可安装版本: npm info
      5. nrm 按照: npm install -g nrm
      6. 查看当前使用源: nrm ls
      7. 切换源: nrm use xxx
      8. 检测网速: nrm test
      9. 安装入dependencies: npm install webpack webpack-cli -D === --save
         1. 成功后package.json中新增两个包: dependencies/devDependencies
      10. 查看版本:
         2. webpack -v : 全局版本
         3. npx webpack -v: 当前版本

___

6. SourceMap => 定位错误
7. DevServer
8. hmr => 热更新[只打包新模块,替换新模块]
   1. webpack-dev-server: 作为服务器启动
   2. devServer中 hot:true
   3. plugins: HotModuleReplacementPlugin
   4. js模块中增加 module.hot.accept增加hmr代码
9.  Babel   
    1.  意义: js编译器
    2.  安装: npm install @babel/core[babel核心] @babel-cli[命令行中使用] @babel/preset-env[转换ES5+语法] babel-loader
———————

1.  模式<环境区分>: mode => development || production || none mode=production时自动开启 TreeShaking 及 js代码压缩
2.  codeSpliting
3.  打包分析
4.  代码分割环境变量使用
5.  兼容性: 支持ES5以上的浏览器[IE8]

———————
### webpack高级概念
1. TreeShaking[摇树优化] => console.log || 无用代码 [默认:development模式时未使用代码也会被打包入]
   1. 注意: **依赖ES6模块语法** | 只打包需要的,提升速度
   2. 详情看webpack.config

———————
2. dev | pro 区分: <共同点>: 相同入口 | 部分相同的代码处理
   1. 区别
      1. dev:
         1. devServer
         2. sourceMap
         3. 接口代理: proxy
      2. pro:
         1. TreeShaking
         2. 代码压缩
         3. 提供公共代码
   2. 方案: *通过webpack-merge@4.1.0进行合并*
      1. webpack.dev.js | webpack.prod.js | webpack.base.js[开发生产公用代码]
   3. **配置打包配置位置**:webpack|webpack-dev-server --config ./config/prod.js
3. 打包优化[js]
   1. 入口配置: entry多入口 + webpack.ProvidePlugin
   2. 抽取公共代码: webpack4:**splitChunksPlugins:打包速度快** webpack4-:commonChunksPlugin
      1. 在webpack.config中配置 optimization 
   3. 动态加载[按需加载 | 懒加载] : 配置webpackChunkName + dynamicImport[可能需要]
      ```js
      import(/*webpackChunkName:'jquery'*/'jquery').then(({ default: $ })=>{ //! 如报错 dynamicImport,则先安装 @babel/plugin-syntax-dynamic-import并于。babelrc 中配置
         console.log($.length)
      })
      ```
   4. 自动注入

———————
1. css代码分割
   1. 将css单独打包: mini-css-extract-plugin@0.9.0
   2. css代码压缩: optimize-css-assets-webpack-plugin@5.0.3 => 配置进 optimization.minimizer
      1. **该操作会导致 prod 模式下 js代码不压缩 => optimization默认功能失效**
      2. 解决办法 => 在 optimization.minimizer 中指定js压缩插件:terser-webpack-plugins@2.3.5
2. 代码包可视化分析工具: webpack-bundle-analyzer => require("webpack-bundle-analyzer").BundleAnalyzerPlugin
3. 获取环境参数:
   1. 官网=>指南=>环境变量[--env goal=local --env production --progress Tip],在 package.json 中 配置指令 | yargs
   2. 
   
   
