<template>
  <section class="category container">
    <a-breadcrumb class="category__crumb">
      <a-breadcrumb-item>
        <router-link to="/tools">全部工具</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        {{ category?.name || "分类" }}
      </a-breadcrumb-item>
    </a-breadcrumb>

    <a-card v-if="category" class="category__intro" :title="category.name">
      <p class="category__desc">
        {{ category.description || "该分类下的工具都在这里" }}
      </p>
    </a-card>

    <a-empty
      v-if="!category"
      description="未找到该分类，返回工具页试试吧"
    />

    <a-row v-else :gutter="[16, 16]">
      <a-col
        v-for="tool in tools"
        :key="tool.id"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="8"
      >
        <ToolCard :tool="tool" />
      </a-col>
    </a-row>

    <a-empty
      v-if="category && !tools.length"
      description="该分类下暂时没有工具"
      class="category__empty"
    />
  </section>
</template>
<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCatalogStore } from "@/stores/catalog";
import ToolCard from "@/components/ToolCard.vue";

const route = useRoute();
const catalog = useCatalogStore();

onMounted(() => catalog.loadMock());

const category = computed(() =>
  catalog.categories.find((c) => c.id === String(route.params.categoryId))
);

const tools = computed(() =>
  category.value
    ? catalog.tools.filter((tool) => tool.categoryId === category.value?.id)
    : []
);
</script>
<style lang="less" scoped>
.category {
  &__crumb {
    margin-bottom: 12px;
  }
  &__intro {
    margin-bottom: 16px;
  }
  &__desc {
    color: var(--muted);
    margin: 0;
  }
  &__empty {
    margin-top: 24px;
  }
}
</style>
