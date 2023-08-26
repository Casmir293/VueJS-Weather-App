<template>
  <section class="content" :class="backgroundImageClass">
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
        <h1 v-if="weather.main" class="p-3 rounded-3 temperature">
          {{ Math.round(weather.main.temp) }}&deg;C
        </h1>
      </section>

      <section class="text-center d-flex justify-content-center my-2">
        <h4 v-if="weather.main" class="p-2 text-light rounded-3 remark">
          {{ weather.weather[0].main }}
        </h4>
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
    fetchCurrentLocationWeather() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const url = `${this.urlBase}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${this.apiKey}`;
            fetch(url)
              .then((res) => res.json())
              .then(this.setResults)
              .catch((error) => {
                console.error("Error fetching weather data:", error);
              });
          },
          (error) => {
            console.error("Error getting geolocation:", error);
          }
        );
      } else {
        console.error("Geolocation is not available");
      }
    },

    fetchWeather(e) {
      if (e.key === "Enter") {
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

    backgroundImageClass() {
      // Determine the background image class based on temperature condition
      if (this.weather.main && this.weather.main.temp < 16) {
        return "dark-background";
      } else {
        return "light-background";
      }
    },
  },

  mounted() {
    this.fetchCurrentLocationWeather();
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/scss/main.scss";
</style>
