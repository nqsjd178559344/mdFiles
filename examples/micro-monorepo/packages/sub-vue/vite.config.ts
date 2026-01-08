import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "http://localhost:8080/",
  plugins: [vue()],
  server: {
    port: 8080, // 固定子应用端口
    headers: {
      // 允许基座访问（React 基座地址）
      "Access-Control-Allow-Origin": "*",
    },
    // 开发环境允许跨域（微前端场景必须）
    cors: true,
  },
  build: {
    // 打包为 UMD 格式，支持微前端加载
    lib: {
      name: "vue-sub-app",
      formats: ["umd"],
    },
  },
});
