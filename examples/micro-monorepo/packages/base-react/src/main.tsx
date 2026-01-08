import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import microApp from "@micro-zoe/micro-app"; // 引入 microApp

// 启动 microApp
microApp.start({
  // 可选：关闭样式隔离（默认开启）
  // disableStyleIsolation: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
