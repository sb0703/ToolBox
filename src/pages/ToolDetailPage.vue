<template>
  <section class="detail container">
    <a-breadcrumb class="detail__crumb">
      <a-breadcrumb-item>
        <router-link to="/tools">工具</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>{{ tool?.name || "..." }}</a-breadcrumb-item>
    </a-breadcrumb>

    <a-skeleton :loading="!tool" active>
      <a-card v-if="tool?.schema" class="detail__runner detail__info">
        <Suspense>
          <ToolRunner
            :schema="tool.schema"
            :toolId="tool.id"
            :title="tool.name"
            :description="tool.summary"
            :chips="tool.tags"
            :presets="presetMap[tool.id]"
            :validator="validator"
            :onRun="onRun"
          />
        </Suspense>
      </a-card>
    </a-skeleton>
  </section>
</template>
<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useCatalogStore } from "@/stores/catalog";
import ToolRunner from "@/components/ToolRunner.vue";
import { formatJson } from "@/utils/json";
import { encodeBase64, decodeBase64 } from "@/utils/base64";
import { tsToDate, dateToTs } from "@/utils/time";
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
const user = useUserStore();

const presetMap: Record<string, { label: string; payload: Record<string, any> }[]> = {
  "json-formatter": [
    { label: "格式化示例", payload: { text: '{"foo":1,"bar":{"baz":true}}', compress: false } },
    { label: "压缩示例", payload: { text: '{\n  \"items\": [1,2,3]\n}', compress: true } },
  ],
  base64: [
    { label: "Base64 编码", payload: { text: "Hello, world!", mode: "encode" } },
    { label: "Base64 解码", payload: { text: "SGVsbG8sIHdvcmxkIQ==", mode: "decode" } },
  ],
  "regex-tester": [
    { label: "邮箱匹配", payload: { pattern: "\\w+@\\w+\\.\\w+", flags: "i", text: "test@demo.com" } },
    { label: "手机号", payload: { pattern: "^1\\d{10}$", flags: "", text: "13800138000" } },
  ],
};


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

type RunResult =
  | { ok: true; outputs: Record<string, any> }
  | { ok: false; outputs: Record<string, any>; error?: string };

const toolValidators: Record<string, (form: Record<string, any>, actionKey: string) => string | null> = {
  timestamp: (form, actionKey) => {
    if (actionKey === "ts_to_date" && (!form.ts || !/^\d{10,13}$/.test(String(form.ts)))) {
      return "时间戳应为 10 或 13 位数字";
    }
    if (actionKey === "date_to_ts") {
      if (!form.date) return "请输入日期";
      if (isNaN(new Date(form.date).getTime())) return "日期格式不正确";
    }
    return null;
  },
  "json-formatter": (form) => (!form.text || typeof form.text !== "string" ? "请输入 JSON 文本" : null),
  base64: (form) => (!form.text || typeof form.text !== "string" ? "请输入文本" : null),
  "color-picker": (form) => (!form.color ? "请输入颜色值" : null),
  "svg-editor": (form) => (!form.svg ? "请输入 SVG 内容" : null),
  "markdown-editor": (form) => (!form.text ? "请输入 Markdown 内容" : null),
  "word-count": (form) => (!form.text ? "请输入文本" : null),
  "image-compress": (form) => (!form.file ? "请选择图片文件" : null),
  "image-format": (form) => (!form.file ? "请选择图片文件" : null),
  "regex-tester": (form) => {
    if (!form.pattern) return "请输入正则表达式";
    if (form.flags && /[^gimsuy]/.test(form.flags)) return "Flags 仅支持 g i m s u y";
    return null;
  },
  "hash-generator": (form) => (!form.text ? "请输入需要计算的内容" : null),
  "qr-tool": (form, actionKey) => {
    if (actionKey === "generate" && !form.text) return "请输入要生成二维码的内容";
    if (actionKey === "decode" && !form.file) return "请上传二维码图片";
    return null;
  },
};

function validator(form: Record<string, any>, actionKey: string): string | null {
  if (!tool.value) return "工具不存在";
  const validate = toolValidators[tool.value.id];
  return validate ? validate(form, actionKey) : null;
}

