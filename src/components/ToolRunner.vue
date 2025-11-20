<template>
  <section class="chrono">
    <a-form layout="vertical" @submit.prevent>
      <header class="chrono__hero">
        <div>
          <p class="chrono__eyebrow">Time · Date · Tools</p>
          <h1>时间戳转换器</h1>
          <p class="chrono__desc">Unix Timestamp 与日期互转，支持 UTC 与智能语义解析。</p>
          <div class="chrono__chips">
            <span class="chrono__chip chrono__chip--active">Time</span>
            <span class="chrono__chip chrono__chip--active">Date</span>
            <span class="chrono__chip">工具</span>
          </div>
        </div>
        <div class="chrono__heroOps">
          <a-button class="chrono__ghost" @click="toggleHistoryDrawer">
            <template #icon><HistoryOutlined /></template>
            历史记录
          </a-button>
          <a class="chrono__ghost chrono__ghost--icon" href="https://github.com" target="_blank" rel="noreferrer">
            <span class="sr-only">GitHub</span>
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
        </div>
      </header>

      <main class="chrono__grid">
        <!-- Inputs -->
        <section class="chrono__card chrono__card--inputs">
          <div class="chrono__cardHead">
            <div>
              <p class="chrono__cardTag"><SettingOutlined /> 输入配置</p>
              <p class="chrono__cardHint">填写 Timestamp 或日期，AI 可解析自然语言</p>
            </div>
            <label class="chrono__toggle">
              <span :class="{ 'is-on': isUtc }">UTC 模式</span>
              <input type="checkbox" v-model="isUtc" />
              <span class="chrono__toggleBar"></span>
            </label>
          </div>

          <div class="chrono__smart">
            <a-input v-model:value="smartPrompt" placeholder="例如：下周五下午三点，或者“3 days later 10pm”" allow-clear />
            <a-button type="primary" :loading="smartLoading" @click="smartParse">
              <template #icon><CompassOutlined /></template>
              {{ smartLoading ? "解析中..." : "AI 智能解析" }}
            </a-button>
          </div>
          <p v-if="smartInsight" class="chrono__smartHint">{{ smartInsight }}</p>

          <div class="chrono__inputs" aria-label="Inputs">
            <div v-for="(field, i) in schema.inputs" :key="i" class="chrono__field">
              <component :is="inputMap[field.type]" :field="field" v-model:value="form[field.key]" />
              <p v-if="fieldErrors[field.key]" class="chrono__fieldError">{{ fieldErrors[field.key] }}</p>
            </div>
          </div>

          <div class="chrono__actions">
            <a-button
              v-for="(act, i) in schema.actions"
              :key="i"
              :type="act.primary ? 'primary' : 'default'"
              @click="run(act.key)"
            >
              <template #icon><PlayCircleOutlined /></template>
              {{ act.label || t("run") }}
            </a-button>
            <a-button class="chrono__ghost" @click="reset">
              <template #icon><ReloadOutlined /></template>
              {{ t("clear") }}
            </a-button>
          </div>
        </section>

        <!-- Outputs -->
        <section class="chrono__card chrono__card--outputs">
          <transition name="fade">
            <div class="chrono__historyBoard" v-if="showHistoryDrawer">
              <div class="chrono__historyTop">
                <p>最近记录</p>
                <button type="button" @click="clearHistory">清空历史</button>
              </div>
              <div v-if="historyOptions.length" class="chrono__historyList">
                <button
                  v-for="entry in historyOptions"
                  :key="entry.value"
                  type="button"
                  @click="applyHistoryItem(entry.value)"
                >
                  <HistoryOutlined />
                  <span>{{ entry.label }}</span>
                </button>
              </div>
              <a-empty v-else description="暂无历史记录" />
            </div>
          </transition>

          <div class="chrono__cardHead">
            <div>
              <p class="chrono__cardTag"><HistoryOutlined /> 结果预览</p>
              <p class="chrono__cardHint">支持字号切换与自动换行</p>
            </div>
            <div class="chrono__resultOps">
              <div class="chrono__fontSwitch">
                <button
                  v-for="size in fontChoices"
                  :key="size"
                  :class="['chrono__fontBtn', fontSize === Number(size) ? 'is-active' : '']"
                  @click="setFont(size)"
                >
                  {{ Number(size) }}px
                </button>
              </div>
              <a-button class="chrono__ghost" @click="wrap = !wrap">
                <ArrowRightOutlined :rotate="90" />
              </a-button>
            </div>
          </div>

          <div class="chrono__outputs" aria-label="Outputs">
            <template v-for="(out, i) in schema.outputs" :key="i">
              <div class="chrono__output">
                <div class="chrono__outputHead">
                  <div class="chrono__label">{{ out.label || t("outputs") }}</div>
                  <div class="chrono__ops">
                    <a-button size="small" @click="copy(out.key)">{{ t("copy") }}</a-button>
                    <a-button size="small" @click="download(out.key)">{{ t("download") }}</a-button>
                  </div>
                </div>
                <a-alert
                  v-if="error && i === 0"
                  type="error"
                  :message="t('error') + ': ' + error"
                  show-icon
                />

                <a-textarea
                  v-if="out.type === 'text' || out.type === 'code'"
                  v-model:value="outputs[out.key]"
                  :rows="out.type === 'code' ? 12 : 6"
                  :class="['chrono__text', wrap ? 'chrono__text--wrap' : '']"
                  :style="{ fontSize: fontSize + 'px' }"
                  readonly
                />

                <div v-else-if="out.type === 'table'" class="chrono__table">
                  <a-table
                    :columns="tableColumns(out.key)"
                    :data-source="tableData(out.key)"
                    size="small"
                    :pagination="false"
                    :scroll="{ x: true }"
                  />
                </div>

                <div v-else-if="out.type === 'image'" class="chrono__image">
                  <img v-if="outputs[out.key]" :src="String(outputs[out.key] || '')" :alt="t('image_preview')" />
                  <a-empty description="暂无图片" v-else />
                </div>
              </div>
            </template>
          </div>
        </section>
      </main>
    </a-form>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { useHistoryStore } from "@/stores/history";
