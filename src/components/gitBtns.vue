<template>
  <div class="git-bttns">
    <a
      class="github-button"
      href="https://github.com/tusko/hourlyrate.js"
      target="_blank"
      data-icon="octicon-star"
      data-count-href="/tusko/hourlyrate/stargazers"
      data-count-api="/repos/tusko/hourlyrate#stargazers_count"
      data-count-aria-label="# stargazers on GitHub"
      aria-label="Star tusko/hourlyrate on GitHub"
      >Star</a
    >
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";

export default {
  name: "GitButtons",
  setup() {
    const app = getCurrentInstance();
    const { $LoadScript: ls } = app.appContext.config.globalProperties;

    ls("https://buttons.github.io/buttons.js");
  },
};
</script>

<style lang="scss" scoped>
.git-bttns {
  transform: translate(0, 4px);
}
</style>
