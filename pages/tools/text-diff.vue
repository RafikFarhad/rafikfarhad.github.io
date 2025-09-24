<template>
  <NuxtLayout>
    <main class="container mx-auto px-4">
      <h1 class="text-2xl font-bold my-10 dark:text-white text-center">
        Text Diff Tool
      </h1>
      <div class="flex flex-col items-center w-full max-w-3xl mx-auto">
        <div class="flex flex-col gap-6 w-full">
          <div class="flex flex-col w-full">
            <label class="mb-2 font-semibold dark:text-gray-200"
              >Left Text</label
            >
            <textarea
              v-model="leftText"
              class="w-full h-48 p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 resize-y"
              placeholder="Enter left text here..."
            ></textarea>
          </div>
          <div class="flex flex-col w-full">
            <label class="mb-2 font-semibold dark:text-gray-200"
              >Right Text</label
            >
            <textarea
              v-model="rightText"
              class="w-full h-48 p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 resize-y"
              placeholder="Enter right text here..."
            ></textarea>
          </div>
        </div>
        <div class="w-full mt-8">
          <h2 class="text-lg font-semibold mb-2 dark:text-gray-200">
            Diff Result
          </h2>
          <pre
            class="w-full p-4 rounded bg-gray-100 dark:bg-gray-800 text-sm overflow-x-auto"
          >
            <template v-for="(line, idx) in diffLines" :key="idx">
              <span
                v-if="line.type === 'added'"
                class="block text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/40 px-2 rounded"
              >+ {{ line.text }}</span>
              <span
                v-else-if="line.type === 'removed'"
                class="block text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/40 px-2 rounded"
              >- {{ line.text }}</span>
            </template>
          </pre>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<script lang="ts">
export default {
  name: "TextDiffTool",
  data() {
    return {
      leftText: "",
      rightText: "",
    };
  },
  computed: {
    diffLines(): Array<{ type: string; text: string }> {
      const left = this.leftText.split("\n");
      const right = this.rightText.split("\n");
      const result = [];
      let i = 0,
        j = 0;
      while (i < left.length || j < right.length) {
        if (i < left.length && j < right.length) {
          if (left[i] === right[j]) {
            i++;
            j++;
          } else if (!right.includes(left[i])) {
            result.push({ type: "removed", text: left[i] });
            i++;
          } else if (!left.includes(right[j])) {
            result.push({ type: "added", text: right[j] });
            j++;
          } else {
            result.push({ type: "removed", text: left[i] });
            i++;
          }
        } else if (i < left.length) {
          result.push({ type: "removed", text: left[i] });
          i++;
        } else if (j < right.length) {
          result.push({ type: "added", text: right[j] });
          j++;
        }
      }
      return result;
    },
  },
};
</script>

<style></style>
