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
        <div v-if="tool.type === 'link' && tool.route" class="detail__link">
          <a-button type="primary" @click="openLink">访问外部工具</a-button>
        </div>
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
            :title="tool.name"
            :description="tool.summary"
            :chips="tool.tags"
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
import { runRegex } from "@/utils/regex";
import { generateHash } from "@/utils/hash";
import { compressImage, convertImage } from "@/utils/image";
import { buildPalette } from "@/utils/color";
import { markdownToHtml } from "@/utils/markdown";
import { countWords } from "@/utils/text";
import { csvToJson } from "@/utils/table";
import { generateRandom } from "@/utils/random";
import { convertUnit } from "@/utils/unit";
import { getHolidayCountdown } from "@/utils/holiday";
import { handleQrTask } from "@/utils/qrcode";
import { useUserStore } from "@/stores/user";

const route = useRoute();
const catalog = useCatalogStore();
const i18n = useI18nStore();
const user = useUserStore();

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
function openLink() {
  if (tool.value?.route) window.open(tool.value.route, "_blank");
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
  if (tool.value.id === "color-picker" && !form.color) {
    return "请输入颜色值";
  }
  if (tool.value.id === "svg-editor" && !form.svg) {
    return "请输入 SVG 内容";
  }
  if (tool.value.id === "markdown-editor" && !form.text) {
    return "请输入 Markdown 内容";
  }
  if (tool.value.id === "word-count" && !form.text) {
    return "请输入文本";
  }
  if (
    ["image-compress", "image-format"].includes(tool.value.id) &&
    !form.file
  ) {
    return "请选择图片文件";
  }
  if (tool.value.id === "regex-tester") {
    if (!form.pattern) return "请输入正则表达式";
    if (form.flags && /[^gimsuy]/.test(form.flags))
      return "Flags 只能为 g i m s u y";
  }
  if (tool.value.id === "hash-generator" && !form.text) {
    return "请输入需要计算的内容";
  }
  if (tool.value.id === "qr-tool") {
    if (actionKey === "generate" && !form.text) return "请输入要生成二维码的内容";
    if (actionKey === "decode" && !form.file) return "请上传二维码图片";
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
  }

  if (!tool.value) return { ok: false, outputs: {}, error: "工具不存在" };
  switch (tool.value.id) {
    case "regex-tester": {
      const { pattern = "", flags = "", text = "" } = form;
      const res = runRegex(pattern, flags, text);
      if (!res.ok) return { ok: false, outputs: {}, error: res.error };
      return {
        ok: true,
        outputs: {
          result: res.summary,
          table: { columns: res.columns, data: res.data },
        },
      };
    }
    case "hash-generator": {
      const { text = "", algorithm = "md5" } = form;
      const digest = await generateHash(text, algorithm);
      if (!digest.ok) return { ok: false, outputs: {}, error: digest.error };
      return { ok: true, outputs: { result: digest.value } };
    }
    case "image-compress": {
      const { file, quality = "0.7", format = "image/jpeg" } = form;
      const res = await compressImage(file, {
        quality: Number(quality) || 0.7,
        format,
      });
      if (!res.ok) return { ok: false, outputs: {}, error: res.error };
      return {
        ok: true,
        outputs: { img: res.dataUrl, result: res.meta },
      };
    }
    case "image-format": {
      const { file, format = "image/png" } = form;
      const res = await convertImage(file, format);
      if (!res.ok) return { ok: false, outputs: {}, error: res.error };
      return {
        ok: true,
        outputs: { img: res.dataUrl, result: res.meta },
      };
    }
    case "color-picker": {
      const { color = "#1677ff" } = form;
      const palette = buildPalette(color);
      return { ok: true, outputs: { result: JSON.stringify(palette, null, 2) } };
    }
    case "svg-editor": {
      const { svg = "" } = form;
      const encoded = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        svg
      )}`;
      return { ok: true, outputs: { img: encoded, result: svg } };
    }
    case "word-count": {
      const { text = "" } = form;
      const summary = countWords(text);
      return { ok: true, outputs: { result: summary } };
    }
    case "markdown-editor": {
      const { text = "" } = form;
      const html = markdownToHtml(text);
      return { ok: true, outputs: { result: html } };
    }
    case "table-converter": {
      const { csv = "" } = form;
      const json = csvToJson(csv);
      return {
        ok: true,
        outputs: {
          result: json.json,
          table: { columns: json.columns, data: json.data },
        },
      };
    }
    case "qr-tool": {
      if (actionKey === "generate") {
        const { text = "", size = 320 } = form;
        const res = await handleQrTask({
          type: "generate",
          text,
          size: Number(size) || 320,
        });
        if (!res.ok) return { ok: false, outputs: {}, error: res.error };
        return { ok: true, outputs: { img: res.dataUrl, result: res.text } };
      }
      if (actionKey === "decode") {
        const { file } = form;
        const res = await handleQrTask({ type: "decode", file });
        if (!res.ok) return { ok: false, outputs: {}, error: res.error };
        return { ok: true, outputs: { result: res.text || "" } };
      }
      break;
    }
    case "unit-converter": {
      const { value = "", from = "m", to = "km" } = form;
      const res = convertUnit(Number(value), from, to);
      if (!res.ok) return { ok: false, outputs: {}, error: res.error };
      return { ok: true, outputs: { result: res.text } };
    }
    case "random-generator": {
      const opts = {
        length: Number(form.length) || 12,
        includeNumbers: !!form.includeNumbers,
        includeSymbols: !!form.includeSymbols,
        includeLowercase: form.includeLowercase !== false,
        includeUppercase: !!form.includeUppercase,
      };
      const res = generateRandom(opts);
      return { ok: true, outputs: { result: res } };
    }
    case "holiday-countdown": {
      const res = getHolidayCountdown(form.holiday || "spring", form.customDate);
      if (!res.ok) return { ok: false, outputs: {}, error: res.error };
      return { ok: true, outputs: { result: res.text } };
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
