<template>
  <div id="app">
    <section>
      <h1>{{ appName }}</h1>
      <h2>{{ appDescr }}</h2>
      <rateForm />
    </section>
    <gitBtns />
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
      appName: "Hourlyrate.js",
      appDescr: "Convert your hours to dollars"
    };
  }
};
</script>