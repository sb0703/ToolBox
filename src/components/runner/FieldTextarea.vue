<template>
  <a-form-item :label="field.label">
    <a-textarea
      v-model:value="val"
      :rows="field.rows || 8"
      :placeholder="field.label"
    />
  </a-form-item>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  field: { key: string; label: string; rows?: number };
  value?: any;
}>();
const emit = defineEmits(["update:value"]);
const val = computed({
  get: () => props.value,
  set: (v) => emit("update:value", v),
});
</script>
