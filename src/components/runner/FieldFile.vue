<template>
  <a-form-item :label="props.field.label">
    <input class="file" type="file" :accept="props.field.accept" @change="onChange" />
  </a-form-item>
</template>
<script setup lang="ts">
const props = defineProps<{
  field: { key: string; label: string; accept?: string };
  value?: File | null;
}>();
const emit = defineEmits(["update:value"]);
function onChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0] ?? null;
  emit("update:value", file);
}
</script>
<style lang="less" scoped>
.file {
  display: inline-block;
}
</style>
