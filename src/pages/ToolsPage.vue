<template>
  <section class="tools container">
    <div class="tools__bar">
      <GlobalSearch class="tools__search" />
      <a-select
        v-model:value="search.categoryId"
        placeholder="分类"
        allow-clear
        class="tools__filter"
      >
        <a-select-option
          v-for="c in catalog.categories"
          :key="c.id"
          :value="c.id"
        >
          {{ c.name }}
        </a-select-option>
      </a-select>
      <a-select
        v-model:value="search.tag"
        placeholder="标签"
        allow-clear
        class="tools__filter"
      >
        <a-select-option v-for="tg in catalog.tags" :key="tg" :value="tg">
          {{ tg }}
        </a-select-option>
      </a-select>
      <a-segmented
        v-model:value="search.sort"
        :options="[
          { label: 'A-Z', value: 'az' },
          { label: '最近', value: 'recent' },
        ]"
      />
      <a-button type="default" @click="goSearch">前往搜索页</a-button>
    </div>

    <a-row :gutter="[16, 16]">
      <a-col
        v-for="t in search.results"
        :key="t.id"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="8"
      >
        <ToolCard :tool="t" />
      </a-col>
    </a-row>

    <a-empty
      v-if="!search.results.length"
      description="没有找到匹配的工具"
      class="tools__empty"
    />
  </section>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useCatalogStore } from "@/stores/catalog";
import { useSearchStore } from "@/stores/search";
import { writeSearchQuery } from "@/utils/query";
import { useRouter } from "vue-router";

import ToolCard from "@/components/ToolCard.vue";
import GlobalSearch from "@/components/GlobalSearch.vue";
const catalog = useCatalogStore();
const search = useSearchStore();
const router = useRouter();
function goSearch() {
  router.push({
    name: "search",
    query: writeSearchQuery({
      q: search.query,
      tag: search.tag || undefined,
      category: search.categoryId || undefined,
      sort: search.sort,
    }),
  });
}
onMounted(() => {
  catalog.loadMock();
});
</script>
<style lang="less" scoped>
.tools {
  &__bar {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }
  &__search {
    flex: 1;
    min-width: 260px;
  }
  &__filter {
    width: 160px;
  }
  &__empty {
    margin-top: 32px;
  }
}
</style>
