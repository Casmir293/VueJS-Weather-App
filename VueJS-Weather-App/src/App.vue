<template>
  <section class="content" :class="backgroundImageClass">
    <main>
      <section class="">
        <!-- Input for location search -->
        <input
          type="text"
          placeholder="Location..."
          v-model="query"
          @keypress="fetchWeather"
          class="px-3 d-flex mx-auto"
          :class="inputThemeClass"
        />
      </section>

      <section class="text-center mb-5">
        <!-- Display current date and day -->
        <h3 class="mb-0">{{ formattedDate }}, {{ year }}</h3>
        {{ today }}
      </section>

      <section class="text-center d-flex justify-content-center">
        <!-- Display temperature -->
        <h1 v-if="weather.main" class="p-3 rounded-3 temperature">
          {{ Math.round(weather.main.temp) }}&deg;C
        </h1>
      </section>

      <section class="text-center d-flex justify-content-center my-2">
        <!-- Display weather condition -->
        <h4 v-if="weather.main" class="p-2 text-light rounded-3 remark">
          {{ weather.weather[0].main }}
        </h4>
      </section>

      <section class="location" v-if="weather.main">
        <!-- Display location name and country -->
        <div class="text-center my-5">
          <h2>{{ weather.name }}, {{ weather.sys.country }}</h2>
        </div>
      </section>
    </main>

    <footer class="text-center p-4" :class="inputFooterClass">
      <!-- Footer attribution -->
      Powered by <a href="https://casmir.dev">casmir.dev</a>
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
      // Fetch weather data based on user's geolocation
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
      // Fetch weather data based on user's query
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
      // Set fetched weather data to the 'weather' property
      this.weather = results;
    },
  },

  computed: {
    formattedDate() {
      // Format and display the current date
      const order = {
        day: "2-digit",
        month: "short",
      };
      return this.date.toLocaleString("en-US", order);
    },

    year() {
      // Display the current year
      return this.date.getFullYear();
    },

    today() {
      // Display the current day
      const order = {
        weekday: "long",
      };
      return this.date.toLocaleString("en-US", order);
    },

    backgroundImageClass() {
      // Set background image class based on temperature
      if (this.weather.main && this.weather.main.temp < 20) {
        return "dark-background";
      } else {
        return "light-background";
      }
    },

    inputThemeClass() {
      // Set input theme class based on temperature
      if (this.weather.main && this.weather.main.temp < 20) {
        return "dark-input";
      } else {
        return "light-input";
      }
    },

    inputFooterClass() {
      // Set footer theme class based on temperature
      if (this.weather.main && this.weather.main.temp < 20) {
        return "dark-footer";
      } else {
        return "light-footer";
      }
    },
  },

  mounted() {
    // Fetch weather data for the user's current location on component mount
    this.fetchCurrentLocationWeather();
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/scss/main.scss";
</style>
