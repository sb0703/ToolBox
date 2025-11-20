<template>
  <a-form-item :label="field.label">
    <a-input v-model:value="val" :placeholder="field.placeholder" />
  </a-form-item>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  field: { key: string; label: string; placeholder?: string };
  value?: any;
}>();
const emit = defineEmits(["update:value"]);
const val = computed({
  get: () => props.value,
  set: (v) => emit("update:value", v),
});
</script>
