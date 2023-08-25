import { createApp } from "vue";

// Components
import App from "./App.vue";

// SCSS
import "./assets/scss/main.scss";

// Bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";

// Mount
const vm = createApp(App);
vm.mount("#app");
