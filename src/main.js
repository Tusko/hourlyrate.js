import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({});

Vue.config.productionTip = false;

import "./styles/main.scss";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