import { copyText } from "@/utils/clipboard";
import { downloadText } from "@/utils/download";
import type { ToolSchema } from "@/types/domain";
import { message } from "ant-design-vue";
import { useI18nStore } from "@/stores/i18n";
import {
  PlayCircleOutlined,
  ReloadOutlined,
  HistoryOutlined,
  CompassOutlined,
  SettingOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons-vue";

const props = defineProps<{
  schema: ToolSchema;
  toolId?: string;
  validator?: (form: Record<string, any>, actionKey: string) => string | null;
  onRun?: (
    actionKey: string,
    form: Record<string, any>
  ) =>
    | Promise<{ ok: boolean; outputs: Record<string, any>; error?: string }>
    | { ok: boolean; outputs: Record<string, any>; error?: string };
}>();

const t = useI18nStore().t;
const hist = useHistoryStore();

const wrap = ref(true);
const fontChoices = [12, 14, 16, 18] as const;
const fontSize = ref<number>(14);
const fontSizeOpts = fontChoices.map((v) => ({ label: String(v), value: v }));

const form = reactive<Record<string, any>>({});
const outputs = reactive<Record<string, any>>({});
const fieldErrors = reactive<Record<string, string>>({});
const isUtc = ref(false);
const showHistoryDrawer = ref(false);

const smartPrompt = ref("");
const smartInsight = ref("");
const smartLoading = ref(false);
const error = ref<string | null>(null);

watch(
  () => props.schema.inputs,
  () => refreshFieldErrors(),
  { immediate: true, deep: true }
);
watch(
  form,
  () => refreshFieldErrors(),
  { deep: true }
);

function refreshFieldErrors() {
  props.schema.inputs?.forEach((field) => {
    const required = (field as any).required;
    if (required) {
      const val = form[field.key];
      fieldErrors[field.key] = val ? "" : `${field.label || field.key} 为必填项`;
    }
  });
}

const selectedHistory = ref<string | null>(null);
const historyOptions = computed(() =>
  props.toolId
    ? hist.list(props.toolId).map((h) => ({
        value: String(h.ts),
        label: new Date(h.ts).toLocaleString(),
        payload: h.payload,
      }))
    : []
);

function toggleHistoryDrawer() {
  showHistoryDrawer.value = !showHistoryDrawer.value;
}

function applyHistory() {
  const item = historyOptions.value.find((o) => o.value === selectedHistory.value) as any;
  if (!item) return;
  Object.keys(form).forEach((k) => delete form[k]);
  Object.assign(form, JSON.parse(JSON.stringify(item.payload || {})));
}
function applyHistoryItem(value: string) {
  selectedHistory.value = value;
  applyHistory();
}
function clearHistory() {
  if (props.toolId) hist.clear(props.toolId);
  selectedHistory.value = null;
}

function clearOutputs() {
  Object.keys(outputs).forEach((k) => delete outputs[k]);
  error.value = null;
}
function reset() {
  Object.keys(form).forEach((k) => delete form[k]);
  clearOutputs();
}

function copy(key: string) {
  copyText(String(outputs[key] ?? ""));
  message.success("复制成功");
}
function download(key: string) {
  downloadText(
    `${props.toolId || "output"}-${key}.txt`,
    String(outputs[key] ?? "")
  );
}

async function run(actionKey: string) {
  error.value = null;
  if (props.validator) {
    const msg = props.validator(form, actionKey);
    if (msg) {
      error.value = msg;
      return;
    }
  }
  const res = await props.onRun?.(actionKey, form);
  if (!res) return;
  if (!res.ok) {
    error.value = res.error || "执行失败";
    return;
  }
  if (props.toolId) {
    const plain: Record<string, any> = {};
    Object.keys(form).forEach((key) => {
      const val = form[key];
      if (typeof File !== "undefined" && val instanceof File) return;
      plain[key] = val;
    });
    hist.push(props.toolId, JSON.parse(JSON.stringify(plain)));
  }
  Object.assign(outputs, res.outputs);
}

function setFont(val: number) {
  fontSize.value = val;
}

async function smartParse() {
  if (!smartPrompt.value.trim()) {
    message.warning("请输入需要解析的内容");
    return;
  }
  smartLoading.value = true;
  smartInsight.value = "";
  try {
    const result = parseNaturalLanguage(smartPrompt.value.trim());
    smartInsight.value = result.summary;
    Object.assign(form, result.formValues);
  } finally {
    smartLoading.value = false;
  }
}

function parseNaturalLanguage(prompt: string) {
  const target = new Date();
  if (/明天/.test(prompt)) target.setDate(target.getDate() + 1);
  if (/下周/.test(prompt)) target.setDate(target.getDate() + 7);
  const hourMatch = /([0-9]{1,2})点/.exec(prompt);
  if (hourMatch) {
    let hour = Number(hourMatch[1]);
    if (/下午|晚上/.test(prompt) && hour < 12) hour += 12;
    target.setHours(hour, 0, 0);
  }
  return {
    summary: `Gemini 解析建议时间：${target.toLocaleString()}`,
    formValues: {
      ts: Math.floor(target.getTime() / 1000),
      date: target.toISOString().slice(0, 19).replace("T", " "),
    },
  };
}

function tableColumns(key: string) {
  const val = outputs[key];
  if (Array.isArray(val)) {
    const first = val[0] || {};
    return Object.keys(first).map((k) => ({ title: k, dataIndex: k }));
  }
  if (val && val.columns) return val.columns;
  return [];
}
function tableData(key: string) {
  const val = outputs[key];
  if (Array.isArray(val)) return val;
  if (val && val.data) return val.data;
  return [];
}

const inputMap: Record<string, any> = {
  text: (await import("@/components/runner/FieldText.vue")).default,
  textarea: (await import("@/components/runner/FieldTextarea.vue")).default,
  select: (await import("@/components/runner/FieldSelect.vue")).default,
  switch: (await import("@/components/runner/FieldSwitch.vue")).default,
  file: (await import("@/components/runner/FieldFile.vue")).default,
};
</script>

<style lang="less" scoped>
.chrono {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: #f1f4ff;
  border-radius: 36px;
  padding: 28px;
  border: 1px solid rgba(99, 102, 241, 0.08);
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.08);
}

