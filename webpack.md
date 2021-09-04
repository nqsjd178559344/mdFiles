
1. 入口: entry
2. 出口: output
3. 载入: loader
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

4. 插件: plugin *

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

5. 模式: mode => development || production || none
6. 兼容性: 支持ES5以上的浏览器[IE8]
