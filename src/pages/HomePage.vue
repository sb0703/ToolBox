<template>
  <section class="home container">
    <div class="home__search">
      <GlobalSearch />
    </div>

    <a-card title="最近使用" class="home__section">
      <a-empty
        v-if="!recentTools.length"
        description="暂无历史，去运行一个工具吧"
      />
      <a-row v-else :gutter="[16, 16]">
        <a-col
          v-for="tool in recentTools"
          :key="tool.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="8"
        >
          <ToolCard :tool="tool" />
        </a-col>
      </a-row>
    </a-card>

    <a-card title="常用收藏" class="home__section">
      <a-empty
        v-if="!pinnedTools.length"
        description="点击工具卡片中的“收藏”即可加入常用列表"
      />
      <a-row v-else :gutter="[16, 16]">
        <a-col
          v-for="tool in pinnedTools"
          :key="tool.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="8"
        >
          <ToolCard :tool="tool" />
        </a-col>
      </a-row>
    </a-card>

    <a-card title="推荐工具" class="home__section">
      <a-row :gutter="[16, 16]">
        <a-col
          v-for="tool in recommendedTools"
          :key="tool.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="8"
        >
          <ToolCard :tool="tool" />
        </a-col>
      </a-row>
    </a-card>
  </section>
</template>
<script setup lang="ts">
import { computed } from "vue";
import GlobalSearch from "@/components/GlobalSearch.vue";
import ToolCard from "@/components/ToolCard.vue";
import { useCatalogStore } from "@/stores/catalog";
import { useUserStore } from "@/stores/user";
import type { Tool } from "@/types/domain";

const catalog = useCatalogStore();
const user = useUserStore();

function mapIds(ids: string[]): Tool[] {
  return ids
    .map((id) => catalog.tools.find((t) => t.id === id))
    .filter((tool): tool is Tool => Boolean(tool));
}

const recentTools = computed(() => mapIds(user.profile.recentToolIds));
const pinnedTools = computed(() => mapIds(user.profile.pinnedToolIds));
const recommendedTools = computed(() => {
  const pinnedSet = new Set(user.profile.pinnedToolIds);
  const recentSet = new Set(user.profile.recentToolIds);
  return catalog.tools
    .filter((tool) => !pinnedSet.has(tool.id) && !recentSet.has(tool.id))
    .slice(0, 6);
});
</script>
<style lang="less" scoped>
.home {
  &__search {
    max-width: 720px;
    margin: 0 auto 16px;
  }
  &__section {
    margin-bottom: 16px;
  }
}
</style>
