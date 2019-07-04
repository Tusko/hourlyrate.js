<template>
  <div class="git-bttns">
    <a
      class="github-button"
      href="https://github.com/tusko"
      aria-label="Follow @tusko on GitHub"
      >Follow @tusko</a
    >
    <a
      class="github-button"
      href="https://github.com/tusko/hourlyrate.js"
      data-icon="octicon-star"
      data-count-href="/tusko/hourlyrate.js/stargazers"
      data-count-api="/repos/tusko/hourlyrate.js#stargazers_count"
      data-count-aria-label="# stargazers on GitHub"
      aria-label="Star tusko/hourlyrate.js on GitHub"
      >Star</a
    >
    <a
      class="github-button"
      href="https://github.com/tusko/hourlyrate.js/archive/master.zip"
      data-icon="octicon-cloud-download"
      aria-label="Download tusko/hourlyrate.js on GitHub"
      >Download</a
    >
  </div>
</template>

<script>
import Vue from "vue";
import LoadScript from "vue-plugin-load-script";

Vue.use(LoadScript);

export default {
  name: "GitButtons",
  beforeMount() {
    this.$loadScript("https://buttons.github.io/buttons.js");
  }
};
</script>
