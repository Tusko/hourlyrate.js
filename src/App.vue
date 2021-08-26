<template>
  <div id="app" :class="appClass">
    <section>
      <h1>{{ appName }}</h1>
      <h2>{{ appDescr }}</h2>
      <rateForm />
    </section>
    <div class="copyright">
      <p>
        &copy; {{ year }} by
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
            :src="require('@/assets/chrome-webstore-badge.svg')"
            alt="Avalaible in the Chrome Web Store"
        /></a>
      </slot>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Raleway");
</style>

<script>
import { rateForm, gitBtns } from "./components";

export default {
  name: "app",
  components: {
    rateForm,
    gitBtns,
  },
  data() {
    return {
      appName: "hourlyrate",
      appDescr: "Convert your hours to dollars",
      isChrome: process.env.VUE_APP_IS_CHROME,
      year: new Date().getFullYear(),
    };
  },
  computed: {
    appClass() {
      const cond = this.isChrome ? "chrome" : "browser";
      return `${cond}-app`;
    },
  },
};
</script>
