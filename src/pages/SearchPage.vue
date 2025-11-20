<template>
  <section class="search container">
    <div class="search__bar">
      <a-input
        v-model:value="search.query"
        placeholder="搜索关键词"
        class="search__q"
        allow-clear
      />
      <a-select
        v-model:value="search.categoryId"
        placeholder="分类"
        allow-clear
        class="search__filter"
      >
        <a-select-option
          v-for="c in catalog.categories"
          :key="c.id"
          :value="c.id"
          >{{ c.name }}</a-select-option
        >
      </a-select>
      <a-select
        v-model:value="search.tag"
        placeholder="标签"
        allow-clear
        class="search__filter"
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
      <a-button type="primary" @click="apply">搜索</a-button>
    </div>

    <div class="search__meta" v-if="metaText">{{ metaText }}</div>

    <a-row :gutter="[12, 12]">
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
      description="没有匹配的结果"
      class="search__empty"
    />
  </section>
</template>
<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCatalogStore } from "@/stores/catalog";
import { useSearchStore } from "@/stores/search";
import ToolCard from "@/components/ToolCard.vue";
import { readSearchQuery, writeSearchQuery } from "@/utils/query";

const catalog = useCatalogStore();
const search = useSearchStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  catalog.loadMock();
  search.setAll(readSearchQuery(new URLSearchParams(route.query as any)));
});

watch(
  () => route.query,
  (q) => {
    search.setAll(readSearchQuery(new URLSearchParams(q as any)));
  }
);

function apply() {
  router.replace({
    name: "search",
    query: writeSearchQuery({
      q: search.query,
      tag: search.tag || undefined,
      category: search.categoryId || undefined,
      sort: search.sort,
    }),
  });
}

const metaText = computed(() => {
  const segs: string[] = [];
  if (search.query) segs.push(`关键词：${search.query}`);
  if (search.tag) segs.push(`标签：${search.tag}`);
  if (search.categoryId)
    segs.push(
      `分类：${
        catalog.categories.find((c) => c.id === search.categoryId)?.name
      }`
    );
  return segs.join(" · ");
});
</script>
<style lang="less" scoped>
.search {
  &__bar {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 12px;
  }
  &__q {
    flex: 1;
    min-width: 260px;
  }
  &__filter {
    width: 160px;
  }
  &__meta {
    color: var(--muted);
    margin-bottom: 12px;
  }
  &__empty {
    margin-top: 32px;
  }
}
</style>
