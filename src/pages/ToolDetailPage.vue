<template>
  <section class="detail container">
    <a-breadcrumb class="detail__crumb">
      <a-breadcrumb-item>
        <router-link to="/tools">工具</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>{{ tool?.name || "..." }}</a-breadcrumb-item>
    </a-breadcrumb>

    <a-skeleton :loading="!tool" active>
      <a-card v-if="tool" :title="tool.name" class="detail__card">
        <template #extra>
          <a-button type="text" @click="togglePin">
            {{ isPinned ? "取消收藏" : "收藏" }}
          </a-button>
        </template>
        <p class="detail__summary">{{ tool.summary }}</p>
        <a-tag v-for="tg in tool.tags" :key="tg" class="detail__tag">
          {{ tg }}
        </a-tag>
        <div class="detail__i18n">
          <a-segmented
            v-model:value="i18n.locale"
            :options="[
              { label: '中文', value: 'zh-CN' },
              { label: 'English', value: 'en-US' },
            ]"
          />
        </div>
      </a-card>
      <a-card v-if="tool?.schema" title="运行">
        <Suspense>
          <ToolRunner
            :schema="tool.schema"
            :toolId="tool.id"
            :validator="validator"
            :onRun="onRun"
          />
        </Suspense>
      </a-card>
    </a-skeleton>
  </section>
</template>
<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useCatalogStore } from "@/stores/catalog";
import ToolRunner from "@/components/ToolRunner.vue";
import { formatJson } from "@/utils/json";
import { encodeBase64, decodeBase64 } from "@/utils/base64";
import { tsToDate, dateToTs } from "@/utils/time";
import { useI18nStore } from "@/stores/i18n";
import { parseCsv } from "@/utils/csv";
import { useUserStore } from "@/stores/user";

const route = useRoute();
const catalog = useCatalogStore();
const i18n = useI18nStore();
const user = useUserStore();
const t = i18n.t;

onMounted(() => catalog.loadMock());

const tool = computed(() =>
  catalog.tools.find((t) => t.id === String(route.params.toolId))
);

watch(
  () => tool.value?.id,
  (id) => {
    if (id) user.addRecent(id);
  },
  { immediate: true }
);

const isPinned = computed(() =>
  tool.value ? user.profile.pinnedToolIds.includes(tool.value.id) : false
);

function togglePin() {
  if (!tool.value) return;
  user.togglePin(tool.value.id);
}

function validator(
  form: Record<string, any>,
  actionKey: string
): string | null {
  if (!tool.value) return "工具不存在";
  if (tool.value.id === "timestamp") {
    if (actionKey === "ts_to_date") {
      if (!form.ts || !/^\d{10,13}$/.test(String(form.ts)))
        return "时间戳应为 10 或 13 位数字";
    }
    if (actionKey === "date_to_ts") {
      if (!form.date) return "请输入日期";
      if (isNaN(new Date(form.date).getTime())) return "日期格式不正确";
    }
  }
  if (tool.value.id === "json-formatter") {
    if (!form.text || typeof form.text !== "string") return "请输入 JSON 文本";
  }
  if (tool.value.id === "base64") {
    if (!form.text || typeof form.text !== "string") return "请输入文本";
  }
  if (tool.value.id === "csv-preview") {
    if (!form.csv) return "请输入 CSV 文本";
  }
  if (tool.value.id === "image-viewer") {
    if (!form.src) return "请输入图片地址或 Base64";
  }
  return null;
}

async function onRun(actionKey: string, form: Record<string, any>) {
  if (!tool.value) return { ok: false, outputs: {}, error: "工具不存在" };
  switch (tool.value.id) {
    case "json-formatter": {
      const { text = "", compress = false } = form;
      const res = formatJson(text, compress);
      return res.ok
        ? { ok: true, outputs: { result: res.output } }
        : { ok: false, outputs: {}, error: res.error };
    }
    case "base64": {
      const { text = "", mode = "encode" } = form;
      if (mode === "encode")
        return { ok: true, outputs: { result: encodeBase64(text) } };
      const r = decodeBase64(text);
      return r.ok
        ? { ok: true, outputs: { result: r.output } }
        : { ok: false, outputs: {}, error: r.error };
    }
    case "timestamp": {
      const { ts = "", date = "", utc = false } = form;
      if (actionKey === "ts_to_date")
        return { ok: true, outputs: { result: tsToDate(ts, utc) } };
      if (actionKey === "date_to_ts")
        return { ok: true, outputs: { result: String(dateToTs(date, utc)) } };
      return { ok: false, outputs: {}, error: "未知操作" };
    }
    case "csv-preview": {
      const { csv = "" } = form;
      const table = parseCsv(csv);
      return { ok: true, outputs: { table } };
    }
    case "image-viewer": {
      const { src = "" } = form;
      return { ok: true, outputs: { img: String(src) } };
    }
  }
  return { ok: false, outputs: {}, error: "暂未实现" };
}
</script>
<style lang="less" scoped>
.detail {
  &__crumb {
    margin-bottom: 12px;
  }
  &__card {
    margin-bottom: 12px;
  }
  &__meta {
    display: grid;
    gap: 8px;
  }
  &__summary {
    color: var(--muted);
  }
  &__tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  &__i18n {
    margin-top: 8px;
  }
}
</style>