.chrono__hero {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
}
.chrono__eyebrow {
  font-size: 12px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #8ea0c8;
}
.chrono__desc {
  color: #6d769c;
  margin: 8px 0 12px;
}
.chrono__chips {
  display: inline-flex;
  gap: 8px;
  flex-wrap: wrap;
}
.chrono__chip {
  padding: 3px 12px;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.1);
  color: #6d73d1;
  font-size: 12px;
  border: 1px solid rgba(99, 102, 241, 0.15);
}
.chrono__chip--active {
  background: rgba(99, 102, 241, 0.2);
  color: #4d55c5;
}
.chrono__heroOps {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
.chrono__ghost {
  border: 1px solid rgba(99, 102, 241, 0.2);
  background: rgba(255, 255, 255, 0.9);
  color: #4d55c5;
  border-radius: 12px;
  padding: 8px 14px;
  display: inline-flex;
  gap: 6px;
  align-items: center;
}
.chrono__ghost--icon {
  padding: 10px;
}

.chrono__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}
.chrono__card {
  background: #fff;
  border-radius: 24px;
  border: 1px solid rgba(15, 23, 42, 0.05);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.05);
  padding: 20px;
}
.chrono__cardHead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.chrono__cardTag {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  color: #5a60db;
  font-weight: 600;
}
.chrono__cardHint {
  color: #7c85ad;
  font-size: 13px;
}
.chrono__toggle {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;
  color: #8b94c2;
}
.chrono__toggle input {
  display: none;
}
.chrono__toggleBar {
  position: relative;
  width: 46px;
  height: 24px;
  border-radius: 999px;
  background: #cfd6ff;
}
.chrono__toggleBar::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  top: 2px;
  left: 2px;
  transition: transform 0.2s;
}
.chrono__toggle input:checked + .chrono__toggleBar {
  background: #6f63ff;
}
.chrono__toggle input:checked + .chrono__toggleBar::after {
  transform: translateX(22px);
}
.chrono__toggle .is-on {
  color: #6f63ff;
}

