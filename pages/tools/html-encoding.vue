<template>
  <NuxtLayout>
    <main class="container mx-auto px-4">
      <h1 class="text-2xl font-bold my-10 dark:text-white text-center">
        HTML Encoding
      </h1>
      <div class="flex flex-col items-center w-full mx-auto mb-5">
        <div class="mb-4 flex gap-4 w-full justify-center">
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            @click="encodeHtml"
          >
            Encode
          </button>
          <button
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            @click="decodeHtml"
          >
            Decode
          </button>
        </div>
        <div class="flex flex-col gap-6 w-full">
          <div class="flex flex-col w-full">
            <label class="mb-2 font-semibold dark:text-gray-200"
              >Encoded (HTML Entities)</label
            >
            <textarea
              v-model="encoded"
              class="w-full h-48 p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 resize-y"
              placeholder="&lt;div&gt;Hello &amp; Welcome!&lt;/div&gt;"
            ></textarea>
          </div>
          <div class="flex flex-col w-full">
            <label class="mb-2 font-semibold dark:text-gray-200"
              >Decoded (Plain Text)</label
            >
            <textarea
              v-model="decoded"
              class="w-full h-48 p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 resize-y"
              placeholder="<div>Hello & Welcome!</div>"
            ></textarea>
          </div>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<script lang="ts">
function htmlEncode(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function htmlDecode(str: string): string {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

export default {
  name: "HtmlEncodingTool",
  data() {
    return {
      encoded: "",
      decoded: "",
    };
  },
  methods: {
    encodeHtml() {
      this.encoded = htmlEncode(this.decoded);
    },
    decodeHtml() {
      this.decoded = htmlDecode(this.encoded);
    },
  },
};
</script>

<style></style>
