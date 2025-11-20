<template>
  <section class="favorites container">
    <div class="favorites__head">
      <h1>收藏夹</h1>
      <div class="favorites__create">
        <a-input
          v-model:value="newGroupName"
          placeholder="新的分组名称"
          class="favorites__nameInput"
          @pressEnter="createGroup"
        />
        <a-button type="primary" @click="createGroup">新建分组</a-button>
      </div>
    </div>

    <a-card title="置顶工具" class="favorites__section">
      <a-empty
        v-if="!pinnedTools.length"
        description="暂无收藏，去工具页点击“收藏”吧"
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

    <a-card
      v-for="group in favoriteGroups"
      :key="group.id"
      class="favorites__section"
    >
      <template #title>
        <a-input
          v-model:value="localNames[group.id]"
          class="favorites__groupName"
          @blur="renameGroup(group.id)"
          @pressEnter="renameGroup(group.id)"
        />
      </template>
      <template #extra>
        <a-space>
          <a-select
            v-model:value="groupSelections[group.id]"
            placeholder="添加工具"
            :options="groupOptions(group)"
            show-search
            allow-clear
            style="width: 200px"
            @change="(val: string | null) => onAddTool(group.id, val)"
          />
          <a-popconfirm
            title="删除该分组？"
            ok-text="删除"
            cancel-text="取消"
            @confirm="removeGroup(group.id)"
          >
            <a-button type="text" danger>删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>

      <a-empty
        v-if="!groupTools(group).length"
        description="分组里还没有工具"
      />
      <a-row v-else :gutter="[16, 16]">
        <a-col
          v-for="tool in groupTools(group)"
          :key="tool.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="8"
        >
          <ToolCard :tool="tool" />
          <a-button
            type="text"
            danger
            block
            @click="removeToolFromGroup(group.id, tool.id)"
          >
            移出该分组
          </a-button>
        </a-col>
      </a-row>
    </a-card>
  </section>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useCatalogStore } from "@/stores/catalog";
import { useUserStore } from "@/stores/user";
import ToolCard from "@/components/ToolCard.vue";
import type { Tool } from "@/types/domain";

const catalog = useCatalogStore();
const user = useUserStore();

const newGroupName = ref("");
const groupSelections = reactive<Record<string, string | null>>({});
const localNames = reactive<Record<string, string>>({});

onMounted(() => {
  catalog.loadMock();
  syncNames();
});

watch(
  () => user.profile.favorites.map((g) => `${g.id}:${g.name}`).join("|"),
  () => syncNames()
);

const favoriteGroups = computed(() => user.profile.favorites);

const pinnedTools = computed(() =>
  user.profile.pinnedToolIds
    .map((id) => catalog.tools.find((t) => t.id === id))
    .filter((tool): tool is Tool => Boolean(tool))
);

function syncNames() {
  favoriteGroups.value.forEach((group) => {
    localNames[group.id] = group.name;
    if (!(group.id in groupSelections)) groupSelections[group.id] = null;
  });
}

function createGroup() {
  const name = newGroupName.value.trim();
  if (!name) return;
  const id = user.createFavoriteGroup(name);
  localNames[id] = name;
  groupSelections[id] = null;
  newGroupName.value = "";
}

function renameGroup(id: string) {
  const name = (localNames[id] || "").trim();
  if (!name) {
    localNames[id] = favoriteGroups.value.find((g) => g.id === id)?.name || "";
    return;
  }
  user.renameFavoriteGroup(id, name);
}

function removeGroup(id: string) {
  delete groupSelections[id];
  delete localNames[id];
  user.deleteFavoriteGroup(id);
}

function groupOptions(group: { toolIds: string[] }) {
  const used = new Set(group.toolIds);
  return catalog.tools
    .filter((tool) => !used.has(tool.id))
    .map((tool) => ({
      value: tool.id,
      label: `${tool.name} · ${tool.summary}`,
    }));
}

function groupTools(group: { toolIds: string[] }) {
  return group.toolIds
    .map((id) => catalog.tools.find((tool) => tool.id === id))
    .filter((tool): tool is Tool => Boolean(tool));
}

function onAddTool(groupId: string, toolId: string | null) {
  if (!toolId) return;
  user.addToolToFavorite(groupId, toolId);
  groupSelections[groupId] = null;
}

function removeToolFromGroup(groupId: string, toolId: string) {
  user.removeToolFromFavorite(groupId, toolId);
}
</script>
<style lang="less" scoped>
.favorites {
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }
  &__create {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  &__nameInput {
    width: 200px;
  }
  &__section {
    margin-bottom: 16px;
  }
  &__groupName {
    width: 240px;
  }
}
</style>