const runners: Record<string, (actionKey: string, form: Record<string, any>) => Promise<RunResult> | RunResult> = {
  "json-formatter": (actionKey, form) => {
    const { text = "", compress = false } = form;
    const res = formatJson(text, compress);
    return res.ok ? { ok: true, outputs: { result: res.output } } : { ok: false, outputs: {}, error: res.error };
  },
  base64: (actionKey, form) => {
    const { text = "", mode = "encode" } = form;
    if (mode === "encode") return { ok: true, outputs: { result: encodeBase64(text) } };
    const r = decodeBase64(text);
    return r.ok ? { ok: true, outputs: { result: r.output } } : { ok: false, outputs: {}, error: r.error };
  },
  timestamp: (actionKey, form) => {
    const { ts = "", date = "", utc = false } = form;
    if (actionKey === "ts_to_date") return { ok: true, outputs: { result: tsToDate(ts, utc) } };
    if (actionKey === "date_to_ts") return { ok: true, outputs: { result: String(dateToTs(date, utc)) } };
    return { ok: false, outputs: {}, error: "未知操作" };
  },
  "regex-tester": (actionKey, form) => {
    const { pattern = "", flags = "", text = "" } = form;
    const res = runRegex(pattern, flags, text);
    if (!res.ok) return { ok: false, outputs: {}, error: res.error };
    return { ok: true, outputs: { result: res.summary, table: { columns: res.columns, data: res.data } } };
  },
  "hash-generator": async (actionKey, form) => {
    const { text = "", algorithm = "md5" } = form;
    const digest = await generateHash(text, algorithm);
    return digest.ok
      ? { ok: true, outputs: { result: digest.value } }
      : { ok: false, outputs: {}, error: digest.error };
  },
  "image-compress": async (actionKey, form) => {
    const { file, quality = "0.7", format = "image/jpeg" } = form;
    const res = await compressImage(file, { quality: Number(quality) || 0.7, format });
    return res.ok
      ? { ok: true, outputs: { img: res.dataUrl, result: res.meta } }
      : { ok: false, outputs: {}, error: res.error };
  },
  "image-format": async (actionKey, form) => {
    const { file, format = "image/png" } = form;
    const res = await convertImage(file, format);
    return res.ok
      ? { ok: true, outputs: { img: res.dataUrl, result: res.meta } }
      : { ok: false, outputs: {}, error: res.error };
  },
  "color-picker": (actionKey, form) => {
    const { color = "#1677ff" } = form;
    const palette = buildPalette(color);
    return { ok: true, outputs: { result: JSON.stringify(palette, null, 2) } };
  },
  "svg-editor": (actionKey, form) => {
    const { svg = "" } = form;
    const encoded = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    return { ok: true, outputs: { img: encoded, result: svg } };
  },
  "word-count": (actionKey, form) => {
    const { text = "" } = form;
    const summary = countWords(text);
    return { ok: true, outputs: { result: summary } };
  },
  "markdown-editor": (actionKey, form) => {
    const { text = "" } = form;
    const html = markdownToHtml(text);
    return { ok: true, outputs: { result: html } };
  },
  "table-converter": (actionKey, form) => {
    const { csv = "" } = form;
    const json = csvToJson(csv);
    return { ok: true, outputs: { result: json.json, table: { columns: json.columns, data: json.data } } };
  },
  "qr-tool": async (actionKey, form) => {
    if (actionKey === "generate") {
      const { text = "", size = 320 } = form;
      const res = await handleQrTask({ type: "generate", text, size: Number(size) || 320 });
      return res.ok
        ? { ok: true, outputs: { img: res.dataUrl, result: res.text } }
        : { ok: false, outputs: {}, error: res.error };
    }
    if (actionKey === "decode") {
      const { file } = form;
      const res = await handleQrTask({ type: "decode", file });
      return res.ok
        ? { ok: true, outputs: { result: res.text || "" } }
        : { ok: false, outputs: {}, error: res.error };
    }
    return { ok: false, outputs: {}, error: "未知操作" };
  },
  "unit-converter": (actionKey, form) => {
    const { value = "", from = "m", to = "km" } = form;
    const res = convertUnit(Number(value), from, to);
    return res.ok ? { ok: true, outputs: { result: res.text } } : { ok: false, outputs: {}, error: res.error };
  },
  "random-generator": (actionKey, form) => {
    const opts = {
      length: Number(form.length) || 12,
      includeNumbers: !!form.includeNumbers,
      includeSymbols: !!form.includeSymbols,
      includeLowercase: form.includeLowercase !== false,
      includeUppercase: !!form.includeUppercase,
    };
    const res = generateRandom(opts);
    return { ok: true, outputs: { result: res } };
  },
  "holiday-countdown": (actionKey, form) => {
    const res = getHolidayCountdown(form.holiday || "spring", form.customDate);
    return res.ok ? { ok: true, outputs: { result: res.text } } : { ok: false, outputs: {}, error: res.error };
  },
};

async function onRun(actionKey: string, form: Record<string, any>) {
  if (!tool.value) return { ok: false, outputs: {}, error: "工具不存在" };
  const handler = runners[tool.value.id];
  if (!handler) return { ok: false, outputs: {}, error: "暂未实现" };
  return handler(actionKey, form);
}
</script>
<style lang="less" scoped>
.detail {
  &__crumb {
    margin-bottom: 12px;
  }
  &__info {
    margin-bottom: 12px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.06), rgba(255, 255, 255, 0.92));
    border: 1px solid var(--border);
  }
  &__infoHead {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    flex-wrap: wrap;
  }
  &__eyebrow {
    margin: 0;
    font-size: 12px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--muted);
  }
  &__title {
    margin: 4px 0;
    font-size: 22px;
  }
  &__summary {
    color: var(--muted);
  }
  &__tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 8px;
  }
  &__actions {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }
  &__runner {
    border: 1px solid var(--border);
  }
}
</style>
