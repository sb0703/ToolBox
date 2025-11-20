<template>
  <section class="chrono">
    <a-form layout="vertical" @submit.prevent>
      <header class="chrono__hero">
        <div>
          <p class="chrono__tag">Unix Timestamp 与日期互转</p>
          <h1>时间戳转换器</h1>
          <p class="chrono__desc">
            支持 UTC 模式与自然语言解析，一键完成时间格式转换。
          </p>
          <div class="chrono__chips">
            <span class="chrono__chip chrono__chip--primary">Time</span>
            <span class="chrono__chip chrono__chip--primary">Date</span>
            <span class="chrono__chip">工具</span>
          </div>
        </div>
        <div class="chrono__heroOps">
          <a-button class="chrono__ghost" @click="toggleHistoryDrawer">
            <template #icon>
              <HistoryOutlined />
            </template>
            历史记录
          </a-button>
          <a
            class="chrono__ghost chrono__ghost--icon"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            <span class="sr-only">GitHub</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.6"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
              />
            </svg>
          </a>
        </div>
      </header>

      <main class="chrono__grid">
        <section class="chrono__card chrono__card--inputs">
          <div class="chrono__cardHead">
            <div>
              <p class="chrono__cardTag">
                <SettingOutlined />
                输入配置
              </p>
              <p class="chrono__cardHint">填写参数或输入自然语言，AI 自动解析</p>
            </div>
            <label class="chrono__toggle">
              <span>UTC 模式</span>
              <input type="checkbox" v-model="isUtc" />
              <span class="chrono__toggleBar"></span>
            </label>
          </div>

          <div class="chrono__smart">
            <a-input
              v-model:value="smartPrompt"
              placeholder="例如：下周五下午三点提醒我转换时区..."
              allow-clear
            />
            <a-button type="primary" :loading="smartLoading" @click="smartParse">
              <template #icon>
                <CompassOutlined />
              </template>
              {{ smartLoading ? "解析中..." : "AI 智能解析" }}
            </a-button>
          </div>
          <p v-if="smartInsight" class="chrono__smartHint">{{ smartInsight }}</p>

          <div class="chrono__inputs" aria-label="Inputs">
            <div
              v-for="(field, i) in schema.inputs"
              :key="i"
              class="chrono__field"
            >
              <component
                :is="inputMap[field.type]"
                :field="field"
                v-model:value="form[field.key]"
              />
              <p v-if="fieldErrors[field.key]" class="chrono__fieldError">
                {{ fieldErrors[field.key] }}
              </p>
            </div>
          </div>

          <div class="chrono__actions">
            <a-button
              v-for="(act, i) in schema.actions"
              :key="i"
              :type="act.primary ? 'primary' : 'default'"
              @click="run(act.key)"
            >
              <template #icon>
                <PlayCircleOutlined />
              </template>
              {{ act.label || t("run") }}
            </a-button>
            <a-button class="chrono__ghost" @click="reset">
              <template #icon>
                <ReloadOutlined />
              </template>
              {{ t("clear") }}
            </a-button>
          </div>
        </section>

        <section class="chrono__card chrono__card--outputs">
            <div class="chrono__historyBoard" v-if="showHistoryDrawer">
            <div class="chrono__historyTop">
              <p>最近记录</p>
              <a @click="clearHistory" role="button">清空历史</a>
            </div>
            <div v-if="historyEntries.length" class="chrono__historyList">
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
            <a-empty v-else description="暂无历史" />
          </div>

          <div class="chrono__cardHead">
            <div>
              <p class="chrono__cardTag">
                <HistoryOutlined />
                结果预览
              </p>
              <p class="chrono__cardHint">支持字号切换与自动换行</p>
            </div>
            <div class="chrono__resultOps">
              <div class="chrono__fontSwitch">
                <button
                  v-for="size in fontChoices"
                  :key="size"
                  :class="[
                    'chrono__fontBtn',
                    fontSize === Number(size) ? 'is-active' : ''
                  ]"
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
                    <a-button size="small" @click="copy(out.key)" aria-label="copy">
                      {{ t("copy") }}
                    </a-button>
                    <a-button
                      size="small"
                      @click="download(out.key)"
                      aria-label="download"
                    >
                      {{ t("download") }}
                    </a-button>
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
                  <img
                    v-if="outputs[out.key]"
                    :src="String(outputs[out.key] || '')"
                    :alt="t('image_preview')"
                  />
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
const fontChoices = [12, 14, 16] as const;
type FontChoice = (typeof fontChoices)[number];
const fontSize = ref<FontChoice>(14);
const fontSizeOpts = [12, 13, 14, 16, 18].map((v) => ({
  label: String(v),
  value: v,
}));

