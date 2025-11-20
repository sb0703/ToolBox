<template>
  <div class="gsearch">
    <a-auto-complete
      v-model:value="search.query"
      class="gsearch__ac"
      :options="options"
      @select="onSelect"
      @search="onSearch"
    >
      <a-input-search
        placeholder="搜索工具、标签或分类"
        @search="goSearch"
        allow-clear
      />
    </a-auto-complete>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useSearchStore } from "@/stores/search";
import { useCatalogStore } from "@/stores/catalog";
import { writeSearchQuery } from "@/utils/query";

const router = useRouter();
const search = useSearchStore();
const catalog = useCatalogStore();

const options = computed(() => {
  const q = search.query.trim().toLowerCase();
  if (!q) return [];
  const toolOpts = catalog.tools
    .filter((t) =>
      [t.name, t.slug, ...t.tags].some((v) => v.toLowerCase().includes(q))
    )
    .slice(0, 8)
    .map((t) => ({ value: t.id, label: `🔧 ${t.name} · ${t.summary}` }));
  const tagOpts = catalog.tags
    .filter((tg) => tg.toLowerCase().includes(q))
    .slice(0, 5)
    .map((tg) => ({ value: `tag:${tg}`, label: `# ${tg}` }));
  return [...toolOpts, ...tagOpts];
});

function onSearch(val: string) {
  search.query = val;
}
function onSelect(val: string) {
  if (val.startsWith("tag:")) {
    search.tag = val.slice(4);
    router.push({ name: "tools" });
  } else {
    router.push({ name: "tool-detail", params: { toolId: val } });
  }
}
function goSearch() {
  router.push({ name: "search", query: writeSearchQuery({ q: search.query }) });
}
</script>
<style lang="less" scoped>
.gsearch {
  &__ac {
    width: 100%;
  }
}
</style>
