<template>
  <form action>
    <p>
      <label>Enter your hourly rate</label>
      <number-input
        v-model="form.rate"
        size="large"
        :min="1"
        center
        controls
      ></number-input>
    </p>
    <p>
      <label>Enter hours worked</label>
      <number-input
        v-model="form.h"
        size="large"
        :min="0"
        center
        controls
      ></number-input>
    </p>
    <p>
      <label for="minutes">Enter minutes worked</label>
      <number-input
        v-model="form.m"
        size="large"
        :min="0"
        :max="59"
        center
        controls
      ></number-input>
    </p>
    <p class="price-converter">
      <input
        class="apple-switch"
        id="convertToUAH"
        type="checkbox"
        v-model="convertToUAH"
      />
      <label for="convertToUAH">Convert to UAH</label>
    </p>
    <mark>
      {{ convertToUAH ? "₴" : "$" }}
      <span>{{ convertToUAH ? calcTotalsUAH : calcTotals }}</span>
    </mark>
  </form>
</template>

<style lang="scss">
.price-converter {
  align-items: center;
  display: flex;
  label {
    margin: 0 0 0 10px;
    font-size: 18px;
  }
}
</style>
<script>
import Vue from "vue";
import VueNumberInput from "@chenfengyuan/vue-number-input";
import "@/assets/ios-input.scss";
import wait4GA from "@/components/wait4GA";
import { debounce, isEmpty, cloneDeep, transform } from "lodash";

Vue.use(VueNumberInput);

export default {
  name: "HourlyRateForm",
  data: () => ({
    form: {
      rate: 0,
      h: 0,
      m: 0
    },
    convertToUAH: false,
    exchange: null
  }),
  created() {
    if (!isEmpty(this.$route.query)) {
      const qs = transform(cloneDeep(this.$route.query), (result, v, k) => {
        result[k] = Number(v);
      });
      this.form = qs;
    }
  },
  beforeMount() {
    let privat24Exchange = sessionStorage.getItem("exchange");
    if (privat24Exchange) {
      this.exchange = JSON.parse(privat24Exchange);
    } else {
      fetch("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
        .then(r => r.json())
        .then(json => {
          this.exchange = json;
          sessionStorage.setItem("exchange", JSON.stringify(json));
        });
    }
  },
  mounted() {
    const plusminButtons = document.getElementsByClassName(
      "number-input__button"
    );
    plusminButtons.forEach(button => (button.tabIndex = -1));
  },
  computed: {
    time2minites() {
      return Number(this.form.h) * 60 + Number(this.form.m);
    },
    calcTotals() {
      const totals = (this.form.rate / 60) * this.time2minites;
      return !isNaN(totals) ? totals.toFixed(2) : 0;
    },
    calcTotalsUAH() {
      const totalsUAH = this.calcTotals * Number(this.exchange[0].sale);
      return !isNaN(totalsUAH) ? totalsUAH.toFixed(2) : 0;
    }
  },
  watch: {
    form: {
      deep: true,
      immediate: false,
      handler(v) {
        this.$router
          .replace({
            query: v
          })
          .catch(err => {});
      }
    },
    "form.rate": debounce(function(rate) {
      wait4GA()
        .then(w4ga =>
          w4ga("send", "event", "input", "price", rate, {
            nonInteraction: true
          })
        )
        .catch(e => console.warn(e));
    }, 1000)
  }
};
</script>
