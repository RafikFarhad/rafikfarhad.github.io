<template>
  <ContentList :path="path">
    <template #default="{ list }">
      <div v-for="snippet in list" :key="snippet._path" class="my-8">
        <template v-if="show(snippet)">
          <NuxtLink
            :to="snippet._path"
            class="text-slate-600 hover:text-slate-800 text-2xl"
          >
            {{ snippet.title }}
          </NuxtLink>
          <p class="mb-1">{{ snippet.description }}</p>
          <p class="mb-1">
            Posted: <strong>{{ formatDate(snippet.date) }}</strong>
          </p>
          <PrettyTag v-for="tag in snippet.tags" :key="tag" :tag="tag" />
        </template>
      </div>
    </template>
    <template #not-found>
      <p>No snippets found.</p>
    </template>
  </ContentList>
</template>
<script setup lang="ts">
import { formatDate } from "~/utils";
</script>
<script lang="ts">
import PrettyTag from "~/components/PrettyTag.vue";
export default {
  name: "PrettyList",
  components: {
    PrettyTag,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    show(el: any) {
      if (this.featured) {
        return el.featured;
      }
      return true;
    },
  },
};
</script>
