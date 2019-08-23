<template>
  <form action>
    <p>
      <label>Enter your hourly rate</label>
      <number-input v-model="form.rate" size="large" :min="1" center controls></number-input>
    </p>
    <p>
      <label>Enter hours worked</label>
      <number-input v-model="form.h" size="large" :min="0" center controls></number-input>
    </p>
    <p>
      <label for="minutes">Enter minutes worked</label>
      <number-input v-model="form.m" size="large" :min="0" :max="60" center controls></number-input>
    </p>
    <p class="price-converter">
      <input class="apple-switch" id="convertToUAH" type="checkbox" v-model="convertToUAH" />
      <label for="convertToUAH">Convert to UAH</label>
    </p>
    <mark>
      {{ convertToUAH?'₴':'$' }}
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

Vue.component();

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
  beforeMount() {
    if (this.$route.query.s) {
      this.form = JSON.parse(this.$route.query.s);
    }
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
  methods: {
    saveURI(v) {
      this.$router.push({
        query: {
          s: JSON.stringify(v)
        }
      });
    }
  },
  watch: {
    form: {
      deep: true,
      immediate: false,
      handler(v) {
        this.$router.push({
          query: {
            s: JSON.stringify(v)
          }
        });
      }
    },
    "form.rate": function(rate) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        price: "dollarPerHour",
        event: "rate",
        value: rate
      });
    }
  }
};
</script>