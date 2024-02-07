###文档

[文档](https://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html)

注: require()不支持 ES6 模块的一个原因是，它是同步加载，而 ES6 模块内部可以使用顶层await命令，导致无法被同步加载。