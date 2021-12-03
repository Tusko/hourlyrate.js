<script setup>
import { computed, ref } from "vue";
const src = ref({
  name: "hourlyrate",
  desc: "Convert your hours to dollars",
  isChrome: +import.meta.env.VITE_APP_IS_CHROME,
});
const appClass = computed(() => {
  const cond = src.value.isChrome ? "chrome" : "browser";
  return `${cond}-app`;
});
</script>

<template>
  <div id="app" :class="appClass">
    <section>
      <h1>{{ appName }}</h1>
      <h2>{{ appDescr }}</h2>
      <rateForm />
    </section>
    <div class="copyright">
      <p>
        &copy; {{ new Date().getFullYear() }} by
        <a href="https://frontend.im/" target="_blank">Tusko Trush</a>
      </p>
      <slot v-if="!isChrome">
        <gitBtns />
        <a
          href="https://chrome.google.com/webstore/detail/bgjbahmkflngdopgjifphcpepapgohca"
          class="chrome-webstore-link"
          target="_blank"
        >
          <img
            src="@/assets/chrome-webstore-badge.svg"
            alt="Avalaible in the Chrome Web Store"
        /></a>
      </slot>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Raleway");
</style>
