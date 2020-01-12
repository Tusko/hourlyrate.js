<template>
  <div id="app" :class="appClass">
    <section>
      <h1>{{ appName }}</h1>
      <h2>{{ appDescr }}</h2>
      <rateForm />
    </section>
    <gitBtns v-if="!isChrome" />
    <div v-else class="copyright">
      &copy; {{ year }} by
      <a href="https://arsmoon.com/" target="_blank">Arsmoon</a>
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
    gitBtns
  },
  data() {
    return {
      appName: "hourlyrate",
      appDescr: "Convert your hours to dollars",
      isChrome: process.env.VUE_APP_IS_CHROME,
      year: new Date().getFullYear()
    };
  },
  computed: {
    appClass() {
      const cond = this.isChrome ? "chrome" : "browser";
      return `${cond}-app`;
    }
  }
};
</script>
