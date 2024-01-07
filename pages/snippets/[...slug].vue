<template>
  <NuxtLayout>
    <main>
      <ContentDoc v-slot="{ doc }">
        <article>
          <h1 class="text-4xl text-slate-700">{{ doc.title }}</h1>
          <PrettyTag v-for="tag in doc.tags" :key="tag" :tag="tag" />
          <ContentRenderer :value="doc" />
        </article>
      </ContentDoc>
    </main>
  </NuxtLayout>
</template>
<script lang="ts">
import PrettyTag from "~/components/PrettyTag.vue";
export default {
  components: {
    PrettyTag,
  },
};
</script>
