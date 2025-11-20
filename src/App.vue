<script setup lang="ts"></script>
<template>
  <AppShell />
</template>
<script lang="ts">
export default {
  components: { AppShell: (await import("@/layouts/AppShell.vue")).default },
};
</script>
