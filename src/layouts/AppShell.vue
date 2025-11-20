<template>
  <a-layout class="shell">
    <a-layout-header class="shell__header">
      <RouterLink to="/home" class="shell__logo">超级实用工具箱</RouterLink>
      <a-menu
        mode="horizontal"
        :selectedKeys="[route.name as string]"
        class="shell__nav"
      >
        <a-menu-item key="tools">
          <RouterLink to="/tools">工具</RouterLink>
        </a-menu-item>
        <a-menu-item key="favorites">
          <RouterLink to="/favorites">收藏</RouterLink>
        </a-menu-item>
        <a-menu-item key="settings">
          <RouterLink to="/settings">设置</RouterLink>
        </a-menu-item>
      </a-menu>
      <div class="shell__theme">
        <span class="shell__themeLabel">主题</span>
        <a-segmented
          :value="ui.theme"
          :options="[
            { label: '浅色', value: 'light' },
            { label: '深色', value: 'dark' },
          ]"
          @change="handleThemeChange"
        />
      </div>
    </a-layout-header>
    <a-layout-content class="shell__content">
      <RouterView />
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts">
import { useRoute, RouterLink, RouterView } from "vue-router";
import { useUiStore } from "@/stores/ui";
import { onMounted } from "vue";

const ui = useUiStore();
const route = useRoute();

onMounted(() => ui.init());

function handleThemeChange(val: "light" | "dark") {
  ui.toggleTheme(val);
}
</script>
<style lang="less" scoped>
.shell {
  min-height: 100vh;
  &__header {
    display: flex;
    align-items: center;
    gap: 16px;
    background: transparent;
  }
  &__logo {
    font-weight: 800;
    color: var(--text);
    text-decoration: none;
  }
  &__nav {
    flex: 1;
  }
  &__theme {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &__themeLabel {
    color: var(--muted);
  }
  &__content {
    padding: 16px;
  }
}
</style>
