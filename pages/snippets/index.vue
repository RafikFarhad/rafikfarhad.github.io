<template>
  <NuxtLayout>
    <main>
      <PrettyList path="/snippets" />
    </main>
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
  title: "Snippets",
  meta: [
    {
      name: "description",
      content: "Various code snippets",
    },
  ],
});
</script>
