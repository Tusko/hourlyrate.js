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
        :min="1"
        center
        controls
      ></number-input>
    </p>
    <p>
      <label for="minutes">Enter minutes worked</label>
      <number-input
        v-model="form.m"
        size="large"
        :max="60"
        center
        controls
      ></number-input>
    </p>
    <mark>
      $
      <span>{{ calcTotals }}</span>
    </mark>
  </form>
</template>

<script>
import Vue from "vue";
import VueNumberInput from "@chenfengyuan/vue-number-input";

Vue.use(VueNumberInput);

export default {
  name: "HourlyRateForm",
  data: () => ({
    form: {
      rate: 0,
      h: 0,
      m: 0
    }
  }),
  beforeMount() {
    if (this.$route.query.s) {
      this.form = JSON.parse(this.$route.query.s);
    }
  },
  computed: {
    time2minites() {
      return Number(this.form.h) * 60 + Number(this.form.m);
    },
    calcTotals() {
      const totals = (this.form.rate / 60) * this.time2minites;
      return !isNaN(totals) ? totals.toFixed(2) : 0;
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
    }
  }
};
</script>
