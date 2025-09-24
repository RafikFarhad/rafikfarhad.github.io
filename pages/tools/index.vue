<template>
  <NuxtLayout>
    <main>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="t in tools"
          :key="t.link"
          :to="t.link"
          class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ t.name }}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            {{ t.description }}
          </p>
        </NuxtLink>
      </div>
    </main>
  </NuxtLayout>
</template>
<script lang="ts">
export default {
  components: {},
  data: () => ({
    tools: [
      {
        name: "Route Matcher",
        description: "Matches destination IP/CIDR with a route/network list",
        link: "/tools/route-matcher",
      },
      {
        name: "HTML Encoding",
        description: "Encode or decode HTML entities",
        link: "/tools/html-encoding",
      },
      {
        name: "Text Diff",
        description: "Compare two text inputs and highlight the differences",
        link: "/tools/text-diff",
      },
    ],
  }),
};
</script>

<script setup lang="ts">
useHead({
  title: "Tools",
  meta: [
    {
      name: "description",
      content: "All kinds of tools",
    },
  ],
});
</script>
