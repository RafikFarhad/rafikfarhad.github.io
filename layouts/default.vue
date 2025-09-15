<template>
  <div
    class="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300"
  >
    <div class="container lg:max-w-6xl mx-auto">
      <div class="relative">
        <button
          class="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          aria-label="Toggle dark mode"
          @click="toggleDarkMode"
        >
          <span v-if="isDarkMode">☀️</span>
          <span v-else>🌙</span>
        </button>
        <img
          src="~assets/img/echoes-cover.png"
          alt="echoes-cover"
          class="h-48 mx-auto p-10"
        />
      </div>
      <ul
        class="flex flex-wrap text-sm font-medium text-center dark:text-gray-300 border-b border-gray-400 dark:border-gray-700"
      >
        <li class="me-2">
          <NuxtLink
            to="/"
            active-class="text-black-600 dark:text-white border-2 border-slate-500 font-bold"
            class="inline-block p-4 hover:text-black-600 dark:hover:text-white hover:font-bold"
            aria-current="page"
          >
            Home
          </NuxtLink>
        </li>
        <li class="me-2">
          <NuxtLink
            to="/snippets"
            active-class="text-black-600 dark:text-white border-2 border-slate-500 font-bold"
            class="inline-block p-4 hover:text-black-600 dark:hover:text-white hover:font-bold"
          >
            Snippets
          </NuxtLink>
        </li>
        <li class="me-2">
          <NuxtLink
            to="/readings"
            active-class="text-black-600 dark:text-white border-2 border-slate-500 font-bold"
            class="inline-block p-4 hover:text-black-600 dark:hover:text-white hover:font-bold"
          >
            Readings
          </NuxtLink>
        </li>
        <li class="me-2">
          <NuxtLink
            href="/tools"
            active-class="text-black-600 dark:text-white border-2 border-slate-500 font-bold"
            class="inline-block p-4 hover:text-black-600 dark:hover:text-white hover:font-bold"
          >
            Tools
          </NuxtLink>
        </li>
      </ul>
      <div class="my-5">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: false,
    };
  },
  head() {
    return {
      titleTemplate: (title) => {
        return title ? `${title} :: Echoes` : "Echoes";
      },
    };
  },

  mounted() {
    // Check if user has saved preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      this.isDarkMode = savedTheme === "dark";
    } else {
      // If no saved preference, check system preference
      this.isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
    }
    this.applyTheme();

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          this.isDarkMode = e.matches;
          this.applyTheme();
        }
      });
  },

  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      this.applyTheme();
      localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");
    },

    applyTheme() {
      if (this.isDarkMode) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
    },
  },
};
</script>
