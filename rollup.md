主要打包 libs

```js
// https://www.npmjs.com/package/@rollup/plugin-babel
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser"; // 缩小生成的es包
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" assert { type: "json" };

// 应该转译的文件扩展名数组
const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs", // 运行于node
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es", // <script type=module>
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      exclude: ["src/**/*.test.ts", "src/_testHelpers.ts"],
    }),
    postcss({ minimize: true, inject: { insertAt: "bottom" } }),
    nodeResolve({
      browser: true,
      extensions,
    }),
    // ! 必须先 commonjs 再 babel
    commonjs(),
    babel({
      extensions,
      babelHelpers: "runtime", //默认
    }),
    terser(),
  ],
  external: ["swr", "swr/infinite"],
};
```