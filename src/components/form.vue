<template>
  <form @submit.prevent>
    <p>
      <label>Enter your hourly rate</label>
      <vue-number-input
        :model-value="form.rate"
        @update:model-value="onModelUpd($event, 'rate')"
        size="large"
        :min="1"
        center
        controls
      />
    </p>
    <p>
      <label>Enter hours worked</label>
      <vue-number-input
        :model-value="form.h"
        @update:model-value="onModelUpd($event, 'h')"
        size="large"
        :min="0"
        center
        controls
      />
    </p>
    <p>
      <label for="minutes">Enter minutes worked</label>
      <!-- v-model="form.m" -->
      <vue-number-input
        :model-value="form.m"
        @update:model-value="onModelUpd($event, 'm')"
        size="large"
        :min="0"
        :max="59"
        center
        controls
      />
    </p>
    <div class="rate-result">
      <div class="rate-result-amount">
        <p class="rate-result-amount-converter">
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
          <span>{{ convertToUAH ? calcTotalUAH : calcTotal }}</span>
        </mark>
      </div>
      <div class="rate-result-share">
        <button class="button smaller" @click.stop="copy2Clipboard">
          Share
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import { ref, reactive, computed, watch, onBeforeMount } from "vue";
import VueNumberInput from "@chenfengyuan/vue-number-input";
import { copyText } from "vue3-clipboard";
import wait4GA from "@/components/wait4GA";
import "@/assets/ios-input.scss";

export default {
  name: "HourlyRateForm",
  setup() {
    const form = reactive({
      rate: 0,
      h: 0,
      m: 0,
    });
    const convertToUAH = ref(false);
    const exchange = ref(null);

    onBeforeMount(() => {
      if (
        window.location.search.length &&
        !+import.meta.env.VITE_APP_IS_CHROME
      ) {
        const formObj = location.search
          .slice(1)
          .split("&")
          .map((p) => p.split("="))
          .forEach(([key, val]) => {
            form[key] = +val;
          });
      }
    });

    const monoExhange = sessionStorage.getItem("exchange");
    if (monoExhange) {
      exchange.value = JSON.parse(monoExhange);
    } else {
      fetch("https://api.monobank.ua/bank/currency")
        .then((r) => r.json())
        .then(([firstItem]) => {
          exchange.value = firstItem;
          sessionStorage.setItem("exchange", JSON.stringify(firstItem));
        })
        .catch(window.alert);
    }

    const time2min = computed(() => +form.h * 60 + +form.m);
    const calcTotal = computed(() => {
      const totals = (form.rate / 60) * time2min.value;
      return !isNaN(totals) ? totals.toFixed(2) : 0;
    });
    const calcTotalUAH = computed(() => {
      const totalsUAH = calcTotal.value * +exchange.value.rateSell;
      return !isNaN(totalsUAH) ? totalsUAH.toFixed(2) : 0;
    });

    const copy2Clipboard = () => {
      const params = new URLSearchParams(form).toString();
      copyText(
        `https://hourlyrate.frontend.im/?${params}`,
        undefined,
        (error, event) => {
          if (error) {
            alert("Can not copy", error);
          } else {
            window.alert(`Copied to clipboard: ${event.text}`);
          }
        }
      );
    };

    watch(form, (oldForm, newForm) => {
      const params = new URLSearchParams(newForm).toString();
      oldForm && history.pushState({}, null, `?${params}`);
      if (oldForm?.rate !== newForm.rate) {
        wait4GA()
          .then((w4ga) =>
            w4ga("send", "event", "input", "price", newForm.rate, {
              nonInteraction: true,
            })
          )
          .catch(console.warn);
      }
    });

    const onModelUpd = (val, fld) => (form[fld] = val);

    return {
      form,
      convertToUAH,
      exchange,
      calcTotal,
      calcTotalUAH,
      copy2Clipboard,
      onModelUpd,
    };
  },
  components: {
    VueNumberInput,
  },
};
</script>

<style lang="scss">
.rate-result {
  justify-content: space-between;
  margin-top: 40px;
  display: flex;
  &-amount {
    position: relative;
    &[disabled]:before {
      background: var(--light);
      position: absolute;
      opacity: 0.25;
      content: "";
      z-index: 1;
      bottom: 0;
      right: 0;
      left: 0;
      top: 0;
    }
    &-converter {
      align-items: center;
      display: flex;
      label {
        margin: 0 0 0 10px;
        font-size: 18px;
      }
    }
    mark {
      font-weight: 700;
      font-size: 32px;
      line-height: 1;
      background: 0 0;
      color: inherit;
    }
  }
  .browser-app {
    @media screen and (max-width: 767px) {
      margin-top: 20px;
      display: block;
      &-share {
        margin-top: 20px;
        button {
          display: block;
          width: 100%;
        }
      }
    }
  }
}
</style>
