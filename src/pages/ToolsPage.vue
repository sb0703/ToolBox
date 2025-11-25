<template>
  <section class="tools container">
    <div class="tools__hero">
      <div class="tools__heroLeft">
        <p class="tools__eyebrow">Toolbox 2.0</p>
        <h1>超感·智能工具集</h1>
        <p class="tools__desc">
          面向开发、设计、办公与生活的精选工具，支持快捷搜索、标签筛选与高级检索。
        </p>
        <div class="tools__chips">
          <span>预置 40+ 工具</span>
          <span>语义解析</span>
          <span>收藏与历史</span>
        </div>
      </div>
      <div class="tools__heroRight">
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
      description="暂未找到匹配的工具，换个关键词试试"
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
  dev: "开发者常用：格式化、加密解密、正则/哈希一步到位。",
  design: "设计与图片：压缩、格式转换、配色与 SVG 预览。",
  office: "办公协同：PDF、字数统计、Markdown、表格转换等。",
  life: "生活实用：二维码、单位换算、随机数、节日倒计时。",
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 18px;
    padding: 28px 32px;
    border-radius: 28px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(255, 255, 255, 0.92));
    border: 1px solid rgba(99, 102, 241, 0.16);
    box-shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
    color: #0f172a;
  }
  &__eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.3em;
    font-size: 12px;
    margin-bottom: 8px;
    color: #6f7ab8;
  }
  &__heroLeft {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__desc {
    color: #4b5563;
    margin: 0;
  }
  &__chips {
    display: inline-flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  &__chips span {
    padding: 4px 12px;
    border-radius: 999px;
    background: rgba(99, 102, 241, 0.12);
    color: #4d55c5;
    border: 1px solid rgba(99, 102, 241, 0.18);
    font-size: 12px;
  }
  &__heroRight {
    background: rgba(255, 255, 255, 0.76);
    border: 1px solid rgba(15, 23, 42, 0.05);
    border-radius: 18px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
  }
  &__search {
    width: 100%;
  }
  &__filters {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
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