<template>
  <a-form-item :label="field.label">
    <a-select v-model:value="val" :options="field.options" allow-clear />
  </a-form-item>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  field: {
    key: string;
    label: string;
    options: { label: string; value: string }[];
  };
  value?: any;
}>();
const emit = defineEmits(["update:value"]);
const val = computed({
  get: () => props.value,
  set: (v) => emit("update:value", v),
});
</script>
