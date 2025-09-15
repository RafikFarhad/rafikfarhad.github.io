<template>
  <NuxtLayout>
    <main>
      <NuxtLink
        to="/tools/cidr"
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          CIDR operations
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          All things related to CIDR
        </p>
      </NuxtLink>
    </main>
  </NuxtLayout>
</template>
<script lang="ts">
export default {
  components: {},
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
