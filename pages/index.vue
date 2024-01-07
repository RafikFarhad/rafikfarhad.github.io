<template>
  <NuxtLayout>
    <h4 class="text-4xl mb-4 font-custom-title">Introduction</h4>
    <h5 class="text-2xl text-slate-600 mb-40">
      // Some boring introduction that no one cares about
    </h5>
    <h4 class="text-4xl mb-4 font-custom-title">Featured</h4>
    <PrettyList path="/snippets" featured />
  </NuxtLayout>
</template>
<script lang="ts">
import PrettyList from "~/components/PrettyList.vue";
export default {
  components: {
    PrettyList,
  },
};
</script>
<script setup lang="ts">
useHead({
  title: "Home",
  meta: [
    {
      name: "description",
      content: "Thoughts from Rafik Farhad",
    },
  ],
});
</script>