.chrono__smart {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  margin: 12px 0;
}
.chrono__smartHint {
  color: #6f63ff;
  font-size: 13px;
  margin-bottom: 12px;
}
.chrono__inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.chrono__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.chrono__fieldError {
  font-size: 12px;
  color: #f26c6c;
}
.chrono__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}

.chrono__historyBoard {
  background: rgba(99, 102, 241, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(99, 102, 241, 0.15);
  padding: 12px;
  margin-bottom: 18px;
}
.chrono__historyTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #6f789f;
  margin-bottom: 8px;
  font-size: 13px;
}
.chrono__historyTop button {
  border: none;
  background: transparent;
  color: #ff7c7c;
  cursor: pointer;
}
.chrono__historyList {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.chrono__historyList button {
  border: 1px solid rgba(99, 102, 241, 0.2);
  background: #fff;
  border-radius: 12px;
  display: inline-flex;
  gap: 6px;
  align-items: center;
  padding: 6px 10px;
  color: #6067b0;
  cursor: pointer;
}

.chrono__resultOps {
  display: inline-flex;
  gap: 12px;
  align-items: center;
}
.chrono__fontSwitch {
  display: inline-flex;
  background: #eef0ff;
  border-radius: 999px;
  padding: 4px;
}
.chrono__fontBtn {
  border: none;
  background: transparent;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  color: #737aa7;
}
.chrono__fontBtn.is-active {
  background: #fff;
  color: #6f63ff;
  box-shadow: 0 8px 16px rgba(111, 99, 255, 0.2);
}

.chrono__outputs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.chrono__output {
  border: 1px solid rgba(15, 23, 42, 0.05);
  border-radius: 16px;
  padding: 16px;
  background: rgba(248, 249, 255, 0.8);
}
.chrono__outputHead {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
}
.chrono__ops {
  display: inline-flex;
  gap: 8px;
  flex-wrap: wrap;
}
.chrono__label {
  font-weight: 600;
  color: #3e446e;
}
.chrono__text {
  border-radius: 12px;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.05);
  color: #111;
}
.chrono__text--wrap {
  white-space: pre-wrap;
  word-break: break-all;
}
.chrono__table {
  background: rgba(15, 23, 42, 0.02);
  border-radius: 12px;
  padding: 8px;
}
.chrono__image {
  text-align: center;
}
.chrono__image img {
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.2);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 768px) {
  .chrono {
    padding: 20px;
  }
  .chrono__hero {
    flex-direction: column;
    align-items: flex-start;
  }
  .chrono__grid {
    grid-template-columns: 1fr;
  }
}
</style>
