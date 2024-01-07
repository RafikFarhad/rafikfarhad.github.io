<template>
  <div class="container lg:max-w-4xl mx-auto my-4">
    <img
      src="~assets/img/thoughts-cover.png"
      alt="thoughts-cover"
      class="h-48 mx-auto px-4"
    />
    <ul
      class="flex flex-wrap text-sm font-medium text-center text-black-200 font-thin border-b border-black-400"
    >
      <li class="me-2">
        <NuxtLink
          to="/"
          active-class="text-black-600 border-2 border-slate-500 font-bold"
          class="inline-block p-4 hover:text-black-600 hover:font-600 hover:font-bold"
          aria-current="page"
        >
          Home
        </NuxtLink>
      </li>
      <li class="me-2">
        <NuxtLink
          to="/snippets"
          active-class="text-black-600 border-2 border-slate-500 font-bold"
          class="inline-block p-4 hover:text-black-600 hover:font-600 hover:font-bold"
        >
          Snippets
        </NuxtLink>
      </li>
      <li class="me-2">
        <NuxtLink
          href="/readings"
          active-class="text-black-600 border-2 border-slate-500 font-bold"
          class="inline-block p-4 hover:text-black-600 hover:font-600 hover:font-bold"
        >
          Readings
        </NuxtLink>
      </li>
    </ul>
    <div class="my-5">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  titleTemplate(title) {
    return title ? `${title} :: Thoughts` : "Thoughts";
  },
});
</script>
