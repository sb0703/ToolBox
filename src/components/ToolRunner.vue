<template>
  <div class="runner">
    <a-form layout="vertical" @submit.prevent>
      <div class="runner__bar" aria-label="History Bar">
        <a-select
          class="runner__history"
          v-model:value="selectedHistory"
          :options="historyOptions"
          :placeholder="t('history_input')"
          allow-clear
        >
          <template #option="opt"
            ><span>{{ opt.label }}</span></template
          >
        </a-select>
        <a-space>
          <a-button @click="applyHistory" :disabled="!selectedHistory">
            {{ t("load") }}
          </a-button>
          <a-popconfirm
            :title="t('confirm_clear_history')"
            :ok-text="t('clear')"
            :cancel-text="t('cancel')"
            @confirm="clearHistory"
          >
            <a-button danger>{{ t("clear_history") }}</a-button>
          </a-popconfirm>
        </a-space>
      </div>
      <!-- 输入区 -->
      <div class="runner__inputs" aria-label="Inputs">
        <component
          v-for="(field, i) in schema.inputs"
          :key="i"
          :is="inputMap[field.type]"
          :field="field"
          v-model:value="form[field.key]"
        />
      </div>

      <!-- 动作区 -->
      <div class="runner__actions" aria-label="Actions">
        <a-button
          v-for="(act, i) in schema.actions"
          :key="i"
          :type="act.primary ? 'primary' : 'default'"
          @click="run(act.key)"
        >
          {{ act.label || t("run") }}
        </a-button>
        <a-button class="runner__btn" @click="reset">{{ t("clear") }}</a-button>
      </div>

      <!-- 输出控制条 -->
      <div class="runner__ctrl" aria-label="Outputs Controls">
        <div class="runner__ctrlLeft">
          <a-switch
            v-model:checked="wrap"
            :checked-children="t('word_wrap')"
            :un-checked-children="t('word_wrap')"
            aria-label="word-wrap"
          />
          <a-segmented
            v-model:value="fontSize"
            :options="fontSizeOpts"
            class="runner__font"
            aria-label="font-size"
          />
        </div>
        <a-space>
          <a-button @click="clearOutputs">{{ t("reset_outputs") }}</a-button>
        </a-space>
      </div>
      <!-- 输出区 -->
      <div class="runner__outputs" aria-label="Outputs">
        <template v-for="(out, i) in schema.outputs" :key="i">
          <div class="runner__output">
            <div class="runner__outputHead">
              <div class="runner__label">{{ out.label || t("outputs") }}</div>
              <div class="runner__ops">
                <a-button
                  size="small"
                  @click="copy(out.key)"
                  aria-label="copy"
                  >{{ t("copy") }}</a-button
                >
                <a-button
                  size="small"
                  @click="download(out.key)"
                  aria-label="download"
                  >{{ t("download") }}</a-button
                >
              </div>
            </div>
            <a-alert
              v-if="error && i === 0"
              type="error"
              :message="t('error') + ': ' + error"
              show-icon
            />

            <!-- 文本/代码输出 -->
            <a-textarea
              v-if="out.type === 'text' || out.type === 'code'"
              v-model:value="outputs[out.key]"
              :rows="out.type === 'code' ? 12 : 6"
              :class="['runner__text', wrap ? 'runner__text--wrap' : '']"
              :style="{ fontSize: fontSize + 'px' }"
              readonly
            />

            <!-- 表格输出：outputs[out.key] = { columns: Array, data: Array } 或 Array<Record<string,any>> -->
            <div v-else-if="out.type === 'table'" class="runner__table">
              <a-table
                :columns="tableColumns(out.key)"
                :data-source="tableData(out.key)"
                size="small"
                :pagination="false"
                :scroll="{ x: true }"
              />
            </div>

            <!-- 图片输出：outputs[out.key] = base64 或 url -->
            <div v-else-if="out.type === 'image'" class="runner__image">
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
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useHistoryStore } from "@/stores/history";
import { copyText } from "@/utils/clipboard";
import { downloadText } from "@/utils/download";
import type { ToolSchema } from "@/types/domain";
import { message } from "ant-design-vue";
import { useI18nStore } from "@/stores/i18n";

const props = defineProps<{
  schema: ToolSchema;
  toolId?: string; // 用于历史记录分桶
  validator?: (form: Record<string, any>, actionKey: string) => string | null; // 轻校验
  onRun?: (
    actionKey: string,
    form: Record<string, any>
  ) =>
    | Promise<{ ok: boolean; outputs: Record<string, any>; error?: string }>
    | { ok: boolean; outputs: Record<string, any>; error?: string };
}>();
const t = useI18nStore().t;
const hist = useHistoryStore();
// 输出控制
const wrap = ref(true);
const fontSize = ref(13);
const fontSizeOpts = [12, 13, 14, 16, 18].map((v) => ({
  label: String(v),
  value: v,
}));

const error = ref<string | null>(null);
const form = reactive<Record<string, any>>({});
const outputs = reactive<Record<string, any>>({});

// 运行
function clearOutputs() {
  Object.keys(outputs).forEach((k) => delete outputs[k]);
  error.value = null;
}
function reset() {
  Object.keys(form).forEach((k) => delete form[k]);
  clearOutputs();
}
// 历史
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
function applyHistory() {
  const item = historyOptions.value.find(
    (o) => o.value === selectedHistory.value
  ) as any;
  if (!item) return;
  Object.keys(form).forEach((k) => delete form[k]);
  Object.assign(form, JSON.parse(JSON.stringify(item.payload || {})));
}
function clearHistory() {
  if (props.toolId) hist.clear(props.toolId);
  selectedHistory.value = null;
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
  // 持久化本次输入
  if (props.toolId) hist.push(props.toolId, JSON.parse(JSON.stringify(form)));
  Object.assign(outputs, res.outputs);
}
// 表格输出适配：支持 [{...}] 或 {columns,data}
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
// 输入控件映射
const inputMap: Record<string, any> = {
  text: (await import("@/components/runner/FieldText.vue")).default,
  textarea: (await import("@/components/runner/FieldTextarea.vue")).default,
  select: (await import("@/components/runner/FieldSelect.vue")).default,
  switch: (await import("@/components/runner/FieldSwitch.vue")).default,
  file: (await import("@/components/runner/FieldFile.vue")).default,
};
</script>
<style lang="less" scoped>
.runner {
  &__inputs {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }
  &__actions {
    display: flex;
    gap: 8px;
    margin: 12px 0;
    flex-wrap: wrap;
  }
  &__outputs {
    display: grid;
    gap: 12px;
  }
  &__outputHead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 4px;
    gap: 12px;
  }
  &__ops {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    margin: -4px;
  }
  &__ops .ant-btn {
    margin: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.2s ease;
  }
  &__ops .ant-btn:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }
  &__label {
    color: var(--muted);
    margin-bottom: 6px;
  }
  &__history {
    margin-right: 10px;
    width: 200px;
  }
}
</style>
