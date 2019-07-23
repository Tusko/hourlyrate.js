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
    if (process.env.NODE_ENV !== "development") {
      this.$loadScript(
        "https://www.googletagmanager.com/gtag/js?id=UA-76463064-8"
      ).then(() => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());

        gtag("config", "UA-76463064-8");
      });
    }
  }
}).$mount("#app");
