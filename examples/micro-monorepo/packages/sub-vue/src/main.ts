import { createApp } from "vue";
import Home from "./views/Home.vue";
import router from "./router";

// 子应用渲染函数
function render(props: { container?: HTMLElement } = {}) {
  const { container } = props;
  // 挂载到基座提供的容器或自身节点
  const app = createApp(Home);
  app.use(router);
  app.mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时或 iframe 模式下直接渲染
// 注意：在 iframe 模式下，基座无法直接调用 window 上的方法，需要子应用自动渲染
if (
  !window.__MICRO_APP_ENVIRONMENT__ ||
  window.location.search.includes("microAppIframe") ||
  true
) {
  render();
}

// 依然注册，以防非 iframe 模式下需要
if (window.__MICRO_APP_ENVIRONMENT__) {
  window[`__MICRO_APP_NAME__${window.__MICRO_APP_NAME__}`] = render;
}
