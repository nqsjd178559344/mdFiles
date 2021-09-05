
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
      5. 查看当前使用源: nrm ls
      6. 切换源: nrm use xxx
      7. 检测网速: nrm test
      8. 安装入dependencies: npm install webpack webpack-cli -D === --save
         1. 成功后package.json中新增两个包: dependencies/devDependencies
      9. 查看版本:
         1. webpack -v : 全局版本
         2. npx webpack -v: 当前版本

___

6. SourceMap => 定位错误
   1. 
7. DevServer
8. hmr => 热更新[只打包新模块,替换新模块]
   1. webpack-dev-server: 作为服务器启动
   2. devServer中 hot:true
   3. plugins:HotModuleReplacementPlugin
   4. js模块中增加 module.hot.accept增加hmr代码
9.  Babel
10. TreeShaking
11. 模式<环境区分>: mode => development || production || none
12. codeSpliting
13. 打包分析
14. 代码分割环境变量使用
15. 兼容性: 支持ES5以上的浏览器[IE8]
16. babel
    1.  意义: js编译器
    2.  安装: npm install @babel/core[babel核心] @babel-cli[命令行中使用] @babel/preset-env[转换ES5+语法] babel-loader
