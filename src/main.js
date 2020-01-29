import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import LoadScript from "vue-plugin-load-script";
import VueClipboard from "vue-clipboard2";
const isDev = process.env.NODE_ENV !== "production";

Vue.use(LoadScript);
Vue.use(VueRouter);
Vue.use(VueClipboard);

const router = new VueRouter({
  mode: "history"
});

Vue.config.productionTip = false;

import "./styles/main.scss";

new Vue({
  router,
  render: h => h(App),
  beforeMount() {
    if ("serviceWorker" in navigator && !process.env.VUE_APP_IS_CHROME) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then(registration => {
            if (isDev) console.log("SW registered: ", registration);
          })
          .catch(registrationError => {
            if (isDev)
              console.log("SW registration failed: ", registrationError);
          });
      });
    }
  },
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
        .catch(() => console.warn("GA error"));
    }
  }
}).$mount("#app");
