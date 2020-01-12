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
      target="_blank"
      data-icon="octicon-star"
      data-count-href="/tusko/hourlyrate.js/stargazers"
      data-count-api="/repos/tusko/hourlyrate.js#stargazers_count"
      data-count-aria-label="# stargazers on GitHub"
      aria-label="Star tusko/hourlyrate.js on GitHub"
      >Star</a
    >
    <a
      class="github-button"
      target="_blank"
      href="https://github.com/tusko/hourlyrate.js/archive/master.zip"
      data-icon="octicon-cloud-download"
      aria-label="Download tusko/hourlyrate.js on GitHub"
      >Download</a
    >
  </div>
</template>

<script>
export default {
  name: "GitButtons",
  beforeMount() {
    this.$loadScript("https://buttons.github.io/buttons.js");
  }
};
</script>
