import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
const HomePage = () => import("@/pages/HomePage.vue");
const ToolsPage = () => import("@/pages/ToolsPage.vue");
const ToolDetailPage = () => import("@/pages/ToolDetailPage.vue");
const FavoritesPage = () => import("@/pages/FavoritesPage.vue");
const CategoryPage = () => import("@/pages/CategoryPage.vue");
const SearchPage = () => import("@/pages/SearchPage.vue");
const SettingsPage = () => import("@/pages/SettingsPage.vue");
const NotFound = () => import("@/pages/NotFound.vue");

export const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "home", component: HomePage, meta: { title: "首页" } },
  {
    path: "/tools",
    name: "tools",
    component: ToolsPage,
    meta: { title: "工具" },
  },
  {
    path: "/tools/:toolId",
    name: "tool-detail",
    component: ToolDetailPage,
    meta: { title: "工具详情" },
  },
  {
    path: "/categories/:categoryId",
    name: "category",
    component: CategoryPage,
    meta: { title: "分类" },
  },
  {
    path: "/favorites",
    name: "favorites",
    component: FavoritesPage,
    meta: { title: "收藏" },
  },
  {
    path: "/search",
    name: "search",
    component: SearchPage,
    meta: { title: "搜索" },
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsPage,
    meta: { title: "设置" },
  },
  { path: "/:pathMatch(.*)*", name: "404", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.afterEach((to) => {
  if (to.meta?.title) document.title = `超级实用工具箱 · ${to.meta.title}`;
});

export default router;
