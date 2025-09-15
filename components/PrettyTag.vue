<template>
  <div
    class="inline-block text-xs font-medium me-2 px-2.5 py-0.5 text-slate-800 dark:text-slate-200 border-black dark:border-gray-400 border dark:bg-gray-800"
  >
    {{ tag }}
  </div>
</template>
<script setup lang="ts"></script>
<script lang="ts">
export default {
  name: "PrettyTag",
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  methods: {},
};
</script>
