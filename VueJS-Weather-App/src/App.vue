<template>
  <section class="content">
    <main>
      <section>
        <input
          type="text"
          placeholder="Location..."
          v-model="query"
          @keypress="fetchWeather"
          class="px-3"
        />
      </section>

      <section class="text-center mb-5">
        <h3 class="mb-0">{{ formattedDate }}, {{ year }}</h3>
        {{ today }}
      </section>

      <section class="text-center d-flex justify-content-center">
        <h1 class="p-3 rounded-3 temperature">32&deg;C</h1>
      </section>

      <section class="text-center d-flex justify-content-center my-2">
        <h4 class="p-2 text-light rounded-3 remark">Rain</h4>
      </section>

      <section v-if="typeof weather.main != 'undefined'">
        <div class="text-center my-5">
          <h3>{{ weather.name }}, {{ weather.sys.country }}</h3>
        </div>
      </section>
    </main>

    <footer class="text-center p-4">
      Powered by <a href="https://casmir.dev" class="text-dark">casmir.dev</a>
    </footer>
  </section>
</template>

<script>
import { apiKey } from "./config";
export default {
  name: "App",

  data() {
    return {
      date: new Date(),
      apiKey: apiKey,
      urlBase: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {},
    };
  },

  methods: {
    fetchWeather(e) {
      if (e.key == "Enter") {
        fetch(
          `${this.urlBase}weather?q=${this.query}&units=metric&APPID=${this.apiKey}`
        )
          .then((res) => {
            return res.json();
          })
          .then(this.setResults)
          .catch((error) => {
            console.error("Error fetching weather data:", error);
          });
      }
    },

    setResults(results) {
      this.weather = results;
    },
  },

  computed: {
    formattedDate() {
      const order = {
        day: "2-digit",
        month: "short",
      };
      return this.date.toLocaleString("en-US", order);
    },

    year() {
      return this.date.getFullYear();
    },

    today() {
      const order = {
        weekday: "long",
      };
      return this.date.toLocaleString("en-US", order);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/scss/main.scss";
</style>