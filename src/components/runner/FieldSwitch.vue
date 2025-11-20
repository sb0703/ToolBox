<template>
  <a-form-item :label="field.label">
    <a-switch v-model:checked="checked" />
  </a-form-item>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  field: { key: string; label: string; default?: boolean };
  value?: any;
}>();
const emit = defineEmits(["update:value"]);
const checked = computed({
  get: () => props.value ?? props.field.default ?? false,
  set: (v) => emit("update:value", v),
});
</script>
