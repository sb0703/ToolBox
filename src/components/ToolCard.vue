<template>
  <a-card :title="tool.name" :hoverable="true" :bordered="true" class="tcard">
    <template #extra>
      <a-tag v-for="tg in tool.tags" :key="tg" class="tcard__tag">
        {{ tg }}
      </a-tag>
    </template>
    <p class="tcard__desc">{{ tool.summary }}</p>
    <div class="tcard__actions">
      <a-button type="primary" @click="goPrimary">
        {{ tool.type === "link" ? "访问" : "打开" }}
      </a-button>
      <a-button @click="togglePin">
        {{ isPinned ? "取消收藏" : "收藏" }}
      </a-button>
    </div>
  </a-card>
</template>
<script setup lang="ts">
import type { Tool } from "@/types/domain";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const props = defineProps<{ tool: Tool }>();
const user = useUserStore();
const isPinned = computed(() =>
  user.profile.pinnedToolIds.includes(props.tool.id)
);
const togglePin = () => user.togglePin(props.tool.id);
function goPrimary() {
  if (props.tool.type === "link" && props.tool.route) {
    window.open(props.tool.route, "_blank");
    return;
  }
  router.push({ name: "tool-detail", params: { toolId: props.tool.id } });
}
</script>
<style lang="less" scoped>
.tcard {
  &__tag {
    margin-left: 4px;
  }
  &__desc {
    min-height: 38px;
    color: var(--muted);
  }
  &__actions {
    display: flex;
    gap: 8px;
  }
}
</style>
