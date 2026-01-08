import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  // 动态获取基座中的基础路径
  history: createWebHistory(
    (window as any).__MICRO_APP_BASE_ROUTE__ || "/sub-vue"
  ),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
  ],
});

export default router;
