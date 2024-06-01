import { createApp } from "vue";
import App from "./App.vue";
import { createVuestic } from "vuestic-ui";
import './style.css'
import "vuestic-ui/css";

createApp(App).use(createVuestic()).mount("#app");