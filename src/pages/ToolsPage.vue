<template>
  <section class="tools container">
    <div class="tools__hero">
      <div>
        <p class="tools__eyebrow">Toolbox 2.0</p>
        <h1>超级实用工具箱</h1>
        <p class="tools__desc">
          囊括开发、设计、办公、生活的高频需求，开箱即用。
        </p>
      </div>
      <div class="tools__heroBar">
        <GlobalSearch class="tools__search" />
        <div class="tools__filters">
          <a-select
            v-model:value="search.categoryId"
            placeholder="按分类筛选"
            allow-clear
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
            placeholder="按标签筛选"
            allow-clear
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
          <a-button type="default" @click="goSearch">打开高级搜索</a-button>
        </div>
      </div>
    </div>

    <section v-for="section in sections" :key="section.id" class="tools__section">
      <div class="tools__sectionHead">
        <div>
          <h2>{{ section.name }}</h2>
          <p>{{ descriptions[section.id] }}</p>
        </div>
        <a-tag color="blue">{{ section.tools.length }} 个工具</a-tag>
      </div>
      <a-row :gutter="[20, 20]">
        <a-col
          v-for="tool in section.tools"
          :key="tool.id"
          :xs="24"
          :sm="12"
          :md="8"
        >
          <ToolCard :tool="tool" />
        </a-col>
      </a-row>
    </section>

    <a-empty
      v-if="!hasResults"
      description="暂未找到匹配的工具，请换个关键词试试"
      class="tools__empty"
    />
  </section>
</template>
<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useCatalogStore } from "@/stores/catalog";
import { useSearchStore } from "@/stores/search";
import { writeSearchQuery } from "@/utils/query";
import { useRouter } from "vue-router";
import ToolCard from "@/components/ToolCard.vue";
import GlobalSearch from "@/components/GlobalSearch.vue";

const catalog = useCatalogStore();
const search = useSearchStore();
const router = useRouter();

const descriptions: Record<string, string> = {
  dev: "开发者常备：格式化、加密、调试一站完成",
  design: "图像处理、配色、SVG 编辑，保持创意流动",
  office: "文档处理、统计转换，提升日常办公效率",
  life: "实用小工具，让生活与创作更轻松",
};

const sections = computed(() =>
  catalog.categories
    .filter((cat) => !search.categoryId || search.categoryId === cat.id)
    .map((cat) => ({
      ...cat,
      tools: search.results.filter((tool) => tool.categoryId === cat.id),
    }))
    .filter((cat) => cat.tools.length)
);

const hasResults = computed(() => search.results.length > 0);

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
  display: flex;
  flex-direction: column;
  gap: 32px;

  &__hero {
    padding: 32px;
    border-radius: 24px;
    background: radial-gradient(circle at top left, #111c44, #0f161e);
    color: #fff;
  }
  &__eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.3em;
    font-size: 12px;
    margin-bottom: 8px;
    color: rgba(255, 255, 255, 0.6);
  }
  &__desc {
    color: rgba(255, 255, 255, 0.75);
    margin-bottom: 20px;
  }
  &__heroBar {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__search {
    width: 100%;
  }
  &__filters {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  &__filters .ant-select,
  &__filters .ant-segmented {
    min-width: 160px;
  }
  &__section {
    padding: 24px 28px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
    border: 1px solid rgba(15, 23, 42, 0.08);
  }
  &__sectionHead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  &__empty {
    margin: 40px auto 0;
  }
}

[data-theme="dark"] .tools__section {
  background: rgba(15, 23, 42, 0.75);
  border-color: rgba(255, 255, 255, 0.06);
}
</style>
