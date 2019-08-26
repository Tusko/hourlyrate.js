import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import LoadScript from "vue-plugin-load-script";

Vue.use(LoadScript);
Vue.use(VueRouter);

const router = new VueRouter({});

Vue.config.productionTip = false;

import "./styles/main.scss";

new Vue({
  router,
  render: h => h(App),
  mounted() {
    if (
      process.env.NODE_ENV !== "development" ||
      location.search === "?test=ga"
    ) {
      this.$loadScript("https://www.google-analytics.com/analytics.js")
        .then(() => {
          ga("create", "UA-76463064-8", "auto");
          ga("send", "pageview");
        })
        .catch(e => console.warn("GA error"));
    }
  }
}).$mount("#app");
