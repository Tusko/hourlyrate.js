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
    >Star</a>
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