const error = ref<string | null>(null);
const form = reactive<Record<string, any>>({});
const outputs = reactive<Record<string, any>>({});

const fieldErrors = reactive<Record<string, string>>({});
const isUtc = ref(false);
const showHistoryDrawer = ref(false);

const smartPrompt = ref("");
const smartInsight = ref("");
const smartLoading = ref(false);

function setFont(val: number | string) {
  const parsed = Number(val) as FontChoice;
  fontSize.value = parsed;
}

function refreshFieldErrors() {
  props.schema.inputs?.forEach((field) => {
    const required = (field as any).required;
    if (required) {
      const val = form[field.key];
      fieldErrors[field.key] = val ? "" : `${field.label || field.key} 为必填项`;
    }
  });
}

watch(
  () => props.schema.inputs,
  () => refreshFieldErrors(),
  { deep: true, immediate: true }
);
watch(
  form,
  () => refreshFieldErrors(),
  { deep: true }
);
watch(
  () => form.utc,
  (val) => {
    if (typeof val === "boolean") isUtc.value = val;
  },
  { immediate: true }
);
watch(
  isUtc,
  (val) => {
    form.utc = val;
  }
);

function clearOutputs() {
  Object.keys(outputs).forEach((k) => delete outputs[k]);
  error.value = null;
}
function reset() {
  Object.keys(form).forEach((k) => delete form[k]);
  clearOutputs();
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
const historyEntries = computed(() => historyOptions.value.slice(0, 5));

function applyHistory() {
  const item = historyOptions.value.find(
    (o) => o.value === selectedHistory.value
  ) as any;
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

function toggleHistoryDrawer() {
  showHistoryDrawer.value = !showHistoryDrawer.value;
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

function parseNaturalLanguage(prompt: string) {
  const now = new Date();
  let target = new Date(now);
  const weekdays = {
    周一: 1,
    周二: 2,
    周三: 3,
    周四: 4,
    周五: 5,
    周六: 6,
    周日: 0,
  } as Record<string, number>;
  const weekMatch = /下周([一二三四五六日])/u.exec(prompt);
  if (weekMatch) {
    const weekdayKey = "周" + weekMatch[1];
    const weekday = weekdays[weekdayKey];
    const current = target.getDay();
    const delta = ((weekday + 7 - current) % 7) + 7;
    target.setDate(target.getDate() + delta);
  }
  const hourMatch = /([0-9]{1,2})点/;
  const hm = hourMatch.exec(prompt);
  if (hm) {
    let hour = Number(hm[1]);
    if (/下午|晚上/.test(prompt) && hour < 12) hour += 12;
    if (/凌晨/.test(prompt) && hour > 6) hour -= 12;
    target.setHours(hour, /半/.test(prompt) ? 30 : 0, 0);
  }
  if (/明天/.test(prompt)) target.setDate(now.getDate() + 1);
  if (/后天/.test(prompt)) target.setDate(now.getDate() + 2);

  return {
    summary: `Gemini 解析：建议时间 ${target.toLocaleString()}，可根据需要进一步调整。`,
    formValues: {
      ts: Math.floor(target.getTime() / 1000),
      date: target.toISOString().slice(0, 19).replace("T", " "),
    },
  };
}

async function smartParse() {
  if (!smartPrompt.value.trim()) {
    message.warning("请输入要解析的自然语言");
    return;
  }
  smartLoading.value = true;
  try {
    const res = parseNaturalLanguage(smartPrompt.value.trim());
    smartInsight.value = res.summary;
    Object.assign(form, res.formValues);
  } finally {
    smartLoading.value = false;
  }
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
  background: #f4f6ff;
  border-radius: 32px;
  padding: 28px;
  border: 1px solid rgba(102, 111, 255, 0.08);
  box-shadow: 0 25px 70px rgba(15, 23, 42, 0.08);

  &__hero {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
  }
  &__tag {
    font-size: 13px;
    color: #7f8ea3;
  }
  &__desc {
    color: #6b7497;
    margin-top: 6px;
  }
  &__chips {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }
  &__chip {
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid rgba(102, 111, 255, 0.15);
    color: #7a82b1;
    font-size: 12px;
  }
  &__chip--primary {
    background: rgba(119, 122, 255, 0.15);
    color: #5a60db;
  }
  &__heroOps {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
  }
  &__ghost {
    background: transparent;
    border: 1px solid rgba(90, 96, 219, 0.2);
    border-radius: 10px;
    padding: 6px 14px;
    color: #5a60db;
    display: inline-flex;
    gap: 6px;
    align-items: center;
  }
  &__ghost--icon {
    padding: 8px;
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 24px;
  }
  &__card {
    background: #fff;
    border-radius: 22px;
    padding: 20px;
    border: 1px solid rgba(15, 23, 42, 0.05);
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
  }
  &__cardHead {
    margin-bottom: 16px;
  }
  &__cardTag {
    display: flex;
    gap: 6px;
    align-items: center;
    font-weight: 600;
    color: #4c54b5;
  }
  &__cardHint {
    color: #8b94b5;
    font-size: 13px;
    margin-top: 4px;
  }
  &__toggle {
    position: relative;
    font-size: 13px;
    display: inline-flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;
    color: #7a82b1;
  }
  &__toggle input {
    display: none;
  }
  &__toggleBar {
    width: 40px;
    height: 20px;
    border-radius: 999px;
    background: #cdd2f8;
    position: relative;
  }
  &__toggleBar::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    top: 2px;
    left: 2px;
    transition: transform 0.2s;
  }
  &__toggle input:checked + .chrono__toggleBar {
    background: #6c63ff;
  }
  &__toggle input:checked + .chrono__toggleBar::after {
    transform: translateX(20px);
  }
  &__smart {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 12px;
  }
  &__smartHint {
    margin-bottom: 16px;
    color: #6c63ff;
    font-size: 13px;
  }
  &__inputs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
  }
  &__field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  &__fieldError {
    font-size: 12px;
    color: #ffb3b3;
  }
  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 16px;
  }
  &__historyBoard {
    background: rgba(101, 120, 255, 0.05);
    border-radius: 16px;
    border: 1px solid rgba(101, 120, 255, 0.1);
    padding: 12px;
    margin-bottom: 16px;
  }
  &__historyTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 13px;
    color: #6b7497;
  }
  &__historyTop a {
    color: #ff7979;
    cursor: pointer;
  }
  &__historyHeader {
    display: flex;
    gap: 6px;
    align-items: center;
    font-weight: 600;
    margin-bottom: 8px;
  }
  &__historyList {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  &__historyItem {
    display: inline-flex;
    gap: 6px;
    align-items: center;
    padding: 6px 10px;
    border-radius: 10px;
    border: 1px solid rgba(101, 120, 255, 0.2);
    background: rgba(255, 255, 255, 0.8);
    color: #4d5695;
    border: none;
    cursor: pointer;
  }
  &__historyItem:hover {
    background: rgba(99, 102, 241, 0.1);
  }
  &__ctrl {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    background: rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    border-radius: 16px;
    margin-bottom: 16px;
  }
  &__ctrlLeft {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
  }
  &__font {
    min-width: 180px;
  }
  &__outputs {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__output {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 16px;
  }
  &__outputHead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }
  &__ops {
    display: inline-flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  &__label {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
  }
  &__text {
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
  }
  &__text--wrap {
    white-space: pre-wrap;
    word-break: break-all;
  }
  &__image {
    text-align: center;
  }
  &__image img {
    max-width: 100%;
    border-radius: 12px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.35);
  }
  &__resultOps {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }
  &__fontSwitch {
    display: inline-flex;
    background: #eef0ff;
    border-radius: 999px;
    padding: 4px;
  }
  &__fontBtn {
    border: none;
    background: transparent;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 12px;
    color: #6b7497;
  }
  &__fontBtn.is-active {
    background: #fff;
    color: #5a60db;
    box-shadow: 0 4px 12px rgba(90, 96, 219, 0.2);
  }
  &__table {
    background: rgba(15, 23, 42, 0.02);
    border-radius: 12px;
    padding: 8px;
  }
}

[data-theme="light"] .chrono {
  background: #f7f8ff;
  color: #0f172a;
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
    &__hero {
      flex-direction: column;
      align-items: flex-start;
    }
    &__historySelect {
      width: 100%;
    }
    &__grid {
      grid-template-columns: 1fr;
    }
    &__ctrl {
      flex-direction: column;
      align-items: flex-start;
    }
    &__font {
      width: 100%;
    }
  }
}
</style>
