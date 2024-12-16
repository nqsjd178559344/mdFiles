### rollup优势
打包产物中没有runtime的代码，更简单纯粹，能打包出 esm , umd , cjs 的产物，更适合做 js 库，组件库等的打包

### rollup 插件写法
1. name
2. transform
3. resolveId
4. generateBundle

### vite相关
1. vite 中为何使用 rollup
    因为 vite 只需要做生产环境的打包，开发环境为本地起了个服务，然后将代码转换，不需要 webpack dev server
    不论开发还是生产环境，都会调用 rollup 插件的 transform 方法做转换
2. vite 中为何使用 esbuild
    性能优化，依赖预构建
