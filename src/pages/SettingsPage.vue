<template>
  <section class="settings container">
    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :md="12">
        <a-card title="主题设置">
          <p class="settings__desc">切换全局浅色 / 深色主题。</p>
          <a-segmented
            :value="ui.theme"
            :options="[
              { label: '浅色', value: 'light' },
              { label: '深色', value: 'dark' },
            ]"
            @change="onThemeChange"
          />
        </a-card>
      </a-col>
      <a-col :xs="24" :md="12">
        <a-card title="语言">
          <p class="settings__desc">选择界面语言（部分文案需刷新后生效）。</p>
          <a-segmented
            :value="i18n.locale"
            :options="[
              { label: '中文', value: 'zh-CN' },
              { label: 'English', value: 'en-US' },
            ]"
            @change="onLocaleChange"
          />
        </a-card>
      </a-col>
    </a-row>

    <a-card title="数据管理" class="settings__section">
      <p class="settings__desc">
        如需重新开始，可以清空本地收藏、分组等个性化数据。
      </p>
      <a-popconfirm
        title="清空本地数据？"
        ok-text="清空"
        cancel-text="取消"
        @confirm="resetProfile"
      >
        <a-button danger>重置本地配置</a-button>
      </a-popconfirm>
    </a-card>
  </section>
</template>
<script setup lang="ts">
import { useUiStore } from "@/stores/ui";
import { useI18nStore } from "@/stores/i18n";
import { useUserStore } from "@/stores/user";

const ui = useUiStore();
const i18n = useI18nStore();
const user = useUserStore();

function onThemeChange(val: "light" | "dark") {
  ui.toggleTheme(val);
  user.profile.theme = val;
  user.persist();
}

function onLocaleChange(val: "zh-CN" | "en-US") {
  i18n.setLocale(val);
  user.profile.locale = val;
  user.persist();
}

function resetProfile() {
  user.resetProfile();
}
</script>
<style lang="less" scoped>
.settings {
  &__desc {
    color: var(--muted);
    margin-bottom: 12px;
  }
  &__section {
    margin-top: 16px;
  }
}
</style>
